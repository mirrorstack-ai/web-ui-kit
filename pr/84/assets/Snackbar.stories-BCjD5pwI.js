import{r as v,j as e}from"./iframe-4qxXXFPv.js";import{c as t}from"./cn-IyxL_b2c.js";import{B as k}from"./Button-BTyyt9eS.js";import{I as D}from"./IconButton-D53cINFj.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BFdiTpw2.js";import"./button-styles-CKzIKWn5.js";const q={default:null,success:"check_circle",error:"error",warning:"warning",unsave:null},W={default:"border-outline-variant",success:"border-success",error:"border-error",warning:"border-warning",unsave:"border-outline-variant"},y={default:"text-on-surface",success:"text-success",error:"text-error",warning:"text-warning",unsave:"text-on-surface"};function n({message:s,variant:a="default",open:r=!0,onDismiss:o,duration:N,action:g,secondaryAction:f,loading:x=!1,inline:T=!1,className:A}){const[w,j]=v.useState(!1),b=N??(a==="unsave"?0:4e3);if(v.useEffect(()=>{if(r){const h=requestAnimationFrame(()=>j(!0));return()=>cancelAnimationFrame(h)}else j(!1)},[r]),v.useEffect(()=>{if(!r||b===0||!o)return;const h=setTimeout(o,b);return()=>clearTimeout(h)},[r,b,o]),!r&&!w)return null;const S=q[a],C=!!g||!!f;return e.jsx("div",{className:t("z-50 flex justify-center px-4","transition-all duration-300 ease-out",T?"absolute bottom-4 inset-x-0":"fixed bottom-4 inset-x-0",w&&r?"translate-y-0 opacity-100":"translate-y-8 opacity-0 pointer-events-none",A),role:"status","aria-live":"polite","aria-busy":x,children:e.jsx("div",{className:t("w-full max-w-2xl bg-surface-container-high border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/40",W[a]),children:e.jsxs("div",{className:t("px-5 flex items-center justify-between gap-4 whitespace-nowrap min-h-12",C?"py-1.5":"py-2.5"),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[a==="unsave"&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-warning animate-pulse shrink-0"}),S&&e.jsx("span",{className:t("material-symbols-rounded !text-xl shrink-0",y[a]),children:S}),e.jsx("span",{className:t("text-sm",y[a]),children:s})]}),e.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[f&&e.jsx(k,{variant:"text",size:"sm",onClick:f.onClick,disabled:x,className:"!h-8 !py-1 !text-xs",children:f.label}),g&&e.jsx(k,{size:"sm",onClick:g.onClick,loading:x,className:"!h-8 !py-1 !text-xs",children:g.label}),o&&!C&&e.jsx(D,{icon:"close",variant:"text",size:"sm",className:t("-my-1",y[a]),onClick:o,"aria-label":"Dismiss"})]})]})})})}n.__docgenInfo={description:"",methods:[],displayName:"Snackbar",props:{message:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "success" | "error" | "warning" | "unsave"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"success"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"unsave"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},open:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},duration:{required:!1,tsType:{name:"number"},description:"Auto-dismiss after ms (default: 4000, 0 = no auto-dismiss). Unsave defaults to 0."},action:{required:!1,tsType:{name:"SnackbarAction"},description:""},secondaryAction:{required:!1,tsType:{name:"SnackbarAction"},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},inline:{required:!1,tsType:{name:"boolean"},description:"Use absolute positioning instead of fixed viewport",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const _={title:"UI/Feedback/Snackbar",component:n,args:{message:"Changes saved successfully",variant:"default",open:!0,inline:!0},argTypes:{variant:{control:"select",options:["default","success","error","warning","unsave"]},open:{control:"boolean"},loading:{control:"boolean"},inline:{control:"boolean"},duration:{control:"number"},message:{control:"text"}},decorators:[s=>e.jsx("div",{className:"relative min-h-[120px] flex items-end justify-center p-4",children:e.jsx(s,{})})]},i={},c={render:s=>e.jsxs("div",{className:"flex flex-col gap-16",children:[e.jsx(n,{...s,variant:"default",message:"Default notification"}),e.jsx(n,{...s,variant:"success",message:"Changes saved successfully"}),e.jsx(n,{...s,variant:"error",message:"Failed to save changes"}),e.jsx(n,{...s,variant:"warning",message:"Connection unstable"}),e.jsx(n,{...s,variant:"unsave",message:"You have unsaved changes"})]})},l={args:{message:"File uploaded",variant:"success",onDismiss:()=>{}}},d={args:{message:"Item deleted",action:{label:"Undo",onClick:()=>{}}}},u={args:{message:"Discard draft?",action:{label:"Discard",onClick:()=>{}},secondaryAction:{label:"Keep editing",onClick:()=>{}}}},m={args:{message:"Restoring item...",loading:!0,action:{label:"Undo",onClick:()=>{}}}},p={render:s=>{const[a,r]=v.useState(!1);return e.jsxs("div",{className:"relative min-h-[120px]",children:[e.jsx(k,{onClick:()=>r(!0),children:"Show Snackbar"}),e.jsx(n,{...s,message:"Action completed",variant:"success",open:a,onDismiss:()=>r(!1),duration:3e3})]})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-16">
      <Snackbar {...args} variant="default" message="Default notification" />
      <Snackbar {...args} variant="success" message="Changes saved successfully" />
      <Snackbar {...args} variant="error" message="Failed to save changes" />
      <Snackbar {...args} variant="warning" message="Connection unstable" />
      <Snackbar {...args} variant="unsave" message="You have unsaved changes" />
    </div>
}`,...c.parameters?.docs?.source},description:{story:"All variants",...c.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    message: "File uploaded",
    variant: "success",
    onDismiss: () => {}
  }
}`,...l.parameters?.docs?.source},description:{story:"With dismiss close button",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Item deleted",
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...d.parameters?.docs?.source},description:{story:"With action buttons",...d.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Discard draft?",
    action: {
      label: "Discard",
      onClick: () => {}
    },
    secondaryAction: {
      label: "Keep editing",
      onClick: () => {}
    }
  }
}`,...u.parameters?.docs?.source},description:{story:"With primary and secondary actions",...u.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Restoring item...",
    loading: true,
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...m.parameters?.docs?.source},description:{story:"Loading state on primary action",...m.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(false);
    return <div className="relative min-h-[120px]">
        <Button onClick={() => setOpen(true)}>Show Snackbar</Button>
        <Snackbar {...args} message="Action completed" variant="success" open={open} onDismiss={() => setOpen(false)} duration={3000} />
      </div>;
  }
}`,...p.parameters?.docs?.source},description:{story:"Toggle snackbar open/closed with a button",...p.parameters?.docs?.description}}};const z=["Playground","Variants","WithDismiss","WithActions","WithBothActions","Loading","ToggleDemo"];export{m as Loading,i as Playground,p as ToggleDemo,c as Variants,d as WithActions,u as WithBothActions,l as WithDismiss,z as __namedExportsOrder,_ as default};
