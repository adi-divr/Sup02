(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[849],{2770:(e,t,a)=>{Promise.resolve().then(a.bind(a,259))},259:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>o});var s=a(5155);a(5579);var r=a(2115),l=a(1760),n=a(5565),u=a(6046);let i=()=>{let[e,t]=(0,r.useState)(""),[a,i]=(0,r.useState)(""),[o,d]=(0,r.useState)(""),[h,A]=(0,r.useState)(""),[c,g]=(0,r.useState)(""),[m,p]=(0,r.useState)(0),[x,b]=(0,r.useState)([]),j=(0,u.useSearchParams)(),v=(0,u.useRouter)(),y=null==j?void 0:j.get("selectedDate"),S=Number(null==j?void 0:j.get("slots")),N=async s=>{s.preventDefault();let r={name:o,mail:e,number:a,weighData:h,ageData:c};b(e=>[...e,r]),m+1<S?p(m+1):(sessionStorage.setItem("formData",JSON.stringify([...x,r])),sessionStorage.setItem("slotAndDate",JSON.stringify({selectedDate:y,slots:S})),v.push("/confirmPage")),t(""),i(""),d(""),A(""),g("")};return(0,r.useEffect)(()=>{x.length>0&&sessionStorage.setItem("formData",JSON.stringify(x))},[x]),(0,s.jsxs)("div",{className:"container",children:[(0,s.jsx)(n.default,{src:l.A,alt:"Logo",width:100,height:100}),(0,s.jsx)("p",{children:(0,s.jsx)("strong",{children:"TELL US MORE ABOUT YOURSELF"})}),(0,s.jsxs)("form",{onSubmit:N,children:[(0,s.jsx)("label",{htmlFor:"name",children:"Name:"}),(0,s.jsx)("input",{type:"text",id:"name",name:"name",value:o,onChange:e=>d(e.target.value),placeholder:"Your name..",required:!0}),(0,s.jsx)("label",{htmlFor:"mailbox",children:"Email:"}),(0,s.jsx)("input",{type:"email",id:"mailbox",value:e,onChange:e=>t(e.target.value),placeholder:"Your email..",required:!0}),(0,s.jsx)("label",{htmlFor:"mobilenum",children:"Mobile Number:"}),(0,s.jsx)("input",{type:"text",id:"mobilenum",value:a,onChange:e=>i(e.target.value),placeholder:"Your Mobile number..",required:!0}),(0,s.jsx)("p",{children:"Do you weigh below 100kg?"}),(0,s.jsxs)("div",{className:"radio-group",children:[(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"weighquery",value:"yes",checked:"yes"===h,onChange:e=>A(e.target.value)}),"Yes"]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"weighquery",value:"no",checked:"no"===h,onChange:e=>A(e.target.value)}),"No"]})]}),(0,s.jsx)("p",{children:"Are you over 18?"}),(0,s.jsxs)("div",{className:"radio-group",children:[(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"agequery",value:"yes",checked:"yes"===c,onChange:e=>g(e.target.value)}),"Yes"]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"agequery",value:"no",checked:"no"===c,onChange:e=>g(e.target.value)}),"No"]})]}),m+1<S?(0,s.jsx)("button",{type:"submit",children:"Next"}):(0,s.jsx)("button",{type:"submit",children:"Submit"})]})]})},o=()=>(0,s.jsx)(r.Suspense,{children:(0,s.jsx)(i,{})})},6046:(e,t,a)=>{"use strict";var s=a(6658);a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},5579:()=>{},1760:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});let s={src:"/<Sup02>/_next/static/media/logo.dbc2b4d9.png",height:99,width:115,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAG1BMVEVMaXEhGBL2eTrwdDoMDAwnGhL2Vzj/nT6XTSgH+lRRAAAACXRSTlMAJRtGTk11cx8rtz1lAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIklEQVR4nGNgQAJMTFAGMzNUgI0dIsTIysoIYbCwQBgQAAAFpAAy6yQnpAAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:7}}},e=>{var t=t=>e(e.s=t);e.O(0,[930,565,441,517,358],()=>t(2770)),_N_E=e.O()}]);