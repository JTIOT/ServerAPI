(this.webpackJsonpresetpass=this.webpackJsonpresetpass||[]).push([[0],{30:function(e,t,a){e.exports=a(60)},35:function(e,t,a){},5:function(e,t,a){e.exports={overlay:"resetPassword_overlay__1cQKp",title:"resetPassword_title__2fmLy",errorMessage:"resetPassword_errorMessage__nrrqs",resetSuccess:"resetPassword_resetSuccess__2PbGs",content:"resetPassword_content__17lvx",inputGroup:"resetPassword_inputGroup__31qGS"}},54:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(26),c=a.n(r),o=(a(35),a(7)),l=a(13),u=a.n(l),i=a(9),m=a(27),d=a.n(m),p=a(5),w=a.n(p),v=function(e){var t=e.match.params,a=t.userId,r=t.token,c=Object(s.useState)(!1),o=Object(i.a)(c,2),l=o[0],m=o[1],p=Object(s.useState)(""),v=Object(i.a)(p,2),f=v[0],E=v[1],b=Object(s.useState)(""),h=Object(i.a)(b,2),_=h[0],g=h[1],P=Object(s.useState)(""),N=Object(i.a)(P,2),j=N[0],y=N[1],O=Object(s.useState)(""),S=Object(i.a)(O,2),k=S[0],x=S[1];Object(s.useEffect)((function(){y(f||_?f===_&&f&&_?"":"Password is not matched":"Please, enter your new password")}),[f,_]);return n.a.createElement("div",{className:w.a.overlay},n.a.createElement("div",{className:w.a.title},"Reset password"),k?n.a.createElement("div",{className:w.a.errorMessage},k):null,j?n.a.createElement("div",{className:w.a.errorMessage},j):null,l?n.a.createElement("div",{className:w.a.resetSuccess},"Reset password success!!!"):n.a.createElement("form",{className:w.a.content,onSubmit:function(e){e.preventDefault(),j||d.a.post("http://192.168.5.137:3100/user/resetPassword",{userId:a,newPassword:f,token:r}).then((function(e){e&&e.data&&m(!0)})).catch((function(e){var t;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(console.log(e),!e.response){a.next=6;break}return a.next=4,u.a.awrap(e.response.data);case 4:t=a.sent,x(t.message);case 6:case"end":return a.stop()}}))}))}},n.a.createElement("div",{className:w.a.inputGroup},n.a.createElement("label",null,"NewPassword"),n.a.createElement("input",{className:w.a.passwordField,type:"password",onChange:function(e){return E(e.target.value)},required:!0})),n.a.createElement("div",{className:w.a.inputGroup},n.a.createElement("label",null,"Confirm password"),n.a.createElement("input",{className:w.a.confirmPasswordField,type:"password",onChangeCapture:function(e){return g(e.target.value)},required:!0})),j?null:n.a.createElement("div",{className:w.a.submitBtn},n.a.createElement("button",{type:"submit"},"Submit"))))};a(54);var f=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(o.c,null,n.a.createElement(o.a,{exact:!0,path:"/",render:function(){return n.a.createElement("div",null,"hello")}}),n.a.createElement(o.a,{exact:!0,path:"/resetPassword/:userId/:token",component:v})))},E=a(12);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(E.a,null,n.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.ad28d8ef.chunk.js.map