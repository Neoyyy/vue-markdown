import Vue from 'vue'

const DialogConstructor = Vue.extend(require('./ErrorDialog.vue'));
let instance

const Dialog = (errorMsg) => {
  if (Vue.prototype.$isServer) {
    return
  }
  const ErrorDialogInstance = new DialogConstructor({
    data: {
      errorMsg: errorMsg
    }
  })
  ErrorDialogInstance.vm = ErrorDialogInstance.$mount()
  document.body.appendChild(ErrorDialogInstance.vm.$el)
  ErrorDialogInstance.vm.visible = true
  ErrorDialogInstance.dom = ErrorDialogInstance.vm.$el
  ErrorDialogInstance.dom.style.zIndex = 9999
}

export default {
  install: Vue =>{
    Vue.prototype.$errorDialog = Dialog
  }
}



