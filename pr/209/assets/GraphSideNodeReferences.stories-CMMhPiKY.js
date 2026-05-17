import{j as a}from"./iframe-D_e3B_lV.js";import{G as c}from"./GraphSideNodeReferences-WJl4zlWq.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const p={title:"UI/Graph/GraphSide/GraphSideNodeReferences",component:c,decorators:[t=>a.jsx("div",{style:{width:260},children:a.jsx(t,{})})]},o=[{id:"balance",label:"Balance"},{id:"stripe",label:"Stripe"},{id:"ledger",label:"Ledger"}],e={args:{items:o}},r={args:{items:o,onSelect:t=>console.log(`Selected: ${t}`)}},s={args:{items:[]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    items: ITEMS
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: ITEMS,
    onSelect: id => console.log(\`Selected: \${id}\`)
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...s.parameters?.docs?.source}}};const l=["Static","Interactive","Empty"];export{s as Empty,r as Interactive,e as Static,l as __namedExportsOrder,p as default};
