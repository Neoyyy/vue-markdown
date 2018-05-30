<template>
  <div>
    <Header :style="{background: '#fff', height:'50px',boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">

      <ButtonGroup shape="circle" style="margin-bottom: 18px;">
        <Button type="ghost" @click='insert("**Bold**")'><i class="fa fa-bold"></i></Button>
        <Button type="ghost" @click='insert("*Italic*")'><i class="fa fa-italic"></i></Button>
        <Button type="ghost" @click='insert("[Link](http://example.com/)")'><i class="fa fa-link"></i></Button>
        <Button type="ghost" @click='insert("\n> ")'><i class="fa fa-quote-left"></i></Button>
        <Button type="ghost" @click='insert("`code`")'><i class="fa fa-code"></i></Button>
        <Button type="ghost" @click='insert("![Img](http://example.com/)")'><i class="fa fa-picture-o"></i></Button>
        <Button type="ghost" @click='insert("\n- ")'><i class="fa fa-list-ul"></i></Button>
        <Button type="ghost" @click='insert("\n# ")'><i class="fa fa-header"></i></Button>
        <Button type="ghost" @click='insert("\n\n---\n\n")'><i class="fa fa-underline"></i></Button>
        <Button type="ghost" @click='insert("\n\n| title | title | title |\n| --- | --- | --- |\n| item | item | item |")'><i class="fa fa-th"></i></Button>
      </ButtonGroup>
      <ButtonGroup shape="circle" style="margin-bottom: 18px;">
        <Button type="ghost" shape="circle" @click="saveToServer" :loading="savingToServer">保存至服务器</Button>
        <Button v-if="editArticle._id" type="error" @click="deleteFromServer" :loading="deletingToServer">从服务器删除</Button>
      </ButtonGroup>
      <ButtonGroup shape="circle" style="margin-bottom: 18px;">
        <Button type="ghost" shape="circle" @click="setArticleAuth"><Icon type="wrench"></Icon>  设置权限</Button>
      </ButtonGroup>
      <ButtonGroup shape="circle" style="margin-bottom: 18px;">
        <Button type="ghost" shape="circle" @click="searchArticle" ><Icon type="ios-cloud-download-outline"></Icon>  获取文章</Button>
        <Button type="ghost" shape="circle" @click="shareArticle" ><Icon type="share"></Icon>  分享文章</Button>
      </ButtonGroup>
      <ButtonGroup shape="circle" style="margin-bottom: 18px;">
        <Button type="ghost" @click='redirect("https://github.com/Neoyyy")'><i class="fa fa-github"></i></Button>
        <!--<Button type="ghost" @click='redirect("https://github.com/jrainlau/markcook/issues")'><i class="fa fa-question"></i></Button>-->
      </ButtonGroup>
    </Header>
    <Content :style="{padding: '5px'}">
    <Card>

      <Row>

        <Col span="12">
        <div style="background:#eee;padding: 20px">
          <Card :bordered="false" :style="height">
            <p slot="title">{{ editArticle.title }}</p>
            <p>
              <Input :value="editArticle.content" v-on:input="editContent" type="textarea" :autosize="{minRows: 14,maxRows: 50}" placeholder="Enter your Markdown..."></Input>

            </p>
          </Card>
        </div>
        </Col>


        <Col span="12">
        <div style="background:#eee;padding: 20px">
          <Card :bordered="false" :style="height">
            <p slot="title" >{{ editArticle.title }}</p>
            <div v-html="markdownContent" style="padding: 5px;"></div>

          </Card>
        </div>
        </Col>


      </Row>
    </Card>
    </Content>
  </div>
</template>

<script>
  import marked from '../utils/markedUtils';
  import authList from './public/authList.vue'
