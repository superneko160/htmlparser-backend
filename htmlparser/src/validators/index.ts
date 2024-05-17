/**
 * URLの正規表現パターンにマッチしているか判定
 * @param {string} url URL
 * @return {boolean} 判定結果
 */
export function matchesUrlPattern(url: string): boolean {
    const urlPattern = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/
    return urlPattern.test(url)
}

/**
 * 要素名の正規表現パターンにマッチしているか判定
 * @param {string} elements 要素名
 * @param {boolean} 判定結果
 */
export function matchesElementNamePattern(elements: string): boolean {
    const elementPattern = /^[a-zA-Z0-9,+]+$/
    return elementPattern.test(elements)
}
