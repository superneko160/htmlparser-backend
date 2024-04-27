import { getAttributeOption } from './../../src/utils/attributeHelpers'

describe('getAttributeOption', () => {
  it('"id"と"class"の両方が含まれる場合は"idAndClass"を返す', () => {
    const attrs = ['id', 'class']
    const result = getAttributeOption(attrs)
    expect(result).toBe('idAndClass')
  })

  it('"id"のみが含まれる場合は"id"を返す', () => {
    const attrs = ['id']
    const result = getAttributeOption(attrs)
    expect(result).toBe('id')
  })

  it('"class"のみが含まれる場合は"class"を返す', () => {
    const attrs = ['class']
    const result = getAttributeOption(attrs)
    expect(result).toBe('class')
  })

  it('"id"と"class"以外の値が含まれる場合は"all"を返す', () => {
    const attrs = ['other']
    const result = getAttributeOption(attrs)
    expect(result).toBe('all')
  })

  it('引数なしの場合は"all"を返す', () => {
    const result = getAttributeOption()
    expect(result).toBe('all')
  })
})