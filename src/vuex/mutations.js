const mutations = {
  //清空登录信息
  clearLoginInfo(state){
    state.mine.status = "offline",
    state.mine.username = "offline",
    state.userarticle = null

  },

  //设置登录信息
  setLoginInfo(state,data){
    state.mine = data.mine;
    state.friend = data.friend;
    state.group = data.group;
    status.status = "online";
  },

  //从服务端获取的同ip文章
  setIPArticle(state,articles){
    console.log("ip article:"+articles.iparticle);
    console.log("user article:"+articles.userarticle);
    state.iparticle = articles.iparticle;
    state.userarticle = articles.userarticle;

  },


  //从服务端获取得用户文章
  setUserArticle(state,articles){
    state.userarticle = articles;
  }

  ,
  //test
  changeTest(state,name){
    state.mine.username = name;
  }


}


export default mutations
