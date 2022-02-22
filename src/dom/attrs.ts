import type { DOMElement, DOMNodeAttribute } from '../shared/dom'

export const setAttribute = (node: DOMElement, key: string, value: DOMNodeAttribute): void => {
  node.attributes[key] = value
}
