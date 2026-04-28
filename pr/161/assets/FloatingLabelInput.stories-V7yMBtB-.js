import{r as l,j as a}from"./iframe-FTbIt3N-.js";import{c}from"./cn-IyxL_b2c.js";import{I as J}from"./IconButton-BTrrO8Gx.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DKr5bRev.js";import"./Icon-ByLXQD10.js";import"./button-styles-DvQkePbc.js";function o(e){const{label:t,id:r,containerClassName:d,className:s,error:m=!1,helperText:z,disabled:N,size:_="md",hideLabel:p=!1,multiline:n,maxLength:u}=e,[W,U]=l.useState(!1),[h,O]=l.useState(!1),T=!n&&e.showPasswordToggle,g=n?void 0:e.type??"text",D=T&&g==="password"?h?"text":"password":g,i=e.value,V=typeof i=="string"?i.length:0,j=n&&u!=null,k=j&&r?`${r}-counter`:void 0,F=e.placeholder,M=typeof i=="string"?i.length>0:!!i,E=p?F||t:W&&!M&&F?F:" ",$=e.onFocus,q=e.onBlur,B=P=>{U(!0),$?.(P)},R=P=>{U(!1),q?.(P)},I=_==="sm",H=c("peer w-full rounded-lg bg-transparent border-0 outline-none","text-on-surface transition-colors disabled:cursor-not-allowed",m?"focus:text-error":"focus:text-primary",I?"px-3 text-sm":"px-4",n?j?"pt-3 pb-6 resize-none":"pt-3 pb-2 resize-none":I?"py-2.5":"py-4",!n&&T&&g==="password"&&"pr-12",s),A=c("relative flex border rounded-lg transition-colors bg-surface-container-low",n?"items-start":"items-center",m?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",N&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),G=c("absolute z-10 font-normal px-1","bg-surface-container-low rounded-md transition-all duration-200 ease-in-out","origin-top-left pointer-events-none",I?"text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5":"text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",m?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary");return a.jsxs("div",{className:c("relative",d),children:[a.jsxs("div",{className:A,children:[n?a.jsx("textarea",{id:r,disabled:N,maxLength:u,value:i,onChange:e.onChange,rows:e.rows,className:H,placeholder:E,"aria-label":p?t:void 0,"aria-describedby":k,onFocus:B,onBlur:R}):a.jsx("input",{id:r,disabled:N,maxLength:u,value:i,onChange:e.onChange,type:D,className:H,placeholder:E,"aria-label":p?t:void 0,onFocus:B,onBlur:R}),!p&&a.jsx("label",{htmlFor:r,className:G,children:t}),T&&g==="password"&&a.jsx(J,{icon:h?"visibility_off":"visibility",variant:"text",size:"sm",className:"absolute right-2 text-on-surface-variant hover:text-primary",onClick:()=>O(!h),"aria-label":h?"Hide password":"Show password",tabIndex:-1,type:"button"}),j&&a.jsxs("span",{id:k,"aria-live":"polite","aria-atomic":"true",className:c("absolute bottom-2 right-3 text-xs pointer-events-none",u&&V>u*.875?"text-error":"text-on-surface-variant"),children:[V,"/",u]})]}),z&&a.jsx("p",{className:c("text-xs mt-1 px-4",m?"text-error":"text-on-surface-variant"),children:z})]})}o.__docgenInfo={description:"",methods:[],displayName:"FloatingLabelInput"};const re={title:"UI/Inputs/FloatingLabelInput",component:o,args:{label:"Email",id:"email",size:"md",hideLabel:!1}},b={},v={render:()=>{const[e,t]=l.useState("user@mirrorstack.ai");return a.jsx(o,{label:"Email",id:"email-filled",value:e,onChange:r=>t(r.target.value)})}},x={render:()=>{const[e,t]=l.useState("");return a.jsx(o,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>t(r.target.value)})}},f={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},w={render:()=>{const[e,t]=l.useState("");return a.jsx(o,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>t(r.target.value)})}},y={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},S={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}},C={render:()=>{const[e,t]=l.useState(""),[r,d]=l.useState("");return a.jsxs("div",{className:"space-y-2 max-w-md",children:[a.jsx(o,{label:"Title",id:"link-title",size:"sm",value:e,onChange:s=>t(s.target.value)}),a.jsx(o,{label:"URL",id:"link-url",size:"sm",type:"url",value:r,onChange:s=>d(s.target.value)})]})}},L={render:()=>{const[e,t]=l.useState(""),[r,d]=l.useState("");return a.jsxs("div",{className:"flex gap-2 max-w-md",children:[a.jsx(o,{label:"Title",id:"link-title-hl",size:"sm",hideLabel:!0,value:e,onChange:s=>t(s.target.value),className:"w-1/3"}),a.jsx(o,{label:"URL",id:"link-url-hl",size:"sm",hideLabel:!0,type:"url",value:r,onChange:s=>d(s.target.value),className:"flex-1"})]})}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:"{}",...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...S.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="space-y-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title" size="sm" value={title} onChange={e => setTitle(e.target.value)} />
        <FloatingLabelInput label="URL" id="link-url" size="sm" type="url" value={url} onChange={e => setUrl(e.target.value)} />
      </div>;
  }
}`,...C.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="flex gap-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title-hl" size="sm" hideLabel value={title} onChange={e => setTitle(e.target.value)} className="w-1/3" />
        <FloatingLabelInput label="URL" id="link-url-hl" size="sm" hideLabel type="url" value={url} onChange={e => setUrl(e.target.value)} className="flex-1" />
      </div>;
  }
}`,...L.parameters?.docs?.source}}};const te=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText","Small","SmallHiddenLabel"];export{y as Disabled,f as ErrorState,w as Multiline,x as Password,b as Playground,C as Small,L as SmallHiddenLabel,S as WithHelperText,v as WithValue,te as __namedExportsOrder,re as default};
