import{r as m,j as c}from"./iframe-CCuhc2Dc.js";import{F as d}from"./FloatingLabelInput-CzANXVyL.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-C-ddoYkl.js";import"./Progress-DZEHjny0.js";import"./Icon-CXqVnF1T.js";import"./button-styles-DvQkePbc.js";const V={title:"UI/Inputs/FloatingLabelInput",component:d,args:{label:"Email",id:"email"}},s={},t={render:()=>{const[e,a]=m.useState("user@mirrorstack.ai");return c.jsx(d,{label:"Email",id:"email-filled",value:e,onChange:r=>a(r.target.value)})}},l={render:()=>{const[e,a]=m.useState("");return c.jsx(d,{label:"Password",id:"password",type:"password",showPasswordToggle:!0,value:e,onChange:r=>a(r.target.value)})}},o={args:{label:"Email",id:"email-error",error:!0,helperText:"Please enter a valid email address",value:"invalid"}},n={render:()=>{const[e,a]=m.useState("");return c.jsx(d,{label:"Bio",id:"bio",multiline:!0,rows:4,maxLength:160,value:e,onChange:r=>a(r.target.value)})}},i={args:{label:"Read only",id:"disabled",disabled:!0,value:"Cannot edit this"}},u={args:{label:"Username",id:"username",helperText:"3-20 characters, letters and numbers only"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return <FloatingLabelInput label="Email" id="email-filled" value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Password" id="password" type="password" showPasswordToggle value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid"
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <FloatingLabelInput label="Bio" id="bio" multiline rows={4} maxLength={160} value={value} onChange={e => setValue(e.target.value)} />;
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this"
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only"
  }
}`,...u.parameters?.docs?.source}}};const E=["Playground","WithValue","Password","ErrorState","Multiline","Disabled","WithHelperText"];export{i as Disabled,o as ErrorState,n as Multiline,l as Password,s as Playground,u as WithHelperText,t as WithValue,E as __namedExportsOrder,V as default};
