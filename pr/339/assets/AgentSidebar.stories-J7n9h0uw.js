import{r as d,j as e}from"./iframe-DtE6IMzt.js";import{A as p,a as M}from"./AgentSidebarInput-D4zhlkWe.js";import{b as N}from"./AgentSidebarMessages-B-m5r0Hi.js";import{a as u,m as H,d as j}from"./mock-data-DWK_ET3a.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BnsFy2uN.js";import"./index-D3j6dsbX.js";import"./cn-IyxL_b2c.js";import"./IconButton-BiHkOVY6.js";import"./Progress-HNAaMMpQ.js";import"./Icon-VVWDyoWh.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-DIsn4PJF.js";import"./Dialog-5-fXktvW.js";import"./Button-CcoyMkSF.js";import"./useClickOutside-CmxaCFEI.js";import"./useMenuKeyNav-CXG_Rvqq.js";import"./Logo-CHJzR4ay.js";import"./AgentSidebarMultiQuestion-Dr749onW.js";import"./FloatingLabelInput-CJwJTAkk.js";import"./SegmentedButton-BSAz3yrC.js";import"./Switch-Cwl6GBrm.js";const C="anthropic.claude-haiku-4-5-20251001-v1:0";function k({header:t,children:o}){const n=d.useRef(null),[r,i]=d.useState(0);return d.useEffect(()=>{const a=n.current;if(!a||typeof ResizeObserver>"u")return;const s=new ResizeObserver(c=>{i(c[0].contentRect.height)});return s.observe(a),()=>s.disconnect()},[]),e.jsxs(e.Fragment,{children:[t(r>0?r:void 0),e.jsx("div",{ref:n,className:"flex-1 flex flex-col min-h-0",children:o})]})}const ee={title:"UI/Agent/Sidebar",decorators:[t=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(t,{})})]},S={render:()=>{const[t,o]=d.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:t,onToggleCollapse:()=>o(t<=350?600:350),onClose:()=>console.log("close"),history:u,onSelectHistoryItem:n=>console.log("history",n)})})}},y={render:()=>{const[t,o]=d.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[n,r]=d.useState("conv-1"),i=d.useRef(3),a=s=>{const c={id:`conv-${i.current++}`,title:s};o(g=>[...g,c]),r(c.id)};return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:s=>{const c=u.flatMap(g=>g.items).find(g=>g.id===s);a(c?.title??"New chat")},tabs:t,activeTabId:n,onSelectTab:r,onCloseTab:s=>{const c=t.filter(g=>g.id!==s);c.length&&(o(c),n===s&&r(c[c.length-1].id))},onNewTab:()=>a("New chat")})})}},v={render:()=>{const[t,o]=d.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Deploy checklist"}]),[n,r]=d.useState("conv-2"),i=d.useRef(3);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},tabs:t,activeTabId:n,onSelectTab:r,onCloseTab:a=>{const s=t.filter(c=>c.id!==a);s.length&&(o(s),n===a&&r(s[s.length-1].id))},onNewTab:()=>{const a={id:`conv-${i.current++}`,title:"New chat"};o(s=>[...s,a]),r(a.id)}})})}},f={render:()=>{const[t,o]=d.useState(u);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:t,onSelectHistoryItem:n=>console.log("open",n),onRenameConversation:(n,r)=>{o(i=>i.map(a=>({...a,items:a.items.map(s=>s.id===n?{...s,title:r}:s)})))},onDeleteConversation:n=>{o(r=>r.map(i=>({...i,items:i.items.filter(a=>a.id!==n)})).filter(i=>i.items.length>0))}})})}},x={render:()=>{const[t,o]=d.useState(C);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(M,{onSend:n=>console.log("Send:",n),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:H,selectedModelId:t,onSelectModel:o})})}},I={render:()=>{const[t,o]=d.useState([{id:"q-1",text:"Summarize the last 3 deployments and show me any failures"},{id:"q-2",text:"Then list members who joined this week"},{id:"q-3",text:"And draft a release note from the changelog"}]),[n,r]=d.useState(C);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(M,{onSend:i=>console.log("Send:",i),models:H,selectedModelId:n,onSelectModel:r,queuedMessages:t,onCancelQueued:i=>o(a=>a.filter(s=>s.id!==i))})})}},T={render:()=>e.jsxs(k,{header:t=>e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:o=>console.log("history",o),windowBodyHeight:t}),children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(N,{messages:[],emptyState:e.jsx("p",{className:"px-1 text-center text-sm text-inverse-on-surface/70",children:"Hi, Sam, ask me anything about this app."})})}),e.jsx(M,{onSend:t=>console.log("Send:",t),models:H,selectedModelId:C})]})},w={render:()=>e.jsxs(k,{header:t=>e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:o=>console.log("history",o),windowBodyHeight:t}),children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(N,{messages:[],hideEmptyStateLogo:!0,emptyState:e.jsx("p",{className:"px-1 py-2 text-sm text-inverse-on-surface/70",children:"Hi, Sam, ask me anything about this app."})})}),e.jsx(M,{onSend:t=>console.log("Send:",t),models:H,selectedModelId:C})]})},A={render:()=>{const[t,o]=d.useState(j),[n,r]=d.useState([]),i=d.useRef(1),a=t.some(l=>l.role==="agent"&&"streaming"in l&&l.streaming),s=(l,m)=>{o(h=>h.map(b=>b.id===l?{...b,...m}:b))},c=l=>{const m=`u-${Date.now()}`,h=`a-${Date.now()}`;o(b=>[...b,{id:m,role:"user",content:l},{id:h,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{s(h,{content:"Got it — let me look into that.",streaming:!1})},2500)},g=l=>{if(a){r(m=>[...m,{id:`q-${i.current++}`,text:l}]);return}c(l)};return d.useEffect(()=>{if(a||n.length===0)return;const[l,...m]=n;r(m),c(l.text)},[a,n.length]),e.jsxs(k,{header:l=>e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:m=>console.log("history",m),windowBodyHeight:l}),children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(N,{messages:t})}),e.jsx(M,{onSend:g,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:H,selectedModelId:C,queuedMessages:n,onCancelQueued:l=>r(m=>m.filter(h=>h.id!==l))})]})}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...S.parameters?.docs?.source},description:{story:"Uncontrolled header: internal tab state, history open/select only.",...S.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source},description:{story:`Controlled tabs: titles from the consumer, history opens as a NEW tab,
 long titles ellipsize within the strip's allotment.`,...y.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [tabs, setTabs] = useState<ChatTab[]>([{
      id: "conv-1",
      title: "New chat"
    }, {
      id: "conv-2",
      title: "Deploy checklist"
    }]);
    const [activeTabId, setActiveTabId] = useState("conv-2");
    const nextIdRef = useRef(3);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} tabs={tabs} activeTabId={activeTabId} onSelectTab={setActiveTabId} onCloseTab={id => {
        const next = tabs.filter(t => t.id !== id);
        if (!next.length) return;
        setTabs(next);
        if (activeTabId === id) setActiveTabId(next[next.length - 1].id);
      }} onNewTab={() => {
        const tab = {
          id: \`conv-\${nextIdRef.current++}\`,
          title: "New chat"
        };
        setTabs(prev => [...prev, tab]);
        setActiveTabId(tab.id);
      }} />
      </div>;
  }
}`,...v.parameters?.docs?.source},description:{story:`Regression: ACTIVE tab is the LAST tab in the strip, right next to the
 header action icons. Tabs are flex-1, so the active tab's right edge sits
 flush at the strip's content edge and its notch overlay flares TAB_IR
 (12px) past it — the strip's pr-3 must absorb that curl so the dark
 on-background fill never paints under the + / collapse / close icons.`,...v.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source},description:{story:`History row actions: hover edit (inline rename) + hover delete. Delete
 opens a destructive confirmation dialog; onDeleteConversation fires only
 on confirm.`,...f.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...x.parameters?.docs?.source},description:{story:"Composer with the model selector — the realistic host configuration.",...x.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source},description:{story:`Queued messages pinned above the textarea while a reply streams —
 several stack in send order, each individually cancellable.`,...I.parameters?.docs?.description}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <WindowFrame header={windowBodyHeight => <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} windowBodyHeight={windowBodyHeight} />}>
      <div className="flex-1 overflow-y-auto p-4">
        <AgentSidebarMessages messages={[]} emptyState={<p className="px-1 text-center text-sm text-inverse-on-surface/70">
              Hi, Sam, ask me anything about this app.
            </p>} />
      </div>
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} />
    </WindowFrame>
}`,...T.parameters?.docs?.source},description:{story:`Fresh conversation: with no messages, the list renders the MirrorStack
 logo above the host-supplied \`emptyState\` — a personalized opener — instead
 of a blank pane, so the empty sidebar reads as a branded hero (matching the
 greeting surface) rather than dead space. Every host (web-applications,
 web-account) passes its own greeting.`,...T.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <WindowFrame header={windowBodyHeight => <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} windowBodyHeight={windowBodyHeight} />}>
      <div className="flex-1 overflow-y-auto p-4">
        <AgentSidebarMessages messages={[]} hideEmptyStateLogo emptyState={<p className="px-1 py-2 text-sm text-inverse-on-surface/70">
              Hi, Sam, ask me anything about this app.
            </p>} />
      </div>
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} />
    </WindowFrame>
}`,...w.parameters?.docs?.source},description:{story:"Same empty thread with `hideEmptyStateLogo` — for hosts that want only\n their opener with no brand mark above it.",...w.parameters?.docs?.description}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
    return <WindowFrame header={windowBodyHeight => <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} windowBodyHeight={windowBodyHeight} />}>
        <div className="flex-1 overflow-y-auto p-4">
          <AgentSidebarMessages messages={messages} />
        </div>
        <AgentSidebarInput onSend={handleSend} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} queuedMessages={queued} onCancelQueued={id => setQueued(q => q.filter(m => m.id !== id))} />
      </WindowFrame>;
  }
}`,...A.parameters?.docs?.source},description:{story:`Full sidebar with live queue behavior: sending while the agent is still
 replying queues the message above the input; queued messages auto-send
 in order as each reply finishes.`,...A.parameters?.docs?.description}}};const te=["Header","ControlledTabs","ActiveLastTab","History","Input","QueuedMessage","EmptyState","EmptyStateNoLogo","Playground"];export{v as ActiveLastTab,y as ControlledTabs,T as EmptyState,w as EmptyStateNoLogo,S as Header,f as History,x as Input,A as Playground,I as QueuedMessage,te as __namedExportsOrder,ee as default};
