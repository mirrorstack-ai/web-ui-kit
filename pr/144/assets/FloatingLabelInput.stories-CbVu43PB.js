import{r as i,j as a}from"./iframe-_BaFxkk3.js";import{c as l}from"./cn-IyxL_b2c.js";import{I as q}from"./IconButton-Dm4sMk1T.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-B56tC2QY.js";import"./Icon-Ca_FLQHU.js";import"./button-styles-DvQkePbc.js";function c(e){const{label:t,id:r,containerClassName:z,className:_,error:u=!1,helperText:N,disabled:y,size:W="md",multiline:s,maxLength:n}=e,[k,j]=i.useState(!1),[d,H]=i.useState(!1),S=!s&&e.showPasswordToggle,p=s?void 0:e.type??"text",O=S&&p==="password"?d?"text":"password":p,o=e.value,F=typeof o=="string"?o.length:0,C=s&&n!=null,I=C&&r?`${r}-counter`:void 0,T=e.placeholder,R=typeof o=="string"?o.length>0:!!o,V=k&&!R&&T?T:" ",U=e.onFocus,D=e.onBlur,E=P=>{j(!0),U?.(P)},L=P=>{j(!1),D?.(P)},m=W==="sm",B=l("peer w-full rounded-lg bg-transparent border-0 outline-none","text-on-surface transition-colors disabled:cursor-not-allowed",u?"focus:text-error":"focus:text-primary",m?"px-3 text-sm":"px-4",s?C?"pt-3 pb-6 resize-none":"pt-3 pb-2 resize-none":m?"py-2.5":"py-4",!s&&S&&p==="password"&&"pr-12",_),M=l("relative flex border rounded-lg transition-colors bg-surface-container-low",s?"items-start":"items-center",u?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",y&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),$=l("absolute z-10 font-normal px-1","bg-surface-container-low rounded-md transition-all duration-200 ease-in-out","origin-top-left pointer-events-none",m?"text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5":"text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3",m?"peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5":"peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",u?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary");return a.jsxs("div",{className:l("relative",z),children:[a.jsxs("div",{className:M,children:[s?a.jsx("textarea",{id:r,disabled:y,maxLength:n,value:o,onChange:e.onChange,rows:e.rows,className:B,placeholder:V,"aria-describedby":I,onFocus:E,onBlur:L}):a.jsx("input",{id:r,disabled:y,maxLength:n,value:o,onChange:e.onChange,type:O,className:B,placeholder:V,onFocus:E,onBlur:L}),a.jsx("label",{htmlFor:r,className:$,children:t}),S&&p==="password"&&a.jsx(q,{icon:d?"visibility_off":"visibility",variant:"text",size:"sm",className:"absolute right-2 text-on-surface-variant hover:text-primary",onClick:()=>H(!d),"aria-label":d?"Hide password":"Show password",tabIndex:-1,type:"button"}),C&&a.jsxs("span",{id:I,"aria-live":"polite","aria-atomic":"true",className:l("absolute bottom-2 right-3 text-xs pointer-events-none",n&&F>n*.875?"text-error":"text-on-surface-variant"),children:[F,"/",n]})]}),N&&a.jsx("p",{className:l("text-xs mt-1 px-4",u?"text-error":"text-on-surface-variant"),children:N})]})}c.__docgenInfo={description:"",methods:[],displayName:"FloatingLabelInput"};const Z={title:"UI/Inputs/FloatingLabelInput",component:c,args:{label:"Email",id:"email"}},h={},g={render:()=>{const[e,t]=i.useState("user@mirrorstack.ai");return a.jsx(c,{label:"Email",id:"email-filled",value:e,onChange:r=>t(r.target.value)})}},b={render:()=>{const[e,t]=i.useState("");return a.jsx(c,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>t(r.target.value)})}},x={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},f={render:()=>{const[e,t]=i.useState("");return a.jsx(c,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>t(r.target.value)})}},v={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},w={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"{}",...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};const ee=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText"];export{v as Disabled,x as ErrorState,f as Multiline,b as Password,h as Playground,w as WithHelperText,g as WithValue,ee as __namedExportsOrder,Z as default};
