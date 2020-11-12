import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import notice from './components/notice/notice'

import message from './components/message/index'
import Hello from './components/Hello.vue'

// 引入 style 加载基础组件
import {
  Style,
  Dialog,
  createAPI
} from 'cube-ui'

Vue.use(Dialog)

// 创建 this.$createHello API
createAPI(Vue, Hello, ['hello', 'wa'], false)

Vue.config.productionTip = false

// [组件设计]之全局消息弹框
Vue.prototype.$notice = notice
Vue.prototype.$message = message

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  // render: function (h) {
  //   return h('button', {
  //     on: {
  //       click: this.showHello
  //     }
  //   }, ['Show Hello'])
  // },
})
