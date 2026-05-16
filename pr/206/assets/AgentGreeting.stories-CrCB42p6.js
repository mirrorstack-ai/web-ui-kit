import{r as n,j as e}from"./iframe-qQ7pSgA-.js";import{c as j}from"./cn-IyxL_b2c.js";import{I as E}from"./IconButton-Cy85YFOr.js";import{I as B}from"./Icon-jjmK9Mdg.js";import{L as ee}from"./LogoMirrorStack-BGp9D-JA.js";import{N as te}from"./Notch-Bxx1hBQO.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-CcWwO_-T.js";import"./button-styles-BPC6xbbG.js";const ne=200,H=200,se=12,ae=8;function T({greeting:o,subtitle:m,placeholder:N="plan something?",onSend:p,onAttachFile:S,onMic:d,models:s,selectedModelId:C,onSelectModel:z,hideLogo:G=!1,className:F}){const[g,L]=n.useState(""),[K,I]=n.useState(!1),[r,f]=n.useState(!1),[W,U]=n.useState(0),[X,V]=n.useState(0),[R,P]=n.useState(0),[O,$]=n.useState(0),A=n.useRef(null),M=n.useRef(null),k=n.useRef(null),D=n.useRef(null);n.useLayoutEffect(()=>{const t=A.current;t&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,ne)}px`)},[g]),n.useLayoutEffect(()=>{if(!r)return;const t=M.current,a=k.current,l=D.current;if(!t||!a||!l)return;const i=t.getBoundingClientRect(),Z=a.getBoundingClientRect();P(i.width),$(i.height),V(i.left-Z.left),U(l.offsetHeight)},[r,C,s]),n.useEffect(()=>{if(!r)return;const t=l=>{const i=l.target;M.current?.contains(i)||k.current?.contains(i)||f(!1)},a=l=>{l.key==="Escape"&&f(!1)};return document.addEventListener("mousedown",t),document.addEventListener("keydown",a),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",a)}},[r]);const _=g.trim().length>0,q=()=>{_&&(p?.(g.trim()),L(""))},J=t=>{K||t.nativeEvent.isComposing||t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),q())},Q=t=>{L(t.target.value)},u=s?.find(t=>t.id===C)??s?.[0],Y=!!s?.length&&!!u;return e.jsxs("div",{className:j("w-full max-w-2xl mx-auto flex flex-col items-center gap-10",F),children:[e.jsxs("div",{className:"flex flex-col items-center gap-4 text-center",children:[!G&&e.jsx("div",{className:"size-14",children:e.jsx(ee,{})}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("h1",{className:"text-3xl font-medium tracking-tight text-on-surface",children:o}),m&&e.jsx("p",{className:"text-base text-on-surface-variant",children:m})]})]}),e.jsxs("div",{className:"flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-2 transition-colors focus-within:border-primary",children:[e.jsx("textarea",{ref:A,value:g,onChange:Q,onKeyDown:J,onCompositionStart:()=>I(!0),onCompositionEnd:()=>I(!1),className:"w-full resize-none rounded-lg bg-transparent px-3 py-2 text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",placeholder:N,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-0.5 px-1 pb-0.5",children:[e.jsx(E,{icon:"attach_file_add",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:S,"aria-label":"Attach file"}),e.jsx(E,{icon:"mic",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:d,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),Y&&u&&e.jsxs("div",{className:"relative mr-4",children:[e.jsxs("button",{ref:M,type:"button",onClick:()=>f(t=>!t),className:"relative z-[51] flex h-8 cursor-pointer items-center gap-1 rounded-full px-2.5 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface","aria-label":`Model: ${u.label}`,"aria-haspopup":"listbox","aria-expanded":r,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:u.label}),e.jsx(B,{name:"expand_more",size:16})]}),r&&e.jsxs("div",{ref:k,className:"absolute right-0 top-0 z-50 overflow-visible",style:{filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[W>0&&R>0&&e.jsx(te,{width:H,height:W,notchWidth:R,notchHeight:O,notchSide:"bottom",notchOffset:X,radius:se,inverseRadius:ae,stroke:"var(--color-primary)",strokeWidth:1.5,className:"absolute top-0 left-0"}),e.jsx("div",{ref:D,role:"listbox","aria-label":"Model",className:"relative z-10 flex flex-col gap-0.5 py-1.5 px-1.5",style:{marginTop:O||32,width:H},children:s.map(t=>{const a=t.id===u.id;return e.jsxs("button",{type:"button",role:"option","aria-selected":a,onClick:()=>{z?.(t.id),f(!1)},className:j("flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",a?"bg-on-surface/8 font-medium text-on-surface":"text-on-surface hover:bg-on-surface/8"),children:[e.jsx(B,{name:"check",size:16,className:j("shrink-0",a?"text-on-surface":"text-transparent")}),t.label]},t.id)})})]})]}),e.jsx(E,{icon:"arrow_upward",variant:"filled",color:"primary",size:"sm",onClick:q,disabled:!_,"aria-label":"Send message"})]})]})]})}T.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},hideLogo:{required:!1,tsType:{name:"boolean"},description:"Hide the MirrorStack logo above the greeting. Defaults to false.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const ge={title:"UI/Agent/Greeting",component:T,decorators:[o=>e.jsx("div",{className:"min-h-[600px] w-full bg-background px-6 py-16",children:e.jsx(o,{})})]},c=[{id:"claude-sonnet-4-6",label:"Sonnet 4.6"},{id:"claude-opus-4-7",label:"Opus 4.7"},{id:"claude-haiku-4-5",label:"Haiku 4.5"}],h={render:o=>{const[m,N]=n.useState(o.selectedModelId??c[0].id),[p,S]=n.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(T,{...o,selectedModelId:m,onSelectModel:N,onSend:d=>S(s=>[...s,d])}),p.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:p.map((d,s)=>e.jsxs("li",{children:["· ",d]},s))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:c,selectedModelId:"claude-sonnet-4-6"}},x={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:c,selectedModelId:"claude-sonnet-4-6"}},v={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:c,selectedModelId:"claude-opus-4-7"}},b={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:c}},y={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}},w={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:c,hideLogo:!0}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6"
  }
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Let's create your app",
    subtitle: "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "claude-opus-4-7"
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?"
  }
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    hideLogo: true
  }
}`,...w.parameters?.docs?.source}}};const fe=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker","NoLogo"];export{v as AppCreation,x as FirstTime,w as NoLogo,y as NoModelPicker,b as Overview,h as WelcomeBack,fe as __namedExportsOrder,ge as default};
