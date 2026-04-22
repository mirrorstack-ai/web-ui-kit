import{r as k,j as e}from"./iframe-DcLlGpZm.js";import{c as l}from"./cn-IyxL_b2c.js";import{B as d}from"./Button-RNNpW3ew.js";import{I as B}from"./IconButton-blIN06mh.js";import{I as q}from"./Icon-DtCITgil.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-D0c_Ajf6.js";import"./button-styles-DvQkePbc.js";const W={default:null,success:"check_circle",error:"error",warning:"warning",unsave:null},U={default:"border-outline-variant",success:"border-success",error:"border-error",warning:"border-warning",unsave:"border-outline-variant"},A={default:"text-on-surface",success:"text-success",error:"text-error",warning:"text-warning",unsave:"text-on-surface"},I="!h-8 !py-1 !text-xs";function o({message:n,variant:s="default",open:r=!0,onDismiss:t,duration:u,action:a,secondaryAction:i,loading:c=!1,inline:S=!1,className:m}){const[w,T]=k.useState(!1),y=k.useRef(t);y.current=t;const C=u??(s==="unsave"?0:4e3);if(k.useEffect(()=>{if(r){const N=requestAnimationFrame(()=>T(!0));return()=>cancelAnimationFrame(N)}else T(!1)},[r]),k.useEffect(()=>{if(!r||C===0||!y.current)return;const N=setTimeout(()=>y.current?.(),C);return()=>clearTimeout(N)},[r,C]),!r&&!w)return null;const D=W[s],j=!!a||!!i;return e.jsx("div",{className:l("z-50 flex justify-center px-4","transition-all duration-300 ease-out",S?"absolute bottom-4 inset-x-0":"fixed bottom-4 inset-x-0",w&&r?"translate-y-0 opacity-100":"translate-y-8 opacity-0 pointer-events-none",m),role:"status","aria-live":"polite","aria-busy":c,children:e.jsx("div",{className:l("w-full max-w-lg bg-surface-container-high border rounded-2xl shadow-md",U[s]),children:e.jsxs("div",{className:l("px-3 sm:px-4 flex min-h-12",j?"flex-col items-start gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2":"items-center justify-between gap-3 py-2.5"),children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-0 flex-1",children:[s==="unsave"&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-warning animate-pulse shrink-0"}),D&&e.jsx(q,{name:D,size:20,className:A[s]}),e.jsx("span",{className:l("text-sm line-clamp-3 break-all",A[s]),children:n})]}),e.jsxs("div",{className:l("flex items-center gap-2 shrink-0 self-center",j&&"self-end sm:self-center w-full sm:w-auto"),children:[i&&e.jsx(d,{variant:"outline",size:"sm",onClick:i.onClick,disabled:c,className:I+" flex-1 sm:flex-none sm:border-0 sm:bg-transparent",children:i.label}),a&&e.jsx(d,{size:"sm",onClick:a.onClick,loading:c,className:I+" flex-1 sm:flex-none",children:a.label}),t&&!j&&e.jsx(B,{icon:"close",variant:"text",size:"sm",className:l("-my-1",A[s]),onClick:t,"aria-label":"Dismiss"})]})]})})})}o.__docgenInfo={description:"",methods:[],displayName:"Snackbar",props:{message:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "success" | "error" | "warning" | "unsave"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"success"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"unsave"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},open:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},duration:{required:!1,tsType:{name:"number"},description:"Auto-dismiss after ms (default: 4000, 0 = no auto-dismiss). Unsave defaults to 0."},action:{required:!1,tsType:{name:"SnackbarAction"},description:""},secondaryAction:{required:!1,tsType:{name:"SnackbarAction"},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},inline:{required:!1,tsType:{name:"boolean"},description:"Use absolute positioning instead of fixed viewport",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const K={title:"UI/Feedback/Snackbar",component:o,args:{message:"Changes saved successfully",variant:"default",open:!0,inline:!0},argTypes:{variant:{control:"select",options:["default","success","error","warning","unsave"]},open:{control:"boolean"},loading:{control:"boolean"},inline:{control:"boolean"},duration:{control:"number"},message:{control:"text"}},decorators:[n=>e.jsx("div",{className:"relative min-h-[200px] flex items-end justify-center p-4",children:e.jsx(n,{})})]},p={},g={render:n=>e.jsxs("div",{className:"flex flex-col gap-16",children:[e.jsx(o,{...n,variant:"default",message:"Default notification"}),e.jsx(o,{...n,variant:"success",message:"Changes saved successfully"}),e.jsx(o,{...n,variant:"error",message:"Failed to save changes"}),e.jsx(o,{...n,variant:"warning",message:"Connection unstable"}),e.jsx(o,{...n,variant:"unsave",message:"You have unsaved changes"})]})},v={args:{message:"File uploaded",variant:"success",onDismiss:()=>{}}},f={args:{message:"Item deleted",action:{label:"Undo",onClick:()=>{}}}},b={args:{message:"Discard draft?",action:{label:"Discard",onClick:()=>{}},secondaryAction:{label:"Keep editing",onClick:()=>{}}}},x={args:{message:"Restoring item...",loading:!0,action:{label:"Undo",onClick:()=>{}}}},h={render:n=>{const[s,r]=k.useState([]),t=(a,i,c,S)=>{r(m=>a==="unsave"&&m.some(w=>w.variant==="unsave")?m:[{id:Date.now(),message:i,variant:a,duration:c,hasActions:S},...m])},u=a=>{r(i=>i.filter(c=>c.id!==a))};return e.jsxs("div",{className:"relative min-h-[400px]",children:[e.jsxs("div",{className:"flex gap-3 flex-wrap",children:[e.jsx(d,{onClick:()=>t("success","Action completed",3e3),children:"Show Success"}),e.jsx(d,{variant:"outline",color:"error",onClick:()=>t("error","Something went wrong",3e3),children:"Show Error"}),e.jsx(d,{variant:"outline",color:"warning",onClick:()=>t("warning","Connection unstable",3e3),children:"Show Warning"}),e.jsx(d,{variant:"outline",color:"warning",onClick:()=>t("unsave","You have unsaved changes",0,!0),children:"Show Unsaved Changes"})]}),e.jsx("div",{className:"absolute bottom-4 inset-x-0 flex flex-col-reverse items-center gap-3 px-4",children:s.map(a=>e.jsx(o,{...n,message:a.message,variant:a.variant,open:!0,onDismiss:()=>u(a.id),duration:a.duration,...a.hasActions&&{action:{label:"Save",onClick:()=>u(a.id)},secondaryAction:{label:"Reset",onClick:()=>u(a.id)}},className:"!relative !inset-auto !p-0 !w-full !max-w-lg"},a.id))})]})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{}",...p.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...p.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-16">
      <Snackbar {...args} variant="default" message="Default notification" />
      <Snackbar {...args} variant="success" message="Changes saved successfully" />
      <Snackbar {...args} variant="error" message="Failed to save changes" />
      <Snackbar {...args} variant="warning" message="Connection unstable" />
      <Snackbar {...args} variant="unsave" message="You have unsaved changes" />
    </div>
}`,...g.parameters?.docs?.source},description:{story:"All variants",...g.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    message: "File uploaded",
    variant: "success",
    onDismiss: () => {}
  }
}`,...v.parameters?.docs?.source},description:{story:"With dismiss close button",...v.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Item deleted",
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...f.parameters?.docs?.source},description:{story:"With action buttons",...f.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source},description:{story:"With primary and secondary actions",...b.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Restoring item...",
    loading: true,
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...x.parameters?.docs?.source},description:{story:"Loading state on primary action",...x.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => {
    interface SnackbarItem {
      id: number;
      message: string;
      variant: SnackbarVariant;
      duration?: number;
      hasActions?: boolean;
    }
    const [items, setItems] = useState<SnackbarItem[]>([]);
    const addSnackbar = (variant: SnackbarVariant, message: string, duration?: number, hasActions?: boolean) => {
      setItems(prev => {
        if (variant === "unsave" && prev.some(item => item.variant === "unsave")) {
          return prev;
        }
        return [{
          id: Date.now(),
          message,
          variant,
          duration,
          hasActions
        }, ...prev];
      });
    };
    const removeSnackbar = (id: number) => {
      setItems(prev => prev.filter(item => item.id !== id));
    };
    return <div className="relative min-h-[400px]">
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => addSnackbar("success", "Action completed", 3000)}>
            Show Success
          </Button>
          <Button variant="outline" color="error" onClick={() => addSnackbar("error", "Something went wrong", 3000)}>
            Show Error
          </Button>
          <Button variant="outline" color="warning" onClick={() => addSnackbar("warning", "Connection unstable", 3000)}>
            Show Warning
          </Button>
          <Button variant="outline" color="warning" onClick={() => addSnackbar("unsave", "You have unsaved changes", 0, true)}>
            Show Unsaved Changes
          </Button>
        </div>
        <div className="absolute bottom-4 inset-x-0 flex flex-col-reverse items-center gap-3 px-4">
          {items.map(item => <Snackbar key={item.id} {...args} message={item.message} variant={item.variant} open onDismiss={() => removeSnackbar(item.id)} duration={item.duration} {...item.hasActions && {
          action: {
            label: "Save",
            onClick: () => removeSnackbar(item.id)
          },
          secondaryAction: {
            label: "Reset",
            onClick: () => removeSnackbar(item.id)
          }
        }} className="!relative !inset-auto !p-0 !w-full !max-w-lg" />)}
        </div>
      </div>;
  }
}`,...h.parameters?.docs?.source},description:{story:"Toggle snackbar open/closed with a button",...h.parameters?.docs?.description}}};const O=["Playground","Variants","WithDismiss","WithActions","WithBothActions","Loading","ToggleDemo"];export{x as Loading,p as Playground,h as ToggleDemo,g as Variants,f as WithActions,b as WithBothActions,v as WithDismiss,O as __namedExportsOrder,K as default};
