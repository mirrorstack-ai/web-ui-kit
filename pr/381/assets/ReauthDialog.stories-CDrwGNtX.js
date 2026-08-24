import{r,j as e}from"./iframe-Dup9NiDr.js";import{c as B}from"./cn-IyxL_b2c.js";import{D as X}from"./Dialog-UgFTcqkS.js";import{B as m}from"./Button-PD0L4tRp.js";import{I as _}from"./Icon-aX5VzrE_.js";import{A as L}from"./Alert-CPxglBjO.js";import{V as Y}from"./VerificationCodeInput-BAQOol41.js";import"./preload-helper-PPVm8Dsz.js";import"./index-3iElolxO.js";import"./index-BQIiiqpt.js";import"./IconButton-VNWR6jem.js";import"./Progress-BJW1fGF4.js";import"./button-styles-CZHSjrxJ.js";function O(a,n){return a instanceof Error?a.message:n}const Z={passkeyPrompt:"Use your passkey to verify",passkeyCta:"Verify with passkey",useEmailInstead:"Use email verification instead",usePasskeyInstead:"Use passkey instead",emailPrompt:"We'll send a 6-digit verification code to your email",emailSendCta:"Send verification code",codePrompt:"Enter the 6-digit code sent to your email",verifying:"Verifying...",resendCta:"Resend code",sending:"Sending...",passkeySetupCta:"Set up a passkey",passkeySetupHint:" for faster verification next time",sendFailed:"Failed to send code",invalidCode:"Invalid code",passkeyFailed:"Passkey verification failed",emailNotConfigured:"Email verification not configured",passkeyNotConfigured:"Passkey verification not configured"};function p({open:a,onClose:n,onSuccess:t,title:l="Verify your identity",description:c="For your security, please verify your identity before continuing.",methods:I=["passkey","email"],onEmailSendCode:N,onEmailVerifyCode:V,onPasskeyVerify:R,onPasskeySetup:D,labels:U,className:W}){const s={...Z,...U},g=I.includes("passkey"),z=I.includes("email"),H=!g&&!!D,[M,v]=r.useState(""),[P,F]=r.useState(null),[E,i]=r.useState(null),[u,y]=r.useState(!1),[f,j]=r.useState(!1),[G,b]=r.useState(!1),h=!g||G,A=P!==null,d=r.useCallback(()=>{v(""),F(null),i(null),y(!1),j(!1),b(!1)},[]);r.useEffect(()=>{a&&d()},[a,d]);const J=()=>{u||f||(d(),n())},q=async()=>{i(null),j(!0);try{if(!N)throw new Error(s.emailNotConfigured);const o=await N();F(o)}catch(o){i(O(o,s.sendFailed))}finally{j(!1)}},K=async o=>{if(P){i(null),y(!0);try{if(!V)throw new Error(s.emailNotConfigured);const T=await V(P,o);d(),t(T)}catch(T){i(O(T,s.invalidCode)),v(""),y(!1)}}},Q=async()=>{i(null),y(!0);try{if(!R)throw new Error(s.passkeyNotConfigured);const o=await R();d(),t(o)}catch(o){o instanceof DOMException&&o.name==="NotAllowedError"||i(O(o,s.passkeyFailed)),y(!1)}},k="text-sm text-primary hover:underline disabled:opacity-50";return e.jsxs(X,{open:a,onClose:J,className:W,title:l,children:[E&&e.jsx(L,{variant:"error",onDismiss:()=>i(null),className:"mb-4",children:E}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:c}),!h&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(_,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:s.passkeyPrompt}),e.jsx(m,{onClick:Q,loading:u,fullWidth:!0,children:s.passkeyCta}),z&&e.jsx("button",{type:"button",onClick:()=>{i(null),b(!0)},disabled:u,className:k,children:s.useEmailInstead})]}),h&&!A&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(_,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:s.emailPrompt}),e.jsx(m,{onClick:q,loading:f,fullWidth:!0,children:s.emailSendCta}),g&&e.jsx("button",{type:"button",onClick:()=>{i(null),b(!1)},disabled:f,className:k,children:s.usePasskeyInstead})]}),h&&A&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:s.codePrompt}),e.jsx(Y,{value:M,onChange:v,onComplete:K,disabled:u,error:!!E}),u&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:s.verifying}),e.jsx("button",{type:"button",onClick:q,disabled:f||u,className:B(k,"text-xs"),children:f?s.sending:s.resendCta}),g&&e.jsx("button",{type:"button",onClick:()=>d(),disabled:u,className:B(k,"text-xs"),children:s.usePasskeyInstead})]}),h&&H&&e.jsxs(L,{variant:"success",icon:"passkey",iconSize:28,className:"mt-4",children:[e.jsx("button",{type:"button",onClick:D,className:"text-primary underline underline-offset-2 hover:text-primary/80",children:s.passkeySetupCta}),s.passkeySetupHint]})]})}p.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},onPasskeySetup:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional. When provided and the user has no passkey, surfaces a setup recommendation in the email flow."},labels:{required:!1,tsType:{name:"ReauthDialogLabels"},description:`Translations for everything below the title. Omitted keys fall back to
 English — see {@link ReauthDialogLabels}.`},className:{required:!1,tsType:{name:"string"},description:""}}};const me={title:"UI/Surfaces/ReauthDialog",component:p},w={render:()=>{const[a,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(p,{open:a,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,1e3)),l==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},x={render:()=>{const[a,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(p,{open:a,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,500)),l==="123456")return"token";throw new Error("Invalid code")}})]})}},C={render:()=>{const[a,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>n(!0),children:"Verify"}),e.jsx(p,{open:a,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}},S={render:()=>{const[a,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(p,{open:a,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-789"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,500)),l==="123456")return"token";throw new Error("Invalid code")},onPasskeySetup:()=>{console.log("navigate to /me/security"),n(!1)}})]})}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};const pe=["Playground","EmailOnly","PasskeyOnly","PasskeySetupRecommendation"];export{x as EmailOnly,C as PasskeyOnly,S as PasskeySetupRecommendation,w as Playground,pe as __namedExportsOrder,me as default};
