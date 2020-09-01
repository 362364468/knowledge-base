<template>
  <div>
    <div>
    <!-- 导航信息 -->
    <Menu
      ref="side_menu"
      :accordion="true"
      :active-name="$store.state.changeMenu"
      :open-names="activeFather"
      width="auto"
      :class="menuitemClasses"
      v-show="slideShow"
    >
      <Submenu
        v-for="items in menuList"
        :name="items.name"
        :key="items.name"
        v-show="items.id!='homepage'"
      >
        <template slot="title" v-if="items.childNodes.length>0" >
          <div class="self-menu-submenu-title">
            <Icon :type="items.icon" :size="num" />
            <span v-show="slideShow" @click="menuBtn(items)" class="org"
            >{{items.title}}</span>
          </div>

        </template>
        <template slot="title" v-if="items.childNodes.length<1" :name="items.name">
          <div class="noMenuIcon self-menu-submenu-title">
            <Icon :type="items.icon" :size="num" />
            <span v-show="slideShow" @click="menuBtn(items)" class="org">{{items.title}}</span>
          </div>
        </template>
        <template v-for="item in items.childNodes">
          <MenuItem
            :name="item.name"
            :key="item.name"
            @click.native="menuBtn(item)"
            v-if="item.childNodes.length<1"
          >
            <Icon :type="item.icon" />
            <span>{{item.title}}</span>
          </MenuItem>
          <Submenu :name="item.name" class="my"  :key="item.name" v-else>
            <template slot="title">
              <div class="self-menu-submenu-title1" :class="{'noMenuIconWrap':$store.state.changeMenu==item.name}">
                <Icon :type="item.icon" />
                <!-- 111 -->
                <span v-show="slideShow" class="org"  @click="menuBtn(item)">{{item.title}}</span>
              </div>
            </template>
            <MenuItem
              v-for="inneritem in item.childNodes"
              :name="inneritem.name"
              :key="inneritem.name"
              @click.native="menuBtn(inneritem)"
            >
              <Icon :type="inneritem.icon" />
              <span>{{inneritem.title}}</span>
            </MenuItem>
          </Submenu>
        </template>
      </Submenu>
    </Menu>
    <Dropdown
      v-for="items in menuList"
      :key="items.name"
      v-show="!slideShow&&items.id!='homepage'"
      placement="right-start"
      :class="['slide_drop',{'noChildren':items.childNodes.length<1}]"
    >
      <a href="javascript:void(0)" v-if="items.childNodes.length>=1">
        <Icon :type="items.icon" :size="25" style="color:white"></Icon>
      </a>
      <Icon
        v-if="items.childNodes.length<1"
        @click.native="menuBtn(items)"
        :type="items.icon"
        :size="25"
        style="color:white"
      ></Icon>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="item in items.childNodes"
          :key="item.name"
          @click.native="menuBtn(item)"
          v-if="item.childNodes.length<1"
        >
          <Icon :type="item.icon" />
          <span>{{item.title}}</span>
        </DropdownItem>
        <Dropdown
          placement="right-start"
          v-for="item in items.childNodes"
          :key="item.name"
          v-if="item.childNodes.length>=1"
        >
          <DropdownItem>
            <Icon :type="item.icon" />
            <span>{{item.title}}</span>
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="innerItem in item.childNodes"
              :key="innerItem.name"
              @click.native="menuBtn(innerItem)"
            >
              <Icon :type="innerItem.icon" />
              <span>{{innerItem.title}}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </DropdownMenu>
    </Dropdown>
  </div>
  <div>
    <!-- 加载动画 -->
    <Spin fix v-if="isLoading">
      <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
  </div>
</div>
</template>

