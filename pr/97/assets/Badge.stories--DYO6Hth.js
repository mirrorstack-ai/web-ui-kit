import{j as e}from"./iframe-Cv5RdDLp.js";import{c as m}from"./cn-IyxL_b2c.js";import{I as g}from"./Icon-Dn7nqB5I.js";import"./preload-helper-PPVm8Dsz.js";const f={default:"bg-surface-container text-on-surface-variant border border-outline-variant",primary:"bg-primary/10 text-primary border border-primary/20",success:"bg-success/10 text-success border border-success/20",warning:"bg-warning/10 text-warning border border-warning/20",error:"bg-error/10 text-error border border-error/20",info:"bg-tertiary/10 text-tertiary border border-tertiary/20"},v={default:"bg-on-surface-variant",primary:"bg-primary",success:"bg-success",warning:"bg-warning",error:"bg-error",info:"bg-tertiary"},x={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-xs"},y={sm:12,md:14};function r({children:a,variant:c="default",size:d="md",icon:l,dot:p=!1,className:u}){return e.jsxs("span",{className:m("inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",f[c],x[d],u),children:[p&&e.jsx("span",{className:m("h-1.5 w-1.5 rounded-full shrink-0 animate-pulse",v[c]),"aria-hidden":"true"}),l&&e.jsx(g,{name:l,size:y[d],className:"shrink-0"}),a]})}r.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{children:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:`| "default"
| "primary"
| "success"
| "warning"
| "error"
| "info"`,elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"primary"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'},{name:"literal",value:'"info"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},icon:{required:!1,tsType:{name:"string"},description:""},dot:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const j={title:"UI/Feedback/Badge",component:r,args:{children:"Active",variant:"success"},argTypes:{variant:{control:"select",options:["default","primary","success","warning","error","info"]},size:{control:"select",options:["sm","md"]},icon:{control:"text"},dot:{control:"boolean"}}},n={},s={render:()=>e.jsx("div",{className:"flex flex-wrap items-center gap-2",children:["default","primary","success","warning","error","info"].map(a=>e.jsx(r,{variant:a,children:a},a))})},i={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(r,{variant:"success",icon:"check_circle",children:"Ready"}),e.jsx(r,{variant:"error",icon:"error",children:"Failed"}),e.jsx(r,{variant:"warning",icon:"warning",children:"Pending"}),e.jsx(r,{variant:"info",icon:"info",children:"Info"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(r,{variant:"success",dot:!0,children:"Online"}),e.jsx(r,{variant:"warning",dot:!0,children:"Processing"}),e.jsx(r,{variant:"error",dot:!0,children:"Offline"})]})},o={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(r,{variant:"primary",size:"sm",children:"Small"}),e.jsx(r,{variant:"primary",size:"md",children:"Medium"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      {(["default", "primary", "success", "warning", "error", "info"] as BadgeVariant[]).map(v => <Badge key={v} variant={v}>
            {v}
          </Badge>)}
    </div>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" icon="check_circle">Ready</Badge>
      <Badge variant="error" icon="error">Failed</Badge>
      <Badge variant="warning" icon="warning">Pending</Badge>
      <Badge variant="info" icon="info">Info</Badge>
    </div>
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Processing</Badge>
      <Badge variant="error" dot>Offline</Badge>
    </div>
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
    </div>
}`,...o.parameters?.docs?.source}}};const N=["Playground","Variants","WithIcon","WithDot","Sizes"];export{n as Playground,o as Sizes,s as Variants,t as WithDot,i as WithIcon,N as __namedExportsOrder,j as default};
