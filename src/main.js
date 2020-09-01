// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import "babel-polyfill"
import 'iview/dist/styles/iview.css'
import store from './vuex'
Vue.use(iview)
import { AgGridVue } from "ag-grid-vue";
Vue.component('AgGridVue', AgGridVue)
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-blue.css";
//引入时间格式插件
import  '@/util/util'
Vue.config.productionTip = false

import '../static/css/layout.css'
import "../src/assets/css/theme.less";
//uuid全局配置
var UUID = require('uuid');
Vue.prototype.$UUID=()=>{
	return UUID.v1().replace(/-/g,"");
}
//初始化事件总线$bus
Vue.prototype.$bus = new Vue()
import baowei from '@/../static/js/baowei-2.1'
import common from '@/../static/js/common-2.0'
Vue.use(baowei)
Vue.use(common)


import selfComponents from '@/components/index'
Vue.use(selfComponents)
/* eslint-disable no-new */
let app=new Vue({
	el: '#app',
	router,
	store,
	// ajaxReq,
	components: {
		App,
	},
	template: '<App/>'
})

router.beforeEach((to, from, next) => {
	// console.log(123)
	if (to.path != '/') {
		//页面缓存--标签页
		let str=sessionStorage.getItem("keepName");
		let name = to.path.substring(to.path.lastIndexOf('/') + 1);
        if(str){
			let arr=JSON.parse(str)
			if(str.indexOf(name)==-1){
				arr.push(name)
				sessionStorage.setItem("keepName",JSON.stringify(arr));
			}
		}else{
			let arr=[];
			arr.push(name)
			sessionStorage.setItem("keepName",JSON.stringify(arr));
		}



		let token = sessionStorage.getItem("userToken");
		if (token == null || token == '' || typeof token == 'undefined') {
			router.push("/");
		} else {
			if (to.path != '/home') {
				let menuList = sessionStorage.getItem("menuList");
				if (menuList == null || menuList == '') {
					router.push("/");
				} else {
					let menuArray = JSON.parse(menuList);
					let isTrue = false;
					app.$recursion(menuArray,"childNodes",function (o) {
						if (to.path == o.to) {
							isTrue = true;
						}
					});
					if (!isTrue) {
						router.push("/");
					} else {
						next();
					}
				}
			} else {
				next();
			}
		}
	} else {
		next();
	}
});
