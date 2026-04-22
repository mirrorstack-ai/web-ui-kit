import{r as i,j as a}from"./iframe-Bfog1HX2.js";import{c as l}from"./cn-IyxL_b2c.js";import{I as M}from"./IconButton-nO6uksH4.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DtGXb8ao.js";import"./Icon-BJqkjzGm.js";import"./button-styles-DvQkePbc.js";function c(e){const{label:t,id:r,containerClassName:B,className:_,error:u=!1,helperText:P,disabled:f,multiline:s,maxLength:n}=e,[z,N]=i.useState(!1),[d,W]=i.useState(!1),y=!s&&e.showPasswordToggle,p=s?void 0:e.type??"text",k=y&&p==="password"?d?"text":"password":p,o=e.value,j=typeof o=="string"?o.length:0,C=s&&n!=null,F=C&&r?`${r}-counter`:void 0,I=e.placeholder,H=typeof o=="string"?o.length>0:!!o,T=z&&!H&&I?I:" ",O=e.onFocus,R=e.onBlur,V=S=>{N(!0),O?.(S)},E=S=>{N(!1),R?.(S)},L=l("peer w-full rounded-lg px-4 bg-transparent border-0 outline-none","text-on-surface transition-colors disabled:cursor-not-allowed",u?"focus:text-error":"focus:text-primary",s?C?"pt-3 pb-6 resize-none":"pt-3 pb-2 resize-none":"py-4",!s&&y&&p==="password"&&"pr-12",_),U=l("relative flex border rounded-lg transition-colors bg-surface-container-low",s?"items-start":"items-center",u?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",f&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),D=l("absolute text-base z-10 font-normal left-4 top-4 px-1","bg-surface-container-low rounded-md transition-all duration-200 ease-in-out","origin-top-left pointer-events-none","peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3","peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0","peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",u?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary");return a.jsxs("div",{className:l("relative",B),children:[a.jsxs("div",{className:U,children:[s?a.jsx("textarea",{id:r,disabled:f,maxLength:n,value:o,onChange:e.onChange,rows:e.rows,className:L,placeholder:T,"aria-describedby":F,onFocus:V,onBlur:E}):a.jsx("input",{id:r,disabled:f,maxLength:n,value:o,onChange:e.onChange,type:k,className:L,placeholder:T,onFocus:V,onBlur:E}),a.jsx("label",{htmlFor:r,className:D,children:t}),y&&p==="password"&&a.jsx(M,{icon:d?"visibility_off":"visibility",variant:"text",size:"sm",className:"absolute right-2 text-on-surface-variant hover:text-primary",onClick:()=>W(!d),"aria-label":d?"Hide password":"Show password",tabIndex:-1,type:"button"}),C&&a.jsxs("span",{id:F,"aria-live":"polite","aria-atomic":"true",className:l("absolute bottom-2 right-3 text-xs pointer-events-none",n&&j>n*.875?"text-error":"text-on-surface-variant"),children:[j,"/",n]})]}),P&&a.jsx("p",{className:l("text-xs mt-1 px-4",u?"text-error":"text-on-surface-variant"),children:P})]})}c.__docgenInfo={description:"",methods:[],displayName:"FloatingLabelInput"};const X={title:"UI/Inputs/FloatingLabelInput",component:c,args:{label:"Email",id:"email"}},m={},h={render:()=>{const[e,t]=i.useState("user@mirrorstack.ai");return a.jsx(c,{label:"Email",id:"email-filled",value:e,onChange:r=>t(r.target.value)})}},g={render:()=>{const[e,t]=i.useState("");return a.jsx(c,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>t(r.target.value)})}},b={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},x={render:()=>{const[e,t]=i.useState("");return a.jsx(c,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>t(r.target.value)})}},v={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},w={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...w.parameters?.docs?.source}}};const Y=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText"];export{v as Disabled,b as ErrorState,x as Multiline,g as Password,m as Playground,w as WithHelperText,h as WithValue,Y as __namedExportsOrder,X as default};
