import{j as o}from"./iframe-CYhTgrBW.js";import{A as i}from"./Alert-nSYvyQpd.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-CCCwuVJd.js";import"./IconButton-CMguEJRi.js";import"./Progress-BB5yP6R3.js";import"./button-styles-DvQkePbc.js";const h={title:"UI/Feedback/Alert",component:i,args:{variant:"info",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","info"]}}},r={},e={render:()=>o.jsx("div",{className:"flex flex-col gap-3",children:["info","success","warning","error"].map(t=>o.jsxs(i,{variant:t,children:["This is a ",t," alert message."]},t))})},s={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},a={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}},n={args:{variant:"info",icon:"passkey",iconSize:28,children:"Set up a passkey for faster verification next time."}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "info",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time."
  }
}`,...n.parameters?.docs?.source}}};const v=["Playground","Variants","WithTitle","Dismissible","WithCustomIcon"];export{a as Dismissible,r as Playground,e as Variants,n as WithCustomIcon,s as WithTitle,v as __namedExportsOrder,h as default};
