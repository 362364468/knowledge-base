<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      theme: "themeA"
    };
  },

  created() {
    this.$Message.config({
      top: 100,
      duration: 1.5
    });
  },
};
</script>
<style>
body{
  overflow-y: hidden;
}
</style>
