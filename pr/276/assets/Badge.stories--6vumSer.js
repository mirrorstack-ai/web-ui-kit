import{j as e}from"./iframe-BKDfiV-e.js";import{B as r}from"./Badge-C_x0Rig1.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-B-xV___S.js";const g={title:"UI/Feedback/Badge",component:r,args:{children:"Active",variant:"success"},argTypes:{variant:{control:"select",options:["default","primary","success","warning","error"]},size:{control:"select",options:["sm","md"]},icon:{control:"text"},dot:{control:"boolean"}}},a={},s={render:()=>e.jsx("div",{className:"flex flex-wrap items-center gap-2",children:["default","primary","success","warning","error"].map(t=>e.jsx(r,{variant:t,children:t},t))})},n={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(r,{variant:"success",icon:"check_circle",children:"Ready"}),e.jsx(r,{variant:"error",icon:"error",children:"Failed"}),e.jsx(r,{variant:"warning",icon:"warning",children:"Pending"})]})},i={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(r,{variant:"success",dot:!0,children:"Online"}),e.jsx(r,{variant:"warning",dot:!0,children:"Processing"}),e.jsx(r,{variant:"error",dot:!0,children:"Offline"})]})},c={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(r,{variant:"primary",size:"sm",children:"Small"}),e.jsx(r,{variant:"primary",size:"md",children:"Medium"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      {(["default", "primary", "success", "warning", "error"] as BadgeVariant[]).map(v => <Badge key={v} variant={v}>
            {v}
          </Badge>)}
    </div>
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" icon="check_circle">Ready</Badge>
      <Badge variant="error" icon="error">Failed</Badge>
      <Badge variant="warning" icon="warning">Pending</Badge>
    </div>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Processing</Badge>
      <Badge variant="error" dot>Offline</Badge>
    </div>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
    </div>
}`,...c.parameters?.docs?.source}}};const u=["Playground","Variants","WithIcon","WithDot","Sizes"];export{a as Playground,c as Sizes,s as Variants,i as WithDot,n as WithIcon,u as __namedExportsOrder,g as default};
