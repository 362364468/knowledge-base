<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer>
        <!-- <Button size="small" type="text"> -->
        <Icon :size="18" type="ios-close-circle-outline" />
        <!-- </Button> -->
        <DropdownMenu slot="list">
          <DropdownItem name="close-all" @click.native="handleCloseWhole('all')">关闭所有</DropdownItem>
          <DropdownItem name="close-others" @click.native="handleCloseWhole()">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="btn-con left-btn" @click="handleScroll(240)">
      <!-- <Button type="text"> -->
      <Icon :size="18" type="ios-arrow-back" />
      <!-- </Button> -->
    </div>
    <div class="btn-con right-btn" @click="handleScroll(-240)">
      <!-- <Button type="text"> -->
      <Icon :size="18" type="ios-arrow-forward" />
      <!-- </Button> -->
    </div>
    <div class="scroll-outer" ref="scrollOuter">
      <div
        ref="scrollBody"
        class="scroll-body"
        :style="{'left':tagBodyLeft+'px'}"
        @DOMMouseScroll="handlescroll"
        @mousewheel="handlescroll"
      >
        <!-- $router.push('/main') -->
        <Tag
          type="dot"
          closable
          :color="'/home'==$route.path?'primary':'border'"
          @click.native="handleBtn('main')"
        >首页</Tag>
        <Tag
          type="dot"
          closable
          :color="item.name===$store.state.changeMenu?'primary':'border'"
          v-for="item in $store.state.tagMenuList"
          :title="item.title"
          :key="item.name"
          :class="item.name"
          @on-close="handleClose(item)"
          @click.native="handleBtn(item)"
        >{{item.title}}</Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tagMenu"],
  data() {
    return {
      // path: "",
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      selectedMenu: {}
    };
  },
  mounted() {
    let str = sessionStorage.getItem('tagMenuList')
    if(str!==undefined) {
      this.$store.commit('changeTagMenu',JSON.parse(sessionStorage.getItem('tagMenuList')))
    }
  },
  computed: {

  },
  methods: {

    // tag点击事件
    handleBtn(item) {
      if (item == "main") {
         sessionStorage.setItem("callerName","登录")
        if (this.$route.path!= "/home") {
          this.$router.push("/home");
        }
        this.$store.commit('changeMenu',item)
      } else {
        sessionStorage.setItem("menuActionId", this.$UUID());
        sessionStorage.setItem("callerName",item.menuName)
        this.$store.commit('changeMenu',item)
        if (item.to != this.$route.path) {
          this.$router.push(item.to);
        }
      }
      this.$store.commit('changeClick')
    },
    // tag删除事件
    handleClose(obj) {
      let arr = JSON.parse(sessionStorage.getItem("tagMenuList"));
      let selectedMenu = JSON.parse(sessionStorage.getItem("selectedMenu"));
      let newArr = []
      arr.forEach(item => {
        if(item.name!==obj.name) {
          newArr.push(item)
        }
      });
      let m = 0
      newArr.forEach(item => {
        if(item.name === selectedMenu.name) {
          m = 1
          this.$router.push(item.to);
        }
      })
      if(m ===0) {
        this.$store.commit('changeMenu',undefined);
        this.$router.push("/home");
      }
      this.$store.commit('changeTagMenu',newArr)
    },
    // tag删除全部或删除除本页外其他事件
    handleCloseWhole(all) {
      if (all || this.$route.path === "/home") {
        this.$emit("getTagMenu", []);
        if(all) {
          this.$router.push("/home");
        }
        sessionStorage.setItem("push", "");
        this.$store.commit('changeTagMenu',[])
        this.$store.commit('changeMenu','')
      } else {
        let selectedMenu = JSON.parse(sessionStorage.getItem('selectedMenu'))
        this.$store.commit('changeTagMenu',[selectedMenu])
      }
      this.tagBodyLeft = 0;
    },
    //tag 鼠标滚动事件
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    //  tag 左右按钮点击事件
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth; //wrap宽
      const bodyWidth = this.$refs.scrollBody.offsetWidth; //content宽
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    }
  }
};
</script>
