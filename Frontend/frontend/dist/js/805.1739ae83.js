"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[805],{5805:function(e,l,a){a.r(l),a.d(l,{default:function(){return W}});a(560);var t=a(3396),s=a(7139),n=a(9242),o=a(3311),c=a(2483),i=a(4870);const r={class:"card shadow my-3"},d={class:"card-header py-3"},u={class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},v={class:"card-body mh-100"},m={class:"row"},p={class:"col"},x=(0,t._)("div",{class:"row-xxl-5 text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"24px"}},"可選擇學生")],-1),_={class:"col text-center align-middle"},w=(0,t._)("br",null,null,-1),f={class:"col"},b={class:"col-xxl-2"},h=(0,t._)("div",{class:"row-xxl-5 text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"25px"}},"⠀")],-1),y=(0,t._)("div",{class:"row-xxl-5 text-center align-middle"},[(0,t._)("p",{class:"lead"},"搜尋")],-1),g={class:"row-xxl-2 text-center border-start-warning item"},k=(0,t._)("i",{class:"fa fa-save"},null,-1),z=(0,t._)("i",{class:"fa fa-download"},null,-1),D={class:"col"},U=(0,t._)("div",{class:"row-xxl-5 text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"24px"}},"已選學生")],-1),H={class:"col text-center align-middle"},C=(0,t._)("br",null,null,-1),I={class:"col"};var N={__name:"NewView",setup(e){const l=(0,c.tv)(),a=(0,c.tv)().currentRoute.value.params.projectID,N=(0,i.iH)(""),V=(0,i.iH)([]),W=(0,i.iH)([]),j=[{text:"NID",value:"nid",sortable:!0},{text:"姓名",value:"name",sortable:!0}],E=(0,i.iH)(""),F=[{text:"NID",value:"nid",sortable:!0},{text:"姓名",value:"name",sortable:!0}];function T(){console.log(V.value);for(const e of V.value)(0,o.F8)(e.nid,a);l.push(`/project/${a}/student`)}return(0,t.bv)((async()=>{const e=await(0,o.TF)(a);for(const l of e)W.value.push(l)})),(e,l)=>{const a=(0,t.up)("EasyDataTable"),o=(0,t.up)("router-link");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",r,[(0,t._)("div",d,[(0,t._)("p",u,(0,s.zw)(e.$route.name),1)]),(0,t._)("div",v,[(0,t._)("div",m,[(0,t._)("div",p,[x,(0,t._)("div",_,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control shadow-none","onUpdate:modelValue":l[0]||(l[0]=e=>N.value=e)},null,512),[[n.nr,N.value]])]),w,(0,t._)("div",f,[(0,t.Wm)(a,{headers:j,items:W.value,"items-selected":V.value,"onUpdate:itemsSelected":l[1]||(l[1]=e=>V.value=e),"show-index":"","search-value":N.value,alternating:""},null,8,["items","items-selected","search-value"])])]),(0,t._)("div",b,[h,y,(0,t._)("div",g,[(0,t._)("button",{class:"btn btn-primary shadow-none w-100 my-3",type:"button",onClick:T},[k,(0,t.Uk)("  儲存 ")]),(0,t.Wm)(o,{class:"btn btn-primary shadow-none w-100",role:"button",to:"import"},{default:(0,t.w5)((()=>[z,(0,t.Uk)("  從Excel 匯入 ")])),_:1})])]),(0,t._)("div",D,[U,(0,t._)("div",H,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control shadow-none","onUpdate:modelValue":l[2]||(l[2]=e=>E.value=e)},null,512),[[n.nr,E.value]])]),C,(0,t._)("div",I,[(0,t.Wm)(a,{headers:F,items:V.value,"show-index":"","search-value":E.value,alternating:""},null,8,["items","search-value"])])])])])])])}}};const V=N;var W=V}}]);
//# sourceMappingURL=805.1739ae83.js.map