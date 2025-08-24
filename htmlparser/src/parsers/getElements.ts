import * as cheerio from 'cheerio'
import type { AttributeOption, ElementAttributes, ElementAttributesMap } from './../types'
import { shouldExtractAttribute } from '../helpers/attributeHelpers'

/**
 * 指定した要素名の属性と値を取得
 * @param {string} contents HTMLコンテンツ
 * @param {string[]} elementNames 取得する要素
 * @param {AttributeOption} attributeNames 取得する属性（初期値：all（全属性取得））
 * @param {boolean} includeEmpty 空のオブジェクトも含めるか否か（初期値：true（含める））
 * @return {ElementAttributesMap} 各要素名をキーとする属性と値の配列を持つオブジェクト
 */
export function getElementAttributes(
    contents: string,
    elementNames: string[],
    attributeNames: AttributeOption = 'all',
    includeEmpty = true,
): ElementAttributesMap {
    const $ = cheerio.load(contents)

    const data: ElementAttributesMap = {}

    elementNames.forEach(elementName => {
        const attributes: ElementAttributes[] = []

        // 指定した要素名の要素を探索
        $(elementName).each((_, element) => {
            const attrs = (element as cheerio.Element).attribs
            const elementAttrs: ElementAttributes = {}

            // 各属性をチェックして、取得対象の場合のみ追加
            for (const attr in attrs) {
                if (shouldExtractAttribute(attr, attributeNames)) {
                    elementAttrs[attr] = attrs[attr]
                }
            }

            if (includeEmpty || Object.keys(elementAttrs).length > 0) {
                attributes.push(elementAttrs)
            }
        })

        data[elementName] = attributes
    })

    return data
}
