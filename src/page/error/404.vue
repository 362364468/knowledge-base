<template>
  <div class="errinfo">
    <i class="iconfont">&#xe62f;</i>
    <p>页面不存在</p>
    <div class="btn">
      <i-button
        type="primary"
        @click="returnform">
        返回首页
      </i-button>
    </div>
  </div>
</template>
<script>
  export default{
    methods:{
      returnform(){
        this.$router.push('/home')
      }
    }
  }
</script>
<style scoped>
  p{
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
  }
  .errinfo{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
  }
  .btn{
    position: relative;
    left: 50%;
    margin-left:-40px;
  }
</style>
