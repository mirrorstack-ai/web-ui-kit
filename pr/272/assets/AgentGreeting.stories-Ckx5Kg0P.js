import{r as a,j as e}from"./iframe-DX2hHYex.js";import{c as n}from"./cn-IyxL_b2c.js";import{I as C}from"./IconButton-C8uFHTzm.js";import{I as q}from"./Icon-BjUynFXX.js";import{L as ue}from"./Logo-Dbhzctsi.js";import{N as me}from"./Notch-ClLbU3tx.js";import{u as pe,a as ge}from"./useComposerSubmit-C53dbiwZ.js";import{u as he}from"./useClickOutside-BfGQ4XfT.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BIUTK35G.js";import"./button-styles-CZHSjrxJ.js";const fe={hero:{min:80,max:200},compact:{min:40,max:112}},G=220,xe=14,be=8,F=12,ve=6,U=6;function I({greeting:r,subtitle:c,placeholder:w="plan something?",onSend:g,onAttachFile:S,onMic:d,models:o,selectedModelId:O,onSelectModel:L,hideLogo:V=!1,hideInput:P=!1,size:D="hero",className:X}){const s=D==="compact",[h,K]=a.useState(""),[u,M]=a.useState(!1),[A,$]=a.useState(0),[J,Q]=a.useState(0),[E,Y]=a.useState(0),[R,Z]=a.useState(0),W=L!==void 0,[ee,te]=a.useState(O),_=W?O:ee,z=a.useRef(null),k=a.useRef(null),j=a.useRef(null),B=a.useRef(null);pe(z,h,fe[D]),a.useLayoutEffect(()=>{if(!u)return;const t=k.current,i=j.current,H=B.current;if(!t||!i||!H)return;const T=t.getBoundingClientRect(),de=i.getBoundingClientRect();Y(T.width+F),Z(T.height+ve),Q(T.left-de.left-F+U),$(H.offsetHeight)},[u,_,o]),he({refs:[k,j],onDismiss:()=>M(!1),enabled:u});const ae=h.trim().length>0,{send:se,handleKeyDown:ne,handleChange:oe,onCompositionStart:re,onCompositionEnd:ie}=ge({value:h,onSend:g},K),m=o?.find(t=>t.id===_)??o?.[0],le=!!o?.length&&!!m,ce=t=>{W||te(t),L?.(t),M(!1)};return e.jsxs("div",{className:n("w-full flex flex-col",s?"items-stretch gap-3":"max-w-2xl mx-auto items-center gap-10",X),children:[e.jsxs("div",{className:"flex items-start gap-2",children:[!V&&e.jsx("div",{className:n("shrink-0",s?"size-9":"size-14",!s&&(c?"-mt-2":"-mt-4")),children:e.jsx(ue,{})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h1",{className:n("font-medium tracking-tight text-on-surface",s?"text-lg":"text-3xl"),children:r}),c&&e.jsx("p",{className:n("text-on-surface-variant",s?"text-sm":"text-base"),children:c})]})]}),!P&&e.jsxs("div",{className:n("flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low transition-colors focus-within:border-primary",s?"p-2":"p-3"),children:[e.jsx("textarea",{ref:z,value:h,onChange:oe,onKeyDown:ne,onCompositionStart:re,onCompositionEnd:ie,className:n("w-full resize-none rounded-lg bg-transparent text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",s?"px-2.5 py-1.5 text-sm":"px-3 py-2 text-base"),placeholder:w,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-1 px-1 pb-0.5",children:[e.jsx(C,{icon:"attach_file_add",variant:"text",size:s?"sm":"md",className:"text-on-surface-variant hover:text-on-surface",onClick:S,"aria-label":"Attach file"}),e.jsx(C,{icon:"mic",variant:"text",size:s?"sm":"md",className:"text-on-surface-variant hover:text-on-surface",onClick:d,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),le&&m&&e.jsxs("div",{className:"relative mr-4",children:[e.jsxs("button",{ref:k,type:"button",onClick:()=>M(t=>!t),className:n("relative z-[51] flex cursor-pointer items-center gap-1.5 rounded-full text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface",s?"h-8 px-3 text-xs":"h-9 px-4 text-sm"),"aria-label":`Model: ${m.label}`,"aria-haspopup":"listbox","aria-expanded":u,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:m.label}),e.jsx(q,{name:"expand_more",size:16})]}),u&&e.jsxs("div",{ref:j,className:"absolute z-50 overflow-visible",style:{right:-U,top:-8,filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[A>0&&E>0&&e.jsx(me,{width:G,height:A,notchWidth:E,notchHeight:R,notchSide:"bottom",notchOffset:J,radius:xe,inverseRadius:be,stroke:"var(--color-primary)",strokeWidth:1.5,className:"absolute top-0 left-0"}),e.jsx("div",{ref:B,role:"listbox","aria-label":"Model",className:"relative z-10 flex flex-col gap-1 p-2",style:{marginTop:R||32,width:G},children:o.map(t=>{const i=t.id===m.id;return e.jsxs("button",{type:"button",role:"option","aria-selected":i,onClick:()=>ce(t.id),className:n("flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",i?"bg-on-surface/8 text-on-surface":"text-on-surface hover:bg-on-surface/8"),children:[e.jsx(q,{name:"check",size:16,className:n("shrink-0 translate-y-0.5",i?"text-on-surface":"text-transparent")}),e.jsx("span",{className:n(i&&"font-medium"),children:t.label}),t.description&&e.jsx("span",{className:"text-xs text-on-surface-variant",children:t.description})]},t.id)})})]})]}),e.jsx(C,{icon:"arrow_upward",variant:"filled",color:"primary",size:s?"sm":"md",className:s?"rounded-lg":"rounded-xl",onClick:se,disabled:!ae,"aria-label":"Send message"})]})]})]})}I.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},hideLogo:{required:!1,tsType:{name:"boolean"},description:"Hide the MirrorStack logo above the greeting. Defaults to false.",defaultValue:{value:"false",computed:!1}},hideInput:{required:!1,tsType:{name:"boolean"},description:"Hide the chat input row — render greeting + logo only.",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"hero" | "compact"',elements:[{name:"literal",value:'"hero"'},{name:"literal",value:'"compact"'}]},description:'`"hero"` (default) is the full-page welcome surface — centered, large\n type, tall input. `"compact"` scales everything down and left-aligns to\n fit inside dashboard tiles and other dense containers.',defaultValue:{value:'"hero"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Le={title:"UI/Agent/Greeting",component:I,decorators:[r=>e.jsx("div",{className:"min-h-[600px] w-full bg-background px-6 py-16",children:e.jsx(r,{})})]},l=[{id:"claude-sonnet-4-6",label:"Sonnet 4.6",description:"Balanced"},{id:"claude-opus-4-7",label:"Opus 4.7",description:"Adaptive"},{id:"claude-haiku-4-5",label:"Haiku 4.5",description:"Fast"}],f={render:r=>{const[c,w]=a.useState(r.selectedModelId??l[0].id),[g,S]=a.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(I,{...r,selectedModelId:c,onSelectModel:w,onSend:d=>S(o=>[...o,d])}),g.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:g.map((d,o)=>e.jsxs("li",{children:["· ",d]},o))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:l,selectedModelId:"claude-sonnet-4-6"}},x={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:l,selectedModelId:"claude-sonnet-4-6"}},b={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:l,selectedModelId:"claude-opus-4-7"}},v={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:l}},y={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}},N={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:l,hideLogo:!0}},p={decorators:[r=>e.jsx("div",{className:"max-w-xl rounded-[22px] border border-outline-variant bg-surface-container-low p-4",children:e.jsx(r,{})})],args:{greeting:"Good afternoon, Nothing Chang",placeholder:"ask the agent anything about this app…",hideLogo:!0,size:"compact"}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
 app overview embeds it.`,...p.parameters?.docs?.description}}};const De=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker","NoLogo","Compact"];export{b as AppCreation,p as Compact,x as FirstTime,N as NoLogo,y as NoModelPicker,v as Overview,f as WelcomeBack,De as __namedExportsOrder,Le as default};
