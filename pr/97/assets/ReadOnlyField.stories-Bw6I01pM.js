import{j as e}from"./iframe-Cv5RdDLp.js";import{c as f}from"./cn-IyxL_b2c.js";import{I as x}from"./IconButton-BnuBeBGH.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-CoVewtYp.js";import"./Icon-Dn7nqB5I.js";import"./button-styles-DvQkePbc.js";function l({label:t,value:n,mono:c=!1,copyable:i=!1,onCopy:u,suffix:m,className:p}){const d=()=>{navigator.clipboard.writeText(n).then(()=>u?.()).catch(()=>{})};return e.jsxs("div",{className:p,children:[e.jsx("label",{className:"block text-sm font-medium text-on-surface mb-1",children:t}),e.jsxs("div",{className:"flex items-center gap-2 min-h-8",children:[e.jsx("span",{className:f("text-sm truncate",c?"font-mono text-on-surface-variant":"text-on-surface"),children:n}),i&&e.jsx(x,{icon:"content_copy",variant:"text",size:"sm",onClick:d,"aria-label":`Copy ${t}`,className:"shrink-0 text-on-surface-variant"}),m]})]})}l.__docgenInfo={description:"",methods:[],displayName:"ReadOnlyField",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},mono:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},copyable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},suffix:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const j={title:"UI/Data/ReadOnlyField",component:l,args:{label:"Email",value:"user@example.com"},argTypes:{mono:{control:"boolean"},copyable:{control:"boolean"}}},a={},s={args:{label:"API Key",value:"sk-1234567890abcdef",mono:!0,copyable:!0}},r={args:{label:"Status",value:"Deployed",suffix:e.jsx("span",{className:"text-xs text-success font-medium",children:"Live"})}},o={args:{label:"Module ID",value:"oauth-core-v2",mono:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "API Key",
    value: "sk-1234567890abcdef",
    mono: true,
    copyable: true
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Status",
    value: "Deployed",
    suffix: <span className="text-xs text-success font-medium">Live</span>
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Module ID",
    value: "oauth-core-v2",
    mono: true
  }
}`,...o.parameters?.docs?.source}}};const I=["Playground","Copyable","WithSuffix","Mono"];export{s as Copyable,o as Mono,a as Playground,r as WithSuffix,I as __namedExportsOrder,j as default};
