import{r as l,j as e}from"./iframe-CbpXoVl5.js";import{A as h,a as M}from"./AgentSidebarInput-BUnWjnPn.js";import{a as k}from"./AgentSidebarMessages-D7t67-6u.js";import{a as p,m as w,d as N}from"./mock-data-BqISqoQF.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BUY_o6yi.js";import"./index-s4gGCjNh.js";import"./cn-IyxL_b2c.js";import"./IconButton-SmxQBW4b.js";import"./Progress-Q5BOY9zi.js";import"./Icon-B15frJih.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-C0ADXM-L.js";import"./useClickOutside-D7V5js-7.js";import"./useMenuKeyNav-BGPvMeC-.js";import"./Logo-CXhpjGFq.js";import"./AgentSidebarMultiQuestion-9FIcxRag.js";import"./Button-ccyXPgKp.js";import"./FloatingLabelInput-BhJF54gV.js";import"./SegmentedButton-BpMceCm9.js";import"./Switch-C40tBCuQ.js";const C="anthropic.claude-haiku-4-5-20251001-v1:0",X={title:"UI/Agent/Sidebar",decorators:[t=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(t,{})})]},x={render:()=>{const[t,a]=l.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(h,{sidebarWidth:t,onToggleCollapse:()=>a(t<=350?600:350),onClose:()=>console.log("close"),history:p,onSelectHistoryItem:n=>console.log("history",n)})})}},v={render:()=>{const[t,a]=l.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[n,r]=l.useState("conv-1"),i=l.useRef(3),o=s=>{const c={id:`conv-${i.current++}`,title:s};a(m=>[...m,c]),r(c.id)};return e.jsx("div",{className:"bg-surface-container",children:e.jsx(h,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:p,onSelectHistoryItem:s=>{const c=p.flatMap(m=>m.items).find(m=>m.id===s);o(c?.title??"New chat")},tabs:t,activeTabId:n,onSelectTab:r,onCloseTab:s=>{const c=t.filter(m=>m.id!==s);c.length&&(a(c),n===s&&r(c[c.length-1].id))},onNewTab:()=>o("New chat")})})}},S={render:()=>{const[t,a]=l.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Deploy checklist"}]),[n,r]=l.useState("conv-2"),i=l.useRef(3);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(h,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},tabs:t,activeTabId:n,onSelectTab:r,onCloseTab:o=>{const s=t.filter(c=>c.id!==o);s.length&&(a(s),n===o&&r(s[s.length-1].id))},onNewTab:()=>{const o={id:`conv-${i.current++}`,title:"New chat"};a(s=>[...s,o]),r(o.id)}})})}},f={render:()=>{const[t,a]=l.useState(p);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(h,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:t,onSelectHistoryItem:n=>console.log("open",n),onRenameConversation:(n,r)=>{a(i=>i.map(o=>({...o,items:o.items.map(s=>s.id===n?{...s,title:r}:s)})))},onDeleteConversation:n=>{a(r=>r.map(i=>({...i,items:i.items.filter(o=>o.id!==n)})).filter(i=>i.items.length>0))}})})}},y={render:()=>{const[t,a]=l.useState(C);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(M,{onSend:n=>console.log("Send:",n),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:w,selectedModelId:t,onSelectModel:a})})}},I={render:()=>{const[t,a]=l.useState([{id:"q-1",text:"Summarize the last 3 deployments and show me any failures"},{id:"q-2",text:"Then list members who joined this week"},{id:"q-3",text:"And draft a release note from the changelog"}]),[n,r]=l.useState(C);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(M,{onSend:i=>console.log("Send:",i),models:w,selectedModelId:n,onSelectModel:r,queuedMessages:t,onCancelQueued:i=>a(o=>o.filter(s=>s.id!==i))})})}},T={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(h,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:p,onSelectHistoryItem:t=>console.log("history",t)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(k,{messages:[],emptyState:e.jsx("p",{className:"px-1 py-2 text-sm text-inverse-on-surface/70",children:"Hi, Sam, ask me anything about this app."})})}),e.jsx(M,{onSend:t=>console.log("Send:",t),models:w,selectedModelId:C})]})]})},A={render:()=>{const[t,a]=l.useState(N),[n,r]=l.useState([]),i=l.useRef(1),o=t.some(d=>d.role==="agent"&&"streaming"in d&&d.streaming),s=(d,u)=>{a(g=>g.map(b=>b.id===d?{...b,...u}:b))},c=d=>{const u=`u-${Date.now()}`,g=`a-${Date.now()}`;a(b=>[...b,{id:u,role:"user",content:d},{id:g,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{s(g,{content:"Got it — let me look into that.",streaming:!1})},2500)},m=d=>{if(o){r(u=>[...u,{id:`q-${i.current++}`,text:d}]);return}c(d)};return l.useEffect(()=>{if(o||n.length===0)return;const[d,...u]=n;r(u),c(d.text)},[o,n.length]),e.jsxs(e.Fragment,{children:[e.jsx(h,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:p,onSelectHistoryItem:d=>console.log("history",d)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(k,{messages:t})}),e.jsx(M,{onSend:m,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:w,selectedModelId:C,queuedMessages:n,onCancelQueued:d=>r(u=>u.filter(g=>g.id!==d))})]})]})}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...x.parameters?.docs?.source},description:{story:"Uncontrolled header: internal tab state, history open/select only.",...x.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source},description:{story:`Controlled tabs: titles from the consumer, history opens as a NEW tab,
 long titles ellipsize within the strip's allotment.`,...v.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:`Regression: ACTIVE tab is the LAST tab in the strip, right next to the
 header action icons. Tabs are flex-1, so the active tab's right edge sits
 flush at the strip's content edge and its notch overlay flares TAB_IR
 (12px) past it — the strip's pr-3 must absorb that curl so the dark
 on-background fill never paints under the + / collapse / close icons.`,...S.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
          <AgentSidebarMessages messages={[]} emptyState={<p className="px-1 py-2 text-sm text-inverse-on-surface/70">
                Hi, Sam, ask me anything about this app.
              </p>} />
        </div>
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} />
      </div>
    </>
}`,...T.parameters?.docs?.source},description:{story:`Fresh conversation: with no messages, the list renders the host-supplied
 \`emptyState\` — a personalized opener — instead of a blank pane. Every host
 (web-applications, web-account) passes its own greeting, so the empty
 sidebar reads as a warm prompt rather than dead space.`,...T.parameters?.docs?.description}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source},description:{story:`Full sidebar with live queue behavior: sending while the agent is still
 replying queues the message above the input; queued messages auto-send
 in order as each reply finishes.`,...A.parameters?.docs?.description}}};const Y=["Header","ControlledTabs","ActiveLastTab","History","Input","QueuedMessage","EmptyState","Playground"];export{S as ActiveLastTab,v as ControlledTabs,T as EmptyState,x as Header,f as History,y as Input,A as Playground,I as QueuedMessage,Y as __namedExportsOrder,X as default};
