"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[344],{6344:function(e,a,s){s.r(a),s.d(a,{default:function(){return k}});s(560);var l=s(3396),t=s(7139),o=s(9242),r=s(3311),n=s(2483),c=s(4870);const u={class:"card shadow my-3"},i={class:"card-header py-3"},d={class:"row"},v={class:"col-md-6 text-nowrap"},m={class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},p={class:"card-body"},b={class:"row"},f=(0,l._)("div",{class:"col-md-6 text-nowrap"},null,-1),h={class:"col-md-6"},w={class:"text-md-end dataTables_filter"},_={class:"form-label"},g="timestamp",y="desc";var x={__name:"LoggingView",setup(e){const a=(0,n.tv)(),s=(0,c.iH)(""),x=(0,c.iH)([]),T=(0,c.iH)(""),k=[{text:"時間",value:"timestamp",sortable:!0},{text:"事件",value:"event",sortable:!0},{text:"參數",value:"args",sortable:!0}];return(0,l.bv)((async()=>{if(T.value="Warning: You are using admin tool, be careful for those function.",3!=await(0,r.E6)())return T.value="YOU SHALL NOT PASS",a.replace("/dashboard"),void console.log(":<");const e=await(0,r.Bd)();for(const a of e){const e={timestamp:a["DATE"].replace("T"," "),event:a["EVENT"],args:a["ARGs"]};x.value.push(e)}})),(e,a)=>{const r=(0,l.up)("EasyDataTable"),n=(0,l.up)("AlertBlock");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",u,[(0,l._)("div",i,[(0,l._)("div",d,[(0,l._)("div",v,[(0,l._)("p",m,(0,t.zw)(e.$route.name),1)])])]),(0,l._)("div",p,[(0,l._)("div",b,[f,(0,l._)("div",h,[(0,l._)("div",w,[(0,l._)("label",_,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>s.value=e),type:"search",class:"form-control form-control-sm shadow-none","aria-controls":"dataTable",placeholder:"Search"},null,512),[[o.nr,s.value]])])])])]),(0,l.Wm)(r,{headers:k,items:x.value,"sort-by":g,"sort-type":y,"search-value":s.value,"table-class-name":"customize-table","show-index":"",alternating:""},null,8,["items","search-value"])])]),(0,l.Wm)(n,{message:T.value,onCloseBlock:a[1]||(a[1]=e=>T.value="")},null,8,["message"])])}}};const T=x;var k=T}}]);
//# sourceMappingURL=344.947d48db.js.map