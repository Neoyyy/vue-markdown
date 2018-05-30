<template>
  <div >

    <Content :style="{padding: '5px'}">
      <Card style="height: 70px;">

        <Input v-model="userName" placeholder="您的名字..." clearable style="width: 200px;margin-bottom: 5px;"></Input>
        <Button style="margin-bottom: 5px;" @click="changeUserName">更改用户名</Button>

      </Card>
      <Card style="height: 700px">

        <Row>

          <Col span="8">
          <div style="background:#eee;padding: 20px">
            <Card :bordered="false">

              <Menu v-for="group in friendList" :active-name="group.groupname" @on-select="chatTo" theme="light" width="auto">
                <Submenu :name="group.groupname">
                  <template slot="title">
                    <Icon type="person-stalker"></Icon>
                    {{ group.groupname }}
                  </template>
                <MenuItem v-for="friendItem in group.list" :name="group.id + '-' + friendItem.email">
                  <Badge :dot="friendItem.unReadMessage">
                    <Avatar shape="square" icon="person" size="small"/>
                  </Badge>
                  <span>{{ friendItem.username }}</span>
                  <Button type="error" size="small" @click="deleteFriend(friendItem.id)"><Icon type="close"></Icon></Button>
                </MenuItem>
                </Submenu>
              </Menu>
            </Card>
          </div>
          <Button style="margin-top: 20px;" type="default" long @click="addNewFriend"><Icon type="android-person-add"></Icon>
          </Button>

          </Col>


          <Col span="16">
          <div style="background:#eee;padding: 20px">
            <Card :bordered="false">
              <p slot="title">{{ friend.username }}</p>
              <div >
                <Card style="height: 350px">
                    <div class="talk_show" style="height: 300px;">
                      <div v-for="msg in friend.chatHistory">
                        <!--{{friend.email}}-->
                        <!--{{ msg.msg }}-->
                        <div v-if="msg.from == myId" class="btalk"><span >{{ msg.msg }}</span></div>
                        <div v-else class="atalk"><span >{{ msg.msg }}</span></div>
                      </div>


                    </div>
                </Card>


                      <Card :bordered="false" style="margin-top: 10px">
                        <div >
                          <!--<span class="tool-bar-item fa fa-smile-o emjoi"  @click="handleEmojiVisible(null)"></span>-->
                          <Input v-model="inputValue" @keyup.enter.native="sendMsg" clearable placeholder="Enter something..." ></Input>


                        </div>
                      </Card>

                </div>
            </Card>
          </div>
          </Col>


        </Row>
      </Card>
    </Content>
  </div>
</template>

<script>
  //import Emoji from './Emoji.vue'
  import addFriend from './public/addFriend.vue'
