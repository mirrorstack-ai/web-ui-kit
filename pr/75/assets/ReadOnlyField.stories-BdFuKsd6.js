import{r as y,j as e}from"./iframe-9eXzT8kC.js";import{c as g}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function s({label:a,value:c,mono:d=!1,copyable:p=!1,onCopy:u,suffix:m,className:f}){const[x,i]=y.useState(!1),b=()=>{navigator.clipboard.writeText(c).then(()=>{i(!0),u?.(),setTimeout(()=>i(!1),2e3)}).catch(()=>{})};return e.jsxs("div",{className:f,children:[e.jsx("label",{className:"mb-1 block text-sm font-medium text-on-surface",children:a}),e.jsxs("div",{className:"flex min-h-8 items-center gap-2",children:[e.jsx("span",{className:g("truncate text-sm",d?"font-mono text-on-surface-variant":"text-on-surface"),children:c}),p&&e.jsx("button",{type:"button",onClick:b,className:"shrink-0 cursor-pointer p-1 text-on-surface-variant transition-colors hover:text-primary","aria-label":`Copy ${a}`,children:e.jsx("span",{className:"material-symbols-rounded","aria-hidden":"true",style:{fontSize:16},children:x?"check":"content_copy"})}),m]})]})}s.__docgenInfo={description:"",methods:[],displayName:"ReadOnlyField",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},mono:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},copyable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},suffix:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const N={title:"UI/Data/ReadOnlyField",component:s,args:{label:"API Key",value:"sk-proj-abc123def456ghi789",mono:!1,copyable:!1},argTypes:{mono:{control:"boolean"},copyable:{control:"boolean"},label:{control:"text"},value:{control:"text"}}},r={},o={args:{label:"API Key",value:"sk-proj-abc123def456ghi789jkl012mno345",mono:!0,copyable:!0}},t={render:a=>e.jsxs("div",{className:"flex flex-col gap-4 max-w-sm",children:[e.jsx(s,{...a,label:"Name",value:"Jane Doe"}),e.jsx(s,{...a,label:"Email",value:"jane@example.com",copyable:!0}),e.jsx(s,{...a,label:"User ID",value:"usr_2f8a9c1b3d4e5f6a",mono:!0,copyable:!0})]})},n={args:{label:"Status",value:"Active",suffix:e.jsx("span",{className:"rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success",children:"Verified"})}},l={render:a=>e.jsx("div",{className:"max-w-xs",children:e.jsx(s,{...a,label:"Webhook URL",value:"https://api.example.com/webhooks/v2/ingest/events/abc123def456ghi789",mono:!0,copyable:!0})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "API Key",
    value: "sk-proj-abc123def456ghi789jkl012mno345",
    mono: true,
    copyable: true
  }
}`,...o.parameters?.docs?.source},description:{story:"Monospace value with copy button",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4 max-w-sm">
      <ReadOnlyField {...args} label="Name" value="Jane Doe" />
      <ReadOnlyField {...args} label="Email" value="jane@example.com" copyable />
      <ReadOnlyField {...args} label="User ID" value="usr_2f8a9c1b3d4e5f6a" mono copyable />
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Multiple fields stacked",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Status",
    value: "Active",
    suffix: <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
        Verified
      </span>
  }
}`,...n.parameters?.docs?.source},description:{story:"With suffix slot",...n.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="max-w-xs">
      <ReadOnlyField {...args} label="Webhook URL" value="https://api.example.com/webhooks/v2/ingest/events/abc123def456ghi789" mono copyable />
    </div>
}`,...l.parameters?.docs?.source},description:{story:"Long value truncated",...l.parameters?.docs?.description}}};const k=["Playground","MonoCopyable","FieldGroup","WithSuffix","Truncated"];export{t as FieldGroup,o as MonoCopyable,r as Playground,l as Truncated,n as WithSuffix,k as __namedExportsOrder,N as default};
