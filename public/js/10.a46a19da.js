(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"7ba0":function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return n}));var o=r("fe09"),c=r("00f1");function a(e){return void 0===e||null===e||""===e}function n(e){const t=Date.now();switch(e){case c["c"].WHOLE_TODAY:return{from:o["c"].startOfDate(t,"day").getTime(),to:o["c"].endOfDate(t,"day").getTime()};case c["c"].TODAY_TO_NOW:return{from:o["c"].startOfDate(t,"day").getTime(),to:t};case c["c"].LAST_15_MINUTES:return{from:o["c"].subtractFromDate(t,{minutes:15}).getTime(),to:t};case c["c"].LAST_30_MINUTES:return{from:o["c"].subtractFromDate(t,{minutes:30}).getTime(),to:t};case c["c"].LAST_AN_HOUR:return{from:o["c"].subtractFromDate(t,{hours:1}).getTime(),to:t};case c["c"].LAST_2_HOURS:return{from:o["c"].subtractFromDate(t,{hours:2}).getTime(),to:t};case c["c"].LAST_4_HOURS:return{from:o["c"].subtractFromDate(t,{hours:4}).getTime(),to:t};case c["c"].LAST_8_HOURS:return{from:o["c"].subtractFromDate(t,{hours:8}).getTime(),to:t};case c["c"].LAST_12_HOURS:return{from:o["c"].subtractFromDate(t,{hours:12}).getTime(),to:t};case c["c"].LAST_24_HOURS:return{from:o["c"].subtractFromDate(t,{hours:24}).getTime(),to:t};case c["c"].LAST_7_DAYS:return{from:o["c"].subtractFromDate(t,{days:7}).getTime(),to:t};default:return{from:o["c"].startOfDate(t,"day").getTime(),to:o["c"].endOfDate(t,"day").getTime()}}}},e36f:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.smonStore.isProfilerType?r("q-select",{attrs:{color:"orange",options:e.smonStore.profilerApis,size:"md",label:"Profiler name"},on:{input:e.handleChangedProfilerFn},model:{value:e.currentApi,callback:function(t){e.currentApi=t},expression:"currentApi"}}):e._e()},c=[],a=r("9ab4"),n=r("60a3"),s=r("7ba0"),u=r("6fc5"),i=r("4c9f");let m=class extends n["c"]{constructor(){super(...arguments),this.smonStore=Object(u["e"])(i["a"],this.$store)}get currentApi(){return this.smonStore.apiName}set currentApi(e){this.smonStore.setProfilerApi(e)}handleChangedProfilerFn(e){Object(s["b"])(e)||this.smonStore.setToggleRenderChart(!0)}};m=Object(a["b"])([n["a"]],m);var f=m,l=f,T=r("2877"),_=Object(T["a"])(l,o,c,!1,null,null,null);t["default"]=_.exports}}]);