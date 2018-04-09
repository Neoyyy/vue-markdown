import socket from "../socketim/messagesocket";

const actions = {

  userLogin(store,postData){
    var vm = this;
    $.post(postData.url,postData.data,function (res) {

      if (res.code == '200'){
        $('#login').modal('hide');
        layer.msg(res.msg.mine.username+"登陆成功");
        store.commit('setLoginInfo',res.msg);
        socket.emit('login',store.state.mine)
        socket.on('loginResult',function (data) {
          console.log("login result message"+JSON.stringify(data))
          if (data.code == 200){


            console.log("mine:"+store.state.mine);
            console.log("friend:"+store.state.friend)
            //开启好友
            layui.use('layim', function(layim){


              layim.config({
                init:{
                  mine:store.state.mine,
                  friend:store.state.friend,
                  group:store.state.group

                },

                brief: false,
                title:'我的好友',
                isgroup:'false'
              });

              socket.on("",function(data){

              })

            });
          }else{
            layer.msg("socket连接错误:"+data.msg);
          }
        });

      }else{
        layer.msg(res.msg);

      }
    })
  },
  saveArticle(store,postData){

    console.log("save article");
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
