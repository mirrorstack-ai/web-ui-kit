import{j as i}from"./iframe-CGW82T0d.js";import{A as c}from"./Alert-4zsraZT0.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-D_LUrdug.js";import"./IconButton-B7FCjrKP.js";import"./Progress-Cc5dGbT1.js";import"./button-styles-DvQkePbc.js";const v={title:"UI/Feedback/Alert",component:c,args:{variant:"info",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","info"]}}},e={},r={render:()=>i.jsx("div",{className:"flex flex-col gap-3",children:["info","success","warning","error"].map(o=>i.jsxs(c,{variant:o,children:["This is a ",o," alert message."]},o))})},a={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},s={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}},n={args:{variant:"info",icon:"passkey",iconSize:28,children:"Set up a passkey for faster verification next time."}},t={args:{variant:"error",title:"Before you continue",hideIcon:!0,children:"Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["info", "success", "warning", "error"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists."
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {}
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "info",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time."
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Before you continue",
    hideIcon: true,
    children: "Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."
  }
}`,...t.parameters?.docs?.source}}};const y=["Playground","Variants","WithTitle","Dismissible","WithCustomIcon","HideIcon"];export{s as Dismissible,t as HideIcon,e as Playground,r as Variants,n as WithCustomIcon,a as WithTitle,y as __namedExportsOrder,v as default};
