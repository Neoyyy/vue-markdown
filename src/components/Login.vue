<template>
<div>
  <div class="page-header">
    <h1>{{firstChoice}} <small v-on:click="toggle" >{{alternative}}</small></h1>
  </div>
<form class="form-horizontal">

  <div v-if="firstChoice=='注册'" class="form-group" id="registname">
    <label for="inputEmail3" class="col-sm-2 control-label">name</label>
    <div class="col-sm-10">
      <input type="text" v-model="formdata.nickname" class="form-control" id="username" placeholder="nick name">
    </div>
  </div>


  <div class="form-group" id="email">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" v-model="formdata.email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>

   <div class="form-group" id="password">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" v-model="formdata.password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default" v-on:click="submit">{{ buttontag }}</button>
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
      buttontag : '登录',
      formdata : {
        password : '',
        nickname : '',
        email : ''
      }

    }
  },

  methods: {
    toggle: function () {

      if (this.firstChoice == '登录'){
        this.firstChoice = '注册';
        this.alternative = '登录';
        this.buttontag = '注册';


      }else{
        this.firstChoice = '登录';
        this.alternative = '注册';
        this.buttontag = '登录';

      }




    },
    submit: function () {
      var url = 'http://localhost:3000';
      var data = {
        email : this.formdata.email,
        password : this.formdata.password

      };

      if (this.buttontag == '登录'){
        url += '/login';
        console.log('the url:'+url);
      }else{
        data.username = this.formdata.nickname;
        url += '/register';

      }


      var postData = {
        url:url,
        data:data
      }
      this.$store.dispatch('userLogin',postData);


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
