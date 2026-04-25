import{r as n,j as r}from"./iframe-CuVPeH-S.js";import{c as u}from"./cn-IyxL_b2c.js";import{I as A}from"./IconButton-D7HPnk4U.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-x7ycLvVZ.js";import"./Icon-BaEkxE82.js";import"./button-styles-DvQkePbc.js";function l(e){const{label:t,id:a,containerClassName:C,className:c,error:d=!1,helperText:F,disabled:T,size:R="md",multiline:s,maxLength:i}=e,[_,I]=n.useState(!1),[p,W]=n.useState(!1),j=!s&&e.showPasswordToggle,m=s?void 0:e.type??"text",H=j&&m==="password"?p?"text":"password":m,o=e.value,L=typeof o=="string"?o.length:0,N=s&&i!=null,V=N&&a?`${a}-counter`:void 0,z=e.placeholder,O=typeof o=="string"?o.length>0:!!o,E=_&&!O&&z?z:" ",D=e.onFocus,M=e.onBlur,B=P=>{I(!0),D?.(P)},U=P=>{I(!1),M?.(P)},h=R==="sm",k=u("peer w-full rounded-lg bg-transparent border-0 outline-none","text-on-surface transition-colors disabled:cursor-not-allowed",d?"focus:text-error":"focus:text-primary",h?"px-3 text-sm":"px-4",s?N?"pt-3 pb-6 resize-none":"pt-3 pb-2 resize-none":h?"py-2.5":"py-4",!s&&j&&m==="password"&&"pr-12",c),$=u("relative flex border rounded-lg transition-colors bg-surface-container-low",s?"items-start":"items-center",d?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",T&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),q=u("absolute z-10 font-normal px-1","bg-surface-container-low rounded-md transition-all duration-200 ease-in-out","origin-top-left pointer-events-none",h?"text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5":"text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3",h?"peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5":"peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",d?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary");return r.jsxs("div",{className:u("relative",C),children:[r.jsxs("div",{className:$,children:[s?r.jsx("textarea",{id:a,disabled:T,maxLength:i,value:o,onChange:e.onChange,rows:e.rows,className:k,placeholder:E,"aria-describedby":V,onFocus:B,onBlur:U}):r.jsx("input",{id:a,disabled:T,maxLength:i,value:o,onChange:e.onChange,type:H,className:k,placeholder:E,onFocus:B,onBlur:U}),r.jsx("label",{htmlFor:a,className:q,children:t}),j&&m==="password"&&r.jsx(A,{icon:p?"visibility_off":"visibility",variant:"text",size:"sm",className:"absolute right-2 text-on-surface-variant hover:text-primary",onClick:()=>W(!p),"aria-label":p?"Hide password":"Show password",tabIndex:-1,type:"button"}),N&&r.jsxs("span",{id:V,"aria-live":"polite","aria-atomic":"true",className:u("absolute bottom-2 right-3 text-xs pointer-events-none",i&&L>i*.875?"text-error":"text-on-surface-variant"),children:[L,"/",i]})]}),F&&r.jsx("p",{className:u("text-xs mt-1 px-4",d?"text-error":"text-on-surface-variant"),children:F})]})}l.__docgenInfo={description:"",methods:[],displayName:"FloatingLabelInput"};const ee={title:"UI/Inputs/FloatingLabelInput",component:l,args:{label:"Email",id:"email",size:"md"}},g={},b={render:()=>{const[e,t]=n.useState("user@mirrorstack.ai");return r.jsx(l,{label:"Email",id:"email-filled",value:e,onChange:a=>t(a.target.value)})}},v={render:()=>{const[e,t]=n.useState("");return r.jsx(l,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:a=>t(a.target.value)})}},x={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},f={render:()=>{const[e,t]=n.useState("");return r.jsx(l,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:a=>t(a.target.value)})}},w={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},y={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}},S={render:()=>{const[e,t]=n.useState(""),[a,C]=n.useState("");return r.jsxs("div",{className:"space-y-2 max-w-md",children:[r.jsx(l,{label:"Title",id:"link-title",size:"sm",value:e,onChange:c=>t(c.target.value)}),r.jsx(l,{label:"URL",id:"link-url",size:"sm",type:"url",value:a,onChange:c=>C(c.target.value)})]})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{}",...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="space-y-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title" size="sm" value={title} onChange={e => setTitle(e.target.value)} />
        <FloatingLabelInput label="URL" id="link-url" size="sm" type="url" value={url} onChange={e => setUrl(e.target.value)} />
      </div>;
  }
}`,...S.parameters?.docs?.source}}};const re=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText","Small"];export{w as Disabled,x as ErrorState,f as Multiline,v as Password,g as Playground,S as Small,y as WithHelperText,b as WithValue,re as __namedExportsOrder,ee as default};
