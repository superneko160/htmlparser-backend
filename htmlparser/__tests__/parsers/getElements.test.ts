import { getElementAttributes } from './../../src/parsers/getElements'

describe('getElementAttributes', () => {
    it('空のHTMLコンテンツを渡した場合は空のオブジェクトを返す', () => {
        const contents = ''
        const elementNames = ['div', 'span']
        const expected = {
            div: [],
            span: [],
        }
        const actual = getElementAttributes(contents, elementNames)
        expect(actual).toEqual(expected)
    })

    it('指定した要素名の属性と値を取得できる', () => {
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

    it('idのみを取得できる', () => {
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
        const actual = getElementAttributes(contents, elementNames, ['id'])
        expect(actual).toEqual(expected)
    })

    it('classのみを取得できる', () => {
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
        const actual = getElementAttributes(contents, elementNames, ['class'])
        expect(actual).toEqual(expected)
    })

    it('idとclassのみを取得できる', () => {
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
        const actual = getElementAttributes(contents, elementNames, ['id', 'class'])
        expect(actual).toEqual(expected)
    })

    it('複数の属性（id, class, src）を取得できる', () => {
        const contents = `
      <div id="main" class="container" data-test="value">
        <img src="image1.jpg" alt="Image 1" class="photo">
        <img src="image2.jpg" data-id="img2">
      </div>`
        const elementNames = ['div', 'img']
        const expected = {
            div: [{ id: 'main', class: 'container' }],
            img: [{ src: 'image1.jpg', class: 'photo' }, { src: 'image2.jpg' }],
        }
        const actual = getElementAttributes(contents, elementNames, ['id', 'class', 'src'])
        expect(actual).toEqual(expected)
    })

    it('存在しない要素名を指定した場合は空の配列を返す', () => {
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

    it('複数の要素が存在する場合は全ての属性を取得する', () => {
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

    it('includeEmptyがtrueの場合、空のオブジェクトも含まれる', () => {
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
        const actual = getElementAttributes(contents, elementNames, ['id', 'class'], true)
        expect(actual).toEqual(expected)
    })

    it('includeEmptyがfalseの場合、空のオブジェクトは含まれない', () => {
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
        const actual = getElementAttributes(contents, elementNames, ['id', 'class'], false)
        expect(actual).toEqual(expected)
    })

    it('カスタム属性（data-*, aria-*など）を取得できる', () => {
        const contents = `
      <div data-component="header" aria-label="Main navigation">
        <button data-action="toggle" aria-expanded="false">Menu</button>
      </div>`
        const elementNames = ['div', 'button']
        const expected = {
            div: [{ 'data-component': 'header', 'aria-label': 'Main navigation' }],
            button: [{ 'data-action': 'toggle', 'aria-expanded': 'false' }],
        }
        const actual = getElementAttributes(contents, elementNames, ['data-component', 'aria-label', 'data-action', 'aria-expanded'])
        expect(actual).toEqual(expected)
    })
})
