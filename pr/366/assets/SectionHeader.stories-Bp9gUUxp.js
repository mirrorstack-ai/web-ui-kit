import{j as e}from"./iframe-Bvsj7qvu.js";import{c as d}from"./cn-IyxL_b2c.js";import{B as m}from"./Button-O9xLVNiH.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BPF7p7BY.js";import"./Icon-CYbDAR6o.js";import"./button-styles-CZHSjrxJ.js";function a({title:n,description:o,action:i,className:c}){return e.jsxs("header",{className:d("flex items-center justify-between gap-4",c),children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"text-base font-semibold text-on-surface",children:n}),o&&e.jsx("p",{className:"mt-0.5 text-sm text-on-surface-variant",children:o})]}),i]})}a.__docgenInfo={description:"",methods:[],displayName:"SectionHeader",props:{title:{required:!0,tsType:{name:"string"},description:"Primary heading for the section, rendered as an h2."},description:{required:!1,tsType:{name:"string"},description:"Optional supporting copy, rendered below the title."},action:{required:!1,tsType:{name:"ReactNode"},description:"Right-aligned action — typically a Button or IconButton."},className:{required:!1,tsType:{name:"string"},description:""}}};const y={title:"UI/Data/SectionHeader",component:a,args:{title:"Payment method",description:"Cards used to settle invoices for this account."}},t={},r={args:{action:e.jsx(m,{variant:"outline",size:"sm",onClick:()=>{},children:"Add card"})}},s={args:{description:void 0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    action: <Button variant="outline" size="sm" onClick={() => {}}>
        Add card
      </Button>
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...s.parameters?.docs?.source}}};const N=["Playground","WithAction","NoDescription"];export{s as NoDescription,t as Playground,r as WithAction,N as __namedExportsOrder,y as default};
