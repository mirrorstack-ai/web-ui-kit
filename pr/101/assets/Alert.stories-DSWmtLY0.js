import{j as e}from"./iframe-hR3LA4PJ.js";import{c as l}from"./cn-IyxL_b2c.js";import{I as u}from"./Icon-BZwo1ehe.js";import{I as p}from"./IconButton-CJbeXNBd.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-B5Ec1Paz.js";import"./button-styles-DvQkePbc.js";const g={error:"bg-error/10 border-error/30 text-error",success:"bg-success/10 border-success/30 text-success",warning:"bg-warning/10 border-warning/30 text-warning",info:"bg-info/10 border-info/30 text-info"},f={error:"error",success:"check_circle",warning:"warning",info:"info"};function o({variant:r,title:i,children:m,className:d,onDismiss:c}){return e.jsx("div",{className:l("rounded-xl border px-4 py-3",g[r],d),role:"alert",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(u,{name:f[r],size:20,className:"shrink-0"}),e.jsxs("div",{className:"ml-3 flex-1",children:[i&&e.jsx("h3",{className:"text-sm font-medium",children:i}),e.jsx("div",{className:l("text-sm",i&&"mt-1"),children:m})]}),c&&e.jsx(p,{icon:"close",variant:"text",size:"sm",className:"-my-1 ml-auto text-current",onClick:c,"aria-label":"Dismiss"})]})})}o.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{variant:{required:!0,tsType:{name:"union",raw:'"error" | "success" | "warning" | "info"',elements:[{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"info"'}]},description:""},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const j={title:"UI/Feedback/Alert",component:o,args:{variant:"info",children:"This is an informational alert message."},argTypes:{variant:{control:"select",options:["error","success","warning","info"]}}},s={},a={render:()=>e.jsx("div",{className:"flex flex-col gap-3",children:["info","success","warning","error"].map(r=>e.jsxs(o,{variant:r,children:["This is a ",r," alert message."]},r))})},n={args:{variant:"error",title:"Something went wrong",children:"Please try again or contact support if the issue persists."}},t={args:{variant:"warning",title:"Connection unstable",children:"Some features may not work correctly.",onDismiss:()=>{}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(["info", "success", "warning", "error"] as AlertVariant[]).map(v => <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>)}
    </div>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists."
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {}
  }
}`,...t.parameters?.docs?.source}}};const T=["Playground","Variants","WithTitle","Dismissible"];export{t as Dismissible,s as Playground,a as Variants,n as WithTitle,T as __namedExportsOrder,j as default};
