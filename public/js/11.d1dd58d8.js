(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{4692:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("card-base",{style:e.chartStyle},[r("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[r("highcharts",{directives:[{name:"show",rawName:"v-show",value:e.showSimulatedReturnData,expression:"showSimulatedReturnData"}],ref:"realtimeChart",attrs:{"constructor-type":"chart",deepCopyOnUpdate:e.deepCopyOnUpdate,options:e.chartOptions,updateArgs:e.updateArgs}})],1),r("q-inner-loading",{attrs:{showing:e.visible}},[r("q-spinner-ios",{attrs:{size:"50px",color:"yellow"}})],1)],1)},o=[],i=r("9ab4"),n=r("60a3"),s=r("6fc5"),c=r("00f1"),h=r("4c9f"),l=r("b318"),d=r("7ba0"),u=r("9ba6");let p=class extends n["c"]{constructor(){super(...arguments),this.smonStore=Object(s["e"])(h["a"],this.$store),this.layoutStore=Object(s["e"])(c["e"],this.$store),this.apiCaller=new l["a"],this.visible=!0,this.showSimulatedReturnData=!1,this.deepCopyOnUpdate=!1,this.updateArgs=[!0,!0,{duration:1e3}],this.colors=["linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)","linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)","linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)","linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)"],this.chartOptions={chart:{type:"spline",zoomType:"x"},title:{text:this.chartTitle},subtitle:{text:""},yAxis:{title:{text:""}},xAxis:{type:"datetime",accessibility:{rangeDescription:"Range: 2010 to 2017"},crosshair:!0},legend:{layout:"horizontal",horizontalAlign:"middle"},tooltip:{enabled:!0,split:!1,shared:!0,crosshairs:!0},plotOptions:{spline:{lineWidth:2,dataLabels:{enabled:!1},marker:{enabled:!1}},series:{turboThreshold:5e3}},series:[],noData:{style:{fontWeight:"bold",fontSize:"18px",color:"#a87732"}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}get chartStyle(){return`min-height:${this.chartHeight}px;max-height:450px;`}created(){this.fecthChartSeries()}toggleOnSpinner(){this.visible=!0,this.showSimulatedReturnData=!1}toggleOffSpinner(){this.visible=!1,this.showSimulatedReturnData=!0}handleOnChangedScreen(e){this.fecthChartSeries().then(()=>{this.$refs.realtimeChart.chart.reflow()})}handleToogleOnOffLegend(e){this.chartOptions=Object.assign({},this.chartOptions,{legend:{enabled:e}})}handleToogleLegendType(e){this.fecthChartSeries().then(()=>{this.chartOptions=Object.assign({},this.chartOptions,{legend:{layout:e==u["b"].BY_DAY?"vertical":"horizontal",align:e==u["b"].BY_DAY?"right":"center",reversed:e==u["b"].BY_DAY,verticalAlign:e==u["b"].BY_DAY?"top":"bottom"}})})}onChangedrequireRenderChart(e){e&&this.fecthChartSeries()}onChangedForceRefresh(e){e&&this.fecthChartSeries().then(()=>{this.layoutStore.setForceRefresh(!1)})}onChangedTickInterval(e){e>0&&this.fecthChartSeries()}onChangedTimeRangeInterval(){this.fecthChartSeries()}fecthChartSeries(){var e;return Object(i["a"])(this,void 0,void 0,(function*(){this.toggleOnSpinner();const t=Object(d["a"])(this.layoutStore.timeRangeInterval),r=[0,7].join(","),a=this.layoutStore.tickTimeInterval,o=this.smonStore.currentLegendType;try{const i=yield this.apiCaller.getChartData(this.smonStore.appName,this.smonStore.currentProfilerApi,this.smonStore.buildMetricParams,this.serverIp,t.from,t.to,r,a,o),n=(null===(e=i.data.data.result)||void 0===e?void 0:e.listSeries)||[];this.chartOptions=Object.assign({},this.chartOptions,{series:n})}catch(i){this.$q.notify({color:"negative",position:"top",message:`fecthChartSeries failed. chartId:${this.chartId}, error:${i}`,icon:"report_problem"})}this.smonStore.setToggleRenderChart(!1),this.toggleOffSpinner()}))}};Object(i["b"])([Object(n["b"])({default:"0"})],p.prototype,"chartId",void 0),Object(i["b"])([Object(n["b"])({default:"defaultGroup"})],p.prototype,"chartGroup",void 0),Object(i["b"])([Object(n["b"])({default:"0.0.0.0"})],p.prototype,"serverIp",void 0),Object(i["b"])([Object(n["b"])({default:""})],p.prototype,"chartTitle",void 0),Object(i["b"])([Object(n["b"])({default:"100%"})],p.prototype,"chartWidth",void 0),Object(i["b"])([Object(n["b"])({default:"300"})],p.prototype,"chartHeight",void 0),Object(i["b"])([Object(n["d"])("layoutStore.leftDrawerOpen")],p.prototype,"handleOnChangedScreen",null),Object(i["b"])([Object(n["d"])("smonStore.enableChartLegend")],p.prototype,"handleToogleOnOffLegend",null),Object(i["b"])([Object(n["d"])("smonStore.chartLegendType")],p.prototype,"handleToogleLegendType",null),Object(i["b"])([Object(n["d"])("smonStore.requireRenderChart")],p.prototype,"onChangedrequireRenderChart",null),Object(i["b"])([Object(n["d"])("layoutStore.forceRefresh")],p.prototype,"onChangedForceRefresh",null),Object(i["b"])([Object(n["d"])("layoutStore.tickTimeInterval")],p.prototype,"onChangedTickInterval",null),Object(i["b"])([Object(n["d"])("layoutStore.timeRangeInterval")],p.prototype,"onChangedTimeRangeInterval",null),p=Object(i["b"])([Object(n["a"])({components:{CardBase:()=>r.e(2).then(r.bind(null,"fc8b"))}})],p);var b=p,g=b,m=r("2877"),O=Object(m["a"])(g,a,o,!1,null,null,null);t["default"]=O.exports},"7ba0":function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return n}));var a=r("fe09"),o=r("00f1");function i(e){return void 0===e||null===e||""===e}function n(e){const t=Date.now();switch(e){case o["c"].WHOLE_TODAY:return{from:a["c"].startOfDate(t,"day").getTime(),to:a["c"].endOfDate(t,"day").getTime()};case o["c"].TODAY_TO_NOW:return{from:a["c"].startOfDate(t,"day").getTime(),to:t};case o["c"].LAST_15_MINUTES:return{from:a["c"].subtractFromDate(t,{minutes:15}).getTime(),to:t};case o["c"].LAST_30_MINUTES:return{from:a["c"].subtractFromDate(t,{minutes:30}).getTime(),to:t};case o["c"].LAST_AN_HOUR:return{from:a["c"].subtractFromDate(t,{hours:1}).getTime(),to:t};case o["c"].LAST_2_HOURS:return{from:a["c"].subtractFromDate(t,{hours:2}).getTime(),to:t};case o["c"].LAST_4_HOURS:return{from:a["c"].subtractFromDate(t,{hours:4}).getTime(),to:t};case o["c"].LAST_8_HOURS:return{from:a["c"].subtractFromDate(t,{hours:8}).getTime(),to:t};case o["c"].LAST_12_HOURS:return{from:a["c"].subtractFromDate(t,{hours:12}).getTime(),to:t};case o["c"].LAST_24_HOURS:return{from:a["c"].subtractFromDate(t,{hours:24}).getTime(),to:t};case o["c"].LAST_7_DAYS:return{from:a["c"].subtractFromDate(t,{days:7}).getTime(),to:t};default:return{from:a["c"].startOfDate(t,"day").getTime(),to:a["c"].endOfDate(t,"day").getTime()}}}}}]);