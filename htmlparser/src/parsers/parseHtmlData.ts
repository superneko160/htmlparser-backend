import type { FetchDependencies } from './../types'
import type { ElementAttributesMap } from './../types'
import { prepareElementAttributes } from './../utils/prepareElements'
import { getElementAttributes } from './getElements'

/**
 * HTML解析
 * @param {string} url 解析対象のURL
 * @param {string} elements 解析対象の要素
 * @param {string | string[]} attrs 取得する属性
 * @param {FetchDependencies} 依存する fetch 関連の関数オブジェクト
 * @return {Promise<ElementAttributesMap>} 各要素名をキーとする属性と値の配列を持つオブジェクト
 */
export async function parseHtmlData(
    url: string, 
    elements: string, 
    attrs: string | string[], 
    fetchDeps: FetchDependencies
): Promise<ElementAttributesMap> {
    const { contents, tags, attributes } = await prepareElementAttributes(
        url, elements, attrs, fetchDeps
    )

    return getElementAttributes(contents, tags, attributes, false)
}
