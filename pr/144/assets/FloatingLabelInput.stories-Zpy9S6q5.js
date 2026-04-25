import{r as l,j as a}from"./iframe-CaEuFnh0.js";import{c}from"./cn-IyxL_b2c.js";import{I as K}from"./IconButton-7P1T7GrO.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-C1Q90pc-.js";import"./Icon-4ygUkr5v.js";import"./button-styles-DvQkePbc.js";function n(e){const{label:t,id:r,containerClassName:d,className:s,error:m=!1,helperText:z,disabled:T,size:W="md",hideLabel:p=!1,multiline:o,maxLength:u}=e,[O,U]=l.useState(!1),[g,$]=l.useState(!1),j=!o&&e.showPasswordToggle,h=o?void 0:e.type??"text",D=j&&h==="password"?g?"text":"password":h,i=e.value,V=typeof i=="string"?i.length:0,F=o&&u!=null,k=F&&r?`${r}-counter`:void 0,I=e.placeholder,M=typeof i=="string"?i.length>0:!!i,E=p?I||t:O&&!M&&I?I:" ",q=e.onFocus,A=e.onBlur,B=P=>{U(!0),q?.(P)},R=P=>{U(!1),A?.(P)},b=W==="sm",H=c("peer w-full rounded-lg bg-transparent border-0 outline-none","text-on-surface transition-colors disabled:cursor-not-allowed",m?"focus:text-error":"focus:text-primary",b?"px-3 text-sm":"px-4",o?F?"pt-3 pb-6 resize-none":"pt-3 pb-2 resize-none":b?"py-2.5":"py-4",!o&&j&&h==="password"&&"pr-12",s),G=c("relative flex border rounded-lg transition-colors bg-surface-container-low",o?"items-start":"items-center",m?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",T&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),_=b?"left-2.5":"left-3",J=c("absolute z-10 font-normal px-1","bg-surface-container-low rounded-md transition-all duration-200 ease-in-out","origin-top-left pointer-events-none",b?"text-sm left-3 top-2.5":"text-base left-4 top-4",`peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:${_}`,`peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:${_}`,m?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary");return a.jsxs("div",{className:c("relative",d),children:[a.jsxs("div",{className:G,children:[o?a.jsx("textarea",{id:r,disabled:T,maxLength:u,value:i,onChange:e.onChange,rows:e.rows,className:H,placeholder:E,"aria-label":p?t:void 0,"aria-describedby":k,onFocus:B,onBlur:R}):a.jsx("input",{id:r,disabled:T,maxLength:u,value:i,onChange:e.onChange,type:D,className:H,placeholder:E,"aria-label":p?t:void 0,onFocus:B,onBlur:R}),!p&&a.jsx("label",{htmlFor:r,className:J,children:t}),j&&h==="password"&&a.jsx(K,{icon:g?"visibility_off":"visibility",variant:"text",size:"sm",className:"absolute right-2 text-on-surface-variant hover:text-primary",onClick:()=>$(!g),"aria-label":g?"Hide password":"Show password",tabIndex:-1,type:"button"}),F&&a.jsxs("span",{id:k,"aria-live":"polite","aria-atomic":"true",className:c("absolute bottom-2 right-3 text-xs pointer-events-none",u&&V>u*.875?"text-error":"text-on-surface-variant"),children:[V,"/",u]})]}),z&&a.jsx("p",{className:c("text-xs mt-1 px-4",m?"text-error":"text-on-surface-variant"),children:z})]})}n.__docgenInfo={description:"",methods:[],displayName:"FloatingLabelInput"};const te={title:"UI/Inputs/FloatingLabelInput",component:n,args:{label:"Email",id:"email",size:"md",hideLabel:!1}},v={},x={render:()=>{const[e,t]=l.useState("user@mirrorstack.ai");return a.jsx(n,{label:"Email",id:"email-filled",value:e,onChange:r=>t(r.target.value)})}},f={render:()=>{const[e,t]=l.useState("");return a.jsx(n,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>t(r.target.value)})}},w={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},y={render:()=>{const[e,t]=l.useState("");return a.jsx(n,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>t(r.target.value)})}},S={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},C={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}},L={render:()=>{const[e,t]=l.useState(""),[r,d]=l.useState("");return a.jsxs("div",{className:"space-y-2 max-w-md",children:[a.jsx(n,{label:"Title",id:"link-title",size:"sm",value:e,onChange:s=>t(s.target.value)}),a.jsx(n,{label:"URL",id:"link-url",size:"sm",type:"url",value:r,onChange:s=>d(s.target.value)})]})}},N={render:()=>{const[e,t]=l.useState(""),[r,d]=l.useState("");return a.jsxs("div",{className:"flex gap-2 max-w-md",children:[a.jsx(n,{label:"Title",id:"link-title-hl",size:"sm",hideLabel:!0,value:e,onChange:s=>t(s.target.value),className:"w-1/3"}),a.jsx(n,{label:"URL",id:"link-url-hl",size:"sm",hideLabel:!0,type:"url",value:r,onChange:s=>d(s.target.value),className:"flex-1"})]})}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:"{}",...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...S.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...C.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="space-y-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title" size="sm" value={title} onChange={e => setTitle(e.target.value)} />
        <FloatingLabelInput label="URL" id="link-url" size="sm" type="url" value={url} onChange={e => setUrl(e.target.value)} />
      </div>;
  }
}`,...L.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="flex gap-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title-hl" size="sm" hideLabel value={title} onChange={e => setTitle(e.target.value)} className="w-1/3" />
        <FloatingLabelInput label="URL" id="link-url-hl" size="sm" hideLabel type="url" value={url} onChange={e => setUrl(e.target.value)} className="flex-1" />
      </div>;
  }
}`,...N.parameters?.docs?.source}}};const se=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText","Small","SmallHiddenLabel"];export{S as Disabled,w as ErrorState,y as Multiline,f as Password,v as Playground,L as Small,N as SmallHiddenLabel,C as WithHelperText,x as WithValue,se as __namedExportsOrder,te as default};
