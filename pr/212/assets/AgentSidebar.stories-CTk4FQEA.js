import{r as i,j as n}from"./iframe-COAq5ior.js";import{A as h,a as f}from"./AgentSidebarInput-BZobMGoO.js";import{c as w}from"./cn-IyxL_b2c.js";import{I as x}from"./Icon-5KWewCVe.js";import{a as k,A as M}from"./AgentSidebarMessage-BJxQfEqL.js";import{A as q}from"./AgentSidebarMultiQuestion-CxWT5rz9.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-Jlrxd1LE.js";import"./Progress-y5LL8ASt.js";import"./button-styles-BPC6xbbG.js";import"./Notch-ByndMJ1-.js";import"./Button-BG6Y2E8p.js";import"./FloatingLabelInput-DTq-oqNG.js";import"./SegmentedButton-DoN4aUSA.js";import"./Switch-tzb0ogmM.js";const j=80;function I(t){let s=t?.parentElement??null;for(;s;){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll")return s;s=s.parentElement}return null}function y({messages:t,onSubmitMultiQuestion:s,autoScroll:o=!0,className:p}){const r=i.useRef(null),l=i.useRef(!0),a=i.useRef(!0),[u,A]=i.useState(!0);i.useEffect(()=>{const e=I(r.current);if(!e)return;const d=()=>{const b=e.scrollHeight-e.scrollTop-e.clientHeight<=j;b!==a.current&&(a.current=b,A(b))};return d(),e.addEventListener("scroll",d,{passive:!0}),()=>e.removeEventListener("scroll",d)},[]),i.useEffect(()=>{o&&(!l.current&&!a.current||(r.current?.scrollIntoView({behavior:l.current?"auto":"smooth",block:"end"}),l.current=!1))},[t,o]);const S=()=>{r.current?.scrollIntoView({behavior:"smooth",block:"end"})};return n.jsxs("div",{className:w("flex flex-col gap-4",p),children:[t.map(e=>e.role==="user"?n.jsx(k,{content:e.content},e.id):"kind"in e?n.jsx(q,{title:e.title,description:e.description,questions:e.questions,submitLabel:e.submitLabel,status:e.status,layout:e.layout,onSubmit:d=>s?.(e.id,d)},e.id):n.jsx(M,{content:e.content,streaming:e.streaming},e.id)),n.jsx("div",{ref:r}),!u&&n.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:n.jsxs("button",{type:"button",onClick:S,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[n.jsx(x,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}y.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
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
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean | string[]",elements:[{name:"string"},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const v=Object.freeze([{label:"Today",items:[{id:"h-1",title:"Update display name",updatedAt:"2026-05-04T09:42:00Z"},{id:"h-2",title:"Enable two-factor login",updatedAt:"2026-05-04T08:15:00Z"}]},{label:"Yesterday",items:[{id:"h-3",title:"Revoke old browser session",updatedAt:"2026-05-03T22:10:00Z"},{id:"h-4",title:"Set notification preferences",updatedAt:"2026-05-03T14:50:00Z"}]},{label:"Earlier",items:[{id:"h-5",title:"Rename my account slug",updatedAt:"2026-05-01T11:00:00Z"},{id:"h-6",title:"Add a passkey from MacBook",updatedAt:"2026-04-28T19:25:00Z"},{id:"h-7",title:"Connect Google account",updatedAt:"2026-04-22T07:05:00Z"}]}]),T=Object.freeze([{id:"m-1",role:"user",content:"I want to change my username to alice2 and turn on dark mode."},{id:"m-2",role:"agent",content:"Sure — I can help with that. Let me know which one you'd like to start with."}]),P={title:"UI/Agent/Sidebar",decorators:[t=>n.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:n.jsx(t,{})})]},c={render:()=>{const[t,s]=i.useState(420);return n.jsx("div",{className:"bg-surface-container",children:n.jsx(h,{sidebarWidth:t,onToggleCollapse:()=>s(t<=350?600:350),onClose:()=>console.log("close"),history:v,onSelectHistoryItem:o=>console.log("history",o)})})}},g={render:()=>n.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:n.jsx(f,{onSend:t=>console.log("Send:",t),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},m={render:()=>{const[t,s]=i.useState(T),o=(r,l)=>{s(a=>a.map(u=>u.id===r?{...u,...l}:u))},p=r=>{const l=`u-${Date.now()}`,a=`a-${Date.now()}`;s(u=>[...u,{id:l,role:"user",content:r},{id:a,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{o(a,{content:"Got it — let me look into that.",streaming:!1})},1500)};return n.jsxs(n.Fragment,{children:[n.jsx(h,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:v,onSelectHistoryItem:r=>console.log("history",r)}),n.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[n.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:n.jsx(y,{messages:t})}),n.jsx(f,{onSend:p,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})]})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
          <AgentSidebarInput onSend={handleSend} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
        </div>
      </>;
  }
}`,...m.parameters?.docs?.source}}};const $=["Header","Input","Playground"];export{c as Header,g as Input,m as Playground,$ as __namedExportsOrder,P as default};
