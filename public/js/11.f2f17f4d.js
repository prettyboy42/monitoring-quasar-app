(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"7ba0":function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return s}));var a=r("fe09"),o=r("00f1");function i(e){return void 0===e||null===e||""===e}function s(e){const t=Date.now();switch(e){case o["c"].WHOLE_TODAY:return{from:a["e"].startOfDate(t,"day").getTime(),to:a["e"].endOfDate(t,"day").getTime()};case o["c"].TODAY_TO_NOW:return{from:a["e"].startOfDate(t,"day").getTime(),to:t};case o["c"].LAST_15_MINUTES:return{from:a["e"].subtractFromDate(t,{minutes:15}).getTime(),to:t};case o["c"].LAST_30_MINUTES:return{from:a["e"].subtractFromDate(t,{minutes:30}).getTime(),to:t};case o["c"].LAST_AN_HOUR:return{from:a["e"].subtractFromDate(t,{hours:1}).getTime(),to:t};case o["c"].LAST_2_HOURS:return{from:a["e"].subtractFromDate(t,{hours:2}).getTime(),to:t};case o["c"].LAST_4_HOURS:return{from:a["e"].subtractFromDate(t,{hours:4}).getTime(),to:t};case o["c"].LAST_8_HOURS:return{from:a["e"].subtractFromDate(t,{hours:8}).getTime(),to:t};case o["c"].LAST_12_HOURS:return{from:a["e"].subtractFromDate(t,{hours:12}).getTime(),to:t};case o["c"].LAST_24_HOURS:return{from:a["e"].subtractFromDate(t,{hours:24}).getTime(),to:t};case o["c"].LAST_7_DAYS:return{from:a["e"].subtractFromDate(t,{days:7}).getTime(),to:t};default:return{from:a["e"].startOfDate(t,"day").getTime(),to:a["e"].endOfDate(t,"day").getTime()}}}},a4e3:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("card-base",{style:e.chartStyle},[r("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[r("apexchart",{directives:[{name:"show",rawName:"v-show",value:e.showSimulatedReturnData,expression:"showSimulatedReturnData"}],ref:"realtimeChart",attrs:{type:"line",width:e.chartWidth,height:e.chartHeight,options:e.chartOptions,series:e.chartSeries}})],1),r("q-inner-loading",{attrs:{showing:e.visible}},[r("q-spinner-ios",{attrs:{size:"50px",color:"yellow"}})],1)],1)},o=[],i=r("9ab4"),s=r("60a3"),n=r("6fc5"),h=r("00f1"),c=r("4c9f"),l=r("b318"),d=r("7ba0"),m=r("9ba6");let u=class extends s["d"]{constructor(){var e;super(...arguments),this.smonStore=Object(n["e"])(c["a"],this.$store),this.layoutStore=Object(n["e"])(h["e"],this.$store),this.apiCaller=new l["a"],this.visible=!0,this.showSimulatedReturnData=!1,this.chartSeries=[],this.parentHeightOffset=15,this.defaultHeightChart=300,this.colors=["linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)","linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)","linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)","linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)"],this.chartOptions={theme:{mode:"light",palette:"palette1"},title:{text:this.chartTitle,align:"left",style:{color:"#131413"}},noData:{text:"Loading...",align:"center",verticalAlign:"middle",offsetX:0,offsetY:0,style:{color:"#a84a32",fontSize:"14px",fontFamily:"Helvetica, Arial"}},tooltip:{enabled:!0,enabledOnSeries:void 0,shared:!0,x:{show:!0,format:"dd MMM yyyy HH:mm:ss"}},chart:{id:this.chartId,group:this.chartGroup,parentHeightOffset:this.parentHeightOffset,type:"line",toolbar:{show:!0,tools:{download:!0,selection:!1,zoom:!0,zoomin:!0,zoomout:!0,pan:!1,reset:!0,customIcons:[{icon:'<img src="https://img.icons8.com/plasticine/100/000000/download-2.png" width="20">',index:3,title:"tooltip of the icon",class:"custom-icon",click:function(){}}]}},animations:{enabled:!1}},markers:{size:0},grid:{show:!0,strokeDashArray:0,xaxis:{lines:{show:!0}}},stroke:{curve:"smooth",width:1},dropShadow:{enabled:!0,opacity:.3,blur:5,left:-7,top:22},dataLabels:{enabled:!1},xaxis:{type:"datetime",labels:{style:{colors:"#a35822"},datetimeUTC:!1}},yaxis:{labels:{minWidth:40,style:{}},min:0},legend:{show:this.smonStore.enableChartLegend,showForSingleSeries:(null===(e=this.smonStore.currentMetric)||void 0===e?void 0:e.length)>1||!1,showForNullSeries:!0,showForZeroSeries:!0,position:this.smonStore.currentLegendType==m["d"].BY_DAY?"right":"bottom",inverseOrder:this.smonStore.currentLegendType==m["d"].BY_DAY,offsetY:5},responsive:[{breakpoint:1e3,options:{legend:{showForSingleSeries:!0,position:"bottom"},theme:{mode:"light",palette:"palette6"}}}]}}get minHeightChart(){return this.parentHeightOffset+this.defaultHeightChart}get maxHeightChart(){const e=10*this.parentHeightOffset+this.defaultHeightChart;return this.smonStore.chartList.length>1?e+180:e}get chartHeight(){return this.smonStore.chartList.length>1?"auto":this.maxHeightChart-this.parentHeightOffset}get chartStyle(){return`min-height:${this.minHeightChart}px;max-height:${this.maxHeightChart}px;`}created(){this.fecthChartSeries()}beforeDestroy(){this.$refs.realtimeChart.destroy()}toggleOnSpinner(){this.visible=!0,this.showSimulatedReturnData=!1}toggleOffSpinner(){this.visible=!1,this.showSimulatedReturnData=!0}handleToogleOnOffLegend(e){const t=this.smonStore.getFirstChart;t.id==this.chartId&&this.$refs.realtimeChart.updateOptions({legend:{show:e}},!1,!1,!0)}handleToogleOnOffSyncChart(e){this.$refs.realtimeChart.updateOptions({chart:{group:e?this.chartGroup:this.chartId}},!1,!1,!1)}handleToogleLegendType(e){this.$refs.realtimeChart.updateOptions({legend:{position:e==m["d"].BY_DAY?"right":"bottom",inverseOrder:this.smonStore.currentLegendType==m["d"].BY_DAY}},!1,!1,!0)}onChangedrequireRenderChart(e){e&&this.fecthChartSeries()}onChangedForceRefresh(e){e&&this.fecthChartSeries().then(()=>{this.layoutStore.setForceRefresh(!1)})}onChangedTickInterval(e){e>0&&this.fecthChartSeries()}onChangedTimeRangeInterval(){this.fecthChartSeries()}renderNodataChart(){this.$refs.realtimeChart.updateOptions({noData:{text:"No available data",style:{fontSize:"18px"}}},!1,!1,!1)}fecthChartSeries(){var e;return Object(i["a"])(this,void 0,void 0,(function*(){this.toggleOnSpinner();const t=Object(d["a"])(this.layoutStore.timeRangeInterval),r=[0,7].join(","),a=this.layoutStore.tickTimeInterval,o=this.smonStore.currentLegendType;try{const i=yield this.fetchChartData(t,r,a,o);i.data.error<0&&this.renderNodataChart();const s=(null===(e=i.data.data.result)||void 0===e?void 0:e.listSeries)||[];this.chartSeries=s}catch(i){this.$q.notify({color:"negative",position:"top",message:`fecthChartSeries failed. chartId:${this.chartId}, error:${i}`,icon:"report_problem"})}this.smonStore.setToggleRenderChart(!1),this.toggleOffSpinner()}))}fetchChartData(e,t,r,a){switch(this.smonStore.currentMetricType){case m["e"].PROFILER:return this.apiCaller.getChartData(this.smonStore.appName,this.smonStore.currentProfilerApi,this.smonStore.buildMetricParams,this.serverIp,e.from,e.to,t,r,a);case m["e"].TSERVER:return this.apiCaller.getChartDataTServer(this.smonStore.appName,this.smonStore.buildMetricParams,this.serverIp,e.from,e.to,t,r,a);case m["e"].HSERVER:return this.apiCaller.getChartDataHServer(this.smonStore.appName,this.smonStore.buildMetricParams,this.serverIp,e.from,e.to,t,r,a);case m["e"].ZEXECUTORS:return this.apiCaller.getChartDataExecutor(this.smonStore.appName,this.smonStore.zexecutorName,this.smonStore.buildMetricParams,this.serverIp,e.from,e.to,t,r,a);case m["e"].ZCOMWORKER:const o=this.smonStore.currentProfilerApi.split(" ");return this.apiCaller.getChartDataComServer(this.smonStore.appName,o[0],o[1],this.smonStore.buildMetricParams,this.serverIp,e.from,e.to,t,r,a);default:break}return Promise.reject()}};Object(i["b"])([Object(s["c"])({default:"0"})],u.prototype,"chartId",void 0),Object(i["b"])([Object(s["c"])({default:"defaultGroup"})],u.prototype,"chartGroup",void 0),Object(i["b"])([Object(s["c"])({default:"0.0.0.0"})],u.prototype,"serverIp",void 0),Object(i["b"])([Object(s["c"])({default:""})],u.prototype,"chartTitle",void 0),Object(i["b"])([Object(s["c"])({default:"100%"})],u.prototype,"chartWidth",void 0),Object(i["b"])([Object(s["e"])("smonStore.enableChartLegend")],u.prototype,"handleToogleOnOffLegend",null),Object(i["b"])([Object(s["e"])("smonStore.enableChartSync")],u.prototype,"handleToogleOnOffSyncChart",null),Object(i["b"])([Object(s["e"])("smonStore.chartLegendType")],u.prototype,"handleToogleLegendType",null),Object(i["b"])([Object(s["e"])("smonStore.requireRenderChart")],u.prototype,"onChangedrequireRenderChart",null),Object(i["b"])([Object(s["e"])("layoutStore.forceRefresh")],u.prototype,"onChangedForceRefresh",null),Object(i["b"])([Object(s["e"])("layoutStore.tickTimeInterval")],u.prototype,"onChangedTickInterval",null),Object(i["b"])([Object(s["e"])("layoutStore.timeRangeInterval")],u.prototype,"onChangedTimeRangeInterval",null),u=Object(i["b"])([Object(s["a"])({components:{CardBase:()=>r.e(3).then(r.bind(null,"fc8b"))}})],u);var p=u,g=p,f=r("2877"),b=Object(f["a"])(g,a,o,!1,null,null,null);t["default"]=b.exports}}]);