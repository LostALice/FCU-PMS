"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[707],{8707:function(e,l,a){a.r(l),a.d(l,{default:function(){return O}});var t=a(3396),s=a(7139),n=a(9242),i=a(3311),o=a(2483),c=a(4870);const d={class:"card shadow my-3"},u={class:"card-header py-3"},r={class:"row"},v={class:"col-md-6 text-nowrap"},m={class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},p=(0,t._)("i",{class:"fas fa-save fa-sm text-white-50"},null,-1),_={class:"card-body mh-100"},h={class:"row"},w=(0,t._)("div",{class:"col col-4"},[(0,t._)("p",{style:{"font-size":"24px"}},"小組名稱")],-1),f={class:"col"},y=(0,t._)("hr",null,null,-1),x={class:"row"},b={class:"col"},g=(0,t._)("div",{class:"col text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"24px"}},"可選擇教授")],-1),k={class:"col text-center align-middle"},H=(0,t._)("br",null,null,-1),j={class:"col"},C=(0,t._)("div",{class:"col text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"24px"}},"已選教授")],-1),I={class:"col text-center align-middle"},U=(0,t._)("br",null,null,-1),S=(0,t._)("br",null,null,-1),z={class:"row"},V={class:"col"},A=(0,t._)("div",{class:"col text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"24px"}},"可選擇學生")],-1),D={class:"col text-center align-middle"},W=(0,t._)("br",null,null,-1),L={class:"col"},Q=(0,t._)("div",{class:"col text-center align-middle"},[(0,t._)("p",{class:"lead",style:{"font-size":"24px"}},"已選學生")],-1),N={class:"col text-center align-middle"},B=(0,t._)("br",null,null,-1);var G={__name:"NewView",setup(e){const l=(0,o.tv)(),a=l.currentRoute.value.params.projectID,G=(0,c.iH)(""),J=(0,c.iH)(""),O=(0,c.iH)(""),T=(0,c.iH)(""),E=(0,c.iH)([]),R=(0,c.iH)([]),$=(0,c.iH)([]),q=(0,c.iH)([]),F=[{text:"學號",value:"nid",sortable:!0},{text:"姓名",value:"name",sortable:!0}],K=(0,c.iH)(""),M=(0,c.iH)("");async function P(){if(JSON.parse(JSON.stringify(R.value))==[])return void(J.value="必須選擇至少一名學生");if(!G.value)return void(J.value="沒有組別名稱");const e=await(0,i.jo)();for(const l of E.value){const t=await(0,i.Ij)(a,l.nid,G.value,e.GID);if(400==t.status_code)return void(J.value="SQLInjectionCheck: "+t["SQLInjectionCheck"])}for(const l of R.value){const t=await(0,i.Ij)(a,l.nid,G.value,e.GID);if(400==t.status_code)return void(J.value="SQLInjectionCheck: "+t["SQLInjectionCheck"])}l.go(-1)}return(0,t.bv)((async()=>{const e=await(0,i.gU)(a),l=await(0,i.pV)(a);Array.isArray(e)&&Array.isArray(l)&&($.value=e,q.value=l)})),(e,l)=>{const a=(0,t.up)("EasyDataTable"),i=(0,t.up)("AlertBlock");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",d,[(0,t._)("div",u,[(0,t._)("div",r,[(0,t._)("div",v,[(0,t._)("p",m,(0,s.zw)(e.$route.name),1)]),(0,t._)("div",{class:"col-md-6 text-md-end dataTables_filter mt-1"},[(0,t._)("div",{class:"btn-group",role:"group"},[(0,t._)("button",{class:"btn btn-primary btn-sm d-none d-sm-inline-block shadow-none",role:"button",onClick:P},[p,(0,t.Uk)(" 儲存 ")])])])])]),(0,t._)("div",_,[(0,t._)("div",h,[w,(0,t._)("div",f,[(0,t.wy)((0,t._)("input",{class:(0,s.C_)(["form-control w-100 shadow-none",G.value?"":"alert-danger border-danger"]),type:"text","onUpdate:modelValue":l[0]||(l[0]=e=>G.value=e)},null,2),[[n.nr,G.value]]),(0,t._)("span",{style:(0,s.j5)(G.value?"visibility:hidden":""),class:"tooltiptext"},"*必需項目",4)])]),y,(0,t._)("div",null,[(0,t._)("div",x,[(0,t._)("div",b,[g,(0,t._)("div",k,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control shadow-none","onUpdate:modelValue":l[1]||(l[1]=e=>O.value=e),placeholder:"搜尋"},null,512),[[n.nr,O.value]])]),H,(0,t.Wm)(a,{headers:F,items:$.value,"items-selected":E.value,"onUpdate:itemsSelected":l[2]||(l[2]=e=>E.value=e),"show-index":"","search-value":O.value,alternating:""},null,8,["items","items-selected","search-value"])]),(0,t._)("div",j,[C,(0,t._)("div",I,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control shadow-none","onUpdate:modelValue":l[3]||(l[3]=e=>K.value=e),placeholder:"搜尋"},null,512),[[n.nr,K.value]])]),U,(0,t.Wm)(a,{headers:F,items:E.value,"show-index":"","search-value":K.value,alternating:""},null,8,["items","search-value"])])])]),S,(0,t._)("div",null,[(0,t._)("div",z,[(0,t._)("div",V,[A,(0,t._)("div",D,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control shadow-none","onUpdate:modelValue":l[4]||(l[4]=e=>T.value=e),placeholder:"搜尋"},null,512),[[n.nr,T.value]])]),W,(0,t.Wm)(a,{headers:F,items:q.value,"items-selected":R.value,"onUpdate:itemsSelected":l[5]||(l[5]=e=>R.value=e),"show-index":"","search-value":T.value,alternating:""},null,8,["items","items-selected","search-value"])]),(0,t._)("div",L,[Q,(0,t._)("div",N,[(0,t.wy)((0,t._)("input",{type:"text",class:"form-control shadow-none","onUpdate:modelValue":l[6]||(l[6]=e=>M.value=e),placeholder:"搜尋"},null,512),[[n.nr,M.value]])]),B,(0,t.Wm)(a,{headers:F,items:R.value,"show-index":"","search-value":M.value,alternating:""},null,8,["items","search-value"])])])])])]),(0,t.Wm)(i,{message:J.value,onCloseBlock:l[7]||(l[7]=e=>J.value="")},null,8,["message"])])}}};const J=G;var O=J}}]);
//# sourceMappingURL=707.3bbb8b00.js.map