<template>
  <div id="app">
          <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  sockets:{
    connect:function () {
      this.$Message.info('socket connect');
    },
    disconnect:function () {
      this.$Message.error('socket disconnect');
      this.$store.commit('logout');
    }
  }
}
</script>

<style scoped>
</style>
