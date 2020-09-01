import Vue from 'vue'
import router from '../router'
import baowei from '../../static/js/baowei-2.1'
Vue.use(baowei)
const v = new Vue({});

export const serverAjaxReq = (url, reqData, fn) => {
  v.$serverAjaxReq(url, createParameter(reqData), fn, router, v.$Message, v);
}

export const clientAjaxReq = (url, reqData, fn) => {
  v.$clientAjaxReq(url, createParameterA(reqData), fn, router, v.$Message, v);
}

export const ajaxUP = (url, formData, fn, fn_2) => {
  v.$ajaxUP(url, formData, fn, fn_2, router, v.$Message, v);
}
export const ajaxUP_client = (url, formData, fn, fn_2) => {
  v.$ajaxUP_client(url, formData, fn, fn_2, router, v.$Message, v);
}
export const ajaxDown = (url, reqData, fn) => {
  v.$ajaxDown(url, createParameter(reqData), fn);
}
export const ajaxDown_client = (url, reqData, fn) => {
  v.$ajaxDown_client(url, createParameter(reqData), fn);
}
const createParameterA = reqData => {
  let sendData = {
    "sign": "sign",
    "actionId": "actionId",
    "requestId": "requestId",
    "requestCaller": {},
    "requestData": reqData,
    "appId": "baowei-web",
    "signType": "signType",
    "requestTime": (new Date()).Format("yyyy-MM-dd hh:mm:ss:S"),
    "method": "method",
  }
  return sendData;
}
const createParameter = reqData => {
  let sendData = {
    "appId": "baowei-web",
    "signType": "signType",
    "sign": "sign",
    "reqTime": (new Date()).Format("yyyy-MM-dd hh:mm:ss:S"),
    "method": "method",
    reqData: reqData
  }
  return sendData;
}
/* const createParameterA = reqData => {
  let sendData = {
    "appId": "appId-app",
    "signType": "signType",
    "sign": "sign",
    "requestTime": (new Date()).Format("yyyy-MM-dd hh:mm:ss:S"),
    "method": "method",
    requestData: reqData
  }
  return sendData;
} */
export const ajaxReq = serverAjaxReq;
export {createParameter};
