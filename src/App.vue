<template>
  <div id="app">
    <img src="./logo.png" />
    <jsx-demo :name="name"></jsx-demo>
    <router-view></router-view>
  </div>
</template>

<script type="text/jsx">
import Vue from 'vue';

const jsxDemo = Vue.component('jsxDemo', {
  data() {
    return {
      jsxName: 'jsx'
    }
  },
  props: ['name'],
  render(h, obj) {
    console.log('obj:', obj);
    return (
      <div>
        <p>jsxName: {this.jsxName}</p>
        <p>appName: {this.name}</p>
      </div>
  )
  }
});

export default {
  name: 'app',
  components: {jsxDemo},
  data() {
    return {
      name: 'App'
    }
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
}
</style>
<style lang="scss" scoped>
img {
  width: auto;
  height: 200px;
}
</style>
