<template>
  <div >
    <div style="margin-bottom: 10px;">
    <span>权限类型:</span>
    <Select v-model="authType" @on-change="valueChange" style="width:300px">
      <Option v-for="item in authTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </div>
      <div>
        <div v-for="item in userIds" style="margin-bottom: 5px;">
          <span>用户&nbsp&nbspId：</span>
          <Input v-model="item.id" @on-change="valueChange" placeholder="请输入用户Id..." clearable style="width: 300px"></Input>
          <Button type="error" v-if="userIds.length > 1" size="small" @click="deleteUserId(item.key)"><Icon type="close"></Icon></Button>

        </div>
        <div style="margin-bottom: 5px;">
          <Button type="success" @click="addNewUser" ><Icon type="plus-round" ></Icon></Button>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'authList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      authType:'',
      userIds:[
        {
          key:0,
          id:''
        },

      ],
      authTypeList:[
        {
          value: '1',
          label: '所有用户可读可修改'
        },
        {
          value: '2',
          label: '部分用户仅可读'
        },
        {
          value: '3',
          label: '部分用户可修改'
        },
        {
          value: '4',
          label: '部分用户不可读'
        },
        {
          value: '5',
          label: '仅自己可读'
        },
        {
          value: '6',
          label: '部分用户不可修改'
        }
      ]
    }
  },
  methods:{
    deleteUserId(index){
      var delItem = null;
      this.userIds.forEach(function (item) {
        if (item.key == index){
          delItem = item;
        }

      });

      this.userIds.splice(this.userIds.indexOf(delItem),1);
    },
    valueChange(){
      console.log("select auth")
      console.log(this.userIds)
      console.log(this.authType)
      var id = [];
      this.userIds.forEach(function (item) {
        id.push(item.id)
      })
      this.$emit('setArticleAuth', this.authType, id);
    },
    addNewUser(){
      this.userIds.push({
        id:'',
        key:this.userIds.length
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
