"use strict";(self["webpackChunkpms"]=self["webpackChunkpms"]||[]).push([[461],{3461:function(e,l,a){a.r(l),a.d(l,{default:function(){return k}});var o=a(3396),n=a(9242),t=a(3311),s=a(2483),u=a(4870);const c={id:"login-page",class:"login-dark fixed-top",style:{"backdrop-filter":"blur(10px)"}},r={method:"post",style:{background:"rgba(15,25,35,0.9)"}},i=(0,o._)("div",{class:"illustration"},[(0,o._)("i",{class:"icon ion-ios-locked-outline"})],-1),p={class:"mb-3"},d=["onKeyup"],v={class:"mb-3"},m=["onKeyup"];var b={__name:"LoginView",setup(e){const l=(0,u.iH)(""),a=(0,u.iH)(""),b=(0,u.iH)(""),g=(0,u.iH)(""),k=(0,s.tv)();async function y(){if(""===g.value)return void(b.value="請輸入學號");if(""===a.value)return void(b.value="請輸入密碼");g.value=g.value.toUpperCase(),l.value=(0,t.Hi)(a.value);const e=await(0,t.sv)(g.value,l.value);e["access"]||(b.value="伺服器內部錯誤: 500"),e.access?(localStorage["nid"]=g.value.toLocaleUpperCase(),localStorage["token"]=e.token["x-access-token"],await(0,t.E6)(),k.replace("/dashboard")):b.value="學號或密碼不正確"}return(0,o.bv)((async()=>{if((0,t.Fc)()){const e=await(0,t.YM)();e.access?k.go(-1):(localStorage["nid"]=null,localStorage["token"]=null,k.replace("/"))}})),(e,l)=>{const t=(0,o.up)("AlertBlock");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("section",c,[(0,o._)("form",r,[i,(0,o._)("div",p,[(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":l[0]||(l[0]=e=>g.value=e),onKeyup:(0,n.D2)(y,["enter"]),id:"nid",class:"form-control",type:"text",name:"nid",placeholder:"學號",style:{"border-bottom-color":"rgb(112,128,146)"}},null,40,d),[[n.nr,g.value]])]),(0,o._)("div",v,[(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":l[1]||(l[1]=e=>a.value=e),onKeyup:(0,n.D2)(y,["enter"]),id:"login_password",autocomplete:"",class:"form-control",type:"password",name:"password",placeholder:"密碼"},null,40,m),[[n.nr,a.value]])]),(0,o._)("div",{class:"mb-3"},[(0,o._)("button",{onClick:y,class:"btn btn-primary d-block w-100",type:"button"},"登入")])])]),(0,o.Wm)(t,{message:b.value,onCloseBlock:l[2]||(l[2]=e=>b.value="")},null,8,["message"])])}}};const g=b;var k=g}}]);
//# sourceMappingURL=461.48a0b9b1.js.map