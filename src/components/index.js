import tableTool from './tableTool/tableTool'

const selfComponents = {
  install: function(Vue){
    Vue.component('tableTool',tableTool)
  }
}

export default selfComponents