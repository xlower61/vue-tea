"use strict";(self["webpackChunkvue_tea"]=self["webpackChunkvue_tea"]||[]).push([[398],{6830:function(e,t,s){s.d(t,{Z:function(){return l}});var i=function(){var e=this,t=e._self._c;return t("header",[t("div",[t("i",{staticClass:"iconfont icon-31fanhui1",on:{click:e.goBack}})]),t("div",[t("span",[e._t("title",(function(){return[e._v("登录")]}))],2)]),t("div",[t("i",{staticClass:"iconfont icon-home",on:{click:e.goHome}})])])},o=[],n=(s(7658),{name:"CommonHeader",methods:{goBack(){"/address"===this.$route.path&&"select"!==this.$route.query.type?this.$router.push("/mine").catch((()=>{})):this.$router.back()},goHome(){this.$router.push("/")}}}),r=n,a=s(1001),u=(0,a.Z)(r,i,o,!1,null,"4dbb2d1a",null),l=u.exports},3398:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login container"},[t("CommonHeader"),t("section",[t("div",{staticClass:"login-tel"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userTel,expression:"userTel"}],attrs:{type:"text",placeholder:"请输入手机号",pattern:"[0-9]{11}"},domProps:{value:e.userTel},on:{input:function(t){t.target.composing||(e.userTel=t.target.value)}}})]),t("div",{staticClass:"login-code"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.msgCode,expression:"msgCode"}],attrs:{type:"text",placeholder:"请输入短信验证码",pattern:"[0-9]*"},domProps:{value:e.msgCode},on:{input:function(t){t.target.composing||(e.msgCode=t.target.value)}}}),t("button",{class:!1===e.isDisable?"active":"noactive",attrs:{disabled:e.isDisable},on:{click:e.getShortCode}},[e._v(e._s(e.btn))])]),t("div",{staticClass:"login-in",on:{click:e.login}},[e._v("登录")]),t("div",{staticClass:"login-tab"},[t("span",{on:{click:e.toUserLogin}},[e._v("密码登录")]),t("span",{on:{click:e.toRegister}},[e._v("快速注册")])])]),t("TabBar")],1)},o=[],n=(s(4837),s(9146)),r=(s(7658),s(9608)),a=s(6830),u=s(918),l=s(629),c={name:"MsgLoginView",components:{CommonHeader:a.Z,TabBar:r.Z},data(){return{userTel:"",isDisable:!1,btn:"获取短信验证码",waitTime:6,msgCode:""}},computed:{...(0,l.rn)({loginRules:e=>e.user.loginRules})},methods:{toUserLogin(){this.$router.push("/login/password")},toRegister(){this.$router.push("/login/register")},async getShortCode(){if(!this.loginRules.userTel.rule.test(this.userTel))return void(0,n.Z)(this.loginRules.userTel.msg);let{data:e}=await(0,u.fe)(this.userTel);e.data.success&&(console.log(e.data.data),(0,n.Z)("验证码发送成功！")),this.isDisable=!0;let t=setInterval((()=>{--this.waitTime,this.btn=`重新发送${this.waitTime}`}),1e3);setTimeout((()=>{clearInterval(t),this.waitTime=6,this.btn="重新获取验证码",this.isDisable=!1}),6e3)},async login(){if(!this.loginRules.userTel.rule.test(this.userTel))return void(0,n.Z)(this.loginRules.userTel.msg);if(!this.loginRules.msgCode.rule.test(this.msgCode))return void(0,n.Z)(this.loginRules.msgCode.msg);let{data:e}=await(0,u.hd)(this.userTel,this.msgCode);e.data.success?((0,n.Z)(e.data.msg),this.$store.commit("LOGIN",e.data.userinfo),this.$router.push("/mine")):(0,n.Z)(e.data.msg)}}},d=c,g=s(1001),m=(0,g.Z)(d,i,o,!1,null,"9907d1ac",null),h=m.exports},918:function(e,t,s){s.d(t,{Jq:function(){return u},WW:function(){return o},fe:function(){return n},hd:function(){return r},oQ:function(){return l},vt:function(){return a}});var i=s(7245);const o=(e,t)=>i.Z.post("/userLogin",{userTel:e,userPwd:t}),n=e=>i.Z.post("/getcode",{userTel:e}),r=(e,t)=>i.Z.post("/codeLogin",{userTel:e,msgCode:t}),a=(e,t,s)=>i.Z.post("/Register",{userTel:e,msgCode:t,userPwd:s}),u=(e,t)=>i.Z.post("/findTel",{userTel:e,msgCode:t}),l=(e,t)=>i.Z.post("/resetPassword",{userTel:e,userPwd:t})}}]);
//# sourceMappingURL=398.26371231.js.map