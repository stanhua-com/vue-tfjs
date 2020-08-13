// directives/clipboard/index.js

import Clipboard from './clipboard'

const install = (Vue) => {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  Vue.use(install)
}

Clipboard.install = install

export default Clipboard
