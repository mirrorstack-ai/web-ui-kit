import{r as a,j as e}from"./iframe-DFqMsVVo.js";import{A as v,a as f}from"./AgentSidebarInput-zv3J8uKv.js";import{c as w}from"./cn-IyxL_b2c.js";import{I as M}from"./Icon-Bm3E_2A1.js";import{a as I,A as j}from"./AgentSidebarMessage-BxJADwQ3.js";import{A as q}from"./AgentSidebarMultiQuestion-DGuysxcz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-tp-5sZ0k.js";import"./index-S2M5hXLQ.js";import"./IconButton-C1on1G6Y.js";import"./Progress-Dwwl--76.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-CWK0UOuc.js";import"./useClickOutside-BULhNfR2.js";import"./useModelSelection-foRXDqNb.js";import"./useMenuKeyNav-C6Kfjsih.js";import"./Button-DAx1GUhl.js";import"./FloatingLabelInput-CuFmrMCf.js";import"./SegmentedButton-CGWCWhuA.js";import"./Switch-BdEvXCar.js";const T=80;function H(n){let s=n?.parentElement??null;for(;s;){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll")return s;s=s.parentElement}return null}function y({messages:n,onSubmitMultiQuestion:s,autoScroll:r=!0,className:b}){const o=a.useRef(null),l=a.useRef(!0),i=a.useRef(!0),[d,k]=a.useState(!0);a.useEffect(()=>{const t=H(o.current);if(!t)return;const u=()=>{const h=t.scrollHeight-t.scrollTop-t.clientHeight<=T;h!==i.current&&(i.current=h,k(h))};return u(),t.addEventListener("scroll",u,{passive:!0}),()=>t.removeEventListener("scroll",u)},[]),a.useEffect(()=>{r&&(!l.current&&!i.current||(o.current?.scrollIntoView({behavior:l.current?"auto":"smooth",block:"end"}),l.current=!1))},[n,r]);const x=()=>{o.current?.scrollIntoView({behavior:"smooth",block:"end"})};return e.jsxs("div",{className:w("flex flex-col gap-4",b),children:[n.map(t=>t.role==="user"?e.jsx(I,{content:t.content},t.id):"kind"in t?e.jsx(q,{title:t.title,description:t.description,questions:t.questions,submitLabel:t.submitLabel,status:t.status,layout:t.layout,onSubmit:u=>s?.(t.id,u)},t.id):e.jsx(j,{content:t.content,streaming:t.streaming},t.id)),e.jsx("div",{ref:o}),!d&&e.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:e.jsxs("button",{type:"button",onClick:x,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[e.jsx(M,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}y.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
    id: string;
    role: "user";
    content: string;
  }
| {
    id: string;
    role: "agent";
    content: string;
    streaming?: boolean;
  }
| {
    id: string;
    role: "agent";
    kind: "multi-question";
    title: string;
    description?: string;
    questions: AgentSidebarQuestion[];
    submitLabel?: string;
    status?: AgentSidebarMultiQuestionStatus;
    layout?: AgentSidebarMultiQuestionLayout;
  }`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  role: "user";
  content: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"user"',required:!0}},{key:"content",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  id: string;
  role: "agent";
  content: string;
  streaming?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"agent"',required:!0}},{key:"content",value:{name:"string",required:!0}},{key:"streaming",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
  id: string;
  role: "agent";
  kind: "multi-question";
  title: string;
  description?: string;
  questions: AgentSidebarQuestion[];
  submitLabel?: string;
  status?: AgentSidebarMultiQuestionStatus;
  layout?: AgentSidebarMultiQuestionLayout;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"agent"',required:!0}},{key:"kind",value:{name:"literal",value:'"multi-question"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"description",value:{name:"string",required:!1}},{key:"questions",value:{name:"Array",elements:[{name:"union",raw:`| (QuestionBase & {
    type: "text";
    /** When true, renders as a textarea. */
    multiline?: boolean;
    placeholder?: string;
    defaultValue?: string;
  })
| (QuestionBase & {
    type: "toggle";
    defaultValue?: boolean;
  })
| (QuestionBase & {
    type: "choice";
    /** "segmented" — all options visible inline as a pill row (use for short labels, no descriptions).
     *  "cards" — radio-card list with title + description per option (use for weighted decisions). */
    style: AgentSidebarChoiceStyle;
    /** When true the user can pick more than one option; the answer is an array of values.
     *  Renders square check indicators (cards) or independently-toggling chips (segmented). */
    multiple?: boolean;
    options: {
      value: string;
      label: string;
      description?: string;
    }[];
    defaultValue?: string | string[];
  })`,elements:[{name:"unknown"},{name:"unknown"},{name:"unknown"}]}],raw:"AgentSidebarQuestion[]",required:!0}},{key:"submitLabel",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:'"pending" | "submitted"',elements:[{name:"literal",value:'"pending"'},{name:"literal",value:'"submitted"'}],required:!1}},{key:"layout",value:{name:"union",raw:'"list" | "tabs"',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"tabs"'}],required:!1}}]}}]}],raw:"AgentSidebarMessage[]"},description:""},onSubmitMultiQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  answers: Record<string, AgentSidebarMultiQuestionAnswer>,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean | string[]",elements:[{name:"string"},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const S=Object.freeze([{id:"anthropic.claude-sonnet-4-6",label:"Claude Sonnet 4.6"},{id:"gemini-3.5-flash",label:"Gemini 3.5 Flash",disabled:!0,disabledHint:"Supported in the future"},{id:"anthropic.claude-haiku-4-5-20251001-v1:0",label:"Claude Haiku 4.5"},{id:"gpt-5.4-mini",label:"GPT-5.4 mini",disabled:!0,disabledHint:"Supported in the future"},{id:"gemini-3.1-flash-lite",label:"Gemini 3.1 Flash-Lite",disabled:!0,disabledHint:"Supported in the future"},{id:"gpt-5.4-nano",label:"GPT-5.4 nano",disabled:!0,disabledHint:"Supported in the future"}]),A=Object.freeze([{label:"Today",items:[{id:"h-1",title:"Update display name",updatedAt:"2026-05-04T09:42:00Z"},{id:"h-2",title:"Enable two-factor login",updatedAt:"2026-05-04T08:15:00Z"}]},{label:"Yesterday",items:[{id:"h-3",title:"Revoke old browser session",updatedAt:"2026-05-03T22:10:00Z"},{id:"h-4",title:"Set notification preferences",updatedAt:"2026-05-03T14:50:00Z"}]},{label:"Earlier",items:[{id:"h-5",title:"Rename my account slug",updatedAt:"2026-05-01T11:00:00Z"},{id:"h-6",title:"Add a passkey from MacBook",updatedAt:"2026-04-28T19:25:00Z"},{id:"h-7",title:"Connect Google account",updatedAt:"2026-04-22T07:05:00Z"}]}]),N=Object.freeze([{id:"m-1",role:"user",content:"I want to change my username to alice2 and turn on dark mode."},{id:"m-2",role:"agent",content:"Sure — I can help with that. Let me know which one you'd like to start with."}]),K={title:"UI/Agent/Sidebar",decorators:[n=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(n,{})})]},c={render:()=>{const[n,s]=a.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(v,{sidebarWidth:n,onToggleCollapse:()=>s(n<=350?600:350),onClose:()=>console.log("close"),history:A,onSelectHistoryItem:r=>console.log("history",r)})})}},m={render:()=>e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(f,{onSend:n=>console.log("Send:",n),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},g={render:()=>{const[n,s]=a.useState("anthropic.claude-haiku-4-5-20251001-v1:0");return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(f,{onSend:r=>console.log("Send:",r),models:S,selectedModelId:n,onSelectModel:s})})}},p={render:()=>{const[n,s]=a.useState(N),r=(o,l)=>{s(i=>i.map(d=>d.id===o?{...d,...l}:d))},b=o=>{const l=`u-${Date.now()}`,i=`a-${Date.now()}`;s(d=>[...d,{id:l,role:"user",content:o},{id:i,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{r(i,{content:"Got it — let me look into that.",streaming:!1})},1500)};return e.jsxs(e.Fragment,{children:[e.jsx(v,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:A,onSelectHistoryItem:o=>console.log("history",o)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(y,{messages:n})}),e.jsx(f,{onSend:b,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:S,selectedModelId:"anthropic.claude-haiku-4-5-20251001-v1:0"})]})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState("anthropic.claude-haiku-4-5-20251001-v1:0");
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [messages, setMessages] = useState<AgentSidebarMessage[]>(mockAgentMessages);
    const patchMessage = (id: string, patch: Record<string, unknown>) => {
      setMessages(prev => prev.map(m => m.id === id ? {
        ...m,
        ...patch
      } as AgentSidebarMessage : m));
    };
    const handleSend = (content: string) => {
      const userId = \`u-\${Date.now()}\`;
      const agentId = \`a-\${Date.now()}\`;
      setMessages(prev => [...prev, {
        id: userId,
        role: "user",
        content
      }, {
        id: agentId,
        role: "agent",
        content: "",
        streaming: true
      }]);
      setTimeout(() => {
        patchMessage(agentId, {
          content: "Got it — let me look into that.",
          streaming: false
        });
      }, 1500);
    };
    return <>
        <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
        <div className="flex-1 bg-on-background rounded-2xl flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4">
            <AgentSidebarMessages messages={messages} />
          </div>
          <AgentSidebarInput onSend={handleSend} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId="anthropic.claude-haiku-4-5-20251001-v1:0" />
        </div>
      </>;
  }
}`,...p.parameters?.docs?.source}}};const ee=["Header","Input","InputWithModelSelector","Playground"];export{c as Header,m as Input,g as InputWithModelSelector,p as Playground,ee as __namedExportsOrder,K as default};
