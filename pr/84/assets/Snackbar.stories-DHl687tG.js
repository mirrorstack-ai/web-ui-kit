import{r as p,j as e}from"./iframe-C2FTIj0P.js";import{c as t}from"./cn-IyxL_b2c.js";import{B as j}from"./Button-uKoE1PjR.js";import{I as q}from"./IconButton-RYqYJ2nk.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-Bwl8nEB3.js";import"./button-styles-CKzIKWn5.js";const W={default:null,success:"check_circle",error:"error",warning:"warning",unsave:null},B={default:"border-outline-variant",success:"border-success",error:"border-error",warning:"border-warning",unsave:"border-outline-variant"},k={default:"text-on-surface",success:"text-success",error:"text-error",warning:"text-warning",unsave:"text-on-surface"};function n({message:s,variant:a="default",open:r=!0,onDismiss:g,duration:T,action:f,secondaryAction:v,loading:x=!1,inline:D=!1,className:A}){const[w,S]=p.useState(!1),b=p.useRef(g);b.current=g;const h=T??(a==="unsave"?0:4e3);if(p.useEffect(()=>{if(r){const y=requestAnimationFrame(()=>S(!0));return()=>cancelAnimationFrame(y)}else S(!1)},[r]),p.useEffect(()=>{if(!r||h===0||!b.current)return;const y=setTimeout(()=>b.current?.(),h);return()=>clearTimeout(y)},[r,h]),!r&&!w)return null;const C=W[a],N=!!f||!!v;return e.jsx("div",{className:t("z-50 flex justify-center px-4","transition-all duration-300 ease-out",D?"absolute bottom-4 inset-x-0":"fixed bottom-4 inset-x-0",w&&r?"translate-y-0 opacity-100":"translate-y-8 opacity-0 pointer-events-none",A),role:"status","aria-live":"polite","aria-busy":x,children:e.jsx("div",{className:t("w-fit min-w-[280px] max-w-2xl bg-surface-container-high border rounded-2xl shadow-md",B[a]),children:e.jsxs("div",{className:t("px-5 flex items-center justify-between gap-4 min-h-12",N?"py-1.5":"py-2.5"),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[a==="unsave"&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-warning animate-pulse shrink-0"}),C&&e.jsx("span",{className:t("material-symbols-rounded !text-xl shrink-0",k[a]),children:C}),e.jsx("span",{className:t("text-sm whitespace-nowrap",k[a]),children:s})]}),e.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[v&&e.jsx(j,{variant:"text",size:"sm",onClick:v.onClick,disabled:x,className:"!h-8 !py-1 !text-xs",children:v.label}),f&&e.jsx(j,{size:"sm",onClick:f.onClick,loading:x,className:"!h-8 !py-1 !text-xs",children:f.label}),g&&!N&&e.jsx(q,{icon:"close",variant:"text",size:"sm",className:t("-my-1",k[a]),onClick:g,"aria-label":"Dismiss"})]})]})})})}n.__docgenInfo={description:"",methods:[],displayName:"Snackbar",props:{message:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "success" | "error" | "warning" | "unsave"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"success"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"unsave"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},open:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},duration:{required:!1,tsType:{name:"number"},description:"Auto-dismiss after ms (default: 4000, 0 = no auto-dismiss). Unsave defaults to 0."},action:{required:!1,tsType:{name:"SnackbarAction"},description:""},secondaryAction:{required:!1,tsType:{name:"SnackbarAction"},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},inline:{required:!1,tsType:{name:"boolean"},description:"Use absolute positioning instead of fixed viewport",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const _={title:"UI/Feedback/Snackbar",component:n,args:{message:"Changes saved successfully",variant:"default",open:!0,inline:!0},argTypes:{variant:{control:"select",options:["default","success","error","warning","unsave"]},open:{control:"boolean"},loading:{control:"boolean"},inline:{control:"boolean"},duration:{control:"number"},message:{control:"text"}},decorators:[s=>e.jsx("div",{className:"relative min-h-[200px] flex items-end justify-center p-4",children:e.jsx(s,{})})]},i={},o={render:s=>e.jsxs("div",{className:"flex flex-col gap-16",children:[e.jsx(n,{...s,variant:"default",message:"Default notification"}),e.jsx(n,{...s,variant:"success",message:"Changes saved successfully"}),e.jsx(n,{...s,variant:"error",message:"Failed to save changes"}),e.jsx(n,{...s,variant:"warning",message:"Connection unstable"}),e.jsx(n,{...s,variant:"unsave",message:"You have unsaved changes"})]})},c={args:{message:"File uploaded",variant:"success",onDismiss:()=>{}}},l={args:{message:"Item deleted",action:{label:"Undo",onClick:()=>{}}}},d={args:{message:"Discard draft?",action:{label:"Discard",onClick:()=>{}},secondaryAction:{label:"Keep editing",onClick:()=>{}}}},u={args:{message:"Restoring item...",loading:!0,action:{label:"Undo",onClick:()=>{}}}},m={render:s=>{const[a,r]=p.useState(!1);return e.jsxs("div",{className:"relative min-h-[200px]",children:[e.jsx(j,{onClick:()=>r(!0),children:"Show Snackbar"}),e.jsx(n,{...s,message:"Action completed",variant:"success",open:a,onDismiss:()=>r(!1),duration:3e3,inline:!0})]})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...i.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-16">
      <Snackbar {...args} variant="default" message="Default notification" />
      <Snackbar {...args} variant="success" message="Changes saved successfully" />
      <Snackbar {...args} variant="error" message="Failed to save changes" />
      <Snackbar {...args} variant="warning" message="Connection unstable" />
      <Snackbar {...args} variant="unsave" message="You have unsaved changes" />
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All variants",...o.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    message: "File uploaded",
    variant: "success",
    onDismiss: () => {}
  }
}`,...c.parameters?.docs?.source},description:{story:"With dismiss close button",...c.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Item deleted",
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...l.parameters?.docs?.source},description:{story:"With action buttons",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source},description:{story:"With primary and secondary actions",...d.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Restoring item...",
    loading: true,
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...u.parameters?.docs?.source},description:{story:"Loading state on primary action",...u.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(false);
    return <div className="relative min-h-[200px]">
        <Button onClick={() => setOpen(true)}>Show Snackbar</Button>
        <Snackbar {...args} message="Action completed" variant="success" open={open} onDismiss={() => setOpen(false)} duration={3000} inline />
      </div>;
  }
}`,...m.parameters?.docs?.source},description:{story:"Toggle snackbar open/closed with a button",...m.parameters?.docs?.description}}};const z=["Playground","Variants","WithDismiss","WithActions","WithBothActions","Loading","ToggleDemo"];export{u as Loading,i as Playground,m as ToggleDemo,o as Variants,l as WithActions,d as WithBothActions,c as WithDismiss,z as __namedExportsOrder,_ as default};
