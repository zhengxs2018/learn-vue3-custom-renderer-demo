import type { YogaNode } from 'yoga-layout-prebuilt'
import type { RendererElement } from '@vue/runtime-core'

import type { OutputTransformer } from './output'
import type { Styles } from './style'

export interface InkNode {
  parentNode: DOMElement | null
  yogaNode?: YogaNode
  internal_static?: boolean
  style: Styles
}

export type TextName = '#text'

export type ElementNames = 'ink-root' | 'ink-box' | 'ink-text' | 'ink-virtual-text'

export type NodeNames = ElementNames | TextName

export interface DOMElement extends RendererElement, InkNode {
  nodeName: ElementNames
  attributes: {
    [key: string]: DOMNodeAttribute
  }
  childNodes: DOMNode[]
  internal_transform?: OutputTransformer

  // Internal properties
  isStaticDirty?: boolean
  staticNode?: any
  onRender?: () => void
  onImmediateRender?: () => void
}

export type TextNode = {
  nodeName: TextName
  nodeValue: string
} & InkNode

export type DOMNode<T = { nodeName: NodeNames }> = T extends {
  nodeName: infer U
}
  ? U extends '#text'
    ? TextNode
    : DOMElement
  : never

export type DOMNodeAttribute = boolean | string | number
