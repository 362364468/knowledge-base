<template>
  <div class="content-header">
    <!-- logo -->
    <!-- Sgmw车辆监控数据实时预警平台 -->
    <!-- <div class="logo">
      <img class="fl" :src="outlayData.logo" alt />
      <span v-if="!add">{{outlayData.demoTitle?outlayData.demoTitle:outlayData.title}}</span>
      <p class="clear"></p>
    </div> -->
    <!-- 侧导航操作按钮 -->
    <Icon
      @click.native="collapsedSider"
      :class="{'rotateIcon':true,'add':add}"
      type="md-menu"
      :size="30"
    ></Icon>
    <!-- 面包屑导航 -->
    <Breadcrumb>
      <BreadcrumbItem @click.native="jumpHome" class="crumb_home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem v-for="item in matched" :key="item.id">
        <Icon :type="item.icon"></Icon>
        {{item.title}}
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 右侧 -->
    <div class="header_right">
      <!-- 自定义主题色模块 -->
      <customTheme v-if="isShowCustomTtheme" ref="customTheme"></customTheme>
      <!-- 全屏组件 -->
      <fullScreen v-model="isFullscreen"></fullScreen>
      <Badge :count="logoNum" :overflow-count="99" v-if="!isShowSystemMaintenance">
        <Icon type="ios-notifications-outline" @click.native="help" class="cursor" size="26"></Icon>
      </Badge>

      <Dropdown class="header_user">
        <a href="javascript:void(0)">
          <Avatar :src="nowIcon" />
          <span :title="userInforList.userName" class="header_user_name">{{userInforList.userName}}</span>
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="InformationAll.isShow=true;getUsersData()">个人信息</DropdownItem>
          <DropdownItem @click.native="fromModelAll.isShow=true">修改密码</DropdownItem>
          <DropdownItem @click.native="Cancellation">注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!-- 个人信息弹窗 -->
      <Information :InformationAll="InformationAll" :actionId="personalSettingsId" @addSubmit="addSubmit"></Information>
      <!-- 修改密码弹窗 -->
      <formModel ref="formChild" :fromModelAlls="fromModelAll" @formKeep="formKeep"></formModel>
      <!-- 注销弹窗 -->
      <popModel :popAll="popAll" @confirm="confirm"></popModel>

    </div>
    <!-- 右侧帮助抽屉 模块-->
    <help ref="help" :logoNum="logoNum" @drawerClose="drawerClose"></help>

    <p class="clear"></p>
    <!-- 自定义提示信息 -->
    <customMessage @updatePW="fromModelAll.isShow=true"></customMessage>

  </div>
</template>
<script>
import "@/../static/js/config";
import fullScreen from "./fullscreen";
// import updatePass from "./children/updatePass";
let icon = "data:image/jpeg;base64,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"
import Information from "./children/Information";
//自定义主题色组件
import customTheme from "./children/customTheme";
import help from "./children/help";
import { navHeaderMixins } from "./mixins";
import customMessage from "./children/customMessage";
import {clientAjaxReq} from "../../util/axios";

