import * as cheerio from 'cheerio'
import type { AttributeOption } from './../types/types'

/**
 * 指定した要素名の属性と値を取得する関数
 * @param {string} contents HTMLコンテンツ
 * @param {string[]} elementNames 取得する要素
 * @param {AttributeOption} option 取得する属性のオプション（初期値：all（全属性取得））
 * @return {Object} 各要素名をキーとする属性と値の配列を持つオブジェクト
 */
export function getElementAttributes(
    contents: string,
    elementNames: string[],
    option: AttributeOption = 'all'
): { [key: string]: Object[] } {

    const $ = cheerio.load(contents)

    const data: { [key: string]: Object[] } = {}

    elementNames.forEach(elementName => {

        const attributes: Object[] = []

        // 指定した要素名の要素を探索
        $(elementName).each((i, el) => {
            const attrs = (el as cheerio.Element).attribs
            const elementAttrs: { [key: string]: string } = {}

            // オプションに応じて属性を抽出
            const shouldExtractAttribute = getShouldExtractAttributeFunction(option)

            for (const attr in attrs) {
                if (shouldExtractAttribute(attr)) {
                    elementAttrs[attr] = attrs[attr]
                }
            }

            attributes.push(elementAttrs)
        })

        data[elementName] = attributes
    })

    return data
}

/**
 * 属性を抽出するか否かを判定する関数を返す
 * @param {AttributeOption} option 取得する属性のオプション
 * @return {(attr: string) => boolean} 属性を抽出するか否か判定する関数
 */
function getShouldExtractAttributeFunction(option: AttributeOption): (attr: string) => boolean {
    switch (option) {
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