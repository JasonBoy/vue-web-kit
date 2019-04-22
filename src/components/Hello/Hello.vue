<template>
  <div class="hello-wrapper"><p class="text-center">Hello Vue</p></div>
</template>

<script>
import r from 'modules/Request';

export default {
  name: 'hello',
  mounted() {
    r.get('/xxx');
  },
};
</script>

<style src="./Hello.scss" lang="scss"></style>
