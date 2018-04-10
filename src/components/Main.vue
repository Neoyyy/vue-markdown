<template>

  <el-container>
    <el-header style="padding: 0px">
      <nav class="navbar navbar-inverse" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Online Markdown</a>
          </div>
          <div>
            <ul class="nav navbar-nav">


              <li><a href="#" title="一些技巧"
                     data-container="body" data-toggle="popover" data-placement="bottom"
                     v-bind:data-content="tips">操作提示</a></li>

              <!-- previewdialog -->
              <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title" id="myModalLabel">文章预览</h4>
                    </div>
                    <div class="modal-body">
                      <!--<PreviewDialog></PreviewDialog>-->
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                    </div>
                  </div>
                </div>
              </div>




              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  导出为
                  <b class="caret"></b>

                </a>
                <ul class="dropdown-menu">
                  <li><a id="exportToMarkdown" href="#" v-on:click="exportTo">Markdown <span class="glyphicon glyphicon-download-alt"/></a></li>
                  <li><a id="exportToPdf" href="#" v-on:click="exportTo">PDF <span class="glyphicon glyphicon-download-alt"/></a></li>
                  <li><a id="exportToHtml" href="#" v-on:click="exportTo">HTML <span class="glyphicon glyphicon-download-alt"/></a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="modal" data-target="#uploadModal">
                  上传文件进行解析
                  <b class="caret"></b>
                </a>
              </li>

              <!-- uploadModal -->
              <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="loginoutModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content ">

                    <div class="modal-body " >
                      <div class="jumbotron"style="background: #FFFFFF">

                        <fieldset id="uploadFileArea" class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                          <legend>拖拽上传(请选择.md文件)</legend> </fieldset>
                        <div class="layui-upload-drag" id="test10">
                        <i class="layui-icon"></i>
                          <p>点击上传，或将文件拖拽到此处</p>
                      </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>







              <li><a id="addBold" class="glyphicon glyphicon-bold" v-on:click="addContent"></a></li>
              <li><a id="addItalic" class="glyphicon glyphicon-italic" v-on:click="addContent"></a></li>
              <li><a id="addLists" class="glyphicon glyphicon-list" v-on:click="addContent"></a></li>
              <li><a id="addCode" class="glyphicon glyphicon-console" v-on:click="addContent"></a></li>
              <li><a id="addLinks" class="glyphicon glyphicon-link" v-on:click="addContent"></a></li>
              <li><a id="searchArticle" class="glyphicon glyphicon-search" v-on:click="searchArticle"></a></li>
<li>              <input id="articleTitle" type="text" style="width:200px;margin-top: 10px;"  class="form-control" placeholder="请输入文章标题" aria-describedby="basic-addon1">
</li>

            </ul>

          </div>


        </div>

      </nav>
    </el-header>
    <el-container>
      <el-aside width="200px">

        <UserBar></UserBar>

      </el-aside>
      <el-main style="height: 80%;">

          <EditArea ref="EditArea"></EditArea>


      </el-main>
    </el-container>
  </el-container>














</template>

<script scoped>
  import marked from '../util/markdownUtil'
  import UserBar from './frame/UserBar'
import EditArea from './frame/EditArea'
import PreviewDialog from './frame/PreViewDialog'
import tipsMsg from '../../static/tips'
import imui from '../socketim/imui'
import messagesocket from '../socketim/messagesocket'
import Vue from 'vue'

