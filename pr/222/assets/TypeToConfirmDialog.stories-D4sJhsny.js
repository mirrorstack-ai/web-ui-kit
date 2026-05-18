import{r as o,j as e}from"./iframe-CmZg8DZx.js";import{B as u}from"./Button-BMUjhi48.js";import{C as w}from"./ConsequencesNotice-DxADuRMg.js";import{D as b}from"./Dialog-BMhEi0RF.js";import{F as O}from"./FloatingLabelInput-CSegF4or.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-C4mLQiDa.js";import"./Icon-B8fRg_q-.js";import"./button-styles-BPC6xbbG.js";import"./Alert-DB1YtGRl.js";import"./IconButton-BvnrYn_5.js";function s({open:n,onClose:t,onConfirm:T,phrase:l,warnTitle:D,confirmTitle:x,confirmActionLabel:v,warnActionLabel:A="Continue",color:d="error",consequences:m,loading:c=!1}){const[f,h]=o.useState("warn"),[y,g]=o.useState(""),j=o.useId();o.useEffect(()=>{n||(h("warn"),g(""))},[n]);const k=y.trim().toLowerCase()===l.toLowerCase(),q=x??`Type '${l}' to confirm`,C=p=>({label:"Cancel",variant:"text",onClick:t,disabled:p});return e.jsxs(e.Fragment,{children:[e.jsx(b,{open:n&&f==="warn",onClose:t,title:D,actions:[C(),{label:A,variant:"filled",color:d,onClick:()=>h("type")}],children:m}),e.jsx(b,{open:n&&f==="type",onClose:t,title:q,actions:[C(c),{label:v,variant:"filled",color:d,disabled:!k||c,loading:c,onClick:T}],children:e.jsxs("div",{className:"space-y-3",children:[m,e.jsxs("p",{className:"text-sm text-on-surface-variant",children:["To confirm, type"," ",e.jsx("span",{className:"font-mono font-medium text-on-surface",children:l})," ","below."]}),e.jsx(O,{id:j,type:"text",label:"Confirmation",size:"sm",hideLabel:!0,value:y,onChange:p=>g(p.target.value),autoFocus:!0,autoComplete:"off"})]})})]})}s.__docgenInfo={description:"",methods:[],displayName:"TypeToConfirmDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:"Open state for the entire flow. The component owns the warn→type stage internally."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Fired on Cancel, Escape, backdrop click, or after a successful onConfirm."},onConfirm:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Called when the user types the phrase and clicks the confirm button."},phrase:{required:!0,tsType:{name:"string"},description:`Phrase the user must type. Comparison is case-insensitive and trims
surrounding whitespace.`},warnTitle:{required:!0,tsType:{name:"string"},description:'Title for the warn-step Dialog (e.g. "Disable this account?").'},confirmTitle:{required:!1,tsType:{name:"string"},description:"Title for the type-step Dialog. Defaults to `Type '<phrase>' to confirm`\nso simple consumers don't have to repeat the phrase."},confirmActionLabel:{required:!0,tsType:{name:"string"},description:'Label for the confirm button on the type step (e.g. "Disable account").'},warnActionLabel:{required:!1,tsType:{name:"string"},description:'Label for the warn-step Continue button. Default "Continue".',defaultValue:{value:'"Continue"',computed:!1}},color:{required:!1,tsType:{name:'ButtonProps["color"]',raw:'ButtonProps["color"]'},description:'Color tone for both action buttons. Default "error".',defaultValue:{value:'"error"',computed:!1}},consequences:{required:!1,tsType:{name:"ReactNode"},description:`Notice/consequences body. Shown in BOTH stages so the user sees the same
information at the warn step and again when typing to confirm. Typically
a \`<ConsequencesNotice />\`. Should be stateless — it mounts twice (once
per stage Dialog), so any internal state will reset on the warn→type
transition.`},loading:{required:!1,tsType:{name:"boolean"},description:"Loading state for the confirm action. Disables Cancel + Confirm while true.",defaultValue:{value:"false",computed:!1}}}};const z={title:"UI/Surfaces/TypeToConfirmDialog",component:s},r={render:()=>{const[n,t]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(u,{color:"error",onClick:()=>t(!0),children:"Disable account"}),e.jsx(s,{open:n,onClose:()=>t(!1),onConfirm:()=>{t(!1),alert("Account disabled (demo)")},phrase:"disable",warnTitle:"Disable this account?",confirmActionLabel:"Disable account",consequences:e.jsx(w,{title:"Before you continue",items:["You'll be signed out of every device immediately.","API tokens and modules linked to this account stop working.",e.jsxs(e.Fragment,{children:["You can restore the account within ",e.jsx("strong",{children:"90 days"})," via the email link we send."]}),"After 90 days, the account and its data are permanently deleted."]})})]})}},a={render:()=>{const[n,t]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(u,{color:"error",onClick:()=>t(!0),children:"Delete app"}),e.jsx(s,{open:n,onClose:()=>t(!1),onConfirm:()=>{t(!1),alert("App deleted (demo)")},phrase:"delete",warnTitle:"Delete this app?",confirmActionLabel:"Delete app",consequences:e.jsx(w,{title:"Deleting this app will:",items:["Stop all running modules associated with the app.","Revoke API tokens scoped to this app.",e.jsxs(e.Fragment,{children:["Schedule the app's data for deletion in"," ",e.jsx("strong",{children:"30 days"}),"."]}),"Cancel any active subscriptions."]})})]})}},i={render:()=>{const[n,t]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(u,{color:"error",onClick:()=>t(!0),children:"Open"}),e.jsx(s,{open:n,onClose:()=>t(!1),onConfirm:()=>t(!1),phrase:"confirm",warnTitle:"Are you sure?",confirmActionLabel:"Yes, do it"})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button color="error" onClick={() => setOpen(true)}>
          Disable account
        </Button>
        <TypeToConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => {
        setOpen(false);
        // eslint-disable-next-line no-alert
        alert("Account disabled (demo)");
      }} phrase="disable" warnTitle="Disable this account?" confirmActionLabel="Disable account" consequences={<ConsequencesNotice title="Before you continue" items={["You'll be signed out of every device immediately.", "API tokens and modules linked to this account stop working.", <>
                  You can restore the account within <strong>90 days</strong> via
                  the email link we send.
                </>, "After 90 days, the account and its data are permanently deleted."]} />} />
      </>;
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button color="error" onClick={() => setOpen(true)}>
          Delete app
        </Button>
        <TypeToConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => {
        setOpen(false);
        // eslint-disable-next-line no-alert
        alert("App deleted (demo)");
      }} phrase="delete" warnTitle="Delete this app?" confirmActionLabel="Delete app" consequences={<ConsequencesNotice title="Deleting this app will:" items={["Stop all running modules associated with the app.", "Revoke API tokens scoped to this app.", <>
                  Schedule the app's data for deletion in{" "}
                  <strong>30 days</strong>.
                </>, "Cancel any active subscriptions."]} />} />
      </>;
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button color="error" onClick={() => setOpen(true)}>
          Open
        </Button>
        <TypeToConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} phrase="confirm" warnTitle="Are you sure?" confirmActionLabel="Yes, do it" />
      </>;
  }
}`,...i.parameters?.docs?.source}}};const H=["DisableAccount","DeleteApp","NoConsequencesBody"];export{a as DeleteApp,r as DisableAccount,i as NoConsequencesBody,H as __namedExportsOrder,z as default};
