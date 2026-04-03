import{j as e,r as u}from"./iframe-XDkQ7x8w.js";import{c}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const p={error:"bg-error/10 border-error/30 text-error",success:"bg-success/10 border-success/30 text-success",warning:"bg-warning/10 border-warning/30 text-warning",info:"bg-info/10 border-info/30 text-info"},g={error:"error",success:"check_circle",warning:"warning",info:"info"};function s({variant:r,title:t,children:l,className:m,onDismiss:d}){return e.jsx("div",{role:"alert",className:c("rounded-xl border px-4 py-3",p[r],m),children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"material-symbols-rounded shrink-0","aria-hidden":"true",style:{fontSize:20},children:g[r]}),e.jsxs("div",{className:"flex-1 min-w-0",children:[t&&e.jsx("h3",{className:"text-sm font-medium",children:t}),e.jsx("div",{className:c("text-sm",t&&"mt-1"),children:l})]}),d&&e.jsx("button",{type:"button",onClick:d,"aria-label":"Dismiss",className:c("shrink-0 -my-1 rounded-full p-1 transition-opacity","text-current opacity-70 hover:opacity-100","cursor-pointer"),children:e.jsx("span",{className:"material-symbols-rounded","aria-hidden":"true",style:{fontSize:18},children:"close"})})]})})}s.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{variant:{required:!0,tsType:{name:"union",raw:'"error" | "success" | "warning" | "info"',elements:[{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"info"'}]},description:""},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const v={title:"UI/Feedback/Alert",component:s,args:{variant:"info",title:"Heads up",children:"This is an informational alert with some helpful details."},argTypes:{variant:{control:"select",options:["error","success","warning","info"]},title:{control:"text"},children:{control:"text"}}},i={},n={render:r=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(s,{...r,variant:"info",title:"Info",children:"This is an informational message."}),e.jsx(s,{...r,variant:"success",title:"Success",children:"Your changes have been saved successfully."}),e.jsx(s,{...r,variant:"warning",title:"Warning",children:"Please review before proceeding."}),e.jsx(s,{...r,variant:"error",title:"Error",children:"Something went wrong. Please try again."})]})},a={render:r=>{const[t,l]=u.useState(!0);return e.jsx("div",{className:"flex flex-col gap-3",children:t?e.jsx(s,{...r,variant:"warning",title:"Dismissible alert",onDismiss:()=>l(!1),children:"Click the close button to dismiss this alert."}):e.jsxs("p",{className:"text-sm text-on-surface-variant",children:["Alert dismissed."," ",e.jsx("button",{type:"button",onClick:()=>l(!0),className:"underline cursor-pointer text-primary",children:"Show again"})]})})}},o={args:{variant:"success",title:void 0,children:"Operation completed without a title heading."}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...i.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      <Alert {...args} variant="info" title="Info">
        This is an informational message.
      </Alert>
      <Alert {...args} variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert {...args} variant="warning" title="Warning">
        Please review before proceeding.
      </Alert>
      <Alert {...args} variant="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"All four variants",...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [visible, setVisible] = useState(true);
    return <div className="flex flex-col gap-3">
        {visible ? <Alert {...args} variant="warning" title="Dismissible alert" onDismiss={() => setVisible(false)}>
            Click the close button to dismiss this alert.
          </Alert> : <p className="text-sm text-on-surface-variant">
            Alert dismissed.{" "}
            <button type="button" onClick={() => setVisible(true)} className="underline cursor-pointer text-primary">
              Show again
            </button>
          </p>}
      </div>;
  }
}`,...a.parameters?.docs?.source},description:{story:"Dismissible alert with controlled visibility",...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "success",
    title: undefined,
    children: "Operation completed without a title heading."
  }
}`,...o.parameters?.docs?.source},description:{story:"Without title — body only",...o.parameters?.docs?.description}}};const b=["Playground","Variants","Dismissible","WithoutTitle"];export{a as Dismissible,i as Playground,n as Variants,o as WithoutTitle,b as __namedExportsOrder,v as default};
