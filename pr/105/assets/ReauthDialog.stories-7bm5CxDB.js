import{r as a,j as e}from"./iframe-X_fqYBgZ.js";import{c as M}from"./cn-IyxL_b2c.js";import{D as G}from"./Dialog-D-Km2tVK.js";import{B as f}from"./Button-DsxxfFu5.js";import{I as q}from"./Icon-DkGWRkn6.js";import{A as H}from"./Alert-CXIODhc1.js";import{V as J}from"./VerificationCodeInput-BIfSxrXD.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-Chi909Dm.js";import"./button-styles-DvQkePbc.js";import"./IconButton-PCIEkMva.js";function P(s,n){return s instanceof Error?s.message:n}function p({open:s,onClose:n,onSuccess:t,title:l="Verify your identity",description:c="For your security, please verify your identity before continuing.",methods:b=["passkey","email"],onEmailSendCode:T,onEmailVerifyCode:V,onPasskeyVerify:O,className:A}){const I=b.includes("passkey"),B=b.includes("email"),[F,x]=a.useState(""),[k,N]=a.useState(null),[w,o]=a.useState(null),[i,u]=a.useState(!1),[d,v]=a.useState(!1),[_,C]=a.useState(!1),S=!I||_,D=k!==null,m=a.useCallback(()=>{x(""),N(null),o(null),u(!1),v(!1),C(!1)},[]);a.useEffect(()=>{s&&m()},[s,m]);const U=()=>{i||d||(m(),n())},R=async()=>{o(null),v(!0);try{if(!T)throw new Error("Email verification not configured");const r=await T();N(r)}catch(r){o(P(r,"Failed to send code"))}finally{v(!1)}},W=async r=>{if(k){o(null),u(!0);try{if(!V)throw new Error("Email verification not configured");const E=await V(k,r);m(),t(E)}catch(E){o(P(E,"Invalid code")),x(""),u(!1)}}},z=async()=>{o(null),u(!0);try{if(!O)throw new Error("Passkey verification not configured");const r=await O();m(),t(r)}catch(r){r instanceof DOMException&&r.name==="NotAllowedError"||o(P(r,"Passkey verification failed")),u(!1)}},j="text-sm text-primary hover:underline disabled:opacity-50";return e.jsxs(G,{open:s,onClose:U,className:A,actions:void 0,children:[w&&e.jsx(H,{variant:"error",onDismiss:()=>o(null),className:"mb-4",children:w}),e.jsx("h3",{className:"text-lg font-semibold text-on-surface mb-2",children:l}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:c}),!S&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(q,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(f,{onClick:z,loading:i,fullWidth:!0,children:"Verify with passkey"}),B&&e.jsx("button",{type:"button",onClick:()=>{o(null),C(!0)},disabled:i,className:j,children:"Use email verification instead"})]}),S&&!D&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(q,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(f,{onClick:R,loading:d,fullWidth:!0,children:"Send verification code"}),I&&e.jsx("button",{type:"button",onClick:()=>{o(null),C(!1)},disabled:d,className:j,children:"Use passkey instead"})]}),S&&D&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:"Enter the 6-digit code sent to your email"}),e.jsx(J,{value:F,onChange:x,onComplete:W,disabled:i,error:!!w}),i&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Verifying..."}),e.jsx("button",{type:"button",onClick:R,disabled:d||i,className:M(j,"text-xs"),children:d?"Sending...":"Resend code"})]})]})}p.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},className:{required:!1,tsType:{name:"string"},description:""}}};const re={title:"UI/Surfaces/ReauthDialog",component:p},y={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,1e3)),l==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},g={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,500)),l==="123456")return"token";throw new Error("Invalid code")}})]})}},h={render:()=>{const[s,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Verify"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const ae=["Playground","EmailOnly","PasskeyOnly"];export{g as EmailOnly,h as PasskeyOnly,y as Playground,ae as __namedExportsOrder,re as default};
