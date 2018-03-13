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
            <div class="col-xs-12 ">
              <p  class="text-left">预览</p>
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
      }

    }
  }



  $(function() {
//在光标处插入
  (function($) {
    $.fn
      .extend({
        insertContent : function(myValue, t) {
          var $t = $(this)[0];
          if (document.selection) { // ie
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
            sel.moveStart('character', -l);
            var wee = sel.text.length;
            if (arguments.length == 2) {
              var l = $t.value.length;
              sel.moveEnd("character", wee + t);
              t <= 0 ? sel.moveStart("character", wee - 2 * t
                - myValue.length) : sel.moveStart(
                "character", wee - t - myValue.length);
              sel.select();
            }
          } else if ($t.selectionStart
            || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos)
              + myValue
              + $t.value.substring(endPos,
                $t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
            if (arguments.length == 2) {
              $t.setSelectionRange(startPos - t,
                $t.selectionEnd + t);
              this.focus();
            }
          } else {
            this.value += myValue;
            this.focus();
          }
        }
      })
  })(jQuery);

  })



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
