import{r as l,j as t}from"./iframe-BM3jI1_g.js";import{F as s}from"./FloatingLabelInput-ClSu8ipe.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-CWod7YMG.js";import"./Progress-C7D4c5RA.js";import"./Icon-C3IoJYLK.js";import"./button-styles-CZHSjrxJ.js";const V={title:"UI/Inputs/FloatingLabelInput",component:s,args:{label:"Email",id:"email",size:"md",hideLabel:!1}},o={},i={render:()=>{const[e,a]=l.useState("user@mirrorstack.ai");return t.jsx(s,{label:"Email",id:"email-filled",value:e,onChange:r=>a(r.target.value)})}},u={render:()=>{const[e,a]=l.useState("");return t.jsx(s,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>a(r.target.value)})}},c={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},d={render:()=>{const[e,a]=l.useState("");return t.jsx(s,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>a(r.target.value)})}},m={render:()=>{const[e,a]=l.useState("");return t.jsx(s,{label:"Title",id:"link-title",size:"sm",value:e,onChange:r=>a(r.target.value)})}},g={render:()=>{const[e,a]=l.useState(""),[r,p]=l.useState(""),[h,v]=l.useState("ada@mirrorstack.ai");return t.jsxs("div",{className:"space-y-3 max-w-sm",children:[t.jsx(s,{label:"Search users",id:"leading-search-md",leadingIcon:"search",value:e,onChange:n=>a(n.target.value)}),t.jsx(s,{label:"Search",id:"leading-search-sm-hl",size:"sm",hideLabel:!0,leadingIcon:"search",value:r,onChange:n=>p(n.target.value)}),t.jsx(s,{label:"Email",id:"leading-email",leadingIcon:"mail",value:h,onChange:n=>v(n.target.value)})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    return <FloatingLabelInput label="Title" id="link-title" size="sm" value={title} onChange={e => setTitle(e.target.value)} />;
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [search, setSearch] = useState("");
    const [searchSm, setSearchSm] = useState("");
    const [email, setEmail] = useState("ada@mirrorstack.ai");
    return <div className="space-y-3 max-w-sm">
        <FloatingLabelInput label="Search users" id="leading-search-md" leadingIcon="search" value={search} onChange={e => setSearch(e.target.value)} />
        <FloatingLabelInput label="Search" id="leading-search-sm-hl" size="sm" hideLabel leadingIcon="search" value={searchSm} onChange={e => setSearchSm(e.target.value)} />
        <FloatingLabelInput label="Email" id="leading-email" leadingIcon="mail" value={email} onChange={e => setEmail(e.target.value)} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}};const j=["Playground","WithValue","Password","ErrorState","Multiline","Small","LeadingIcon"];export{c as ErrorState,g as LeadingIcon,d as Multiline,u as Password,o as Playground,m as Small,i as WithValue,j as __namedExportsOrder,V as default};
