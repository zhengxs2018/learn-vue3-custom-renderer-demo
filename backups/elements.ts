// This is the most low level node.

import { defaults, PDFStyleSheet } from './styling'

export type Tag = 'View' | 'Text'

// Eg Text is a PDFNode. PDFNode does not have children.
export class PDFNode {
  id: string = (Math.random() * 10000).toFixed(0)
  _parent: string | undefined
  styles: PDFStyleSheet = {}

  public get parent(): string {
    if (!this._parent) {
      throw Error(`No parent found for node #${this.id}`)
    }

    return this._parent
  }
}

export class PDFTextNode extends PDFNode {
  value: string

  constructor(value: string) {
    super()
    this.value = value
  }
}

// PDFElement is the main class of Elements you will use.
// The difference between PDFNode and PDFElement is PDFElements can have children.
export class PDFElement extends PDFNode {
  children: string[] = []
  tag: Tag

  constructor(tag: Tag) {
    super()
    this.tag = tag
  }
}

export class PDFDocumentElement extends PDFElement {
  id = 'root'
  styles: PDFStyleSheet = { ...defaults }
  filename: string

  constructor(tag: Tag, options: { filename: string }) {
    super(tag)
    this.filename = options.filename
  }
}

export class PDFImageElement extends PDFElement {
  _src: string = ''
  width?: number
  height?: number

  get src(): string {
    if (this._src === '') {
      throw Error(`src must be set to use <Image>`)
    }

    return this._src
  }
}

export class PDFTextElement extends PDFElement {}
export class PDFViewElement extends PDFElement {}

export type PDFRenderable =
  | PDFTextNode
  | PDFImageElement
  | PDFTextElement
  | PDFViewElement
  | PDFDocumentElement

export type PDFNodes = PDFTextNode

export type PDFElements = PDFImageElement | PDFTextElement | PDFViewElement | PDFDocumentElement

export type NodeMap = Record<string, PDFNodes | PDFElements>
