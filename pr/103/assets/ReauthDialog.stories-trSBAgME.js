import{r as o,j as e}from"./iframe-CCuhc2Dc.js";import{D as N}from"./Dialog-CrvFdITl.js";import{B as y}from"./Button-DBA0Qc4y.js";import{I}from"./Icon-CXqVnF1T.js";import{A as q}from"./Alert-C9VeevKZ.js";import{F}from"./FloatingLabelInput-CzANXVyL.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-DZEHjny0.js";import"./button-styles-DvQkePbc.js";import"./IconButton-C-ddoYkl.js";function d({open:t,onClose:r,onSuccess:n,title:l="Verify your identity",description:O="For your security, please verify your identity before continuing.",methods:h=["passkey","password"],onPasswordVerify:x,onPasskeyVerify:P,className:V}){const v=h.includes("passkey"),T=h.includes("password"),[w,j]=o.useState(""),[C,a]=o.useState(null),[i,c]=o.useState(!1),[E,g]=o.useState(!1),k=!v||E,u=o.useCallback(()=>{j(""),a(null),c(!1),g(!1)},[]);o.useEffect(()=>{t&&u()},[t,u]);const S=()=>{i||(u(),r())},b=async()=>{if(!w){a("Password is required");return}a(null),c(!0);try{if(!x)throw new Error("Password verification not configured");const s=await x(w);u(),n(s)}catch(s){a(s instanceof Error?s.message:"Incorrect password")}finally{c(!1)}},D=async()=>{a(null),c(!0);try{if(!P)throw new Error("Passkey verification not configured");const s=await P();u(),n(s)}catch(s){s instanceof DOMException&&s.name==="NotAllowedError"||a(s instanceof Error?s.message:"Passkey verification failed")}finally{c(!1)}};return e.jsxs(N,{open:t,onClose:S,title:l,className:V,actions:k?[{label:"Cancel",variant:"text",onClick:S,disabled:i},{label:"Verify",variant:"filled",onClick:b,loading:i}]:void 0,children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:O}),!k&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(I,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(y,{onClick:D,loading:i,fullWidth:!0,children:"Verify with passkey"}),T&&e.jsx("button",{type:"button",onClick:()=>{a(null),g(!0)},disabled:i,className:"text-sm text-primary hover:underline disabled:opacity-50",children:"Use password instead"})]}),k&&e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(F,{type:"password",id:"reauth-password",label:"Password",value:w,onChange:s=>j(s.target.value),disabled:i,onKeyDown:s=>{s.key==="Enter"&&b()},showPasswordToggle:!0}),v&&e.jsx("button",{type:"button",onClick:()=>{a(null),g(!1)},disabled:i,className:"text-sm text-primary hover:underline disabled:opacity-50 self-start",children:"Use passkey instead"})]}),C&&e.jsx(q,{variant:"error",onDismiss:()=>a(null),className:"mt-4",children:C})]})}d.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("password" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "password"]',computed:!1}},onPasswordVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"(password: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"password"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:""},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const H={title:"UI/Surfaces/ReauthDialog",component:d},p={render:()=>{const[t,r]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(y,{onClick:()=>r(!0),children:"Delete Account"}),e.jsx(d,{open:t,onClose:()=>r(!1),onSuccess:n=>{console.log("Reauth token:",n),r(!1)},onPasswordVerify:async n=>{if(await new Promise(l=>setTimeout(l,1e3)),n==="password")return"mock-reauth-token";throw new Error("Incorrect password")},onPasskeyVerify:async()=>(await new Promise(n=>setTimeout(n,1e3)),"mock-passkey-token")})]})}},m={render:()=>{const[t,r]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(y,{onClick:()=>r(!0),children:"Sensitive Action"}),e.jsx(d,{open:t,onClose:()=>r(!1),onSuccess:()=>r(!1),methods:["password"],onPasswordVerify:async n=>{if(await new Promise(l=>setTimeout(l,500)),n==="password")return"token";throw new Error("Incorrect password")}})]})}},f={render:()=>{const[t,r]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(y,{onClick:()=>r(!0),children:"Verify"}),e.jsx(d,{open:t,onClose:()=>r(!1),onSuccess:()=>r(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(n=>setTimeout(n,1e3)),"passkey-token")})]})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Delete Account</Button>
        <ReauthDialog open={open} onClose={() => setOpen(false)} onSuccess={token => {
        console.log("Reauth token:", token);
        setOpen(false);
      }} onPasswordVerify={async pw => {
        await new Promise(r => setTimeout(r, 1000));
        if (pw === "password") return "mock-reauth-token";
        throw new Error("Incorrect password");
      }} onPasskeyVerify={async () => {
        await new Promise(r => setTimeout(r, 1000));
        return "mock-passkey-token";
      }} />
      </>;
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Sensitive Action</Button>
        <ReauthDialog open={open} onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} methods={["password"]} onPasswordVerify={async pw => {
        await new Promise(r => setTimeout(r, 500));
        if (pw === "password") return "token";
        throw new Error("Incorrect password");
      }} />
      </>;
  }
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Verify</Button>
        <ReauthDialog open={open} onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} methods={["passkey"]} onPasskeyVerify={async () => {
        await new Promise(r => setTimeout(r, 1000));
        return "passkey-token";
      }} />
      </>;
  }
}`,...f.parameters?.docs?.source}}};const J=["Playground","PasswordOnly","PasskeyOnly"];export{f as PasskeyOnly,m as PasswordOnly,p as Playground,J as __namedExportsOrder,H as default};
