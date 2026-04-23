import{r as s,j as e}from"./iframe-3EL5WlW6.js";import{D as i}from"./Dialog-DEpYYhV3.js";import{B as c}from"./Button-0R8ujUFG.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-CNOgPxyD.js";import"./Icon-CjUGc5xJ.js";import"./button-styles-DvQkePbc.js";const b={title:"UI/Surfaces/Dialog",component:i,args:{open:!0,title:"Confirm action",children:"Are you sure you want to proceed? This action cannot be undone."},argTypes:{open:{control:"boolean"},title:{control:"text"}}},a={args:{actions:[{label:"Cancel",onClick:()=>{}},{label:"Confirm",onClick:()=>{},variant:"filled"}]}},t={render:()=>{const[r,n]=s.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c,{onClick:()=>n(!0),children:"Open Dialog"}),e.jsx(i,{open:r,onClose:()=>n(!1),title:"Delete item?",actions:[{label:"Cancel",onClick:()=>n(!1)},{label:"Delete",onClick:()=>n(!1),variant:"filled",color:"error"}],children:e.jsx("p",{className:"text-on-surface-variant text-sm",children:"This will permanently delete the item. You cannot undo this action."})})]})}},o={args:{title:"Saving changes",children:"Please wait while your changes are being saved...",actions:[{label:"Cancel",onClick:()=>{},disabled:!0},{label:"Saving...",onClick:()=>{},variant:"filled",loading:!0}]}},l={args:{title:void 0,children:"A simple message dialog without a title heading.",actions:[{label:"OK",onClick:()=>{},variant:"filled"}]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    actions: [{
      label: "Cancel",
      onClick: () => {}
    }, {
      label: "Confirm",
      onClick: () => {},
      variant: "filled"
    }]
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Delete item?" actions={[{
        label: "Cancel",
        onClick: () => setOpen(false)
      }, {
        label: "Delete",
        onClick: () => setOpen(false),
        variant: "filled",
        color: "error"
      }]}>
          <p className="text-on-surface-variant text-sm">
            This will permanently delete the item. You cannot undo this action.
          </p>
        </Dialog>
      </>;
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Saving changes",
    children: "Please wait while your changes are being saved...",
    actions: [{
      label: "Cancel",
      onClick: () => {},
      disabled: true
    }, {
      label: "Saving...",
      onClick: () => {},
      variant: "filled",
      loading: true
    }]
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: undefined,
    children: "A simple message dialog without a title heading.",
    actions: [{
      label: "OK",
      onClick: () => {},
      variant: "filled"
    }]
  }
}`,...l.parameters?.docs?.source}}};const v=["Playground","WithActions","LoadingAction","NoTitle"];export{o as LoadingAction,l as NoTitle,a as Playground,t as WithActions,v as __namedExportsOrder,b as default};
