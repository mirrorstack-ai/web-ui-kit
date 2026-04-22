import{r as a,j as e}from"./iframe-1FNdXsP6.js";import{D as z}from"./Dialog-C9WfFxgj.js";import{B as f}from"./Button-B_WifHMI.js";import{I as R}from"./Icon-0CXNAiBM.js";import{A as M}from"./Alert-Hooapqei.js";import{V as G}from"./VerificationCodeInput-C0PF6COR.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-C4iXvWXL.js";import"./button-styles-DvQkePbc.js";import"./IconButton-D5ki_mYm.js";function E(s,n){return s instanceof Error?s.message:n}function p({open:s,onClose:n,onSuccess:t,title:l="Verify your identity",description:c="For your security, please verify your identity before continuing.",methods:P=["passkey","email"],onEmailSendCode:b,onEmailVerifyCode:T,onPasskeyVerify:V,className:q}){const O=P.includes("passkey"),A=P.includes("email"),[B,x]=a.useState(""),[k,I]=a.useState(null),[w,i]=a.useState(null),[o,u]=a.useState(!1),[d,v]=a.useState(!1),[F,S]=a.useState(!1),C=!O||F,N=k!==null,m=a.useCallback(()=>{x(""),I(null),i(null),u(!1),v(!1),S(!1)},[]);a.useEffect(()=>{s&&m()},[s,m]);const _=()=>{o||d||(m(),n())},D=async()=>{i(null),v(!0);try{if(!b)throw new Error("Email verification not configured");const r=await b();I(r)}catch(r){i(E(r,"Failed to send code"))}finally{v(!1)}},U=async r=>{if(k){i(null),u(!0);try{if(!T)throw new Error("Email verification not configured");const j=await T(k,r);m(),t(j)}catch(j){i(E(j,"Invalid code")),x(""),u(!1)}}},W=async()=>{i(null),u(!0);try{if(!V)throw new Error("Passkey verification not configured");const r=await V();m(),t(r)}catch(r){r instanceof DOMException&&r.name==="NotAllowedError"||i(E(r,"Passkey verification failed")),u(!1)}};return e.jsxs(z,{open:s,onClose:_,className:q,actions:void 0,children:[w&&e.jsx(M,{variant:"error",onDismiss:()=>i(null),className:"mb-4",children:w}),e.jsx("h3",{className:"text-lg font-semibold text-on-surface mb-2",children:l}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:c}),!C&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(R,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(f,{onClick:W,loading:o,fullWidth:!0,children:"Verify with passkey"}),A&&e.jsx("button",{type:"button",onClick:()=>{i(null),S(!0)},disabled:o,className:"text-sm text-primary hover:underline disabled:opacity-50",children:"Use email verification instead"})]}),C&&!N&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(R,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(f,{onClick:D,loading:d,fullWidth:!0,children:"Send verification code"}),O&&e.jsx("button",{type:"button",onClick:()=>{i(null),S(!1)},disabled:d,className:"text-sm text-primary hover:underline disabled:opacity-50",children:"Use passkey instead"})]}),C&&N&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:"Enter the 6-digit code sent to your email"}),e.jsx(G,{value:B,onChange:x,onComplete:U,disabled:o,error:!!w}),o&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Verifying..."}),e.jsx("button",{type:"button",onClick:D,disabled:d||o,className:"text-xs text-primary hover:underline disabled:opacity-50",children:d?"Sending...":"Resend code"})]})]})}p.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},className:{required:!1,tsType:{name:"string"},description:""}}};const te={title:"UI/Surfaces/ReauthDialog",component:p},y={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,1e3)),l==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},g={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,500)),l==="123456")return"token";throw new Error("Invalid code")}})]})}},h={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Verify"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const se=["Playground","EmailOnly","PasskeyOnly"];export{g as EmailOnly,h as PasskeyOnly,y as Playground,se as __namedExportsOrder,te as default};
