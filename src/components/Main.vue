<template>

<div>

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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                <li><a href="#">Markdown <span class="glyphicon glyphicon-download-alt"/></a></li>
                <li><a href="#">PDF <span class="glyphicon glyphicon-download-alt"/></a></li>
                <li><a href="#">HTML <span class="glyphicon glyphicon-download-alt"/></a></li>
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
      <a class="navbar-brand" href="#">用户</a>
    </div>
    </div>

  </nav>




<div class="row">
  <div class="col-md-1">

<UserBar></UserBar>

  </div>
  <div class="col-md-11">







<div class="container" >

  <EditArea></EditArea>

</div>





  </div>
</div>

</div>






</template>

<script scoped>
import UserBar from './frame/UserBar'
import EditArea from './frame/EditArea'
import PreviewDialog from './frame/PreViewDialog'

export default {
  name: 'main',
  data () {
    return {
      msg : 'Main Page',
      tips : '一些操作提示....'
    }
  },
  components:{
    UserBar,
    EditArea,
    PreviewDialog
  },
  methods:{

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
