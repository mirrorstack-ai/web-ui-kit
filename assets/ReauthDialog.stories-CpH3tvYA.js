import{r as i,j as e}from"./iframe-089rgGb7.js";import{c as q}from"./cn-IyxL_b2c.js";import{D as G}from"./Dialog-DI58PJ9m.js";import{B as f}from"./Button-KqKJ1TBP.js";import{I as A}from"./Icon-fVGiDk6r.js";import{A as H}from"./Alert-B6RS4vkF.js";import{V as J}from"./VerificationCodeInput-BfhSrNAm.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BtROg6SV.js";import"./button-styles-DvQkePbc.js";import"./IconButton-B0unbfhz.js";function T(s,n){return s instanceof Error?s.message:n}function p({open:s,onClose:n,onSuccess:t,title:l="Verify your identity",description:c="For your security, please verify your identity before continuing.",methods:V=["passkey","email"],onEmailSendCode:N,onEmailVerifyCode:O,onPasskeyVerify:I,className:B}){const v=V.includes("passkey"),F=V.includes("email"),[_,y]=i.useState(""),[C,S]=i.useState(null),[j,r]=i.useState(null),[o,u]=i.useState(!1),[d,E]=i.useState(!1),[U,g]=i.useState(!1),P=!v||U,D=C!==null,m=i.useCallback(()=>{y(""),S(null),r(null),u(!1),E(!1),g(!1)},[]);i.useEffect(()=>{s&&m()},[s,m]);const W=()=>{o||d||(m(),n())},R=async()=>{r(null),E(!0);try{if(!N)throw new Error("Email verification not configured");const a=await N();S(a)}catch(a){r(T(a,"Failed to send code"))}finally{E(!1)}},z=async a=>{if(C){r(null),u(!0);try{if(!O)throw new Error("Email verification not configured");const b=await O(C,a);m(),t(b)}catch(b){r(T(b,"Invalid code")),y(""),u(!1)}}},M=async()=>{r(null),u(!0);try{if(!I)throw new Error("Passkey verification not configured");const a=await I();m(),t(a)}catch(a){a instanceof DOMException&&a.name==="NotAllowedError"||r(T(a,"Passkey verification failed")),u(!1)}},h="text-sm text-primary hover:underline disabled:opacity-50";return e.jsxs(G,{open:s,onClose:W,className:B,actions:void 0,children:[j&&e.jsx(H,{variant:"error",onDismiss:()=>r(null),className:"mb-4",children:j}),e.jsx("h3",{className:"text-lg font-semibold text-on-surface mb-2",children:l}),e.jsx("p",{className:"text-sm text-on-surface-variant mb-4",children:c}),!P&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(A,{name:"passkey",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"Use your passkey to verify"}),e.jsx(f,{onClick:M,loading:o,fullWidth:!0,children:"Verify with passkey"}),F&&e.jsx("button",{type:"button",onClick:()=>{r(null),g(!0)},disabled:o,className:h,children:"Use email verification instead"})]}),P&&!D&&e.jsxs("div",{className:"flex flex-col items-center gap-3 py-2",children:[e.jsx("div",{className:"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center",children:e.jsx(A,{name:"mail",size:32,className:"text-primary"})}),e.jsx("p",{className:"text-sm text-on-surface-variant text-center",children:"We'll send a 6-digit verification code to your email"}),e.jsx(f,{onClick:R,loading:d,fullWidth:!0,children:"Send verification code"}),v&&e.jsx("button",{type:"button",onClick:()=>{r(null),g(!1)},disabled:d,className:h,children:"Use passkey instead"})]}),P&&D&&e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant text-center mb-1",children:"Enter the 6-digit code sent to your email"}),e.jsx(J,{value:_,onChange:y,onComplete:z,disabled:o,error:!!j}),o&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Verifying..."}),e.jsx("button",{type:"button",onClick:R,disabled:d||o,className:q(h,"text-xs"),children:d?"Sending...":"Resend code"}),v&&e.jsx("button",{type:"button",onClick:()=>{r(null),y(""),S(null),g(!1)},disabled:o,className:q(h,"text-xs"),children:"Use passkey instead"})]})]})}p.__docgenInfo={description:"",methods:[],displayName:"ReauthDialog",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSuccess:{required:!0,tsType:{name:"signature",type:"function",raw:"(reauthToken: string) => void",signature:{arguments:[{type:{name:"string"},name:"reauthToken"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Verify your identity"',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"For your security, please verify your identity before continuing."',computed:!1}},methods:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:'("email" | "passkey")[]'},description:"",defaultValue:{value:'["passkey", "email"]',computed:!1}},onEmailSendCode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Send a 6-digit code to the user's email. Returns a challenge ID."},onEmailVerifyCode:{required:!1,tsType:{name:"signature",type:"function",raw:"(challengeId: string, code: string) => Promise<string>",signature:{arguments:[{type:{name:"string"},name:"challengeId"},{type:{name:"string"},name:"code"}],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Verify the 6-digit code. Receives challengeId + code, returns reauth token."},onPasskeyVerify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:"Run WebAuthn ceremony, returns reauth token."},className:{required:!1,tsType:{name:"string"},description:""}}};const re={title:"UI/Surfaces/ReauthDialog",component:p},x={render:()=>{const[s,n]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Delete Account"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:t=>{console.log("Reauth token:",t),n(!1)},onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,1e3)),"challenge-123"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,1e3)),l==="123456")return"mock-reauth-token";throw new Error("Invalid verification code")},onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"mock-passkey-token")})]})}},k={render:()=>{const[s,n]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Sensitive Action"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["email"],onEmailSendCode:async()=>(await new Promise(t=>setTimeout(t,500)),"challenge-456"),onEmailVerifyCode:async(t,l)=>{if(await new Promise(c=>setTimeout(c,500)),l==="123456")return"token";throw new Error("Invalid code")}})]})}},w={render:()=>{const[s,n]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{onClick:()=>n(!0),children:"Verify"}),e.jsx(p,{open:s,onClose:()=>n(!1),onSuccess:()=>n(!1),methods:["passkey"],onPasskeyVerify:async()=>(await new Promise(t=>setTimeout(t,1e3)),"passkey-token")})]})}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};const ae=["Playground","EmailOnly","PasskeyOnly"];export{k as EmailOnly,w as PasskeyOnly,x as Playground,ae as __namedExportsOrder,re as default};
