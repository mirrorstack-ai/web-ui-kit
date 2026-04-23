import{j as n}from"./iframe-CtFR0rbz.js";import{A as o}from"./Alert-BIcWob2n.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-YR_kJbKi.js";import"./IconButton-BZY3JhaX.js";import"./Progress-Drw2E_7X.js";import"./button-styles-DvQkePbc.js";const f={title:"UI/Feedback/Alert",component:o,args:{variant:"info",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","info"]}}},r={},e={render:()=>n.jsx("div",{className:"flex flex-col gap-3",children:["info","success","warning","error"].map(t=>n.jsxs(o,{variant:t,children:["This is a ",t," alert message."]},t))})},s={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},a={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["info", "success", "warning", "error"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists."
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {}
  }
}`,...a.parameters?.docs?.source}}};const h=["Playground","Variants","WithTitle","Dismissible"];export{a as Dismissible,r as Playground,e as Variants,s as WithTitle,h as __namedExportsOrder,f as default};
