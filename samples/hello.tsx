import { defineComponent, h } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

import { createApp, Text, View } from '../src'

const App = defineComponent({
  setup() {
    const count = ref(0)

    return () => {
      return <Text>{count.value}</Text>
    }
  },
})

const app = createApp(App)

// TODO 先完成渲染器的开发，再处理关联问题
app.mount('')
