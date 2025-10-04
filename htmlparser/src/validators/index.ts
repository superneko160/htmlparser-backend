import type { MiddlewareHandler } from 'hono'
import { validator } from 'hono/validator'
import { removeWhitespace } from './../helpers/stringHelpers'

/**
 * フォームに入力されたURLと要素のバリデーション
 * @return {MiddlewareHandler} バリデーション結果
 */
export function validateParseRequest(): MiddlewareHandler {
    return validator('form', async (value, c) => {
        const url = removeWhitespace(value.url)
        const elements = removeWhitespace(value.elements)

        if (!matchesUrlPattern(url)) {
            return c.json({ status: 400, error: 'Invalid URL' })
        }

        if (!matchesElementNamePattern(elements)) {
            return c.json({ status: 400, error: 'Invalid element names' })
        }

        return value
    })
}

/**
 * URLの正規表現パターンにマッチしているか判定
 * @param {string} url URL
 * @return {boolean} 判定結果
 */
export function matchesUrlPattern(url: string): boolean {
    const urlPattern = /^https?:\/\/[\w/:%#$&?()~.=+-]+$/
    return urlPattern.test(url)
}

/**
 * 要素名の正規表現パターンにマッチしているか判定
 * @param {string} elements 要素名
 * @param {boolean} 判定結果
 */
export function matchesElementNamePattern(elements: string): boolean {
    const elementPattern = /^[a-zA-Z0-9,+]+$/
    return elementPattern.test(elements)
}
