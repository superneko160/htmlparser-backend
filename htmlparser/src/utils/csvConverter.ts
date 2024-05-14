import type { ElementAttributes, ElementAttributesMap } from './../types'

/**
 * JSONデータをCSV形式に変換する
 * @param {ElementAttributesMap} data 各要素名をキーとする属性と値の配列を持つオブジェクト
 * @return {string} CSV形式の文字列
 */
export function convertToCSV(data: ElementAttributesMap): string {
    // ヘッダ
    const headers = ['elementName', 'attributeName', 'attributeValue']

    let rows: string[] = [headers.join(',')]

    for (const [elementName, elementData] of Object.entries(data)) {
        rows = rows.concat(convertElementDataToRows(elementName, elementData))
    }

    return rows.join('\n')
}

/**
 * 要素データをCSVの行データに変換する
 * @param {string} elementName 要素名
 * @param {Array<ElementAttributes>} elementData 要素の属性
 * @return {string[]} CSVの行データ
 */
function convertElementDataToRows(
    elementName: string,
    elementData: Array<ElementAttributes>,
): string[] {
    const rows: string[] = []

    elementData.forEach(attributes => {
        rows.push(...convertAttributesToRows(elementName, attributes))
    })

    return rows
}

/**
 * 属性データをCSVの行データに変換する
 * @param {string} elementName 要素名
 * @param {ElementAttributes} attributes 属性
 * @return {string[]} CSVの行データ
 */
function convertAttributesToRows(elementName: string, attributes: ElementAttributes): string[] {
    return Object.entries(attributes).map(([attributeName, attributeValue]) => {
        return [elementName, attributeName, attributeValue].join(',')
    })
}
