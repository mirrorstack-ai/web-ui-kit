import{j as e}from"./iframe-BUbUdHYw.js";import{A as d}from"./Alert-BSrDWAnh.js";import{B as p}from"./Button-DNAW4DC9.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-BKOIQdD4.js";import"./IconButton-BxihAvi1.js";import"./Progress-CS9Of6y5.js";import"./button-styles-CZHSjrxJ.js";const S={title:"UI/Feedback/Alert",component:d,args:{variant:"primary",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","primary","secondary"]}}},a={},i={render:()=>e.jsx("div",{className:"flex flex-col gap-3",children:["primary","secondary","success","warning","error"].map(m=>e.jsxs(d,{variant:m,children:["This is a ",m," alert message."]},m))})},s={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},t={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}},r={args:{variant:"warning",title:"連線不穩定",children:"部分功能可能無法正常運作。",onDismiss:()=>{},dismissLabel:"關閉"}},n={args:{variant:"warning",title:"Update available",children:"Version 1.4.0 is ready to install.",action:e.jsx(p,{variant:"filled",color:"warning",size:"sm",children:"Update"})}},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(d,{variant:"error",title:"Could not load activity",onReload:()=>{},onDismiss:()=>{},children:"The latest activity could not be fetched. Reload to try again."}),e.jsx(d,{variant:"error",title:"Reloading activity",onReload:()=>{},reloadPending:!0,onDismiss:()=>{},children:"Fetching the latest activity. The reload control is disabled while the request is pending."})]})},c={args:{variant:"primary",icon:"passkey",iconSize:28,children:"Set up a passkey for faster verification next time."}},l={args:{variant:"error",title:"Before you continue",hideIcon:!0,children:"Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["primary", "secondary", "success", "warning", "error"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists."
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {}
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "連線不穩定",
    children: "部分功能可能無法正常運作。",
    onDismiss: () => {},
    dismissLabel: "關閉"
  }
}`,...r.parameters?.docs?.source},description:{story:'The dismiss control\'s accessible name is localizable via `dismissLabel`,\n mirroring `reloadLabel`. Omit it and the name defaults to "Dismiss".',...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Update available",
    children: "Version 1.4.0 is ready to install.",
    action: <Button variant="filled" color="warning" size="sm">
        Update
      </Button>
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <Alert variant="error" title="Could not load activity" onReload={() => {}} onDismiss={() => {}}>
        The latest activity could not be fetched. Reload to try again.
      </Alert>
      <Alert variant="error" title="Reloading activity" onReload={() => {}} reloadPending onDismiss={() => {}}>
        Fetching the latest activity. The reload control is disabled while the request is pending.
      </Alert>
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time."
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Before you continue",
    hideIcon: true,
    children: "Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title."
  }
}`,...l.parameters?.docs?.source}}};const D=["Playground","Variants","WithTitle","Dismissible","DismissibleLocalized","WithAction","WithReload","WithCustomIcon","HideIcon"];export{t as Dismissible,r as DismissibleLocalized,l as HideIcon,a as Playground,i as Variants,n as WithAction,c as WithCustomIcon,o as WithReload,s as WithTitle,D as __namedExportsOrder,S as default};
