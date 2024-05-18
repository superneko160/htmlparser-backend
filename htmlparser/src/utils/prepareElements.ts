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
    attrs: string,
    fetchDeps: FetchDependencies,
): PreparedElementAttributes {
    const { fetchUrl, splitString, getAttributeOption } = fetchDeps

    // URLからコンテンツ取得
    const contents = await fetchUrl(url)
    // 要素名の含まれた文字列を配列に分割
    const tags = splitString(elements, [',', '+'])
    // 取得する属性を判定するオプションを取得
    const attributes = getAttributeOption(attrs)

    return { contents, tags, attributes }
}
