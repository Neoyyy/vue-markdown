const mutations = {
  //清空登录信息
  clearLoginInfo(state){
    state.loginInfo = {
      username:'',
      password:'',
      nickname:''
    }
  },

  //设置登录信息
  setLoginInfo(state,data){
    state.loginInfo = data;
  },

  //从服务端获取的同ip文章
  setIPArticle(state,articles){
    state.iparticle = articles;
  },


  //从服务端获取得用户文章
  setUserArticle(state,articles){
    state.userarticle = articles;
  }




}


export default mutations
