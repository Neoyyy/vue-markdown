<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading">

          <div class="row">
            <div class="col-xs-12 text-right">

              <button type="button" class="btn btn-success" v-on:click="previewArticle">
                <span class="glyphicon glyphicon-send"></span> 预览</button>
            </div>
          </div>

        </div>
        <div class="panel-body">
          <textarea v-on:keyup.13="convertToHtml" id="textareaCode"  style="height: 80vh;" class="form-control" name="textareaCode"></textarea>
        </div>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="row">
            <div class="col-xs-12 text-right">
              <button type="button" class="btn btn-success" v-on:click="saveArticle">
                <span class="glyphicon glyphicon-sort"></span> 保存</button>
            </div>
          </div>



        </div>


        <div class="panel-body">
          <div id="articlePreviewArea"  style="height: 80vh;">

          </div></div>
      </div>
    </div>

  </div>
</template>

<script>

  import marked from '../../util/markdownUtil'
  export default {
    name: 'editarea',
    data () {
      return {
        msg: 'Welcome to editarea Page'
      }
    },
    methods:{
      convertToHtml:function () {
        var text = $("#textareaCode").val();
        console.log(text);
        var convettext = marked.convert(text);
        console.log(convettext);
        $("#articlePreviewArea").html(convettext);

      },
      previewArticle:function () {
        var content = $("#articlePreviewArea").html();
        var height = 0.8 * $(document.body).height();
        var width = 0.8 * $(document.body).width();
        console.log("print"+content)

        layer.open({
          type: 1,
          title: '您的文章',
          maxmin: true,
          shadeClose: true, //点击遮罩关闭层
          area : [width, height],
          content: marked.convert($("#textareaCode").val())
        });
      },
      saveArticle:function () {
        console.log("status:" + this.$store.state.mine.status)
        if ($("#textareaCode").val().length > 0 && $("#articleTitle").val().length >0){


        if ("online" == this.$store.state.mine.status){
          layer.closeAll();
          editArticleAuth();

        }else{
          this.$layer.open({
            type: 1
            ,title: '保存文章'
            ,area: 'auto'
            ,shade: 0
            ,maxmin: true
            ,offset: 'auto'
            ,content: '&nbsp&nbsp&nbsp您未登录，是否以IP为记录进行保存？&nbsp&nbsp&nbsp'
            ,btn: ['保存为IP文件', '去登陆'] //只是为了演示
            ,yes: function(){
              layer.closeAll();
              editArticleAuth();

            }
            ,btn2: function(){
              layer.closeAll();
              $('#login').modal('show');


            }

            ,zIndex: this.$layer.zIndex //重点1

          });
        }
        }else{
          layer.msg("信息请填写完整")
        }

      }

    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
