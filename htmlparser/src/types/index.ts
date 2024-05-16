export type AttributeOption = 'all' | 'id' | 'class' | 'idAndClass'
export type ElementAttributes = { [key: string]: string }
export type ElementAttributesMap = { [key: string]: ElementAttributes[] }
export type PreparedElementAttributes = {
    contents: string
    tags: string[]
    attributes: AttributeOption
}
