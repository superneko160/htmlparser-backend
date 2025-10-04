import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { indexForm } from './views/form'
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
    return c.html(indexForm)
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