export default {
  name: 'Editor',
    sockets:{
    editor:function () {
      console.log("connected ed");
    }
  },
  data () {
    return {
      height:{
        height:'450px',
  },
      savingToServer:false,
      msg: '223',
      searchId:'',
      authType:0,
      userIds:[],
      markdownContent:``
    }
  },
  mounted:function () {
    this.height.height = document.body.clientHeight * 0.8 + 'px';

    this.$store.dispatch('getArticles').then(data =>{

    }).catch(err =>{

    })
  },
  methods:{
    shareArticle(){
      if (this.$store.state.editArticle.articleid){
        this.$Modal.success({
          title: '文章ID',
          content: `&nbsp${this.$store.state.editArticle.articleid}<br>`
        });
      }else{

        var thisObj = this;
        this.$store.dispatch('saveArticleToServer', false).then(data =>{

          thisObj.$Modal.success({
            title: '文章ID',
            content: `&nbsp${data}<br>`
          });
        }).catch(err =>{
          this.$Message.error(err);
        }).finally(
        )


      }
    },
    saveToServer(){
      if (!this.$store.state.isLogin){
        this.$Modal.confirm({
          title: '是否登录保存',
          content: '<p>您还未登录，是否登录后在您账户中保存副本？</p>',
          onOk: () => {
            this.$router.replace({name:'login'});
          },
          onCancel: () => {

            this.savingToServer = true;
            var thisObj = this;
            this.$store.dispatch('saveArticleToServer',false).then(data =>{

              thisObj.$Message.info("save to Server success");
            }).catch(err =>{
              this.$Message.error(err);
            }).finally(
              this.savingToServer = false
            )
          }
        });
      }else{
        this.$Modal.confirm({
          title: '是否保存',
          content: '<p>是否在您账户中保存副本？</p>',
          onOk: () => {
            this.savingToServer = true;
            var thisObj = this;
            this.$store.dispatch('saveArticleToServer', true).then(data =>{

              thisObj.$Message.info("save to Server success");
            }).catch(err =>{
              this.$Message.error(err);
            }).finally(
              this.savingToServer = false
            )
          },
          onCancel: () => {

            this.savingToServer = true;
            var thisObj = this;
            this.$store.dispatch('saveArticleToServer',false).then(data =>{

              thisObj.$Message.info("save to Server success");
            }).catch(err =>{
              this.$Message.error(err);
            }).finally(
              this.savingToServer = false
            )
          }
        });
//        this.savingToServer = true;
//        var thisObj = this;
//        this.$store.dispatch('saveArticleToServer').then(data =>{
//
//          thisObj.$Message.info("save to Server success");
//        }).catch(err =>{
//          this.$Message.error(err);
//        }).finally(
//          this.savingToServer = false
//      )
      }

    },
    deleteFromServer(){
      this.$Modal.confirm({
        title: '是否删除',
        content: '<p>是否从远程服务器删除该文件？</p>',
        onOk: () => {
          this.deletingToServer = true;
          var thisObj = this;
          this.$store.dispatch('deleteFromServer').then(data =>{

            thisObj.$Message.info("delete from Server success");
            var position = {
              index:thisObj.$store.state.editIndex,
              type:thisObj.$store.state.editType
            }
           // thisObj.$store.commit('closeArticle', position);
          }).catch(err =>{
            this.$Message.error(err);
          }).finally(
            this.deletingToServer = false
          )
        },
        onCancel: () => {

        }
      });
    },
    setArticleAuth(){
      this.$Modal.confirm({
        title: `设置文章权限<br><br>`,
        width:500,
        render: (h) => {
          return h(authList, {
            props: {
            },
            on: {
              setArticleAuth: (authType, userIds) => {
                this.authType = authType;
                this.userIds = userIds;
              }
            }
          })
        },
        onOk:()=>{
          this.commitArticleAuth();
          //this.$emit('reviewResult',revewResult,this.reason, this.orderNum, this.row,this.column,this.index);
        }
      })
    },
    searchArticle(){
      var thisObj = this;
      this.$Modal.confirm({
        title:`获取文章<br><br>`,
        render: (h) => {
          return h('Input', {
            props: {
              value: this.searchId,
              autofocus: true,
              placeholder: '请输入查找的文章Id...'
            },
            on: {
              input: (val) => {
                this.searchId = val;
              }
            }
          })
        },
        onOk:()=>{
          this.$store.dispatch('searchArticle',this.searchId).then(data =>{
            thisObj.$Message.info("get article success");
          }).catch(err =>{
            thisObj.$Message.error(err);
          })
          //this.$emit('reviewResult',revewResult,this.reason, this.orderNum, this.row,this.column,this.index);
        }
      })
    },
    editContent(val){
      this.markdownContent = marked.convert(val);
      this.$store.commit('changeArticle', val);
    },
    commitArticleAuth(){
      var auth = {
        authType:this.authType,
        userIds:this.userIds
      }
      this.$store.commit('commitArticleAuth', auth);

//      this.$Modal.confirm({
//        title: '是否保存至服务器',
//        content: '<p>是否将变动保存至远程服务器？</p>',
//        onOk: () => {
//
//        },
//        onCancel: () => {
//
//        }
//      });
      //this.$Message.info("hahahha")
    },
    insert(val){
      this.$store.commit('addContent', val);
    }
  },
  watch:{
    //'this.$store.state.editIndex'(val){
    editArticle:{
      handler:function (newVal, oldVal) {
        this.markdownContent = marked.convert(this.editArticle.content)
      },deep:true

    }
  },
  computed:{
    editIndex:{
      get(){
        return this.$store.state.editIndex;
      }
    },
    editType:{
      get(){
        return this.$store.state.editType;
      }
    },
    editArticle:{
      get(){
            return this.$store.state.editArticle;
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
