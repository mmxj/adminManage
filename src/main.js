// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueQuillEditor from 'vue-quill-editor'
import router from './router'
import axios from 'axios'
import '../theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
import $ from 'jquery'
// import '@/assets/js/jquery.1.11.1.min.js'
import '@/assets/js/jquery.md5.js'
import '@/assets/js/jquery.form.min.js'


// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import '@/assets/js/xlsx.full.min.js'


// import '@/assets/js/xlsx.full.min.js'
// import xlsx from 'js-xlsx'
//处理上传表格组件

//地址组件
import Distpicker from 'v-distpicker'

Vue.component('v-distpicker', Distpicker)
Vue.use(ElementUI);

Vue.use(VueQuillEditor,
  // {//配置工具栏
  // modules:{
  // toolbar:[
  // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  // ['blockquote', 'code-block']
  //
  // // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  // [{ 'align': [] }],
  // ['image','link'],
  // ['clean']                                         // remove formatting button
  // ],
  // }
// }
)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
