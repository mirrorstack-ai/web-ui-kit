import{r as n,j as e}from"./iframe-CsE_tCvp.js";import{c as f}from"./cn-IyxL_b2c.js";import{I as j}from"./IconButton-PS3bLi9d.js";import{I as B}from"./Icon-CPcIVayD.js";import{L as ne}from"./LogoMirrorStack-p5BziHYH.js";import{N as se}from"./Notch-B9jzuJvH.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-Br5dbzlV.js";import"./button-styles-BPC6xbbG.js";const ae=80,oe=200,q=220,re=12,ie=8,G=10,le=6,z=2;function E({greeting:o,subtitle:m,placeholder:S="plan something?",onSend:p,onAttachFile:M,onMic:d,models:a,selectedModelId:C,onSelectModel:F,hideLogo:X=!1,className:K}){const[g,I]=n.useState(""),[P,L]=n.useState(!1),[r,h]=n.useState(!1),[O,U]=n.useState(0),[V,$]=n.useState(0),[_,J]=n.useState(0),[A,Q]=n.useState(0),R=n.useRef(null),k=n.useRef(null),T=n.useRef(null),D=n.useRef(null);n.useLayoutEffect(()=>{const t=R.current;t&&(t.style.height="auto",t.style.height=`${Math.min(Math.max(t.scrollHeight,ae),oe)}px`)},[g]),n.useLayoutEffect(()=>{if(!r)return;const t=k.current,s=T.current,i=D.current;if(!t||!s||!i)return;const l=t.getBoundingClientRect(),te=s.getBoundingClientRect();J(l.width+G),Q(l.height+le),$(l.left-te.left-G+z),U(i.offsetHeight)},[r,C,a]),n.useEffect(()=>{if(!r)return;const t=i=>{const l=i.target;k.current?.contains(l)||T.current?.contains(l)||h(!1)},s=i=>{i.key==="Escape"&&h(!1)};return document.addEventListener("mousedown",t),document.addEventListener("keydown",s),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",s)}},[r]);const H=g.trim().length>0,W=()=>{H&&(p?.(g.trim()),I(""))},Y=t=>{P||t.nativeEvent.isComposing||t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),W())},Z=t=>{I(t.target.value)},u=a?.find(t=>t.id===C)??a?.[0],ee=!!a?.length&&!!u;return e.jsxs("div",{className:f("w-full max-w-2xl mx-auto flex flex-col items-center gap-10",K),children:[e.jsxs("div",{className:"flex items-center gap-4",children:[!X&&e.jsx("div",{className:"size-14 shrink-0",children:e.jsx(ne,{})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h1",{className:"text-3xl font-medium tracking-tight text-on-surface",children:o}),m&&e.jsx("p",{className:"text-base text-on-surface-variant",children:m})]})]}),e.jsxs("div",{className:"flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-2 transition-colors focus-within:border-primary",children:[e.jsx("textarea",{ref:R,value:g,onChange:Z,onKeyDown:Y,onCompositionStart:()=>L(!0),onCompositionEnd:()=>L(!1),className:"w-full resize-none rounded-lg bg-transparent px-3 py-2 text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",placeholder:S,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-0.5 px-1 pb-0.5",children:[e.jsx(j,{icon:"attach_file_add",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:M,"aria-label":"Attach file"}),e.jsx(j,{icon:"mic",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:d,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),ee&&u&&e.jsxs("div",{className:"relative mr-4",children:[e.jsxs("button",{ref:k,type:"button",onClick:()=>h(t=>!t),className:"relative z-[51] flex h-8 cursor-pointer items-center gap-1 rounded-full px-2.5 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface","aria-label":`Model: ${u.label}`,"aria-haspopup":"listbox","aria-expanded":r,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:u.label}),e.jsx(B,{name:"expand_more",size:16})]}),r&&e.jsxs("div",{ref:T,className:"absolute z-50 overflow-visible",style:{right:-z,top:-2,filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[O>0&&_>0&&e.jsx(se,{width:q,height:O,notchWidth:_,notchHeight:A,notchSide:"bottom",notchOffset:V,radius:re,inverseRadius:ie,stroke:"var(--color-primary)",strokeWidth:1.5,className:"absolute top-0 left-0"}),e.jsx("div",{ref:D,role:"listbox","aria-label":"Model",className:"relative z-10 flex flex-col gap-0.5 py-1.5 px-1.5",style:{marginTop:A||32,width:q},children:a.map(t=>{const s=t.id===u.id;return e.jsxs("button",{type:"button",role:"option","aria-selected":s,onClick:()=>{F?.(t.id),h(!1)},className:f("flex items-baseline gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",s?"bg-on-surface/8 text-on-surface":"text-on-surface hover:bg-on-surface/8"),children:[e.jsx(B,{name:"check",size:16,className:f("shrink-0 translate-y-0.5",s?"text-on-surface":"text-transparent")}),e.jsx("span",{className:f(s&&"font-medium"),children:t.label}),t.description&&e.jsx("span",{className:"text-xs text-on-surface-variant",children:t.description})]},t.id)})})]})]}),e.jsx(j,{icon:"arrow_upward",variant:"filled",color:"primary",size:"sm",onClick:W,disabled:!H,"aria-label":"Send message"})]})]})]})}E.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},hideLogo:{required:!1,tsType:{name:"boolean"},description:"Hide the MirrorStack logo above the greeting. Defaults to false.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const ve={title:"UI/Agent/Greeting",component:E,decorators:[o=>e.jsx("div",{className:"min-h-[600px] w-full bg-background px-6 py-16",children:e.jsx(o,{})})]},c=[{id:"claude-sonnet-4-6",label:"Sonnet 4.6",description:"Balanced"},{id:"claude-opus-4-7",label:"Opus 4.7",description:"Adaptive"},{id:"claude-haiku-4-5",label:"Haiku 4.5",description:"Fast"}],x={render:o=>{const[m,S]=n.useState(o.selectedModelId??c[0].id),[p,M]=n.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(E,{...o,selectedModelId:m,onSelectModel:S,onSend:d=>M(a=>[...a,d])}),p.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:p.map((d,a)=>e.jsxs("li",{children:["· ",d]},a))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:c,selectedModelId:"claude-sonnet-4-6"}},v={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:c,selectedModelId:"claude-sonnet-4-6"}},b={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:c,selectedModelId:"claude-opus-4-7"}},y={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:c}},N={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}},w={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:c,hideLogo:!0}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "claude-sonnet-4-6"
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Let's create your app",
    subtitle: "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "claude-opus-4-7"
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS
  }
}`,...y.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?"
  }
}`,...N.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?",
    models: MODELS,
    hideLogo: true
  }
}`,...w.parameters?.docs?.source}}};const be=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker","NoLogo"];export{b as AppCreation,v as FirstTime,w as NoLogo,N as NoModelPicker,y as Overview,x as WelcomeBack,be as __namedExportsOrder,ve as default};
