const mutations = {
  login(state, user){
    state.isLogin = true;
    console.log("user login ")
    console.log(user)
    state.userid = user.mine.email;
    state.friend = user.friend;
    state.mine = user.mine;
    // state.friend.forEach(function (groupItem) {
    //   groupItem.forEach(function (item) {
    //     item.chatHistory = []
    //   })
    // })
  },
  logout(state){
    state.isLogin = false;
    state.userid = '';
  },
  closeArticle(state, position){
    console.log("before close   ip Articles:")
    console.log(state.articles.ipArticles)
    console.log(position)

    switch (position.type){
      case 0:
console.log("the article will close")
        console.log(state.articles.ipArticles[position.index])
       state.articles.ipArticles.splice(position.index,1);

        break;
      case 1:
        state.articles.ownerArticles.splice(position.index,1);

        break;
      case 2:
        state.articles.shareArticle.splice(position.index, 1);
    }

    console.log("after close   ip Articles:")
    console.log(state.articles.ipArticles)
  },
  // SOCKET_CONNECT: (state,  status ) => {
  //   console.log("connect mutations")
  // },
  selectArticle(state, load){
    switch (state.editType){
      case 0:
        state.articles.ipArticles.splice(state.editIndex, 1, state.editArticle);
        break;
      case 1:
        state.articles.ownerArticles.splice(state.editIndex, 1, state.editArticle);
        break;
      case 2:
        state.articles.shareArticle.splice(state.editIndex, 1, state.editArticle);
        break;
    }
    state.editIndex = parseInt(load[1]);
    state.editType = parseInt(load[0]);

    switch (state.editType){
      case 0:
        state.editArticle = state.articles.ipArticles[state.editIndex];
        break;
      case 1:
        state.editArticle = state.articles.ownerArticles[state.editIndex];
        break;
      case 2:
        state.editArticle = state.articles.shareArticle[state.editIndex];
        break;
      default:
    }
  },
  changeTitle(state, newTitle){
    switch (state.editType){
      case 0:
        state.articles.ipArticles[state.editIndex].title = newTitle;
        break;
      case 1:
        state.articles.ownerArticles[state.editIndex].title = newTitle;
        break;
      case 2:
        state.articles.shareArticle[state.editIndex].title = newTitle;

        break;

    }
  },
  addContent(state, val){
    val = '  \n' + val;
    switch (state.editType){
      case 0:
        state.articles.ipArticles[state.editIndex].content += val;
        break;
      case 1:
        state.articles.ownerArticles[state.editIndex].content += val;
        break;
      case 2:
        state.articles.shareArticle[state.editIndex].content += val;

        break;

    }
  },
  changeArticle(state, newContent){
    state.editArticle.content = newContent;
  },
  initArticle(state){
    state.editArticle = state.articles.ipArticles[0];
    state.editType = 0;
    state.editIndex = 0;
  },
  commitArticleAuth(state,auth){
    console.log("mutation")
    console.log(state)

    state.editArticle.authtype = auth.authType;
    state.editArticle.userlist = auth.userIds;
  },
  addNewArticle(state){
    state.articles.ipArticles.push({
      articleid:'',
      title:'UnTitiled',
      owneremail:'',
      ownerip:'',
      content:'Edit your Markdown here...'
    })
  },

  chatTo(state, index){
    console.log("typeof:"+typeof index)
    var ids = index.split("-");
    state.friend.forEach(function (groupItem) {
      if (groupItem.id == ids[0]){
        state.chatToGroup = groupItem;
        groupItem.list.forEach(function (friendItem) {
          if (friendItem.email == ids[1]){
            friendItem.unReadMessage = false;
            state.chatToFriend = friendItem;
            console.log("set friend")
            console.log(state.chatToFriend)
          }
        })
      }
    })

  }
}
export default mutations;
