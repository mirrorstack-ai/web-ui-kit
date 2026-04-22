import{r as a,j as e}from"./iframe-Dod-uYdj.js";import{c as j}from"./cn-IyxL_b2c.js";import{B as k}from"./Button-DBev-t9i.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-UK8fLI5y.js";import"./Icon-FwXyJn7e.js";import"./button-styles-DvQkePbc.js";let l=0;function E(){typeof document>"u"||(l++,l===1&&(document.body.style.overflow="hidden"))}function S(){typeof document>"u"||(l=Math.max(0,l-1),l===0&&(document.body.style.overflow=""))}function h({open:t,onClose:r,title:p,children:w,actions:g,className:D}){const b=a.useId(),v=a.useRef(null),o=a.useRef(null);a.useEffect(()=>{t&&(o.current=document.activeElement)},[t]),a.useEffect(()=>{if(t)return E(),S},[t]);const x=a.useRef(r);return x.current=r,a.useEffect(()=>{if(!t)return;const n=v.current;if(!n)return;n.focus();const s=i=>{if(i.key==="Escape"){x.current?.();return}if(i.key!=="Tab")return;const c=n.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');if(c.length===0){i.preventDefault(),n.focus();return}const y=c[0],C=c[c.length-1];i.shiftKey&&document.activeElement===y?(i.preventDefault(),C.focus()):!i.shiftKey&&document.activeElement===C&&(i.preventDefault(),y.focus())};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[t]),a.useEffect(()=>{t||o.current instanceof HTMLElement&&(o.current.focus(),o.current=null)},[t]),t?e.jsxs(e.Fragment,{children:[e.jsx("div",{"aria-hidden":"true",className:"!m-0 fixed inset-0 z-50 bg-black/50",onClick:()=>r?.()}),e.jsx("div",{className:"!m-0 fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:e.jsxs("div",{ref:v,tabIndex:-1,className:j("bg-surface rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl outline-none pointer-events-auto max-h-[90vh] overflow-y-auto",D),role:"dialog","aria-modal":"true","aria-labelledby":p?b:void 0,children:[p&&e.jsx("h3",{id:b,className:"text-lg font-semibold text-on-surface mb-4",children:p}),w,g&&g.length>0&&e.jsx("div",{className:"flex justify-end gap-3 mt-4",children:g.map((n,s)=>e.jsx(k,{variant:n.variant??"text",color:n.color,onClick:n.onClick,loading:n.loading,disabled:n.disabled,children:n.label},`${s}-${n.label}`))})]})})]}):null}h.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},actions:{required:!1,tsType:{name:"Array",elements:[{name:"DialogAction"}],raw:"DialogAction[]"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const I={title:"UI/Surfaces/Dialog",component:h,args:{open:!0,title:"Confirm action",children:"Are you sure you want to proceed? This action cannot be undone."},argTypes:{open:{control:"boolean"},title:{control:"text"}}},d={args:{actions:[{label:"Cancel",onClick:()=>{}},{label:"Confirm",onClick:()=>{},variant:"filled"}]}},u={render:()=>{const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(k,{onClick:()=>r(!0),children:"Open Dialog"}),e.jsx(h,{open:t,onClose:()=>r(!1),title:"Delete item?",actions:[{label:"Cancel",onClick:()=>r(!1)},{label:"Delete",onClick:()=>r(!1),variant:"filled",color:"error"}],children:e.jsx("p",{className:"text-on-surface-variant text-sm",children:"This will permanently delete the item. You cannot undo this action."})})]})}},f={args:{title:"Saving changes",children:"Please wait while your changes are being saved...",actions:[{label:"Cancel",onClick:()=>{},disabled:!0},{label:"Saving...",onClick:()=>{},variant:"filled",loading:!0}]}},m={args:{title:void 0,children:"A simple message dialog without a title heading.",actions:[{label:"OK",onClick:()=>{},variant:"filled"}]}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: undefined,
    children: "A simple message dialog without a title heading.",
    actions: [{
      label: "OK",
      onClick: () => {},
      variant: "filled"
    }]
  }
}`,...m.parameters?.docs?.source}}};const K=["Playground","WithActions","LoadingAction","NoTitle"];export{f as LoadingAction,m as NoTitle,d as Playground,u as WithActions,K as __namedExportsOrder,I as default};
