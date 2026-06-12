import{j as e,r as d}from"./iframe-aoWeItOi.js";import{D as i}from"./Dialog-MqMozF5k.js";import{B as p}from"./Button-Oc9EHrPz.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-C2R1gUOe.js";import"./Progress-Dam23hCN.js";import"./Icon-CNuDeFgo.js";import"./button-styles-CZHSjrxJ.js";const k={title:"UI/Surfaces/Dialog",component:i,args:{open:!0,title:"Confirm action",children:"Are you sure you want to proceed? This action cannot be undone."},argTypes:{open:{control:"boolean"},title:{control:"text"}}},a={args:{actions:[{label:"Cancel",onClick:()=>{}},{label:"Confirm",onClick:()=>{},variant:"filled"}]}},s={render:()=>{const[c,t]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Open Dialog"}),e.jsx(i,{open:c,onClose:()=>t(!1),title:"Delete item?",actions:[{label:"Cancel",onClick:()=>t(!1)},{label:"Delete",onClick:()=>t(!1),variant:"filled",color:"error"}],children:e.jsx("p",{className:"text-on-surface-variant text-sm",children:"This will permanently delete the item. You cannot undo this action."})})]})}},l={args:{title:"Saving changes",children:"Please wait while your changes are being saved...",actions:[{label:"Cancel",onClick:()=>{},disabled:!0},{label:"Saving...",onClick:()=>{},variant:"filled",loading:!0}]}},r={args:{title:void 0,children:"A simple message dialog without a title heading.",actions:[{label:"OK",onClick:()=>{},variant:"filled"}]}},n={args:{title:"Module detail",onClose:()=>{},children:e.jsxs("p",{className:"text-on-surface-variant text-sm",children:["The close affordance in the corner is provided by Dialog itself — no extra JSX required at the call site. Pass ",e.jsx("code",{className:"font-mono",children:"onClose"})," and it appears."]}),actions:[{label:"Close",onClick:()=>{}},{label:"Install",onClick:()=>{},variant:"filled"}]}},o={args:{title:"Confirm permanent deletion",onClose:()=>{},hideCloseButton:!0,children:e.jsxs("p",{className:"text-on-surface-variant text-sm",children:["With ",e.jsx("code",{className:"font-mono",children:"hideCloseButton"})," the user must choose one of the actions — no X in the corner."]}),actions:[{label:"Cancel",onClick:()=>{}},{label:"Delete",onClick:()=>{},variant:"filled",color:"error"}]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: undefined,
    children: "A simple message dialog without a title heading.",
    actions: [{
      label: "OK",
      onClick: () => {},
      variant: "filled"
    }]
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Module detail",
    onClose: () => {},
    children: <p className="text-on-surface-variant text-sm">
        The close affordance in the corner is provided by Dialog itself — no
        extra JSX required at the call site. Pass <code className="font-mono">onClose</code> and it appears.
      </p>,
    actions: [{
      label: "Close",
      onClick: () => {}
    }, {
      label: "Install",
      onClick: () => {},
      variant: "filled"
    }]
  }
}`,...n.parameters?.docs?.source},description:{story:"The built-in X close button renders at the top-right whenever `onClose` is\nprovided. It anchors to the outer wrapper, not the scrollable inner box, so\nit never gets clipped when the body overflows.",...n.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Confirm permanent deletion",
    onClose: () => {},
    hideCloseButton: true,
    children: <p className="text-on-surface-variant text-sm">
        With <code className="font-mono">hideCloseButton</code> the user must
        choose one of the actions — no X in the corner.
      </p>,
    actions: [{
      label: "Cancel",
      onClick: () => {}
    }, {
      label: "Delete",
      onClick: () => {},
      variant: "filled",
      color: "error"
    }]
  }
}`,...o.parameters?.docs?.source},description:{story:"Pass `hideCloseButton` to suppress the built-in X — useful for hard-confirm\nflows where Escape / backdrop dismissal is also disabled and the only valid\nexit is one of the action buttons.",...o.parameters?.docs?.description}}};const w=["Playground","WithActions","LoadingAction","NoTitle","WithCloseButton","HideCloseButton"];export{o as HideCloseButton,l as LoadingAction,r as NoTitle,a as Playground,s as WithActions,n as WithCloseButton,w as __namedExportsOrder,k as default};
