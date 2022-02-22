import type { VNodeProps } from '@vue/runtime-core'

import type { ElementNames, DOMNodeAttribute } from '../shared/dom'
import type { OutputTransformer } from '../shared/output'
import type { Styles } from '../shared/style'

import { createNode } from './node'
import { setStyle } from './style'
import { setAttribute } from './attrs'

export const createElement = (
  type: ElementNames,
  isSVG?: boolean,
  isCustomizedBuiltIn?: string,
  vNodeProps?: VNodeProps & Record<string, any>
) => {
  const node = createNode(type)

  if (vNodeProps == null) return node

  for (const [key, value] of Object.entries(vNodeProps)) {
    if (key === 'children') {
      continue
    } else if (key === 'style') {
      setStyle(node, value as Styles)
    } else if (key === 'internal_transform') {
      node.internal_transform = value as OutputTransformer
    } else if (key === 'internal_static') {
      node.internal_static = true
    } else {
      setAttribute(node, key, value as DOMNodeAttribute)
    }
  }

  return node
}
