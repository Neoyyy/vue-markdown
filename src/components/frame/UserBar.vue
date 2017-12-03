<template>
<div class=" SideBar">


<div class="row" style="background: 	#F8F8FF">
  <div class="col-md-1" style="background: 	#FF00FF">
    <div class="LogoBox" style="background: #FFF0F5">
      <img src="http://cv.ftqq.com/static/media/global-warming.0d3bcb11.svg" class="Logo" alt="logo">
    </div>
  </div>

</div>

<div class="row" style="background:	#FFD700">
  <div class="col-md-1">nick name</div>
</div>


<div class="row" style="background:#7FFFAA">
  <div class="col-md-1">用户文件</div>
</div>

<div class="row" style="background: 	#FFFF00">
  <div class="col-md-1">同IP文件</div>
</div>


<div class="row" style="background: 	#CD853F">
  <div class="col-md-1">注销</div>
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
    background-color: #363636;
    max-width: 100px;
    min-width: 100px;
    padding: 0;
}
</style>
