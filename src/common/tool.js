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

function editArticleAuth(operaType,articleid,thiObj) {
//operaType save 保存到云端  share 直接分享文章

  var content = '  <div style="padding-left: 25px;padding-right: 25px">\n<div class="layui-form-item" style="padding:10px 10px 10px 10px;">\n' +
    '    <label >文章权限选择</label>\n' +
    '    <div class="form-group">\n' +
    '      <select id="permissionType" name="permissiontype" class="form-control">\n' +
    '        <option value=""></option>\n' +
    '        <option value="1">所有人仅可读</option>\n' +
    '        <option value="2">可读可修改</option>\n' +
    '        <option value="3">部分用户可读</option>\n' +
    '        <option value="4">部分用户可修改</option>\n' +
    '        <option value="5">部分用户不可修改</option>\n' +
    '        <option value="6">部分用户可读</option>\n' +
    '        <option value="7">部分用户不可读</option>\n' +
    '        <option value="8">仅自己可读</option>\n' +
    '      </select>\n' +
    '    </div>\n' +
    '  </div>'

  content += '  <div class="layui-form-item "style="padding:10px 10px 10px 10px;">\n';
  content += '  <label >目标用户ID</label>\n';
  content += '  <div >\n';
  content += '  <textarea id="userList" class="form-control" placeholder="请输入用户ID以;分隔" ></textarea>\n';
  content += '  </div>\n  </div>\n</div>\n';
  var url;
  var postData;
  if(operaType == "save"){
    url = 'http://localhost:3000/article/saveArticle';
    postData = {
      permissionType:$("#permissionType").val(),
      authuserlist:$("#userList").text().split(";"),
      content:$("#textareaCode").val(),
      titile:$("#articleTitle").val()
    };
  }else{
    url = 'http://localhost:3000/article/updateArticle';
    for(var i = 0;i < thiObj.$store.state.userarticle.length;i++){
      console.log(thiObj.$store.state.userarticle[i].articleid)
      if (thiObj.$store.state.userarticle[i].articleid == articleid){
        console.log("yes："+JSON.stringify(thiObj.$store.state.iparticle[i]))
        postData = thiObj.$store.state.userarticle[i];
        console.log("postData:" + postData)

      }
    }
    for(var i = 0;i < thiObj.$store.state.iparticle.length;i++){
      console.log(thiObj.$store.state.iparticle[i].articleid)
      if (thiObj.$store.state.iparticle[i].articleid == articleid){
        console.log("yes："+JSON.stringify(thiObj.$store.state.iparticle[i]))

        postData = thiObj.$store.state.iparticle[i];
        console.log("postData:" + postData)

      }
    }
      postData.permissionType = $("#permissionType").val();
      postData.authuserlist = $("#userList").text().split(";");

  }

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

      $.post(url,postData,function (res) {
        if (res.code == 200){
          layer.closeAll();

          if(operaType == "save"){
            layer.msg("保存成功");
          }else {
            layer.open({
              type: 1,
              title: '文章代码',
            content: '<div style="padding: 10px">' + postData.articleid + '</div>'
            });
          }

        }else{
          layer.msg(msg);
        }
      })
    }
    ,btn2: function(){
      layer.closeAll();
    }

    ,zIndex: layer.zIndex //重点1

  });





}
