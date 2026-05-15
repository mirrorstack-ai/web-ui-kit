import{j as n}from"./iframe-DBdyLspc.js";import{G as t}from"./GraphSide-T0vFHKT4.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-C5Wwk7Aj.js";import"./Progress-DN58KnhP.js";import"./Icon-Cvph56Ti.js";import"./button-styles-DvQkePbc.js";import"./Badge-CkcLmX2s.js";const x={title:"UI/Graph/GraphSide",component:t,decorators:[s=>n.jsx("div",{className:"w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl",children:n.jsx(s,{})})]},o=s=>n.jsxs("p",{className:"text-sm text-on-surface",children:["Details for ",n.jsx("strong",{children:s.label}),"."]}),e={args:{node:{id:"account",label:"Account",tag:"core"},onClose:()=>{},renderDetails:o}},r={args:{node:{id:"balance",label:"Balance",tags:["finance","ledger","stripe"]},onClose:()=>{},renderDetails:o}},a={args:{node:{id:"settings",label:"Graph settings"},onClose:()=>{},renderDetails:o}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "account",
      label: "Account",
      tag: "core"
    },
    onClose: () => {},
    renderDetails
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "balance",
      label: "Balance",
      tags: ["finance", "ledger", "stripe"]
    },
    onClose: () => {},
    renderDetails
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: "settings",
      label: "Graph settings"
    },
    onClose: () => {},
    renderDetails
  }
}`,...a.parameters?.docs?.source}}};const b=["WithSingleTag","WithMultipleTags","TitleCenteredWhenNoTags"];export{a as TitleCenteredWhenNoTags,r as WithMultipleTags,e as WithSingleTag,b as __namedExportsOrder,x as default};
