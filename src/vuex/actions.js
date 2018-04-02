const actions = {

  userLogin(store,postData){
    $.post(postData.url,postData.data,function (res) {

      if (res.code == '200'){
        $('#login').modal('hide');
        layer.msg(res.msg.mine.username+"登陆成功");
        store.commit('setLoginInfo',res.msg);

      }else{
        layer.msg(res.msg);

      }
    })
  },
  getRomoteFile(store,postData){
    console.log("action 获取远程文件")
    $.post(postData.url,postData.data,function (res) {

      if (res.code == '200'){
        console.log(res.data)
        store.commit('setIPArticle',res.data);
        $('#userFile').modal('show');

      }else{
        layer.msg(res.msg);

      }
    })
  }
}
export default actions
