export default {
  name: 'Slider',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    vertical: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    tooltip: Boolean
  },
  data() {
    return {
      isMouseDown: false,
      currentPosition: 0
    }
  },
  computed: {

  },
  mounted() {
    this.setPosition(this.value, false)
  },
  beforeDestroy() {
  },
  methods: {
    onTouch(e) {
      if (this.disabled) return
      if (e.type === 'mousedown' || e.type === 'touchstart') {
        e.preventDefault()
        this.isMouseDown = true
        window.addEventListener('mousemove', this.onTouch)
        window.addEventListener('touchmove', this.onTouch)
        window.addEventListener('mouseup', this.onTouch)
        window.addEventListener('touchend', this.onTouch)
        window.addEventListener('contextmenu', this.onTouch)
      }
      else if (e.type === 'mouseup' || e.type === 'touchend' || e.type === 'contextmenu') {
        if (this.isMouseDown) {
          setTimeout(() => {
            this.isMouseDown = false
          }, 0)
          window.removeEventListener('mousemove', this.onTouch)
          window.removeEventListener('touchmove', this.onTouch)
          window.removeEventListener('mouseup', this.onTouch)
          window.removeEventListener('touchend', this.onTouch)
          window.removeEventListener('contextmenu', this.onTouch)
        }
      }
      else if (e.type === 'mousemove' || e.type === 'touchmove') {
        e.preventDefault()
        if (this.isMouseDown) {
          this.changePosition(e)
        }
      }
      else if (e.type === 'click') {
        this.changePosition(e)
      }
    },
    changePosition(e) {
      this.setPosition(this.vertical ? this.clientY(e) - this.$el.getBoundingClientRect().top : this.clientX(e) - this.$el.getBoundingClientRect().left, true)
    },
    clientX(e) {
      return e.clientX || e.touches[0].clientX
    },
    clientY(e) {
      return e.clientY || e.touches[0].clientY
    },
    setPosition(movePosition, isWidth) {
      let _width = this.vertical ? this.$el.getBoundingClientRect().height : this.$el.getBoundingClientRect().width
      if (isWidth) {
        if (movePosition <= 0) {
          movePosition = 0
        }
        else if (movePosition >= _width) {
          movePosition = _width
        }
        this.currentPosition = this.vertical ? 100 - movePosition / _width * 100 : movePosition / _width * 100
      }
      else {
        if (movePosition <= this.min) {
          movePosition = this.min
        }
        else if (movePosition >= this.max) {
          movePosition = this.max
        }
        this.currentPosition = (movePosition - this.min) / (this.max - this.min) * 100
      }
      if (this.step > 1) {
        const lengthPerStep = 100 / ((this.max - this.min) / this.step)
        const steps = Math.round(this.currentPosition / lengthPerStep)
        let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min
        this.$emit('change', value)
        if (this.vertical) {
          this.$el.querySelector('.slider-bar').style.height = `${this.value}%`
          this.$el.querySelector('.slider-handle').style.bottom = `${this.value}%`
        }
        else {
          this.$el.querySelector('.slider-bar').style.width = `${this.value}%`
          this.$el.querySelector('.slider-handle').style.left = `${this.value}%`
        }
      }
      else {
        if (isWidth) {
          this.$emit('change', this.min + parseInt((this.currentPosition / 100) * (this.max - this.min)))
        }
        if (this.vertical) {
          this.$el.querySelector('.slider-bar').style.height = `${this.currentPosition}%`
          this.$el.querySelector('.slider-handle').style.bottom = `${this.currentPosition}%`
        }
        else {
          this.$el.querySelector('.slider-bar').style.width = `${this.currentPosition}%`
          this.$el.querySelector('.slider-handle').style.left = `${this.currentPosition}%`
        }
      }
    }
  },
  watch: {
    // value(v) {
    //   this.currentPosition = `${(v - this.min) / (this.max - this.min) * 100}`
    //   // this.$el.querySelector('.slider-handle').style.left = `${this.currentPosition}%`
    //   // this.$el.querySelector('.slider-bar').style.width = `${this.currentPosition}%`
    // }
  }
}