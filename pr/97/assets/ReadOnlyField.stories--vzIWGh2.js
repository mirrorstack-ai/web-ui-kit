import{j as e}from"./iframe-CrRTy8bE.js";import{c as f}from"./cn-IyxL_b2c.js";import{I as y}from"./IconButton-Dg0DwsMZ.js";import{B as g}from"./Badge-Czo_A9mZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-B-RRweyA.js";import"./Icon-B0iNKsOt.js";import"./button-styles-DvQkePbc.js";function l({label:t,value:n,mono:i=!1,copyable:c=!1,onCopy:u,suffix:m,className:d}){const p=()=>{navigator.clipboard.writeText(n).then(()=>u?.()).catch(()=>{})};return e.jsxs("div",{className:d,children:[e.jsx("label",{className:"block text-sm font-medium text-on-surface mb-1",children:t}),e.jsxs("div",{className:"flex items-center gap-2 min-h-8",children:[e.jsx("span",{className:f("text-sm truncate",i?"font-mono text-on-surface-variant":"text-on-surface"),children:n}),c&&e.jsx(y,{icon:"content_copy",variant:"text",size:"sm",onClick:p,"aria-label":`Copy ${t}`,className:"shrink-0 text-on-surface-variant"}),m]})]})}l.__docgenInfo={description:"",methods:[],displayName:"ReadOnlyField",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},mono:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},copyable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},suffix:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const q={title:"UI/Data/ReadOnlyField",component:l,args:{label:"Email",value:"user@example.com"},argTypes:{mono:{control:"boolean"},copyable:{control:"boolean"}}},a={},r={args:{label:"API Key",value:"sk-1234567890abcdef",mono:!0,copyable:!0}},s={args:{label:"Status",value:"Deployed",suffix:e.jsx(g,{variant:"success",size:"sm",children:"Live"})}},o={args:{label:"Module ID",value:"oauth-core-v2",mono:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "API Key",
    value: "sk-1234567890abcdef",
    mono: true,
    copyable: true
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Status",
    value: "Deployed",
    suffix: <Badge variant="success" size="sm">Live</Badge>
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Module ID",
    value: "oauth-core-v2",
    mono: true
  }
}`,...o.parameters?.docs?.source}}};const N=["Playground","Copyable","WithSuffix","Mono"];export{r as Copyable,o as Mono,a as Playground,s as WithSuffix,N as __namedExportsOrder,q as default};
