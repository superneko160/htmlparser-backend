import { Hono } from 'hono'
import { html } from 'hono/html'
import { validator } from 'hono/validator'
import type { AttributeOption } from './types'
import { getAttributeOption } from './utils/attributeHelpers'
import { splitString, removeWhitespace } from './utils/stringHelpers'
import { getElementAttributes } from './utils/getElements'
import { matchesUrlPattern, matchesElementNamePattern } from './utils/validators'

const app = new Hono()

// 検証用フォーム
app.get('/', c => {
    return c.html(
        html`<!doctype html>
            <html lang="ja">
                <head>
                    <title>HTML解析</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <form action="/parse" method="post">
                        URL:<input type="url" name="url"><br>
                        要素名：<input type="text" name="elements"><br>
                        id <input type="checkbox" name="attrs[]" value="id">
                        class <input type="checkbox" name="attrs[]" value="class"><br>
                        <input type="submit" value="解析">
                    </form>
                </body>
            </html>`,
    )
})

// HTML解析処理
app.post(
    '/parse',
    validator('form', () => {}),
    async c => {
        // POSTデータ取得
        const body = await c.req.parseBody()
        const url = removeWhitespace(body['url'])
        const elements = removeWhitespace(body['elements'])

        // URLのバリデーション
        if (!matchesUrlPattern(url)) return c.json({ status: 400, error: 'Invalid URL' })
        // 要素名のバリデーション
        if (!matchesElementNamePattern(elements))
            return c.json({ status: 400, error: 'Invalid element names' })

        try {
            // URLからコンテンツ取得
            const response = await fetch(url)
            const contents = await response.text()
            // 要素名の含まれた文字列を配列に分割
            const tags = splitString(elements, [',', '+'])
            // 取得する属性を判定するオプションを取得
            const attributes = getAttributeOption(body['attrs[]'])

            return c.json({
                status: 200,
                data: getElementAttributes(contents, tags, attributes, false),
            })
        } catch (e) {
            return c.json({ status: 500, error: 'Failed to fetch URL' })
        }
    },
)

export default app
