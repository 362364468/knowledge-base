<template>
  <div class="btnRegion">
    <div class="left">
      <i-button type="default" class="showbd"
        v-for="(item, i) in handleButtons"
        :icon="` iconfont ${item.btnIcon}`"
        :key="i"
        @click="handleClick(item.methods)"
      >{{ item.btnName }}</i-button>
    </div>

    <div class="right" v-if="showRight">
      <i class="iconshuaxin iconfont" title="刷新"></i>
      <span style="position:relative">
              <i class="iconfont iconliepeizhi" title="筛选列" @click="screenCol"></i>
              <Checkbox-group
                v-show="checkColModel"
                class="screenColTemplate"
                v-model="screenColArr"
                @on-change="checkColChange"
              >
                <Checkbox
                  size="large"
                  v-for="(item,index) in tableColumns"
                  :key="index"
                  v-show="item.field"
                  :label="item.field"
                >{{item.headerName}}</Checkbox>
              </Checkbox-group>
            </span>
      <i class="iconfont iconprint" title="打印" @click="tablePrint"></i>
      <i class="iconfont iconweibiaoti2fuzhi01" title="导出"></i>
    </div>
  </div>

</template>

<script>
  export default {
    name: "tableTool",
    props:['tableColumns', 'handleButtons', 'showRight'],
    data() {
      return {
        screenColArr:[],
        checkColModel:false,
      }
    },
    methods: {
      //筛选列按钮点击事件
      screenCol(){
        this.checkColModel=!this.checkColModel;
        this.screenColArr=[];
        this.tableColumns.forEach(item => {
          if(item.field){
            if(!item.hide){
              this.$set(item, 'hide', false)
              this.screenColArr.push(item.field)
            }else{
              this.$set(item, 'hide', true)
            }
          }else{
            this.$set(item, 'hide', false)
          }
        });
      },
      //列配置变化事件
      checkColChange(data){
        this.tableColumns.forEach(item=>{
          if(item.field==undefined||data.includes(item.field)){
            item.hide=false;
          }else{
            item.hide=true;
          }
        })
      },
      //表格打印
      tablePrint() {
        this.$print(this.$refs.tablePrint);
      },
      // 左边按钮点击
      handleClick(methods) {
        if(methods===undefined) return
        this.$emit("handleButton", methods)
      },


    }
  }
</script>

<style scoped lang="less">
  .showbd {
    margin-right: 8px;
    color: #008779;
    &:focus {
      border-color: #dcdee2;
    }
    &:hover {
      border-color: #008779;
    }
  }

</style>
