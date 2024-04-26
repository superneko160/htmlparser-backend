import * as cheerio from 'cheerio'

/**
 * 指定した要素名の属性と値を取得する関数
 * @param {string} contents HTMLコンテンツ
 * @param {string[]} elementNames 要素名の配列
 * @returns {Object} 各要素名をキーとする属性と値の配列を持つオブジェクト
 */
export function getElementAttributes(contents: string, elementNames: string[]): { [key: string]: Object[] } {

    const $ = cheerio.load(contents)

    const data: { [key: string]: Object[] } = {}

    elementNames.forEach(elementName => {

        const attributes: Object[] = []

        // 指定した要素名の要素を探索
        $(elementName).each((i, el) => {
            const attrs = (el as cheerio.Element).attribs
            const elementAttrs: { [key: string]: string } = {}

            // 属性と値をオブジェクトに格納
            for (const attr in attrs) {
                elementAttrs[attr] = attrs[attr]
            }

            attributes.push(elementAttrs)
        })

        data[elementName] = attributes
    })

    return data
}