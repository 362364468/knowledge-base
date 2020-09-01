<template>
  <div>
    <mainQuery></mainQuery>
    <div class="home-content">
      <div class="content-item" v-for="(item, index) in project" :key="index">
        <Icon custom="iconfont icon02" class="item-icon" @click="updataProject(item)" size="50" />
        <span>{{ item.categoryName }}</span>
        <span>该项目包下含有{{ item.childNodes.length }}个分类</span>
      </div>

      <div class="content-item">
        <Icon type="ios-add" class="item-icon" @click="addProject" size="80" />
        <span>添加项目包</span>
      </div>
      <!--新增、修改-->
      <formModel ref="formChild" :fromModelAlls="fromModelAll" @formKeep="formKeep"></formModel>
      <!-- 删除弹窗 -->
      <popModel :popAll="popAll" @confirm="confirm"></popModel>
    </div>

  </div>
</template>

<script>
  import { clientAjaxReq } from '@/util/axios.js'
  import { homeMixins } from './index.js'
  import mainQuery from "../../components/common/mainQuery";
  import $ from 'jquery';
  import 'jquery-ui/themes/base/draggable.css'; //此css不引入也不影响draggable 功能
  import 'jquery-ui/ui/widgets/draggable';
  export default {
    name: "index",
    components: {
      mainQuery
    },
    mixins: [homeMixins],

    created() {
      this.project = this.$store.state.routerData[0]
      //设置拖拽
      $(function() {
        $(".ivu-modal").draggable({
           handle:".ivu-modal-header,.form-btn",
        });
      });
    },
    watch: {
      '$store.state.routerData': {
        deep: true,
        handler () {
          this.project = this.$store.state.routerData[0]
        }
      }
    },
    methods: {
      // 弹窗保存事件
      formKeep(obj) {
        let params = obj
        params.parentCateName = '#'
        params.parentCateId = '#'
        if (this.fromModelAll.categoryId === null) {
          params.categoryId = null
        } else {
          params.categoryId = this.fromModelAll.categoryId
        }
        this.fromModelAll.loading = true
        clientAjaxReq('/interface/addOrModifyCategory', params, (state, rspMsg, rspData) => {
          this.fromModelAll.loading = false
          if (state == "FAIL") {
            this.$Message.error("保存失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.$Message.success("保存成功");
            this.$refs.formChild.close()
            //this.getTableList()
            this.$store.commit('changeFlag', Math.random())
          }
        })
      },
      // 修改项目包
      updataProject(obj) {
        this.fromModelAll.isShow = true
        this.fromModelAll.title = '修改项目包'
        this.fromModelAll.menuForm.categoryName = obj.categoryName
        this.fromModelAll.menuForm.categoryDesc = obj.categoryDesc
        this.fromModelAll.categoryId = obj.categoryId
        if(obj.childNodes.length) {
          this.fromModelAll.otherButton[0].disabled = true
        } else {
          this.fromModelAll.otherButton[0].disabled = false
        }
      },
      // 新增项目包
      addProject() {
        this.fromModelAll.isShow = true
        this.fromModelAll.categoryId = null
        this.fromModelAll.title = '添加项目包'
        this.fromModelAll.otherButton[0].disabled = true
      },
      // 删除弹窗保存按钮
      confirm() {
        let params = {}
        params.deleteCategory = this.fromModelAll.categoryId
        clientAjaxReq('/interface/deleteCategory', params, (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("保存失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.$Message.success("删除成功");
            this.$refs.formChild.close()
            this.popAll.isPopModel = false
            this.$store.commit('changeFlag', Math.random())
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .home-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;

    .content-item {
      display: flex;
      width: 175px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 16px;

      .item-icon {
        width: 80px;
        height: 80px;
        line-height: 80px;
        background-color: #ddd;
        border-radius: 50%;
        margin-bottom: 8px;
        cursor: pointer;
        color: dodgerblue;
      }

      span {
        font-size: 15px;
      }
    }
  }
</style>
