export default {
  name: 'Btn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    plain: Boolean,
    disabled: Boolean
  },
  data() {
    return {

    }
  },
  computed: {
    className() {
      let cls = []
      if (this.type) {
        cls.push(`btn-${this.type}`)
      }
      if (this.plain) {
        cls.push('is-plain')
      }
      if (this.disabled) {
        cls.push('is-disabled')
      }
      return cls.join(' ')
    }
  },
  created() {
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return
      this.$emit('click', e)
    }
  }
}