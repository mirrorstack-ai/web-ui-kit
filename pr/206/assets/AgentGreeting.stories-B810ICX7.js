import{r as s,j as e}from"./iframe-TV02NmAC.js";import{c as O}from"./cn-IyxL_b2c.js";import{I as v}from"./IconButton-D8u1XEEa.js";import{I as W}from"./Icon-Bvug3YWf.js";import{D as q}from"./DropdownMenu-BOvQ8PIW.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DkxW_OVV.js";import"./button-styles-BPC6xbbG.js";import"./Notch-D3pJ9irq.js";const _=200;function b({greeting:n,subtitle:i,placeholder:h="plan something?",onSend:c,onAttachFile:x,onMic:r,models:a,selectedModelId:k,onSelectModel:j,className:I}){const[d,y]=s.useState(""),[T,w]=s.useState(!1),S=s.useRef(null);s.useLayoutEffect(()=>{const t=S.current;t&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,_)}px`)},[d]);const M=d.trim().length>0,N=()=>{M&&(c?.(d.trim()),y(""))},C=t=>{T||t.nativeEvent.isComposing||t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),N())},E=t=>{y(t.target.value)},o=a?.find(t=>t.id===k)??a?.[0],A=!!a?.length&&!!o,D=a?.map(t=>({id:t.id,label:t.label,icon:t.id===o?.id?"check":void 0}))??[];return e.jsxs("div",{className:O("w-full max-w-2xl mx-auto flex flex-col items-center gap-6",I),children:[e.jsxs("div",{className:"flex flex-col gap-1 text-center",children:[e.jsx("h1",{className:"text-3xl font-medium tracking-tight text-on-surface",children:n}),i&&e.jsx("p",{className:"text-base text-on-surface-variant",children:i})]}),e.jsxs("div",{className:"flex w-full flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-2 transition-colors focus-within:border-primary",children:[e.jsx("textarea",{ref:S,value:d,onChange:E,onKeyDown:C,onCompositionStart:()=>w(!0),onCompositionEnd:()=>w(!1),className:"w-full resize-none rounded-lg bg-transparent px-3 py-2 text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none",placeholder:h,"aria-label":"Start a conversation with the agent",rows:1}),e.jsxs("div",{className:"flex w-full items-center gap-0.5 px-1 pb-0.5",children:[e.jsx(v,{icon:"attach_file_add",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:x,"aria-label":"Attach file"}),e.jsx(v,{icon:"mic",variant:"text",size:"sm",className:"text-on-surface-variant hover:text-on-surface",onClick:r,"aria-label":"Voice input"}),e.jsx("div",{className:"flex-1"}),A&&o&&e.jsx(q,{items:D,onSelect:t=>j?.(t.id),trigger:e.jsxs("button",{type:"button",className:"flex h-8 cursor-pointer items-center gap-1 rounded-full px-2.5 text-sm text-on-surface-variant transition-colors hover:bg-on-surface/8 hover:text-on-surface","aria-label":`Model: ${o.label}`,children:[e.jsx("span",{className:"max-w-[140px] truncate",children:o.label}),e.jsx(W,{name:"expand_more",size:16})]}),offset:-8}),e.jsx(v,{icon:"arrow_upward",variant:"filled",color:"primary",size:"sm",onClick:N,disabled:!M,"aria-label":"Send message"})]})]})]})}b.__docgenInfo={description:"",methods:[],displayName:"AgentGreeting",props:{greeting:{required:!0,tsType:{name:"string"},description:'Main heading, e.g. "Welcome back, Nothing Chang".'},subtitle:{required:!1,tsType:{name:"string"},description:"Optional secondary line beneath the greeting."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"plan something?"',computed:!1}},onSend:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:""},onAttachFile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMic:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},models:{required:!1,tsType:{name:"Array",elements:[{name:"AgentGreetingModel"}],raw:"AgentGreetingModel[]"},description:"Available models for the picker. Omit or pass an empty array to hide it."},selectedModelId:{required:!1,tsType:{name:"string"},description:"Selected model id. Falls back to the first model when omitted."},onSelectModel:{required:!1,tsType:{name:"signature",type:"function",raw:"(modelId: string) => void",signature:{arguments:[{type:{name:"string"},name:"modelId"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const V={title:"UI/Agent/Greeting",component:b,decorators:[n=>e.jsx("div",{className:"min-h-[480px] w-full bg-background px-6 py-16",children:e.jsx(n,{})})]},l=[{id:"fast",label:"Fast"},{id:"balanced",label:"Balanced"},{id:"deep",label:"Deep think"}],m={render:n=>{const[i,h]=s.useState(n.selectedModelId??l[0].id),[c,x]=s.useState([]);return e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(b,{...n,selectedModelId:i,onSelectModel:h,onSend:r=>x(a=>[...a,r])}),c.length>0&&e.jsxs("div",{className:"mx-auto w-full max-w-2xl rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm",children:[e.jsx("div",{className:"mb-1 font-medium text-on-surface",children:"Sent"}),e.jsx("ul",{className:"flex flex-col gap-1 text-on-surface-variant",children:c.map((r,a)=>e.jsxs("li",{children:["· ",r]},a))})]})]})},args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?",models:l,selectedModelId:"balanced"}},u={args:{greeting:"Welcome to MirrorStack",subtitle:"Tell the agent what you want to build.",placeholder:"what do you want to build?",models:l,selectedModelId:"fast"}},p={args:{greeting:"Let's create your app",subtitle:"Describe the app — modules, data, surfaces — and the agent will scaffold it.",placeholder:"describe your app...",models:l,selectedModelId:"deep"}},g={args:{greeting:"What do you want to do next?",placeholder:"ask anything about your workspace...",models:l}},f={args:{greeting:"Welcome Back, Nothing Chang",placeholder:"plan something?"}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome to MirrorStack",
    subtitle: "Tell the agent what you want to build.",
    placeholder: "what do you want to build?",
    models: MODELS,
    selectedModelId: "fast"
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Let's create your app",
    subtitle: "Describe the app — modules, data, surfaces — and the agent will scaffold it.",
    placeholder: "describe your app...",
    models: MODELS,
    selectedModelId: "deep"
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "What do you want to do next?",
    placeholder: "ask anything about your workspace...",
    models: MODELS
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    greeting: "Welcome Back, Nothing Chang",
    placeholder: "plan something?"
  }
}`,...f.parameters?.docs?.source}}};const X=["WelcomeBack","FirstTime","AppCreation","Overview","NoModelPicker"];export{p as AppCreation,u as FirstTime,f as NoModelPicker,g as Overview,m as WelcomeBack,X as __namedExportsOrder,V as default};
