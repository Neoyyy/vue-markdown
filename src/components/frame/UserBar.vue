<template>
<div class=" SideBar col-md-1 " style="margin-left: 10px">


<div class="row" >

    <div  style="margin-left: 20px;margin-bottom: 20px" data-toggle="modal" data-target="#login">
      <img src="../../../static/img/head.jpg" class="Logo img-circle" alt="logo" height="80%" width="80%">
    </div>

  <!-- LoginModal -->
  <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <Login></Login>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>




</div>


  <div class="list-group">

    <a href="#" class="list-group-item">nick name</a>
    <a href="#" class="list-group-item" data-toggle="modal" data-target="#userFile"><span class="glyphicon glyphicon-folder-open"/>   云端文件 </a>
    <a href="#" class="list-group-item" data-toggle="modal" data-target="#loginout"><span class="glyphicon glyphicon-off"/>   注销 </a>
  </div>

  <!-- FileModal -->
  <div class="modal fade" id="userFile" tabindex="-1" role="dialog" aria-labelledby="fileModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="fileModalLabel">您的文件</h4>
        </div>
        <div class="modal-body">
          <Userfiles></Userfiles>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>



  <!-- loginoutModal -->
  <div class="modal fade" id="loginout" tabindex="-1" role="dialog" aria-labelledby="loginoutModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content ">

        <div class="modal-body " >
          <div class="jumbotron"style="background: #FFFFFF">

              <h1>真..真的要退出登陆？？？</h1>
            </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary">确定</button>

        </div>
      </div>
    </div>
  </div>


</div>






</template>

<script>
import Userfiles from './UserFile'
import Login from '../Login'

$(function () { $('.popover-show').popover('show');});
$(function () { $('.popover-hide').popover('hide');});
$(function () { $('.popover-destroy').popover('destroy');});
$(function () { $('.popover-toggle').popover('toggle');});
$(function () { $(".popover-options a").popover({html : true });});


export default {
  name: 'userbar',
  data () {
    return {
      msg: 'userbar'
    }
  },
  components:{
    Userfiles,
    Login
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LogoBox {
    opacity: .4;
    max-height: 100px;
    margin-bottom: 20px;
}
.SideBar {

    max-width: 100px;
    min-width: 100px;
    padding: 0;
}
</style>
