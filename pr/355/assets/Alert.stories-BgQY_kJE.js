import{j as c}from"./iframe-DgRR9v6W.js";import{A as l}from"./Alert-BiKFAo1l.js";import{B as d}from"./Button-CzqnRmBh.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Dx2DDZBJ.js";import"./IconButton-CVcMMBKN.js";import"./Progress-DuJTX2N0.js";import"./button-styles-CZHSjrxJ.js";const S={title:"UI/Feedback/Alert",component:l,args:{variant:"primary",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","primary","secondary"]}}},r={},e={render:()=>c.jsx("div",{className:"flex flex-col gap-3",children:["primary","secondary","success","warning","error"].map(o=>c.jsxs(l,{variant:o,children:["This is a ",o," alert message."]},o))})},a={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},n={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}},s={args:{variant:"warning",title:"Update available",children:"Version 1.4.0 is ready to install.",action:c.jsx(d,{variant:"filled",color:"warning",size:"sm",children:"Update"})}},t={args:{variant:"primary",icon:"passkey",iconSize:28,children:"Set up a passkey for faster verification next time."}},i={args:{variant:"error",title:"Before you continue",hideIcon:!0,children:"Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["primary", "secondary", "success", "warning", "error"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists."
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {}
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Update available",
    children: "Version 1.4.0 is ready to install.",
    action: <Button variant="filled" color="warning" size="sm">
        Update
      </Button>
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time."
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Before you continue",
    hideIcon: true,
    children: "Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."
  }
}`,...i.parameters?.docs?.source}}};const x=["Playground","Variants","WithTitle","Dismissible","WithAction","WithCustomIcon","HideIcon"];export{n as Dismissible,i as HideIcon,r as Playground,e as Variants,s as WithAction,t as WithCustomIcon,a as WithTitle,x as __namedExportsOrder,S as default};
