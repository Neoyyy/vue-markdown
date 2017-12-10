<template>
  <!-- 模态框（Modal） -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalLabel">出错了</h4>
        </div>
        <div class="modal-body">{{ errorMsg }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
          <button type="button" class="btn btn-primary">提交更改</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
    export default {
      name: "errdialog",
      data(){
          return {
            errorMsg: '',
            visible: false,

          }
      },
      methods: {
        close(){
          this.visible = false;
          this.$destroy(true);
          this.$el.parentNode.removeChild(this.$el);
        }
      },
      mouted(){

      }
    }
</script>

<style scoped>

</style>
