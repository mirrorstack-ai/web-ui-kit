import{r as i,j as e}from"./iframe-C-hmJeHJ.js";import{c as d}from"./cn-IyxL_b2c.js";import{I as v}from"./IconButton-Ddln_MkE.js";import{B as h}from"./Badge-D65Jr_Wg.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DR8aL-q_.js";import"./Icon-Zm-GtTe9.js";import"./button-styles-DvQkePbc.js";function p({label:l,value:t,mono:f=!1,copyable:y=!1,onCopy:u,suffix:x,className:g}){const[n,m]=i.useState(!1),c=i.useRef(null),b=i.useCallback(()=>{navigator.clipboard.writeText(t).then(()=>{m(!0),c.current&&clearTimeout(c.current),c.current=setTimeout(()=>m(!1),2e3),u?.()}).catch(()=>{})},[t,u]);return e.jsxs("div",{className:g,children:[e.jsx("label",{className:"block text-sm font-medium text-on-surface mb-1",children:l}),e.jsxs("div",{className:"flex items-center gap-2 min-h-8",children:[e.jsx("span",{className:d("text-sm truncate",f?"font-mono text-on-surface-variant":"text-on-surface"),children:t}),y&&e.jsx(v,{icon:n?"check":"content_copy",variant:"text",size:"sm",onClick:b,"aria-label":n?"Copied":`Copy ${l}`,className:d("shrink-0",n?"text-success":"text-on-surface-variant")}),x]})]})}p.__docgenInfo={description:"",methods:[],displayName:"ReadOnlyField",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},mono:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},copyable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},suffix:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const R={title:"UI/Data/ReadOnlyField",component:p,args:{label:"Email",value:"user@example.com"},argTypes:{mono:{control:"boolean"},copyable:{control:"boolean"}}},a={},r={args:{label:"API Key",value:"sk-1234567890abcdef",mono:!0,copyable:!0}},s={args:{label:"Status",value:"Deployed",suffix:e.jsx(h,{variant:"success",size:"sm",children:"Live"})}},o={args:{label:"Module ID",value:"oauth-core-v2",mono:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const B=["Playground","Copyable","WithSuffix","Mono"];export{r as Copyable,o as Mono,a as Playground,s as WithSuffix,B as __namedExportsOrder,R as default};
