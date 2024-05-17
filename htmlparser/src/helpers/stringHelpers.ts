/**
 * 文字列を特定の区切り文字で分割してリストに変更
 * @param {string} input 分割対象の文字列
 * @param {string[]} separators 区切り文字（['+', ',']）
 * @return {string[]} 分割した値を格納したリスト
 */
export function splitString(input: string, separators: string[]): string[] {
    const result: string[] = []
    let currentToken = ''

    for (let i = 0; i < input.length; i++) {
        const char = input[i]

        if (separators.includes(char)) {
            if (currentToken !== '') {
                result.push(currentToken)
                currentToken = ''
            }
        } else {
            currentToken += char
        }
    }

    if (currentToken !== '') {
        result.push(currentToken)
    }

    return result
}

/**
 * 空白を除去した文字列の取得
 * @param {string} input 対象文字列
 * @return {string} 空白除去後の文字列
 */
export function removeWhitespace(input: string): string {
    return input.replace(/[\p{Zs}\t\n\r]+/gu, '')
}
