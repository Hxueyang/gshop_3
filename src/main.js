import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'   // 引入移动端适配 在main.js中引入
import router from './router'
import store from './store'
import HeaderGuide from './components/HeaderGuide/HeaderGuide.vue'
import './veeValidata/index'
import * as API from './api/index' 
import VueLazyload from 'vue-lazyload'  // 图片懒加载

Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1,
  // throttleWait: 200,
  observer:200
})
Vue.config.productionTip = false
Vue.component('HeaderGuide',HeaderGuide)
Vue.prototype.$API = API
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
