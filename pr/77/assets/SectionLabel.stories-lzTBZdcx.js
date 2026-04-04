import{j as e}from"./iframe-dyi-qyWM.js";import{c}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function r({children:s,className:a,...o}){return e.jsx("p",{className:c("text-xs font-medium uppercase tracking-wider text-on-surface-variant",a),...o,children:s})}r.__docgenInfo={description:"",methods:[],displayName:"SectionLabel",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}},composes:["HTMLAttributes"]};const p={title:"UI/Data/SectionLabel",component:r,args:{children:"Section Title"},argTypes:{children:{control:"text"}}},t={},n={render:s=>e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{children:[e.jsx(r,{...s,children:"Account Details"}),e.jsx("p",{className:"mt-1 text-sm text-on-surface",children:"Manage your personal information and preferences."})]}),e.jsxs("div",{children:[e.jsx(r,{...s,children:"Security"}),e.jsx("p",{className:"mt-1 text-sm text-on-surface",children:"Password, two-factor authentication, and sessions."})]}),e.jsxs("div",{children:[e.jsx(r,{...s,children:"Danger Zone"}),e.jsx("p",{className:"mt-1 text-sm text-on-surface",children:"Irreversible actions like account deletion."})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <div>
        <SectionLabel {...args}>Account Details</SectionLabel>
        <p className="mt-1 text-sm text-on-surface">
          Manage your personal information and preferences.
        </p>
      </div>
      <div>
        <SectionLabel {...args}>Security</SectionLabel>
        <p className="mt-1 text-sm text-on-surface">
          Password, two-factor authentication, and sessions.
        </p>
      </div>
      <div>
        <SectionLabel {...args}>Danger Zone</SectionLabel>
        <p className="mt-1 text-sm text-on-surface">
          Irreversible actions like account deletion.
        </p>
      </div>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"Multiple labels showing typical section headings",...n.parameters?.docs?.description}}};const m=["Playground","SectionHeadings"];export{t as Playground,n as SectionHeadings,m as __namedExportsOrder,p as default};
