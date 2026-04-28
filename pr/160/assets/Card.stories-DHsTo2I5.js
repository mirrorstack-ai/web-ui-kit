import{j as e}from"./iframe-D5Ja3LCJ.js";import{S as l}from"./Surface-5ah_9Pep.js";import{S as m}from"./Skeleton-Cyl-cvMd.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";function o({children:n,interactive:i,loading:c,className:d}){return e.jsx(l,{interactive:i,className:d,children:c?e.jsx(m,{lines:3}):n})}o.__docgenInfo={description:"",methods:[],displayName:"Card",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},interactive:{required:!1,tsType:{name:"boolean"},description:"Adds hover background, transition, and pointer cursor (delegates to Surface)."},loading:{required:!1,tsType:{name:"boolean"},description:"When true, renders Skeleton placeholders instead of children."},className:{required:!1,tsType:{name:"string"},description:"Additional classes passed through to Surface."}}};const x={title:"UI/Surfaces/Card",component:o,args:{className:"p-5"},argTypes:{interactive:{control:"boolean"},loading:{control:"boolean"},className:{control:"text"}}},r={args:{children:"A simple card with default styling"}},a={args:{interactive:!0,children:"Hover over me — interactive card"}},t={args:{loading:!0,children:"This content is hidden while loading"}},s={render:n=>e.jsxs(o,{...n,interactive:!0,className:"p-5 max-w-sm",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"App Name"}),e.jsx("p",{className:"text-sm text-on-surface-variant mt-1",children:"A brief description of the application and what it does."})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: "A simple card with default styling"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    interactive: true,
    children: "Hover over me — interactive card"
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "This content is hidden while loading"
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <Card {...args} interactive className="p-5 max-w-sm">
      <h3 className="text-base font-semibold text-on-surface">App Name</h3>
      <p className="text-sm text-on-surface-variant mt-1">
        A brief description of the application and what it does.
      </p>
    </Card>
}`,...s.parameters?.docs?.source}}};const v=["Playground","Interactive","Loading","InteractiveWithContent"];export{a as Interactive,s as InteractiveWithContent,t as Loading,r as Playground,v as __namedExportsOrder,x as default};
