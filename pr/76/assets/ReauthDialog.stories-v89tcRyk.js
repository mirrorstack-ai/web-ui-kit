import{r as o,j as e}from"./iframe-DpbJH8Nc.js";import{c as C}from"./cn-IyxL_b2c.js";import{B as d}from"./Button-DKjBN8mi.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-CeXzCyDH.js";function w({open:t,onClose:i,onSuccess:n,title:s="Verify your identity",description:c="For your security, please verify your identity before continuing.",methods:k=["passkey","password"],onPasswordVerify:P,onPasskeyVerify:b,className:N}){const v=k.includes("passkey"),S=k.includes("password"),[x,j]=o.useState(""),[O,a]=o.useState(null),[l,u]=o.useState(!1),[E,g]=o.useState(!1),h=!v||E,p=o.useCallback(()=>{j(""),a(null),u(!1),g(!1)},[]);o.useEffect(()=>{t&&p()},[t,p]);const T=()=>{l||(p(),i())},V=async()=>{if(!x){a("Password is required");return}a(null),u(!0);try{if(!P)throw new Error("Password verification not configured");const r=await P(x);p(),n(r)}catch(r){a(r instanceof Error?r.message:"Incorrect password")}finally{u(!1)}},D=async()=>{a(null),u(!0);try{if(!b)throw new Error("Passkey verification not configured");const r=await b();p(),n(r)}catch(r){r instanceof DOMException&&r.name==="NotAllowedError"||a(r instanceof Error?r.message:"Passkey verification failed")}finally{u(!1)}};return t?e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center","aria-modal":"true",role:"dialog","aria-label":s,children:[e.jsx("div",{className:"absolute inset-0 bg-scrim/50",onClick:T,"aria-hidden":"true"}),e.jsxs("div",{className:C("relative z-10 w-full max-w-md rounded-2xl bg-surface-container-low p-6 shadow-xl",N),children:[e.jsx("h2",{className:"text-lg font-semibold text-on-surface",children:s}),e.jsx("p",{className:"mt-2 text-sm text-on-surface-variant",children:c}),e.jsxs("div",{className:"mt-4",children:[!h&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-full bg-primary/10",children:e.jsx("span",{className:"material-symbols-rounded text-primary","aria-hidden":"true",style:{fontSize:28},children:"passkey"})}),e.jsx("p",{className:"text-center text-sm text-on-surface-variant",children:"Use your passkey to verify"}),e.jsx(d,{onClick:D,loading:l,fullWidth:!0,children:"Verify with passkey"}),S&&e.jsx("button",{type:"button",onClick:()=>{a(null),g(!0)},disabled:l,className:"text-sm text-primary hover:underline disabled:opacity-50 cursor-pointer",children:"Use password instead"})]}),h&&e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"reauth-password",className:"mb-1 block text-sm font-medium text-on-surface",children:"Password"}),e.jsx("input",{type:"password",id:"reauth-password",value:x,onChange:r=>j(r.target.value),disabled:l,onKeyDown:r=>{r.key==="Enter"&&V()},autoFocus:!0,className:C("w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors","bg-surface text-on-surface border-outline-variant","focus:border-primary focus:ring-1 focus:ring-primary","disabled:opacity-50 disabled:cursor-not-allowed")})]}),v&&e.jsx("button",{type:"button",onClick:()=>{a(null),g(!1)},disabled:l,className:"self-start text-sm text-primary hover:underline disabled:opacity-50 cursor-pointer",children:"Use passkey instead"})]}),O&&e.jsxs("div",{className:"mt-4 flex items-center gap-3 rounded-xl border bg-error/10 border-error/30 px-4 py-3 text-error",role:"alert",children:[e.jsx("span",{className:"material-symbols-rounded shrink-0","aria-hidden":"true",style:{fontSize:20},children:"error"}),e.jsx("span",{className:"flex-1 text-sm",children:O}),e.jsx("button",{type:"button",onClick:()=>a(null),"aria-label":"Dismiss error",className:"shrink-0 rounded-full p-1 text-current opacity-70 hover:opacity-100 cursor-pointer",children:e.jsx("span",{className:"material-symbols-rounded","aria-hidden":"true",style:{fontSize:18},children:"close"})})]})]}),h&&e.jsxs("div",{className:"mt-6 flex justify-end gap-2",children:[e.jsx(d,{variant:"text",onClick:T,disabled:l,children:"Cancel"}),e.jsx(d,{onClick:V,loading:l,children:"Verify"})]})]})]}):null}w.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:'["passkey", "password"]',computed:!1}},onPasswordVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"(password: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"password"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:""},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const F={title:"UI/Surfaces/ReauthDialog",component:w,args:{open:!0,title:"Verify your identity",description:"For your security, please verify your identity before continuing.",methods:["passkey","password"]},argTypes:{open:{control:"boolean"},title:{control:"text"},description:{control:"text"}}},m={render:t=>{const[i,n]=o.useState(t.open??!0);return e.jsxs("div",{children:[e.jsx(d,{onClick:()=>n(!0),children:"Open ReauthDialog"}),e.jsx(w,{...t,open:i,onClose:()=>n(!1),onSuccess:s=>{n(!1),alert(`Verified! Token: ${s}`)},onPasskeyVerify:async()=>(await new Promise(s=>setTimeout(s,1500)),"passkey-token-abc123"),onPasswordVerify:async s=>{if(await new Promise(c=>setTimeout(c,1e3)),s!=="password")throw new Error("Incorrect password");return"password-token-xyz789"}})]})}},y={render:t=>{const[i,n]=o.useState(!0);return e.jsxs("div",{children:[e.jsx(d,{onClick:()=>n(!0),children:"Open Password Dialog"}),e.jsx(w,{...t,open:i,methods:["password"],onClose:()=>n(!1),onSuccess:s=>{n(!1),alert(`Verified! Token: ${s}`)},onPasswordVerify:async s=>{if(await new Promise(c=>setTimeout(c,1e3)),s!=="password")throw new Error("Incorrect password");return"password-token-xyz789"}})]})}},f={render:t=>{const[i,n]=o.useState(!0);return e.jsxs("div",{children:[e.jsx(d,{onClick:()=>n(!0),children:"Open Passkey Dialog"}),e.jsx(w,{...t,open:i,methods:["passkey"],onClose:()=>n(!1),onSuccess:s=>{n(!1),alert(`Verified! Token: ${s}`)},onPasskeyVerify:async()=>(await new Promise(s=>setTimeout(s,1500)),"passkey-token-abc123")})]})}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(args.open ?? true);
    return <div>
        <Button onClick={() => setOpen(true)}>Open ReauthDialog</Button>
        <ReauthDialog {...args} open={open} onClose={() => setOpen(false)} onSuccess={token => {
        setOpen(false);
        alert(\`Verified! Token: \${token}\`);
      }} onPasskeyVerify={async () => {
        await new Promise(r => setTimeout(r, 1500));
        return "passkey-token-abc123";
      }} onPasswordVerify={async password => {
        await new Promise(r => setTimeout(r, 1000));
        if (password !== "password") {
          throw new Error("Incorrect password");
        }
        return "password-token-xyz789";
      }} />
      </div>;
  }
}`,...m.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...m.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(true);
    return <div>
        <Button onClick={() => setOpen(true)}>Open Password Dialog</Button>
        <ReauthDialog {...args} open={open} methods={["password"]} onClose={() => setOpen(false)} onSuccess={token => {
        setOpen(false);
        alert(\`Verified! Token: \${token}\`);
      }} onPasswordVerify={async password => {
        await new Promise(r => setTimeout(r, 1000));
        if (password !== "password") {
          throw new Error("Incorrect password");
        }
        return "password-token-xyz789";
      }} />
      </div>;
  }
}`,...y.parameters?.docs?.source},description:{story:"Password-only mode",...y.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(true);
    return <div>
        <Button onClick={() => setOpen(true)}>Open Passkey Dialog</Button>
        <ReauthDialog {...args} open={open} methods={["passkey"]} onClose={() => setOpen(false)} onSuccess={token => {
        setOpen(false);
        alert(\`Verified! Token: \${token}\`);
      }} onPasskeyVerify={async () => {
        await new Promise(r => setTimeout(r, 1500));
        return "passkey-token-abc123";
      }} />
      </div>;
  }
}`,...f.parameters?.docs?.source},description:{story:"Passkey-only mode",...f.parameters?.docs?.description}}};const $=["Playground","PasswordOnly","PasskeyOnly"];export{f as PasskeyOnly,y as PasswordOnly,m as Playground,$ as __namedExportsOrder,F as default};
