import Yoga, { YogaNode } from 'yoga-layout-prebuilt'

import type { ElementNames, DOMElement, DOMNode, TextNode } from '../shared/dom'

import wrapText from './wrap-text'
import measureText from './measure-text'
import squashTextNodes from './squash-text-nodes'

export const createNode = (nodeName: ElementNames) => {
  const node: DOMElement = {
    nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: null,
    yogaNode: nodeName === 'ink-virtual-text' ? undefined : Yoga.Node.create(),
  }

  if (nodeName === 'ink-text') {
    node.yogaNode?.setMeasureFunc(measureTextNode.bind(null, node))
  }

  return node
}

export const appendChildNode = (node: DOMElement, childNode: DOMElement): void => {
  if (childNode.parentNode) {
    removeChildNode(childNode.parentNode, childNode)
  }

  childNode.parentNode = node
  node.childNodes.push(childNode)

  if (childNode.yogaNode) {
    node.yogaNode?.insertChild(childNode.yogaNode, node.yogaNode.getChildCount())
  }

  if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
    markNodeAsDirty(node)
  }
}

export const removeChildNode = (node: DOMElement, removeNode: DOMNode): void => {
  if (removeNode.yogaNode) {
    removeNode.parentNode?.yogaNode?.removeChild(removeNode.yogaNode)
  }

  removeNode.parentNode = null

  const index = node.childNodes.indexOf(removeNode)
  if (index >= 0) {
    node.childNodes.splice(index, 1)
  }

  if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
    markNodeAsDirty(node)
  }
}

export const createTextNode = (text: string) => {
  const node: TextNode = {
    nodeName: '#text',
    nodeValue: text,
    yogaNode: undefined,
    parentNode: null,
    style: {},
  }

  setTextNodeValue(node, text)

  return node
}

export const setTextNodeValue = (node: TextNode, text: string): void => {
  if (typeof text !== 'string') {
    text = String(text)
  }

  node.nodeValue = text
  markNodeAsDirty(node)
}

const measureTextNode = function (
  node: DOMNode,
  width: number
): { width: number; height: number } {
  const text = node.nodeName === '#text' ? node.nodeValue : squashTextNodes(node)

  const dimensions = measureText(text)

  // Text fits into container, no need to wrap
  if (dimensions.width <= width) {
    return dimensions
  }

  // This is happening when <Box> is shrinking child nodes and Yoga asks
  // if we can fit this text node in a <1px space, so we just tell Yoga "no"
  if (dimensions.width >= 1 && width > 0 && width < 1) {
    return dimensions
  }

  const textWrap = node.style?.textWrap ?? 'wrap'
  const wrappedText = wrapText(text, width, textWrap)

  return measureText(wrappedText)
}

const findClosestYogaNode = (node?: DOMNode): YogaNode | undefined => {
  if (!node || !node.parentNode) {
    return undefined
  }

  return node.yogaNode ?? findClosestYogaNode(node.parentNode)
}

const markNodeAsDirty = (node?: DOMNode): void => {
  // Mark closest Yoga node as dirty to measure text dimensions again
  const yogaNode = findClosestYogaNode(node)
  yogaNode?.markDirty()
}
