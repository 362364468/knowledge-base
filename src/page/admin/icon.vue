<template>
  <div>
    <commonIcon></commonIcon>

  </div>

</template>

<script>
import { adminMixin } from "./mixin/adminMixin";
export default {
  name: "admin_icon",
  mixins: [adminMixin],
  data() {
    return {
      //  	currentTabComponent:componentName
    };
  }
  //beforeRouteEnter (to, from, next) {},
};
</script>