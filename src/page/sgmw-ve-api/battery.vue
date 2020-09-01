<template>
  <div
    style="height: calc(100vh - 108px)">
    <!--  查询  -->
    <mainQuery></mainQuery>
    <!--  包介绍  -->
    <card
      style="height: 150px">
      <h2>
        {{ instrction.name }}
      </h2>
      <p>
        {{ instrction.desc }}
      </p>
    </card>
    <card>
    <!--  新增按钮  -->
    <div
      class="addButton">
      <i-button
        type="primary"
        @click="addInterface">
        新增接口
      </i-button>
    </div>
    <!--  接口表格  -->
    <agTable
      :tableData="tableData"
      :tableColumns="tableColumns"
      :height="tableH - 167"
      :width="tableW"
      :rowHeight="40"
      :headerHeight="44"
      :isLoading="isLoading"
      @operationClick="operationClick"
      @rowDoubleClicked="rowDoubleClicked"
      :buttonAll="buttonAll">
    </agTable>
    <!--新增、修改-->
    <formModel
      ref="formChild"
      :fromModelAlls="fromModelAll"
      @formKeep="formKeep">
      <div
        slot="cheshi"
        class="slot">
        <div
          class="slot-item">
          <span
            class="slot-lable">
            请求头
          </span>
          <editTable
            class="slot-table"
            :tableData="tableData1"
            :tableColumns="tableColumns1"
            :isLoading="isLoading1"
            @allMethods="operationClickDataBase1"
            :width="640">
          </editTable>
        </div>
        <div
          class="slot-item">
          <span
            class="slot-lable">
            请求参数
            <Poptip content="多级参数是用 -> 表示, 例:menulist为array类型,menulist下name应为menulist->name"
            placement="right-end" width="300" word-wrap>
              <Icon type="md-help" color="#3E76F6" />
            </Poptip>
          </span>
          <editTable
            class="slot-table"
            :tableData="tableData2"
            :tableColumns="tableColumns2"
            @allMethods="operationClickDataBase2"
            :isLoading="isLoading1"
            :width="640">
          </editTable>
        </div>
        <div
          class="slot-item">
          <span
            class="slot-lable">
            返回参数
            <Poptip content="多级参数是用 -> 表示, 例:menulist为array类型,menulist下name应为menulist->name"
            placement="right-end" width="300" word-wrap>
              <Icon type="md-help" color="#3E76F6" />
            </Poptip>
          </span>
          <editTable
            class="slot-table"
            :tableData="tableDataBack"
            :tableColumns="tableColumnsBack"
            @allMethods="operationClickDataBase3"
            :isLoading="isLoading1"
            :width="640">
          </editTable>
        </div>
        <div
            class="slot-item">
          <span
          class="slot-lable">
            返回错误码
          </span>
          <editTable
            class="slot-table"
            :tableData="tableData3"
            :tableColumns="tableColumns3"
            :isLoading="isLoading1"
            @allMethods="operationClickDataBase4"
            :width="640">
          </editTable>
        </div>
        <div
            class="slot-item">
          <span
          class="slot-lable">
            关联数据名
          </span>
          <editTable
            class="slot-table"
            :tableData="tableDataDataBase"
            :tableColumns="tableColumnsDataBase"
            :isLoading="isLoading1"
            @allMethods="operationClickDataBase"
            :width="640">
          </editTable>
        </div>
      </div>
    </formModel>
    </card>
    <!--  停用、启用  -->
    <formModel
      ref="apiStatus"
      :fromModelAlls="fromModelAllStop"
      @formKeep="confirmStop">
    </formModel>
    <!--  删除  -->
    <popModel
      :popAll="popAllDelete"
      @confirm="confirmDelete">
    </popModel>
    <popModel
      :popAll="popAllStopEmpower"
      @confirm="confirmStopEmpower">
    </popModel>
    <!--  授权  -->
    <popModel
      :popAll="popAllEmpower">
      <p>
        接口名称:
        <span
          style="color: red">
          {{ name }}
        </span>
      </p>

      <!--   授权按钮   -->
      <div class="changeButton">
        <i-button
          type="primary"
          @click="addNewEmpower">
          新增
        </i-button>
      </div>
      <!--   授权表格   -->
      <agTable
        :tableData="tableDataEmpower"
        :tableColumns="tableColumnsEmpower"
        :height="400"
        :rowHeight="40"
        :headerHeight="44"
        :width="tableW"
        @operationClick="operationClickEmpower"
        :buttonAll="buttonAllEmpower">
      </agTable>
      <!--   新增授权弹窗   -->
      <formModel
        ref="addNewEmpower"
        :fromModelAlls="fromModelAllEmpower"
        @formKeep="confirmInEmpower">
      </formModel>
    </popModel>
    <!--  调试  -->
    <formModel
      ref="debug"
      :fromModelAlls="fromModelAllDebug">
      <div
        slot="left">
        <Tabs
          type="line"
          size="small"
          value="1">
          <tabPane
            name="1"
            label="请求参数">
            <i-input
              v-model="repbody"
              type="textarea"
              style="height: 225px">
            </i-input>
          </tabPane>
          <tabPane
            name="2"
            label="完整请求内容">
            <i-input
              disabled
              v-model="completebody"
              type="textarea"
              style="height: 100%">
            </i-input>
          </tabPane>
        </Tabs>
      </div>
      <div
        slot="center">
        <formModel
          ref="inDebug"
          :fromModelAlls="fromModelAllInDebug"
          @formKeep="formKeepInDebug">
          <div
            style="margin-top: 7px"
            slot="unit">
            <p>
              ms
            </p>
          </div>
        </formModel>
      </div>
      <div
        slot="right">
        <Tabs
          type="line"
          size="small"
          value="1">
          <tabPane
            name="1"
            label="返回参数">
            <i-input
              disabled
              v-model="response"
              type="textarea"
              style="height: 225px">
            </i-input>
          </tabPane>
         <!-- <tabPane
            name="2"
            label="解密">
            <i-input
              type="textarea"
              style="height: 100%">
            </i-input> -->
          </tabPane>
        </Tabs>
      </div>
     </formModel>
    <!--  详细情况  -->
   <popModel
      :popAll="popAllInformation" @close="popAllInformationclose">
      <!--   api介绍   -->
      <!-- <div
        v-for="(item,index) in mainInformation"
        :key="index">
        <p>
          {{ item.name }}: {{ item.information }}
        </p>
      </div> -->
      <!--  关联数据库    -->
    <!--  <h2>接口关联数据库</h2>
      <agTable
        :tableData="tableDataApiWithDatabase"
        :tableColumns="tableColumnsApiWithDatabase"
        :height=200
        :rowHeight=40
        :headerHeight=44
        :width=tableW
        @rowClicked="rowClicked">
      </agTable> -->
      <!--  关联第三方    -->
    <!--  <h2>接口关联调用</h2>
      <agTable
        :tableData="tableDataApiWithEmpower"
        :tableColumns="tableColumnsApiWithEmpower"
        :height="200"
        :rowHeight="40"
        :headerHeight="44"
        :width="tableW"
        @rowClicked="rowClicked">
      </agTable> -->
      <!-- <popModel
        :popAll="popAllDatabase">
        <agTable
          :tableData="tableDataDatabase"
          :tableColumns="tableColumnsDatabase"
          :height="200"
          :rowHeight="40"
          :headerHeight="44"
          :width="tableW">
        </agTable>
      </popModel> -->
     <div class="info">
        <h1>{{infoname}}</h1>
        <span>版本历史:</span>
        <div class="select">
          <i-select @on-change="onChange" v-model="model1">
            <i-option v-for="item in historyList" :value="item.value" :label="item.label" :key="item.value"></i-option>
          </i-select>
        </div>
        <h2>接口说明</h2>
        <p>{{infodesc}}</p>
        <h2>接口url</h2>
        <p>内网测试地址:{{infotestinUrl}}</p><br/>
        <p>外网测试地址:{{infotestoutUrl}}</p><br/>
        <p>内网正式地址:{{infoformalinUrl}}</p><br/>
        <p>外网正式地址:{{infoformaloutUrl}}</p><br/>
        <h2>请求方式</h2>
        <p>{{infoway}}</p>
        <h2>请求头</h2>
        <agTable
          v-if="infoparamName"
          :tableData="infoparamName"
          :tableColumns="tableparamName"
          :height="200"
          :rowHeight="40"
          :headerHeight="44"
          :width="tableW">
        </agTable>
        <p v-else>无</p>
        <h2>请求示例</h2>
        <i-input
          v-if="inforequestDemo"
          disabled
          v-model="inforequestDemo"
          type="textarea"
          :rows="5">
        </i-input>
        <p v-else>无</p>
        <h2>请求参数字段对照表</h2>
        <agTable
          v-if="inforequsetList"
          :tableData="inforequsetList"
          :tableColumns="tablerequsetList"
          :height="200"
          :rowHeight="40"
          :headerHeight="44"
          :width="tableW">
        </agTable>
        <p v-else>无</p>
        <h2>返回示例</h2>
        <i-input
          v-if="inforesponseDemo"
          disabled
          v-model="inforesponseDemo"
          type="textarea"
          :rows="5">
        </i-input>
        <p v-else>无</p>
        <h2>返回参数对照表</h2>
        <agTable
          v-if="inforesponseList"
          :tableData="inforesponseList"
          :tableColumns="tableresponseList"
          :height="200"
          :rowHeight="40"
          :headerHeight="44"
          :width="tableW">
        </agTable>
        <p v-else>无</p>
        <h2>返回码说明</h2>
        <agTable
          v-if="inforesponseBack"
          :tableData="inforesponseBack"
          :tableColumns="tableresponseBack"
          :height="200"
          :rowHeight="40"
          :headerHeight="44"
          :width="tableW">
        </agTable>
        <p v-else>无</p>
      </div>
    </popModel>
  </div>
