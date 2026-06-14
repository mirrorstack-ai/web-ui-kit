import{r as l,j as e}from"./iframe-BDxmNTw7.js";import{A as p,a as w}from"./AgentSidebarInput-D7fvMIUa.js";import{b as N}from"./AgentSidebarMessages-BQ-7PWgr.js";import{a as u,m as C,d as H}from"./mock-data-mmu1M8JR.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CuaJHHzh.js";import"./index-DTMRrZKp.js";import"./cn-IyxL_b2c.js";import"./IconButton-D3kwQy9r.js";import"./Progress-CuUu29Zi.js";import"./Icon-DCenYOUB.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-D2e0jOuW.js";import"./useClickOutside-VfUwZMR7.js";import"./useMenuKeyNav-CeTTRvoV.js";import"./Logo-BJnX6Idn.js";import"./AgentSidebarMultiQuestion-CYx4rRwQ.js";import"./Button-6dHYygy4.js";import"./FloatingLabelInput-DqUf2nKF.js";import"./SegmentedButton-BUTbXJtE.js";import"./Switch-BMeusiy2.js";const k="anthropic.claude-haiku-4-5-20251001-v1:0",Y={title:"UI/Agent/Sidebar",decorators:[t=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(t,{})})]},x={render:()=>{const[t,a]=l.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:t,onToggleCollapse:()=>a(t<=350?600:350),onClose:()=>console.log("close"),history:u,onSelectHistoryItem:n=>console.log("history",n)})})}},S={render:()=>{const[t,a]=l.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[n,r]=l.useState("conv-1"),i=l.useRef(3),o=s=>{const c={id:`conv-${i.current++}`,title:s};a(m=>[...m,c]),r(c.id)};return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:s=>{const c=u.flatMap(m=>m.items).find(m=>m.id===s);o(c?.title??"New chat")},tabs:t,activeTabId:n,onSelectTab:r,onCloseTab:s=>{const c=t.filter(m=>m.id!==s);c.length&&(a(c),n===s&&r(c[c.length-1].id))},onNewTab:()=>o("New chat")})})}},v={render:()=>{const[t,a]=l.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Deploy checklist"}]),[n,r]=l.useState("conv-2"),i=l.useRef(3);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},tabs:t,activeTabId:n,onSelectTab:r,onCloseTab:o=>{const s=t.filter(c=>c.id!==o);s.length&&(a(s),n===o&&r(s[s.length-1].id))},onNewTab:()=>{const o={id:`conv-${i.current++}`,title:"New chat"};a(s=>[...s,o]),r(o.id)}})})}},f={render:()=>{const[t,a]=l.useState(u);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:t,onSelectHistoryItem:n=>console.log("open",n),onRenameConversation:(n,r)=>{a(i=>i.map(o=>({...o,items:o.items.map(s=>s.id===n?{...s,title:r}:s)})))},onDeleteConversation:n=>{a(r=>r.map(i=>({...i,items:i.items.filter(o=>o.id!==n)})).filter(i=>i.items.length>0))}})})}},y={render:()=>{const[t,a]=l.useState(k);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(w,{onSend:n=>console.log("Send:",n),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:C,selectedModelId:t,onSelectModel:a})})}},I={render:()=>{const[t,a]=l.useState([{id:"q-1",text:"Summarize the last 3 deployments and show me any failures"},{id:"q-2",text:"Then list members who joined this week"},{id:"q-3",text:"And draft a release note from the changelog"}]),[n,r]=l.useState(k);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(w,{onSend:i=>console.log("Send:",i),models:C,selectedModelId:n,onSelectModel:r,queuedMessages:t,onCancelQueued:i=>a(o=>o.filter(s=>s.id!==i))})})}},T={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:t=>console.log("history",t)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(N,{messages:[],emptyState:e.jsx("p",{className:"px-1 text-center text-sm text-inverse-on-surface/70",children:"Hi, Sam, ask me anything about this app."})})}),e.jsx(w,{onSend:t=>console.log("Send:",t),models:C,selectedModelId:k})]})]})},A={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:t=>console.log("history",t)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(N,{messages:[],hideEmptyStateLogo:!0,emptyState:e.jsx("p",{className:"px-1 py-2 text-sm text-inverse-on-surface/70",children:"Hi, Sam, ask me anything about this app."})})}),e.jsx(w,{onSend:t=>console.log("Send:",t),models:C,selectedModelId:k})]})]})},M={render:()=>{const[t,a]=l.useState(H),[n,r]=l.useState([]),i=l.useRef(1),o=t.some(d=>d.role==="agent"&&"streaming"in d&&d.streaming),s=(d,g)=>{a(h=>h.map(b=>b.id===d?{...b,...g}:b))},c=d=>{const g=`u-${Date.now()}`,h=`a-${Date.now()}`;a(b=>[...b,{id:g,role:"user",content:d},{id:h,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{s(h,{content:"Got it — let me look into that.",streaming:!1})},2500)},m=d=>{if(o){r(g=>[...g,{id:`q-${i.current++}`,text:d}]);return}c(d)};return l.useEffect(()=>{if(o||n.length===0)return;const[d,...g]=n;r(g),c(d.text)},[o,n.length]),e.jsxs(e.Fragment,{children:[e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:d=>console.log("history",d)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(N,{messages:t})}),e.jsx(w,{onSend:m,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:C,selectedModelId:k,queuedMessages:n,onCancelQueued:d=>r(g=>g.filter(h=>h.id!==d))})]})]})}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...x.parameters?.docs?.source},description:{story:"Uncontrolled header: internal tab state, history open/select only.",...x.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:`Controlled tabs: titles from the consumer, history opens as a NEW tab,
 long titles ellipsize within the strip's allotment.`,...S.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source},description:{story:"History row actions: hover edit (inline rename) + hover delete.",...f.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...y.parameters?.docs?.source},description:{story:"Composer with the model selector — the realistic host configuration.",...y.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
  render: () => <>
      <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      <div className="flex-1 bg-on-background rounded-2xl flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4">
          <AgentSidebarMessages messages={[]} emptyState={<p className="px-1 text-center text-sm text-inverse-on-surface/70">
                Hi, Sam, ask me anything about this app.
              </p>} />
        </div>
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} />
      </div>
    </>
}`,...T.parameters?.docs?.source},description:{story:`Fresh conversation: with no messages, the list renders the MirrorStack
 logo above the host-supplied \`emptyState\` — a personalized opener — instead
 of a blank pane, so the empty sidebar reads as a branded hero (matching the
 greeting surface) rather than dead space. Every host (web-applications,
 web-account) passes its own greeting.`,...T.parameters?.docs?.description}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <AgentSidebarHeader sidebarWidth={420} onToggleCollapse={() => {}} onClose={() => {}} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      <div className="flex-1 bg-on-background rounded-2xl flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4">
          <AgentSidebarMessages messages={[]} hideEmptyStateLogo emptyState={<p className="px-1 py-2 text-sm text-inverse-on-surface/70">
                Hi, Sam, ask me anything about this app.
              </p>} />
        </div>
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} />
      </div>
    </>
}`,...A.parameters?.docs?.source},description:{story:"Same empty thread with `hideEmptyStateLogo` — for hosts that want only\n their opener with no brand mark above it.",...A.parameters?.docs?.description}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source},description:{story:`Full sidebar with live queue behavior: sending while the agent is still
 replying queues the message above the input; queued messages auto-send
 in order as each reply finishes.`,...M.parameters?.docs?.description}}};const Z=["Header","ControlledTabs","ActiveLastTab","History","Input","QueuedMessage","EmptyState","EmptyStateNoLogo","Playground"];export{v as ActiveLastTab,S as ControlledTabs,T as EmptyState,A as EmptyStateNoLogo,x as Header,f as History,y as Input,M as Playground,I as QueuedMessage,Z as __namedExportsOrder,Y as default};
