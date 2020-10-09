<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
<script>
  export default {
    name: 'App',
    data() {
      return {
        // transitionName: 'slide-left'
      }
    },
    created() {
    },
    // watch: {
    //   '$route'(to, from) {
    //     const toDepth = to.path.split('/').length
    //     const fromDepth = from.path.split('/').length
    //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   }
    // }
  }
</script>