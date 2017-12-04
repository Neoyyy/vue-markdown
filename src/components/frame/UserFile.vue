<template>
<div>



  <div id="userfiles" class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">您的文件</div>

    <!-- List group -->
    <ul class="list-group">
      <li class="list-group-item" v-for="article in getUserArticles">{{ article.name }}</li>

    </ul>



  </div>


  <div id="IPfiles" class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">同IP文件</div>

    <!-- List group -->
    <ul class="list-group">
      <li class="list-group-item" v-for="article in getIPArticles">{{ article.name }}</li>

    </ul>


  </div>

</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to userfile Page'
    }
  },
  computed:{
    getUserArticles:{
      get(){
        return this.$store.state.userarticle
      }
    },
    getIPArticles:{
      get(){
        return this.$store.state.iparticle
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
