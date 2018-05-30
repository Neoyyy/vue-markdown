const state = {
  editIndex:0,
  editType:0,
  userid:'',
  editArticle:{},
  isLogin:false,
  chatToFriend:{},
  chatToGroup:{},
  mine:{
    email:'zhuxiong001@gmail.com'
    ,password:'12345'
    ,username: "纸飞机" //我的昵称
    ,id: "100000" //我的ID
    ,status: "o1nline" //在线状态 online：在线、hide：隐身
    ,sign: "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
    ,avatar: "a.jpg" //我的头像
  },
  articles: {
    ownerArticles:[],
    ipArticles:[
      {
        articleid:'1111',
        title:'UnTitiled',
        owneremail:'',
        ownerip:'',
        content:'Edit your Markdown here3333...'
      },{
        articleid:'2222',
        title:'UnTitiled2',
        owneremail:'',
        ownerip:'',
        content:'Edit your Markdown here...'
      }
    ],

    shareArticle:[]
  },

  friend:[
    {
      "groupname": "前端1" //好友分组名
      ,"id": 1 //分组ID
      ,"list": [
              { //分组下的好友列表
                "username": "黄聪傻逼123" //好友昵称
                ,"id": "100001", //好友ID
                "email":"172141@email.com"
                ,"avatar": "a.jpg" //好友头像
                ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
                ,"status": "online" //若值为offline代表离线，online或者不填为在线
                ,"unReadMessage":true,
                "chatHistory":[
                  {
                    "from":"zhuxiong001@gmail.com","to":"172141@email.com","msg":"xixixix","time":"2018-04-30T06:45:47.717Z"
                  },
                  {
                    "from":"172141@email.com","to":"zhuxiong001@gmail.com","msg":"oooooo","time":"2018-04-30T06:45:48.717Z"

                  }
                ],

              },
              { //分组下的好友列表
               "username": "傻逼黄聪" //好友昵称
                ,"id": "100002", //好友ID
                "email":"172131@email.com"
                ,"avatar": "a.jpg" //好友头像
                ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
              ,"status": "online" //若值为offline代表离线，online或者不填为在线
              },


  ]

},

    {
      "groupname": "前端2" //好友分组名
      ,"id": 2 //分组ID
      ,"list": [
      { //分组下的好友列表
        "username": "1黄聪傻逼" //好友昵称
        ,"id": "100003" //好友ID
        ,"avatar": "a.jpg", //好友头像
        "email":"17215@email.com"

        ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
        ,"status": "online" //若值为offline代表离线，online或者不填为在线
      },
      { //分组下的好友列表
        "username": "1傻逼黄聪" //好友昵称
        ,"id": "100004" ,//好友ID
        "email":"171@email.com"
        ,"avatar": "a.jpg" //好友头像
        ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
        ,"status": "online" //若值为offline代表离线，online或者不填为在线
      },


    ]

    }



  ]
}
export default state
