import{j as e}from"./iframe-D5Ja3LCJ.js";import{S as a}from"./Surface-5ah_9Pep.js";import{B as i}from"./Button-C9v4pNFe.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-BFd1Xhns.js";import"./Icon-C_dbqjvT.js";import"./button-styles-DvQkePbc.js";const v={title:"UI/Surfaces/Surface",component:a,args:{className:"p-6"}},s={args:{children:"Surface container with default styling"}},r={render:()=>e.jsxs(a,{className:"p-0 max-w-sm overflow-hidden",children:[e.jsx("div",{className:"aspect-video bg-surface-container"}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"Card Title"}),e.jsx("p",{className:"text-sm text-on-surface-variant mt-1",children:"A brief description of the card content."}),e.jsxs("div",{className:"flex justify-end gap-2 mt-4",children:[e.jsx(i,{variant:"text",size:"sm",children:"Cancel"}),e.jsx(i,{variant:"filled",size:"sm",children:"Action"})]})]})]})},t={args:{interactive:!0,children:"Hover over me — interactive surface with hover styles"}},n={render:()=>e.jsxs(a,{interactive:!0,className:"p-0 max-w-sm overflow-hidden",children:[e.jsx("div",{className:"aspect-video bg-surface-container"}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"Clickable Card"}),e.jsx("p",{className:"text-sm text-on-surface-variant mt-1",children:"An interactive surface that responds to hover."})]})]})},c={render:()=>e.jsxs(a,{className:"p-6",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface mb-3",children:"Outer Surface"}),e.jsx(a,{className:"p-4 bg-surface-container",children:e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Nested surface with higher elevation background"})})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
  args: {
    interactive: true,
    children: "Hover over me — interactive surface with hover styles"
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Surface interactive className="p-0 max-w-sm overflow-hidden">
      <div className="aspect-video bg-surface-container" />
      <div className="p-4">
        <h3 className="text-base font-semibold text-on-surface">
          Clickable Card
        </h3>
        <p className="text-sm text-on-surface-variant mt-1">
          An interactive surface that responds to hover.
        </p>
      </div>
    </Surface>
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const h=["Playground","CardExample","Interactive","InteractiveCard","Nested"];export{r as CardExample,t as Interactive,n as InteractiveCard,c as Nested,s as Playground,h as __namedExportsOrder,v as default};
