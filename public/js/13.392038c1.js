(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{e36f:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return"Profiler"===e.smonStore.metricType?o("q-select",{attrs:{color:"orange",options:e.smonStore.threadApiList,size:"md",label:"Profiler name"},on:{input:e.handleChangedProfilerFn},model:{value:e.smonStore.threadApiName,callback:function(t){e.$set(e.smonStore,"threadApiName",t)},expression:"smonStore.threadApiName"}}):e._e()},n=[],a=o("60a3"),l=o("7ba0"),s=function(e,t,o,r){var n,a=arguments.length,l=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(l=(a<3?n(l):a>3?n(t,o,l):n(t,o))||l);return a>3&&l&&Object.defineProperty(t,o,l),l};let c=class extends a["e"]{handleChangedProfilerFn(e){Object(l["a"])(e)||this.smonStore.toogleChartRender(!0)}};s([Object(a["b"])("storeObservable")],c.prototype,"smonStore",void 0),c=s([a["a"]],c);var i=c,p=i,f=o("2877"),d=Object(f["a"])(p,r,n,!1,null,null,null);t["default"]=d.exports}}]);