export default {
  mixins: [navHeaderMixins],
  data() {
    return {
      personalSettingsId:"",
      logoNum: 0, //徽标数logoNum: 0, //徽标数
      // isHeaderChange: false, //是否显示表头修改
      // percent: 0, //下载进度
      outlayData: outlayData, //获取配置文件信息
      versionControl: versionControl, //获取模块配置信息
      isShowSystemMaintenance: versionControl
        ? versionControl.isShowSystemMaintenance
        : false, //是否显示系统 维护/帮助 模块
      isShowCustomTtheme: versionControl
        ? versionControl.isShowCustomTtheme
        : false, //是否显示项目主题色切换模块
      menuList: [], //菜单数据列表
      cancelModal: false,
      isUpdatePassModel: false,
      isFullscreen: false,
      add: false,
      offon: false,
      nowIcon: icon,
      isInfoModel: false,
      matched: [],
      userInforList: {},
      InformationAll: {
        //个人信息配置
        isShow: false,
        formObj: {}
      }
    };
  },
  components: {
    fullScreen,
    customMessage,
    Information,
    customTheme,
    help
  },
  methods: {
    //首页跳转事件
    jumpHome(item) {
      if (this.$route.path != "/home") {
        this.$router.push("/home");
      }
      this.$store.commit('changeMenu',item)
    },
    //右侧抽屉关闭事件
    drawerClose(num) {
      this.logoNum = num;
    },
    //帮助按钮点击事件
    help() {
      // console.log(123)
      this.$refs.help.isDrawer = true;
    },
    //个人信息修改保存事件
    addSubmit() {
      this.getUsersData();
    },
    //获取面包屑导航信息
    getMatched() {
      let menuArray = JSON.parse(sessionStorage.getItem("menuList"));
      let id;
      this.$recursion(menuArray, "childNodes", item => {
        if (item.name == JSON.parse(sessionStorage.getItem("selectedMenu")).name) {
          id = item.id;
        }
      });
      if (id) {
        this.matched = this.$backRecursion(menuArray, "childNodes", "id", id);
      } else {
        this.matched = [];
      }
    },
    //获取管理员信息列表
    getUsersData(states) {
      let reqData = {
        userId: sessionStorage.getItem("userId"),
      };
      let sendData = this.$sendData({
        actionId: this.personalSettingsId,
        actionName: "个人信息查询",
        callerName:"个人设置",
        reqData:reqData
      });

      let params = sessionStorage.getItem("actionId")
      this.userInforList.userName = sessionStorage.getItem('userName')

      //this.getJXS(params)
      // return;
     /* this.$serverAjaxReq(
        "/user/selectUserDataById",
        sendData,
        (state, rspMsg, rspData) => {
          if (state == "FAIL") {
            this.$Message.error("查询异常！");
          }
          if (state == "ERROR") {
            this.$Message.error(rspMsg);
          }
          if (state == "SUCCESS") {
            this.userInforList = rspData;
            if (this.userInforList.icon) {
              this.nowIcon = this.userInforList.icon;
            }
            this.InformationAll.formObj = rspData;
          }
        },
        this.$router,
        this.$Message,
        this
      );*/
    },
    // 注销确认事件
    // cancelUser() {
    //   this.$router.push("/");
    //   sessionStorage.clear();
    // },
    collapsedSider() {
      this.$emit("collapsedSider");
      this.$Bus.$emit("getTableWidth", this.add);
      this.add = !this.add;
    },
    close() {}
  },
  watch: {
    /* $route(to, from) {
      this.getMatched();
    }, */
    '$store.state.changeMenu'() {
      this.getMatched();
    }
  },
  mounted() {
    //顶部个人设置模块初始化
    this.personalSettingsId=this.$UUID();
    this.getUsersData();
    if (sessionStorage.getItem("menuList")) {
      this.getMatched();
    }

  },

};
</script>


<style  lang="less">
.rotateIcon {
  transform: rotate(0);
  transition: all 0.2s ease;
}
.rotateIcon.add {
  transform: rotate(-90deg);
  transition: all 0.2s ease;
}
i.cursor {
  cursor: pointer;
  color: white;
}
.ivu-layout-header {
  .content-header {
    background-color: #009688;
  }
  .logo {
    min-width: 34px;
    span {
      display: inline-block;
      min-width: 165px;
    }
  }
  div {
    .ivu-icon-md-menu {
      margin-left: 10px;
    }
  }
}
.header_right {
  display: flex !important;
  align-items: center;
  .ivu-badge-count {
    top: 0;
    right: 6px;
    padding: 0;
    box-shadow: none;
  }
  a {
    display: flex;
    align-items: center;
  }
  .header_user_name {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.app_text {
  // position: fixed;
  // top:15px;
  // right: 200px;
  display: inline-block;
  position: relative;
  height: 20px;
  background: red;
  color: white;
  cursor: pointer;
  margin-right: 8px;
  line-height: 20px;
  vertical-align: middle;
}
.crumb_home {
  cursor: pointer;
}

</style>
