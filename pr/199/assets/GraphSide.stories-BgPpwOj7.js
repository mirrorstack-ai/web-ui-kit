import{j as s}from"./iframe-CkPBhnXt.js";import{G as i}from"./GraphSide-DJ6pEaIx.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-DlNvlgpY.js";import"./Progress-CJNPWHjN.js";import"./Icon-DhVdu6gu.js";import"./button-styles-DvQkePbc.js";import"./Badge-Df9IDvdR.js";const x={title:"UI/Graph/GraphSide",component:i,decorators:[t=>s.jsx("div",{className:"w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl",children:s.jsx(t,{})})]},o=t=>s.jsxs("p",{className:"text-sm text-on-surface",children:["Details for ",s.jsx("strong",{children:t.label}),"."]}),a={args:{node:{id:"account",label:"Account",tag:"core"},onClose:()=>{},renderDetails:o}},n={args:{node:{id:"balance",label:"Balance",tags:["finance","ledger","stripe"]},onClose:()=>{},renderDetails:o}},r={args:{node:{id:"settings",label:"Graph settings"},onClose:()=>{},renderDetails:o}},e={args:{node:{id:"balance",label:"Balance",tags:["finance","ledger","stripe","monthly","audit","tax"]},onClose:()=>{},renderDetails:o}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "account",
      label: "Account",
      tag: "core"
    },
    onClose: () => {},
    renderDetails
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "balance",
      label: "Balance",
      tags: ["finance", "ledger", "stripe"]
    },
    onClose: () => {},
    renderDetails
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "settings",
      label: "Graph settings"
    },
    onClose: () => {},
    renderDetails
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "balance",
      label: "Balance",
      tags: ["finance", "ledger", "stripe", "monthly", "audit", "tax"]
    },
    onClose: () => {},
    renderDetails
  }
}`,...e.parameters?.docs?.source},description:{story:`Tags wrap to a second row beneath the title, indented to align under
the label. Long sets of tags wrap onto further rows.`,...e.parameters?.docs?.description}}};const f=["WithSingleTag","WithMultipleTags","TitleCenteredWhenNoTags","TagsWrapToSecondRow"];export{e as TagsWrapToSecondRow,r as TitleCenteredWhenNoTags,n as WithMultipleTags,a as WithSingleTag,f as __namedExportsOrder,x as default};
