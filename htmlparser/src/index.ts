import { Hono } from 'hono'
import { html } from 'hono/html'
import { validator } from 'hono/validator'
import { getAttributeOption } from './utils/attributeHelpers'
import { splitString, removeWhitespace } from './utils/stringHelpers'
import { getElementAttributes } from './utils/getElements'
import { matchesUrlPattern, matchesElementNamePattern } from './utils/validators'
import { convertToCSV } from './utils/csvConverter'

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
                    <form method="post">
                        URL:<input type="url" name="url"><br>
                        要素名：<input type="text" name="elements"><br>
                        id <input type="checkbox" name="attrs[]" value="id">
                        class <input type="checkbox" name="attrs[]" value="class"><br>
                        <input type="submit" formaction="/parse" value="解析">
                        <input type="submit" formaction="/parse/json" value="解析結果DL(JSON)">
                        <input type="submit" formaction="/parse/csv" value="解析結果DL(CSV)">
                    </form>
                </body>
            </html>`,
    )
})

// HTML解析処理
app.post(
    '/parse',
    validator('form', async (value, c) => {
        const url = removeWhitespace(value.url)
        const elements = removeWhitespace(value.elements)

        if (!matchesUrlPattern(url)) return c.json({ status: 400, error: 'Invalid URL' })

        if (!matchesElementNamePattern(elements))
            return c.json({ status: 400, error: 'Invalid element names' })

        return value
    }),
    async c => {
        // POSTデータ取得
        const body = await c.req.parseBody()
        const { url, elements } = body
        const attrs = body['attrs[]']

        try {
            // URLからコンテンツ取得
            const response = await fetch(url)
            const contents = await response.text()
            // 要素名の含まれた文字列を配列に分割
            const tags = splitString(elements, [',', '+'])
            // 取得する属性を判定するオプションを取得
            const attributes = getAttributeOption(attrs)

            const data = getElementAttributes(contents, tags, attributes, false)

            return c.json({
                status: 200,
                data: data,
            })
        } catch (e) {
            return c.json({ status: 500, error: 'Failed to fetch URL' })
        }
    },
)

// HTML解析結果のJSONファイルをダウンロード
app.post(
    '/parse/json',
    validator('form', async (value, c) => {
        const url = removeWhitespace(value.url)
        const elements = removeWhitespace(value.elements)

        if (!matchesUrlPattern(url)) return c.json({ status: 400, error: 'Invalid URL' })

        if (!matchesElementNamePattern(elements))
            return c.json({ status: 400, error: 'Invalid element names' })

        return value
    }),
    async c => {
        // POSTデータ取得
        const body = await c.req.parseBody()
        const { url, elements } = body
        const attrs = body['attrs[]']

        try {
            // URLからコンテンツ取得
            const response = await fetch(url)
            const contents = await response.text()
            // 要素名の含まれた文字列を配列に分割
            const tags = splitString(elements, [',', '+'])
            // 取得する属性を判定するオプションを取得
            const attributes = getAttributeOption(attrs)

            const data = getElementAttributes(contents, tags, attributes, false)
            const jsonData = JSON.stringify(data, null, 2)

            return c.body(jsonData, 200, {
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="result.json"',
            })
        } catch (e) {
            return c.json({ status: 500, error: 'Failed to fetch URL' })
        }
    },
)

// HTML解析結果のCSVファイルをダウンロード
app.post(
    '/parse/csv',
    validator('form', async (value, c) => {
        const url = removeWhitespace(value.url)
        const elements = removeWhitespace(value.elements)

        if (!matchesUrlPattern(url)) return c.json({ status: 400, error: 'Invalid URL' })

        if (!matchesElementNamePattern(elements))
            return c.json({ status: 400, error: 'Invalid element names' })

        return value
    }),
    async c => {
        // POSTデータ取得
        const body = await c.req.parseBody()
        const { url, elements } = body
        const attrs = body['attrs[]']

        try {
            // URLからコンテンツ取得
            const response = await fetch(url)
            const contents = await response.text()
            // 要素名の含まれた文字列を配列に分割
            const tags = splitString(elements, [',', '+'])
            // 取得する属性を判定するオプションを取得
            const attributes = getAttributeOption(attrs)

            const data = getElementAttributes(contents, tags, attributes, false)
            const csvData = convertToCSV(data)

            return c.body(csvData, 200, {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="result.csv"',
            })
        } catch (e) {
            return c.json({ status: 500, error: 'Failed to fetch URL' })
        }
    },
)

export default app
