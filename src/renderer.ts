import { createRenderer } from '@vue/runtime-core'

import { ElementNames } from './shared/dom'

import { createElement } from './dom'

export const { createApp, render } = createRenderer({
  patchProp(
    el,
    key,
    prevValue,
    nextValue,
    isSVG = false,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren
  ) {
    console.group('patchProp')
    console.log('key', key)
    console.log('nextValue', nextValue)
    console.groupEnd()
  },
  createElement(type, isSvg, isCustomizedBuiltIn) {
    console.group('createElement')
    console.log('type', type)
    console.log('isSvg', isSvg)
    console.log('isCustomizedBuiltIn', isCustomizedBuiltIn)
    console.groupEnd()
    return createElement(type as ElementNames)
  },
  createText(text) {
    console.log('createText', text)
    // return document.createTextNode(text);
    return []
  },
  createComment(text) {
    console.log('createComment', text)
    // return document.createComment(text);
    return []
  },
  setText(node, text) {
    console.log('setText', text)
  },
  setElementText(el, text) {
    console.log('setElementText', text)
  },
  parentNode(node) {
    console.log('parentNode')
    return node.parentNode
  },
  nextSibling(node) {
    console.log('nextSibling')
    return node.nextSibling
  },
  querySelector(selector) {
    console.log('querySelector', selector)
    // return document.querySelector(selector);
    return null
  },
  setScopeId(el, id) {
    console.log('setScopeId', id)
    // el.setAttribute(id, "");
  },
  cloneNode(el) {
    console.log('cloneNode')
    return el.cloneNode(true)
  },

  insert(child, parent, anchor) {
    console.log('insert')
  },
  remove(child) {
    console.log('remove')
    // const parent = child.parentNode;
    // if (parent) {
    //   parent.removeNode(child);
    // }
  },

  //   insertStaticContent() { },
})
