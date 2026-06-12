import{r as c,j as t}from"./iframe-aoWeItOi.js";import{A as I,a as M}from"./AgentSidebarInput-BKafdpuc.js";import{a as w}from"./AgentSidebarMessages-DW5kl4ci.js";import{c as y,m as A,d as q}from"./mock-data-CFhVqnUu.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D2ME9qrL.js";import"./index-B-F7YNgb.js";import"./cn-IyxL_b2c.js";import"./IconButton-C2R1gUOe.js";import"./Progress-Dam23hCN.js";import"./Icon-CNuDeFgo.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-Ciakmi7L.js";import"./useClickOutside-BA3_x2jJ.js";import"./useMenuKeyNav-Dtrov2Lb.js";import"./Logo-BNSRZsZG.js";import"./AgentSidebarMultiQuestion-Buca__-O.js";import"./Button-Oc9EHrPz.js";import"./FloatingLabelInput-DaAVuA1T.js";import"./SegmentedButton-t6dz9BWm.js";import"./Switch-CIqmfRFO.js";const T="anthropic.claude-haiku-4-5-20251001-v1:0",K={title:"UI/Agent/Sidebar",decorators:[n=>t.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:t.jsx(n,{})})]},h={render:()=>{const[n,o]=c.useState(420);return t.jsx("div",{className:"bg-surface-container",children:t.jsx(I,{sidebarWidth:n,onToggleCollapse:()=>o(n<=350?600:350),onClose:()=>console.log("close"),history:y,onSelectHistoryItem:e=>console.log("history",e)})})}},b={render:()=>{const[n,o]=c.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[e,i]=c.useState("conv-1"),r=c.useRef(3),d=a=>{const l={id:`conv-${r.current++}`,title:a};o(m=>[...m,l]),i(l.id)};return t.jsx("div",{className:"bg-surface-container",children:t.jsx(I,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:y,onSelectHistoryItem:a=>{const l=y.flatMap(m=>m.items).find(m=>m.id===a);d(l?.title??"New chat")},tabs:n,activeTabId:e,onSelectTab:i,onCloseTab:a=>{const l=n.filter(m=>m.id!==a);l.length&&(o(l),e===a&&i(l[l.length-1].id))},onNewTab:()=>d("New chat")})})}},S={render:()=>{const[n,o]=c.useState(y);return t.jsx("div",{className:"bg-surface-container",children:t.jsx(I,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:n,onSelectHistoryItem:e=>console.log("open",e),onRenameConversation:(e,i)=>{o(r=>r.map(d=>({...d,items:d.items.map(a=>a.id===e?{...a,title:i}:a)})))},onDeleteConversation:e=>{o(i=>i.map(r=>({...r,items:r.items.filter(d=>d.id!==e)})).filter(r=>r.items.length>0))}})})}},f={render:()=>{const[n,o]=c.useState(T);return t.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:t.jsx(M,{onSend:e=>console.log("Send:",e),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:A,selectedModelId:n,onSelectModel:o})})}},x={render:()=>{const[n,o]=c.useState([{id:"q-1",text:"Summarize the last 3 deployments and show me any failures"},{id:"q-2",text:"Then list members who joined this week"},{id:"q-3",text:"And draft a release note from the changelog"}]),[e,i]=c.useState(T);return t.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:t.jsx(M,{onSend:r=>console.log("Send:",r),models:A,selectedModelId:e,onSelectModel:i,queuedMessages:n,onCancelQueued:r=>o(d=>d.filter(a=>a.id!==r))})})}},v={render:()=>{const[n,o]=c.useState(q),[e,i]=c.useState([]),r=c.useRef(1),d=n.some(s=>s.role==="agent"&&"streaming"in s&&s.streaming),a=(s,u)=>{o(g=>g.map(p=>p.id===s?{...p,...u}:p))},l=s=>{const u=`u-${Date.now()}`,g=`a-${Date.now()}`;o(p=>[...p,{id:u,role:"user",content:s},{id:g,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{a(g,{content:"Got it — let me look into that.",streaming:!1})},2500)},m=s=>{if(d){i(u=>[...u,{id:`q-${r.current++}`,text:s}]);return}l(s)};return c.useEffect(()=>{if(d||e.length===0)return;const[s,...u]=e;i(u),l(s.text)},[d,e.length]),t.jsxs(t.Fragment,{children:[t.jsx(I,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:y,onSelectHistoryItem:s=>console.log("history",s)}),t.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[t.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:t.jsx(w,{messages:n})}),t.jsx(M,{onSend:m,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:A,selectedModelId:T,queuedMessages:e,onCancelQueued:s=>i(u=>u.filter(g=>g.id!==s))})]})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...h.parameters?.docs?.source},description:{story:"Uncontrolled header: internal tab state, history open/select only.",...h.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [tabs, setTabs] = useState<ChatTab[]>([{
      id: "conv-1",
      title: "New chat"
    }, {
      id: "conv-2",
      title: "Update display name"
    }]);
    const [activeTabId, setActiveTabId] = useState("conv-1");
    const nextIdRef = useRef(3);
    const openTab = (title: string) => {
      const tab = {
        id: \`conv-\${nextIdRef.current++}\`,
        title
      };
      setTabs(prev => [...prev, tab]);
      setActiveTabId(tab.id);
    };
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => {
        const item = mockAgentHistory.flatMap(g => g.items).find(i => i.id === id);
        openTab(item?.title ?? "New chat");
      }} tabs={tabs} activeTabId={activeTabId} onSelectTab={setActiveTabId} onCloseTab={id => {
        const next = tabs.filter(t => t.id !== id);
        if (!next.length) return;
        setTabs(next);
        if (activeTabId === id) setActiveTabId(next[next.length - 1].id);
      }} onNewTab={() => openTab("New chat")} />
      </div>;
  }
}`,...b.parameters?.docs?.source},description:{story:`Controlled tabs: titles from the consumer, history opens as a NEW tab,
 long titles ellipsize within the strip's allotment.`,...b.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [history, setHistory] = useState<AgentSidebarHistoryGroup[]>(mockAgentHistory);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={history} onSelectHistoryItem={id => console.log("open", id)} onRenameConversation={(id, title) => {
        setHistory(prev => prev.map(g => ({
          ...g,
          items: g.items.map(item => item.id === id ? {
            ...item,
            title
          } : item)
        })));
      }} onDeleteConversation={id => {
        setHistory(prev => prev.map(g => ({
          ...g,
          items: g.items.filter(item => item.id !== id)
        })).filter(g => g.items.length > 0));
      }} />
      </div>;
  }
}`,...S.parameters?.docs?.source},description:{story:"History row actions: hover edit (inline rename) + hover delete.",...S.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...f.parameters?.docs?.source},description:{story:"Composer with the model selector — the realistic host configuration.",...f.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [queued, setQueued] = useState<AgentQueuedMessage[]>([{
      id: "q-1",
      text: "Summarize the last 3 deployments and show me any failures"
    }, {
      id: "q-2",
      text: "Then list members who joined this week"
    }, {
      id: "q-3",
      text: "And draft a release note from the changelog"
    }]);
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} queuedMessages={queued} onCancelQueued={id => setQueued(q => q.filter(m => m.id !== id))} />
      </div>;
  }
}`,...x.parameters?.docs?.source},description:{story:`Queued messages pinned above the textarea while a reply streams —
 several stack in send order, each individually cancellable.`,...x.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [messages, setMessages] = useState<AgentSidebarMessage[]>(mockAgentMessages);
    const [queued, setQueued] = useState<AgentQueuedMessage[]>([]);
    const nextQueueId = useRef(1);
    const isStreaming = messages.some(m => m.role === "agent" && "streaming" in m && m.streaming);
    const patchMessage = (id: string, patch: Record<string, unknown>) => {
      setMessages(prev => prev.map(m => m.id === id ? {
        ...m,
        ...patch
      } as AgentSidebarMessage : m));
    };
    const reallySend = (content: string) => {
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
      }, 2500);
    };

    // Send while a reply is streaming → queue instead (the consumer contract
    // the kit's queuedMessages slot is designed for).
    const handleSend = (content: string) => {
      if (isStreaming) {
        setQueued(q => [...q, {
          id: \`q-\${nextQueueId.current++}\`,
          text: content
        }]);
        return;
      }
      reallySend(content);
    };

    // Reply finished → flush the next queued message.
    useEffect(() => {
      if (isStreaming || queued.length === 0) return;
      const [next, ...rest] = queued;
      setQueued(rest);
      reallySend(next.text);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStreaming, queued.length]);
    return <>
        <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
        <div className="flex-1 bg-on-background rounded-2xl flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4">
            <AgentSidebarMessages messages={messages} />
          </div>
          <AgentSidebarInput onSend={handleSend} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} queuedMessages={queued} onCancelQueued={id => setQueued(q => q.filter(m => m.id !== id))} />
        </div>
      </>;
  }
}`,...v.parameters?.docs?.source},description:{story:`Full sidebar with live queue behavior: sending while the agent is still
 replying queues the message above the input; queued messages auto-send
 in order as each reply finishes.`,...v.parameters?.docs?.description}}};const V=["Header","ControlledTabs","History","Input","QueuedMessage","Playground"];export{b as ControlledTabs,h as Header,S as History,f as Input,v as Playground,x as QueuedMessage,V as __namedExportsOrder,K as default};
