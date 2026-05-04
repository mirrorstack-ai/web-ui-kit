import{r as l,j as n}from"./iframe-BSrgepk6.js";import{A as p,a as b}from"./AgentSidebarInput-DLH2smCJ.js";import{c as v}from"./cn-IyxL_b2c.js";import{a as S,A}from"./AgentSidebarMessage-B6fCcqD0.js";import{A as w}from"./AgentSidebarMultiQuestion-D90U3bW_.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-CIwixQiM.js";import"./Progress-BGfwaGcc.js";import"./Icon-BMggan3K.js";import"./button-styles-DvQkePbc.js";import"./Notch-C2Ee6LhZ.js";import"./Button-DgF8Z8-x.js";import"./FloatingLabelInput-Crrjsc7i.js";import"./SegmentedButton-ClsUJ-gz.js";const x=80;function k(t){let s=t?.parentElement??null;for(;s;){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll")return s;s=s.parentElement}return null}function h({messages:t,onSubmitMultiQuestion:s,autoScroll:r=!0,className:m}){const o=l.useRef(null),a=l.useRef(!0),i=l.useRef(!0);return l.useEffect(()=>{const e=k(o.current);if(!e)return;const u=()=>{const y=e.scrollHeight-e.scrollTop-e.clientHeight;i.current=y<=x};return e.addEventListener("scroll",u,{passive:!0}),()=>e.removeEventListener("scroll",u)},[]),l.useEffect(()=>{r&&(!a.current&&!i.current||(o.current?.scrollIntoView({behavior:a.current?"auto":"smooth",block:"end"}),a.current=!1))},[t,r]),n.jsxs("div",{className:v("flex flex-col gap-4",m),children:[t.map(e=>e.role==="user"?n.jsx(S,{content:e.content},e.id):"kind"in e?n.jsx(w,{title:e.title,description:e.description,questions:e.questions,submitLabel:e.submitLabel,status:e.status,layout:e.layout,onSubmit:u=>s?.(e.id,u)},e.id):n.jsx(A,{content:e.content,streaming:e.streaming},e.id)),n.jsx("div",{ref:o})]})}h.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
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
    options: {
      value: string;
      label: string;
      description?: string;
    }[];
    defaultValue?: string;
  })`,elements:[{name:"unknown"},{name:"unknown"},{name:"unknown"}]}],raw:"AgentSidebarQuestion[]",required:!0}},{key:"submitLabel",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:'"pending" | "submitted"',elements:[{name:"literal",value:'"pending"'},{name:"literal",value:'"submitted"'}],required:!1}},{key:"layout",value:{name:"union",raw:'"list" | "tabs"',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"tabs"'}],required:!1}}]}}]}],raw:"AgentSidebarMessage[]"},description:""},onSubmitMultiQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  answers: Record<string, AgentSidebarMultiQuestionAnswer>,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const f=Object.freeze([{label:"Today",items:[{id:"h-1",title:"Update display name",updatedAt:"2026-05-04T09:42:00Z"},{id:"h-2",title:"Enable two-factor login",updatedAt:"2026-05-04T08:15:00Z"}]},{label:"Yesterday",items:[{id:"h-3",title:"Revoke old browser session",updatedAt:"2026-05-03T22:10:00Z"},{id:"h-4",title:"Set notification preferences",updatedAt:"2026-05-03T14:50:00Z"}]},{label:"Earlier",items:[{id:"h-5",title:"Rename my account slug",updatedAt:"2026-05-01T11:00:00Z"},{id:"h-6",title:"Add a passkey from MacBook",updatedAt:"2026-04-28T19:25:00Z"},{id:"h-7",title:"Connect Google account",updatedAt:"2026-04-22T07:05:00Z"}]}]),M=Object.freeze([{id:"m-1",role:"user",content:"I want to change my username to alice2 and turn on dark mode."},{id:"m-2",role:"agent",content:"Sure — I can help with that. Let me know which one you'd like to start with."}]),F={title:"Agent/Sidebar",decorators:[t=>n.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:n.jsx(t,{})})]},d={render:()=>{const[t,s]=l.useState(420);return n.jsx("div",{className:"bg-surface-container",children:n.jsx(p,{sidebarWidth:t,onToggleCollapse:()=>s(t<=350?600:350),onClose:()=>console.log("close"),history:f,onSelectHistoryItem:r=>console.log("history",r)})})}},c={render:()=>n.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:n.jsx(b,{onSend:t=>console.log("Send:",t),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},g={render:()=>{const[t,s]=l.useState(M),r=(o,a)=>{s(i=>i.map(e=>e.id===o?{...e,...a}:e))},m=o=>{const a=`u-${Date.now()}`,i=`a-${Date.now()}`;s(e=>[...e,{id:a,role:"user",content:o},{id:i,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{r(i,{content:"Got it — let me look into that.",streaming:!1})},1500)};return n.jsxs(n.Fragment,{children:[n.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:f,onSelectHistoryItem:o=>console.log("history",o)}),n.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[n.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:n.jsx(h,{messages:t})}),n.jsx(b,{onSend:m,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})]})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const _=["Header","Input","Playground"];export{d as Header,c as Input,g as Playground,_ as __namedExportsOrder,F as default};
