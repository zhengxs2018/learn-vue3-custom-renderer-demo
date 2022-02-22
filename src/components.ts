import { defineComponent, renderSlot, h } from '@vue/runtime-core'

export type InkElementTagNames = 'View' | 'Text'

function createInkComponent<K extends InkElementTagNames>(tag: K) {
  return defineComponent({
    name: tag,
    inheritAttrs: false,
    render() {
      return h(tag, this.$attrs, renderSlot(this.$slots, 'default'))
    },
  })
}

export const View = createInkComponent('View')
export const Text = createInkComponent('Text')
