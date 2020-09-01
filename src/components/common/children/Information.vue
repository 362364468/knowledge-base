<template>
  <Modal
    v-model="InformationAll.isShow"
    title="个人信息"
    class="write-model Information_model"
    :closable="false"
    :mask-closable="false"
    footer-hide
  >
    <div class="write-form">
      <Form
        ref="userForm"
        :model="InformationAll.formObj"
        :rules="userRuleValidate"
        :label-width="80"
      >
        <Row>
          <i-col :span="18">
            <Row class="detail_row">
              <i-col :span="24" class="detail_col">
                <div class="key" style="{width:80px}">
                  <span>姓名</span>
                </div>
                <div class="value">
                  <FormItem prop="userName">
                    <Input v-model="InformationAll.formObj.userName" disabled />
                  </FormItem>
                </div>
              </i-col>
              <i-col :span="24" class="detail_col">
                <div class="key" style="{width:80px}">
                  <span>帐号</span>
                </div>
                <div class="value">
                  <FormItem prop="account">
                    <Input v-model="InformationAll.formObj.account" disabled />
                  </FormItem>
                </div>
              </i-col>
               <i-col :span="24" class="detail_col">
                <div class="key" style="{width:80px}">
                  <span>组织机构</span>
                </div>
                <div class="value">
                  <FormItem prop="orgName">
                    <Input v-model="InformationAll.formObj.orgName" disabled />
                  </FormItem>
                </div>
              </i-col>
              <i-col :span="24" class="detail_col">
                <div class="key" style="{width:80px}">
                  <span>员工编号</span>
                </div>
                <div class="value">
                  <FormItem>
                    <Input v-model="InformationAll.formObj.userNo" disabled />
                  </FormItem>
                </div>
              </i-col>
            </Row>
          </i-col>
          <i-col :span="6" class="img_col">
            <div
              class="img_wrap"
              :style="{'background-image':`url(${InformationAll.formObj.icon?InformationAll.formObj.icon:nowIcon})`}"
            ></div>
            <div class="meng" @click="touxiang">
              <Icon type="md-repeat" />
            </div>
          </i-col>
        </Row>
        <Row class="detail_row" style="border-top:0">
          <i-col :span="12" class="detail_col">
            <div class="key" style="{width:80px}">
              <span>邮箱号码</span>
            </div>
            <div class="value">
              <FormItem>
                <Input v-model="InformationAll.formObj.eMail" clearable />
              </FormItem>
            </div>
          </i-col>
          <i-col :span="12" class="detail_col">
                <div class="key" style="{width:80px}">
                  <span>手机号码</span>
                </div>
                <div class="value">
                  <FormItem prop="phoneNum">
                    <Input v-model="InformationAll.formObj.phoneNum" clearable />
                  </FormItem>
                </div>
              </i-col>
        </Row>
      </Form>
      <!-- {{InformationAll}} -->
    </div>
    <div class="form-btn">
      <Button type="primary" @click="handleClose">关闭</Button>
      <Button type="primary" @click="handleSubmit">保存</Button>
    </div>
  </Modal>
