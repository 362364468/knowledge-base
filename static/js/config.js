let outlayData = {};
//     本地
const train = function (data) {
        document.title = data[0].title
        outlayData = data[0]
        // 设置浏览器选项卡图标
        const Ico = document.getElementById('ico');
        Ico.type = outlayData.ico.type;
        Ico.href = outlayData.ico.url;
        /*outlayData.client_url="http://localhost:8080/yjcz/api/v1";*/
        return data[0].title
}

//框架新增功能控制
let versionControl = {
        requestEdition:"old",// requestEdition  前端请求版本  old 请求字段规范化修改前 new 请求字段规范化修改前
        isPasswordEncrypted:false,//密码是否加密
        isShowSMSLanding: false,//是否启用短信登陆功能
        isShowSystemMaintenance: true,//是否显示系统 维护/帮助 模块
        isShowCustomTtheme: false,//是否显示项目主题色切换模块
        isAddAuthoritycontrol:false,//是否添加用户行为权限控制(主要为按钮权限控制)
        actionMessageTxt:"你无此操作权限,请先联系管理人员开启",//用户行为权限控制点击报错信息
}

