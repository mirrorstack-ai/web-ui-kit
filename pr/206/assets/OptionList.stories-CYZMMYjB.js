import{j as n}from"./iframe-oc4w-PkB.js";import{O as r}from"./OptionList-Db9KhN3J.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-aTostaqY.js";const u={title:"UI/Surfaces/OptionList",component:r,decorators:[e=>n.jsx("div",{style:{width:320},children:n.jsx(e,{})})]},a=[{value:"tag:",description:"match the node's tag"},{value:"name:",description:"match the node's title"},{value:"description:",description:"match the node's description"},{value:"content:",description:"match the node's content"}],t={args:{title:"Search options",showInfo:!0,items:a,onSelect:e=>console.log("selected",e.value)}},o={args:{title:"Search options",items:a,activeIndex:1,onSelect:e=>console.log("selected",e.value)}},s={args:{items:[{value:"user"},{value:"core"},{value:"balance"}],onSelect:e=>console.log("selected",e.value)}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Search options",
    showInfo: true,
    items: QUERY_OPS,
    onSelect: item => console.log("selected", item.value)
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Search options",
    items: QUERY_OPS,
    activeIndex: 1,
    onSelect: item => console.log("selected", item.value)
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      value: "user"
    }, {
      value: "core"
    }, {
      value: "balance"
    }],
    onSelect: item => console.log("selected", item.value)
  }
}`,...s.parameters?.docs?.source}}};const p=["Default","Highlighted","NoTitle"];export{t as Default,o as Highlighted,s as NoTitle,p as __namedExportsOrder,u as default};
