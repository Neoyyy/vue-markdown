//
// //在光标处插入
//   (function($) {
//     $.fn
//       .extend({
//         insertContent : function(myValue, t) {
//           var $t = $(this)[0];
//           if (document.selection) { // ie
//             this.focus();
//             var sel = document.selection.createRange();
//             sel.text = myValue;
//             this.focus();
//             sel.moveStart('character', -l);
//             var wee = sel.text.length;
//             if (arguments.length == 2) {
//               var l = $t.value.length;
//               sel.moveEnd("character", wee + t);
//               t <= 0 ? sel.moveStart("character", wee - 2 * t
//                 - myValue.length) : sel.moveStart(
//                 "character", wee - t - myValue.length);
//               sel.select();
//             }
//           } else if ($t.selectionStart
//             || $t.selectionStart == '0') {
//             var startPos = $t.selectionStart;
//             var endPos = $t.selectionEnd;
//             var scrollTop = $t.scrollTop;
//             $t.value = $t.value.substring(0, startPos)
//               + myValue
//               + $t.value.substring(endPos,
//                 $t.value.length);
//             this.focus();
//             $t.selectionStart = startPos + myValue.length;
//             $t.selectionEnd = startPos + myValue.length;
//             $t.scrollTop = scrollTop;
//             if (arguments.length == 2) {
//               $t.setSelectionRange(startPos - t,
//                 $t.selectionEnd + t);
//               this.focus();
//             }
//           } else {
//             this.value += myValue;
//             this.focus();
//           }
//         }
//       })
//   })(jQuery);
//
//

function editArticleAuth() {
  var content = '<div class="layui-form-item">\n';
  content += '  <label class="layui-form-label">权限类型</label>\n';
  content += '  <div class="layui-input-block">\n';
  content += '  <input type="radio" name="sex" value="1" title="所有人仅可读" checked="">\n';
  content += '  <input type="radio" name="sex" value="2" title="可读可修改">\n';
  content += '  <input type="radio" name="sex" value="3" title="部分用户可读">\n';
  content += '  <input type="radio" name="sex" value="4" title="部分用户可修改其他用户仅可读">\n';
  content += '  <input type="radio" name="sex" value="5" title="特定用户不可修改">\n';
  content += '  </div>\n  </div>\n';
  content += '  <div class="layui-form-item layui-form-text">\n';
  content += '  <label class="layui-form-label">目标用户ID</label>\n';
  content += '  <div class="layui-input-block">\n';
  content += '  <textarea placeholder="请输入用户ID以逗号分隔" class="layui-textarea"></textarea>\n';
  content += '  </div>\n  </div>\n';


  layer.open({
    type: 1
    ,title: '编辑文章权限'
    ,area: 'auto'
    ,shade: 0
    ,maxmin: true
    ,offset: 'auto'
    ,content: content
    ,btn: ['确定', '取消']
    ,yes: function(){
      $(that).click();
    }
    ,btn2: function(){
      layer.closeAll();
    }

    ,zIndex: layer.zIndex //重点1

  });





}