</template>
<script>
/*import icon from '@/../static/json/icon.json'*/
export default {
  props: ["InformationAll","actionId"],
  data() {
    return {
      nowIcon: 'icon.url',
      orgData: [],
      userRuleValidate: {
        account: [
          {
            required: true,
            message: "用户帐号不能为空!",
            trigger: "change,blur"
          }
        ],
        userName: [
          { required: true, message: "姓名不能为空!", trigger: "change,blur" }
        ],
        orgName: [
          {
            required: true,
            message: "组织机构不能为空!",
            trigger: "change,blur"
          }
        ]
      }
    };
  },
  methods: {
    //弹窗关闭事件
    handleClose() {
      // this.$refs["userForm"].resetFields();
      this.InformationAll.isShow = false;
    },
    //头像替换事件
    touxiang() {
      //头像获取事件
      this.$PictureCompression(200, src => {
        this.InformationAll.formObj.icon = src;
      });
    },
    //信息保存事件
    handleSubmit() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          let eMailStr = this.InformationAll.formObj.eMail;
           const reg2 = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          let phoneStr= this.InformationAll.formObj.phoneNum;
          if (eMailStr && !reg.test(eMailStr)) {
            this.$Message.error("请输入正确的邮箱号码");
          }if (phoneStr&&!reg2.test(phoneStr)) {
            this.$Message.error("请输入有效的手机号码");
          } else {
            let orgId = "";
            this.$recursion(this.orgData, "childNodes", item => {
              if (item.orgName == this.InformationAll.formObj.orgName) {
                orgId = item.orgId;
              }
            });
            if (!orgId) {
              this.$Message.error("当前组织机构无效，请重新输入");
            } else {
              this.editUser(orgId);
            }
            //  this.$Message.success('提交成功')

            // this.InformationAll.isShow = false;
          }
        } else {
          this.$Message.error("用户信息输入不完整！");
          // this.saveLoad = false;
        }
      });
    },
    //用户信息修改事件
    editUser(orgId) {
      // console.log( this.userForm.userNo)
      let obj = {
        userId: this.InformationAll.formObj.userId,
        account: this.InformationAll.formObj.account,
        userName: this.InformationAll.formObj.userName,
        orgId: orgId,
        orderNo: this.InformationAll.formObj.orderNo,
        status: this.InformationAll.formObj.sfqy ? "1" : "0",
        eMail: this.InformationAll.formObj.eMail,
        icon: this.InformationAll.formObj.icon,
        phoneNum: this.InformationAll.formObj.phoneNum,
        userNo: this.InformationAll.formObj.userNo
      };
      let sendData = this.$sendData({
        actionId: this.actionId,
        actionName: "个人信息-修改保存",
        callerName:"个人设置",
        reqData:obj,
        sftj:true
      });
      this.$serverAjaxReq("/user/updateUser", sendData, (state, rspMsg, rspData) => {
        if (state == "FAIL") {
          this.$Message.error("修改功能异常！");
        }
        if (state == "ERROR") {
          this.$Message.error(rspMsg);
        }
        if (state == "SUCCESS") {
          this.$emit("addSubmit");
          this.$Message.success("个人信息修改成功");
          this.InformationAll.isShow = false;
        }
        this.saveLoad = false;
      },
      this.$router,this.$Message,this
      );
    },
    //所有组织机构获取事件
    selOrg() {
       let sendData = this.$sendData({
        actionId: this.actionId,
        actionName: "个人信息-组织机构查询",
        callerName:"个人设置"
      });
       this.$serverAjaxReq(
        "/org/selectOrgByCondition",
       sendData,
        (state, rspMsg, rspData) => {
          if (state == "SUCCESS") {
            this.orgData = rspData;
          }
        },
         this.$router,this.$Message,this
      );
    }
  },
  watch: {
    "InformationAll.isShow": {
      handler(val) {
        if (val) {
          this.selOrg();
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less">
.Information_model {
  .write-form {
    padding: 10px;
  }
  .img_col {
    border: 1px solid #666666;
    border-left: 0;
    position: relative;
    .img_wrap {
      width: 100%;
      height: 131px;
      background-size: contain;
      background-position: center;
      background-repeat:no-repeat;
    }
    .meng {
      position: absolute;
      width: 100%;
      height: 131px;
      top: 0;
      left: 0;
      background: #00050a6b;
      text-align: center;
      line-height: 131px;
      cursor: pointer;
      display: none;
      i {
        font-size: 40px;
        color: white;
      }
    }
  }
  .img_col:hover .meng {
    display: block;
  }
  .detail_row {
    display: block;
    width: 100%;
    height: auto;
    border-right: 1px solid #666666;
    border-top: 1px solid #666666;

    .detail_col {
      display: flex;

      .key {
        width: 80px;
        padding: 5px;
        border-left: 1px solid #666666;
        border-bottom: 1px solid #666666;
        display: flex;
        align-items: center;
        line-height: 22px;
      }

      .value {
        width: ~"calc(100% - 80px)";
        // padding: 5px;
        clear: right;
        border-left: 1px solid #666666;
        border-bottom: 1px solid #666666;
        word-break: break-all;
        word-wrap: break-word;
        max-height: 81px;
        overflow: auto;
        .ivu-input-wrapper {
          display: block;
        }
        .ivu-form-item {
          margin-bottom: 0;
          .ivu-form-item-content {
            margin-left: 0 !important;
            .ivu-input {
              border-radius: 0;
              padding: 4px 5px;
              border: 1px solid white;
            }
             .ivu-input[disabled]{
              color: #333333;
            }
          }
        }
        .ivu-form-item-error .ivu-form-item-content .ivu-input {
          border: 1px solid red;
        }
      }

      .value.bg {
        background: #dcdcdc;
      }
    }
  }
}
</style>>