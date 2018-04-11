const mutations = {
  //清空登录信息
  clearLoginInfo(state){
    state.mine.status = "offline",
    state.mine.username = "offline",
    state.userarticle = null

  },
  setArticle(state,data){
//todo 测试
    $("#textareaCode").val(data.content);
    $('#articleTitle').val(data.title)
    state.editarticle = data;
    $('#userFile').modal('hide');

  },
  deleteArticleById(state,articleid){
//删除本地article
console.log("要删除的article:"+ articleid);
    for(var i = 0;i < state.userarticle.length;i++){
      console.log(state.userarticle[i].articleid)
      if (state.userarticle[i].articleid == articleid){
        console.log("yes")
        state.userarticle.splice(i,1);
      }
    }
    for(var i = 0;i < state.iparticle.length;i++){
      console.log(state.iparticle[i].articleid)
      if (state.iparticle[i].articleid == articleid){
        console.log("yes")

        state.iparticle.splice(i,1);
      }
    }

  },

  //设置登录信息
  setLoginInfo(state,data){
    state.mine = data.mine;
    state.friend = data.friend;
    state.group = data.group;
    state.mine.status = "online";
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
