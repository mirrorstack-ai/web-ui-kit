import{j as n}from"./iframe-B-gvgZHJ.js";import{S as i}from"./SettingRow-7lnwLoOR.js";import{S as c}from"./Switch-Cl6PFel6.js";import{B as p}from"./Button-DqWPrITm.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./tone-B_C-zL0B.js";import"./Progress-L1_P8j5F.js";import"./Icon-CG6brZKR.js";import"./button-styles-CZHSjrxJ.js";const v={title:"UI/Data/SettingRow",component:i,args:{title:"Developer mode",description:"Show the developer rail with module scaffolding, dev tunnel, and federation overrides.",control:n.jsx(c,{checked:!1,onChange:()=>{},"aria-label":"Developer mode"})},argTypes:{tone:{control:"select",options:[void 0,"primary","secondary","tertiary","error","warning","success","info"]}}},e={},r={args:{tone:"warning"}},o={args:{title:"Disable account",description:"Sign out and put your account in a suspended state. Use the email link to restore later.",tone:"error",control:n.jsx(p,{variant:"filled",color:"error",size:"sm",onClick:()=>{},children:"Disable"})}},t={args:{tone:"success",title:"Two-factor authentication",description:"Enabled with an authenticator app."}},s={args:{description:void 0}},a={args:{surface:"muted",title:"Module tunnel",description:"Lighter, lower-emphasis row for list-style settings."}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "warning"
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Disable account",
    description: "Sign out and put your account in a suspended state. Use the email link to restore later.",
    tone: "error",
    control: <Button variant="filled" color="error" size="sm" onClick={() => {}}>
        Disable
      </Button>
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "success",
    title: "Two-factor authentication",
    description: "Enabled with an authenticator app."
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    surface: "muted",
    title: "Module tunnel",
    description: "Lighter, lower-emphasis row for list-style settings."
  }
}`,...a.parameters?.docs?.source}}};const D=["Playground","Warning","Error","Success","NoDescription","Muted"];export{o as Error,a as Muted,s as NoDescription,e as Playground,t as Success,r as Warning,D as __namedExportsOrder,v as default};
