<template>
  <Card class='query-list'>
    <div class="query-model">
      <queryModel ref="queryChild" :whereAll="whereAll" @query="query">
      </queryModel>
    </div>

    <popModel :popAll="popAll_ty">
      <!--  接口表格  -->
      <agTable class='search-list' :tableData="tableData" :tableColumns="tableColumns" :height="tableH - 153" :width="tableW"
        :rowHeight="40" :pageAll="pageAll" :headerHeight="44" @getTablePage="getTableList" @rowClicked="rowClicked">
      </agTable>
    </popModel>
  </Card>
</template>

<script>
  import {
    pageMixin
  } from "@/util/mixin";
  import {
    clientAjaxReq,
    createParameter,
  } from "../../util/axios";
  export default {
    name: "mainQuery",
    mixins: [pageMixin],
    data() {
      return {
        queryKey: '',
        menuList: [],
        whereAll: {
          isReset: true, //是否显示重置按钮;
          msg: "必填项不能为空", //表单报错提示信息;
          size: "commonly",
          data: [{
              type: "input",
              formType: "text",
              placeholder: "请输入接口名称或Url关键字",
              key: "keyWords",
              width: "250",
            },
            {
              type: "select", //下拉选择框 select;
              placeholder: "接口状态",
              key: "cellOffOn",
              width: "120",
              arr: [{
                  objVal: 1,
                  text: "开发中"
                },
                {
                  objVal: 2,
                  text: "测试中"
                },
                {
                  objVal: 3,
                  text: "已上线"
                },
                {
                  objVal: 4,
                  text: "已废弃"
                }
              ] //下拉菜单数据;
            }
          ],
          whereFrom: {
            keyWords: "",
            cellOffOn: ""
          },
          whereRuleValidate: {}
        },
        tableData: [], //表格数据;
        tableColumns: [ //表格列配置;
          {
            headerName: "序号",
            width: 50,
            pinned: "left",
            cellClass: "col_center",
            valueGetter: params => {
              var p_n = this.pageAll.pageInfo.pageCurrent;
              var p_l = this.pageAll.pageInfo.pageSize;
              var num = (p_n - 1) * p_l + params.node.rowIndex;
              return num + 1;
            },
            isHide: true
          },
          {
            headerName: "接口名称",
            width: 158,
            cellClass: "col_center",
            field: "interfacename",
          },
          {
            headerName: "接口地址",
            width: 190,
            field: "privateNetTestUrl",
            col: 12
          },
          {
            headerName: "项目地址",
            width: 180,
            cellClass: 'col_center',
            field: "projectName"
          },
          {
            headerName: "接口描述",
            width: 180,
            field: "interfaceDesc"
          },

        ],
        pageAll: {
          pageInfo: {
            total: 1, //总页数
            pageCurrent: 1, //当前页-页码
            pageSize: 10, //当前页显示数据条数
            lastPage: 1 //最大页码
          }
        },
        popAll_ty: {
          type: "2", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
          isPopModel: false,
          title: '搜索结果',
          isHideKeep: true,
          width: 700

        }
      }
    },
    created() {
      this.menuList = JSON.parse(sessionStorage.getItem("menuList"))
    },
    methods: {
      query(val) {
        if (!val.keyWords.trim() && !val.cellOffOn) {
          return this.$Message.error("查询条件不能为空！");
        }
        this.popAll_ty.isPopModel = true
        this.queryKey = val
        this.getTableList()
      },
      // 获取搜索数据
      getTableList() {
        let params = {}
        params.pageCurrent = this.pageAll.pageInfo.pageCurrent
        params.pageSize = this.pageAll.pageInfo.pageSize
        if (this.queryKey.keyWords.trim()) {
          params.requestParams = this.queryKey.keyWords
        } else {
          params.status = this.queryKey.cellOffOn
        }
        clientAjaxReq('/interface/queryInterfaceListByParams', params, (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("查询失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.tableData = rspData.list
            this.pageAll.pageInfo.total = rspData.paginator.totalRecords;
            this.pageAll.pageInfo.lastPage = rspData.paginator.lastPage;
          }
        })
      },
      // 表格栏单击事件
      rowClicked(obj) {
        //console.log(obj.data)
        //obj.data.id = obj.data.directorySecondId
        //let arr1 = this.a(this.menuList)
        this.$recursion(this.menuList,'childNodes', item => {
          if(item.childCategoryId == obj.data.directorySecondId) {
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
        })
        /* this.$store.commit('changeMenu', obj.data)
        this.$router.push('/classification') */
        this.popAll_ty.isPopModel = false
      },

    }
  }
</script>

<style scoped>
  .query-list {
    position: relative;
    margin-bottom: 16px;
    border-radius: 5px;
    padding: 3px 0 4px;
  }

</style>
