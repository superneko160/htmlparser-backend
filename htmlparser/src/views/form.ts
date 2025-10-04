import { html } from 'hono/html'

export const indexForm = html`<!doctype html>
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
    </html>`