</template>
<script>
import "./index.css"
import axios from 'axios'
import {
  clientAjaxReq,
  createParameter,
} from "../../util/axios";
import $ from 'jquery';
import 'jquery-ui/themes/base/draggable.css'; //此css不引入也不影响draggable 功能
import 'jquery-ui/ui/widgets/draggable';
import { pageMixin } from "../../util/mixin";
import { mixinsA } from "./mixin/index";
import mainQuery from "../../components/common/mainQuery";

export default {
  name: "battery",
  components:{mainQuery},
  mixins: [pageMixin, mixinsA],
  data(){return{
    data:[],
    interfaceId:"",
    completebody:"",
    repbody:"",
    response:"",
    categoryId:"",
    childCategory:"",
    empowerKeys:"",
    empower:"",
    apiUrl:"",
    addEmpowerCaller:[],
    instrction:{
      name:"",
      desc:""
    },
    //嵌套调试弹窗
    fromModelAllInDebug:{
      fromType:"1",
      isCustomKeep: true,
      isHideClose: true,
      confirmText: "请求数据",
      fromData: [
        {
          type: "radio",
          label: "",
          key: "urlway",
          placeholder:"请求时间",
          radioArr: [{
            val: "1",
            text: "内网测试地址"
          }, {
            val: "2",
            text: "内网正式地址"
          },{
            val: "3",
            text: "外网测试地址"
          }, {
            val: "4",
            text: "外网正式地址"
          }],
          disabled: false,
        },
        {
          type: "input",
          fromType: "text",
          label: "请求时间",
          key: "empowerKeys",
          placeholder:"请求时间",
          disabled: true,
        },
        {
          type: "input",
          fromType: "text",
          label: "响应时间",
          key: "empower",
          placeholder:"响应时间",
          disabled: true,
        },
        {
          type: "input",
          fromType: "text",
          label: "响应时长",
          key: "apiUrl",
          placeholder:"响应时长",
          disabled: true,
          col: 19
        },
        {
          slotName: "unit",
          col: 5
        },

      ],
      menuForm: {
        urlway:"1",
        empowerKeys:this.empowerKeys,
        empower:this.empower,
        apiUrl:this.apiUrl,
      }
    },
  }},
  created() {
    //设置拖拽
    $(function() {
      $(".ivu-modal").draggable({
        handle:".ivu-modal-header,.form-btn",
      });
    });
    let json={}
    clientAjaxReq('/caller/queryCaller',
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
      rest.forEach((item,index)=>{
        for(let i in item.listResponseVO2)
        {
          // let obj={}
          let obj={}
          obj.val=item.listResponseVO2[i].callerId
          obj.text=item.listResponseVO2[i].desc
          arr.push(obj)
        }
      })
      this.addEmpowerCaller=arr
      this.fromModelAllEmpower.fromData[0].selectArr=this.addEmpowerCaller
      })
  },
  mounted() {
    this.beginning();
    this.getTableList();
  },
  methods: {
    beginning(){
      clientAjaxReq(
        "/interface/queryAllCategory",
        {},
        (state, rspMsg, rspData) => {
          this.isLoading = false;
          if (state == "FAIL") {
            this.$Message.error("查询失败！");
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
          }
          if (state == "SUCCESS") {
            this.data = rspData
            for (let i in this.data) {
              for (let j in this.data[i].childCate) {
                if (this.data[i].childCate[j].childCategoryId === this.id) {
                  this.instrction.name = this.data[i].childCate[j].childCategoryName;
                  this.instrction.desc = this.data[i].childCate[j].childCategoryDesc;
                  this.categoryId = this.data[i].categoryId;
                  this.childCategory = this.data[i].childCate[j].childCategoryId;
                }
              }
            }
          }
        }
      );
    },
    getTableList(){
      let req = {categaryId: this.id};
      clientAjaxReq(
        "/interface/queryInterfaceListByCate",
        req,
        (state, rspMsg, rspData) => {
          this.tableData=[]
          this.isLoading = false;
          if (state == "FAIL") {
            this.$Message.error("查询失败！");
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
          }
          if (state == "SUCCESS") {
            this.tableData = rspData
          }
        }
      );
    },
    // 请求头 表格操作事件
    operationClickDataBase1(data){
      this[data.item](this.tableData1, data)
    },
    // 请求参数 表格操作事件
    operationClickDataBase2(data){
      this[data.item](this.tableData2, data)
    },
    // 返回参数 表格操作事件
    operationClickDataBase3(data){
      this[data.item](this.tableDataBack, data)
    },
    // 返回错误码 表格操作事件
    operationClickDataBase4(data){
      this[data.item](this.tableData3, data)
    },
    // 关联数据库 表格操作事件
    operationClickDataBase(data){
      this[data.item](this.tableDataDataBase, data)
    },
    //  表格添加操作事件
    addRow(data){
      data.push({type:5})
    },
    // 表格删除操作事件
    deleteRow(data, rowData) {
      //console.log('ss',data, rowData)
      data.splice(rowData.index, 1)
    },
    //停用、启用接口
    isStop(data) {
      this.fromModelAllStop.menuForm.apiStatus = data.interfaceStatus
      this.fromModelAllStop.isShow = true;
    },
    //禁用、启用授权
    isStopEmpower(data) {
      this.popAllStopEmpower.nTxt = '授权' + data.authorizationName + "?";
      if (this.tableDataEmpower[this.index].isEnable == "1") {
        this.popAllStopEmpower.vTxt = '禁用';
      } else {
        this.popAllStopEmpower.vTxt = '启用';
      }
      this.popAllStopEmpower.isPopModel = true;
    },
    confirmStop(val) {
      let params = {interfaceId: this.tableData[this.index].interfaceId,
        status:""};
      params.status = val.apiStatus
      clientAjaxReq("/interface/updateInterfaceStatus",
        params,
        (state, rspMsg) => {
        if (state == "FAIL") {
          this.$Message.error("操作失败！");
          return;
        }
        if (state == "ERROR") {
          this.$Message.error(rspMsg);
          return;
        }
        if (state == "SUCCESS") {
          this.$Message.success("操作成功！");
          this.getTableList()
        }
      })
      // this.popAllStopEmpower.isPopModel = false;
    },
    //删除接口
    isDelete(data) {
      this.popAllDelete.info=data
      this.popAllDelete.vTxt = '删除接口'
      this.popAllDelete.nTxt = data.interfaceName + "?";
      this.popAllDelete.isPopModel = true;
    },
    //删除授权
    isDeleteEmpower(data) {
      this.popAllDelete.vTxt = '删除授权'
      this.popAllDelete.nTxt = data.authorizationName + "?";
      this.popAllDelete.isPopModel = true;
    },
    //确认删除
    confirmDelete() {
      if(this.popAllDelete.vTxt == '删除授权'){
        clientAjaxReq("/caller/updateAuthorization",
          {authorizationId: this.tableDataEmpower[this.index].authKey,
          type: "3"},
          (state, rspMsg, rspData) => {
            if (state == "FAIL") {
              this.$Message.error("操作失败！");
              return;
            }
            if (state == "ERROR") {
              this.$Message.error(rspMsg);
              return;
            }
            if (state == "SUCCESS") {
              this.$Message.success('删除成功');
              this.popAllDelete.isPopModel = false;
              clientAjaxReq("/interface/queryCallByInterface",
                {interfaceId: this.interfaceId,},
                (state, rspMsg, rspData) => {
                  if (state == "FAIL") {
                    this.$Message.error("操作失败！");
                    return;
                  }
                  if (state == "ERROR") {
                    this.$Message.error(rspMsg);
                    return;
                  }
                  if (state == "SUCCESS") {
                    this.tableDataEmpower = rspData;
                  }
                })
            }
          })
    }
    else{
       clientAjaxReq("/interface/deleteInterfaceByID",
       {interfaceId:this.popAllDelete.info.interfaceId},
       (state, rspMsg, rspData) => {
         if (state == "FAIL") {
           this.$Message.error("操作失败！");
           return;
         }
         if (state == "ERROR") {
           this.$Message.error(rspMsg);
           return;
         }
         if (state == "SUCCESS") {
           this.$Message.success('删除成功');
           this.popAllDelete.isPopModel = false;
           this.getTableList()
           // clientAjaxReq("/interface/queryCallByInterface",
           //   {interfaceId: this.interfaceId,},
           //   (state, rspMsg, rspData) => {
           //     if (state == "FAIL") {
           //       this.$Message.error("操作失败！");
           //       return;
           //     }
           //     if (state == "ERROR") {
           //       this.$Message.error(rspMsg);
           //       return;
           //     }
           //     if (state == "SUCCESS") {
           //       console.log(rspData);
           //       this.tableDataEmpower = rspData;
           //     }
           //   })
         }
       })
    }
  },
    //查看授权
    isEmpower(data) {
      this.name = data.interfaceName;
      this.interfaceId = data.interfaceId
      this.popAllEmpower.isPopModel = true;
      this.popAllEmpower.loading = true;
      clientAjaxReq("/interface/queryCallByInterface",
        {interfaceId: data.interfaceId,},
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("操作失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.tableDataEmpower = rspData;
            this.popAllEmpower.loading = false;
          }
        })
    },
    confirmEmpower(){
      this.popAllEmpower.isPopModel = false;
      this.tableColumnsEmpower[3].hide = true;
    },
    //授权启用禁用
    confirmStopEmpower() {
      let req;
      req={authorizationId: this.tableDataEmpower[this.index].authKey,
      type:""};
      if (this.tableDataEmpower[this.index].isEnable == "1"){
        req.type = "0"
      }
      else{
        req.type = "1"
      }
      clientAjaxReq("/caller/updateAuthorization",
        req,
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("操作失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.$Message.success('操作成功');
            this.popAllStopEmpower.isPopModel = false;
            clientAjaxReq("/interface/queryCallByInterface",
              {interfaceId: this.interfaceId,},
              (state, rspMsg, rspData) => {
                if (state == "FAIL") {
                  this.$Message.error("操作失败！");
                  return;
                }
                if (state == "ERROR") {
                  this.$Message.error(rspMsg);
                  return;
                }
                if (state == "SUCCESS") {
                  this.tableDataEmpower = rspData;
                }
              })
          }
        })

    },
    closeEmpower() {
      this.tableColumnsEmpower[3].hide = true;
    },
    //自定义调试
    // debugself(){
    //    this.selfrepbody=""
    //    this.repbody=""
    //    this.completebody=""
    //    for(let key in this.fromModelAllInDebug.menuForm)
    //    this.fromModelAllInDebug.menuForm[key]=''
    //    for(let key in this.fromModelAllDebug.menuForm)
    //    this.fromModelAllDebug.menuForm[key]=''
    //    this.fromModelAllDebug.isShow = true;
    // },
    //按钮调试
    isDebug(data) {
      this.repbody=""
      for(let key in this.fromModelAllInDebug.menuForm)
      this.fromModelAllInDebug.menuForm[key]=''
      for(let key in this.fromModelAllDebug.menuForm)
      this.fromModelAllDebug.menuForm[key]=''
      this.fromModelAllInDebug.menuForm.urlway='1'
      this.fromModelAllDebug.menuForm.apiName = data.interfaceName;
      this.fromModelAllDebug.menuForm.interfaceUrl = data.privateNetTestUrl;
      this.privateNetTestUrl=data.privateNetTestUrl;
      this.privateNetProductionUrl=data.privateNetProductionUrl;
      this.publicNetProductionUrl=data.publicNetProductionUrl;
      this.publicNetTestUrl=data.publicNetTestUrl;
      let json={
              "appId": "appId-app",
              "signType": "signType",
              "sign": "sign",
              "requestTime": "requestTime",
              "actionId": "actionId",
              "requestId": "requestId",
              "requestCaller": {},
              "requestData": {
                 "authkey":this.fromModelAllDebug.menuForm.authkey,
                 "authPwd":this.fromModelAllDebug.menuForm.authPwd,
                 "encryption":this.fromModelAllDebug.menuForm.encryption,
                 "interfaceUrl":this.fromModelAllDebug.menuForm.interfaceUrl,
                 "requestParams":this.repbody
              }
      }
      this.completebody=JSON.stringify(json)
      this.fromModelAllDebug.isShow = true;
    },
    //接口表格事件分发
    operationClick(item) {
      this.index = item.index;
      switch (item.name) {
        case "changeData":
          this.updateInterface(item.data);
          break;
        case "stopApi":
          this.isStop(item.data);
          break;
        case "deleteApi":
          this.isDelete(item.data);
          break;
        case "empower":
          this.isEmpower(item.data);
          break;
        case "debug":
          this.isDebug(item.data);
          break;
      }
    },
    //授权表格事件分发
    operationClickEmpower(item) {
      this.index = item.index
      switch (item.name) {
        case "stopApi":
          this.isStopEmpower(item.data);
          break;
        case "delete":
          this.isDeleteEmpower(item.data);
          break;
      }
    },
    //确认新增授权
    confirmInEmpower(obj) {
      if(obj.vins=="")
      obj.vins="*"
      if(obj.ips=="")
      obj.ips="*"
      let req ={
        callerId:obj.addEmpowerCaller,
        InterfaceId:this.interfaceId,
        encryption:obj.encryption,
        vins:obj.vins,
        ips:obj.ips
      }
      clientAjaxReq("/caller/addInterfaceAuthorization",
        req,
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("操作失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.$Message.success('授权成功！');
            clientAjaxReq("/interface/queryCallByInterface",
              {interfaceId: this.interfaceId,},
              (state, rspMsg, rspData) => {
                if (state == "FAIL") {
                  this.$Message.error("操作失败！");
                  return;
                }
                if (state == "ERROR") {
                  this.$Message.error(rspMsg);
                  return;
                }
                if (state == "SUCCESS") {
                  this.tableDataEmpower = rspData;
                }
              })
          }
        })
        $(".ivu-modal.ui-draggable").css("height","");
        $(".ivu-modal-body").css("height","");
        $(".write-model.form_model").css("height","");
        $(".write-form.baowei_form.ivu-form.ivu-form-label-right").css("height","");
        this.$refs.addNewEmpower.close()
    },
    //自定义关闭按钮事件
    formclose(){
      $(".ivu-modal.ui-draggable").css("height","");
      $(".ivu-modal-body").css("height","");
      $(".write-model.form_model").css("height","");
      $(".write-form.baowei_form.ivu-form.ivu-form-label-right").css("height","");
      this.$refs.addNewEmpower.close()
    },
    //测试模块 接口地址类型切换
    changeselect(mode){
      switch (mode) {
        case "1":
          this.fromModelAllDebug.menuForm.interfaceUrl=this.privateNetTestUrl
          break;
        case "2":
           this.fromModelAllDebug.menuForm.interfaceUrl=this.privateNetProductionUrl
          break;
        case "3":
           this.fromModelAllDebug.menuForm.interfaceUrl=this.publicNetTestUrl
          break;
        case "4":
           this.fromModelAllDebug.menuForm.interfaceUrl=this.publicNetProductionUrl
          break;
      }
    },
    changecomplete(){
      let json={
              "appId": "appId-app",
              "signType": "signType",
              "sign": "sign",
              "requestTime": "requestTime",
              "actionId": "actionId",
              "requestId": "requestId",
              "requestCaller": {},
              "requestData": {
                 "authkey":this.fromModelAllDebug.menuForm.authkey,
                 "authPwd":this.fromModelAllDebug.menuForm.authPwd,
                 "encryption":this.fromModelAllDebug.menuForm.encryption,
                 "interfaceUrl":this.fromModelAllDebug.menuForm.interfaceUrl,
                 "requestParams":this.repbody
              }
      }
      this.completebody=JSON.stringify(json)
    },
    // changerepbody(){
    //     let json={
    //             "appId": "appId-app",
    //             "signType": "signType",
    //             "sign": "sign",
    //             "requestTime": "requestTime",
    //             "actionId": "actionId",
    //             "requestId": "requestId",
    //             "requestCaller": {},
    //             "requestData": {
    //                "authkey":this.fromModelAllDebug.menuForm.authkey,
    //                "authPwd":this.fromModelAllDebug.menuForm.authPwd,
    //                "encryption":this.fromModelAllDebug.menuForm.encryption,
    //                "interfaceUrl":this.fromModelAllDebug.menuForm.interfaceUrl,
    //                "requestParams":this.repbody
    //             }
    //         }
    //     this.completebody=JSON.stringify(json)
    // },
    setTime(date){
      let hour = date.getHours();
      if(hour<10)
      hour='0'+hour
      let minute = date.getMinutes();
      if(minute<10)
      minute='0'+minute
      let second = date.getSeconds();
      if(second<10)
      second='0'+second
      return hour + ':' + minute +':'+second
    },
    // 测试模块 请求数据按钮
    formKeepInDebug() {
      let _this=this
      this.fromModelAllInDebug.menuForm.empowerKeys=""
      this.fromModelAllInDebug.menuForm.empower=""
      this.fromModelAllInDebug.menuForm.apiUrl=""
        let params = {
          authkey:this.fromModelAllDebug.menuForm.authkey,
          authPwd:this.fromModelAllDebug.menuForm.authPwd,
          encryption:this.fromModelAllDebug.menuForm.encryption,
          interfaceUrl:this.fromModelAllDebug.menuForm.interfaceUrl,
          requestParams:this.repbody,
        }
          let now1 = new Date();
          let ms1 = now1.getTime();
          this.empowerKeys = this.setTime(now1);
          this.fromModelAllInDebug.menuForm.empowerKeys=this.empowerKeys
        clientAjaxReq('/interface/interfaceTest', params, (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("请求失败！");
            return;
          }
          if (state == "ERROR") {
            let now2 = new Date();
            let ms2 = now2.getTime();
            this.empower= this.setTime(now2);
            this.fromModelAllInDebug.menuForm.empower=this.empower
            this.apiUrl=ms2 - ms1
            this.fromModelAllInDebug.menuForm.apiUrl=this.apiUrl
            this.response=rspMsg;
            return;
          }
          if (state == "SUCCESS") {
            let now3 = new Date();
            this.empower= this.setTime(now3);
            this.fromModelAllInDebug.menuForm.empower=this.empower
            this.apiUrl=ms3 - ms1
            this.fromModelAllInDebug.menuForm.apiUrl=this.apiUrl
            this.$Message.success("请求成功");
            this.response=JSON.stringify(rspData);
          }
        })

      // else if(this.fromModelAllInDebug.menuForm.way=="1")
      // {
      //   let data=this.completebody
      //   let now4 = new Date();
      //   let hour = now4.getHours();
      //   let minute = now4.getMinutes();
      //   if(minute<10)
      //   minute='0'+minute
      //   let second = now4.getSeconds();
      //   if(second<10)
      //   second='0'+second
      //   let ms4 = now4.getTime();
      //   this.empowerKeys = hour + ':' + minute +':'+second
      //   this.fromModelAllInDebug.menuForm.empowerKeys=this.empowerKeys
      //   console.log(this.fromModelAllDebug.menuForm.interfaceUrl)
      //   if(this.fromModelAllDebug.menuForm.interfaceUrl.indexOf("http://")!=0 && this.fromModelAllDebug.menuForm.interfaceUrl.indexOf("https://")!=0)
      //   {
      //     this.$Message.error("请输入合法的http://或http://接口地址");
      //   }
      //   else
      //   {
      //     axios.post(this.fromModelAllDebug.menuForm.interfaceUrl,data,{timeout: 5000})
      //     .catch(function(err){
      //       if (err.response) {
      //           _this.response=err.response.data+''+err.response.status+''+err.response.headers
      //         } else if (err.request) {
      //           _this.response=err.request
      //           if(err.request.timeout==5000)
      //           {
      //             _this.$Message.error("请求超时");
      //           }
      //         } else {
      //           // Something happened in setting up the request that triggered an Error
      //           console.log(err.message);
      //           if(err.message=="Failed to execute 'open' on 'XMLHttpRequest': Invalid URL")
      //           {
      //             _this.response=err.message
      //             _this.$Message.error("请输入合法的http接口地址");
      //              return;
      //           }
      //           else{
      //             _this.response=err.message
      //             _this.$Message.error("未知错误");
      //             console.log(err.message)
      //           }
      //         }
      //     })
      //     .then(res=>{
      //       if(res==undefined)
      //       return;
      //       console.log(res)
      //       let now5 = new Date();
      //       hour = now5.getHours();
      //       minute = now5.getMinutes();
      //       if(minute<10)
      //       minute='0'+minute
      //       second = now5.getSeconds();
      //       if(second<10)
      //       second='0'+second
      //       let ms5 = now5.getTime();
      //       this.empower= hour + ':' + minute + ':' +second
      //       this.fromModelAllInDebug.menuForm.empower=this.empower
      //       this.apiUrl=ms5 - ms4
      //       this.fromModelAllInDebug.menuForm.apiUrl=this.apiUrl
      //       this.$Message.success("请求成功");
      //       this.response=JSON.stringify(res)
      //     })
      //   }
      // }
    },
    isJSON(str) {
      if (typeof str == 'string') {
        try {
            let obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }
            else{
                return false;
            }
        }
        catch(e) {
            // console.log('error：'+str+'!!!'+e);
            return false;
        }
      }
    },
    //确认新增
    formKeep(obj) {
      if(!this.isJSON(obj.reposeDemo) || !this.isJSON(obj.requestDemo)){
        this.$Message.error("请求示例或返回实例不为JSON格式！");
        return
      }
      let reqData;
      reqData =
        {interfaceDesc:obj.interfaceDesc,
        InterfaceId:null,
        parmList:[],
        requestDemo:obj.requestDemo,
        modifyDesc:obj.modifyDesc,
        directory_first_id:this.categoryId,
        interfaceName:obj.interfaceName,
        privateNetProductionUrl:obj.formalinUrl,
        publicNetProductionUrl:obj.formaloutUrl,
        privateNetTestUrl:obj.testinUrl,
        publicNetTestUrl:obj.testoutUrl,
        directory_second_id:this.childCategory,
        status:obj.status,
        reposeDemo:obj.reposeDemo,
        projectName: obj.projectName,
        requestMethod: obj.requestMethod
        };
      if( this.fromModelAll.jkid !== ""){
        reqData.InterfaceId = this.fromModelAll.jkid;
      } else {
        reqData.InterfaceId = null;
      }
      for(let i in this.tableDataDataBase){
        this.tableDataDataBase[i].type = "5"
        reqData.parmList.push(this.tableDataDataBase[i])
      }
      for(let i in this.tableData1){
        this.tableData1[i].type = "3"
        reqData.parmList.push(this.tableData1[i])
      }
      for(let i in this.tableData2){
        this.tableData2[i].type = "1"
        reqData.parmList.push(this.tableData2[i])
      }
      for(let i in this.tableData3){
        this.tableData3[i].type = "4"
        reqData.parmList.push(this.tableData3[i])
      }
      for(let i in this.tableDataBack){
        this.tableDataBack[i].type = "2"
        reqData.parmList.push(this.tableDataBack[i])
      }
      //console.log(reqData.parmList)
      clientAjaxReq(
        "/interface/addOrModifyInterface",
        reqData,
        (state, rspMsg, rspData) => {
          this.fromModelAll.isShow = true;
          this.isLoading = false;
          if (state == "FAIL") {
            this.$Message.error("失败！");
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
          }
          if (state == "SUCCESS") {
            this.$Message.success('添加成功！')
            this.$refs.formChild.close()
            this.getTableList()

          }
        }
      );
      // this.tableData1[0] = {};
      // this.tableData2[0] = {};
      // this.tableDataBack[0] = {};
      // this.fromModelAll.menuForm={
      //   interfaceName:"",
      //   interfaceDesc:"",
      //   projectName:"",
      //   reposeDemo:"",
      //   status:"",
      //   InterfaceUrl:"",
      //   requestDemo:"",}
      //this.fromModelAll.isShow = false
    },
    // 新增接口
    addInterface() {
      this.tableData2=[]
      this.tableData1=[]
      this.tableData3=[]
      this.tableDataBack=[]
      this.tableDataDataBase=[]
      this.data.forEach(item => {
        item.childCate.forEach(item1 => {
          if(item1.childCategoryId == JSON.parse(sessionStorage.getItem("selectedMenu")).childCategoryId) {
            this.fromModelAll.menuForm.projectName = item.categoryName
          }
        })
      })
      this.fromModelAll.isShow = true;
      this.fromModelAll.jkid = '';
      this.fromModelAll.title = '新增接口';
    },
    // 修改接口
    updateInterface(data) {
      this.tableData2=[]
      this.tableData1=[]
      this.tableData3=[]
      this.tableDataBack=[]
      this.tableDataDataBase=[]
      let req = {requestparm: data.interfaceId}
      this.fromModelAll.isShow = true;
      this.fromModelAll.loading = true;
      this.fromModelAll.jkid = data.interfaceId;
      this.fromModelAll.title = '修改接口';
      clientAjaxReq("/interface/queryInterface",
        req,
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("操作失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.fromModelAll.menuForm = {
              interfaceDesc: rspData.interfaceDesc,
              interfaceName: rspData.interfaceName,
              projectName: rspData.projectName,
              reposeDemo: rspData.reposeDemo,
              status: rspData.status+"",
              requestMethod: rspData.requestMethod,
              modifyDesc: rspData.modifyDesc,
              formalinUrl: rspData.privateNetProductionUrl,
              formaloutUrl: rspData.publicNetProductionUrl,
              testinUrl: rspData.privateNetTestUrl,
              testoutUrl: rspData.publicNetTestUrl,
              requestDemo: rspData.requestDemo,
            }
            for(let i in rspData.parmList){
              switch(rspData.parmList[i].type){
                case "1": {
                  this.tableData2.push(rspData.parmList[i])
                  break
                }
                case "2": {
                  this.tableDataBack.push(rspData.parmList[i])
                  break
                }
                case "3" :{
                  this.tableData1.push(rspData.parmList[i])
                  break
                }

                case "4" :{
                  this.tableData3.push(rspData.parmList[i])
                  break
                }
                case "5": {
                  this.tableDataDataBase.push(rspData.parmList[i])
                  break
                }
              }
            }
            this.fromModelAll.loading = false;
          }
      })
    },
    //时间戳转换
    getdate(date){
      let time =new Date(parseInt(date))
      let hour = time.getHours();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      if(hour<10)
      hour='0'+hour
      let minute = time.getMinutes();
      if(minute<10)
      minute='0'+minute
      let second = time.getSeconds();
      if(second<10)
      second='0'+second
      return y + '-' + m+ '-' + d + "  " +  hour + ':' + minute + ':' +second
    },
    //主表格行双击打开具体预览
    rowDoubleClicked(data) {
      this.InterfaceId = data.data.interfaceId
      let req = {requestparm: data.data.interfaceId};
      this.popAllInformation.loading=true
      clientAjaxReq("/interface/queryInterface",
        req,
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.popAllInformation.loading=false
            this.$Message.error("详细数据获取失败！");
            return;
          }
          if (state == "ERROR") {
            this.popAllInformation.loading=false
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.inforequsetList=[];
            this.inforesponseList=[];
            this.infoparamName=[];
            this.inforesponseBack=[];
            this.infodataBase=[];
            for(let i in rspData.parmList){
              switch(rspData.parmList[i].type){
                case "1": this.inforequsetList.push(rspData.parmList[i])
                  break
                case "2": this.inforesponseList.push(rspData.parmList[i])
                  break
                case "3" :this.infoparamName.push(rspData.parmList[i])
                  break
                case "4" :this.inforesponseBack.push(rspData.parmList[i])
                  break
                case "5": this.infodataBase.push(rspData.parmList[i])
                  break
              }
            }
            if (this.inforequsetList==0)
            this.inforequsetList=null
            if (this.inforesponseList==0)
            this.inforesponseList=null
            if (this.infoparamName.length==0)
            this.infoparamName=null
            if (this.inforesponseBack==0)
            this.inforesponseBack=null
            if (this.infodataBase==0)
            this.infodataBase=null
            this.infoname=rspData.interfaceName;
            this.infodesc=rspData.interfaceDesc;
            this.infotestinUrl=rspData.privateNetTestUrl;
            this.infotestoutUrl=rspData.privateNetProductionUrl;
            this.infoformalinUrl=rspData.publicNetTestUrl;
            this.infoformaloutUrl=rspData.publicNetProductionUrl;
            this.infoway=rspData.requestMethod;
            this.inforequestDemo=rspData.requestDemo;
            this.inforesponseDemo=rspData.reposeDemo;
            let arr = []
            for(let i in rspData.historyVersion)
            {
              let date = this.getdate(rspData.historyVersion[i])
              let obj ={
                value: rspData.historyVersion[i],
                label: date
              }
              arr.push(obj)
            }
            this.historyList = arr
            this.model1 = arr[arr.length-1].value
            // let time=parseInt(rspData.version);
            this.popAllInformation.loading=false
          }
        })
        $(".ivu-modal.ui-draggable").css("height","700px");
        $(".ivu-modal-body").css("height","100%");
        $(".modal_txt2").css("height","calc(700px - 41.89px)");
        $(".modal_txt2").css("overflow","scroll");
        this.popAllInformation.isPopModel = true;
        this.popAllInformation.title = data.data.interfaceName;
    },
    //选择版本历史
    onChange(data){
      let req = {requestparm: this.InterfaceId , version: data};
      this.popAllInformation.loading=true
      clientAjaxReq("/interface/queryInterface",
        req,
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.popAllInformation.loading=false
            this.$Message.error("详细数据获取失败！");
            return;
          }
          if (state == "ERROR") {
            this.popAllInformation.loading=false
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.inforequsetList=[];
            this.inforesponseList=[];
            this.infoparamName=[];
            this.inforesponseBack=[];
            this.infodataBase=[];
            for(let i in rspData.parmList){
              switch(rspData.parmList[i].type){
                case "1": this.inforequsetList.push(rspData.parmList[i])
                  break
                case "2": this.inforesponseList.push(rspData.parmList[i])
                  break
                case "3" :this.infoparamName.push(rspData.parmList[i])
                  break
                case "4" :this.inforesponseBack.push(rspData.parmList[i])
                  break
                case "5": this.infodataBase.push(rspData.parmList[i])
                  break
              }
            }
            if (this.inforequsetList==0)
            this.inforequsetList=null
            if (this.inforesponseList==0)
            this.inforesponseList=null
            if (this.infoparamName.length==0)
            this.infoparamName=null
            if (this.inforesponseBack==0)
            this.inforesponseBack=null
            if (this.infodataBase==0)
            this.infodataBase=null
            this.infoname=rspData.interfaceName;
            this.infodesc=rspData.interfaceDesc;
            this.infotestinUrl=rspData.privateNetTestUrl;
            this.infotestoutUrl=rspData.privateNetProductionUrl;
            this.infoformalinUrl=rspData.publicNetTestUrl;
            this.infoformaloutUrl=rspData.publicNetProductionUrl;
            this.infoway=rspData.requestMethod;
            this.inforequestDemo=rspData.requestDemo;
            this.inforesponseDemo=rspData.reposeDemo;
            this.popAllInformation.loading=false
         }
       })
    },
    popAllInformationclose(){
      $(".ivu-modal.ui-draggable").css("height","");
      $(".ivu-modal-body").css("height","");
      $(".modal_txt2").css("height","");
      $(".modal_txt2").css("overflow","");
       this.popAllInformation.isPopModel = false;
    },
    //详细弹窗点击预览
    rowClicked() {
      this.popAllDatabase.isPopModel = true;
    },
    //新增授权触发
    addNewEmpower() {
     $(".ivu-modal.ui-draggable").css("height","400px");
     $(".ivu-modal-body").css("height","100%");
     $(".write-model.form_model").css("height","100%");
     $(".write-form.baowei_form.ivu-form.ivu-form-label-right").css("height","calc(400px - 41.89px)");
     this.fromModelAllEmpower.isShow = true;
    }
  },
  watch:{
    "$store.state.MenuId": {
      deep:true,
      handler: function (newValue){
        for( let i in this.data){
          for( let j in this.data[i].childCate){
            if( this.data[i].childCate[j].childCategoryId === newValue){
              this.getTableList();
              this.instrction.name = this.data[i].childCate[j].childCategoryName;
              this.instrction.desc = this.data[i].childCate[j].childCategoryDesc;
              this.categoryId = this.data[i].categoryId;
              this.childCategory = this.data[i].childCate[j].childCategoryId;
            }
          }
        }
      }
    },
    watchSelect:{
      handler:function(nv,ov){
        this.changeselect(nv)
      },
      deep:true
    },
    watchDebug:{
      handler:function(nv,ov){
        this.changecomplete()
      },
      deep:true
    },
    // watchselfrepbody:{
    //   handler:function(nv,ov){
    //     console.log("changes")
    //     this.changeselfrepbody()
    //   },
    //   deep:true
    // },
    watchrepbody:{
      handler:function(nv,ov){
        this.changecomplete()
      },
      deep:true
    },
    // watchtest:{
    //   handler:function(nv,ov){
    //     console.log("changer")
    //     this.changerepbody()
    //   },
    //   deep:true
    // },
  },
  computed:{
    id(){
      return this.$store.state.MenuId
    },
    watchSelect(){
      return this.fromModelAllInDebug.menuForm.urlway
    },
    watchDebug(){
      return this.fromModelAllDebug.menuForm
    },
    watchrepbody(){
      return this.repbody
    },
    // watchselfrepbody(){
    //   return this.selfrepbody
    // },
    // test(){
    //   return this.fromModelAll
    // },
  }
}
</script>

<style scoped>
.select{
  width: 200px;
  display: inline-block;
}
.info h1{
  text-align: center;
}
.info p{
  line-height: 20px;
  text-indent: 2em;
}
.addButton{
  position: relative;
  left: calc(100% - 90px);
  margin-top: 10px;
  margin-bottom: 2px;
}
.changeButton{
  position: relative;
  left: calc(100% - 60px);
}
.slot-item {
  margin-bottom: 10px;
}

.slot-lable {
  display: inline-block;
  width: 80px;
  text-align: right;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
}

.slot-table {
  display: inline-block;
  width: calc(100% - 84px) !important;
  vertical-align: top;
}
</style>
