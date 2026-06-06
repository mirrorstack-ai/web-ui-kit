import{r as a,j as e}from"./iframe-biibM7UI.js";import{c as u}from"./cn-IyxL_b2c.js";import{I as k}from"./IconButton-0vuhYf3J.js";import{I as D}from"./Icon-CPG3dks7.js";import{L as ie}from"./LogoMirrorStack-2cLkzNEZ.js";import{N as ce}from"./Notch-CHSxmgr9.js";import{u as de,a as ue}from"./useComposerSubmit-D-kLusak.js";import{u as me}from"./useClickOutside-CNLqwiQO.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DF34wXQD.js";import"./button-styles-BPC6xbbG.js";const pe=80,ge=200,B=220,he=14,fe=8,q=12,xe=6,G=6;function j({greeting:o,subtitle:l,placeholder:N="plan something?",onSend:m,onAttachFile:y,onMic:i,models:s,selectedModelId:I,onSelectModel:C,hideLogo:z=!1,hideInput:F=!1,className:X}){const[p,P]=a.useState(""),[c,w]=a.useState(!1),[E,U]=a.useState(0),[V,K]=a.useState(0),[O,$]=a.useState(0),[A,J]=a.useState(0),_=C!==void 0,[Q,Y]=a.useState(I),R=_?I:Q,H=a.useRef(null),S=a.useRef(null),M=a.useRef(null),L=a.useRef(null);de(H,p,{min:pe,max:ge}),a.useLayoutEffect(()=>{if(!c)return;const t=S.current,n=M.current,W=L.current;if(!t||!n||!W)return;const T=t.getBoundingClientRect(),le=n.getBoundingClientRect();$(T.width+q),J(T.height+xe),K(T.left-le.left-q+G),U(W.offsetHeight)},[c,R,s]),me({refs:[S,M],onDismiss:()=>w(!1),enabled:c});const Z=p.trim().length>0,{send:ee,handleKeyDown:te,handleChange:ae,onCompositionStart:se,onCompositionEnd:ne}=ue({value:p,onSend:m},P),d=s?.find(t=>t.id===R)??s?.[0],oe=!!s?.length&&!!d,re=t=>{_||Y(t),C?.(t),w(!1)};return e.jsxs("div",{className:u("w-full max-w-2xl mx-auto flex flex-col items-center gap-10",X),children:[e.jsxs("div",{className:"flex items-start gap-2",children:[!z&&e.jsx("div",{className:u("size-14 shrink-0",l?"-mt-2":"-mt-4"),children:e.jsx(ie,{})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h1",{className:"text-3xl font-medium tracking-tight text-on-surface",children:o}),l&&e.jsx("p",{className:"text-base text-on-surface-variant",children:l})]})]}),!F&&e.jsxs("div",{className:"flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-3 transition-colors focus-within:border-primary",children:[e.jsx("textarea",{ref:H,value:p,onChange:ae,onKeyDown:te,onCompositionStart:se,onCompositionEnd:ne,className:"w-full resize-none rounded-lg bg-transparent px-3 py-2 text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",placeholder:N,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-1 px-1 pb-0.5",children:[e.jsx(k,{icon:"attach_file_add",variant:"text",size:"md",className:"text-on-surface-variant hover:text-on-surface",onClick:y,"aria-label":"Attach file"}),e.jsx(k,{icon:"mic",variant:"text",size:"md",className:"text-on-surface-variant hover:text-on-surface",onClick:i,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),oe&&d&&e.jsxs("div",{className:"relative mr-4",children:[e.jsxs("button",{ref:S,type:"button",onClick:()=>w(t=>!t),className:"relative z-[51] flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface","aria-label":`Model: ${d.label}`,"aria-haspopup":"listbox","aria-expanded":c,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:d.label}),e.jsx(D,{name:"expand_more",size:16})]}),c&&e.jsxs("div",{ref:M,className:"absolute z-50 overflow-visible",style:{right:-G,top:-8,filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[E>0&&O>0&&e.jsx(ce,{width:B,height:E,notchWidth:O,notchHeight:A,notchSide:"bottom",notchOffset:V,radius:he,inverseRadius:fe,stroke:"var(--color-primary)",strokeWidth:1.5,className:"absolute top-0 left-0"}),e.jsx("div",{ref:L,role:"listbox","aria-label":"Model",className:"relative z-10 flex flex-col gap-1 p-2",style:{marginTop:A||32,width:B},children:s.map(t=>{const n=t.id===d.id;return e.jsxs("button",{type:"button",role:"option","aria-selected":n,onClick:()=>re(t.id),className:u("flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",n?"bg-on-surface/8 text-on-surface":"text-on-surface hover:bg-on-surface/8"),children:[e.jsx(D,{name:"check",size:16,className:u("shrink-0 translate-y-0.5",n?"text-on-surface":"text-transparent")}),e.jsx("span",{className:u(n&&"font-medium"),children:t.label}),t.description&&e.jsx("span",{className:"text-xs text-on-surface-variant",children:t.description})]},t.id)})})]})]}),e.jsx(k,{icon:"arrow_upward",variant:"filled",color:"primary",size:"md",className:"rounded-xl",onClick:ee,disabled:!Z,"aria-label":"Send message"})]})]})]})}j.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},hideLogo:{required:!1,tsType:{name:"boolean"},description:"Hide the MirrorStack logo above the greeting. Defaults to false.",defaultValue:{value:"false",computed:!1}},hideInput:{required:!1,tsType:{name:"boolean"},description:"Hide the chat input row — render greeting + logo only.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Ce={title:"UI/Agent/Greeting",component:j,decorators:[o=>e.jsx("div",{className:"min-h-[600px] w-full bg-background px-6 py-16",children:e.jsx(o,{})})]},r=[{id:"claude-sonnet-4-6",label:"Sonnet 4.6",description:"Balanced"},{id:"claude-opus-4-7",label:"Opus 4.7",description:"Adaptive"},{id:"claude-haiku-4-5",label:"Haiku 4.5",description:"Fast"}],g={render:o=>{const[l,N]=a.useState(o.selectedModelId??r[0].id),[m,y]=a.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(j,{...o,selectedModelId:l,onSelectModel:N,onSend:i=>y(s=>[...s,i])}),m.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:m.map((i,s)=>e.jsxs("li",{children:["· ",i]},s))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:r,selectedModelId:"claude-sonnet-4-6"}},h={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:r,selectedModelId:"claude-sonnet-4-6"}},f={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:r,selectedModelId:"claude-opus-4-7"}},x={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:r}},b={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}},v={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:r,hideLogo:!0}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState(args.selectedModelId ?? MODELS[0].id);
    const [sent, setSent] = useState<string[]>([]);
    return <div className="flex flex-col gap-8">
        <AgentGreeting {...args} selectedModelId={selected} onSelectModel={setSelected} onSend={msg => setSent(prev => [...prev, msg])} />
        {sent.length > 0 && <div className="mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm">
            <div className="mb-1 font-medium text-on-surface">Sent</div>
            <ul className="flex flex-col gap-1 text-on-surface-variant">
              {sent.map((m, i) => <li key={i}>· {m}</li>)}
            </ul>
          </div>}
      </div>;
  },
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6"
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6"
  }
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Let's create your app",
    subtitle: "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "claude-opus-4-7"
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS
  }
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?"
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    hideLogo: true
  }
}`,...v.parameters?.docs?.source}}};const Ee=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker","NoLogo"];export{f as AppCreation,h as FirstTime,v as NoLogo,b as NoModelPicker,x as Overview,g as WelcomeBack,Ee as __namedExportsOrder,Ce as default};
