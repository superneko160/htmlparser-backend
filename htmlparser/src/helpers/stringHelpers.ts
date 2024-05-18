/**
 * 文字列を特定の区切り文字で分割してリストに変更
 * @param {string} input 分割対象の文字列
 * @param {string[]} separators 区切り文字（['+', ',']）
 * @return {string[]} 分割した値を格納したリスト
 */
export function splitString(input: string, separators: string[]): string[] {
    let tokens: string[] = []
    let currentToken = ''

    for (const char of input) {
        if (separators.includes(char)) {
            tokens = addTokenToList(tokens, currentToken)
            currentToken = ''
        } else {
            currentToken += char
        }
    }

    tokens = addTokenToList(tokens, currentToken)
    return tokens
}

/**
 * トークンをリストに追加する場合は新しいリストを返す
 * @param {string[]} tokens トークンを格納するリスト
 * @param {string} currentToken 現在のトークン
 * @return {string[]} トークンが追加された新しいリスト
 */
function addTokenToList(tokens: string[], currentToken: string): string[] {
    if (currentToken !== '') {
        return [...tokens, currentToken]
    }
    return tokens
}

/**
 * 空白を除去した文字列の取得
 * @param {string} input 対象文字列
 * @return {string} 空白除去後の文字列
 */
export function removeWhitespace(input: string): string {
    return input.replace(/[\p{Zs}\t\n\r]+/gu, '')
}
