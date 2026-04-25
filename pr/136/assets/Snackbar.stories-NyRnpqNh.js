import{r as f,j as e}from"./iframe-d2yGrjW1.js";import{a as s}from"./Snackbar-C4UYwgSb.js";import{B as u}from"./Button-BWrFH3tM.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-Dm6ZpnQJ.js";import"./Progress-BAu8mwVP.js";import"./Icon-BT2b1L_M.js";import"./button-styles-DvQkePbc.js";const I={title:"UI/Feedback/Snackbar",component:s,args:{message:"Changes saved successfully",variant:"default",open:!0,inline:!0},argTypes:{variant:{control:"select",options:["default","success","error","warning","unsave"]},open:{control:"boolean"},loading:{control:"boolean"},inline:{control:"boolean"},duration:{control:"number"},message:{control:"text"}},decorators:[a=>e.jsx("div",{className:"relative min-h-[200px] flex items-end justify-center p-4",children:e.jsx(a,{})})]},r={},o={render:a=>e.jsxs("div",{className:"flex flex-col gap-16",children:[e.jsx(s,{...a,variant:"default",message:"Default notification"}),e.jsx(s,{...a,variant:"success",message:"Changes saved successfully"}),e.jsx(s,{...a,variant:"error",message:"Failed to save changes"}),e.jsx(s,{...a,variant:"warning",message:"Connection unstable"}),e.jsx(s,{...a,variant:"unsave",message:"You have unsaved changes"})]})},t={args:{message:"File uploaded",variant:"success",onDismiss:()=>{}}},i={args:{message:"Item deleted",action:{label:"Undo",onClick:()=>{}}}},c={args:{message:"Discard draft?",action:{label:"Discard",onClick:()=>{}},secondaryAction:{label:"Keep editing",onClick:()=>{}}}},l={args:{message:"Restoring item...",loading:!0,action:{label:"Undo",onClick:()=>{}}}},d={render:a=>{const[k,h]=f.useState([]),m=(n,p,v,S)=>{h(b=>n==="unsave"&&b.some(x=>x.variant==="unsave")?b:[{id:Date.now(),message:p,variant:n,duration:v,hasActions:S},...b])},g=n=>{h(p=>p.filter(v=>v.id!==n))};return e.jsxs("div",{className:"relative min-h-[400px]",children:[e.jsxs("div",{className:"flex gap-3 flex-wrap",children:[e.jsx(u,{onClick:()=>m("success","Action completed",3e3),children:"Show Success"}),e.jsx(u,{variant:"outline",color:"error",onClick:()=>m("error","Something went wrong",3e3),children:"Show Error"}),e.jsx(u,{variant:"outline",color:"warning",onClick:()=>m("warning","Connection unstable",3e3),children:"Show Warning"}),e.jsx(u,{variant:"outline",color:"warning",onClick:()=>m("unsave","You have unsaved changes",0,!0),children:"Show Unsaved Changes"})]}),e.jsx("div",{className:"absolute bottom-4 inset-x-0 flex flex-col-reverse items-center gap-3 px-4",children:k.map(n=>e.jsx(s,{...a,message:n.message,variant:n.variant,open:!0,onDismiss:()=>g(n.id),duration:n.duration,...n.hasActions&&{action:{label:"Save",onClick:()=>g(n.id)},secondaryAction:{label:"Reset",onClick:()=>g(n.id)}},className:"!relative !inset-auto !p-0 !w-full !max-w-lg"},n.id))})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-16">
      <Snackbar {...args} variant="default" message="Default notification" />
      <Snackbar {...args} variant="success" message="Changes saved successfully" />
      <Snackbar {...args} variant="error" message="Failed to save changes" />
      <Snackbar {...args} variant="warning" message="Connection unstable" />
      <Snackbar {...args} variant="unsave" message="You have unsaved changes" />
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All variants",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    message: "File uploaded",
    variant: "success",
    onDismiss: () => {}
  }
}`,...t.parameters?.docs?.source},description:{story:"With dismiss close button",...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Item deleted",
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...i.parameters?.docs?.source},description:{story:"With action buttons",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source},description:{story:"With primary and secondary actions",...c.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    message: "Restoring item...",
    loading: true,
    action: {
      label: "Undo",
      onClick: () => {}
    }
  }
}`,...l.parameters?.docs?.source},description:{story:"Loading state on primary action",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source},description:{story:"Toggle snackbar open/closed with a button",...d.parameters?.docs?.description}}};const U=["Playground","Variants","WithDismiss","WithActions","WithBothActions","Loading","ToggleDemo"];export{l as Loading,r as Playground,d as ToggleDemo,o as Variants,i as WithActions,c as WithBothActions,t as WithDismiss,U as __namedExportsOrder,I as default};
