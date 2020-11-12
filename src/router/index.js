import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Message from '../views/components-design/Message.vue'
import CreateApi from '../views/create-api/Index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    path: '/message',
    name: 'Message',
    component: Message
  }, {
    path: '/createApi',
    name: 'CreateApi',
    component: CreateApi
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
