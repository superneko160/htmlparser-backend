import { matchesUrlPattern, matchesElementNamePattern } from './../../src/validators'

describe('matchesUrlPattern', () => {
    it('有効なURLの場合はtrueを返す', () => {
        expect(matchesUrlPattern('https://example.com')).toBe(true)
        expect(matchesUrlPattern('http://www.example.co.jp/path/to/resource')).toBe(true)
    })

    it('無効なURLの場合はfalseを返す', () => {
        expect(matchesUrlPattern('invalid-url')).toBe(false)
        expect(matchesUrlPattern('www.example.com')).toBe(false)
    })
})

describe('matchesElementNamePattern', () => {
    it('有効な要素名の場合はtrueを返す', () => {
        expect(matchesElementNamePattern('div')).toBe(true)
        expect(matchesElementNamePattern('div,span+p')).toBe(true)
        expect(matchesElementNamePattern('myElement123')).toBe(true)
    })

    it('無効な要素名の場合はfalseを返す', () => {
        expect(matchesElementNamePattern('div.h1')).toBe(false)
        expect(matchesElementNamePattern('div#h1')).toBe(false)
        expect(matchesElementNamePattern('invalid-element')).toBe(false)
    })
})
