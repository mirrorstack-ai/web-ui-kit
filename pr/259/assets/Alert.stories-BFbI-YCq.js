import{j as c}from"./iframe-DHCsteTS.js";import{A as l}from"./Alert-Dn88iVn4.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-B6giwjfn.js";import"./IconButton-ClfiFRvr.js";import"./Progress-D7VI3_XS.js";import"./button-styles-CZHSjrxJ.js";const f={title:"UI/Feedback/Alert",component:l,args:{variant:"primary",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","primary","secondary","neutral"]}}},e={},r={render:()=>c.jsx("div",{className:"flex flex-col gap-3",children:["primary","secondary","success","warning","error","neutral"].map(i=>c.jsxs(l,{variant:i,children:["This is a ",i," alert message."]},i))})},a={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},n={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}},t={args:{variant:"primary",icon:"passkey",iconSize:28,children:"Set up a passkey for faster verification next time."}},s={args:{variant:"error",title:"Before you continue",hideIcon:!0,children:"Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."}},o={args:{variant:"neutral",title:"Dev tunnel not running",hideIcon:!0,children:"A resting, untinted status box for informational state that isn't a severity. Use hideIcon when there's no signal to convey."}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["primary", "secondary", "success", "warning", "error", "neutral"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time."
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Before you continue",
    hideIcon: true,
    children: "Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "neutral",
    title: "Dev tunnel not running",
    hideIcon: true,
    children: "A resting, untinted status box for informational state that isn't a severity. Use hideIcon when there's no signal to convey."
  }
}`,...o.parameters?.docs?.source}}};const w=["Playground","Variants","WithTitle","Dismissible","WithCustomIcon","HideIcon","Neutral"];export{n as Dismissible,s as HideIcon,o as Neutral,e as Playground,r as Variants,t as WithCustomIcon,a as WithTitle,w as __namedExportsOrder,f as default};
