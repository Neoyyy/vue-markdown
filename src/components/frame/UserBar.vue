<template>
<div class=" SideBar col-md-2">


<div class="row" >

    <div class="LogoBox" >
      <img src="../../../static/img/head.jpg" class="Logo" alt="logo" height="150" width="150">
    </div>


</div>


  <div class="list-group">

    <a href="#" class="list-group-item">nick name</a>
    <a href="#" class="list-group-item"><span class="glyphicon glyphicon-folder-open"/>   用户文件 </a>
    <a href="#" class="list-group-item"><span class="glyphicon glyphicon-folder-open"/>   同IP文件 </a>
    <a href="#" class="list-group-item"><span class="glyphicon glyphicon-off"/>   注销 </a>
  </div>




</div>

</template>

<script>
export default {
  name: 'userbar',
  data () {
    return {
      msg: 'userbar'
    }
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
