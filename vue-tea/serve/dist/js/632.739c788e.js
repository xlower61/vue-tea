"use strict";(self["webpackChunkvue_tea"]=self["webpackChunkvue_tea"]||[]).push([[632],{6830:function(e,t,s){s.d(t,{Z:function(){return l}});var r=function(){var e=this,t=e._self._c;return t("header",[t("div",[t("i",{staticClass:"iconfont icon-31fanhui1",on:{click:e.goBack}})]),t("div",[t("span",[e._t("title",(function(){return[e._v("登录")]}))],2)]),t("div",[t("i",{staticClass:"iconfont icon-home",on:{click:e.goHome}})])])},i=[],o=(s(7658),{name:"CommonHeader",methods:{goBack(){"/address"===this.$route.path&&"select"!==this.$route.query.type?this.$router.push("/mine").catch((()=>{})):this.$router.back()},goHome(){this.$router.push("/")}}}),a=o,n=s(1001),u=(0,n.Z)(a,r,i,!1,null,"4dbb2d1a",null),l=u.exports},4632:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"register container"},[t("CommonHeader",{scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" 注册 ")]},proxy:!0}])}),t("section",[t("div",{staticClass:"register-tel"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userTel,expression:"userTel"}],attrs:{type:"text",placeholder:"请输入手机号",pattern:"[0-9]{11}"},domProps:{value:e.userTel},on:{input:function(t){t.target.composing||(e.userTel=t.target.value)}}})]),t("div",{staticClass:"register-code"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.msgCode,expression:"msgCode"}],attrs:{type:"text",placeholder:"请输入短信验证码",pattern:"[0-9]*"},domProps:{value:e.msgCode},on:{input:function(t){t.target.composing||(e.msgCode=t.target.value)}}}),t("button",{class:!1===e.isDisable?"active":"noactive",attrs:{disabled:e.isDisable},on:{click:e.getShortCode}},[e._v(e._s(e.btn))])]),t("div",{staticClass:"register-password"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userPassword,expression:"userPassword"}],attrs:{type:"text",placeholder:"请设置密码",pattern:"[0-9]{11}"},domProps:{value:e.userPassword},on:{input:function(t){t.target.composing||(e.userPassword=t.target.value)}}})]),t("div",{staticClass:"register-in",on:{click:e.register}},[e._v("注册")]),e._m(0)]),t("TabBar")],1)},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"register-protocol"},[t("span",[e._v("注册即视为同意")]),t("span",{staticClass:"protocol"},[e._v("《服务协议》")])])}],o=(s(7658),s(9608)),a=s(6830),n=s(918),u=s(629),l={name:"RegisterView",components:{TabBar:o.Z,CommonHeader:a.Z},data(){return{userTel:"",userPassword:"",msgCode:"",isDisable:!1,btn:"发送短信验证码"}},computed:{...(0,u.rn)({loginRules:e=>e.user.loginRules})},methods:{async register(){if(!this.loginRules.userTel.rule.test(this.userTel))return void this.$toast(this.loginRules.userTel.msg);if(!this.loginRules.msgCode.rule.test(this.msgCode))return void this.$toast(this.loginRules.msgCode.msg);if(!this.loginRules.userPassword.rule.test(this.userPassword))return void this.$toast(this.loginRules.userPassword.msg);let{data:e}=await(0,n.vt)(this.userTel,this.msgCode,this.userPassword);this.$toast(e.data.msg),e.data.success&&(this.$store.commit("PASSWORD_LOGIN",e.data.userinfo),this.$router.push("/mine"))},async getShortCode(){if(!this.loginRules.userTel.rule.test(this.userTel))return void this.$toast(this.loginRules.userTel.msg);let{data:e}=await(0,n.fe)(this.userTel);e.data.success&&(console.log(e.data.data),this.$toast("验证码发送成功！")),this.isDisable=!0;let t=setInterval((()=>{--this.waitTime,this.btn=`重新发送${this.waitTime}`}),1e3);setTimeout((()=>{clearInterval(t),this.waitTime=6,this.btn="重新获取验证码",this.isDisable=!1}),6e3)}}},d=l,c=s(1001),m=(0,c.Z)(d,r,i,!1,null,"38f02249",null),h=m.exports},918:function(e,t,s){s.d(t,{Jq:function(){return u},WW:function(){return i},fe:function(){return o},hd:function(){return a},oQ:function(){return l},vt:function(){return n}});var r=s(7245);const i=(e,t)=>r.Z.post("/userLogin",{userTel:e,userPwd:t}),o=e=>r.Z.post("/getcode",{userTel:e}),a=(e,t)=>r.Z.post("/codeLogin",{userTel:e,msgCode:t}),n=(e,t,s)=>r.Z.post("/Register",{userTel:e,msgCode:t,userPwd:s}),u=(e,t)=>r.Z.post("/findTel",{userTel:e,msgCode:t}),l=(e,t)=>r.Z.post("/resetPassword",{userTel:e,userPwd:t})}}]);
//# sourceMappingURL=632.739c788e.js.map