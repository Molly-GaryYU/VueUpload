import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import  request  from '@/utils/request';
Vue.config.productionTip = false
// size作用是适应不同版本电脑屏幕
Vue.use(ElementUI,{size:"mini"});
//引入request对象
Vue.prototype.request=request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
