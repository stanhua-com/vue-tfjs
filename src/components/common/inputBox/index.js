import { debounce } from '@/utils'

export default {
  name: 'InputBox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: {
      type: String,
      default: 'off'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    autofocus: Boolean,
    clearable: Boolean,
    debounce: {
      type: Number,
      default: 350
    }
  },
  data() {
    return {
      currentValue: this.value,
      isClear: false
    }
  },
  computed: {
    inputClass() {
      if (this.$slots.prepend) {
        if (this.$slots.append) {
          return 'input-prepend'
        }
        else {
          return 'input-prepend-append'
        }
      }
      else if (this.$slots.append || this.clearable) {
        return 'input-append'
      }
      return ''
    }
  },
  created() {
    this.onChange = debounce(this.onChange, this.debounce)
  },
  methods: {
    onChange(e) {
      if (this.clearable && e.target.value) {
        this.isClear = true
      }
      else {
        this.isClear = false
      }
      this.$emit('change', e.target.value)
    },
    onFocus(e) {
      if (this.clearable && this.currentValue) {
        this.isClear = true
      }
      this.$emit('focus', e)
    },
    onBlur(e) {
      if (this.isClear) {
        setTimeout(() => {
          this.isClear = false
        }, 500)
      }
      this.$emit('blur', e)
    },
    onClear() {
      this.currentValue = ''
      this.$emit('change', '')
      this.$emit('clear')
    },

    focus() {
      this.$el.querySelector('.input').focus()
    },
    blur() {
      this.$el.querySelector('.input').blur()
    },
    select() {
      this.$el.querySelector('.input').select()
    }
  }
}