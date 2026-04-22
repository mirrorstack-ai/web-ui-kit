import{r as i,j as e}from"./iframe-Dy6ziXL7.js";import{D as M}from"./Dialog-D6BUVq7g.js";import{B as p}from"./Button-C_hriH02.js";import{I as F}from"./Icon-DDc_XVtr.js";import{A as z}from"./Alert-Ca23FuYn.js";import{F as L}from"./FloatingLabelInput-CIRqV883.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-BejQP6jF.js";import"./button-styles-DvQkePbc.js";import"./IconButton-DfKc6KNt.js";function E(r,t){return r instanceof Error?r.message:t}function y({open:r,onClose:t,onSuccess:s,title:l="Verify your identity",description:c="For your security, please verify your identity before continuing.",methods:P=["passkey","email"],onEmailSendCode:j,onEmailVerifyCode:b,onPasskeyVerify:T,className:A}){const V=P.includes("passkey"),B=P.includes("email"),[u,O]=i.useState(""),[w,I]=i.useState(null),[N,a]=i.useState(null),[o,d]=i.useState(!1),[m,v]=i.useState(!1),[_,C]=i.useState(!1),g=!V||_,S=w!==null,f=i.useCallback(()=>{O(""),I(null),a(null),d(!1),v(!1),C(!1)},[]);i.useEffect(()=>{r&&f()},[r,f]);const D=()=>{o||m||(f(),t())},R=async()=>{a(null),v(!0);try{if(!j)throw new Error("Email verification not configured");const n=await j();I(n)}catch(n){a(E(n,"Failed to send code"))}finally{v(!1)}},q=async()=>{if(!u||u.length!==6){a("Please enter the 6-digit code");return}if(w){a(null),d(!0);try{if(!b)throw new Error("Email verification not configured");const n=await b(w,u);f(),s(n)}catch(n){a(E(n,"Invalid code")),d(!1)}}},U=async()=>{a(null),d(!0);try{if(!T)throw new Error("Passkey verification not configured");const n=await T();f(),s(n)}catch(n){n instanceof DOMException&&n.name==="NotAllowedError"||a(E(n,"Passkey verification failed")),d(!1)}};return e.jsxs(M,{open:r,onClose:D,title:l,className:A,actions:g&&S?[{label:"Cancel",variant:"text",onClick:D,disabled:o},{label:"Verify",variant:"filled",onClick:q,loading:o,disabled:u.length!==6}]:void 0,children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:c}),!g&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(F,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(p,{onClick:U,loading:o,fullWidth:!0,children:"Verify with passkey"}),B&&e.jsx("button",{type:"button",onClick:()=>{a(null),C(!0)},disabled:o,className:"text-sm text-primary hover:underline disabled:opacity-50",children:"Use email verification instead"})]}),g&&!S&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(F,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(p,{onClick:R,loading:m,fullWidth:!0,children:"Send verification code"}),V&&e.jsx("button",{type:"button",onClick:()=>{a(null),C(!1)},disabled:m,className:"text-sm text-primary hover:underline disabled:opacity-50",children:"Use passkey instead"})]}),g&&S&&e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Enter the 6-digit code sent to your email."}),e.jsx(L,{type:"text",inputMode:"numeric",id:"reauth-code",label:"Verification code",value:u,onChange:n=>{const W=n.target.value.replace(/\D/g,"").slice(0,6);O(W)},disabled:o,onKeyDown:n=>{n.key==="Enter"&&q()},maxLength:6}),e.jsx("button",{type:"button",onClick:R,disabled:m||o,className:"text-sm text-primary hover:underline disabled:opacity-50 self-start",children:m?"Sending...":"Resend code"})]}),N&&e.jsx(z,{variant:"error",onDismiss:()=>a(null),className:"mt-4",children:N})]})}y.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},className:{required:!1,tsType:{name:"string"},description:""}}};const te={title:"UI/Surfaces/ReauthDialog",component:y},h={render:()=>{const[r,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Delete Account"}),e.jsx(y,{open:r,onClose:()=>t(!1),onSuccess:s=>{console.log("Reauth token:",s),t(!1)},onEmailSendCode:async()=>(await new Promise(s=>setTimeout(s,1e3)),"challenge-123"),onEmailVerifyCode:async(s,l)=>{if(await new Promise(c=>setTimeout(c,1e3)),l==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(s=>setTimeout(s,1e3)),"mock-passkey-token")})]})}},k={render:()=>{const[r,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Sensitive Action"}),e.jsx(y,{open:r,onClose:()=>t(!1),onSuccess:()=>t(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(s=>setTimeout(s,500)),"challenge-456"),onEmailVerifyCode:async(s,l)=>{if(await new Promise(c=>setTimeout(c,500)),l==="123456")return"token";throw new Error("Invalid code")}})]})}},x={render:()=>{const[r,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Verify"}),e.jsx(y,{open:r,onClose:()=>t(!1),onSuccess:()=>t(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(s=>setTimeout(s,1e3)),"passkey-token")})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Delete Account</Button>
        <ReauthDialog open={open} onClose={() => setOpen(false)} onSuccess={token => {
        console.log("Reauth token:", token);
        setOpen(false);
      }} onEmailSendCode={async () => {
        await new Promise(r => setTimeout(r, 1000));
        return "challenge-123";
      }} onEmailVerifyCode={async (_challengeId, code) => {
        await new Promise(r => setTimeout(r, 1000));
        if (code === "123456") return "mock-reauth-token";
        throw new Error("Invalid verification code");
      }} onPasskeyVerify={async () => {
        await new Promise(r => setTimeout(r, 1000));
        return "mock-passkey-token";
      }} />
      </>;
  }
}`,...h.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Sensitive Action</Button>
        <ReauthDialog open={open} onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} methods={["email"]} onEmailSendCode={async () => {
        await new Promise(r => setTimeout(r, 500));
        return "challenge-456";
      }} onEmailVerifyCode={async (_id, code) => {
        await new Promise(r => setTimeout(r, 500));
        if (code === "123456") return "token";
        throw new Error("Invalid code");
      }} />
      </>;
  }
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};const se=["Playground","EmailOnly","PasskeyOnly"];export{k as EmailOnly,x as PasskeyOnly,h as Playground,se as __namedExportsOrder,te as default};
