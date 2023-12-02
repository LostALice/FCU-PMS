"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[895,874],{8895:function(e,l,a){a.r(l),a.d(l,{default:function(){return N}});a(8858),a(1318),a(3228);var t=a(3396),s=a(7139),n=a(9242),o=a(3311),i=a(4874),c=a(2483),r=a(4870);const d={class:"card shadow mb-3"},u={class:"card-header py-3"},p={class:"row"},v={class:"col-md-6 text-nowrap"},_={class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},f=(0,t._)("i",{class:"icon ion-clipboard"},null,-1),m={class:"card-body"},b={class:"col"},w={class:"row"},y=(0,t._)("div",{class:"col col-4 justify-content-center"},[(0,t._)("p",{style:{"font-size":"24px","padding-left":"10px"}},"名稱")],-1),g={class:"col"},x={style:{"font-size":"24px",color:"rgb(38,38,38)"}},h={class:"row"},k=(0,t._)("div",{class:"col col-4 justify-content-center"},[(0,t._)("p",{style:{"font-size":"24px","padding-left":"10px"}},"小組")],-1),z={class:"col"},D={style:{"font-size":"24px",color:"rgb(38,38,38)"}},C={class:"row"},j=(0,t._)("div",{class:"col col-4 justify-content-center"},[(0,t._)("p",{style:{"font-size":"24px","padding-left":"10px"}},"分數")],-1),I={class:"col"},H={style:{"font-size":"24px",color:"rgb(38,38,38)"}},T={class:"row"},R=(0,t._)("div",{class:"col col-4 justify-content-center"},[(0,t._)("p",{style:{"font-size":"24px","padding-left":"10px"}},"權重")],-1),F={class:"col"},$={style:{"font-size":"24px",color:"rgb(38,38,38)"}},M={class:"row"},U=(0,t._)("div",{class:"col col-4 justify-content-center"},[(0,t._)("p",{style:{"font-size":"24px","padding-left":"10px"}},"繳交日期")],-1),B={class:"col"},E={style:{"font-size":"24px",color:"rgb(38,38,38)"}},S={class:"card shadow"},q=(0,t._)("div",{class:"card-header py-3"},[(0,t._)("p",{class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},"作業文件")],-1),A={class:"card-body"},L={class:"col"},V=["href","onClick","download"],W={class:"btn-group",role:"group"},O=["onClick"],Y=(0,t._)("i",{class:"icon ion-android-delete"},null,-1),G=[Y];var J={__name:"InfoView",setup(e){const l=(0,r.iH)(""),a=(0,r.iH)(""),Y=(0,r.iH)(""),J=(0,r.iH)(""),K=(0,r.iH)(""),N=(0,r.iH)(""),P=(0,r.iH)(""),Q=(0,c.tv)(),X=Q.currentRoute.value.params.projectID,Z=Q.currentRoute.value.params.assignmentID,ee=(0,r.iH)([]),le=[{text:"檔案名稱",value:"title",sortable:!0},{text:"上傳者",value:"author",sortable:!0},{text:"上載日期",value:"date",sortable:!0},{text:"選項",value:"operation"}];function ae(){const e=parseInt(prompt("分數","0-100"));e?e<=0||e>100?a.value="輸入錯誤":confirm("提交分數後學生不能再提交作業\n是否確定?")&&((0,o.hY)(Z,X,e),K.value=e,a.value="提交成功"):MessageChannel.value="輸入錯誤"}async function te(e){const l=e.filename.split(".").pop();let a=await(0,o.Rx)(X,e.taskID,e.fileID,e.filename);const t=URL.createObjectURL(new Blob([a],{type:`application/${l}`})),s=document.createElement("a");s.href=t,s.download=e.filename,s.style.display="none",document.body.appendChild(s),s.click(),s.remove()}function se(e){confirm("確定刪除項目？")&&(ee.value.splice(e.index-1,1),(0,o.xx)(e.taskID,e.fileID,e.author))}return(0,t.bv)((async()=>{const e=await(0,o.Sj)(X,Z);e.status_code||(N.value=e.assignment_name,J.value=e.group_name,K.value=e.mark,Y.value=e.weight,P.value=e.date.replace("T"," "),l.value=e.allowedFileTypes,e.assignment_file||(e.assignment_file=[]),ee.value=e.assignment_file)})),(e,o)=>{const c=(0,t.up)("EasyDataTable"),r=(0,t.up)("AlertBlock");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",d,[(0,t._)("div",u,[(0,t._)("div",p,[(0,t._)("div",v,[(0,t._)("p",_,(0,s.zw)(e.$route.name),1)]),(0,t._)("div",{class:"col-md-6 text-md-end dataTables_filter mt-1"},[(0,t._)("div",{class:"btn-group",role:"group"},[(0,t._)("button",{onClick:ae,class:"btn btn-primary btn-sm d-none d-sm-inline-block shadow-none",role:"button"},[f,(0,t.Uk)(" 評分 ")])])])])]),(0,t._)("div",m,[(0,t._)("div",b,[(0,t._)("div",w,[y,(0,t._)("div",g,[(0,t._)("p",x,(0,s.zw)(N.value),1)])]),(0,t._)("div",h,[k,(0,t._)("div",z,[(0,t._)("p",D,(0,s.zw)(J.value),1)])]),(0,t._)("div",C,[j,(0,t._)("div",I,[(0,t._)("p",H,(0,s.zw)(K.value),1)])]),(0,t._)("div",T,[R,(0,t._)("div",F,[(0,t._)("p",$,(0,s.zw)(Y.value),1)])]),(0,t._)("div",M,[U,(0,t._)("div",B,[(0,t._)("p",E,(0,s.zw)(P.value),1)])])])])]),(0,t._)("div",S,[q,(0,t._)("div",A,[(0,t._)("div",L,[N.value?((0,t.wg)(),(0,t.j4)(c,{key:0,headers:le,items:ee.value,"table-class-name":"customize-table","show-index":"",alternating:""},{"item-title":(0,t.w5)((e=>[(0,t._)("a",{href:`/download/${e.taskID}/${e.fileID}/${e.filename}`,onClick:[l=>te(e),o[0]||(o[0]=(0,n.iM)((()=>{}),["prevent"]))],download:e.filename},(0,s.zw)(e.filename),9,V)])),"item-operation":(0,t.w5)((e=>[(0,t._)("div",W,[(0,t._)("button",{class:"btn btn-primary shadow-none",style:{background:"#e74a3b",width:"42px"},onClick:l=>se(e)},G,8,O)])])),_:1},8,["items"])):(0,t.kq)("",!0)])])]),l.value?((0,t.wg)(),(0,t.j4)(i["default"],{key:0,allowedFileTypes:l.value},null,8,["allowedFileTypes"])):(0,t.kq)("",!0),(0,t.Wm)(r,{message:a.value,onCloseBlock:o[1]||(o[1]=e=>a.value="")},null,8,["message"])])}}};const K=J;var N=K},4874:function(e,l,a){a.r(l),a.d(l,{default:function(){return D}});a(560);var t=a(3396),s=a(9242),n=a(3311),o=a(2483),i=a(4870);const c={class:"card shadow my-3"},r=(0,t._)("div",{class:"card-header py-3"},[(0,t._)("p",{class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},"上載檔案")],-1),d={class:"card-body"},u={class:"row"},p={class:"col"},v={class:"row"},_=(0,t._)("div",{class:"col col-4"},[(0,t._)("p",{style:{"font-size":"24px"}},"作業文件")],-1),f={class:"col"},m=["accept"],b=(0,t._)("br",null,null,-1),w={class:"col"},y=(0,t._)("br",null,null,-1),g=(0,t._)("div",{class:"col",style:{"text-align":"left"}},[(0,t._)("div",null,[(0,t._)("label",null,"您可以將文件拖放到此處")])],-1),x=(0,t._)("i",{class:"icon ion-android-upload"},null,-1),h=(0,t._)("i",{class:"icon ion-android-delete"},null,-1);var k={__name:"SubmitView",props:{allowedFileTypes:String},setup(e){let l=e;const a=(0,i.iH)(l.allowedFileTypes);console.log(l.allowedFileTypes);const k=(0,i.iH)([]),z=(0,i.iH)([{text:"作業",value:"name",sortable:!0}]),D=(0,o.tv)(),C=D.currentRoute.value.params.projectID,j=D.currentRoute.value.params.assignmentID;function I(e){const l=e.target.files;for(const a of l)k.value.push({name:a.name,file:a})}function H(){k.value=[]}function T(e){e.preventDefault();const l=e.dataTransfer.files;R(l)}function R(e){for(const l of e)k.value.push({name:l.name,file:l})}function F(){for(const e of k.value)(0,n.AR)(C,j,e.name,e.file);D.push(`/project/${C}/assignment`)}return(e,l)=>{const n=(0,t.up)("EasyDataTable");return(0,t.wg)(),(0,t.iD)("div",{onDragover:l[0]||(l[0]=(0,s.iM)((()=>{}),["prevent"])),onDragenter:l[1]||(l[1]=(0,s.iM)((()=>{}),["prevent"])),onDragleave:l[2]||(l[2]=(0,s.iM)((()=>{}),["prevent"])),onDrop:T},[(0,t._)("div",c,[r,(0,t._)("div",d,[(0,t._)("div",u,[(0,t._)("div",p,[(0,t._)("div",v,[_,(0,t._)("div",f,[(0,t._)("input",{class:"form-control shadow-none",type:"file",onChange:I,multiple:"",accept:a.value},null,40,m)])])])]),b,(0,t._)("div",w,[(0,t.Wm)(n,{headers:z.value,items:k.value,"table-class-name":"customize-table","show-index":"",alternating:""},null,8,["headers","items"])]),y,(0,t._)("div",{class:"row"},[g,(0,t._)("div",{class:"col",style:{"text-align":"right"}},[(0,t._)("button",{class:"btn btn-primary shadow-none",type:"button",onClick:F},[x,(0,t.Uk)("上載 ")]),(0,t._)("button",{class:"btn btn-primary shadow-none mx-1",type:"button",onClick:H},[h,(0,t.Uk)("清除所有 ")])])])])])],32)}}};const z=k;var D=z}}]);
//# sourceMappingURL=895.1bc57290.js.map