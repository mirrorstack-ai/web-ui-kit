import{j as e}from"./iframe-DOvcBv2K.js";import{S as t}from"./Surface-DebQqHQV.js";import{B as n}from"./Button-D-3JymHz.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-zsdUfxIv.js";import"./Icon-CAREMO3b.js";import"./button-styles-DvQkePbc.js";const p={title:"UI/Surfaces/Surface",component:t,args:{className:"p-6"}},a={args:{children:"Surface container with default styling"}},s={render:()=>e.jsxs(t,{className:"p-0 max-w-sm overflow-hidden",children:[e.jsx("div",{className:"aspect-video bg-surface-container"}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"Card Title"}),e.jsx("p",{className:"text-sm text-on-surface-variant mt-1",children:"A brief description of the card content."}),e.jsxs("div",{className:"flex justify-end gap-2 mt-4",children:[e.jsx(n,{variant:"text",size:"sm",children:"Cancel"}),e.jsx(n,{variant:"filled",size:"sm",children:"Action"})]})]})]})},r={render:()=>e.jsxs(t,{className:"p-6",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface mb-3",children:"Outer Surface"}),e.jsx(t,{className:"p-4 bg-surface-container",children:e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Nested surface with higher elevation background"})})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Surface container with default styling"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const x=["Playground","CardExample","Nested"];export{s as CardExample,r as Nested,a as Playground,x as __namedExportsOrder,p as default};
