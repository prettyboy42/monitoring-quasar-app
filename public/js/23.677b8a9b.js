(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[23],{"2ff9":function(e,t,l){"use strict";l.r(t);var s=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("q-page",{staticClass:"flex flex-center"},[l("div",[e.profile.id?l("div",[l("div",{staticClass:"q-title"},[e._v(e._s(e.profile.first_name+" "+e.profile.last_name))]),l("p",[l("img",{attrs:{src:e.profile.picture}})])]):e._e()])])},i=[],o=l("9ab4"),r=l("60a3");let a=class extends r["d"]{constructor(){super(...arguments),this.profile={}}mounted(){this.getProfile("facebook")}getProfile(e){null!=this.$hello.getAuthResponse(e)&&this.$hello(e).api("me").then(e=>{console.log(e),this.profile=e})}};a=Object(o["b"])([r["a"]],a);var n=a,c=n,f=l("2877"),p=Object(f["a"])(c,s,i,!1,null,null,null);t["default"]=p.exports}}]);