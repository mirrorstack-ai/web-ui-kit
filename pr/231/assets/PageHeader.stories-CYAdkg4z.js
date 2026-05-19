import{j as e}from"./iframe-BYPyuUBE.js";import{c as l}from"./cn-IyxL_b2c.js";import{B as p}from"./Button-CCXhJIm8.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-TXWsrbeH.js";import"./Icon-CNvdfFXq.js";import"./button-styles-BPC6xbbG.js";function n({title:i,description:o,tail:c,className:d}){return e.jsxs("header",{className:l("flex items-end justify-between gap-4 flex-wrap",d),children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h1",{className:"text-2xl font-bold text-on-surface",children:i}),o&&e.jsx("p",{className:"mt-1 text-on-surface-variant",children:o})]}),c]})}n.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{title:{required:!0,tsType:{name:"string"},description:"Page title, rendered as an h1."},description:{required:!1,tsType:{name:"string"},description:"Optional supporting copy, rendered below the title."},tail:{required:!1,tsType:{name:"ReactNode"},description:`Optional trailing slot — picker, button, breadcrumb, or other
element rendered to the right of the title block. Wraps below on
narrow viewports.`},className:{required:!1,tsType:{name:"string"},description:""}}};const P={title:"UI/Data/PageHeader",component:n,args:{title:"Billing",description:"Charges, plan, usage, and payment for this account."}},r={},t={args:{tail:e.jsx(p,{variant:"outline",size:"sm",onClick:()=>{},children:"Period: May 19 – Jun 19, 2026"})}},s={args:{description:void 0}},a={args:{title:"Profile",description:void 0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tail: <Button variant="outline" size="sm" onClick={() => {}}>
        Period: May 19 – Jun 19, 2026
      </Button>
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Profile",
    description: undefined
  }
}`,...a.parameters?.docs?.source}}};const N=["Playground","WithTail","NoDescription","TitleOnly"];export{s as NoDescription,r as Playground,a as TitleOnly,t as WithTail,N as __namedExportsOrder,P as default};
