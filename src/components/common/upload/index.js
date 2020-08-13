export default {
  name: 'Upload',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'image'
    },
    drag: Boolean,
    beforeUpload: Function
  },
  data() {
    return {
      image: '',
      accept: 'image/*'
    }
  },
  computed: {

  },
  created() {
    this.src && (this.image = this.src)
  },
  mounted() {
    this.$nextTick(() => {
      if (this.drag) {
        this.handleDrag()
      }
    })
  },
  beforeDestroy() {
    if (this.drag) {
      this.$el.removeEventListener('dragenter', this.dragOver, false)
      this.$el.removeEventListener('dragover', this.dragOver, false)
      this.$el.removeEventListener('dragleave', this.dragLeave, false)
      this.$el.removeEventListener('drop', this.dragLeave, false)
      this.$el.removeEventListener('drop', this.fileChange, false)
    }
  },
  methods: {
    dragOver(e) {
      this.$el.classList.add('is-dragover')
      e.preventDefault()
      e.stopPropagation()
    },
    dragLeave(e) {
      this.$el.classList.remove('is-dragover')
      e.preventDefault()
      e.stopPropagation()
    },
    handleDrag() {
      this.$el.addEventListener('dragenter', this.dragOver, false)
      this.$el.addEventListener('dragover', this.dragOver, false)
      this.$el.addEventListener('dragleave', this.dragLeave, false)
      this.$el.addEventListener('drop', this.dragLeave, false)
      this.$el.addEventListener('drop', this.fileChange, false)
    },
    uploadChange() {
      this.$el.querySelector('input[type=file]').click()
    },
    fileChange(e) {
      // let passFileType = /^(?:image\/bmp|image\/gif|image\/jpeg|image\/png)$/i
      // if (!passFileType.test(file.type)) return
      if (!e) return
      let file = e.type === 'drop' ? e.dataTransfer.files[0] : e.target.files[0]
      if (!file) return

      if (this.beforeUpload && !this.beforeUpload())
        return false
      if (this.type === 'image') {
        if (file.type.match(/image.*/)) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = () => {
            this.image = reader.result
            this.$emit('change', { image: reader.result, file: file })
            file = null
          }
        }
        else {
          console.error('please upload image')
        }
      }
      else {
        this.$emit('change', file)
      }
    }
  }
}