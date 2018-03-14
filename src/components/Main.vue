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
                  <li><a id="convertToMarkdown" href="#" v-on:click="exportTo">Markdown <span class="glyphicon glyphicon-download-alt"/></a></li>
                  <li><a id="convertToPdf" href="#" v-on:click="exportTo">PDF <span class="glyphicon glyphicon-download-alt"/></a></li>
                  <li><a id="convertToHtml" href="#" v-on:click="exportTo">HTML <span class="glyphicon glyphicon-download-alt"/></a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  上传文件进行解析
                  <b class="caret"></b>
                </a>
              </li>

              <li><a id="addBold" class="glyphicon glyphicon-bold" v-on:click="addContent"></a></li>
              <li><a id="addItalic" class="glyphicon glyphicon-italic" v-on:click="addContent"></a></li>
              <li><a id="addLists" class="glyphicon glyphicon-list" v-on:click="addContent"></a></li>
              <li><a id="addCode" class="glyphicon glyphicon-console" v-on:click="addContent"></a></li>
              <li><a id="addLinks" class="glyphicon glyphicon-link" v-on:click="addContent"></a></li>
              <li><a id="searchArticle" class="glyphicon glyphicon-search" v-on:click="searchArticle"></a></li>
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
    Vue.prototype.$socket = io("http://localhost:3000");

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
        init:{},
        brief: false, //是否简约模式（如果true则不显示主面板）
        title:'我的好友',
        isgroup:'false'
      })

    });

    layui.use('layer',function (layer) {
      Vue.prototype.$layer = layer;
    })




  },
  components:{
    UserBar,
    EditArea,
    PreviewDialog
  },
  methods:{
    exportTo:function (event) {
      console.log("触发的是:"+event.target.id);
      switch (event.target.id)
      {
        case 'convertToMarkdown':
          break;
        case 'convertToPdf':
          break;
        case 'convertToHtml':
          break;
        default:
      }

    },
    addContent:function (event) {
      var content;
      switch (event.target.id)
      {
        case 'addBold':
          content = "";
          break;
        case 'addItalic':
          content = "";
          break;
        case 'addLists':
          content = "";
          break;
        case 'addCode':
          content = "";
          break;
        case 'addLinks':
          content = "";
          break;
        default:
      }

      $("#").insertContent(content);
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
//autodivheight();
}
window.onresize = function(){

  //autodivheight();
}

$(function() {
//在光标处插入
  (function($) {
    $.fn
      .extend({
        insertContent : function(myValue, t) {
          var $t = $(this)[0];
          if (document.selection) { // ie
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
            sel.moveStart('character', -l);
            var wee = sel.text.length;
            if (arguments.length == 2) {
              var l = $t.value.length;
              sel.moveEnd("character", wee + t);
              t <= 0 ? sel.moveStart("character", wee - 2 * t
                - myValue.length) : sel.moveStart(
                "character", wee - t - myValue.length);
              sel.select();
            }
          } else if ($t.selectionStart
            || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos)
              + myValue
              + $t.value.substring(endPos,
                $t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
            if (arguments.length == 2) {
              $t.setSelectionRange(startPos - t,
                $t.selectionEnd + t);
              this.focus();
            }
          } else {
            this.value += myValue;
            this.focus();
          }
        }
      })
  })(jQuery);

})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
