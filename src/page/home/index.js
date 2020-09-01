export const homeMixins = {
  data() {
    return {
      fromModelAll: {
        categoryId: null,
        isShow: false,
        isCustomKeep: true,
        loading: false,
        title: "",
        otherButton: [ //底部其他按钮配置;
          {
            title: "删除",
            click: () => {
              this.popAll.isPopModel = true
              this.popAll.nTxt = this.fromModelAll.menuForm.categoryName
            },
            disabled: null,
            hide: false //按钮显示隐藏控制;
          }
        ],
        fromData: [{
            type: "input",
            key: "categoryName",
            label: "项目包名称",
            col: "24",
            message: true,
            fromType: "text"
          },
          {
            type: "input",
            key: "categoryDesc",
            label: "项目包说明",
            col: "24",
            fromType: "textarea",
            message: true,
            rows: 5
          },
        ],
        menuForm: {
          categoryName: "",
          categoryDesc: "",
        }
      },
      project: [],
      popAll: {
        vTxt: "删除", //弹窗动态，如:删除、审核、启用、停用...;
        nTxt: '', //当前选中信息;
        type: "1", //弹窗类型 1.删除、审核、确认等确认弹窗 2、空白弹窗 默认：1;
        isPopModel: false, //弹窗显示控制;
        isHideKeep: false //关闭按钮是否隐藏 默认为false显示 可不写;
      },
    }
  }
}
