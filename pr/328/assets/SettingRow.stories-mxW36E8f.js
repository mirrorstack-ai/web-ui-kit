import{j as s}from"./iframe-CcRPJMR8.js";import{S as n}from"./SettingRow-kMqXYqvc.js";import{S as i}from"./Switch-BLXKQsN-.js";import{B as c}from"./Button-p_vR7P-6.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./tone-B_C-zL0B.js";import"./Progress-CDWhI1cB.js";import"./Icon-C_kOM7N8.js";import"./button-styles-CZHSjrxJ.js";const v={title:"UI/Data/SettingRow",component:n,args:{title:"Developer mode",description:"Show the developer rail with module scaffolding, dev tunnel, and federation overrides.",control:s.jsx(i,{checked:!1,onChange:()=>{},"aria-label":"Developer mode"})},argTypes:{tone:{control:"select",options:[void 0,"primary","secondary","tertiary","error","warning","success","info"]}}},e={},r={args:{tone:"warning"}},o={args:{title:"Disable account",description:"Sign out and put your account in a suspended state. Use the email link to restore later.",tone:"error",control:s.jsx(c,{variant:"filled",color:"error",size:"sm",onClick:()=>{},children:"Disable"})}},t={args:{tone:"success",title:"Two-factor authentication",description:"Enabled with an authenticator app."}},a={args:{description:void 0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...a.parameters?.docs?.source}}};const D=["Playground","Warning","Error","Success","NoDescription"];export{o as Error,a as NoDescription,e as Playground,t as Success,r as Warning,D as __namedExportsOrder,v as default};
