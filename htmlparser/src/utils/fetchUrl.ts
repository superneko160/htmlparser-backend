/**
 * URLからコンテンツ取得
 * @param {string} url URL
 * @return {Promise<string>} コンテンツ
 */
export async function fetchUrl(url: string): Promise<string> {
    const response = await fetch(url)
    return await response.text()
}
