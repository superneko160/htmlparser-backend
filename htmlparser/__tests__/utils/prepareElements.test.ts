import { vi, it, describe, expect } from 'vitest'
import type { FetchDependencies } from './../../src/types'
import { prepareElementAttributes } from './../../src/utils/prepareElements'

const mockFetchUrl = vi.fn(async (url: string) => {
    return '<div id="test">Hello World</div>'
})

const mockSplitString = vi.fn((input: string, separators: string[]) => {
    return input.split(separators[0])
})

const mockGetAttributeOption = vi.fn((attrs: string | string[]) => {
    if (attrs === '' || attrs === 'all') return 'all'
    if (typeof attrs === 'string') return [attrs]
    return attrs
})

const deps: FetchDependencies = {
    fetchUrl: mockFetchUrl,
    splitString: mockSplitString,
    getAttributeOption: mockGetAttributeOption,
}

describe('prepareElementAttributes', () => {
    it('解析関数に渡すURL、要素、取得属性の準備（文字列属性）', async () => {
        const url = 'https://example.com'
        const elements = 'div,p'
        const attrs = 'id'

        const result = await prepareElementAttributes(url, elements, attrs, deps)

        expect(result).toEqual({
            contents: '<div id="test">Hello World</div>',
            tags: ['div', 'p'],
            attributes: ['id'],
        })
    })

    it('解析関数に渡すURL、要素、取得属性の準備（配列属性）', async () => {
        const url = 'https://example.com'
        const elements = 'div,p'
        const attrs = ['id', 'class', 'src']

        const result = await prepareElementAttributes(url, elements, attrs, deps)

        expect(result).toEqual({
            contents: '<div id="test">Hello World</div>',
            tags: ['div', 'p'],
            attributes: ['id', 'class', 'src'],
        })
    })

    it('空の属性配列の場合は"all"を返す', async () => {
        const url = 'https://example.com'
        const elements = 'div,p'
        const attrs: string[] = []

        const result = await prepareElementAttributes(url, elements, attrs, deps)

        expect(result).toEqual({
            contents: '<div id="test">Hello World</div>',
            tags: ['div', 'p'],
            attributes: 'all',
        })
    })

    it('属性が空文字列の場合は"all"を返す', async () => {
        const url = 'https://example.com'
        const elements = 'div,p'
        const attrs = ''

        const result = await prepareElementAttributes(url, elements, attrs, deps)

        expect(result).toEqual({
            contents: '<div id="test">Hello World</div>',
            tags: ['div', 'p'],
            attributes: 'all',
        })
    })
})
