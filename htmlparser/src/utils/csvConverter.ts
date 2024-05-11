import type { ElementAttributesMap } from './../types'

/**
 * JSONデータをCSV形式に変換する
 * @param {ElementAttributesMap} data 各要素名をキーとする属性と値の配列を持つオブジェクト
 * @returns {string} CSV形式の文字列
 */
export function convertToCSV(data: ElementAttributesMap): string {
    // ヘッダー名
    const headers = ['elementName', 'attributeName', 'attributeValue']
    // 行データ
    const rows: string[] = []

    // ヘッダー行を作成
    rows.push(headers.join(','))

    // データ行を作成
    for (const elementName of Object.keys(data)) {
        const elementData = data[elementName]
        for (const attributes of elementData) {
            for (const [attributeName, attributeValue] of Object.entries(attributes)) {
                const row = [elementName, attributeName, attributeValue]
                rows.push(row.join(','))
            }
        }
    }

    return rows.join('\n')
}
