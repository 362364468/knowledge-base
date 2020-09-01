<template>
  <div>
    <main-query></main-query>
    <div class="introduceCard">
      <div class="titleI"><h2>{{name}}</h2></div>
      <div class="introduce">{{introduce}}</div>
    </div>
    <div class="table-content">
      <div>
        <div class="bg">
          <div class="addButton">
            <i-button class="i"
              type="primary"
              :disabled="bisdisabled"
              @click="addInterface">
              新增分类
            </i-button>
          </div>
        </div>
        <div class="tableBox">
          <agTable
            :tableData="tableData"
            :tableColumns="tableColumns"
            :width="tableW-35"
            :isLoading="isLoading"
            :height="tableH - 90"
            :headerHeight="44"
            :rowHeight="40"
            :buttonAll="buttonAll"
            @operationClick="operationClick"
            @cellClicked="cellClicked"
          > </agTable>
        </div>
        <!--通用弹窗-->
        <popModel :popAll="popAll" @confirm="confirm"></popModel>
        <!--新增、修改-->
        <formModel ref="formChild" :fromModelAlls="fromModelAll" @formKeep="formKeep"></formModel>
      </div>
    </div>
  </div>
</template>
<script>
  import './index.css';
  import { pageMixin } from "@/util/mixin";
  import axios from 'axios';
  import mainQuery from "../../components/common/mainQuery";
  import $ from 'jquery';
  import 'jquery-ui/themes/base/draggable.css'; //此css不引入也不影响draggable 功能
  import 'jquery-ui/ui/widgets/draggable';
  export default {
    components:{mainQuery},
    mixins:[pageMixin],
    //初始化
    created() {
        let selectedMenu = JSON.parse(sessionStorage.getItem("selectedMenu"))
        let menuid = selectedMenu.menuCode
        let resdate = JSON.parse(sessionStorage.getItem("routerData"))
        resdate[0].forEach(item=>{
          if(item.menuCode==menuid)
          {
            this.isLoading=true
            this.name = item.menuName
            this.CId = item.id
            let param={
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
            this.$clientAjaxReq('/interface/queryAllCategory',
            param,
            (state,rspmsg,rest)=>{
              this.isLoading=false
              if(state!="SUCCESS")
              {
                this.$Message.error("加载失败，请刷新");
                return;
              }
              let restc=rest
              let arr=[]
              for(let i in rest)
              {
                if(rest[i].categoryId==item.id)
                {
                  this.introduce = rest[i].categoryDesc
                  restc[i].childCate.forEach(Cate=>{
                    let obj={}
                    obj.jkfljs = Cate.childCategoryDesc
                    obj.jkflmc = Cate.childCategoryName
                    obj.jkflid = Cate.childCategoryId
                    arr.push(obj)
                  })
                  this.tableData=arr
                }
              }
            })
          }
        })
        //设置拖拽
        $(function() {
          $(".ivu-modal").draggable({
            handle:".ivu-modal-header,.form-btn",
          });
        });
      },
    data(){
      return{
        CId:"",
        name:"",
        introduce:"",
        bisdisabled:false,
        isLoading:true,
        tableData: [],
        tableColumns: [
          {
            headerName: "接口分类名称",
            width: 300,
            sortable:false,
            cellClass: "col_center",
            field: "jkflmc"
          }, {
            headerName: "接口分类介绍",
            width: 500,
            minWidth:500,
            sortable:false,
            field: "jkfljs"
          }, {
            headerName: "操作",
            width: 200,
            isHide: true,
            // pinned: "right",
          }
        ],
        buttonAll: [
          {type: "primary", click: "update", name: "修改",buttonCode: "update",
          isDisabled(data,params){
            return false;
          }},
          {type: "error", click: "delete", name: "删除",buttonCode: "delete",
          isDisabled(data,params){
            return false;
          }},
        ],
        fromModelAll:{
          jkflid:'',
          fromType:"2",
          isShow: false,
          isCustomKeep: true,
          loading: false,
          title: "",
          labelWidth: 100,
          fromData: [{
            type: "input",
            key: "jkflmc",
            label: "接口分类名称",
            col: "24",
            message: true,
            fromType: "text"
          },
            {
              type: "input",
              key: "jkfljs",
              label: "接口分类介绍",
              col: "24",
              fromType: "text",
              message: true,
            },
          ],
          menuForm: {
            jkflmc: "",
            jkfljs: "",
          }
        },
        popAll: {
          jkflid:'',
          type: '1',
          status: '',
          vTxt: "",
          nTxt: '', //当前选中信息;
          isPopModel: false, //弹窗显示控制;
        },
      }
    },
    methods:{
      // 表格右侧操作栏事件
      operationClick(item) {
        switch (item.name) {
          case "update":
            this.updateRow(item.data);
            break;
          case "delete":
            this.deleteRow(item.data);
            break;
        }
      },
      addInterface() {
        this.fromModelAll.jkflid = ''
        this.fromModelAll.menuForm.jkflmc = ''
        this.fromModelAll.menuForm.jkfljs = ''
        this.fromModelAll.isShow = true
        this.fromModelAll.title = '新增接口分类'
      },
      //删除确认按钮事件
      confirm(val) {
        // let sindex
        // for(let i=0;i<this.tableData.length;i++)
        // {
        //   if(this.popAll.jkflid==this.tableData[i].jkflid)
        //   {
        //     sindex=i
        //     break
        //   }
        // }
        // this.tableData.splice(sindex,1)
        // this.$route.meta.tableData=this.tableData
        let json={
            "appId": "appId-app",
            "signType": "signType",
            "sign": "sign",
            "requestTime": "requestTime",
            "actionId": "actionId",
            "requestId": "requestId",
            "requestCaller": {},
            "requestData": {
                "deleteCategory":this.popAll.jkflid,
            }
        }
        this.$clientAjaxReq('/interface/deleteCategory',
        json,
        (state,rspmsg,rest)=>{
           if(state=="SUCCESS"){
             this.$Message.success('成功删除信息')
             this.popAll.isPopModel=false
             this.getdata(false);
             this.$store.commit('changeFlag', Math.random())
             return;
           }
           if(state=="FAIL"){
             this.$Message.error("删除失败");
             return;
           }
           if(state=="ERROR"){
             this.$Message.error(rspmsg);
             return;
           }
        })
      },
      //修改按钮点击弹出表单
      updateRow(obj) {
        this.fromModelAll.jkflid = obj.jkflid
        this.fromModelAll.menuForm.jkfljs = obj.jkfljs
        this.fromModelAll.menuForm.jkflmc = obj.jkflmc
        this.fromModelAll.isShow = true
        this.fromModelAll.title = '修改接口信息'
      },
      //删除按钮点击弹出判断框
      deleteRow(obj) {
        this.popAll.jkflid = obj.jkflid
        this.popAll.vTxt = '删除'
        this.popAll.nTxt = obj.jkflmc
        this.popAll.isPopModel = true
      },
      //表单保存按钮事件
      formKeep(item) {
        //新增接口分类
        if (this.fromModelAll.jkflid=='')
        {
          let json={
              "appId": "appId-app",
              "signType": "signType",
              "sign": "sign",
              "requestTime": "requestTime",
              "actionId": "actionId",
              "requestId": "requestId",
              "requestCaller": {},
              "requestData": {
                  categoryName:item.jkflmc,
                  categoryId:null,
                  categoryDesc:item.jkfljs,
                  parentCateId :this.CId,
                  parentCateName:this.name
              }
          }
          this.$clientAjaxReq('/interface/addOrModifyCategory',
          json,
          (state,rspmsg,rest)=>{
             if(state=="SUCCESS"){
               this.$Message.success("添加成功");
               this.fromModelAll.isShow = false
               this.getdata(false);
               this.$store.commit('changeFlag', Math.random())
               return;
             }
             if(state=="FAIL"){
               this.$Message.error("添加失败");
               return;
             }
             if(state=="ERROR"){
               this.$Message.error(rspmsg);
               return;
             }
          })
        }
        //修改接口分类
        else {
          let json={
                  "appId": "appId-app",
                  "signType": "signType",
                  "sign": "sign",
                  "requestTime": "requestTime",
                  "actionId": "actionId",
                  "requestId": "requestId",
                  "requestCaller": {},
                  "requestData": {
                     categoryName:item.jkflmc,
                     categoryId:this.fromModelAll.jkflid,
                     categoryDesc:item.jkfljs,
                     parentCateId :this.CId,
                     parentCateName:this.name
                  }
              }
         this.$clientAjaxReq('/interface/addOrModifyCategory',
         json,
         (state,rspmsg,rest)=>{
            if(state=="SUCCESS"){
              this.$Message.success("修改成功");
              this.fromModelAll.isShow = false
              this.getdata(false)
              this.$store.commit('changeFlag', Math.random())
              return;
              }
            if(state=="FAIL"){
              this.$Message.error("修改失败");
              return;
            }
            if(state=="ERROR"){
              this.$Message.error(rspmsg);
              return;
            }
         })
        }
      },
      // 刷新数据
      getdata(state){
        if(state==false)
        {
          this.isLoading=true
          let param={
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
          this.$clientAjaxReq('/interface/queryAllCategory',
          param,
          (state,rspmsg,rest)=>{
            this.isLoading=false
            if(state!="SUCCESS")
            {
              this.$Message.error("加载失败，请刷新");
              return;
            }
            let restc=rest
            let arr=[]
            for(let i in rest)
            {
              if(rest[i].categoryId==this.CId)
              {
                restc[i].childCate.forEach(Cate=>{
                  let obj={}
                  obj.jkfljs = Cate.childCategoryDesc
                  obj.jkflmc = Cate.childCategoryName
                  obj.jkflid = Cate.childCategoryId
                  arr.push(obj)
                })
                this.tableData=arr
              }
            }
          })
        }
        else{
          let menuid = state
          let resdate = JSON.parse(sessionStorage.getItem("routerData"))
          resdate[0].forEach(item=>{
            if(item.menuCode==menuid)
            {
              this.isLoading=true
              this.name = item.menuName
              this.CId = item.id
              let param={
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
              this.$clientAjaxReq('/interface/queryAllCategory',
              param,
              (state,rspmsg,rest)=>{
                this.isLoading=false
                if(state!="SUCCESS")
                {
                  this.$Message.error("加载失败，请刷新");
                  return;
                }
                let restc=rest
                let arr=[]
                for(let i in rest)
                {
                  if(rest[i].categoryId==item.id)
                  {
                    this.introduce = rest[i].categoryDesc
                    restc[i].childCate.forEach(Cate=>{
                      let obj={}
                      obj.jkfljs = Cate.childCategoryDesc
                      obj.jkflmc = Cate.childCategoryName
                      obj.jkflid = Cate.childCategoryId
                      arr.push(obj)
                    })
                    this.tableData=arr
                  }
                }
              })
            }
          })
        }
      },
      //点击单元格跳转事件
      cellClicked(obj){
        let resdate=this.$store.state.routerData[0]
        if(obj.colDef.field=="jkflmc")
        {
         // this.$store.commit('changeFlag', Math.random())
         this.$recursion(resdate,'childNodes',item=>{
           if(item.id == this.tableData[obj.rowIndex].jkflid)
           {
             this.$router.push(item.to);
             let offon = true;//是否存在该tag标识
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
        }
      },
    },
    computed:{
      watchstate(){
        return this.$store.state.changeMenu
      }
    },
    watch:{
      watchstate:{
        handler:function(nv,ov){
        this.getdata(nv)
        },
        deep:true
      }
    }
  }
</script>
<style scoped>
  .bg{
     background-color: #fff;
  }
 .titleI{
   color: #009688;
 }
 .table-content{
   padding: 6px 0px;
 }
 .addButton {
   position: relative;
   left: calc(100% - 88px);
   background-color: #fff;
   width: 35px;
   padding: 6px 0;
 }
 .introduce{
    font-size: 14px;
    text-indent: 2em;
 }
 .introduceCard {
   background-color: #fff;
   padding: 6px 20px;
 }
 </style>
