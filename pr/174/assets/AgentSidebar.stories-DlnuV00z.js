import{r as i,j as t}from"./iframe-ClhOCEEs.js";import{A as m,a as p}from"./AgentSidebarInput-DAJ972D7.js";import{c as y}from"./cn-IyxL_b2c.js";import{a as v,A as x}from"./AgentSidebarMessage-CWdm_Wp6.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-B0iyDD3q.js";import"./Progress-CjP_fEh2.js";import"./Icon-nsgoDp-o.js";import"./button-styles-DvQkePbc.js";import"./Notch-D-qPdjqf.js";const S=80;function A(n){let o=n?.parentElement??null;for(;o;){const r=getComputedStyle(o).overflowY;if(r==="auto"||r==="scroll")return o;o=o.parentElement}return null}function h({messages:n,autoScroll:o=!0,className:r}){const d=i.useRef(null),s=i.useRef(!0),l=i.useRef(!0);return i.useEffect(()=>{const e=A(d.current);if(!e)return;const a=()=>{const b=e.scrollHeight-e.scrollTop-e.clientHeight;l.current=b<=S};return e.addEventListener("scroll",a,{passive:!0}),()=>e.removeEventListener("scroll",a)},[]),i.useEffect(()=>{o&&(!s.current&&!l.current||(d.current?.scrollIntoView({behavior:s.current?"auto":"smooth",block:"end"}),s.current=!1))},[n,o]),t.jsxs("div",{className:y("flex flex-col gap-4",r),children:[n.map(e=>e.role==="user"?t.jsx(v,{content:e.content},e.id):t.jsx(x,{content:e.content,streaming:e.streaming},e.id)),t.jsx("div",{ref:d})]})}h.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
    id: string;
    role: "user";
    content: string;
  }
| {
    id: string;
    role: "agent";
    content: string;
    streaming?: boolean;
  }`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  role: "user";
  content: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"user"',required:!0}},{key:"content",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  id: string;
  role: "agent";
  content: string;
  streaming?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"agent"',required:!0}},{key:"content",value:{name:"string",required:!0}},{key:"streaming",value:{name:"boolean",required:!1}}]}}]}],raw:"AgentSidebarMessage[]"},description:""},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const f=Object.freeze([{label:"Today",items:[{id:"h-1",title:"Update display name",updatedAt:"2026-05-04T09:42:00Z"},{id:"h-2",title:"Enable two-factor login",updatedAt:"2026-05-04T08:15:00Z"}]},{label:"Yesterday",items:[{id:"h-3",title:"Revoke old browser session",updatedAt:"2026-05-03T22:10:00Z"},{id:"h-4",title:"Set notification preferences",updatedAt:"2026-05-03T14:50:00Z"}]},{label:"Earlier",items:[{id:"h-5",title:"Rename my account slug",updatedAt:"2026-05-01T11:00:00Z"},{id:"h-6",title:"Add a passkey from MacBook",updatedAt:"2026-04-28T19:25:00Z"},{id:"h-7",title:"Connect Google account",updatedAt:"2026-04-22T07:05:00Z"}]}]),w=Object.freeze([{id:"m-1",role:"user",content:"I want to change my username to alice2 and turn on dark mode."},{id:"m-2",role:"agent",content:"Sure — I can help with that. Let me know which one you'd like to start with."}]),C={title:"Agent/Sidebar",decorators:[n=>t.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:t.jsx(n,{})})]},c={render:()=>{const[n,o]=i.useState(420);return t.jsx("div",{className:"bg-surface-container",children:t.jsx(m,{sidebarWidth:n,onToggleCollapse:()=>o(n<=350?600:350),onClose:()=>console.log("close"),history:f,onSelectHistoryItem:r=>console.log("history",r)})})}},u={render:()=>t.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:t.jsx(p,{onSend:n=>console.log("Send:",n),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},g={render:()=>{const[n,o]=i.useState(w),r=(s,l)=>{o(e=>e.map(a=>a.id===s?{...a,...l}:a))},d=s=>{const l=`u-${Date.now()}`,e=`a-${Date.now()}`;o(a=>[...a,{id:l,role:"user",content:s},{id:e,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{r(e,{content:"Got it — let me look into that.",streaming:!1})},1500)};return t.jsxs(t.Fragment,{children:[t.jsx(m,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:f,onSelectHistoryItem:s=>console.log("history",s)}),t.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[t.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:t.jsx(h,{messages:n})}),t.jsx(p,{onSend:d,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})]})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const W=["Header","Input","Playground"];export{c as Header,u as Input,g as Playground,W as __namedExportsOrder,C as default};
