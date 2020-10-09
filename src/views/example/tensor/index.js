// views/example/tensor/index.js

import InputBox from '@/components/common/inputBox/index.vue'
import Btn from '@/components/common/btn/index.vue'

import Clipboard from '@/directives/clipboard/clipboard'

import { executeCodeSnippet } from '@/utils/index'


export default {
  name: 'TensorPage',
  directives: {
    Clipboard
  },
  data() {
    return {
      list: [
        { desc: '传递值数组以创建向量', code: `tf.tensor([1, 2, 3, 4]).print();` },
        { desc: '传递值的嵌套数组以构成矩阵或更高的矩阵', code: `tf.tensor([[1, 2], [3, 4]]).print();` },
        { desc: '传递平面数组并自己指定形状', code: `tf.tensor([1, 2, 3, 4], [2, 2]).print();` },
      ]

    }
  },
  computed: {

  },
  components: {
    Btn,
    InputBox
  },
  mounted() {
  },
  methods: {
    onExcCode(i) {
      executeCodeSnippet(document.getElementById(`output_${i}`), this.list[i].code)
    }
  }
}