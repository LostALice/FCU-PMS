"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[163],{6163:function(l,e,a){a.r(e),a.d(e,{default:function(){return C}});a(4224),a(1121),a(7133);var s=a(3396),n=a(9242),t=a(3311),o=a(2483),u=a(4870);const r={class:"col-lg"},c={class:"row"},i={class:"col"},d={class:"card shadow my-3"},v=(0,s._)("div",{class:"card-header py-3"},[(0,s._)("p",{class:"text-primary m-0 fw-bold",style:{"font-size":"28px"}},"更改密碼")],-1),m=(0,s._)("input",{type:"text",name:"",autocomplete:"",value:"...",style:{display:"none"}},null,-1),p={class:"card-body"},w={class:"mb-3"},_=(0,s._)("label",{class:"form-label"},[(0,s._)("strong",null,"NID")],-1),f={class:"row"},b={class:"col"},y={class:"mb-3"},h=(0,s._)("label",{class:"form-label"},[(0,s._)("strong",null,"新密碼")],-1),g={class:"col"},x={class:"mb-3"},k=(0,s._)("label",{class:"form-label"},[(0,s._)("strong",null,"確認密碼")],-1),H=(0,s._)("i",{class:"fa fa-save"},null,-1);var U={__name:"PasswordView",setup(l){const e=(0,o.tv)(),a=(0,u.iH)(""),U=(0,u.iH)(""),A=(0,u.iH)(""),C=(0,u.iH)("");async function V(){if(A.value!=C.value)return U.value="密碼不一致",A.value="",void(C.value="");if(""==A.value)return U.value="新密碼不能為空",A.value="",void(C.value="");if(""==C.value)return U.value="舊密碼不能為空",A.value="",void(C.value="");if(A.value.length<8||C.value.length<8)return U.value="密碼至少8個字元以上",A.value="",void(C.value="");let l=new TextEncoder;const e=l.encode(A.value),s=await crypto.subtle.digest("SHA-256",e),n=Array.from(new Uint8Array(s)),o=n.map((l=>l.toString(16).padStart(2,"0"))).join(""),u=o,r=await(0,t.an)(a.value,u);200==r["status_code"]?U.value="更改成功":U.value=r}return(0,s.bv)((async()=>{3!=await(0,t.E6)()&&(e.replace("/dashboard"),console.log(":<"))})),(l,e)=>{const t=(0,s.up)("AlertBlock");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",c,[(0,s._)("div",i,[(0,s._)("div",d,[v,(0,s._)("form",null,[m,(0,s._)("div",p,[(0,s._)("div",w,[_,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>a.value=l),class:"form-control shadow-none",type:"text",autocomplete:"current-password",minlength:"8",maxlength:"50",required:""},null,512),[[n.nr,a.value]])]),(0,s._)("div",f,[(0,s._)("div",b,[(0,s._)("div",y,[h,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=l=>A.value=l),class:"form-control shadow-none",autocomplete:"new-password",show:"*",type:"password",minlength:"8",maxlength:"50",required:""},null,512),[[n.nr,A.value]])])]),(0,s._)("div",g,[(0,s._)("div",x,[k,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[2]||(e[2]=l=>C.value=l),autocomplete:"confirm-password",class:"form-control shadow-none",show:"*",type:"password",minlength:"8",maxlength:"50",required:""},null,512),[[n.nr,C.value]])])])]),(0,s._)("div",{class:"text-end"},[(0,s._)("button",{onClick:V,class:"btn btn-primary btn-sm shadow-none",type:"submit"},[H,(0,s.Uk)("  儲存 ")])])])])])])]),(0,s.Wm)(t,{message:U.value,onCloseBlock:e[3]||(e[3]=l=>U.value="")},null,8,["message"])])}}};const A=U;var C=A}}]);
//# sourceMappingURL=163.ca48ad92.js.map