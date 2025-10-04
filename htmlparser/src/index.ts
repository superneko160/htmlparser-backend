import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'
import { fetchDeps } from './config/dependencies'
import { validateParseRequest } from './validators'
import { convertToCSV } from './utils/csvConverter'
import { parseHtmlData } from './parsers/parseHtmlData'

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
                        class <input type="checkbox" name="attrs[]" value="class">
                        src <input type="checkbox" name="attrs[]" value="src">
                        href <input type="checkbox" name="attrs[]" value="href"><br>
                        <input type="submit" formaction="/parse" value="解析">
                        <input type="submit" formaction="/parse/json" value="解析結果DL(JSON)">
                        <input type="submit" formaction="/parse/csv" value="解析結果DL(CSV)">
                    </form>
                </body>
            </html>`,
    )
})

// HTML解析処理
app.post('/parse', validateParseRequest(), async c => {
    const body = await c.req.parseBody()
    const { url, elements } = body
    const attrs = body['attrs[]']

    try {
        const data = await parseHtmlData(url, elements, attrs, fetchDeps)

        return c.json({
            status: 200,
            data: data,
        })
    } catch (e) {
        console.error(e)
        return c.json({ status: 500, error: 'Failed to fetch URL' })
    }
})

// HTML解析結果のJSONファイルをダウンロード
app.post('/parse/json', validateParseRequest(), async c => {
    const body = await c.req.parseBody()
    const { url, elements } = body
    const attrs = body['attrs[]']

    try {
        const data = await parseHtmlData(url, elements, attrs, fetchDeps)
        const jsonData = JSON.stringify(data, null, 2)

        return c.body(jsonData, 200, {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="result.json"',
        })
    } catch (e) {
        console.error(e)
        return c.json({ status: 500, error: 'Failed to fetch URL' })
    }
})

// HTML解析結果のCSVファイルをダウンロード
app.post('/parse/csv', validateParseRequest(), async c => {
    const body = await c.req.parseBody()
    const { url, elements } = body
    const attrs = body['attrs[]']

    try {
        const data = await parseHtmlData(url, elements, attrs, fetchDeps)
        const csvData = convertToCSV(data)

        return c.body(csvData, 200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="result.csv"',
        })
    } catch (e) {
        console.error(e)
        return c.json({ status: 500, error: 'Failed to fetch URL' })
    }
})

export default app
