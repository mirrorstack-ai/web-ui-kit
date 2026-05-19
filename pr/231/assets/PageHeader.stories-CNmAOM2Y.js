import{j as e}from"./iframe-DUj7TEkk.js";import{c as x}from"./cn-IyxL_b2c.js";import{B as l}from"./Button-CD-P9Zb2.js";import{I as o}from"./Icon-D_Mk35RR.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BLeWVum2.js";import"./button-styles-BPC6xbbG.js";function d({title:m,description:c,path:p,leading:u,tail:g,className:h}){return e.jsxs("header",{className:x("flex flex-col gap-2",h),children:[p,e.jsxs("div",{className:"flex items-center justify-between gap-4 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[u,e.jsxs("div",{className:"min-w-0",children:[e.jsx("h1",{className:"text-2xl font-bold text-on-surface",children:m}),c&&e.jsx("p",{className:"text-on-surface-variant",children:c})]})]}),g]})]})}d.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{title:{required:!0,tsType:{name:"string"},description:"Page title, rendered as an h1."},description:{required:!1,tsType:{name:"string"},description:"Optional supporting copy, rendered below the title."},path:{required:!1,tsType:{name:"ReactNode"},description:`Optional path navigator rendered above the title — back link,
breadcrumb, or any element that indicates where this page sits in
a larger navigation hierarchy.`},leading:{required:!1,tsType:{name:"ReactNode"},description:`Optional leading element rendered to the left of the title block —
typically an Avatar, Icon container, or other visual marker.`},tail:{required:!1,tsType:{name:"ReactNode"},description:`Optional trailing slot rendered to the right of the title block —
picker, button, breadcrumb, status pill, or other element. Wraps
below on narrow viewports.`},className:{required:!1,tsType:{name:"string"},description:""}}};const k={title:"UI/Data/PageHeader",component:d,args:{title:"Billing",description:"Charges, plan, usage, and payment for this account."}},a={},r={args:{description:void 0}},n={args:{tail:e.jsx(l,{variant:"outline",size:"sm",onClick:()=>{},children:"Period: May 19 – Jun 19, 2026"})}},s={args:{title:"Acme Module",description:"@acme/widgets",leading:e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary",children:e.jsx(o,{name:"extension",size:24})})}},i={args:{title:"Usage detail",description:void 0,path:e.jsxs("a",{href:"#",className:"inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface",children:[e.jsx(o,{name:"arrow_back",size:16}),"Billing"]})}},t={args:{title:"Acme Module",description:"@acme/widgets",path:e.jsxs("a",{href:"#",className:"inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface",children:[e.jsx(o,{name:"arrow_back",size:16}),"Dev Modules"]}),leading:e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary",children:e.jsx(o,{name:"extension",size:24})}),tail:e.jsx(l,{variant:"outline",size:"sm",onClick:()=>{},children:"Settings"})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    tail: <Button variant="outline" size="sm" onClick={() => {}}>
        Period: May 19 – Jun 19, 2026
      </Button>
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    leading: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon name="extension" size={24} />
      </div>
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Usage detail",
    description: undefined,
    path: <a href="#" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface">
        <Icon name="arrow_back" size={16} />
        Billing
      </a>
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    path: <a href="#" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface">
        <Icon name="arrow_back" size={16} />
        Dev Modules
      </a>,
    leading: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon name="extension" size={24} />
      </div>,
    tail: <Button variant="outline" size="sm" onClick={() => {}}>
        Settings
      </Button>
  }
}`,...t.parameters?.docs?.source},description:{story:`Mirrors the web-applications /dev/module/[slug] header — path
navigator on top, tinted-icon leading marker, name + slug, and a
Settings action on the right.`,...t.parameters?.docs?.description}}};const z=["Playground","TitleOnly","WithTail","WithLeading","WithPath","ModulePage"];export{t as ModulePage,a as Playground,r as TitleOnly,s as WithLeading,i as WithPath,n as WithTail,z as __namedExportsOrder,k as default};
