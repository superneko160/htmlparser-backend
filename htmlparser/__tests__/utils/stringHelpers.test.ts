import { splitString, removeWhitespace } from './../../src/utils/stringHelpers'

describe('splitString', () => {
    test('空文字列を渡した場合は空の配列を返す', () => {
        const input = ''
        const separators = ['+', ',']
        const expected: string[] = []
        const actual = splitString(input, separators)
        expect(actual).toEqual(expected)
    })

    test('区切り文字がない場合は入力文字列をそのまま1要素の配列で返す', () => {
        const input = 'h1'
        const separators = ['+', ',']
        const expected = ['h1']
        const actual = splitString(input, separators)
        expect(actual).toEqual(expected)
    })

    test('複数の区切り文字で分割できる', () => {
        const input = 'h1,a+span,ul+li'
        const separators = ['+', ',']
        const expected = ['h1', 'a', 'span', 'ul', 'li']
        const actual = splitString(input, separators)
        expect(actual).toEqual(expected)
    })
})

describe('removeWhitespace', () => {
    test('文字列から空白を除去', () => {
        const cases = [
            { input: ' Hello   World ', expected: 'HelloWorld' }, // 半角スペース
            { input: '　　Hello　World　　', expected: 'HelloWorld' }, // 全角スペース
            { input: 'Hello\n\tWorld\r', expected: 'HelloWorld' }, // 改行、タブ、復帰
            { input: '   ', expected: '' }, // 空白文字のみ
            { input: '', expected: '' }, // 空文字列
        ]
        cases.forEach(({ input, expected }) => {
            expect(removeWhitespace(input)).toBe(expected)
        })
    })
})
