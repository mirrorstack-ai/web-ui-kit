import{r as l,j as n}from"./iframe-Bv63vEE2.js";import{A as p,a as b}from"./AgentSidebarInput-Pr1WXAJZ.js";import{c as v}from"./cn-IyxL_b2c.js";import{a as S,A}from"./AgentSidebarMessage-BVZ_fV-b.js";import{A as w}from"./AgentSidebarMultiQuestion-BV9QOIPE.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-BgLIadol.js";import"./Progress-C1Il17WP.js";import"./Icon-DKSENBmZ.js";import"./button-styles-DvQkePbc.js";import"./Notch-BqJz-r0_.js";import"./Button-YhnpgbOY.js";import"./Combobox-Cqj-lOYd.js";import"./FloatingLabelInput-CFvVuJLg.js";import"./SegmentedButton-BCIzovNk.js";const k=80;function x(t){let s=t?.parentElement??null;for(;s;){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll")return s;s=s.parentElement}return null}function f({messages:t,onSubmitMultiQuestion:s,autoScroll:r=!0,className:m}){const a=l.useRef(null),o=l.useRef(!0),i=l.useRef(!0);return l.useEffect(()=>{const e=x(a.current);if(!e)return;const u=()=>{const y=e.scrollHeight-e.scrollTop-e.clientHeight;i.current=y<=k};return e.addEventListener("scroll",u,{passive:!0}),()=>e.removeEventListener("scroll",u)},[]),l.useEffect(()=>{r&&(!o.current&&!i.current||(a.current?.scrollIntoView({behavior:o.current?"auto":"smooth",block:"end"}),o.current=!1))},[t,r]),n.jsxs("div",{className:v("flex flex-col gap-4",m),children:[t.map(e=>e.role==="user"?n.jsx(S,{content:e.content},e.id):"kind"in e?n.jsx(w,{title:e.title,description:e.description,questions:e.questions,submitLabel:e.submitLabel,status:e.status,layout:e.layout,onSubmit:u=>s?.(e.id,u)},e.id):n.jsx(A,{content:e.content,streaming:e.streaming},e.id)),n.jsx("div",{ref:a})]})}f.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
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
    placeholder?: string;
    defaultValue?: string;
  })
| (QuestionBase & {
    type: "textarea";
    placeholder?: string;
    defaultValue?: string;
  })
| (QuestionBase & {
    type: "select";
    options: { value: string; label: string }[];
    defaultValue?: string;
  })
| (QuestionBase & {
    type: "toggle";
    defaultValue?: boolean;
  })
| (QuestionBase & {
    type: "choice";
    options: {
      value: string;
      label: string;
      description?: string;
    }[];
    defaultValue?: string;
  })`,elements:[{name:"unknown"},{name:"unknown"},{name:"unknown"},{name:"unknown"},{name:"unknown"}]}],raw:"AgentSidebarQuestion[]",required:!0}},{key:"submitLabel",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:'"pending" | "submitted"',elements:[{name:"literal",value:'"pending"'},{name:"literal",value:'"submitted"'}],required:!1}},{key:"layout",value:{name:"union",raw:'"list" | "tabs"',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"tabs"'}],required:!1}}]}}]}],raw:"AgentSidebarMessage[]"},description:""},onSubmitMultiQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  answers: Record<string, AgentSidebarMultiQuestionAnswer>,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const h=Object.freeze([{label:"Today",items:[{id:"h-1",title:"Update display name",updatedAt:"2026-05-04T09:42:00Z"},{id:"h-2",title:"Enable two-factor login",updatedAt:"2026-05-04T08:15:00Z"}]},{label:"Yesterday",items:[{id:"h-3",title:"Revoke old browser session",updatedAt:"2026-05-03T22:10:00Z"},{id:"h-4",title:"Set notification preferences",updatedAt:"2026-05-03T14:50:00Z"}]},{label:"Earlier",items:[{id:"h-5",title:"Rename my account slug",updatedAt:"2026-05-01T11:00:00Z"},{id:"h-6",title:"Add a passkey from MacBook",updatedAt:"2026-04-28T19:25:00Z"},{id:"h-7",title:"Connect Google account",updatedAt:"2026-04-22T07:05:00Z"}]}]),M=Object.freeze([{id:"m-1",role:"user",content:"I want to change my username to alice2 and turn on dark mode."},{id:"m-2",role:"agent",content:"Sure — I can help with that. Let me know which one you'd like to start with."}]),F={title:"Agent/Sidebar",decorators:[t=>n.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:n.jsx(t,{})})]},d={render:()=>{const[t,s]=l.useState(420);return n.jsx("div",{className:"bg-surface-container",children:n.jsx(p,{sidebarWidth:t,onToggleCollapse:()=>s(t<=350?600:350),onClose:()=>console.log("close"),history:h,onSelectHistoryItem:r=>console.log("history",r)})})}},c={render:()=>n.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:n.jsx(b,{onSend:t=>console.log("Send:",t),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},g={render:()=>{const[t,s]=l.useState(M),r=(a,o)=>{s(i=>i.map(e=>e.id===a?{...e,...o}:e))},m=a=>{const o=`u-${Date.now()}`,i=`a-${Date.now()}`;s(e=>[...e,{id:o,role:"user",content:a},{id:i,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{r(i,{content:"Got it — let me look into that.",streaming:!1})},1500)};return n.jsxs(n.Fragment,{children:[n.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:h,onSelectHistoryItem:a=>console.log("history",a)}),n.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[n.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:n.jsx(f,{messages:t})}),n.jsx(b,{onSend:m,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})]})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
