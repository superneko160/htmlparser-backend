import type { AttributeOption } from './../types'

/**
 * 属性名の配列から属性オプションを取得
 * @param {string[]|string} attrs 属性名の配列または文字列
 * @return {AttributeOption} 'all' | 属性名の配列
 */
export function getAttributeOption(attrs: string[] | string = ''): AttributeOption {
    // 空の場合は全属性を取得
    if (!attrs || (Array.isArray(attrs) && attrs.length === 0) || attrs === '') {
        return 'all'
    }

    // 'all'の場合は文字列なので配列に変換
    if (typeof attrs === 'string') {
        return attrs === 'all' ? 'all' : [attrs]
    }

    return attrs
}

/**
 * 指定された属性が取得対象かどうかを判定
 * @param {string} attr 判定する属性名
 * @param {AttributeOption} targetAttrs 取得対象の属性
 * @return {boolean} 取得対象の場合はtrue
 */
export function shouldExtractAttribute(attr: string, targetAttrs: AttributeOption): boolean {
    // 'all'の場合はすべての属性を取得
    if (targetAttrs === 'all') {
        return true
    }

    // 配列の場合は指定された属性名が含まれているか確認
    if (Array.isArray(targetAttrs)) {
        return targetAttrs.includes(attr)
    }

    return false
}
