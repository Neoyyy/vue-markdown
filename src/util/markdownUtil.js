var marked = require('marked');
marked.setOptions({
  renderer : new marked.Renderer(),
  gfm: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export default {

  convert: function (data) {
    return marked(data);

  }

}
