// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import VueResource from 'vue-resource'
Vue.use(VueResource);

import seller from './components/seller/seller.vue'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
Vue.config.productionTip = false

const routes = [
	{path: '/',redirect: '/seller'},
	{path: '/seller',component:seller},
	{path: '/goods',component:goods},
	{path: '/ratings',component:ratings}
]

const router = new VueRouter({
	routes,
	linkActiveClass:'active'

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
