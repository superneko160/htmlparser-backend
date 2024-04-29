import { getElementAttributes } from './../../src/utils/getElements'

describe('getElementAttributes', () => {
    test('空のHTMLコンテンツを渡した場合は空のオブジェクトを返す', () => {
        const contents = ''
        const elementNames = ['div', 'span']
        const expected = {
            div: [],
            span: [],
        }
        const actual = getElementAttributes(contents, elementNames)
        expect(actual).toEqual(expected)
    })

    test('指定した要素名の属性と値を取得できる', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ id: 'main', class: 'container' }],
            span: [{ style: 'color: red;' }, { 'data-value': '12345' }],
        }
        const actual = getElementAttributes(contents, elementNames)
        expect(actual).toEqual(expected)
    })

    test('idのみを取得できる', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ id: 'main' }],
            span: [{}, {}],
        }
        const actual = getElementAttributes(contents, elementNames, 'id')
        expect(actual).toEqual(expected)
    })

    test('classのみを取得できる', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ class: 'container' }],
            span: [{}, {}],
        }
        const actual = getElementAttributes(contents, elementNames, 'class')
        expect(actual).toEqual(expected)
    })

    test('idとclassのみを取得できる', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ id: 'main', class: 'container' }],
            span: [{}, {}],
        }
        const actual = getElementAttributes(contents, elementNames, 'idAndClass')
        expect(actual).toEqual(expected)
    })

    test('存在しない要素名を指定した場合は空の配列を返す', () => {
        const contents = '<div>Content</div>'
        const elementNames = ['div', 'span', 'p']
        const expected = {
            div: [{}],
            span: [],
            p: [],
        }
        const actual = getElementAttributes(contents, elementNames)
        expect(actual).toEqual(expected)
    })

    test('複数の要素が存在する場合は全ての属性を取得する', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>
      <div id="secondary">
        <span class="highlight">Highlight</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ id: 'main', class: 'container' }, { id: 'secondary' }],
            span: [{ style: 'color: red;' }, { 'data-value': '12345' }, { class: 'highlight' }],
        }
        const actual = getElementAttributes(contents, elementNames)
        expect(actual).toEqual(expected)
    })

    test('includeEmptyがtrueの場合、空のオブジェクトも含まれる', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ id: 'main', class: 'container' }],
            span: [{}, {}],
        }
        const actual = getElementAttributes(contents, elementNames, 'idAndClass', true)
        expect(actual).toEqual(expected)
    })

    test('includeEmptyがfalseの場合、空のオブジェクトは含まれない', () => {
        const contents = `
      <div id="main" class="container">
        <span style="color: red;">Text</span>
        <span data-value="12345">Data</span>
      </div>`
        const elementNames = ['div', 'span']
        const expected = {
            div: [{ id: 'main', class: 'container' }],
            span: [],
        }
        const actual = getElementAttributes(contents, elementNames, 'idAndClass', false)
        expect(actual).toEqual(expected)
    })
})
