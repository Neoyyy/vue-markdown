const state = {


  userarticle:[],
  iparticle:[],
  editarticle:{
    articleid:'',
    title:'default',
    owneremail:'',
    ownerip:'',
    content:''

  },


  mine:{
    username: "纸飞机" //我的昵称
    ,id: "100000" //我的ID
    ,status: "o1nline" //在线状态 online：在线、hide：隐身
    ,sign: "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
    ,avatar: "a.jpg" //我的头像
  }

  ,friend:[{
    "groupname": "前端码屌" //好友分组名
    ,"id": 1 //分组ID
    ,"list": [{ //分组下的好友列表
      "username": "贤心" //好友昵称
      ,"id": "100001" //好友ID
      ,"avatar": "a.jpg" //好友头像
      ,"sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
      ,"status": "online" //若值为offline代表离线，online或者不填为在线
    }]

  }]
    ,group:[{
    "groupname": "前端群" //群组名
    ,"id": "101" //群组ID
    ,"avatar": "a.jpg" //群组头像
  }]



}

export default state
