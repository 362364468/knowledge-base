<template>
    <div>
       <landingLog></landingLog> 
    </div>
</template>
<script>
  import { adminMixin } from './mixin/adminMixin'
  export default {
    name: "admin_landingLog",
    mixins: [adminMixin],
    data() {
      return {};
    },
  };
</script>
