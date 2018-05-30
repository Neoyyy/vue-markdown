<template>




  <div >

    <Content :style="{padding: '5px'}">
      <Card style="height: 400px;margin: 100px;padding-top: 50px;padding-bottom: 50px;padding-right: 150px;padding-left: 150px;">
        <h1 v-if="isRegister">注册</h1>
        <h1 v-else-if="isLogin">请登录</h1>
        <Form  >
          <FormItem style="margin-top: 30px;">
            <Input placeholder="邮箱..." v-model="form.email">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem >
            <Input placeholder="密码..." type="password" v-model="form.password" @keyup.enter.native="login">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem style="margin-top: 50px;">

            <Button type="success" :loading="isLoginLoading" long @click="login">
              <span v-if="!isLoginLoading">登录</span>
              <span v-else>正在登录中...</span></Button>

            <Button style="margin-top: 10px;" type="info" :loading="isLoginLoading" long @click="register">
              <span v-if="!isLoginLoading">注册</span>
              <span v-else>正在注册...</span></Button>
            </Button>
          </FormItem>
        </Form>

      </Card>
    </Content>
  </div>



</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLoginLoading: false,
      isRegister:false,
      isLogin:true,
      form: {
        email: "zhuxiong001@gmail.com",
        password: "12345"
      },
      rule: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不能低于六位",
            trigger: "blur"
          }
        ]
      }
    }
  },
  sockets:{
    loginResult:function (result) {
      console.log("loginresult:")
      console.log(result);
      this.isLoginLoading = false;
      if (result.code == 200){
        this.$store.commit('login', result.user);
        this.$router.replace({name:'friend'})
      }else{
        this.$Message.error(result.errMsg);
      }
    },
    registerResult:function (result) {
      console.log("registerresult:")
      console.log(result);
      this.isLoginLoading = false;
      this.isRegister = false;
      this.isLogin = true;
      if (result.code == 200){
        this.$store.commit('login', result);
        this.$router.replace({name:'friend'})
      }else{
        this.$Message.error(result.errMsg);
      }
    }
  },
  methods: {
    register(){
      if (!this.isRegister){
        this.isRegister = true;
        this.isLogin = false;
      }else{
        this.isLoginLoading = true;
        this.$socket.emit('register', this.form);
      }
    },
    login(){
      console.log("login");
      if (!this.isLogin){
        this.isRegister = false;
        this.isLogin = true;
      }else{
        this.isLoginLoading = true;
        this.$socket.emit('login', this.form);
      }

    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isLoginLoading = true;
          this.$store
            .dispatch("login", this.form)
            .then(() => {
            this.$emit('login',true);
              //this.dump();
            })
            .catch(err => {
              this.$Message.error(err);
            })
            .finally(e => {
              this.isLoginLoading = false;
            });
        }
      });
    },
    autoLogin() {
      this.$store.dispatch("login").then(() => {
        this.dump();
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .login .info {
    text-align: center; /*让div内部文字居中*/
    width: 900px;
    height: 600px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 80px;
    bottom: 0;
  }
  .login .form-card {
    text-align: center; /*让div内部文字居中*/
    border-radius: 20px;
    width: 430px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 0;
    right: 80px;
    bottom: 0;
  }
  .form-card .loading {
    height: 100%;
    width: 100%;
    text-align: center;
  }
  .loading svg {
    margin-top: 80px;
  }
  .loading span {
    margin-top: 10px;
    display: block;
    font-size: 16px;
  }

  .form-card .form {
    width: 300px;
    height: 200px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .form .title {
    margin-bottom: 16px;
    display: block;
    font-size: 16px;
    font-weight: bold;
  }
</style>
