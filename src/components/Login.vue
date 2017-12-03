<template>
<div>
  <div class="page-header">
    <h1>{{firstChoice}} <small v-on:click="toggle" >{{alternative}}</small></h1>
  </div>
<form class="form-horizontal">

  <div v-if="firstChoice=='注册'" class="form-group" id="registname">
    <label for="inputEmail3" class="col-sm-2 control-label">name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" placeholder="nick name">
    </div>
  </div>


  <div class="form-group" id="email">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>

   <div class="form-group" id="password">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>

</form>
 </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      firstChoice : '登录',
      alternative : '注册',

    }
  },
  methods: {
    toggle: function () {

      console.log('点击了');
      if (firstChoice == '登录'){
        firstChoice = '注册';
        alternative = '登录';
        console.log('切换了');


      }else{
        firstChoice = '登录';
        alternative = '注册';
        console.log('切换了');

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
