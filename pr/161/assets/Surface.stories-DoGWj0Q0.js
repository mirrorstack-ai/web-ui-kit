import{j as e}from"./iframe-FTbIt3N-.js";import{S as t}from"./Surface-9pgbFOc2.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const u={title:"UI/Surfaces/Surface",component:t,args:{className:"p-6"}},r={args:{children:"Surface container with default styling"}},a={args:{interactive:!0,children:"Hover over me — interactive surface with hover styles"}},s={render:()=>e.jsxs(t,{className:"p-6",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface mb-3",children:"Outer Surface"}),e.jsx(t,{className:"p-4 bg-surface-container",children:e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Nested surface with higher elevation background"})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Surface container with default styling"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    interactive: true,
    children: "Hover over me — interactive surface with hover styles"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const m=["Playground","Interactive","Nested"];export{a as Interactive,s as Nested,r as Playground,m as __namedExportsOrder,u as default};
