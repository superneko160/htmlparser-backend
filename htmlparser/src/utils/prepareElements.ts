import type { PreparedElementAttributes } from './../types'
import { getAttributeOption } from './attributeHelpers'
import { splitString } from './stringHelpers'

/**
 * 指定されたURLからコンテンツを取得し、要素名の文字列を分割し、属性オプションを準備
 * @param {string} url URL
 * @param {string} elements カンマやプラスで区切られた要素名の文字列
 * @param {string} attrs 取得する属性を指定する文字列
 * @return {Promise<PreparedElementAttributes>} 要素名の配列、および属性オプションを含むオブジェクト
 */
export async function prepareElementAttributes(
    url: string,
    elements: string,
    attrs: string,
): Promise<PreparedElementAttributes> {
    // URLからコンテンツ取得
    const response = await fetch(url)
    const contents = await response.text()
    // 要素名の含まれた文字列を配列に分割
    const tags = splitString(elements, [',', '+'])
    // 取得する属性を判定するオプションを取得
    const attributes = getAttributeOption(attrs)

    return { contents, tags, attributes }
}
