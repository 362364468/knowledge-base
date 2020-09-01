// vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    changeMenu: '',
    changeClick: true,
    routerData: [],
    MenuId:"",
    changeFlag: '',
    tagMenuList:[]
};
const getters = {};
const mutations = {
    /*当前选中的菜单*/
    changeMenu(state,value) {
        state.changeMenu = value===undefined ? '': value.name;
        state.MenuId = value===undefined ? '': value.id;
        sessionStorage.setItem("selectedMenu", value===undefined ? '{}' : JSON.stringify(value));
    },
    /*当前显示的标签页*/
    changeTagMenu(state,value) {
        state.tagMenuList = value;
        sessionStorage.setItem("tagMenuList", JSON.stringify(value));
    },
    /* 接口列表下的菜单 */
    routerData(state,value) {
      state.routerData = value
      sessionStorage.setItem("routerData", JSON.stringify(value));
    },
    changeFlag(state, value) {
      state.changeFlag = value
    },
    /* 通过点击菜单列表改变状态 caller页面和子页面的切换*/
    changeClick(state){
      if(state.changeClick==true)
      state.changeClick=false
      else
      state.changeClick=true
    },
};
const actions = {

};


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
