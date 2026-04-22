import{j as e}from"./iframe-CXU-ptHT.js";import{c as d}from"./cn-IyxL_b2c.js";import{B as n}from"./Button-Dr4enPDF.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-jy_1panv.js";import"./Icon-C5Su-lck.js";import"./button-styles-DvQkePbc.js";function a({children:c,className:o,...i}){return e.jsx("div",{className:d("rounded-2xl bg-surface-container-low border border-outline-variant",o),...i,children:c})}a.__docgenInfo={description:"",methods:[],displayName:"Surface",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}},composes:["HTMLAttributes"]};const N={title:"UI/Surfaces/Surface",component:a,args:{className:"p-6"}},s={args:{children:"Surface container with default styling"}},r={render:()=>e.jsxs(a,{className:"p-0 max-w-sm overflow-hidden",children:[e.jsx("div",{className:"aspect-video bg-surface-container"}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"Card Title"}),e.jsx("p",{className:"text-sm text-on-surface-variant mt-1",children:"A brief description of the card content."}),e.jsxs("div",{className:"flex justify-end gap-2 mt-4",children:[e.jsx(n,{variant:"text",size:"sm",children:"Cancel"}),e.jsx(n,{variant:"filled",size:"sm",children:"Action"})]})]})]})},t={render:()=>e.jsxs(a,{className:"p-6",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface mb-3",children:"Outer Surface"}),e.jsx(a,{className:"p-4 bg-surface-container",children:e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Nested surface with higher elevation background"})})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Surface container with default styling"
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Surface className="p-0 max-w-sm overflow-hidden">
      <div className="aspect-video bg-surface-container" />
      <div className="p-4">
        <h3 className="text-base font-semibold text-on-surface">Card Title</h3>
        <p className="text-sm text-on-surface-variant mt-1">
          A brief description of the card content.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="text" size="sm">
            Cancel
          </Button>
          <Button variant="filled" size="sm">
            Action
          </Button>
        </div>
      </div>
    </Surface>
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Surface className="p-6">
      <h3 className="text-base font-semibold text-on-surface mb-3">
        Outer Surface
      </h3>
      <Surface className="p-4 bg-surface-container">
        <p className="text-sm text-on-surface-variant">
          Nested surface with higher elevation background
        </p>
      </Surface>
    </Surface>
}`,...t.parameters?.docs?.source}}};const v=["Playground","CardExample","Nested"];export{r as CardExample,t as Nested,s as Playground,v as __namedExportsOrder,N as default};
