import { vi, it, describe, expect } from 'vitest'
import type { FetchDependencies } from './../../src/types'
import { prepareElementAttributes } from './../../src/utils/prepareElements'

const mockFetchUrl = vi.fn(async (url: string) => {
    return '<div id="test">Hello World</div>'
})

const mockSplitString = vi.fn((input: string, separators: string[]) => {
    return input.split(separators[0])
})

const mockGetAttributeOption = vi.fn((attrs: string) => {
    return attrs.split(',')
})

const deps: FetchDependencies = {
    fetchUrl: mockFetchUrl,
    splitString: mockSplitString,
    getAttributeOption: mockGetAttributeOption,
}

describe('prepareElementAttributes', () => {
    it('解析関数に渡すURL、要素、取得属性の準備', async () => {
        const url = 'https://example.com'
        const elements = 'div,p'
        const attrs = 'id,class'

        const result = await prepareElementAttributes(url, elements, attrs, deps)

        expect(result).toEqual({
            contents: '<div id="test">Hello World</div>',
            tags: ['div', 'p'],
            attributes: ['id', 'class'],
        })
    })
})
