export const navHeaderMixins = {
    data() {
        return {
            fromModelAll: {
                isShow: false,
                isCustomKeep: true,
                title: "修改密码",
                isCustomActionLog:true,
                fromData: [
                    {
                        type: "input",
                        key: "oldPassword",
                        label: "旧密码",
                        col: "24",
                        placeholder: "请输入旧密码",
                        message: "旧密码不能为空",
                        fromType: "password",
                        clearable:false,
                        passwordIcon:true
                    }, {
                        type: "input",
                        key: "oneNewPassword",
                        label: "新密码",
                        col: "24",
                        placeholder: "请输入新密码",
                        // message: "新密码不能为空",
                        fromType: "password",
                        clearable:false,
                        passwordIcon:true
                    }, {
                        type: "input",
                        key: "newPassword",
                        label: "确认密码",
                        col: "24",
                        placeholder: "请再确认输入一次新密码",
                        // message: "确认密码不能为空",
                        fromType: "password",
                        clearable:false,
                        passwordIcon:true
                    }
                ],
                menuForm: { oldPassword: "", oneNewPassword: "", newPassword: "" },
                menuRuleValidate: {
                    oneNewPassword: [
                        {required: true, trigger: "change,blur", validator(rule, value, callback){
                            var reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
                            if (value) {
                                
                                if (reg.test(value)) {
                                    callback()
                                } else {
                                    callback(new Error('密码至少包含大写字母，小写字母，数字，且不少于8位'))
                                }
                            } else {
                                callback("密码不能为空")
                            }
                        } }
                    ],
                    newPassword: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (this.fromModelAll.menuForm.oneNewPassword == value) {
                                    callback();
                                } else {
                                    callback(new Error("两次输入密码不一致"));
                                }
                            },
                            trigger: "change,blur"
                        }
                    ]
                }
            },
            //基础弹窗控制---删除、审核、确认弹窗;
            popAll: {
                vTxt: "注销",//弹窗动态，如:删除、审核、启用、停用...;
                nTxt: '菜单"大大大"?',//当前选中信息;
                isCustomActionLog:true,
                isPopModel: false,//弹窗显示控制;
                isHideKeep: false //关闭按钮是否隐藏 默认为false显示 可不写;
            }
        }
    },
    methods: {
        //修改密码弹窗确认事件
        formKeep(item) {
            let reqData = {
                password:this.getAesString(item.oldPassword) ,
                newPassword:this.getAesString(item.newPassword) 
            };
            let sendData = this.$sendData({
                actionId: this.personalSettingsId,
                actionName: "修改密码-保存",
                callerName:"个人设置",
                reqData:reqData,
                sftj:true
              });
            this.$serverAjaxReq(
                "/user/updateUserPwd",
                sendData,
                (state, rspMsg, rspData) => {
                    if (state == "FAIL") {
                        this.$Message.error("查询异常！");
                    }
                    if (state == "ERROR") {
                        this.$Message.error(rspMsg);
                    }
                    if (state == "SUCCESS") {
                        this.$refs.formChild.close();
                        // 修改后从新登陆
                        sessionStorage.clear();
                        this.$router.push("/");
                    }
                },
                this.$router,
                this.$Message,
                this
            );
        },
        // 注销弹窗启用事件
        Cancellation() {
            this.popAll.isPopModel = true;
            this.popAll.nTxt = this.userInforList.userName;
        },
        //注销确认事件
        confirm(vTxt) {
            this.popAll.isPopModel = false
            this.$router.push("/");
            sessionStorage.clear();
        }
    }
}