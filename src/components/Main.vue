<template>

  <el-container>
    <el-header>
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


              <li><a href="#" data-toggle="modal" data-target="#myModal">预览
                <span class="glyphicon glyphicon-search"/></a></li>



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
                      <PreviewDialog></PreviewDialog>
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
                  <li><a id="markdown" href="#" v-on:click="exportTo">Markdown <span class="glyphicon glyphicon-download-alt"/></a></li>
                  <li><a id="pdf" href="#" v-on:click="exportTo">PDF <span class="glyphicon glyphicon-download-alt"/></a></li>
                  <li><a id="html" href="#" v-on:click="exportTo">HTML <span class="glyphicon glyphicon-download-alt"/></a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  上传文件进行解析
                  <b class="caret"></b>
                </a>
              </li>

              <li><a href="#">快捷1</a></li>
              <li><a href="#">快捷2</a></li>
              <li><a href="#">快捷3</a></li>
              <li><a href="#">快捷4</a></li>
            </ul>
          </div>

          <div class="navbar-header">
            <a class="navbar-brand" href="#" v-on:click="shou">获取文件</a>
          </div>
        </div>

      </nav>
    </el-header>
    <el-container>
      <el-aside width="200px">

        <UserBar></UserBar>

      </el-aside>
      <el-main>

          <EditArea></EditArea>


      </el-main>
    </el-container>
  </el-container>














</template>

<script scoped>
import UserBar from './frame/UserBar'
import EditArea from './frame/EditArea'
import PreviewDialog from './frame/PreViewDialog'
import tipsMsg from '../../static/tips'

export default {
  name: 'main',
  data () {
    return {
      msg : 'Main Page',
      tips : tipsMsg
    }
  },
  components:{
    UserBar,
    EditArea,
    PreviewDialog
  },
  methods:{
    exportTo:function (event) {
      console.log("触发的是:"+event.target.id);

    },
    shou:function () {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });    }
  }
}

$(function (){
  $("[data-toggle='popover']").popover();
});



var x = 0;
function autodivheight(){
    var winHeight=0;
    if (window.innerHeight) {
        winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }
    //通过深入Document内部对body进行检测，获取浏览器窗口高度
    if (document.documentElement && document.documentElement.clientHeight) {
        winHeight = document.documentElement.clientHeight;
    }
    var height = winHeight*0.68
    //editor.setSize('100%', height);
    //document.getElementById("iframewrapper").style.height= height +"px";
console.log("winHeight:"+height);
document.getElementById("iframewrapper").style.height=height+"px";

document.getElementById("textareaCode").style.height=height+"px";

//$("iframeResult").height(height+"px");
}
window.onload=function(){
autodivheight();
}
window.onresize = function(){

  autodivheight();
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
