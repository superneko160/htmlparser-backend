import { splitString } from './../../src/utils/stringHelpers'

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