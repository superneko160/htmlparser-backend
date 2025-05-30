import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'
import { validator } from 'hono/validator'
import type { FetchDependencies } from './types'
import { getAttributeOption } from './helpers/attributeHelpers'
import { splitString, removeWhitespace } from './helpers/stringHelpers'
import { fetchUrl } from './utils/fetchUrl'
import { prepareElementAttributes } from './utils/prepareElements'
import { getElementAttributes } from './parsers/getElements'
import { matchesUrlPattern, matchesElementNamePattern } from './validators'
import { convertToCSV } from './utils/csvConverter'

const app = new Hono()

// CORSミドルウェアを適用
app.use(
    '/parse/*',
    cors({
        origin: '*', // 許可するオリジン
        allowMethods: ['POST'], // 許可するHTTPメソッド
        allowHeaders: ['Content-Type'], // 許可するヘッダ
    }),
)

const fetchDeps: FetchDependencies = {
    fetchUrl,
    splitString,
    getAttributeOption,
}

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
        const body = await c.req.parseBody()
        const { url, elements } = body
        const attrs = body['attrs[]']

        try {
            const { contents, tags, attributes } = await prepareElementAttributes(
                url,
                elements,
                attrs,
                fetchDeps,
            )

            const data = getElementAttributes(contents, tags, attributes, false)

            return c.json({
                status: 200,
                data: data,
            })
        } catch (e) {
            console.error(e)
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
        const body = await c.req.parseBody()
        const { url, elements } = body
        const attrs = body['attrs[]']

        try {
            const { contents, tags, attributes } = await prepareElementAttributes(
                url,
                elements,
                attrs,
                fetchDeps,
            )

            const data = getElementAttributes(contents, tags, attributes, false)
            const jsonData = JSON.stringify(data, null, 2)

            return c.body(jsonData, 200, {
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="result.json"',
            })
        } catch (e) {
            console.error(e)
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
        const body = await c.req.parseBody()
        const { url, elements } = body
        const attrs = body['attrs[]']

        try {
            const { contents, tags, attributes } = await prepareElementAttributes(
                url,
                elements,
                attrs,
                fetchDeps,
            )

            const data = getElementAttributes(contents, tags, attributes, false)
            const csvData = convertToCSV(data)

            return c.body(csvData, 200, {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="result.csv"',
            })
        } catch (e) {
            console.error(e)
            return c.json({ status: 500, error: 'Failed to fetch URL' })
        }
    },
)

export default app
