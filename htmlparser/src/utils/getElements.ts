import * as cheerio from 'cheerio'
import type { AttributeOption } from './../types/types'

/**
 * 指定した要素名の属性と値を取得
 * @param {string} contents HTMLコンテンツ
 * @param {string[]} elementNames 取得する要素
 * @param {AttributeOption} attributeNames 取得する属性（初期値：all（全属性取得））
 * @param {boolean} includeEmpty 空のオブジェクトも含めるか否か（初期値：true（含める））
 * @return {Object} 各要素名をキーとする属性と値の配列を持つオブジェクト
 */
export function getElementAttributes(
    contents: string,
    elementNames: string[],
    attributeNames: AttributeOption = 'all',
    includeEmpty: boolean = true
): { [key: string]: Object[] } {

    const $ = cheerio.load(contents)

    const data: { [key: string]: Object[] } = {}

    elementNames.forEach(elementName => {

        const attributes: Object[] = []

        // 指定した要素名の要素を探索
        $(elementName).each((_, element) => {
            const attrs = (element as cheerio.Element).attribs
            const elementAttrs: { [key: string]: string } = {}

            // 取得する属性に応じた条件分岐を備えた関数を取得
            const shouldExtractAttribute = getShouldExtractAttributeFunction(attributeNames)

            for (const attr in attrs) {
                if (shouldExtractAttribute(attr)) {
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

/**
 * 属性を抽出するか否かを判定する関数を取得
 * @param {AttributeOption} attributeNames 取得する属性
 * @return {(attr: string) => boolean} 属性を抽出するか否か判定する関数
 */
function getShouldExtractAttributeFunction(
    attributeNames: AttributeOption
): (attr: string) => boolean {

    switch (attributeNames) {
      case 'all':
        return () => true
      case 'id':
        return (attr) => attr === 'id'
      case 'class':
        return (attr) => attr === 'class'
      case 'idAndClass':
        return (attr) => attr === 'id' || attr === 'class'
    }
}