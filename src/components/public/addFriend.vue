<template>
  <div >
    <div style="margin-bottom: 10px;">
      <span>好友id：</span>
      <Input v-model="userId" @on-change="valueChange" placeholder="请输入好友id..." clearable style="width: 300px"></Input>

    </div>
    <div style="margin-bottom: 10px;">
    <span>好友分组:</span>
    <Select v-model="selectGroup" @on-change="valueChange" style="width:300px">
      <Option value="newGroup" key="newGroup">新建分组</Option>
      <Option v-for="item in friendGroup" :value="item.groupname" :key="item.groupname">{{ item.groupname }}</Option>
    </Select>
    </div>
      <div>
        <div v-if="showNewGroup" style="margin-bottom: 5px;">
          <span>新建分组：</span>
          <Input v-model="selectGroup" @on-change="valueChange" placeholder="请输入分组名..." clearable style="width: 300px"></Input>

        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'addFriend',
  data () {
    return {
      userId:'',
      selectGroup:'',
      showNewGroup:false
    }
  },
  methods:{
    valueChange(){
      console.log(    this.friendGroup)
      if (this.selectGroup == 'newGroup'){
        this.showNewGroup = true;
      }
      this.$emit('selectGroup', this.selectGroup, this.userId);
    }
  },
  props:{
    friendGroup:Array,
    default(){
      return []
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
