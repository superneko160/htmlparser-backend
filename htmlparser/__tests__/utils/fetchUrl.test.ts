import { vi, it, describe, expect, afterEach } from 'vitest'
import { fetchUrl } from './../../src/utils/fetchUrl'

describe('fetchUrl', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('URLからコンテンツ取得', async () => {
        const mockFetch = vi.fn().mockResolvedValue({
            text: vi.fn().mockResolvedValue('<div>Hello World</div>'),
        })
        global.fetch = mockFetch

        const url = 'https://example.com'
        const contents = await fetchUrl(url)

        expect(mockFetch).toHaveBeenCalledWith(url)
        expect(contents).toBe('<div>Hello World</div>')
    })

    it('不正なURLからコンテンツを取得した場合', async () => {
        const mockFetch = vi.fn().mockRejectedValue(new Error('Fetch failed'))
        global.fetch = mockFetch

        const url = 'https://example.com'

        await expect(fetchUrl(url)).rejects.toThrow('Fetch failed')
    })
})
