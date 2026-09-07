import{r as o,j as e}from"./iframe-Cn6WQASE.js";import{B as u}from"./Button-YG5uZKLk.js";import{C as w}from"./ConsequencesNotice-CbWVlsE4.js";import{D as b}from"./Dialog-DQXjOQBD.js";import{F as B}from"./FloatingLabelInput-DrYnA8kD.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-CG5DgF51.js";import"./Icon-NFQIDKzD.js";import"./button-styles-CZHSjrxJ.js";import"./Alert-DpDuFGod.js";import"./IconButton-D6FfoIXv.js";import"./index-C-rtDWSz.js";import"./index-DQ1yhcVU.js";function s({open:n,onClose:t,onConfirm:T,phrase:l,warnTitle:v,confirmTitle:D,confirmActionLabel:x,warnActionLabel:A="Continue",cancelLabel:q="Cancel",confirmInstruction:j,confirmInputLabel:k="Confirmation",color:d="error",consequences:m,loading:c=!1}){const[f,h]=o.useState("warn"),[g,y]=o.useState(""),O=o.useId();o.useEffect(()=>{n||(h("warn"),y(""))},[n]);const S=g.trim().toLowerCase()===l.toLowerCase(),L=D??`Type '${l}' to confirm`,C=p=>({label:q,variant:"text",onClick:t,disabled:p});return e.jsxs(e.Fragment,{children:[e.jsx(b,{open:n&&f==="warn",onClose:t,title:v,actions:[C(),{label:A,variant:"filled",color:d,onClick:()=>h("type")}],children:m}),e.jsx(b,{open:n&&f==="type",onClose:t,title:L,actions:[C(c),{label:x,variant:"filled",color:d,disabled:!S||c,loading:c,onClick:T}],children:e.jsxs("div",{className:"space-y-3",children:[m,e.jsx("p",{className:"text-sm text-on-surface-variant",children:j??e.jsxs(e.Fragment,{children:["To confirm, type"," ",e.jsx("span",{className:"font-mono font-medium text-on-surface",children:l})," ","below."]})}),e.jsx(B,{id:O,type:"text",label:k,size:"sm",hideLabel:!0,value:g,onChange:p=>y(p.target.value),autoFocus:!0,autoComplete:"off"})]})})]})}s.__docgenInfo={description:"",methods:[],displayName:"TypeToConfirmDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:"Open state for the entire flow. The component owns the warn→type stage internally."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Fired on Cancel, Escape, backdrop click, or after a successful onConfirm."},onConfirm:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Called when the user types the phrase and clicks the confirm button."},phrase:{required:!0,tsType:{name:"string"},description:`Phrase the user must type. Comparison is case-insensitive and trims
surrounding whitespace.`},warnTitle:{required:!0,tsType:{name:"string"},description:'Title for the warn-step Dialog (e.g. "Disable this account?").'},confirmTitle:{required:!1,tsType:{name:"string"},description:"Title for the type-step Dialog. Defaults to `Type '<phrase>' to confirm`\nso simple consumers don't have to repeat the phrase."},confirmActionLabel:{required:!0,tsType:{name:"string"},description:'Label for the confirm button on the type step (e.g. "Disable account").'},warnActionLabel:{required:!1,tsType:{name:"string"},description:'Label for the warn-step Continue button. Default "Continue".',defaultValue:{value:'"Continue"',computed:!1}},color:{required:!1,tsType:{name:'ButtonProps["color"]',raw:'ButtonProps["color"]'},description:'Color tone for both action buttons. Default "error".',defaultValue:{value:'"error"',computed:!1}},consequences:{required:!1,tsType:{name:"ReactNode"},description:`Notice/consequences body. Shown in BOTH stages so the user sees the same
information at the warn step and again when typing to confirm. Typically
a \`<ConsequencesNotice />\`. Should be stateless — it mounts twice (once
per stage Dialog), so any internal state will reset on the warn→type
transition.`},loading:{required:!1,tsType:{name:"boolean"},description:"Loading state for the confirm action. Disables Cancel + Confirm while true.",defaultValue:{value:"false",computed:!1}},cancelLabel:{required:!1,tsType:{name:"string"},description:`Label for the Cancel button on BOTH stages. Default "Cancel".

🔴 Every string this component paints needs an override, because the kit
ships one language and its consumers do not. A localized console using this
dialog rendered a Chinese title and consequences around an English
"To confirm, type … below." and an English Cancel — the mixed-language
result is worse than either language alone, and no amount of translation on
the CONSUMER side could reach these.`,defaultValue:{value:'"Cancel"',computed:!1}},confirmInstruction:{required:!1,tsType:{name:"ReactNode"},description:`The sentence above the input. Replaces the default "To confirm, type
<phrase> below." entirely — a ReactNode rather than a template because the
phrase's position inside the sentence differs by language, and a
\`{placeholder}\` string could not carry the phrase's own styling.`},confirmInputLabel:{required:!1,tsType:{name:"string"},description:'Accessible label for the confirmation input. Default "Confirmation".',defaultValue:{value:'"Confirmation"',computed:!1}}}};const G={title:"UI/Surfaces/TypeToConfirmDialog",component:s},a={render:()=>{const[n,t]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(u,{color:"error",onClick:()=>t(!0),children:"Disable account"}),e.jsx(s,{open:n,onClose:()=>t(!1),onConfirm:()=>{t(!1),alert("Account disabled (demo)")},phrase:"disable",warnTitle:"Disable this account?",confirmActionLabel:"Disable account",consequences:e.jsx(w,{title:"Before you continue",items:["You'll be signed out of every device immediately.","API tokens and modules linked to this account stop working.",e.jsxs(e.Fragment,{children:["You can restore the account within ",e.jsx("strong",{children:"90 days"})," via the email link we send."]}),"After 90 days, the account and its data are permanently deleted."]})})]})}},r={render:()=>{const[n,t]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(u,{color:"error",onClick:()=>t(!0),children:"Delete app"}),e.jsx(s,{open:n,onClose:()=>t(!1),onConfirm:()=>{t(!1),alert("App deleted (demo)")},phrase:"delete",warnTitle:"Delete this app?",confirmActionLabel:"Delete app",consequences:e.jsx(w,{title:"Deleting this app will:",items:["Stop all running modules associated with the app.","Revoke API tokens scoped to this app.",e.jsxs(e.Fragment,{children:["Schedule the app's data for deletion in"," ",e.jsx("strong",{children:"30 days"}),"."]}),"Cancel any active subscriptions."]})})]})}},i={render:()=>{const[n,t]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(u,{color:"error",onClick:()=>t(!0),children:"Open"}),e.jsx(s,{open:n,onClose:()=>t(!1),onConfirm:()=>t(!1),phrase:"confirm",warnTitle:"Are you sure?",confirmActionLabel:"Yes, do it"})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button color="error" onClick={() => setOpen(true)}>
          Open
        </Button>
        <TypeToConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} phrase="confirm" warnTitle="Are you sure?" confirmActionLabel="Yes, do it" />
      </>;
  }
}`,...i.parameters?.docs?.source}}};const J=["DisableAccount","DeleteApp","NoConsequencesBody"];export{r as DeleteApp,a as DisableAccount,i as NoConsequencesBody,J as __namedExportsOrder,G as default};
