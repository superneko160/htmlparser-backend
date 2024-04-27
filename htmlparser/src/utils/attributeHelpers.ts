import type { AttributeOption } from './../types/types'

/**
 * 属性名の配列から属性オプションを取得
 * @param {string[]|string} attrs 属性名（初期値：''）
 * @return {AttributeOption} all | id | class | idAndClass
 */
export function getAttributeOption(attrs: string[]|string = ''): AttributeOption {
    if (attrs.includes('id') && attrs.includes('class')) return 'idAndClass'
    if (attrs.includes('id')) return 'id'
    if (attrs.includes('class')) return 'class'
    return 'all'
}