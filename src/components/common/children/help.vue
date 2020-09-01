<template>
  <Drawer width="400" class="helpRight" @on-close="close" :closable="true" v-model="isDrawer">
    <div class="top_yq" v-show="helplogoNum">{{helplogoNum}}</div>
    <Tabs @on-click="tabClick">
      <TabPane label="系统维护" icon="ios-construct-outline" name="name1">
        <Timeline class="notice_box">
          <TimelineItem v-for="(item,index) in TimelineItemData" :key="index">
            <p class="time">{{item.xtgxsj}}</p>
            <p class="content">{{item.xtgxnr}}</p>
          </TimelineItem>
        </Timeline>
      </TabPane>
      <TabPane label="帮助文档" icon="ios-help-buoy" name="name2">
        <ul class="help_list">
          <li v-for="(item,index) in helpData" :key="index">
            <a :href="item.href" target="_blank">{{item.txt}}</a>
            <a :href="item.href" :download="item.txt+'.pdf'">
              <Icon type="md-download" />
            </a>
          </li>
        </ul>
      </TabPane>
    </Tabs>
  </Drawer>
</template>
<script>
/*import helpData from "@/../static/json/helpDocument.json";*/
export default {
  props: ["logoNum"],
  data() {
    return {
      isDrawer: false,
      helplogoNum: 0, //下载文档汇报数
      TimelineItemData: [],
      helpData: 'helpData',
      noticeId:"",//通知模块id
    };
  },
  methods: {
    //获取维护数据

    getTableData() {
      let reqData = {
        pageCurrent: 1,
        pageSize: 100000,
        xtgxsjend: "",
        xtgxsjbegin: ""
      };
      let sendData = this.$sendData({
        actionId: this.noticeId,
        actionName: "维护记录查询",
        callerName: "通知",
        reqData: reqData
      });
      this.$serverAjaxReq(
        "/systemUpdate/selectXtgxDataByCondition",
        sendData,
        (state, rspMsg, rspData) => {
          this.loading = false;
          if (state == "FAIL") {
            this.$Message.error("查询失败！");
            return;
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
            return;
          }
          if (state == "SUCCESS") {
            this.TimelineItemData = rspData.list;
            // console.log( this.TimelineItemData )
          }
        },
        this.$router,
        this.$Message,
        this
      );
    },
    //tabs切换事件
    tabClick(name) {
      if (name == "name2") {
        this.helplogoNum = null;
        this.$emit("drawerClose", null);
      }
    },
    //抽屉关闭事件
    close() {
      //  let num=this.helplogoNum
      //  this.$emit('drawerClose',num)
    }
  },
  mounted() {
    this.noticeId=this.$UUID()
  },
  watch: {
    isDrawer(val) {
      if (val) {
        this.getTableData();
        this.$emit("drawerClose", this.helplogoNum);
      }
    }
  }
};
</script>
<style lang="less">
.helpRight .ivu-drawer-content {
  position: relative;
  .top_yq {
    position: absolute;
    left: 240px;
    top: 14px;
    min-width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ed4014;
    color: white;
    text-align: center;
    line-height: 20px;
  }
}

.notice_box {
  padding: 10px;
  max-height: ~"calc(100vh - 100px)";
  // max-height:100%;
  overflow: auto;
  .ivu-timeline-item {
    padding-bottom: 5px;
    .ivu-timeline-item-tail,
    .ivu-timeline-item-head {
      margin-top: 3px;
    }
    .ivu-timeline-item-content {
      padding-bottom: 5px;
      p.time {
        line-height: 25px;
        font-size: 15px;
        color: #2d8cf0;
      }
      p.content {
        line-height: 24px;
        font-size: 14px;
      }
    }
  }
}
.help_list {
  li {
    font-size: 14px;
    padding: 8px;
  }
  li:hover {
    color: #222222;
  }
  .ivu-icon {
    font-size: 18px;
    margin-left: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>