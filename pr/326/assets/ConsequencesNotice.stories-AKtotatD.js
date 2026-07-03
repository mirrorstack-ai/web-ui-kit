import{j as e}from"./iframe-X9dR2HaW.js";import{C as o}from"./ConsequencesNotice-CCE469CC.js";import"./preload-helper-PPVm8Dsz.js";import"./Alert-CgY1vFBL.js";import"./cn-IyxL_b2c.js";import"./Icon-BES8a_b3.js";import"./IconButton-SMH-dP-k.js";import"./Progress-CyGWJDkY.js";import"./button-styles-CZHSjrxJ.js";const g={title:"UI/Feedback/ConsequencesNotice",component:o,args:{title:"Before you continue",items:["You'll be signed out of every device immediately.","API tokens and modules linked to this account stop working.",e.jsxs(e.Fragment,{children:["You can restore the account within ",e.jsx("strong",{children:"90 days"})," via the email link we send."]}),"After 90 days, the account and its data are permanently deleted."]},argTypes:{variant:{control:"select",options:["error","warning","info","success"]}}},t={},a={args:{variant:"warning",title:"Heads up",items:["This rotation invalidates all existing tokens.","Any module currently authenticating with the old token will fail until redeployed."]}},s={args:{title:"Deleting this app will:",items:["Stop all running modules associated with the app.","Revoke API tokens scoped to this app.",e.jsxs(e.Fragment,{children:["Schedule the app's data for deletion in ",e.jsx("strong",{children:"30 days"}),"."]}),"Cancel any active subscriptions."]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Heads up",
    items: ["This rotation invalidates all existing tokens.", "Any module currently authenticating with the old token will fail until redeployed."]
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Deleting this app will:",
    items: ["Stop all running modules associated with the app.", "Revoke API tokens scoped to this app.", <>
        Schedule the app's data for deletion in <strong>30 days</strong>.
      </>, "Cancel any active subscriptions."]
  }
}`,...s.parameters?.docs?.source}}};const h=["Playground","Warning","AppDeletion"];export{s as AppDeletion,t as Playground,a as Warning,h as __namedExportsOrder,g as default};
