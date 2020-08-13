// directives/clipboard/clipboard.js

import Clipboard from 'clipboard'

export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      el.$clipboard_success = binding.value
    }
    else if (binding.arg === 'error') {
      el.$clipboard_error = binding.value
    }
    else {
      const clipboard = new Clipboard(el, {
        text() { return binding.value },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
      })
      clipboard.on('success', e => {
        const callback = el.$clipboard_success
        typeof callback === 'function' && callback(e)
      })
      clipboard.on('error', e => {
        const callback = el.$clipboard_error
        typeof callback === 'function' && callback(e)
      })
      el.$clipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el.$clipboard_success = binding.value
    }
    else if (binding.arg === 'error') {
      el.$clipboard_error = binding.value
    }
    else {
      el.$clipboard.text = () => binding.value
      el.$clipboard.action = () => binding.arg === 'cut' ? 'cut' : 'copy'
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el.$clipboard_success
    }
    else if (binding.arg === 'error') {
      delete el.$clipboard_error
    }
    else {
      el.$clipboard.destroy()
      delete el.$clipboard
    }
  }
}