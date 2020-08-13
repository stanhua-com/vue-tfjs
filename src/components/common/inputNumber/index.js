import RepeatClick from '@/directives/repeatClick'

export default {
  name: 'InputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number],
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: Boolean
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
  },
  directives: {
    RepeatClick
  },
  created() {

  },
  methods: {
    minusClick() {
      if (this.disabled) return
      this.currentValue -= this.step
      this.setCurrentValue()
    },
    plusClick() {
      if (this.disabled) return
      this.currentValue += this.step
      this.setCurrentValue()
    },
    setCurrentValue() {
      if (this.currentValue >= this.max) this.currentValue = this.max
      if (this.currentValue <= this.min) this.currentValue = this.min
      this.$emit('change', this.currentValue)
    }
  }
}