// views/index.js

import * as tf from '@tensorflow/tfjs'

import Loading from '@/components/common/loading/index.vue'

export default {
  name: 'HomePage',
  data() {
    return {
      loadingShow: false
    }
  },
  computed: {

  },
  components: {
    Loading
  },
  created() {
    this.localStorageModel()
    this.indexdbModel()
  },
  methods: {
    // localStorage存储Model
    async localStorageModel() {
      const model = tf.sequential()
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
      const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
      const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])
      model.fit(xs, ys).then(() => {
        model.predict(tf.tensor2d([5], [1, 1])).print()
      })
      await model.save('localstorage://model-1')
    },
    // indexdb存储Model
    async indexdbModel() {
      let model = tf.sequential()
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
      //目标y=2x-1
      const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
      const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])
      console.log('开始训练')
      for (let i = 0; i < 2000; i++) await model.fit(xs, ys)
      console.log('训练完毕')
      let save = await model.save('indexeddb://model-1')
      model = await tf.loadLayersModel('indexeddb://model-1')
      model.predict(tf.tensor2d([10], [1, 1])).print()
    },
  }
}