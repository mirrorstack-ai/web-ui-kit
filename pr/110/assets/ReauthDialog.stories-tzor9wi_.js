import{r as a,j as e}from"./iframe-sr4sQ43T.js";import{c as q}from"./cn-IyxL_b2c.js";import{D as G}from"./Dialog-DirtOyhO.js";import{B as f}from"./Button-DPHOV-QT.js";import{I as A}from"./Icon-DNJhgv0p.js";import{A as H}from"./Alert-DEt8aYbH.js";import{V as J}from"./VerificationCodeInput-SbKO3SQI.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-CPQiQLFE.js";import"./button-styles-DvQkePbc.js";import"./IconButton-CnO1gFTh.js";function b(s,n){return s instanceof Error?s.message:n}function p({open:s,onClose:n,onSuccess:t,title:c="Verify your identity",description:u="For your security, please verify your identity before continuing.",methods:T=["passkey","email"],onEmailSendCode:V,onEmailVerifyCode:N,onPasskeyVerify:O,className:B}){const k=T.includes("passkey"),F=T.includes("email"),[_,w]=a.useState(""),[v,I]=a.useState(null),[C,i]=a.useState(null),[o,d]=a.useState(!1),[m,S]=a.useState(!1),[U,j]=a.useState(!1),E=!k||U,D=v!==null,l=a.useCallback(()=>{w(""),I(null),i(null),d(!1),S(!1),j(!1)},[]);a.useEffect(()=>{s&&l()},[s,l]);const W=()=>{o||m||(l(),n())},R=async()=>{i(null),S(!0);try{if(!V)throw new Error("Email verification not configured");const r=await V();I(r)}catch(r){i(b(r,"Failed to send code"))}finally{S(!1)}},z=async r=>{if(v){i(null),d(!0);try{if(!N)throw new Error("Email verification not configured");const P=await N(v,r);l(),t(P)}catch(P){i(b(P,"Invalid code")),w(""),d(!1)}}},M=async()=>{i(null),d(!0);try{if(!O)throw new Error("Passkey verification not configured");const r=await O();l(),t(r)}catch(r){r instanceof DOMException&&r.name==="NotAllowedError"||i(b(r,"Passkey verification failed")),d(!1)}},y="text-sm text-primary hover:underline disabled:opacity-50";return e.jsxs(G,{open:s,onClose:W,className:B,actions:void 0,children:[C&&e.jsx(H,{variant:"error",onDismiss:()=>i(null),className:"mb-4",children:C}),e.jsx("h3",{className:"text-lg font-semibold text-on-surface mb-2",children:c}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:u}),!E&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(A,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(f,{onClick:M,loading:o,fullWidth:!0,children:"Verify with passkey"}),F&&e.jsx("button",{type:"button",onClick:()=>{i(null),j(!0)},disabled:o,className:y,children:"Use email verification instead"})]}),E&&!D&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(A,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(f,{onClick:R,loading:m,fullWidth:!0,children:"Send verification code"}),k&&e.jsx("button",{type:"button",onClick:()=>{i(null),j(!1)},disabled:m,className:y,children:"Use passkey instead"})]}),E&&D&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:"Enter the 6-digit code sent to your email"}),e.jsx(J,{value:_,onChange:w,onComplete:z,disabled:o,error:!!C}),o&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Verifying..."}),e.jsx("button",{type:"button",onClick:R,disabled:m||o,className:q(y,"text-xs"),children:m?"Sending...":"Resend code"}),k&&e.jsx("button",{type:"button",onClick:()=>l(),disabled:o,className:q(y,"text-xs"),children:"Use passkey instead"})]})]})}p.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},className:{required:!1,tsType:{name:"string"},description:""}}};const re={title:"UI/Surfaces/ReauthDialog",component:p},g={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,c)=>{if(await new Promise(u=>setTimeout(u,1e3)),c==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},h={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,c)=>{if(await new Promise(u=>setTimeout(u,500)),c==="123456")return"token";throw new Error("Invalid code")}})]})}},x={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Verify"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};const ae=["Playground","EmailOnly","PasskeyOnly"];export{h as EmailOnly,x as PasskeyOnly,g as Playground,ae as __namedExportsOrder,re as default};
