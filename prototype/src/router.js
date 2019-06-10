import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/employee-list',
      name: 'EmployeeList',
      component: () => import(/* webpackChunkName: "employee-list" */ './views/EmployeeList.vue'),
    },
  ],
})
