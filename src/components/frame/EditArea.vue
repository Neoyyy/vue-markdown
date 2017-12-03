<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading">

          <div class="row">
            <div class="col-xs-12 text-right">
              <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-send"></span> 全屏预览</button>
            </div>
          </div>

        </div>
        <div class="panel-body">
          <textarea class="form-control"  id="textareaCode" name="textareaCode">11111</textarea>
        </div>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="row">
            <div class="col-xs-12 ">
              <p  class="text-left">预览</p>
            </div>
          </div>



        </div>


        <div class="panel-body">
          <div id="iframewrapper"></div></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'editarea',
  data () {
    return {
      msg: 'Welcome to editarea Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
