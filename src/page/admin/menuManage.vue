<template>
  <menuManage></menuManage>
</template>

<script>
import { adminMixin } from "./mixin/adminMixin";
// import buttonData from "@/assets/json/button.json";
export default {
  name: "admin_menu",
  mixins: [adminMixin],
  data() {
    return {};
  },
  created() {
    /*当前项目常用按钮配置---按钮权限管理  start*/
    /* this.$nextTick(() => {
      this.$Bus.$emit("getNowItemButtonData", buttonData);
    }); */
    /*==当前项目常用按钮配置---按钮权限管理  end==*/
  }
};
</script>