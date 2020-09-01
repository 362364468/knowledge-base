<template>
  <div :class="['customMessage',{'active':isShow}]">
    <div class="content">
      <Icon type="ios-alert" />
      <span class="text">
        <span v-html="text"></span>
        <a @click="updatePW">修改密码</a>
      </span>
      <Icon @click="close" type="ios-close" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      text: ""
    };
  },
  mounted() {
    // old:当前密码为初始密码   number:密码到期倒计时时间
    let txt = sessionStorage.getItem("customMessageShow");
    if (txt) {
      if (txt == "success") {
        this.$Message.success("登录成功");
         this.close();
        return false;
      }
    this.info();
      if (txt == "old") {
        this.text = "当前密码仍为初始密码,请记得";
      } else {
        this.text =
          "当前密码还剩<span style='color:red;font-size:16px'> " +
          txt +
          " </span>天到期,请及时";
      }
    } else {
    }
  },
  methods: {
    //模块显示事件
    info() {
      this.isShow = true;
      setTimeout(() => {
        this.close();
      }, 4000);
    },
    //修改密码页面弹出事件
    updatePW() {
      this.$emit("updatePW");
    },
    close() {
      this.isShow = false;
      sessionStorage.setItem("customMessageShow", "");
    }
  }
};
</script>

<style lang="less">
.customMessage {
  width: 100vw;
  position: fixed;
  top: -100px;
  opacity: 0;
  z-index: 100;
  transition: all 0.6s ease-in-out;
  background: transparent;
  text-align: center;
  .content {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    background: #fff;
    position: relative;
    line-height: 24px;
    i {
      display: inline-block;
      vertical-align: middle;
    }
    i:first-child {
      font-size: 18px;
      color: #f90;
    }
    i:last-child {
      font-size: 22px;
      color: #999;
      cursor: pointer;
    }
    i:last-child:hover {
      color: #333333;
    }
    span.text {
      display: inline-block;
      vertical-align: middle;
      padding: 0 32px 0 4px;
      min-width: 100px;
      text-align: left;
      line-height: 22px;
    }
  }
}
.customMessage.active {
  top: 100px;
  opacity: 1;
}
</style>