<template>
  <Layout class="main page-container">
    <Layout>
      <Sider
        ref="side1"
        width="240"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <!-- 菜单导航 -->
        <div class="logo">
          <img class="fl" :src="outlayData.logo" alt />
          <span v-show="slideShow">{{outlayData.demoTitle?outlayData.demoTitle:outlayData.title}}</span>
          <p class="clear"></p>
        </div>
        <slide-menu
          @getTagMenu="getTagMenu"
          :tagMenu="tagMenu"
          :slideShow="slideShow"
          :menuType="menuType"
        ></slide-menu>
        <!-- <slideMenuCase></slideMenuCase> -->
      </Sider>

      <Content>
        <Header>
          <nav-header @collapsedSider="collapsedSider"></nav-header>
        </Header>
        <tags-nav :tagMenu="tagMenu" @getTagMenu="getTagMenu"></tags-nav>
        <div class="content-wrapper">
          <keep-alive :include="keepAliveRouter">
            <router-view />
          </keep-alive>
        </div>
      </Content>
      <errorModel :errorAll="errorAll"></errorModel>
    </Layout>
  </Layout>
</template>

<script>

  import "@/../static/js/config";
  import slideMenu from "./common/slide-menu";
  import navHeader from "./common/nav-header";
  import tagsNav from "./common/tags-nav";
  export default {
    props: ["menuType"],
    data() {
      return {
        outlayData:outlayData,
        isCollapsed: false,
        slideShow: true,
        keepAliveRouter: [],
        tagMenu: [],
        errorAll: {
          //内部错误弹窗控制
          isShow: false, //显示控制
          txt: "123" //文本控制
        }
      };
    },
    components: {
      slideMenu,
      navHeader,
      tagsNav,
      //caseContent
      // slideMenuCase
    },
    methods: {
      collapsedSider() {
        this.$refs.side1.toggleCollapse();
        this.slideShow = !this.slideShow;
      },
      // tagMenu 值直接改变事件
      getTagMenu(data) {
        this.tagMenu = data;
      }
    },
    created() {},
    mounted() {
      //触发屏幕变化事件

      this.$Bus.$on("changeErroeAll", txt => {
        this.errorAll.isShow = true;
        this.errorAll.txt = txt;
      });
    },
    watch: {
      $route() {
        let str = sessionStorage.getItem("keepName");
        if (str) {
          this.keepAliveRouter = JSON.parse(str);
        } else {
          this.keepAliveRouter = [];
        }
      }
    }

  };
</script>

<style lang="less" scoped>

  .menu-icon {
    transition: all 0.5s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
</style>



