// views/example/scalar/index.js

import * as tf from '@tensorflow/tfjs'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import InputBox from '@/components/common/inputBox/index.vue'

import Clipboard from '@/directives/clipboard/clipboard'

export default {
  name: 'ScalarPage',
  directives: {
    Clipboard
  },
  data() {
    return {}
  },
  computed: {

  },
  components: {
    InputBox
  },
  mounted() {
    monaco.editor.create(document.getElementById('monacoEditor'), {
      value: `
      import * as tf from '@tensorflow/tfjs'
      const scalar = tf.scalar(5)
      scalar.print()`,
      language: 'javascript'
    })
    const scalar = tf.scalar(5)
    scalar.print()
  },
  methods: {
    onChange() {
    },
  }
}