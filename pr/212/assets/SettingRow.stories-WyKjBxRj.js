import{j as s}from"./iframe-COAq5ior.js";import{S as n}from"./SettingRow-DpUx0gnL.js";import{S as i}from"./Switch-tzb0ogmM.js";import{B as c}from"./Button-BG6Y2E8p.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-y5LL8ASt.js";import"./Icon-5KWewCVe.js";import"./button-styles-BPC6xbbG.js";const w={title:"UI/Data/SettingRow",component:n,args:{title:"Developer mode",description:"Show the developer rail with module scaffolding, dev tunnel, and federation overrides.",control:s.jsx(i,{checked:!1,onChange:()=>{},"aria-label":"Developer mode"})},argTypes:{tone:{control:"select",options:[void 0,"primary","secondary","tertiary","error","warning","success","info"]}}},e={},r={args:{tone:"warning"}},o={args:{title:"Disable account",description:"Sign out and put your account in a suspended state. Use the email link to restore later.",tone:"error",control:s.jsx(c,{variant:"filled",color:"error",size:"sm",onClick:()=>{},children:"Disable"})}},t={args:{tone:"success",title:"Two-factor authentication",description:"Enabled with an authenticator app."}},a={args:{description:void 0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const v=["Playground","Warning","Error","Success","NoDescription"];export{o as Error,a as NoDescription,e as Playground,t as Success,r as Warning,v as __namedExportsOrder,w as default};
