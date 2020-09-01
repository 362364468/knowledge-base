<template>
  <div class="demoTest_select">
    <!-- 主题切换 -->
    <Select v-model="demoTest" class="selectTheme" size="small" style="width:80px">
      <Option
        v-for="(item,index) in testData"
        :class="'demo'+item.value"
        :key="index"
        :value="item.value"
        @click.native="changeTest(item)"
      >{{ item.label }}</Option>
    </Select>
    <!-- <input id="iptTheme" type="color" :value="value" v-show="offon" @change="change" /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      demoTest: "theme", //项目主题选择
      value: "",
      themeItem: {},
      offon: false,
      //主题配置数据
      testData: [
        {
          value: "theme",
          label: "默认蓝"
        },
        {
          value: "themeA",
          label: "星空黑"
        },
        {
          value: "themeB",
          label: "科幻蓝"
        },
        {
          value: "themeC",
          label: "天空蓝"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    //组题选择事件
    changeTest(item) {
       $("body").removeClass().addClass(item.value);
    },
    //背景主题色自定义选择事件
    customChangeTest() {
      this.iptClick();
    },
    //触发input点击事件
    iptClick() {
      $("#iptTheme").click();
    }
  },
  watch: {
  }
};
</script>
<style>
.demoTest_select {
  display: inline;
}
</style>