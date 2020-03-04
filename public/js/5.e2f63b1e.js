(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"2f98":function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return p}));var a=r("fe09"),s=r("2b0e"),i=r("b318"),n=function(e,t,r,a){function s(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function n(e){try{o(a.next(e))}catch(t){i(t)}}function l(e){try{o(a["throw"](e))}catch(t){i(t)}}function o(e){e.done?r(e.value):s(e.value).then(n,l)}o((a=a.apply(e,t||[])).next())}))};const l=[{name:"Profiler",value:["proc_rate","req_rate","peek_rate","pending_req","peek_pending","proc_time","peek_time"]},{name:"TServer",value:["n_waiting","n_active","n_idle","n_largest","buffer_alloc","frame_size_count"]},{name:"HServer",value:["n_waiting","n_active","n_idle"]},{name:"ZComWorker",value:["in_rate","out_rate","in_packet","out_packet"]},{name:"ZExecutors",value:["n_waiting","n_active","n_idle","n_largest","n_uncomplete","n_reject"]},{name:"ZWatcher",value:["n_waiting","n_active","n_idle","n_largest","n_uncomplete","n_reject"]}];var o;(function(e){e["TIME_RANGE"]="time-range",e["BY_DAY"]="by-day"})(o||(o={}));class p{constructor(){this.stateObs=s["default"].observable({appName:"",metricType:"",metricValue:[],threadApiName:"",showLegend:!0,legendType:o.TIME_RANGE,metricGroupType:"checkbox",appNameList:[],metricTypeList:[],serverIpList:[],threadApiList:[],metricValueList:[],syncChart:!0}),this.isFetchingData=!1,this.requireRenderChart=!1,this.apiCaller=new i["a"]}toogleChartRender(e){this.requireRenderChart=e}get appName(){return this.stateObs.appName}set appName(e){if(null===e||""===e)throw new Error("appName must not null or empty");this.stateObs.appName=e}get metricType(){return this.stateObs.metricType}set metricType(e){if(null===e||""===e)throw new Error("metricType must not null or empty");this.stateObs.metricType=e}get metricValue(){return this.stateObs.metricValue}set metricValue(e){if(null===e||e===[])throw new Error("metricType must not null or empty");this.stateObs.metricValue=e}get metricGroupType(){return this.stateObs.metricGroupType}set metricGroupType(e){if(null===e||""===e)throw new Error("metricGroupType must not null or empty");this.stateObs.metricGroupType=e}get showLegend(){return this.stateObs.showLegend}set showLegend(e){if(null===e||void 0===e)throw new Error("showLegend must not null or empty");this.stateObs.showLegend=e}get legendType(){return this.stateObs.legendType}set legendType(e){if(null===e||void 0===e)throw new Error("legendType must not null or empty");this.stateObs.legendType=e}get threadApiName(){return this.stateObs.threadApiName}set threadApiName(e){if(null===e||""===e)throw new Error("threadApiName must not null or empty");this.stateObs.threadApiName=e}get metricTypeList(){return this.stateObs.metricTypeList}set metricTypeList(e){this.stateObs.metricTypeList=e}get appNameList(){return this.stateObs.appNameList}set appNameList(e){this.stateObs.appNameList=e}get serverIpList(){return this.stateObs.serverIpList}set serverIpList(e){this.stateObs.serverIpList=e}get threadApiList(){return this.stateObs.threadApiList}set threadApiList(e){this.stateObs.threadApiList=e}get metricValueList(){return this.stateObs.metricValueList}set metricValueList(e){this.stateObs.metricValueList=e}get syncChart(){return this.stateObs.syncChart}set syncChart(e){if(null===e||void 0===e)throw new Error("syncChart must not null or empty");this.stateObs.syncChart=e}filterAppListByName(e){if(""===e)return this.stateObs.appNameList;const t=e.toLowerCase();return this.stateObs.appNameList.filter(e=>e.toLowerCase().indexOf(t)>-1)}fetchMetricByType(e){if(void 0===e||""===e)throw new Error("Invalid metric type!");const t=l.filter(t=>t.name===e).flatMap(e=>e.value).map(e=>({label:e,value:e}));return void 0===t||0===t.length?new Promise(e=>e(!0)):(this.metricValueList=t,this.metricValue=[t[0].value],new Promise(e=>e(!0)))}fetchAllMetricTypeByApp(e){return n(this,void 0,void 0,(function*(){try{const t=yield this.apiCaller.getAllTypeByApp(e),r=t.data.data.result;return this.metricType=r[0],this.metricTypeList=r,new Promise(e=>e(r))}catch(t){a["a"].create({color:"negative",position:"top",message:"Loading failed",icon:"report_problem"})}}))}fetchAllServerIpByApp(e){return n(this,void 0,void 0,(function*(){try{const t=yield this.apiCaller.getAllServerIpByApp(e),r=t.data.data.result;return this.serverIpList=r,new Promise(e=>e(r))}catch(t){a["a"].create({color:"negative",position:"top",message:"Loading failed",icon:"report_problem"})}}))}fetchAllAppName(){return n(this,void 0,void 0,(function*(){try{const e=yield this.apiCaller.getAllAppName(),t=e.data.data.result;return this.appName=t[0],this.appNameList=t,new Promise(e=>e(t))}catch(e){a["a"].create({color:"negative",position:"top",message:"Loading failed",icon:"report_problem"})}}))}fetchAllProfilerByApp(e){return n(this,void 0,void 0,(function*(){try{const t=yield this.apiCaller.getAllProfilerByApp(e),r=t.data.data.result.map(e=>e.name);return this.threadApiName=r[0],this.threadApiList=r,new Promise(e=>e(r))}catch(t){a["a"].create({color:"negative",position:"top",message:"Loading failed",icon:"report_problem"})}}))}fetchDataForFirst(){return n(this,void 0,void 0,(function*(){return this.isFetchingData=!0,yield this.fetchAllAppName(),yield this.fetchAllServerIpByApp(this.appName),yield this.fetchAllMetricTypeByApp(this.appName),yield this.fetchAllProfilerByApp(this.appName),this.fetchMetricByType(this.metricType),this.isFetchingData=!1,new Promise(e=>e(!this.isFetchingData))}))}fetchDataOnChangedAppName(){return n(this,void 0,void 0,(function*(){return this.isFetchingData=!0,yield this.fetchAllServerIpByApp(this.appName),yield this.fetchAllMetricTypeByApp(this.appName),yield this.fetchAllProfilerByApp(this.appName),this.fetchMetricByType(this.metricType),this.isFetchingData=!1,new Promise(e=>e(!this.isFetchingData))}))}}},"8b24":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{class:!0===e.$q.platform.is.desktop?"q-pa-md":"q-pa-xs"},[r("div",{directives:[{name:"show",rawName:"v-show",value:!0===e.$q.platform.is.desktop,expression:"$q.platform.is.desktop === true"}],staticClass:"row q-pb-md"},[r("div",{staticClass:"col-12"},[r("t-service-filter")],1)]),r("div",{class:!0===e.$q.platform.is.desktop?"row q-col-gutter-sm justify-start":"column q-col-gutter-xs justify-center"},e._l(e.storeObs.serverIpList,(function(t,a){return r("div",{key:a,class:e.chartGridClass},[r("dashboard-smon-chart",{attrs:{"chart-id":a+1,"chart-group":e.chartGroup,"server-ip":t}})],1)})),0),r("div",{staticClass:"row q-col-gutter-md q-px-md q-py-md"}),r("q-page-scroller",{attrs:{position:"bottom-right","scroll-offset":150,offset:[18,18]}},[r("q-btn",{attrs:{fab:"",icon:"keyboard_arrow_up",color:"accent"}})],1)],1)},s=[],i=r("60a3"),n=r("6fc5"),l=r("b505"),o=r("2f98"),p=r("b318"),c=function(e,t,r,a){var s,i=arguments.length,n=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(n=(i<3?s(n):i>3?s(t,r,n):s(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n},h=function(e,t,r,a){function s(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function n(e){try{o(a.next(e))}catch(t){i(t)}}function l(e){try{o(a["throw"](e))}catch(t){i(t)}}function o(e){e.done?r(e.value):s(e.value).then(n,l)}o((a=a.apply(e,t||[])).next())}))};let u=class extends i["e"]{constructor(){super(...arguments),this.store=Object(n["e"])(l["e"]),this.storeObs=new o["b"],this.apiCaller=new p["a"],this.colors=["linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)","linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)","linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)","linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)"],this.series=[{name:"Desktops",data:[10,41,35,51,49,62,69,91,99]},{name:"Android",data:[4,23,20,51,67,45,75,102,120]},{name:"IOS",data:[8,23,30,45,87,75,90,127,134]}],this.chartGroup="serviceMon"}created(){return h(this,void 0,void 0,(function*(){yield this.initData()}))}beforeDestroy(){clearInterval(this.refreshChartInterval)}get chartGridClass(){let e=["col-xs-12","col-sm-6"];return 0==this.storeObs.serverIpList.length?e.join(" "):(this.storeObs.serverIpList.length<=2?e.push("col-md"):this.storeObs.serverIpList.length<=4?e.push("col-md-6"):e.push("col-md-4"),e.join(" "))}initData(){return h(this,void 0,void 0,(function*(){const e=yield this.storeObs.fetchDataForFirst();e&&this.storeObs.toogleChartRender(!0)}))}registerRefreshChartInterval(e){e>0&&(this.refreshChartInterval=setInterval(()=>{this.storeObs.toogleChartRender(!0)},e))}onChangedRefreshTimeInterval(e){0==e?clearInterval(this.refreshChartInterval):this.registerRefreshChartInterval(e)}};c([Object(i["d"])("storeObservable")],u.prototype,"storeObs",void 0),c([Object(i["f"])("store.refreshTimeInterval")],u.prototype,"onChangedRefreshTimeInterval",null),u=c([Object(i["a"])({components:{TServiceFilter:()=>r.e(7).then(r.bind(null,"7b56")),DashboardSmonChart:()=>r.e(6).then(r.bind(null,"a4e3"))}})],u);var m=u,d=m,_=r("2877"),T=Object(_["a"])(d,a,s,!1,null,null,null);t["default"]=T.exports},b318:function(e,t,r){"use strict";var a=r("a748");class s{init(e){a["a"].defaults.baseURL=e}setHeader(e){Object.assign(a["a"].defaults.headers.common,e)}removeHeader(){a["a"].defaults.headers.common={}}get(e){return a["a"].get(e.url,e.config)}post(e){return a["a"].post(e.url,e.data,e.config)}put(e){return a["a"].put(e.url,e.data,e.config)}delete(e){return a["a"].delete(e.url,e.config)}customRequest(e){return Object(a["a"])(e)}}r.d(t,"a",(function(){return h}));const i="/monitor-profiler",n=i+"/get-monitor-type-support",l=i+"/get-all-ip-by-app-name",o=i+"/get-all-app-name",p=i+"/get-all-profiler-by-app-name",c=i+"/get-chart-profiler";class h{constructor(){this.apiCaller=new s}getAllTypeByApp(e){return a["a"].get(n,{params:{appName:e}})}getAllServerIpByApp(e){return a["a"].get(l,{params:{appName:e}})}getAllAppName(){return a["a"].get(o)}getAllProfilerByApp(e){return a["a"].get(p,{params:{appName:e}})}getChartData(e,t,r,s,i,n,l,o,p){return a["a"].get(c,{params:{chartType:p,timeInterval:o,listDays:l,from:i,to:n,appName:e,serverIp:s,profilerApiName:t,profilerType:r,multiProfilerType:r}})}}},b505:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return p})),r.d(t,"d",(function(){return c}));var a=r("fe09"),s=r("6fc5"),i=r("0613"),n=function(e,t,r,a){var s,i=arguments.length,n=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(n=(i<3?s(n):i>3?s(t,r,n):s(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n};const l=[{label:"Off",value:0},{label:"5 secs",value:5e3},{label:"10 secs",value:1e4},{label:"15 secs",value:15e3},{label:"30 secs",value:3e4},{label:"1 min",value:6e4},{label:"5 mins",value:3e5}],o=[{label:"1 min",value:1},{label:"2 mins",value:2},{label:"5 mins",value:5},{label:"10 mins",value:10},{label:"20 mins",value:20},{label:"30 mins",value:30}];var p;(function(e){e[e["WHOLE_TODAY"]=0]="WHOLE_TODAY",e[e["TODAY_TO_NOW"]=1]="TODAY_TO_NOW",e[e["LAST_15_MINUTES"]=2]="LAST_15_MINUTES",e[e["LAST_30_MINUTES"]=3]="LAST_30_MINUTES",e[e["LAST_AN_HOUR"]=4]="LAST_AN_HOUR",e[e["LAST_2_HOURS"]=5]="LAST_2_HOURS",e[e["LAST_4_HOURS"]=6]="LAST_4_HOURS",e[e["LAST_8_HOURS"]=7]="LAST_8_HOURS",e[e["LAST_12_HOURS"]=8]="LAST_12_HOURS",e[e["LAST_24_HOURS"]=9]="LAST_24_HOURS",e[e["LAST_7_DAYS"]=10]="LAST_7_DAYS"})(p||(p={}));const c=[{label:"Whole today",value:p.WHOLE_TODAY},{label:"Today to now",value:p.TODAY_TO_NOW},{label:"Last 15 minutes",value:p.LAST_15_MINUTES},{label:"Last 30 minutes",value:p.LAST_30_MINUTES},{label:"Last an hour",value:p.LAST_AN_HOUR},{label:"Last 2 hours",value:p.LAST_2_HOURS},{label:"Last 4 hours",value:p.LAST_4_HOURS},{label:"Last 8 hours",value:p.LAST_8_HOURS},{label:"Last 12 hours",value:p.LAST_12_HOURS},{label:"Last 24 hours",value:p.LAST_24_HOURS},{label:"Last 7 days",value:p.LAST_7_DAYS}];let h=class extends s["d"]{constructor(){super(...arguments),this.leftDrawerOpen=!1,this.rightDrawerOpen=!1,this.headerState=!0,this.footerState=a["b"].is.desktop||!1,this.forceRefresh=!1,this.refreshTimeInterval=0,this.tickTimeInterval=1,this.timeRangeInterval=p.WHOLE_TODAY}SET_LEFT_DRAWER_OPEN(e){this.leftDrawerOpen=e}setLeftDrawerOpen(e){this.SET_LEFT_DRAWER_OPEN(e)}toggleLeftDrawer(){this.SET_LEFT_DRAWER_OPEN(!this.leftDrawerOpen)}SET_RIGHT_DRAWER_OPEN(e){this.rightDrawerOpen=e}setRightDrawerOpen(e){this.SET_RIGHT_DRAWER_OPEN(e)}toggleRightDrawer(){this.SET_RIGHT_DRAWER_OPEN(!this.rightDrawerOpen)}SET_HEADER_STATE(e){this.headerState=e}setHeaderState(e){this.SET_HEADER_STATE(e)}SET_FOOTER_STATE(e){this.footerState=e}setFooterState(e){this.SET_FOOTER_STATE(e)}SET_FORCE_REFRESH(e){this.forceRefresh=e}setForceRefresh(e){this.SET_FORCE_REFRESH(e)}SET_REFRESH_TIME_INTERVAL(e){this.refreshTimeInterval=e}setRefreshTimeInterval(e){this.SET_REFRESH_TIME_INTERVAL(e)}SET_TICK_TIME_INTERVAL(e){this.tickTimeInterval=e}setTickTimeInterval(e){this.SET_TICK_TIME_INTERVAL(e)}SET_TIME_RANGE_INTERVAL(e){this.timeRangeInterval=e}setTimeRangeInterval(e){this.SET_TIME_RANGE_INTERVAL(e)}};n([s["c"]],h.prototype,"SET_LEFT_DRAWER_OPEN",null),n([s["a"]],h.prototype,"setLeftDrawerOpen",null),n([s["a"]],h.prototype,"toggleLeftDrawer",null),n([s["c"]],h.prototype,"SET_RIGHT_DRAWER_OPEN",null),n([s["a"]],h.prototype,"setRightDrawerOpen",null),n([s["a"]],h.prototype,"toggleRightDrawer",null),n([s["c"]],h.prototype,"SET_HEADER_STATE",null),n([s["a"]],h.prototype,"setHeaderState",null),n([s["c"]],h.prototype,"SET_FOOTER_STATE",null),n([s["a"]],h.prototype,"setFooterState",null),n([s["c"]],h.prototype,"SET_FORCE_REFRESH",null),n([s["a"]],h.prototype,"setForceRefresh",null),n([s["c"]],h.prototype,"SET_REFRESH_TIME_INTERVAL",null),n([s["a"]],h.prototype,"setRefreshTimeInterval",null),n([s["c"]],h.prototype,"SET_TICK_TIME_INTERVAL",null),n([s["a"]],h.prototype,"setTickTimeInterval",null),n([s["c"]],h.prototype,"SET_TIME_RANGE_INTERVAL",null),n([s["a"]],h.prototype,"setTimeRangeInterval",null),h=n([Object(s["b"])({dynamic:!0,name:"layout",namespaced:!0,store:i["a"]})],h),t["e"]=h}}]);