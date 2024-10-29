import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import( '../views/Manage.vue'),
    redirect:"/home",
    children :
  
     [
        {path: 'home',name: '首页',component: () => import('../views/Home.vue')},
      {path: 'user',name: '用户管理',component: () => import('../views/User.vue')},
      {path: 'person',name: '个人信息',component: () => import('../views/Person.vue')},
     ]
   },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:()=> import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫
router.beforeEach((to,from,next)=>{
  localStorage.setItem('currentPathName',to.name) //设置当前路由名称，返回时，被watch监听事件获取，实现页签更新
  store.commit("setPath")//触发store的数据更新
  next() //放行路由 
})

export default router
