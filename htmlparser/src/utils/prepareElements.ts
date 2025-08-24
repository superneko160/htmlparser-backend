import type { PreparedElementAttributes, FetchDependencies } from './../types'

/**
 * 指定されたURLからコンテンツを取得し、要素名の文字列を分割し、属性オプションを準備
 * @param {string} url URL
 * @param {string} elements カンマやプラスで区切られた要素名の文字列
 * @param {string} attrs 取得する属性を指定する文字列
 * @param {FetchDependencies} fetchDeps 依存する fetch 関連の関数オブジェクト
 * @return {PreparedElementAttributes} 要素名の配列、および属性オプションを含むオブジェクト
 */
export async function prepareElementAttributes(
    url: string,
    elements: string,
    attrs: string | string[], // 文字列または文字列配列を受け取る
    fetchDeps: FetchDependencies,
): PreparedElementAttributes {
    const { fetchUrl, splitString, getAttributeOption } = fetchDeps
    const contents = await fetchUrl(url)
    const tags = splitString(elements, [',', '+'])
    
    let processedAttrs: string | string[] = attrs
    
    // フォームから来た場合（配列の場合）の処理
    if (Array.isArray(attrs)) {
        processedAttrs = attrs.length > 0 ? attrs : 'all'
    }
    
    const attributes = getAttributeOption(processedAttrs)

    return { contents, tags, attributes }
}
