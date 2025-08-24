import { getAttributeOption, shouldExtractAttribute } from './../../src/helpers/attributeHelpers'

describe('getAttributeOption', () => {
    it('空文字列の場合は"all"を返す', () => {
        const result = getAttributeOption('')
        expect(result).toBe('all')
    })

    it('引数なしの場合は"all"を返す', () => {
        const result = getAttributeOption()
        expect(result).toBe('all')
    })

    it('空配列の場合は"all"を返す', () => {
        const result = getAttributeOption([])
        expect(result).toBe('all')
    })

    it('"all"文字列の場合は"all"を返す', () => {
        const result = getAttributeOption('all')
        expect(result).toBe('all')
    })

    it('単一の文字列の場合は配列として返す', () => {
        const result = getAttributeOption('id')
        expect(result).toEqual(['id'])
    })

    it('文字列の配列の場合はそのまま返す', () => {
        const attrs = ['id', 'class']
        const result = getAttributeOption(attrs)
        expect(result).toEqual(['id', 'class'])
    })

    it('複数の属性を含む配列の場合はそのまま返す', () => {
        const attrs = ['id', 'class', 'src', 'href']
        const result = getAttributeOption(attrs)
        expect(result).toEqual(['id', 'class', 'src', 'href'])
    })
})

describe('shouldExtractAttribute', () => {
    it('"all"の場合はどの属性でもtrueを返す', () => {
        expect(shouldExtractAttribute('id', 'all')).toBe(true)
        expect(shouldExtractAttribute('class', 'all')).toBe(true)
        expect(shouldExtractAttribute('src', 'all')).toBe(true)
        expect(shouldExtractAttribute('custom-attr', 'all')).toBe(true)
    })

    it('配列に含まれる属性の場合はtrueを返す', () => {
        const targetAttrs = ['id', 'class', 'src']
        expect(shouldExtractAttribute('id', targetAttrs)).toBe(true)
        expect(shouldExtractAttribute('class', targetAttrs)).toBe(true)
        expect(shouldExtractAttribute('src', targetAttrs)).toBe(true)
    })

    it('配列に含まれない属性の場合はfalseを返す', () => {
        const targetAttrs = ['id', 'class']
        expect(shouldExtractAttribute('src', targetAttrs)).toBe(false)
        expect(shouldExtractAttribute('href', targetAttrs)).toBe(false)
        expect(shouldExtractAttribute('alt', targetAttrs)).toBe(false)
    })

    it('空配列の場合はfalseを返す', () => {
        const targetAttrs: string[] = []
        expect(shouldExtractAttribute('id', targetAttrs)).toBe(false)
        expect(shouldExtractAttribute('class', targetAttrs)).toBe(false)
    })
})
