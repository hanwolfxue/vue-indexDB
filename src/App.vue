<template>
  <div id="app">
    <transition :name="routerTransition">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      routerTransition: 'router-slide-left',
    }
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.routerTransition = toDepth < fromDepth ? 'router-slide-right' : 'router-slide-left'
    },
  },
}
</script>

<style lang="stylus">
  @import './assets/stylus/app.styl';
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
