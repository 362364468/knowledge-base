export const mixinsA = {
  data(){
    let self =this
    return{
      isLoading: true,
      apiName: "battery",
      name: '',
      index: '',
      height: 400,
      // mainInformation: [
      //   {name: "简要描述",
      //     information:""},
      //   {name: "状态",
      //     information:""},
      //   {name: "请求方式",
      //     information:""},
      //   {name: "请求地址（包含测试、生产）",
      //     information:""},
      //   {name: "请求头",
      //     information:""},
      //   {name: "请求参数",
      //     information:""},
      //   {name: "返回参数",
      //     information:""},
      //   {name: "request示例",
      //     information:""},
      //   {name: "response示例",
      //     information:""},
      //   {name: "响应码",
      //     information:""},
      //   {name: "版本历史",
      //     information:""},
      // ],
      model1:'',
      infoname:'',
      infodesc:'',
      infotestinUrl:'',
      infotestoutUrl:'',
      infoformalinUrl:'',
      infoformaloutUrl:'',
      infoway:'',
      infoparamName:'',
      inforequestDemo:'',
      inforequsetList:'',
      inforesponseDemo:'',
      inforesponseList:'',
      inforesponseBack:'',
      infodataBase:'',
      infoVersion:'',
      privateNetTestUrl:'',
      privateNetProductionUrl:'',
      publicNetProductionUrl:'',
      publicNetTestUrl:'',
      historyList:'',
      tableparamName:[
        {
          headerName: "请求头参数名",
          width: 200,
          field: "paramName"
        },
        {
          headerName: "数据类型",
          width: 200,
          field: "partype"
        },
        {
          headerName: "是否必填",
          width: 200,
          field: "ismust",
          valueGetter: params => {
            if(params.data.ismust=="1")
            return "是"
            else
            return "否"
          }
        },
        {
          headerName: "默认值",
          width: 200,
          field: "defaultValue"
        },
        {
          headerName: "参数说明",
          width: 200,
          field: "desc"
        }
      ],
      tablerequsetList:[
        {
          headerName: "请求参数名",
          width: 200,
          field: "paramName"
        },
        {
          headerName: "数据类型",
          width: 200,
          field: "partype"
        },
        {
          headerName: "是否必填",
          width: 200,
          field: "ismust",
          valueGetter: params => {
            if(params.data.ismust=="1")
            return "是"
            else
            return "否"
          }
        },
        {
          headerName: "默认值",
          width: 200,
          field: "defaultValue"
        },
        {
          headerName: "参数说明",
          width: 200,
          field: "desc"
        }],
      tableresponseList:[
        {
          headerName: "返回参数名",
          width: 200,
          field: "paramName"
        },
        {
          headerName: "数据类型",
          width: 200,
          field: "partype"
        },
        {
          headerName: "参数说明",
          width: 200,
          field: "desc"
        }],
      tableresponseBack:[
        {
          headerName: "返回码",
          width: 200,
          field: "paramName"
        },
        {
          headerName: "返回码描述",
          width: 200,
          field: "desc"
        }],
      tableinfodataBase:[
        {
          headerName: "关联数据名",
          width: 200,
          field: "paramName"
        },
        {
          headerName: "类型",
          width: 200,
          field: "partype"
        },
        {
          headerName: "参数说明",
          width: 200,
          field: "desc"
        }],
      //新增、修改弹窗
      isLoading1: false,
      //请求头、
      tableData1: [
      ],
      tableColumns1: [
        {
          headerName: "名称",
          inputType: "input",
          cellClass: "asd",
          width: 150,
          field: "paramName",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
          headerName: "必填",
          width: 100,
          field: "ismust",
          inputType: "select",
          arr: [
            {
            label: "是",
            value: "1"
            }, {
              label: "否",
              value: "2"
            }
          ]
        }, {
          headerName: "类型",
          width: 120,
          field: "partype",
          cellClass: "asd",
          inputType: "input",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
          headerName: "默认值",
          inputType: "input",
          cellClass: "asd",
          width: 100,
          field: "defaultValue",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
          headerName: "说明",
          inputType: "input",
          cellClass: "asd",
          width: 100,
          field: "desc",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
          headerName: "操作_图标",
          width: 80,
          headerClass: "iconxinzeng primary",
          headerMethods: "addRow",
          icon: [{
            title: "删除",
            iconClass: "iconfont iconguanbi error",
            methods: "deleteRow",
            popTips: "确认删除该行数据？",
            show(data) {
              return true;
            }
          }]
        }
      ],
      //请求参数表格
      tableData2: [
      ],
      tableColumns2: [
        {
          headerName: "名称",
          inputType: "input",
          cellClass: "asd",
          width: 150,
          field: "paramName",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
          headerName: "必填",
          width: 100,
          field: "ismust",
          inputType: "select",
          arr: [
            {
            label: "是",
            value: "1"
            }, {
              label: "否",
              value: "2"
            }
          ]
        }, {
          headerName: "类型",
          width: 120,
          field: "partype",
          inputType: "input",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
          headerName: "默认值",
          inputType: "input",
          cellClass: "asd",
          width: 100,
          field: "defaultValue",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
          headerName: "说明",
          inputType: "input",
          cellClass: "asd",
          width: 100,
          field: "desc",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
          headerName: "操作_图标",
          width: 80 ,
          headerClass: "iconxinzeng primary",
          headerMethods: "addRow",
          icon: [{
            title: "删除",
            iconClass: "iconfont iconguanbi error",
            methods: "deleteRow",
            popTips: "确认删除该行数据？",
            show(data) {
              return true;
            }
          }]
        }
      ],
      //返回错误码表格
      tableData3: [
      ],
      tableColumns3: [
        {
          headerName: "返回码",
          inputType: "input",
          cellClass: "asd",
          width: 100,
          field: "paramName",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
          headerName: "说明",
          inputType: "input",
          cellClass: "asd",
          width: 300,
          field: "desc",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
           headerName: "操作_图标",
          width: 80 ,
          headerClass: "iconxinzeng primary",
          headerMethods: "addRow",
          icon: [{
            title: "删除",
            iconClass: "iconfont iconguanbi error",
            methods: "deleteRow",
            popTips: "确认删除该行数据？",
            show(data) {
              return true;
            }
          }]
        }
      ],
      //返回参数表格
      tableDataBack: [
      ],
      tableColumnsBack: [
        {
          headerName: "名称",
          inputType: "input",
          cellClass: "asd",
          width: 150,
          field: "paramName",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
          headerName: "类型",
          width: 120,
          field: "partype",
          inputType: "input",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        },{
          headerName: "说明",
          inputType: "input",
          cellClass: "asd",
          width: 300,
          field: "desc",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,

        }, {
           headerName: "操作_图标",
          width: 80,
          headerClass: "iconxinzeng primary",
          headerMethods: "addRow",
          icon: [{
            title: "删除",
            iconClass: "iconfont iconguanbi error",
            methods: "deleteRow",
            popTips: "确认删除该行数据？",
            show(data) {
              return true;
            }
          }]
        }
      ],
      //数据库表格：
      tableDataDataBase: [

      ],
      tableColumnsDataBase: [
       {
          headerName: "名称",
          inputType: "input",
          cellClass: "asd",
          width: 150,
          field: "paramName",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
          headerName: "类型",
          width: 120,
          field: "partype",
          inputType: "input",
        },{
          headerName: "说明",
          inputType: "input",
          cellClass: "asd",
          width: 100,
          field: "desc",
          placeholder: "", //提示信息;
          disabled: false, //是否不可点击;
          required: false,
        }, {
          headerName: "操作_图标",
          width: 80,
          headerClass: "iconxinzeng primary",
          headerMethods: "addRow",
          icon: [{
            title: "删除",
            iconClass: "iconfont iconguanbi error",
            methods: "deleteRow",
            popTips: "确认删除该行数据？",
            show(data) {
              return true;
            }
          }]
        }
      ],
      // 新增/修改弹窗数据
      fromModelAll: {
        jkid: '',
        fromType: "4",
        isShow: false,
        isCustomKeep: true,
        loading: false,
        modelWidth: 779,
        title: "",
        fromData: [
          {
            lenged:"接口基本信息",
            fieldset:[{
              type: "input",
              key: "interfaceName",
              label: "接口名称",
              col: "24",
              message: true,
              fromType: "text"
              },
              {
                type: "input",
                key: "projectName",
                label: "所属项目包",
                col: "12",
                fromType: "text",
                disabled: true,
                message: true,
              },
              {
                type: "input",
                key: "interfaceDesc",
                label: "接口说明",
                col: "24",
                fromType: "text",
                message: true,
              },
              {
                type: "select",
                key: "requestMethod",
                label: "请求方式",
                message: true,
                col: "10",
                selectArr: [{
                  val: "POST",
                  text: "POST"
                }, {
                  val: "GET",
                  text: "GET"
                }]
              },
              {
                type: "select",
                key: "status",
                label: "接口状态",
                col: "10",
                message: true,
                selectArr: [{
                  val: "1",
                  text: "开发中"
                }, {
                  val: "2",
                  text: "测试中"
                },{
                  val: "3",
                  text: "停用"
                }, {
                  val: "4",
                  text: "已上线"
                }]
              }]
          },
          {
            lenged:"正式地址",
            fieldset:[{
              type: "input",
              fromType: "text",
              key: "formalinUrl",
              label: "内网地址",
              placeholder:"请输入正式内网地址",
              col: "12",
              message: true,
              fromType: "text"
              },
              {
              type: "input",
              key: "formaloutUrl",
              label: "外网地址",
              placeholder:"请输入正式外网地址",
              col: "12",
              fromType: "text"
              }]
          },
          {
            lenged:"测试地址",
            fieldset:[{
              type: "input",
              fromType: "text",
              key: "testinUrl",
              label: "内网地址",
              placeholder:"请输入测试内网地址",
              col: "12",
              message: true,
              fromType: "text"
              },
              {
               type: "input",
               key: "testoutUrl",
               label: "外网地址",
               placeholder:"请输入测试外网地址",
               col: "12",
               message: true,
               fromType: "text"
              },]
          },
          {
            lenged:"接口参数信息",
            fieldset:[
            {
              slotName: "cheshi" //表单中插槽传值slot名(必须于插入元素的slot相匹配);
            }],
          },
          {
            lenged:"接口说明",
            fieldset:[
            {
              type: "input",
              key: "modifyDesc",
              label: "修改说明",
              fromType: "textarea",
              rows:5
            },
            {
              type: "input",
              key: "requestDemo",
              label: "request示例",
              fromType: "textarea",
              rows:5
            },
            {
              type: "input",
              key: "reposeDemo",
              label: "response示例",
              fromType: "textarea",
              rows:5
            }],
          },
        ],
        menuForm: {
          interfaceName:"",
          interfaceDesc:"",
          formalinUrl:"",
          formaloutUrl:"",
          testinUrl:"",
          testoutUrl:"",
          projectName:"",
          reposeDemo:"",
          status:"",
          InterfaceUrl:"",
          requestDemo:"",
          requestMethod: "",
          modifyDesc: ""
        }
      },
      //接口表格数据
      tableData:[
      ],
      //接口表格配置
      tableColumns: [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          pinned: "left",
          width: 25,
          hide:false,
          isHide: true, //详情页是否隐藏;
        },
        {
          headerName: '序号',
          width: 80,
          isHide: true,
          valueGetter: params => {
            if (this.pageAll) {
              var p_n = this.pageAll.pageInfo.pageCurrent;
              var p_l = this.pageAll.pageInfo.pageSize;
              var num = (p_n - 1) * p_l + params.node.rowIndex;
              return num + 1;
            } else {
              return params.node.rowIndex + 1;
            }
          }
        },{
          headerName: '接口名称',
          width: 120,
          isHide: true,
          field:'interfaceDesc',
          cellRenderer(params) {
            return ' '+params.data.interfaceName;
          }
        },{
          headerName: '内网测试地址',
          width: 400,
          isHide: true,
          field:'privateNetTestUrl',
          cellRenderer(params) {
            return ' '+params.data.privateNetTestUrl;
          }
        },{
          headerName: '接口状态',
          width: 150,
          isHide: true,
          field: "status",
          cellStyle: params => {
            return params.data.interfaceStatus === 4 ? {color:"red"} : {color:"green"};
          },
          valueGetter: params => {
            if(params.data.interfaceStatus === 1)
            {
              return "开发中";
            }
            else if(params.data.interfaceStatus === 2)
            {
              return "测试中";
            }
            else if(params.data.interfaceStatus === 3)
            {
              return "已上线";
            }
            else
            {
              return "已废弃";
            }
          }
        },{
          headerName: '所属项目名称',
          minWidth: 240,
          isHide: true,
          field: 'projectName',
          valueGetter: params => {
            return ' '+params.data.projectName;
          }
        },{
          headerName: '操作',
          Width:250,
          isHide: true,
          pinned: "right",
        }
      ],
      //接口表格按钮
      buttonAll:[
        {
          type: "primary",
          click: "changeData",
          name: "修改",
          publicActionName:"按钮修改",//公共行为名称;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
        },
        {
          type: "primary",
          click: "stopApi",
          publicActionName:"启用停用",//公共行为名称;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
          name: "更改状态"
        },
        {
          type: "error",
          click: "deleteApi",
          name: "删除",
          publicActionName:"按钮删除",//公共行为名称;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
        },
        {
          type: "primary",
          click: "empower",
          name: "授权",
          publicActionName:"授权",//公共行为名称;
          title: "授权该接口",//鼠标移入显示的文字;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
        },
        {
          type: "primary",
          click: "debug",
          name: "测试",
          publicActionName:"调试接口",//公共行为名称;
          title: "测试该接口",//鼠标移入显示的文字;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
        }
      ],
      //授权表格数据
      tableDataEmpower:[
      ],
      //授权表格配置
      tableColumnsEmpower: [
        {
          headerName: '序号',
          Width: 70,
          isHide: true,
          valueGetter: params => {
            if (this.pageAll) {
              var p_n = this.pageAll.pageInfo.pageCurrent;
              var p_l = this.pageAll.pageInfo.pageSize;
              var num = (p_n - 1) * p_l + params.node.rowIndex;
              return num + 1;
            } else {
              return params.node.rowIndex + 1;
            }
          }
        },{
          headerName: '调用方名称',
          width: 200,
          isHide: true,
          field:'apiName',
          cellRenderer(params) {
            return ' '+params.data.authorizationName;
          }
        },{
          headerName: '授权状态',
          width: 100,
          isHide: true,
          field:'status',
          cellRenderer(params) {
            return params.data.isEnable == "1" ? "启用" : "停用";
          }
        },{
          headerName: '操作',
          width: 100,
          isHide: true,
          // pinned: "right",
        },

      ],
      //授权表格按钮
      buttonAllEmpower:[
        {
          type: "primary",
          click: "stopApi",
          publicActionName:"启用停用",//公共行为名称;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
          changeName(params) {return params.isEnable=="1" ? '禁用':'启用'}
        },
        {
          type: "error",
          click: "delete",
          name: "删除",
          publicActionName:"按钮修改",//公共行为名称;
          title: "修改该接口",//鼠标移入显示的文字;
          buttonCode:"update",//按钮行为标识(用于按钮权限控制);
          // idKey:"fileId", //唯一值的键;
        },
      ],
      //接口关联数据库表格
      tableDataApiWithDatabase:[
      ],
      //接口关联数据库配置
      tableColumnsApiWithDatabase: [
        {
          headerName: '序号',
          Width: 70,
          isHide: true,
          valueGetter: params => {
            if (this.pageAll) {
              var p_n = this.pageAll.pageInfo.pageCurrent;
              var p_l = this.pageAll.pageInfo.pageSize;
              var num = (p_n - 1) * p_l + params.node.rowIndex;
              return num + 1;
            } else {
              return params.node.rowIndex + 1;
            }
          }
        },{
          headerName: '数据库用户-表',
          Width: 70,
          isHide: true,
          field:'databaseUser-table',
          cellRenderer(params) {
            return ' '+params.data.databaseUserTable;
          }
        }
      ],
      //关联接口表格数据
      tableDataDatabase:[
      ],
      //关联接口表格配置
      tableColumnsDatabase: [
        {
          headerName: '序号',
          Width: 70,
          isHide: true,
          valueGetter: params => {
            if (this.pageAll) {
              var p_n = this.pageAll.pageInfo.pageCurrent;
              var p_l = this.pageAll.pageInfo.pageSize;
              var num = (p_n - 1) * p_l + params.node.rowIndex;
              return num + 1;
            } else {
              return params.node.rowIndex + 1;
            }
          }
        },{
          headerName: '接口名称2',
          Width: 70,
          isHide: true,
          field:'apiName',
          cellRenderer(params) {
            return ' '+params.data.apiName;
          }
        },{
          headerName: 'url',
          Width: 70,
          isHide: true,
          field:'url',
          cellRenderer(params) {
            return ' '+params.data.url;
          }
        }
      ],
      //接口关联调用表格
      tableDataApiWithEmpower:[
      ],
      //接口关联调用配置
      tableColumnsApiWithEmpower: [
        {
          headerName: '序号',
          Width: 70,
          isHide: true,
          valueGetter: params => {
            if (this.pageAll) {
              var p_n = this.pageAll.pageInfo.pageCurrent;
              var p_l = this.pageAll.pageInfo.pageSize;
              var num = (p_n - 1) * p_l + params.node.rowIndex;
              return num + 1;
            } else {
              return params.node.rowIndex + 1;
            }
          }
        },{
          headerName: '调用第三方接口',
          Width: 70,
          isHide: true,
          field:'thirdApi',
          cellRenderer(params) {
            return ' '+params.data.thirdApi;
          }
        }
      ],
      //停用弹窗
      fromModelAllStop:{
        type: "2",
        isShow: false,
        title:"接口状态",
        fromData:[
          {
            type: "radio",
            label: "接口状态",
            key: "apiStatus",
            radioArr: [
              {
                val: 1,
                text: "开发中"
              },
              {
                val: 2,
                text: "测试中"
              },
              {
                val: 3,
                text: "已上线"
              },
              {
                val: 4,
                text: "已废弃"
              },
            ],
          }
        ],
        menuForm: {apiStatus: ""}
      },
      //删除弹窗
      popAllDelete:{
        info:'',
        vTxt: "删除",//弹窗动态，如:删除、审核、启用、停用...;
        nTxt: '',//当前选中信息;
        type: "1", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false,//弹窗显示控制;
      },
      //授权弹窗
      popAllEmpower: {
        type: "2", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false,
        title: '授权情况',
        loading: false,
        isHideKeep:true //关闭按钮是否隐藏 默认为false显示 可不写;
      },
      //新增授权弹窗
      popAllInEmpower: {
        type: "2", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false,
        title: '新增授权',
        // isHideKeep:false //关闭按钮是否隐藏 默认为false显示 可不写;
      },
      //停用、启用授权弹窗
      popAllStopEmpower:{
        vTxt: "",//弹窗动态，如:删除、审核、启用、停用...;
        nTxt: '',//当前选中信息;
        type: "1", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false,//弹窗显示控制;
      },
      //调试弹窗
      fromModelAllDebug:{
        fromType:"4",
        isShow: false,
        title: "接口调试",
        modelWidth: 1000,
        // isHideClose: true,
        isHideKeep: true,
        fromData:[
          {
            lenged: "接口相关信息",
            fieldset: [
              {
                type: "input",
                fromType: "text",
                label: "接口名称",
                key: "apiName",
                disabled: true,
                col: 6
              },
              {
                type: "input",
                fromType: "text",
                label: "授权码",
                key: "authkey",
                disabled: false,
                col: 9
              },
              {
                type: "input",
                fromType: "text",
                label: "授权密码",
                key: "authPwd",
                disabled: false,
                col: 9
              },
              {
                type: "input",
                fromType: "text",
                label: "接口地址",
                key: "interfaceUrl",
                disabled: false,
                col: 16
              },
              {
                type: "input",
                fromType: "text",
                label: "加密方式",
                key: "encryption",
                disabled: false,
                col: 8
              }
            ]
          },
          {
            langed: "接口调试信息",
            fieldset: [
              {slotName: "left",
                col: 9},
              {
                slotName: "center",
                col: 6
              },
              {slotName: "right",
                col: 9},
            ]
          }
        ],
        menuForm: {
          apiName:"",
          authkey:"",
          authPwd:"",
          interfaceUrl:"",
          encryption:""
        }
      },
      //新增授权弹窗
      fromModelAllEmpower:{
        fromType:"2",
        isShow: false,
        title: "新增授权",
        modelWidth: 400,
        labelWidth: 100,
        isHideClose: true,
        isHideKeep: false,
        otherButton: [//底部其他按钮配置;
        {
        title: "关闭",
        click(item) {
          self.formclose();
        },
        }],
        fromData:[
          {
            type: "select",
            label: "调用方授权id",
            placeholder: "请输入调用方授权id",
            selectArr:[],
            key: "addEmpowerCaller",
            message: "不能为空!"
          },
          {
            type: "select",
            label: "加密方式",
            placeholder: "请选择加密方式",
            key: "encryption",
            selectArr: [{ val: "AES", text: "AES" }, { val: "AES2", text: "AES2" }, { val: "NONE", text: "NONE" }],
            message: "不能为空!"
          },
          {
            type: "input",
            label: "允许访问的车辆",
            placeholder: "请输入允许访问的车辆",
            key: "vins",
            selectArr: [{ val: "AES", text: "AES" }, { val: "AES2", text: "AES2" }, { val: "NONE", text: "NONE" }],
          },
          {
            type: "input",
            label: "允许访问的IP",
            placeholder: "请输入允许访问的IP",
            key: "ips",
            selectArr: [{ val: "AES", text: "AES" }, { val: "AES2", text: "AES2" }, { val: "NONE", text: "NONE" }],
          },
        ],
        menuForm: {
          addEmpowerCaller: "",
          encryption: "",
          vins: "",
          ips: ""
        }
      },
      //详细情况弹窗
      popAllInformation:{
        type: "2", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        width: 900,
        isPopModel: false,
        isHideKeep: true,
        title: '授权情况',
        loading: false,
        // isHideKeep:false //关闭按钮是否隐藏 默认为false显示 可不写;
      },
      //数据库关联弹窗
      popAllDatabase:{
        type: "2", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false,
        title: '关联接口',
        // isHideKeep:false //关闭按钮是否隐藏 默认为false显示 可不写;
      }
    }
  },
}
