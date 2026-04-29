import{j as e}from"./iframe-FTbIt3N-.js";import{c as x}from"./cn-IyxL_b2c.js";import{S as f}from"./Surface-9pgbFOc2.js";import{B as i}from"./Button-CRtv9Occ.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DKr5bRev.js";import"./Icon-ByLXQD10.js";import"./button-styles-DvQkePbc.js";function m({children:d,media:l,actions:o,interactive:p,className:u}){return e.jsxs(f,{interactive:p,className:x("p-0 overflow-hidden",u),children:[l,e.jsx("div",{className:"p-4",children:d}),o&&e.jsx("div",{className:"flex justify-end gap-2 px-4 pb-4",children:o})]})}m.__docgenInfo={description:"",methods:[],displayName:"Card",props:{children:{required:!0,tsType:{name:"ReactNode"},description:"Content area — title, description, etc."},media:{required:!1,tsType:{name:"ReactNode"},description:"Optional top area for images, video, or color blocks."},actions:{required:!1,tsType:{name:"ReactNode"},description:"Optional bottom area with action buttons."},interactive:{required:!1,tsType:{name:"boolean"},description:"Delegates to Surface's interactive prop for hover styles."},className:{required:!1,tsType:{name:"string"},description:"Applied to the outer Surface."}}};const C={title:"UI/Surfaces/Card",component:m,args:{children:e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"Card Title"}),e.jsx("p",{className:"text-sm text-on-surface-variant mt-1",children:"A brief description of the card content."})]})}},a={args:{className:"max-w-sm",media:e.jsx("div",{className:"aspect-video bg-surface-container"}),actions:e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"text",size:"sm",children:"Cancel"}),e.jsx(i,{variant:"filled",size:"sm",children:"Action"})]})}},s={args:{className:"max-w-sm",media:e.jsx("div",{className:"aspect-video bg-surface-container"}),actions:e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"text",size:"sm",children:"Cancel"}),e.jsx(i,{variant:"filled",size:"sm",children:"Action"})]})}},r={args:{className:"max-w-sm",interactive:!0,media:e.jsx("div",{className:"aspect-video bg-surface-container"})}},t={args:{className:"max-w-sm",media:e.jsx("div",{className:"aspect-video bg-surface-container"})}},n={args:{className:"max-w-sm",media:e.jsx("div",{className:"aspect-video bg-surface-container"})}},c={args:{className:"max-w-sm"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />,
    actions: <>
        <Button variant="text" size="sm">
          Cancel
        </Button>
        <Button variant="filled" size="sm">
          Action
        </Button>
      </>
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />,
    actions: <>
        <Button variant="text" size="sm">
          Cancel
        </Button>
        <Button variant="filled" size="sm">
          Action
        </Button>
      </>
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    className: "max-w-sm",
    interactive: true,
    media: <div className="aspect-video bg-surface-container" />
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    className: "max-w-sm"
  }
}`,...c.parameters?.docs?.source}}};const S=["Playground","Default","Interactive","MediaOnly","NoActions","ContentOnly"];export{c as ContentOnly,s as Default,r as Interactive,t as MediaOnly,n as NoActions,a as Playground,S as __namedExportsOrder,C as default};
