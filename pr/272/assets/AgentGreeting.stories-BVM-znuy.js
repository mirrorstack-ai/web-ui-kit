import{r as a,j as e}from"./iframe-BqQVRbHd.js";import{c as n}from"./cn-IyxL_b2c.js";import{I as C}from"./IconButton-CI1ats4J.js";import{I as _}from"./Icon-D6pm6XXZ.js";import{L as ce}from"./Logo-D3RyJ9G2.js";import{N as de}from"./Notch-DdjwqKu6.js";import{u as ue,a as me,b as pe}from"./useModelSelection-Dr9zWjfh.js";import{u as ge}from"./useClickOutside-CPNao91I.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BTlGBzmM.js";import"./button-styles-CZHSjrxJ.js";const he={hero:{min:80,max:200},compact:{min:40,max:112}},z=220,fe=14,xe=8,B=12,be=6,H=6;function I({greeting:o,subtitle:c,placeholder:w="plan something?",onSend:g,onAttachFile:S,onMic:d,models:r,selectedModelId:q,onSelectModel:G,hideLogo:F=!1,hideInput:U=!1,size:O="hero",className:V}){const s=O==="compact",[h,P]=a.useState(""),[u,M]=a.useState(!1),[L,X]=a.useState(0),[K,$]=a.useState(0),[D,J]=a.useState(0),[A,Q]=a.useState(0),{activeModel:m,activeModelId:Y,selectModel:Z}=ue({models:r,selectedModelId:q,onSelectModel:G}),E=a.useRef(null),k=a.useRef(null),j=a.useRef(null),R=a.useRef(null);me(E,h,he[O]),a.useLayoutEffect(()=>{if(!u)return;const t=k.current,l=j.current,W=R.current;if(!t||!l||!W)return;const T=t.getBoundingClientRect(),ie=l.getBoundingClientRect();J(T.width+B),Q(T.height+be),$(T.left-ie.left-B+H),X(W.offsetHeight)},[u,Y,r]),ge({refs:[k,j],onDismiss:()=>M(!1),enabled:u});const ee=h.trim().length>0,{send:te,handleKeyDown:ae,handleChange:se,onCompositionStart:ne,onCompositionEnd:oe}=pe({value:h,onSend:g},P),re=!!r?.length&&!!m,le=t=>{Z(t),M(!1)};return e.jsxs("div",{className:n("w-full flex flex-col",s?"items-stretch gap-3":"max-w-2xl mx-auto items-center gap-10",V),children:[e.jsxs("div",{className:"flex items-start gap-2",children:[!F&&e.jsx("div",{className:n("shrink-0",s?"size-9":"size-14",!s&&(c?"-mt-2":"-mt-4")),children:e.jsx(ce,{})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h1",{className:n("font-medium tracking-tight text-on-surface",s?"text-lg":"text-3xl"),children:o}),c&&e.jsx("p",{className:n("text-on-surface-variant",s?"text-sm":"text-base"),children:c})]})]}),!U&&e.jsxs("div",{className:n("flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low transition-colors focus-within:border-primary",s?"p-2":"p-3"),children:[e.jsx("textarea",{ref:E,value:h,onChange:se,onKeyDown:ae,onCompositionStart:ne,onCompositionEnd:oe,className:n("w-full resize-none rounded-lg bg-transparent text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",s?"px-2.5 py-1.5 text-sm":"px-3 py-2 text-base"),placeholder:w,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-1 px-1 pb-0.5",children:[e.jsx(C,{icon:"attach_file_add",variant:"text",size:s?"sm":"md",className:"text-on-surface-variant hover:text-on-surface",onClick:S,"aria-label":"Attach file"}),e.jsx(C,{icon:"mic",variant:"text",size:s?"sm":"md",className:"text-on-surface-variant hover:text-on-surface",onClick:d,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),re&&m&&e.jsxs("div",{className:"relative mr-4",children:[e.jsxs("button",{ref:k,type:"button",onClick:()=>M(t=>!t),className:n("relative z-[51] flex cursor-pointer items-center gap-1.5 rounded-full text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface",s?"h-8 px-3 text-xs":"h-9 px-4 text-sm"),"aria-label":`Model: ${m.label}`,"aria-haspopup":"listbox","aria-expanded":u,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:m.label}),e.jsx(_,{name:"expand_more",size:16})]}),u&&e.jsxs("div",{ref:j,className:"absolute z-50 overflow-visible",style:{right:-H,top:-8,filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[L>0&&D>0&&e.jsx(de,{width:z,height:L,notchWidth:D,notchHeight:A,notchSide:"bottom",notchOffset:K,radius:fe,inverseRadius:xe,stroke:"var(--color-primary)",strokeWidth:1.5,className:"absolute top-0 left-0"}),e.jsx("div",{ref:R,role:"listbox","aria-label":"Model",className:"relative z-10 flex flex-col gap-1 p-2",style:{marginTop:A||32,width:z},children:r.map(t=>{const l=t.id===m.id;return e.jsxs("button",{type:"button",role:"option","aria-selected":l,onClick:()=>le(t.id),className:n("flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",l?"bg-on-surface/8 text-on-surface":"text-on-surface hover:bg-on-surface/8"),children:[e.jsx(_,{name:"check",size:16,className:n("shrink-0 translate-y-0.5",l?"text-on-surface":"text-transparent")}),e.jsx("span",{className:n(l&&"font-medium"),children:t.label}),t.description&&e.jsx("span",{className:"text-xs text-on-surface-variant",children:t.description})]},t.id)})})]})]}),e.jsx(C,{icon:"arrow_upward",variant:"filled",color:"primary",size:s?"sm":"md",className:s?"rounded-lg":"rounded-xl",onClick:te,disabled:!ee,"aria-label":"Send message"})]})]})]})}I.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},hideLogo:{required:!1,tsType:{name:"boolean"},description:"Hide the MirrorStack logo above the greeting. Defaults to false.",defaultValue:{value:"false",computed:!1}},hideInput:{required:!1,tsType:{name:"boolean"},description:"Hide the chat input row — render greeting + logo only.",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"hero" | "compact"',elements:[{name:"literal",value:'"hero"'},{name:"literal",value:'"compact"'}]},description:'`"hero"` (default) is the full-page welcome surface — centered, large\n type, tall input. `"compact"` scales everything down and left-aligns to\n fit inside dashboard tiles and other dense containers.',defaultValue:{value:'"hero"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Oe={title:"UI/Agent/Greeting",component:I,decorators:[o=>e.jsx("div",{className:"min-h-[600px] w-full bg-background px-6 py-16",children:e.jsx(o,{})})]},i=[{id:"claude-sonnet-4-6",label:"Sonnet 4.6",description:"Balanced"},{id:"claude-opus-4-7",label:"Opus 4.7",description:"Adaptive"},{id:"claude-haiku-4-5",label:"Haiku 4.5",description:"Fast"}],f={render:o=>{const[c,w]=a.useState(o.selectedModelId??i[0].id),[g,S]=a.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(I,{...o,selectedModelId:c,onSelectModel:w,onSend:d=>S(r=>[...r,d])}),g.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:g.map((d,r)=>e.jsxs("li",{children:["· ",d]},r))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:i,selectedModelId:"claude-sonnet-4-6"}},x={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:i,selectedModelId:"claude-sonnet-4-6"}},b={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:i,selectedModelId:"claude-opus-4-7"}},v={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:i}},y={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}},N={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:i,hideLogo:!0}},p={decorators:[o=>e.jsx("div",{className:"max-w-xl rounded-[22px] border border-outline-variant bg-surface-container-low p-4",children:e.jsx(o,{})})],args:{greeting:"Good afternoon, Nothing Chang",placeholder:"ask the agent anything about this app…",hideLogo:!0,size:"compact"}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6"
  }
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Let's create your app",
    subtitle: "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "claude-opus-4-7"
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?"
  }
}`,...y.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    hideLogo: true
  }
}`,...N.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="max-w-xl rounded-[22px] border border-outline-variant bg-surface-container-low p-4">
        <Story />
      </div>],
  args: {
    greeting: "Good afternoon, Nothing Chang",
    placeholder: "ask the agent anything about this app…",
    hideLogo: true,
    size: "compact"
  }
}`,...p.parameters?.docs?.source},description:{story:`Dashboard-tile fit: compact size inside a constrained card, the way the
 app overview embeds it.`,...p.parameters?.docs?.description}}};const Le=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker","NoLogo","Compact"];export{b as AppCreation,p as Compact,x as FirstTime,N as NoLogo,y as NoModelPicker,v as Overview,f as WelcomeBack,Le as __namedExportsOrder,Oe as default};
