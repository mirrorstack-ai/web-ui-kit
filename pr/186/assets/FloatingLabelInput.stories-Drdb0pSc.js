import{r as n,j as t}from"./iframe-CGW82T0d.js";import{F as s}from"./FloatingLabelInput-D79OfII7.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-B7FCjrKP.js";import"./Progress-Cc5dGbT1.js";import"./Icon-D_LUrdug.js";import"./button-styles-DvQkePbc.js";const U={title:"UI/Inputs/FloatingLabelInput",component:s,args:{label:"Email",id:"email",size:"md",hideLabel:!1}},o={},i={render:()=>{const[e,a]=n.useState("user@mirrorstack.ai");return t.jsx(s,{label:"Email",id:"email-filled",value:e,onChange:r=>a(r.target.value)})}},u={render:()=>{const[e,a]=n.useState("");return t.jsx(s,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>a(r.target.value)})}},d={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},m={render:()=>{const[e,a]=n.useState("");return t.jsx(s,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>a(r.target.value)})}},c={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},p={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}},g={render:()=>{const[e,a]=n.useState(""),[r,b]=n.useState("");return t.jsxs("div",{className:"space-y-2 max-w-md",children:[t.jsx(s,{label:"Title",id:"link-title",size:"sm",value:e,onChange:l=>a(l.target.value)}),t.jsx(s,{label:"URL",id:"link-url",size:"sm",type:"url",value:r,onChange:l=>b(l.target.value)})]})}},v={render:()=>{const[e,a]=n.useState(""),[r,b]=n.useState("");return t.jsxs("div",{className:"flex gap-2 max-w-md",children:[t.jsx(s,{label:"Title",id:"link-title-hl",size:"sm",hideLabel:!0,value:e,onChange:l=>a(l.target.value),className:"w-1/3"}),t.jsx(s,{label:"URL",id:"link-url-hl",size:"sm",hideLabel:!0,type:"url",value:r,onChange:l=>b(l.target.value),className:"flex-1"})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="space-y-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title" size="sm" value={title} onChange={e => setTitle(e.target.value)} />
        <FloatingLabelInput label="URL" id="link-url" size="sm" type="url" value={url} onChange={e => setUrl(e.target.value)} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return <div className="flex gap-2 max-w-md">
        <FloatingLabelInput label="Title" id="link-title-hl" size="sm" hideLabel value={title} onChange={e => setTitle(e.target.value)} className="w-1/3" />
        <FloatingLabelInput label="URL" id="link-url-hl" size="sm" hideLabel type="url" value={url} onChange={e => setUrl(e.target.value)} className="flex-1" />
      </div>;
  }
}`,...v.parameters?.docs?.source}}};const j=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText","Small","SmallHiddenLabel"];export{c as Disabled,d as ErrorState,m as Multiline,u as Password,o as Playground,g as Small,v as SmallHiddenLabel,p as WithHelperText,i as WithValue,j as __namedExportsOrder,U as default};
