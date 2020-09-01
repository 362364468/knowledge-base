<template>
  <user :addClums="addClums" :isRowDownNews="isRowDownNews"></user>
</template>

<script>
import { adminMixin } from "./mixin/adminMixin";
export default {
  name: "admin_user",
  mixins: [adminMixin,],
  data() {
    return {
      addClums: [//新增表格字段
        
	  ],
	  isRowDownNews:true,//表格单行点击是否获取最新数据
    };
  },
  mounted(){
	  // let regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    //   let a=regex.test('1015246390@qq.com')
	  // console.log(a)
	  
  }
};

</script>
