import { convertToCSV } from './../../src/utils/csvConverter'

describe('convertToCSV', () => {
    it('空のオブジェクトを渡した場合、ヘッダー行のみ返す', () => {
        const data = {}
        const expected = 'elementName,attributeName,attributeValue'
        const actual = convertToCSV(data)
        expect(actual).toBe(expected)
    })

    it('要素の属性と値が正しくCSV形式に変換される', () => {
        const data = {
            div: [{ id: 'main', class: 'container' }, { style: 'color: red;' }],
            span: [{ 'data-value': '12345' }, { class: 'highlight' }],
        }
        const expected = `elementName,attributeName,attributeValue\ndiv,id,main\ndiv,class,container\ndiv,style,color: red;\nspan,data-value,12345\nspan,class,highlight`
        const actual = convertToCSV(data)
        expect(actual).toBe(expected)
    })
})