export default {
  name: 'Friend',
  components: { addFriend },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inputValue:'',
      userName:this.$store.state.mine.username,
      chatMsg:'',
      newFriendId:'',
      newFriendGroupName:''
    }
  },
  sockets:{
    changeUserNameResult:function (result) {
      console.log("change user name result")
      console.log(result)
      if (result.code == 200){
        this.$Message.info("change userName success")
      }else{
        this.$Message.error(result.errMsg);
      }
    },
    sendMsgResult:function (result) {
      if (result.code == 200){
        this.$Message.info("send msg success")
      }else{
        this.$Message.error(result.Msg)
      }
    },
    addNewFriendResult:function (result) {

      if (result.code == 200){
        this.$Message.info("add new friend success")
        this.$store.dispatch('addNewFriend',result)
      }else{
        this.$Message.error(result.errMsg);
      }
    },
    deleteFriendResult:function (result) {
      console.log("deletefriend result")
      console.log(result)
      if (result.code ==200){
        this.$Message.info("delete friend success");
        this.$store.dispatch('deleteFriend',result);
      }else{
        this.$Message.error(result.errMsg);
      }

    },
    chatHistoryMsg:function (Msg) {
      this.$store.dispatch('getHistoryMsg',Msg);
    },
    chat:function (Msg) {
      console.log("chat")
      console.log(Msg)
      this.$store.dispatch('getHistoryMsg',[JSON.stringify(Msg)]);

    }
  },
  methods:{
    changeUserName(){
      var params = {
        userName:this.userName,
        email:this.$store.state.userid
      }
      console.log("new user name: " )
      console.log(params)

      this.$socket.emit('changeUserName',params)
    },
    deleteFriend(friendId){
      var friendName = this.$store.state.chatToFriend.username;

      var thisObj = this;
      this.$Modal.confirm({
        title: '确定删除好友？',
        content: friendName,
        onOk: () => {
          this.$Message.info('Clicked ok');
          var params = {
            groupid:this.$store.state.chatToGroup.groupname,
            friendemail:this.$store.state.chatToFriend.email,
            myemail:this.$store.state.userid
          }
          console.log("de;lete")
          console.log(params)
          this.$socket.emit('deleteFriend',params);

        },
        onCancel: () => {
        }
      });
    },
    addNewFriend(){
      this.$Modal.confirm({
        title:`添加好友<br><br>`,
        render: (h) => {
          return h(addFriend, {
            props: {
              friendGroup:this.friendList
            },
            on: {
              selectGroup: ( selectGroup, userId) => {
                this.newFriendId = userId;
                this.newFriendGroupName = selectGroup

              }
            },

          })
        },
        onOk: () => {
          this.$Message.info('Clicked ok');

          console.log("my id: " + this.$store.state.userid)
          var params = {
            groupid:this.newFriendGroupName,
            friendemail:this.newFriendId,
            myemail:this.$store.state.userid
          }
          console.log(params)
          this.$socket.emit('addNewFriend',params)

        },
        onCancel: () => {

        }
      })
    },
    sendMsg(){
      //this.chatMsg += `<br>你说:`+this.inputValue;
      var time = new Date();
      var chatMsg = {from:this.$store.state.userid,show:this.$store.state.chatToFriend.email, to:this.$store.state.chatToFriend.email,msg:this.inputValue,time:time};
      console.log("send msg:")
      console.log(chatMsg)
      this.$socket.emit('chat',chatMsg);
      this.$store.dispatch('chat', chatMsg);
      this.inputValue = '';

    },
    chatTo(id){
      console.log("chat to:"+id);
      this.$store.commit('chatTo', id);
    }
  },
  computed:{

    myId:{
      get(){
        return this.$store.state.userid;
      }
    },
    historyMsg:{
      get(){
        return this.$store.state.chatHistory;
      }
    },
    friendList:{
      get(){
        return this.$store.state.friend;
      }
    },
    friend:{
      get(){
        return this.$store.state.chatToFriend
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: none;
    background: none;
    border: none;
    outline: none;

  }
  .tool-bar-item {
    margin-right: 8px;
    cursor: pointer;
    color: #777;
    vertical-align: middle;
  }
  .emoji{
    font-size: 20px;
  }
  .talk_con{
    border:1px solid #666;
    background:#f9f9f9;
  }
  .talk_show{
    background:#fff;
    margin:10px auto 0;
    overflow:scroll;
  }

  .whotalk{
    width:80px;
    height:30px;
    float:left;
    outline:none;
  }
  .talk_word{
    width:420px;
    height:26px;
    padding:0px;
    float:left;
    margin-left:10px;
    outline:none;
    text-indent:10px;
  }
  .talk_sub{
    width:56px;
    height:30px;
    float:left;
    margin-left:10px;
  }
  .atalk{
    margin:10px;
  }
  .atalk span{
    display:inline-block;
    background:#0181cc;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
  }
  .btalk{
    margin:10px;
    text-align:right;
  }
  .btalk span{
    display:inline-block;
    background:#ef8201;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
  }
</style>
