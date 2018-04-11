<template>

<div>



  <div id="userfiles" class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">您的文件</div>

    <!-- List group -->
    <ul class="list-group">
      <li class="list-group-item" v-for="article in getUserArticles">{{ article.title }}</li>

    </ul>



  </div>


  <div id="IPfiles" class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">同IP文件</div>

    <!-- List group -->
    <ul class="list-group">
      <li class="list-group-item"  v-for="article in getIPArticles">{{ article.title }}
        <span @click="deleteArticle(article.articleid)" style="float:right" class="glyphicon glyphicon-trash"> </span>
        <span @click="share(article.articleid)" class="glyphicon glyphicon-eject" style="float:right;padding-right: 10px"> </span>
        <span @click="editArticle(article.articleid)" class="glyphicon glyphicon-pencil" style="float:right;padding-right: 10px"> </span></li>


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
  methods:{
    share(articleid){
//      var thisObject = this;
//      layer.open({
//        type: 1
//        ,title: '删除文章'
//        ,area: 'auto'
//        ,shade: 0
//        ,maxmin: true
//        ,offset: 'auto'
//        ,content: '<div style="padding: 10px">' + '是否删除该文章？' + '</div>'
//        ,btn: ['删除', '我再想想'] //只是为了演示
//        ,yes: function(){
//          layer.closeAll();
//          console.log("this:"+thisObject)
//          var postData = {
//            articleid:articleid,
//            mine:thisObject.$store.state.mine
//          }
//          thisObject.$store.dispatch('deleteArticle',postData);
//
//        }
//        ,btn2: function(){
//          layer.closeAll();
//
//        }
//
//        ,zIndex: this.$layer.zIndex //重点1
//
//      });
    },
    deleteArticle:function (articleid) {
      var thisObject = this;
      layer.open({
        type: 1
        ,title: '删除文章'
        ,area: 'auto'
        ,shade: 0
        ,maxmin: true
        ,offset: 'auto'
        ,content: '<div style="padding: 10px">' + '是否删除该文章？' + '</div>'
        ,btn: ['删除', '我再想想'] //只是为了演示
        ,yes: function(){
          layer.closeAll();
          console.log("this:"+thisObject)
          var postData = {
            articleid:articleid,
            mine:thisObject.$store.state.mine
          }
          thisObject.$store.dispatch('deleteArticle',postData);

        }
        ,btn2: function(){
          layer.closeAll();

        }

        ,zIndex: this.$layer.zIndex //重点1

      });
    },
    editArticle:function (articleid) {
      //获取文章
      var postData = {
        articleid:articleid,
        mine:this.$store.state.mine

      }
      this.$store.dispatch('getArticleById',postData);
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