<script>
import routerData from "@/../static/json/router.json"
import {serverAjaxReq, clientAjaxReq} from "@/util/axios";
import $ from 'jquery';
export default {
  props: ["menuType", "slideShow", "tagMenu"],
  data() {
    return {
      num: "14",
      data: {},
      activeFather: [],
      menuList: [],
      homeId:"",
      routerData: [],
      isLoading:true,//加载动画
    };
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    // 获取当前选中菜单
    getChooseMenu() {
      let menuArray = JSON.parse(sessionStorage.getItem("menuList"));
      let selectedMenu = JSON.parse(sessionStorage.getItem("selectedMenu"));
      menuArray&&this.$recursion(menuArray, "childNodes", item => {
        if(selectedMenu!== null && item.name === selectedMenu.name) {
          this.$store.commit('changeMenu',item)
        }
      })
      if(selectedMenu!==null) {
        let arr = this.$backRecursion( menuArray, "childNodes", "name",  selectedMenu.name);
        this.activeFather = [];
        arr.forEach(items => {
          this.activeFather.push(items.name);
        });
      }
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      });
    },
    menuBtn(item) {
      sessionStorage.setItem("menuActionId", this.$UUID());
      this.$store.commit('changeMenu',item)
      if(item.menuFlag == '2') {
        this.$store.commit('changeClick')
        this.data = {
          title: item.title,
          to: item.to,
          name: item.name,
          id: item.id
        };
        this.$router.push(item.to)
        this.getMenu(item)
      }
    },
    //获取tags-nav 切换数据
    getMenu(obj) {
      let offon = true;
      let arr = JSON.parse(sessionStorage.getItem("tagMenuList")) === null ? [] : JSON.parse(sessionStorage.getItem("tagMenuList"));
      arr.forEach(item => {
        if (item.title == this.data.title) {
          offon = false;
        }
      });
      if (offon) {
        arr.push(this.data);
      }
      /*let arr = JSON.parse(sessionStorage.getItem("menuList"));
      this.tagMenu = [...arr]
      console.log(this.tagMenu)*/
      arr[0].id = obj.id
      this.$store.commit('changeMenu',obj)
      this.$store.commit('changeTagMenu',arr)
    },
    getStart() {
      /**/
      serverAjaxReq("/permission/selectUserMenus", {menuType: 1}, (state, rspMsg,rspData) => {
        if (state == "FAIL") {
          this.isLoading=false
          this.$Message.error("菜单列表获取失败！");
          return;
        }
        if (state == "ERROR") {
          this.isLoading=false
          this.$Message.error(rspMsg);
          return;
        }
        if (state == "SUCCESS") {
            this.$emit("getTagMenu", []);
            routerData[0].childNodes[0].childNodes = this.$store.state.routerData[0]
            routerData[0].childNodes[1].childNodes = this.$store.state.routerData[1]
            this.menuList = rspData[0].childNodes.slice(0,3).concat(routerData[0].childNodes);
            this.$recursion(this.menuList, "childNodes", function(itemMenu) {
              itemMenu.title = itemMenu.menuName;
              itemMenu.to = itemMenu.url;
              itemMenu.name = itemMenu.menuCode;
              // itemMenu.children = itemMenu.childNodes;
            });
            //console.log(this.$store.state.routerData[0])
            sessionStorage.setItem("menuList", JSON.stringify(this.menuList));
            this.$Bus.$emit("changeMenuList", this.menuList);
            $('.noMenuIconWrap').css('background','#009688')
            this.isLoading=false
        }
      });

    },
    // 获取菜单栏的分类
    getInterfaceMenu() {
      this.isLoading=true
      $(".noMenuIconWrap").css('background','none');
      clientAjaxReq('/interface/queryAllCategory', {}, (state, rspMsg, rspData) => {
        if (state == "FAIL") {
          this.isLoading=false
          this.$Message.error("菜单栏获取失败！");
          return;
        }
        if (state == "ERROR") {
          this.isLoading=false
          this.$Message.error(rspMsg);
          return;
        }
        if (state == "SUCCESS") {
          let num1 = 0
          if(rspData.forEach==undefined)
          return;
          rspData.forEach((item, index) => {
            item.id = item.categoryId
            item.menuName = item.categoryName
            item.menuCode = (400 + num1).toString()
            item.menuFlag = 2
            item.icon = " iconfont iconccgl-chukuguize-1"
            item.url = "/package"
            item.childNodes = item.childCate
            num1++
            item.childCate.forEach((item1, index1) => {
              item1.id = item1.childCategoryId
              item1.menuName = item1.childCategoryName
              item1.menuCode = (400 + num1).toString()
              item1.menuFlag = 2
              item1.icon = " iconfont iconccgl-chukuguize-1"
              item1.url = "/classification"
              item1.childNodes = item1.childCate || []
              num1++
            })
          })
          //console.log(rspData)
          // this.$Bus.$emit('project', rspData)
          //sessionStorage.setItem("project", JSON.stringify(rspData))
          this.routerData = []
          this.routerData.push(rspData)
          let num2 = 0
          clientAjaxReq('/caller/queryCaller', {}, (state, rspMsg, rspData) => {
            if (state == "FAIL") {
              this.isLoading=false
              this.$Message.error("菜单栏获取失败！");
              return;
            }
            if (state == "ERROR") {
             this.isLoading=false
             this.$Message.error(rspMsg);
             return;
            }
            if (state == "SUCCESS") {
              if(rspData.forEach==undefined)
              return;
              rspData.forEach((item, index) => {
                if(item.callName==null){
                  rspData.splice(index,1)
                }
              })
              rspData.forEach((item, index) => {
                  item.id = 1000 + num2
                  item.menuName = item.callName
                  item.menuCode = (1000 + num2).toString()
                  item.menuFlag = 2
                  item.icon = " iconfont iconccgl-chukuguize-1"
                  item.url = "/caller"
                  item.childNodes = []
                  num2++
                })
              this.routerData.push(rspData)
              this.$store.commit('routerData', this.routerData)
              this.getStart();
            }
          })
        }
      })
    }
  },
  created() {
    this.getInterfaceMenu()
  },
  mounted() {
    this.homeId=this.$UUID();
    this.getChooseMenu()
  },
  watch: {
    "$store.state.changeMenu": {
      deep: true,
      handler() {
        this.getChooseMenu()
      }
    },
    "$store.state.changeFlag": {
      deep: true,
      handler() {
        this.getInterfaceMenu()
      }
    },
  }
};
</script>

<style lang="less">
.noMenuIcon + i {
  display: none;
}
.noMenuIconWrap {
  color: white;
  background: #009688;
  z-index: 2;
}
.noMenuIconWrap.isloading {
  background: none;
}
.noMenuIcon i {
  //  display: inline-block;
  //  width: 20px;
  margin-right: 8px;
}
.noChildren i {
  cursor: pointer;
}
.noChildren .ivu-select-dropdown {
  display: none !important;
}
.self-menu-submenu-title1 {
  padding: 0px 43px;
}
.self-menu-submenu-title1 > i {
  margin-right: 6px;
}
.my > div {
  padding-left: 0px!important;
}
.ivu-layout-sider-children{
  overflow-y: auto;
}
.ivu-layout-sider-children::-webkit-scrollbar{
  width: 5px;
  background:#009688;
}
.ivu-layout-sider-children::-webkit-scrollbar-thumb{
  width: 5px;
  background:#737371;
  border-radius: 5px;
}
.spin-icon-load{
  animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
