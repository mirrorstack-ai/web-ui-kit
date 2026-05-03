import{j as e}from"./iframe-CL-6oGBn.js";import{c as m}from"./cn-IyxL_b2c.js";import{S as g}from"./Switch-Cy2Z3K6b.js";import{B as f}from"./Button-C_kDDA_o.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-3R6A41ru.js";import"./Icon-BXin93yz.js";import"./button-styles-DvQkePbc.js";const h={primary:"border-primary/40",secondary:"border-secondary/40",tertiary:"border-tertiary/40",error:"border-error/40",warning:"border-warning/40",success:"border-success/40",info:"border-info/40"};function c({title:d,description:a,control:l,tone:i,className:p}){const u=i?h[i]:"border-outline-variant";return e.jsxs("div",{className:m("flex items-center gap-4 px-3.5 py-3 rounded-xl border bg-surface-container",u,p),children:[e.jsxs("div",{className:"min-w-0 flex-1 space-y-1.5",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:d}),a&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:a})]}),e.jsx("div",{className:"shrink-0",children:l})]})}c.__docgenInfo={description:"",methods:[],displayName:"SettingRow",props:{title:{required:!0,tsType:{name:"string"},description:"Primary heading for the row."},description:{required:!1,tsType:{name:"string"},description:"Optional supporting copy, rendered below the title."},control:{required:!0,tsType:{name:"ReactNode"},description:"Right-aligned control — typically a Switch, Button, or status pill."},tone:{required:!1,tsType:{name:"Tone"},description:`When set, applies a colored border accent matching the tone. Default
(omitted) renders with the neutral outline-variant border.`},className:{required:!1,tsType:{name:"string"},description:""}}};const j={title:"UI/Data/SettingRow",component:c,args:{title:"Developer mode",description:"Show the developer rail with module scaffolding, dev tunnel, and federation overrides.",control:e.jsx(g,{checked:!1,onChange:()=>{},"aria-label":"Developer mode"})},argTypes:{tone:{control:"select",options:[void 0,"primary","secondary","tertiary","error","warning","success","info"]}}},r={},t={args:{tone:"warning"}},o={args:{title:"Disable account",description:"Sign out and put your account in a suspended state. Use the email link to restore later.",tone:"error",control:e.jsx(f,{variant:"filled",color:"error",size:"sm",onClick:()=>{},children:"Disable"})}},s={args:{tone:"success",title:"Two-factor authentication",description:"Enabled with an authenticator app."}},n={args:{description:void 0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "warning"
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Disable account",
    description: "Sign out and put your account in a suspended state. Use the email link to restore later.",
    tone: "error",
    control: <Button variant="filled" color="error" size="sm" onClick={() => {}}>
        Disable
      </Button>
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "success",
    title: "Two-factor authentication",
    description: "Enabled with an authenticator app."
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...n.parameters?.docs?.source}}};const T=["Default","Warning","Error","Success","NoDescription"];export{r as Default,o as Error,n as NoDescription,s as Success,t as Warning,T as __namedExportsOrder,j as default};
