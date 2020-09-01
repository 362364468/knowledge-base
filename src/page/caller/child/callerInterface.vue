<template>
  <div>
     <agTable
       :tableData="tableData"
       :tableColumns="tableColumns"
       :width="tableW-35"
       :pageAll="pageAll"
       :isLoading="isLoading"
       :headerHeight="44"
       :rowHeight="40"
       :height="tableH"
       @cellClicked="cellClicked"
     > </agTable>
     <!-- 查询弹窗 -->
    <popModel :popAll="popAll" @confirm="confirm">
       <p>调用方：{{dyname}}&emsp;&emsp;&emsp;接口名称：{{jkname}}</p>&emsp;&emsp;&emsp;接口调用次数：<Input v-model="times" disabled  placeholder="接口调用次数" style="width: 200px" />
       <queryModel ref="queryChild" @reset="reset" :whereAll="whereAll" @query="query">
       </queryModel>
     </popModel>
  </div>
</template>
<script>
   import { pageMixin } from "@/util/mixin";
   import './index.css';
   import $ from 'jquery';
   import 'jquery-ui/themes/base/draggable.css'; //此css不引入也不影响draggable 功能
   import 'jquery-ui/ui/widgets/draggable';
   let _this = this
   export default{
    mixins:[pageMixin],
    props:["dyname"],
    created(){
      //设置拖拽
      $(function() {
        $(".ivu-modal").draggable({
         handle:".ivu-modal-header,.form-btn",
        });
      });
      isLoading:true,
      this.caId=sessionStorage.getItem("cid")
      let json={
        "appId": "appId-app",
        "signType": "signType",
        "sign": "sign",
        "requestTime": "requestTime",
        "actionId": "actionId",
        "requestId": "requestId",
        "requestCaller": {},
        "requestData": {
          "callerId":this.caId,
          "pageCurrent":1,
          "pageSize":10
        }
      }
      this.$clientAjaxReq('/caller/queryInterfaceByCall',
      json,
      (state,rspmsg,rest)=>{
        if(state!="SUCCESS")
        {
          this.isLoading=false;
          this.$Message.error("加载失败，请刷新");
          return;
        }
        let restc = rest
        let arr=[]
        restc.list.forEach(Cate=>{
         let obj={}
         obj.jkmc = Cate.interfaceName
         obj.jkURL = Cate.privateNetTestUrl
         obj.jkxmmc = Cate.projectName
         obj.jkid = Cate.interfaceId
         obj.jkkey = Cate.authkey
         arr.push(obj)
         })
         this.tableData=arr
         this.isLoading=false
        })
    },
    data(){
      return{
        isLoading:true,
        jkname:'',
        times:'',
        caId:'',
        tableData: [
        ],
        tableColumns: [//表格列配置;
          {
            headerName: "序号",
            width: 50,
            pinned: "left",
            cellClass: "col_center borderRightNone",
            cellRenderer:(params) => {
              return "<span class='showTitle'>" + (params.node.rowIndex + 1) + "</span>"
            },
            isHide: true,
          },
          {
            headerName: "接口名称",
            width: 300,
            field: "jkmc"
          },
          {
            headerName: "接口URL",
            width: 300,
            field: "jkURL"
          },
          {
            headerName: "接口项目名称",
            width: 300,
            field: "jkxmmc"
          },
        ],
        popAll:{
        type: "2", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false,
        title:"调用接口次数查询",
        width:900,
        confirmButtonTxt:"转到该接口列表"
        },
        whereAll:{
          isReset: true,
          msg: "必填项不能为空",
          size:"commonly",
          data:[{
            type: "data", //日期选择器;
            timeType: "date", //日期选择器类型 date、datetime;
            placeholder: "开始时间",
            // startDate: true, 设置初始时间为当前时间;
            key: "startTime",
            format: "yyyy-MM-dd", //展示的日期格式;
            }, {
            type: "data",
            timeType: "date", //日期选择器类型;
            placeholder: "结束时间",
            key: "endTime",
            class: "end_time", //end_time 结束时间添加的类名 连接开始时间样式;
            // width: "100",;
            isTriggerQuery:false, //点时间段是否直接触发查询事件;
            format: "yyyy-MM-dd", //展示的日期格式;
            timeSlot: [
            { prevType: "day", prev: 0, text: "今天",
            check: true,
            },
            //时间段配置;
            {
            prevType: "day",//查询前段时间类型 day/month/week/year;
            onlyOneDay:true,//是否只查询一天;
            prev: 2,//往前时间;
            text: "昨天",//显示文字 ;
            },
            { prevType: "day", prev: 7, text: "近7天" },
            ]
            },
          ],
          whereFrom: {
            startTime: "",
            endTime: ""
          },
        },
      }
    },
    methods:{
      //点击单元格跳转事件，暂时只通过点击跳转某个指定接口的接口列表页
      cellClicked(obj){
        this.popAll.jkkey=obj.data.jkkey
        this.popAll.jkid=obj.data.jkid
        this.popAll.isPopModel=true
        this.jkname=obj.data.jkmc
      },
      query(val){
        let json={
                "appId": "appId-app",
                "signType": "signType",
                "sign": "sign",
                "requestTime": "requestTime",
                "actionId": "actionId",
                "requestId": "requestId",
                "requestCaller": {},
                "requestData": {
                  authkey:this.popAll.jkkey,
                  beginDate:val.startTime,
                  endDate:val.endTime,
                }
              }
          this.$clientAjaxReq('/caller/queryCallCountByInterface',
          json,
          (state,rspmsg,rest)=>{
          if (state == "FAIL") {
            this.$Message.error("查询失败");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspmsg);
            return;
          }
          if (state == "SUCCESS") {
            if(rest.list.length==0)
            {
              this.$Message.error("未查询到该接口调用");
              this.times=0
            }
            else
            this.times=rest
          }
        })
      },
      confirm(){
        let resdate=this.$store.state.routerData
        let Id=this.popAll.jkid
        let json={
                "appId": "appId-app",
                "signType": "signType",
                "sign": "sign",
                "requestTime": "requestTime",
                "actionId": "actionId",
                "requestId": "requestId",
                "requestCaller": {},
                "requestData": {
                  requestparm : Id,
                }
              }
          this.$clientAjaxReq('/interface/queryInterface',
          json,
          (state,rspmsg,rest)=>{
          if (state == "FAIL") {
            this.$Message.error("获取接口详细信息失败");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspmsg);
            return;
          }
          if (state == "SUCCESS") {
            let parentId = rest.directorySecondId
            let haveparentId=false;//标识是否有该parentId的接口列表
            this.$recursion(resdate[0],'childNodes',item=>{
              if(item.id == parentId)
              {
                 haveparentId = true;
                 this.$router.push(item.to);
                 let offon = true;
                 let arr = JSON.parse(sessionStorage.getItem("tagMenuList")) === null ? [] : JSON.parse(sessionStorage.getItem("tagMenuList"));
                 arr.forEach(cache => {
                   if (cache.title == item.title) {
                     offon = false;
                   }
                 });
                 if (offon) {
                   arr.push(item);
                 }
                 this.$store.commit('changeMenu',item)
                 this.$store.commit('changeTagMenu',arr)
               }
             });
             if(haveparentId=false)
             this.$Message.error("未含有该接口的接口列表");
          }
        })
      },
      reset(){
        this.times=""
      }
    }
  }
</script>
<style>
  .titleI{
    color: #009688;
    background-color: #fff;
    padding: 10px 20px;
  }
  .table-content{
    padding: 10px 20px;
  }
</style>