export default {
  name: 'main',
  data () {
    return {
      msg : 'Main Page',
      tips : tipsMsg
    }
  },
  //挂载时开启socket
  mounted:function () {
    Vue.prototype.$socket = socket;

    this.$socket.on('chat',function (data) {
      var dataObject = JSON.parse(data);
      //this.$logHelper.info("new message:"+data);

    });

    this.$socket.on('disconnect',function () {
      //this.$logHelper.info("disconnect from server");

    });

    //开启好友
    layui.use('layim', function(layim){
      Vue.prototype.$layim = layim;
      //先来个客服模式压压精
      layim.config({
        init:{
          mine:this.getIMMine
        },
        brief: false, //是否简约模式（如果true则不显示主面板）
        title:'我的好友',
        isgroup:'false'
      })

    });

    layui.use('layer',function (layer) {
      Vue.prototype.$layer = layer;
    })
    layui.use('upload', function(){
      var upload = layui.upload;


      var uploadInst = upload.render({
        //拖拽上传
        elem: '#test10'
        ,url: ''
        ,exts: 'md'
        ,accept: 'file'
        ,auto: false
        ,drag:true
        ,choose:function (obj) {
          obj.preview(function (index, file, result) {
            console.log("file:"+file);
            if(window.FileReader){
              var reader = new FileReader();
              reader.onloadend = function (event) {
                if(event.target.readyState == FileReader.DONE){
                  //console.log("内容:"+event.target.result);
                  $("#textareaCode").text(event.target.result);
                  $("#uploadModal").modal("hide");
                 //todo 修改this获取vm
                  var text = $("#textareaCode").val();
                  var convettext = marked.convert(text);
                  $("#articlePreviewArea").html(convettext);


                }
              }
              reader.readAsText(file);

            }
          })
        }

      });
    })




  },
  components:{
    UserBar,
    EditArea,
    PreviewDialog
  },
  computed:{
    getIMMine:{
      get(){
        return this.$store.state.mine
      }
    },
    getIMFriend:{
      get(){
        return this.$store.state.friend
      }
    },
    getIMGroup:{
      get(){
        return this.$store.state.group
      }
    },
//    title: {
//      get() {
//        return this.$store.state.editarticle.title
//      }
//      }
  },
  methods:{
    upload:function () {
      console.log("1111")
      this.$layer.open({
        type: 1
        ,offset: 'auto'
        ,id: 'uploadFile'
        ,content: '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"> <legend>拖拽上传</legend> </fieldset> <div class="layui-upload-drag" id="test10"> <i class="layui-icon"></i> <p>点击上传，或将文件拖拽到此处</p></div>'
        ,btn: '关闭全部'
        ,btnAlign: 'c'
        ,shade: 0
        ,yes: function(){
          this.$layer.closeAll();
        }
      });

    },

    exportTo:function (event) {
      console.log("触发的是:"+event.target.id);
      //console.log("2"+this.getIMMine());
      var filename = this.$store.state.editarticle.title;
      var content = $("#textareaCode").text();
      switch (event.target.id)
      {
        case 'exportToMarkdown':
          filename += ".md";
          break;
        case 'exportToPdf':
          filename += ".pdf";
          //convert to pdf
          break;
        case 'exportToHtml':
          filename += ".html";
          content = $("#articlePreviewArea").html();
          break;
        default:
      }
      var blob = new Blob([content], {type: 'text/plain'});
      //todo pdf要有变动
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');

      a.style = "display: none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 5);

    },
    addContent:function (event) {
      var content;
      switch (event.target.id)
      {
        case 'addBold':
          content = "  \r**粗体文本**";
          break;
        case 'addItalic':
          content = "  \n*斜体文本*";
          break;
        case 'addLists':
          content = "  \n - 列表文本";
          break;
        case 'addCode':
          content = "  \n ```\ncode\n```";
          break;
        case 'addLinks':
          content = "  \n [link text](url)";
          break;
        default:
      }
      $("#textareaCode").text($("#textareaCode").text() + content);
      this.$refs.EditArea.convertToHtml();
    },
    searchArticle:function () {
      layer.prompt({
        formType: 0,
        //value: '初始值',
        title: '请输入文章代码',
        //area: ['800px', '350px'] //自定义文本域宽高
      }, function(value, index, elem){
        $.get("http://localhost:3000/article/getsharearticle?articleId="+value,function(data){
            this.handlerSearchArticle(data);
        });
      });
    },
    handlerSearchArticle:function (data){
      console.log(JSON.stringify(data))
    }
  }
}

$(function (){
  $("[data-toggle='popover']").popover();
});




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
