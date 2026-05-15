import{j as s}from"./iframe-C2Ezt5Ox.js";import{G as i}from"./GraphSide-BkxbQvtW.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-7ihv5zwE.js";import"./Progress-I6-dY4he.js";import"./Icon-DzsFx1LJ.js";import"./button-styles-DvQkePbc.js";import"./Badge-DpUS77oX.js";const x={title:"UI/Graph/GraphSide",component:i,decorators:[t=>s.jsx("div",{className:"w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl",children:s.jsx(t,{})})]},o=t=>s.jsxs("p",{className:"text-sm text-on-surface",children:["Details for ",s.jsx("strong",{children:t.label}),"."]}),a={args:{node:{id:"account",label:"Account",tag:"core"},onClose:()=>{},renderDetails:o}},r={args:{node:{id:"balance",label:"Balance",tags:["finance","ledger","stripe"]},onClose:()=>{},renderDetails:o}},n={args:{node:{id:"settings",label:"Graph settings"},onClose:()=>{},renderDetails:o}},e={args:{node:{id:"balance",label:"Balance",tags:["finance","ledger","stripe","monthly","audit","tax"]},onClose:()=>{},renderDetails:o}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "account",
      label: "Account",
      tag: "core"
    },
    onClose: () => {},
    renderDetails
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "balance",
      label: "Balance",
      tags: ["finance", "ledger", "stripe"]
    },
    onClose: () => {},
    renderDetails
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "settings",
      label: "Graph settings"
    },
    onClose: () => {},
    renderDetails
  }
}`,...n.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
the label. Long sets of tags wrap onto further rows.`,...e.parameters?.docs?.description}}};const f=["WithSingleTag","WithMultipleTags","WithoutTags","TagsWrapToSecondRow"];export{e as TagsWrapToSecondRow,r as WithMultipleTags,a as WithSingleTag,n as WithoutTags,f as __namedExportsOrder,x as default};
