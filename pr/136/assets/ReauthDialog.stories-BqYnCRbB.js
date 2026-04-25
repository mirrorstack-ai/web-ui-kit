import{r,j as e}from"./iframe-d2yGrjW1.js";import{c as B}from"./cn-IyxL_b2c.js";import{D as L}from"./Dialog-WvnZ1hDs.js";import{B as d}from"./Button-BWrFH3tM.js";import{I as _}from"./Icon-BT2b1L_M.js";import{A as F}from"./Alert-92NcGjQh.js";import{V as Q}from"./VerificationCodeInput-BVjXKwQl.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BAu8mwVP.js";import"./button-styles-DvQkePbc.js";import"./IconButton-Dm6ZpnQJ.js";function T(s,n){return s instanceof Error?s.message:n}function m({open:s,onClose:n,onSuccess:t,title:i="Verify your identity",description:l="For your security, please verify your identity before continuing.",methods:O=["passkey","email"],onEmailSendCode:V,onEmailVerifyCode:N,onPasskeyVerify:I,onPasskeySetup:R,className:U}){const y=O.includes("passkey"),W=O.includes("email"),z=!y&&!!R,[M,S]=r.useState(""),[C,D]=r.useState(null),[P,o]=r.useState(null),[c,p]=r.useState(!1),[f,j]=r.useState(!1),[G,E]=r.useState(!1),h=!y||G,q=C!==null,u=r.useCallback(()=>{S(""),D(null),o(null),p(!1),j(!1),E(!1)},[]);r.useEffect(()=>{s&&u()},[s,u]);const H=()=>{c||f||(u(),n())},A=async()=>{o(null),j(!0);try{if(!V)throw new Error("Email verification not configured");const a=await V();D(a)}catch(a){o(T(a,"Failed to send code"))}finally{j(!1)}},J=async a=>{if(C){o(null),p(!0);try{if(!N)throw new Error("Email verification not configured");const b=await N(C,a);u(),t(b)}catch(b){o(T(b,"Invalid code")),S(""),p(!1)}}},K=async()=>{o(null),p(!0);try{if(!I)throw new Error("Passkey verification not configured");const a=await I();u(),t(a)}catch(a){a instanceof DOMException&&a.name==="NotAllowedError"||o(T(a,"Passkey verification failed")),p(!1)}},g="text-sm text-primary hover:underline disabled:opacity-50";return e.jsxs(L,{open:s,onClose:H,className:U,actions:void 0,children:[P&&e.jsx(F,{variant:"error",onDismiss:()=>o(null),className:"mb-4",children:P}),e.jsx("h3",{className:"text-lg font-semibold text-on-surface mb-2",children:i}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:l}),!h&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(_,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(d,{onClick:K,loading:c,fullWidth:!0,children:"Verify with passkey"}),W&&e.jsx("button",{type:"button",onClick:()=>{o(null),E(!0)},disabled:c,className:g,children:"Use email verification instead"})]}),h&&!q&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(_,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(d,{onClick:A,loading:f,fullWidth:!0,children:"Send verification code"}),y&&e.jsx("button",{type:"button",onClick:()=>{o(null),E(!1)},disabled:f,className:g,children:"Use passkey instead"})]}),h&&q&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:"Enter the 6-digit code sent to your email"}),e.jsx(Q,{value:M,onChange:S,onComplete:J,disabled:c,error:!!P}),c&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Verifying..."}),e.jsx("button",{type:"button",onClick:A,disabled:f||c,className:B(g,"text-xs"),children:f?"Sending...":"Resend code"}),y&&e.jsx("button",{type:"button",onClick:()=>u(),disabled:c,className:B(g,"text-xs"),children:"Use passkey instead"})]}),h&&z&&e.jsxs(F,{variant:"info",icon:"passkey",iconSize:28,className:"mt-4",children:[e.jsx("button",{type:"button",onClick:R,className:"text-primary underline underline-offset-2 hover:text-primary/80",children:"Set up a passkey"})," for faster verification next time"]})]})}m.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},onPasskeySetup:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional. When provided and the user has no passkey, surfaces a setup recommendation in the email flow."},className:{required:!1,tsType:{name:"string"},description:""}}};const ie={title:"UI/Surfaces/ReauthDialog",component:m},k={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,i)=>{if(await new Promise(l=>setTimeout(l,1e3)),i==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},x={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,i)=>{if(await new Promise(l=>setTimeout(l,500)),i==="123456")return"token";throw new Error("Invalid code")}})]})}},w={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Verify"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}},v={render:()=>{const[s,n]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(m,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-789"),onEmailVerifyCode:async(t,i)=>{if(await new Promise(l=>setTimeout(l,500)),i==="123456")return"token";throw new Error("Invalid code")},onPasskeySetup:()=>{console.log("navigate to /me/security"),n(!1)}})]})}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};const le=["Playground","EmailOnly","PasskeyOnly","PasskeySetupRecommendation"];export{x as EmailOnly,w as PasskeyOnly,v as PasskeySetupRecommendation,k as Playground,le as __namedExportsOrder,ie as default};
