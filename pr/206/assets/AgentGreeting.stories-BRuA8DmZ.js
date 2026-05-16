import{r as a,j as e}from"./iframe-DsF2Ng94.js";import{c as A}from"./cn-IyxL_b2c.js";import{I as w}from"./IconButton-Ce-dShHA.js";import{I as L}from"./Icon-fOFA9wS8.js";import{O as K}from"./OptionList-BFCZ0K1R.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-CNNTUxVV.js";import"./button-styles-BPC6xbbG.js";const H=200;function S({greeting:s,subtitle:i,placeholder:v="plan something?",onSend:c,onAttachFile:b,onMic:o,models:n,selectedModelId:D,onSelectModel:W,className:q}){const[d,M]=a.useState(""),[_,N]=a.useState(!1),[m,u]=a.useState(!1),k=a.useRef(null),j=a.useRef(null),I=a.useRef(null);a.useLayoutEffect(()=>{const t=k.current;t&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,H)}px`)},[d]),a.useEffect(()=>{if(!m)return;const t=y=>{const O=y.target;j.current?.contains(O)||I.current?.contains(O)||u(!1)},C=y=>{y.key==="Escape"&&u(!1)};return document.addEventListener("mousedown",t),document.addEventListener("keydown",C),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",C)}},[m]);const E=d.trim().length>0,T=()=>{E&&(c?.(d.trim()),M(""))},B=t=>{_||t.nativeEvent.isComposing||t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),T())},R=t=>{M(t.target.value)},r=n?.find(t=>t.id===D)??n?.[0],z=!!n?.length&&!!r,G=n?.map(t=>({value:t.id,label:e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(L,{name:"check",size:14,className:A("shrink-0",t.id===r?.id?"text-on-surface":"text-transparent")}),t.label]})}))??[],F=n?.findIndex(t=>t.id===r?.id)??-1;return e.jsxs("div",{className:A("w-full max-w-2xl mx-auto flex flex-col items-center gap-6",q),children:[e.jsxs("div",{className:"flex flex-col gap-1 text-center",children:[e.jsx("h1",{className:"text-3xl font-medium tracking-tight text-on-surface",children:s}),i&&e.jsx("p",{className:"text-base text-on-surface-variant",children:i})]}),e.jsxs("div",{className:"flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-2 transition-colors focus-within:border-primary",children:[e.jsx("textarea",{ref:k,value:d,onChange:R,onKeyDown:B,onCompositionStart:()=>N(!0),onCompositionEnd:()=>N(!1),className:"w-full resize-none rounded-lg bg-transparent px-3 py-2 text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",placeholder:v,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-0.5 px-1 pb-0.5",children:[e.jsx(w,{icon:"attach_file_add",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:b,"aria-label":"Attach file"}),e.jsx(w,{icon:"mic",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:o,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),z&&r&&e.jsxs("div",{className:"relative mr-2",children:[e.jsxs("button",{ref:j,type:"button",onClick:()=>u(t=>!t),className:"flex h-8 cursor-pointer items-center gap-1 rounded-full px-2.5 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface","aria-label":`Model: ${r.label}`,"aria-haspopup":"listbox","aria-expanded":m,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:r.label}),e.jsx(L,{name:"expand_more",size:16})]}),m&&e.jsx("div",{ref:I,className:"absolute right-0 bottom-full z-50 mb-2 min-w-[160px]",children:e.jsx(K,{items:G,activeIndex:F,onSelect:t=>{W?.(t.value),u(!1)}})})]}),e.jsx(w,{icon:"arrow_upward",variant:"filled",color:"primary",size:"sm",onClick:T,disabled:!E,"aria-label":"Send message"})]})]})]})}S.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Z={title:"UI/Agent/Greeting",component:S,decorators:[s=>e.jsx("div",{className:"min-h-[480px] w-full bg-background px-6 py-16",children:e.jsx(s,{})})]},l=[{id:"fast",label:"Fast"},{id:"balanced",label:"Balanced"},{id:"deep",label:"Deep think"}],p={render:s=>{const[i,v]=a.useState(s.selectedModelId??l[0].id),[c,b]=a.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(S,{...s,selectedModelId:i,onSelectModel:v,onSend:o=>b(n=>[...n,o])}),c.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:c.map((o,n)=>e.jsxs("li",{children:["· ",o]},n))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:l,selectedModelId:"balanced"}},g={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:l,selectedModelId:"fast"}},f={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:l,selectedModelId:"deep"}},x={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:l}},h={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
    selectedModelId: "balanced"
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "fast"
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Let's create your app",
    subtitle: "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "deep"
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?"
  }
}`,...h.parameters?.docs?.source}}};const ee=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker"];export{f as AppCreation,g as FirstTime,h as NoModelPicker,x as Overview,p as WelcomeBack,ee as __namedExportsOrder,Z as default};
