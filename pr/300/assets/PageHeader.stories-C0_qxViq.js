import{j as e}from"./iframe-BsKFuHLG.js";import{c as x}from"./cn-IyxL_b2c.js";import{B as l}from"./Breadcrumb-CwMZ8wjY.js";import{B as c}from"./Button-DRpRbmX0.js";import{I as d}from"./Icon-DIuQrOow.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-Ykf4TOZL.js";import"./button-styles-CZHSjrxJ.js";function m({title:p,description:o,path:u,leading:g,tail:h,className:f}){return e.jsxs("header",{className:x("flex flex-col gap-2",f),children:[u,e.jsxs("div",{className:"flex items-center justify-between gap-4 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[g,e.jsxs("div",{className:"min-w-0",children:[e.jsx("h1",{className:"text-2xl font-bold text-on-surface",children:p}),o&&e.jsx("p",{className:"text-on-surface-variant",children:o})]})]}),h]})]})}m.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{title:{required:!0,tsType:{name:"string"},description:"Page title, rendered as an h1."},description:{required:!1,tsType:{name:"string"},description:"Optional supporting copy, rendered below the title."},path:{required:!1,tsType:{name:"ReactNode"},description:`Optional path navigator rendered above the title — back link,
breadcrumb, or any element that indicates where this page sits in
a larger navigation hierarchy.`},leading:{required:!1,tsType:{name:"ReactNode"},description:`Optional leading element rendered to the left of the title block —
typically an Avatar, Icon container, or other visual marker.`},tail:{required:!1,tsType:{name:"ReactNode"},description:`Optional trailing slot rendered to the right of the title block —
picker, button, breadcrumb, status pill, or other element. Wraps
below on narrow viewports.`},className:{required:!1,tsType:{name:"string"},description:""}}};const k={title:"UI/Data/PageHeader",component:m,args:{title:"Billing",description:"Charges, plan, usage, and payment for this account."}},t={},a={args:{description:void 0}},i={args:{tail:e.jsx(c,{variant:"outline",size:"sm",onClick:()=>{},children:"Period: May 19 – Jun 19, 2026"})}},n={args:{title:"Acme Module",description:"@acme/widgets",leading:e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary",children:e.jsx(d,{name:"extension",size:24})})}},s={args:{title:"Usage detail",description:void 0,path:e.jsx(l,{items:[{label:"Billing",href:"#"}]})}},r={args:{title:"Acme Module",description:"@acme/widgets",path:e.jsx(l,{items:[{label:"Dev Modules",href:"#"},{label:"Versions",href:"#"}]}),leading:e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary",children:e.jsx(d,{name:"extension",size:24})}),tail:e.jsx(c,{variant:"outline",size:"sm",onClick:()=>{},children:"Settings"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    tail: <Button variant="outline" size="sm" onClick={() => {}}>
        Period: May 19 – Jun 19, 2026
      </Button>
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    leading: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon name="extension" size={24} />
      </div>
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Usage detail",
    description: undefined,
    path: <Breadcrumb items={[{
      label: "Billing",
      href: "#"
    }]} />
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Acme Module",
    description: "@acme/widgets",
    path: <Breadcrumb items={[{
      label: "Dev Modules",
      href: "#"
    }, {
      label: "Versions",
      href: "#"
    }]} />,
    leading: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon name="extension" size={24} />
      </div>,
    tail: <Button variant="outline" size="sm" onClick={() => {}}>
        Settings
      </Button>
  }
}`,...r.parameters?.docs?.source},description:{story:`Deeper trail — drill from a versions list into a specific version.
Each segment is the next level up; the current page (e.g. "v1.2.0")
lives in the h1, not the breadcrumb.`,...r.parameters?.docs?.description}}};const M=["Playground","TitleOnly","WithTail","WithLeading","WithPath","ModulePage"];export{r as ModulePage,t as Playground,a as TitleOnly,n as WithLeading,s as WithPath,i as WithTail,M as __namedExportsOrder,k as default};
