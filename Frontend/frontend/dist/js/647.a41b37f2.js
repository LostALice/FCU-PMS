"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[647],{7647:function(a,e,t){t.r(e),t.d(e,{default:function(){return D}});t(560);var l=t(3396),s=t(7139),o=t(3311),r=t(2483),i=t(4870);const n={class:"card shadow my-3"},d={class:"card-header py-3"},c={class:"row"},u={class:"col-md-6 text-nowrap"},b={class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},p={class:"col-md-6 text-md-end dataTables_filter mt-1"},m={key:0,class:"btn-group",role:"group"},v=(0,l._)("i",{class:"fas fa-plus-circle fa-sm text-white-50"},null,-1),w={class:"card-body"},f=(0,l.uE)('<div class="row"><div class="col-md-6 text-nowrap"></div><div class="col-md-6"><div class="text-md-end dataTables_filter" id="dataTable_filter"><label class="form-label"><input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"></label></div></div></div>',1),_={class:"table-responsive table mt-2",id:"dataTable-1",role:"grid","aria-describedby":"dataTable_info"},h={class:"btn-group",role:"group"},y=(0,l._)("i",{class:"icon ion-android-upload"},null,-1),k=["onClick"],g=(0,l._)("i",{class:"icon ion-android-delete"},null,-1),x=[g];var T={__name:"PanelView",setup(a){const e=(0,r.tv)(),t=e.currentRoute.value.params.projectID,g=(0,i.iH)(localStorage["permissionLevel"]),T=(0,i.iH)([]),$=[{text:"標題",value:"title",sortable:!0},{text:"小組",value:"group",sortable:!0},{text:"公佈者",value:"uploader",sortable:!0},{text:"日期",value:"date",sortable:!0},{text:"狀態",value:"status",sortable:!0}];function D(a){confirm("確定刪除項目？")&&(T.value.splice(a.index-1,1),(0,o.CT)(a.assignmentUUID,t))}return g.value>1&&$.push({text:"選項",value:"operation",sortable:!0}),(0,l.bv)((async()=>{const a=await(0,o.lr)(t);if(Array.isArray(a))for(const e of a)e.date=e.date.replace("T"," "),T.value.push(e)})),(a,e)=>{const t=(0,l.up)("router-link"),o=(0,l.up)("EasyDataTable");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",n,[(0,l._)("div",d,[(0,l._)("div",c,[(0,l._)("div",u,[(0,l._)("p",b,(0,s.zw)(a.$route.name),1)]),(0,l._)("div",p,[g.value>1?((0,l.wg)(),(0,l.iD)("div",m,[(0,l.Wm)(t,{to:`${a.$route.path}/new`,class:"btn btn-primary btn-sm d-none d-sm-inline-block shadow-none",role:"button"},{default:(0,l.w5)((()=>[v,(0,l.Uk)(" 新增 ")])),_:1},8,["to"])])):(0,l.kq)("",!0)])])]),(0,l._)("div",w,[f,(0,l._)("div",_,[T.value?((0,l.wg)(),(0,l.j4)(o,{key:0,headers:$,items:T.value,"table-class-name":"customize-table","show-index":"",alternating:""},{"item-title":(0,l.w5)((e=>[(0,l.Wm)(t,{to:`${a.$route.path}/info/${e.assignmentUUID}`},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.title),1)])),_:2},1032,["to"])])),"item-operation":(0,l.w5)((e=>[(0,l._)("div",h,[(0,l.Wm)(t,{class:"btn btn-primary shadow-none",style:{background:"#23de7a",width:"42px"},to:`${a.$route.path}/${e.assignmentUUID}/submit`},{default:(0,l.w5)((()=>[y])),_:2},1032,["to"]),g.value>1?((0,l.wg)(),(0,l.iD)("button",{key:0,class:"btn btn-primary shadow-none",style:{background:"#e74a3b",width:"42px"},onClick:a=>D(e)},x,8,k)):(0,l.kq)("",!0)])])),_:1},8,["items"])):(0,l.kq)("",!0)])])])])}}};const $=T;var D=$}}]);
//# sourceMappingURL=647.a41b37f2.js.map