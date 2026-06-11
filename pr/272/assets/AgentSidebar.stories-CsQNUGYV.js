import{r as a,j as e}from"./iframe-BBWUFhXO.js";import{A as v,b as y,a as f,m as S,c as w}from"./mock-data-LO7yfk3r.js";import{c as M}from"./cn-IyxL_b2c.js";import{I}from"./Icon-CW6_aWZO.js";import{a as q,A as j}from"./AgentSidebarMessage-Clwdsf-J.js";import{A as N}from"./AgentSidebarMultiQuestion-D2ivosp_.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DK-7i2DU.js";import"./index-CdA_KZ1x.js";import"./IconButton-BtGAMeIt.js";import"./Progress-W1odlBZH.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-CTcKMzpD.js";import"./useClickOutside-O5dI9YF0.js";import"./useModelSelection-D_fpBoOy.js";import"./useMenuKeyNav-B7X9NbEv.js";import"./Button-CJFewWca.js";import"./FloatingLabelInput-C8vt7DDp.js";import"./SegmentedButton-RlQPZTnj.js";import"./Switch-CjTP_dDn.js";const H=80;function Q(t){let s=t?.parentElement??null;for(;s;){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll")return s;s=s.parentElement}return null}function x({messages:t,onSubmitMultiQuestion:s,autoScroll:r=!0,className:b}){const o=a.useRef(null),l=a.useRef(!0),i=a.useRef(!0),[d,A]=a.useState(!0);a.useEffect(()=>{const n=Q(o.current);if(!n)return;const u=()=>{const h=n.scrollHeight-n.scrollTop-n.clientHeight<=H;h!==i.current&&(i.current=h,A(h))};return u(),n.addEventListener("scroll",u,{passive:!0}),()=>n.removeEventListener("scroll",u)},[]),a.useEffect(()=>{r&&(!l.current&&!i.current||(o.current?.scrollIntoView({behavior:l.current?"auto":"smooth",block:"end"}),l.current=!1))},[t,r]);const k=()=>{o.current?.scrollIntoView({behavior:"smooth",block:"end"})};return e.jsxs("div",{className:M("flex flex-col gap-4",b),children:[t.map(n=>n.role==="user"?e.jsx(q,{content:n.content},n.id):"kind"in n?e.jsx(N,{title:n.title,description:n.description,questions:n.questions,submitLabel:n.submitLabel,status:n.status,layout:n.layout,onSubmit:u=>s?.(n.id,u)},n.id):e.jsx(j,{content:n.content,streaming:n.streaming},n.id)),e.jsx("div",{ref:o}),!d&&e.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:e.jsxs("button",{type:"button",onClick:k,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[e.jsx(I,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}x.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
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
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean | string[]",elements:[{name:"string"},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Z={title:"UI/Agent/Sidebar",decorators:[t=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(t,{})})]},c={render:()=>{const[t,s]=a.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(v,{sidebarWidth:t,onToggleCollapse:()=>s(t<=350?600:350),onClose:()=>console.log("close"),history:y,onSelectHistoryItem:r=>console.log("history",r)})})}},g={render:()=>e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(f,{onSend:t=>console.log("Send:",t),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},m={render:()=>{const[t,s]=a.useState("anthropic.claude-haiku-4-5-20251001-v1:0");return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(f,{onSend:r=>console.log("Send:",r),models:S,selectedModelId:t,onSelectModel:s})})}},p={render:()=>{const[t,s]=a.useState(w),r=(o,l)=>{s(i=>i.map(d=>d.id===o?{...d,...l}:d))},b=o=>{const l=`u-${Date.now()}`,i=`a-${Date.now()}`;s(d=>[...d,{id:l,role:"user",content:o},{id:i,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{r(i,{content:"Got it — let me look into that.",streaming:!1})},1500)};return e.jsxs(e.Fragment,{children:[e.jsx(v,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:y,onSelectHistoryItem:o=>console.log("history",o)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(x,{messages:t})}),e.jsx(f,{onSend:b,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:S,selectedModelId:"anthropic.claude-haiku-4-5-20251001-v1:0"})]})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    const [modelId, setModelId] = useState("anthropic.claude-haiku-4-5-20251001-v1:0");
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const ee=["Header","Input","InputWithModelSelector","Playground"];export{c as Header,g as Input,m as InputWithModelSelector,p as Playground,ee as __namedExportsOrder,Z as default};
