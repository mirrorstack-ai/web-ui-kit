import{r as t,j as s}from"./iframe-osEQ8Exb.js";import{F as l}from"./FloatingLabelInput-Bu1reARq.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-CjLXCRZ-.js";import"./Progress-9xf74Ert.js";import"./Icon-CO5ZwSdw.js";import"./button-styles-BPC6xbbG.js";const U={title:"UI/Inputs/FloatingLabelInput",component:l,args:{label:"Email",id:"email",size:"md",hideLabel:!1}},u={},d={render:()=>{const[e,a]=t.useState("user@mirrorstack.ai");return s.jsx(l,{label:"Email",id:"email-filled",value:e,onChange:r=>a(r.target.value)})}},c={render:()=>{const[e,a]=t.useState("");return s.jsx(l,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>a(r.target.value)})}},m={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},g={render:()=>{const[e,a]=t.useState("");return s.jsx(l,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>a(r.target.value)})}},p={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},h={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}},v={render:()=>{const[e,a]=t.useState(""),[r,i]=t.useState("");return s.jsxs("div",{className:"space-y-2 max-w-md",children:[s.jsx(l,{label:"Title",id:"link-title",size:"sm",value:e,onChange:n=>a(n.target.value)}),s.jsx(l,{label:"URL",id:"link-url",size:"sm",type:"url",value:r,onChange:n=>i(n.target.value)})]})}},b={render:()=>{const[e,a]=t.useState(""),[r,i]=t.useState("");return s.jsxs("div",{className:"flex gap-2 max-w-md",children:[s.jsx(l,{label:"Title",id:"link-title-hl",size:"sm",hideLabel:!0,value:e,onChange:n=>a(n.target.value),className:"w-1/3"}),s.jsx(l,{label:"URL",id:"link-url-hl",size:"sm",hideLabel:!0,type:"url",value:r,onChange:n=>i(n.target.value),className:"flex-1"})]})}},S={render:()=>{const[e,a]=t.useState("");return s.jsx(l,{label:"Search users",id:"search-users",leadingIcon:"search",value:e,onChange:r=>a(r.target.value),className:"max-w-sm"})}},x={render:()=>{const[e,a]=t.useState("ada@mirrorstack.ai");return s.jsx(l,{label:"Email",id:"leading-email-filled",leadingIcon:"mail",value:e,onChange:r=>a(r.target.value),className:"max-w-sm"})}},I={render:()=>{const[e,a]=t.useState(""),[r,i]=t.useState(""),[n,w]=t.useState("");return s.jsxs("div",{className:"space-y-3 max-w-sm",children:[s.jsx(l,{label:"Compact",id:"leading-xs",size:"xs",leadingIcon:"search",value:e,onChange:o=>a(o.target.value)}),s.jsx(l,{label:"Inline",id:"leading-sm",size:"sm",leadingIcon:"search",value:r,onChange:o=>i(o.target.value)}),s.jsx(l,{label:"Default",id:"leading-md",leadingIcon:"search",value:n,onChange:o=>w(o.target.value)})]})}},L={render:()=>{const[e,a]=t.useState("");return s.jsx(l,{label:"Search",id:"leading-search-hl",size:"sm",hideLabel:!0,leadingIcon:"search",placeholder:"Search users…",value:e,onChange:r=>a(r.target.value),className:"max-w-sm"})}},C={args:{label:"Email",id:"leading-email-error",leadingIcon:"mail",error:!0,helperText:"Please enter a valid email address",value:"invalid"}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="space-y-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title" size="sm" value={title} onChange={e => setTitle(e.target.value)} />
        <FloatingLabelInput label="URL" id="link-url" size="sm" type="url" value={url} onChange={e => setUrl(e.target.value)} />
      </div>;
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="flex gap-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title-hl" size="sm" hideLabel value={title} onChange={e => setTitle(e.target.value)} className="w-1/3" />
        <FloatingLabelInput label="URL" id="link-url-hl" size="sm" hideLabel type="url" value={url} onChange={e => setUrl(e.target.value)} className="flex-1" />
      </div>;
  }
}`,...b.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [query, setQuery] = useState("");
    return <FloatingLabelInput label="Search users" id="search-users" leadingIcon="search" value={query} onChange={e => setQuery(e.target.value)} className="max-w-sm" />;
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [email, setEmail] = useState("ada@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="leading-email-filled" leadingIcon="mail" value={email} onChange={e => setEmail(e.target.value)} className="max-w-sm" />;
  }
}`,...x.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [xs, setXs] = useState("");
    const [sm, setSm] = useState("");
    const [md, setMd] = useState("");
    return <div className="space-y-3 max-w-sm">
        <FloatingLabelInput label="Compact" id="leading-xs" size="xs" leadingIcon="search" value={xs} onChange={e => setXs(e.target.value)} />
        <FloatingLabelInput label="Inline" id="leading-sm" size="sm" leadingIcon="search" value={sm} onChange={e => setSm(e.target.value)} />
        <FloatingLabelInput label="Default" id="leading-md" leadingIcon="search" value={md} onChange={e => setMd(e.target.value)} />
      </div>;
  }
}`,...I.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [query, setQuery] = useState("");
    return <FloatingLabelInput label="Search" id="leading-search-hl" size="sm" hideLabel leadingIcon="search" placeholder="Search users…" value={query} onChange={e => setQuery(e.target.value)} className="max-w-sm" />;
  }
}`,...L.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "leading-email-error",
    leadingIcon: "mail",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...C.parameters?.docs?.source}}};const V=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText","Small","SmallHiddenLabel","LeadingIcon","LeadingIconWithValue","LeadingIconAllSizes","LeadingIconHiddenLabel","LeadingIconError"];export{p as Disabled,m as ErrorState,S as LeadingIcon,I as LeadingIconAllSizes,C as LeadingIconError,L as LeadingIconHiddenLabel,x as LeadingIconWithValue,g as Multiline,c as Password,u as Playground,v as Small,b as SmallHiddenLabel,h as WithHelperText,d as WithValue,V as __namedExportsOrder,U as default};
