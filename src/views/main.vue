<template>
  <div id="app" class="layout">
      <Layout :style="{minHeight: '100vh'}">
        <Sider collapsible :collapsed-width="78" v-model="isCollapsed">

          <Menu active-name="1-1" @on-select="dump" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="editor">
              <Icon type="document-text"></Icon>
              <span>编辑器</span>
            </MenuItem>
            <MenuItem name="friend">
              <Icon type="chatboxes"></Icon>
              <span>好友</span>
            </MenuItem>
          </Menu>

          <Menu active-name="1-2" theme="dark" width="auto" @on-select="selectArticle"  :class="menuitemClasses">

            <Submenu name="1">
              <template slot="title">
                <Icon type="folder"></Icon>
                Markdown
              </template>
              <MenuGroup title="同IP文件">

              <MenuItem v-for="article in articles.ipArticles" :name="'0-' + articles.ipArticles.indexOf(article)">
              <Icon type="compose"></Icon>
              <Input size="small" style="width: 70px;" :value="article.title" v-on:input="editTitle"></Input>
              <Button size="small" v-if='articles.ipArticles.length > 1' type="error" @click='handleCloseArticle(articles.ipArticles.indexOf(article), 0)'><Icon type="trash-a"></Icon></Button>
              <!--<button v-if='articles.length > 1' class="delete-btn" @click='handleCloseArticle(articles.indexOf(article))'><i class="fa fa-times"></i></button>-->
            </MenuItem>
              </MenuGroup>
              <MenuGroup title="分享的文件">

                <MenuItem v-for="article in articles.shareArticle" :name="'2-' + articles.shareArticle.indexOf(article)">
                  <Icon type="compose"></Icon>
                  <Input size="small" style="width: 70px;" :value="article.title" v-on:input="editTitle"></Input>
                  <Button size="small" v-if='articles.shareArticle.length > 1' type="error" @click='handleCloseArticle(articles.shareArticle.indexOf(article), 2)'><Icon type="trash-a"></Icon></Button>
                  <!--<button v-if='articles.length > 1' class="delete-btn" @click='handleCloseArticle(articles.indexOf(article))'><i class="fa fa-times"></i></button>-->
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="个人文件">

                <MenuItem v-for="article in articles.ownerArticles" :name="'1-' + articles.ownerArticles.indexOf(article)">
                  <Icon type="compose"></Icon>
                  <Input size="small" style="width: 70px;" :value="article.title" v-on:input="editTitle"></Input>
                  <Button size="small" type="error" @click='handleCloseArticle(articles.ownerArticles.indexOf(article),1)'><Icon type="trash-a"></Icon></Button>
                  <!--<button v-if='articles.length > 1' class="delete-btn" @click='handleCloseArticle(articles.indexOf(article))'><i class="fa fa-times"></i></button>-->
                </MenuItem>
              </MenuGroup>

              <MenuItem name="newArticle">
                <Button type="success" @click="addNewArticle" long><Icon type="plus-round"></Icon></Button>
              </MenuItem>


            </Submenu>
            </Menu>


          <Menu active-name="1-3" theme="dark" width="auto" @on-select="saveArticle"  :class="menuitemClasses">

            <Submenu name="1">
              <template slot="title">
                <Icon type="archive"></Icon>
                保存为
              </template>
              <MenuItem name="Markdown">
                <Icon type="ios-navigate"></Icon>
                <span>Markdown</span>
              </MenuItem>
              <MenuItem name="Html">
                <Icon type="ios-navigate"></Icon>
                <span>Html</span>
              </MenuItem>
              <MenuItem name="PDF">
                <Icon type="ios-navigate"></Icon>
                <span>PDF</span>
              </MenuItem>


            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <router-view/>
        </Layout>
      </Layout>

  </div>
</template>

<script>
import marked from '@/utils/markedUtils'
import Login from '@/components/Login.vue'
import conf from '@/config/config.env.js'
import API from '@/http/api'
export default {
  name: 'App',
  components:{
    Login
  },
  data () {
    return {
      isCollapsed: false,
      articleTitle:''
    };
  },
  mounted:function () {
    this.$store.commit('initArticle');
  },
  methods:{
    dump(name){
      if (name == '' || name == undefined){
        name = 'main';
      }
      console.log("jump to：" + name)
      if (name == 'friend'){
          if(!this.$store.state.isLogin){
            this.$router.replace({ name: 'login' });

//            this.$Modal.confirm({
//              render: (h) => {
//                return h('div', [
//                  h(Login, {
//
//                    on: {
//                      click: () => {
//
//                      },
//                      login:(state)=>{
//                        this.setAdmin(authType, index)
//                      }
//                    }
//                  })
//                ]);
//              }
//            })
          }else{
            this.$router.replace({ name: name });
          }
      }else{
        this.$router.replace({ name: name });
      }
    },
    addNewArticle(){
      this.$store.commit('addNewArticle')
    },
    saveArticle(type) {
      var fileName = this.$store.state.editArticle.title;
      var content = '';
      if (type == 'PDF') {

        var thisObj = this;
        this.$store.dispatch('saveAsPDF').then(data=>{
          console.log("diaoyong get")
          var url = 'http://localhost:3000' + API.DOWNLOADFILE + '?type=' + data.type + '&uuid=' + data.uuid + '&fileName=' + data.fileName
          var download;
          var down = document.createElement("a");
          down.href = url;
          down.download = download;
          document.body.appendChild(down);
          down.click();
          document.body.removeChild(down);

        }).catch(err =>{
          this.$Message.error(err);
        })


      } else {
      switch (type) {
        case 'Html':
          fileName += '.html';
          content = marked.convert(this.$store.state.editArticle.content);
          break;
        case 'Markdown':
          fileName += '.md';
          content = this.$store.state.editArticle.content;
          break;
      }
        var blob = new Blob([content], {type: 'text/plain'});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');

        a.style = "display: none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 5);
    }
    },
    editTitle(val){
      this.$store.commit('changeTitle', val);
    },
    selectArticle(index){
      var articleIndex = index.split("-")


      this.$store.commit('selectArticle', articleIndex);
    },
    handleCloseArticle:function(index, type){
      this.$store.commit('closeArticle', {index:index,type:type});
      //this.$set(this.$store.state.articles,index)
      //console.log(this.$store.state.articles)
    }
  },
  watch:{
    articleTitle(val){
      console.log('new val:'+val)
    }
  },
  computed: {

    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]

    },
    articles:{
      get(){
        return this.$store.state.articles
      }
    }
  }
}
</script>

<style scoped>
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: none;
    background: none;
    border: none;
    outline: none;

  }
</style>
