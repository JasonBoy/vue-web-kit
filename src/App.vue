<template>
  <div id="app">
    <img src="./logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="scss">
  #app {
    text-align: center;
  }
</style>
<style lang="scss" scoped>
  img {
    width: 50%;
  }
</style>
