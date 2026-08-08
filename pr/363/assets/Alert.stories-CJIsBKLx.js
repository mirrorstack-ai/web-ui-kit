import{j as e}from"./iframe-DszPApbV.js";import{A as l}from"./Alert-CXoyL6f0.js";import{B as m}from"./Button-C90nbWKr.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Bfba-oJK.js";import"./IconButton-C976NsLc.js";import"./Progress-BZRozOzt.js";import"./button-styles-CZHSjrxJ.js";const S={title:"UI/Feedback/Alert",component:l,args:{variant:"primary",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","primary","secondary"]}}},r={},a={render:()=>e.jsx("div",{className:"flex flex-col gap-3",children:["primary","secondary","success","warning","error"].map(d=>e.jsxs(l,{variant:d,children:["This is a ",d," alert message."]},d))})},t={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},n={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}},i={args:{variant:"warning",title:"Update available",children:"Version 1.4.0 is ready to install.",action:e.jsx(m,{variant:"filled",color:"warning",size:"sm",children:"Update"})}},s={render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(l,{variant:"error",title:"Could not load activity",onReload:()=>{},onDismiss:()=>{},children:"The latest activity could not be fetched. Reload to try again."}),e.jsx(l,{variant:"error",title:"Reloading activity",onReload:()=>{},reloadPending:!0,onDismiss:()=>{},children:"Fetching the latest activity. The reload control is disabled while the request is pending."})]})},o={args:{variant:"primary",icon:"passkey",iconSize:28,children:"Set up a passkey for faster verification next time."}},c={args:{variant:"error",title:"Before you continue",hideIcon:!0,children:"Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["primary", "secondary", "success", "warning", "error"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists."
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {}
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Update available",
    children: "Version 1.4.0 is ready to install.",
    action: <Button variant="filled" color="warning" size="sm">
        Update
      </Button>
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <Alert variant="error" title="Could not load activity" onReload={() => {}} onDismiss={() => {}}>
        The latest activity could not be fetched. Reload to try again.
      </Alert>
      <Alert variant="error" title="Reloading activity" onReload={() => {}} reloadPending onDismiss={() => {}}>
        Fetching the latest activity. The reload control is disabled while the request is pending.
      </Alert>
    </div>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time."
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Before you continue",
    hideIcon: true,
    children: "Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."
  }
}`,...c.parameters?.docs?.source}}};const A=["Playground","Variants","WithTitle","Dismissible","WithAction","WithReload","WithCustomIcon","HideIcon"];export{n as Dismissible,c as HideIcon,r as Playground,a as Variants,i as WithAction,o as WithCustomIcon,s as WithReload,t as WithTitle,A as __namedExportsOrder,S as default};
