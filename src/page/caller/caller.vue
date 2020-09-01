<template>
  <div>
    <div class="introduceCard">
      <div class="titleI">调用方：{{name}}</div>
    </div>
    <div v-if="isappeal" class="table-content">
    <agTable
         :tableData="tableData"
         :tableColumns="tableColumns"
         :width="tableW-35"
         :isLoading="isLoading"
         :headerHeight="44"
         :rowHeight="40"
         :height="tableH"
         @rowClicked="rowClicked"
       ></agTable>
    </div>
    <div v-else class="table-content">
      <callerI :dyname="name"></callerI>
    </div>
  </div>
</template>
<script>
   import { pageMixin } from "@/util/mixin";
   import callerI from "./child/callerInterface.vue"
   import routerDate from "@/../static/json/router.json"
   import axios from 'axios'
   export default{
    mixins:[pageMixin],
    components:{callerI},
    created(){
      let selectedMenu = JSON.parse(sessionStorage.getItem("selectedMenu"))
      let menuid = selectedMenu.menuCode
      let resdate = JSON.parse(sessionStorage.getItem("routerData"))
      resdate[1].forEach(item=>{
        if(item.menuCode==menuid)
        {
          this.name = item.menuName
          this.Id=item.id
          let json={
            "appId": "appId-app",
            "signType": "signType",
            "sign": "sign",
            "requestTime": "requestTime",
            "actionId": "actionId",
            "requestId": "requestId",
            "requestCaller": {},
            "requestData": {
            }
          }
          this.$clientAjaxReq('/caller/queryCaller',
          json,
          (state,rspmsg,rest)=>{
            if(state!="SUCCESS")
            {
              this.$Message.error("加载失败，请刷新");
              return;
            }
            rest.forEach((item, index) => {
              if(item.callName==null){
                rest.splice(index,1)
              }
            })
            let arr=[]
            for(let i in rest)
            {
              if(i==(this.Id-1000))
              {
                 rest[i].listResponseVO2.forEach(Cate=>{
                   let obj={}
                   obj.dysqmc = Cate.callerAuthorization
                   obj.bz = Cate.desc
                   obj.dyid = Cate.callerId
                   arr.push(obj)
                 })
                 this.tableData=arr
                 this.isLoading=false
              }
            }
          })
        }
      })
    },
    data(){
      return{
        Id:'',
        name:'',
        cid:'',
        isLoading:true,
        isappeal:true,
        tableData: [
        ],
        tableColumns: [//表格列配置;
          {
            headerName: "序号",
            pinned: "left",
            cellClass: "col_center borderRightNone",
            cellRenderer:(params) => {
              return "<span class='showTitle'>" + (params.node.rowIndex + 1) + "</span>"
            },
            isHide: true,
          },
          {
            headerName: "调用授权id",
            width: 300,
            field: "dyid",
          },
          {
            headerName: "调用授权名称",
            width: 300,
            field: "dysqmc",
          },
          {
            headerName: "备注",
            width: 300,
            field: "bz"
          },
        ],
      }
    },
    methods:{
      rowClicked(obj){
        this.cid = obj.data.dyid
        sessionStorage.setItem("cid",this.cid)
        this.isappeal=false
      },
      //watch监听获取数据
      getdata(state){
         if(state==false)
         {
           this.isLoading=true
           this.tableData=[]
           let json={
                   "appId": "appId-app",
                   "signType": "signType",
                   "sign": "sign",
                   "requestTime": "requestTime",
                   "actionId": "actionId",
                   "requestId": "requestId",
                   "requestCaller": {},
                   "requestData": {
                   }
             }
            this.$clientAjaxReq('/caller/queryCaller',
            json,
            (state,rspmsg,rest)=>{
              if(state!="SUCCESS")
              {
                this.$Message.error("加载失败，请刷新");
                return;
              }
              rest.forEach((item, index) => {
                if(item.callName==null){
                  rest.splice(index,1)
                }
              })
              let arr=[]
              for(let i in rest)
              {
                if(i==(this.Id-1000))
                {
                   rest[i].listResponseVO2.forEach(Cate=>{
                     let obj={}
                     obj.dysqmc = Cate.callerAuthorization
                     obj.bz = Cate.desc
                     obj.dyid = Cate.callerId
                     arr.push(obj)
                   })
                   this.tableData=arr
                   this.isLoading=false
                }
              }
            })
         }
         else{
           let menuid = state
           let resdate = JSON.parse(sessionStorage.getItem("routerData"))
           resdate[1].forEach(item=>{
             if(item.menuCode==menuid)
             {
               if(item.menuFlag=='1')
               {
                 return;
               }
               this.isLoading = true
               this.name = item.menuName
               this.Id=item.id
               let json={
                     "appId": "appId-app",
                     "signType": "signType",
                     "sign": "sign",
                     "requestTime": "requestTime",
                     "actionId": "actionId",
                     "requestId": "requestId",
                     "requestCaller": {},
                     "requestData": {
                     }
               }
              this.$clientAjaxReq('/caller/queryCaller',
              json,
              (state,rspmsg,rest)=>{
                if(state!="SUCCESS")
                {
                  this.$Message.error("加载失败，请刷新");
                  return;
                }
                rest.forEach((item, index) => {
                  if(item.callName==null){
                    rest.splice(index,1)
                  }
                })
                let arr=[]
                for(let i in rest)
                {
                  if(i==(this.Id-1000))
                  {
                     rest[i].listResponseVO2.forEach(Cate=>{
                       let obj={}
                       obj.dysqmc = Cate.callerAuthorization
                       obj.bz = Cate.desc
                       obj.dyid = Cate.callerId
                       arr.push(obj)
                     })
                     this.tableData=arr
                     this.isLoading=false
                  }
                }
              })
             }
           })
         }
      },
      getClick(){
        this.isappeal=true
        this.getdata(false)
      }
    },
    computed:{
      watchstate(){
        return this.$store.state.changeMenu
      },
      watchclick(){
        return this.$store.state.changeClick
      }
    },
    watch:{
      watchstate:{
        handler:function(nv,ov){
        this.getdata(nv)
        },
        deep:true
      },
      watchclick:{
        handler:function(nv,ov){
        this.getClick()
        },
        deep:true
      }
    }
  }
</script>
<style scoped>
  .titleI{
    color: #009688;
    background-color: #fff;
    padding: 10px 20px;
  }
</style>
