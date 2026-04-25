import{r,j as e}from"./iframe-Z1ukQH65.js";import{c as T}from"./cn-IyxL_b2c.js";import{D as K}from"./Dialog-b8A33sxG.js";import{B as d}from"./Button-DYZcySH2.js";import{I as O}from"./Icon-1cTYmGNp.js";import{A as L}from"./Alert-CCOv0LlJ.js";import{V as Q}from"./VerificationCodeInput-BYS5HZcR.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-mQsLLdGM.js";import"./button-styles-DvQkePbc.js";import"./IconButton-DsGiBZvP.js";function V(s,n){return s instanceof Error?s.message:n}function m({open:s,onClose:n,onSuccess:t,title:i="Verify your identity",description:l="For your security, please verify your identity before continuing.",methods:N=["passkey","email"],onEmailSendCode:I,onEmailVerifyCode:R,onPasskeyVerify:D,onPasskeySetup:q,className:F}){const h=N.includes("passkey"),U=N.includes("email"),W=!h&&!!q,[z,S]=r.useState(""),[C,A]=r.useState(null),[j,o]=r.useState(null),[c,p]=r.useState(!1),[f,P]=r.useState(!1),[M,E]=r.useState(!1),g=!h||M,B=C!==null,u=r.useCallback(()=>{S(""),A(null),o(null),p(!1),P(!1),E(!1)},[]);r.useEffect(()=>{s&&u()},[s,u]);const G=()=>{c||f||(u(),n())},_=async()=>{o(null),P(!0);try{if(!I)throw new Error("Email verification not configured");const a=await I();A(a)}catch(a){o(V(a,"Failed to send code"))}finally{P(!1)}},H=async a=>{if(C){o(null),p(!0);try{if(!R)throw new Error("Email verification not configured");const b=await R(C,a);u(),t(b)}catch(b){o(V(b,"Invalid code")),S(""),p(!1)}}},J=async()=>{o(null),p(!0);try{if(!D)throw new Error("Passkey verification not configured");const a=await D();u(),t(a)}catch(a){a instanceof DOMException&&a.name==="NotAllowedError"||o(V(a,"Passkey verification failed")),p(!1)}},y="text-sm text-primary hover:underline disabled:opacity-50";return e.jsxs(K,{open:s,onClose:G,className:F,actions:void 0,children:[j&&e.jsx(L,{variant:"error",onDismiss:()=>o(null),className:"mb-4",children:j}),e.jsx("h3",{className:"text-lg font-semibold text-on-surface mb-2",children:i}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:l}),!g&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(O,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(d,{onClick:J,loading:c,fullWidth:!0,children:"Verify with passkey"}),U&&e.jsx("button",{type:"button",onClick:()=>{o(null),E(!0)},disabled:c,className:y,children:"Use email verification instead"})]}),g&&!B&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(O,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(d,{onClick:_,loading:f,fullWidth:!0,children:"Send verification code"}),h&&e.jsx("button",{type:"button",onClick:()=>{o(null),E(!1)},disabled:f,className:y,children:"Use passkey instead"})]}),g&&B&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:"Enter the 6-digit code sent to your email"}),e.jsx(Q,{value:z,onChange:S,onComplete:H,disabled:c,error:!!j}),c&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Verifying..."}),e.jsx("button",{type:"button",onClick:_,disabled:f||c,className:T(y,"text-xs"),children:f?"Sending...":"Resend code"}),h&&e.jsx("button",{type:"button",onClick:()=>u(),disabled:c,className:T(y,"text-xs"),children:"Use passkey instead"})]}),g&&W&&e.jsxs("div",{className:"mt-4 flex items-start gap-3 rounded-md border border-outline-variant bg-surface-variant/40 p-3",children:[e.jsx(O,{name:"passkey",size:20,className:"text-primary mt-0.5 shrink-0"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface",children:"Set up a passkey for faster verification next time"}),e.jsx("button",{type:"button",onClick:q,className:T(y,"mt-1"),children:"Set up passkey"})]})]})]})}m.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},onPasskeySetup:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional. When provided and the user has no passkey, surfaces a setup recommendation in the email flow."},className:{required:!1,tsType:{name:"string"},description:""}}};const ie={title:"UI/Surfaces/ReauthDialog",component:m},x={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,i)=>{if(await new Promise(l=>setTimeout(l,1e3)),i==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},k={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,i)=>{if(await new Promise(l=>setTimeout(l,500)),i==="123456")return"token";throw new Error("Invalid code")}})]})}},w={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Verify"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}},v={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-789"),onEmailVerifyCode:async(t,i)=>{if(await new Promise(l=>setTimeout(l,500)),i==="123456")return"token";throw new Error("Invalid code")},onPasskeySetup:()=>{console.log("navigate to /me/security"),n(!1)}})]})}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Sensitive Action</Button>
        <ReauthDialog open={open} onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} methods={["email"]} onEmailSendCode={async () => {
        await new Promise(r => setTimeout(r, 500));
        return "challenge-789";
      }} onEmailVerifyCode={async (_id, code) => {
        await new Promise(r => setTimeout(r, 500));
        if (code === "123456") return "token";
        throw new Error("Invalid code");
      }} onPasskeySetup={() => {
        console.log("navigate to /me/security");
        setOpen(false);
      }} />
      </>;
  }
}`,...v.parameters?.docs?.source}}};const le=["Playground","EmailOnly","PasskeyOnly","PasskeySetupRecommendation"];export{k as EmailOnly,w as PasskeyOnly,v as PasskeySetupRecommendation,x as Playground,le as __namedExportsOrder,ie as default};
