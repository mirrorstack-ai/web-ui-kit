import{r as c,j as n}from"./iframe-fk8G0B64.js";import{A as y,a as A}from"./AgentSidebarInput-C0DI5Lft.js";import{a as C}from"./AgentSidebarMessages-CyfUilV6.js";import{a as T,m as M,d as q}from"./mock-data-B1ib_N1-.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CuISZyHg.js";import"./index-2QcOihRL.js";import"./cn-IyxL_b2c.js";import"./IconButton-Bb8v2hid.js";import"./Progress-XWPxt5-h.js";import"./Icon-CGX30okX.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-DueDQwhi.js";import"./useClickOutside-CIy4arKt.js";import"./useMenuKeyNav-CIaN_qp0.js";import"./Logo-C5t10nQR.js";import"./AgentSidebarMultiQuestion-DGGKVywx.js";import"./Button-CfayJdaE.js";import"./FloatingLabelInput-eESfXSiB.js";import"./SegmentedButton-CO57THCn.js";import"./Switch-CKY7QGTW.js";const w="anthropic.claude-haiku-4-5-20251001-v1:0",K={title:"UI/Agent/Sidebar",decorators:[s=>n.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:n.jsx(s,{})})]},h={render:()=>{const[s,a]=c.useState(420);return n.jsx("div",{className:"bg-surface-container",children:n.jsx(y,{sidebarWidth:s,onToggleCollapse:()=>a(s<=350?600:350),onClose:()=>console.log("close"),history:T,onSelectHistoryItem:e=>console.log("history",e)})})}},b={render:()=>{const[s,a]=c.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[e,r]=c.useState("conv-1"),i=c.useRef(3),o=t=>{const l={id:`conv-${i.current++}`,title:t};a(u=>[...u,l]),r(l.id)};return n.jsx("div",{className:"bg-surface-container",children:n.jsx(y,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:T,onSelectHistoryItem:t=>{const l=T.flatMap(u=>u.items).find(u=>u.id===t);o(l?.title??"New chat")},tabs:s,activeTabId:e,onSelectTab:r,onCloseTab:t=>{const l=s.filter(u=>u.id!==t);l.length&&(a(l),e===t&&r(l[l.length-1].id))},onNewTab:()=>o("New chat")})})}},v={render:()=>{const[s,a]=c.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Deploy checklist"}]),[e,r]=c.useState("conv-2"),i=c.useRef(3);return n.jsx("div",{className:"bg-surface-container",children:n.jsx(y,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},tabs:s,activeTabId:e,onSelectTab:r,onCloseTab:o=>{const t=s.filter(l=>l.id!==o);t.length&&(a(t),e===o&&r(t[t.length-1].id))},onNewTab:()=>{const o={id:`conv-${i.current++}`,title:"New chat"};a(t=>[...t,o]),r(o.id)}})})}},f={render:()=>{const[s,a]=c.useState(T);return n.jsx("div",{className:"bg-surface-container",children:n.jsx(y,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:s,onSelectHistoryItem:e=>console.log("open",e),onRenameConversation:(e,r)=>{a(i=>i.map(o=>({...o,items:o.items.map(t=>t.id===e?{...t,title:r}:t)})))},onDeleteConversation:e=>{a(r=>r.map(i=>({...i,items:i.items.filter(o=>o.id!==e)})).filter(i=>i.items.length>0))}})})}},S={render:()=>{const[s,a]=c.useState(w);return n.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:n.jsx(A,{onSend:e=>console.log("Send:",e),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:M,selectedModelId:s,onSelectModel:a})})}},x={render:()=>{const[s,a]=c.useState([{id:"q-1",text:"Summarize the last 3 deployments and show me any failures"},{id:"q-2",text:"Then list members who joined this week"},{id:"q-3",text:"And draft a release note from the changelog"}]),[e,r]=c.useState(w);return n.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:n.jsx(A,{onSend:i=>console.log("Send:",i),models:M,selectedModelId:e,onSelectModel:r,queuedMessages:s,onCancelQueued:i=>a(o=>o.filter(t=>t.id!==i))})})}},I={render:()=>{const[s,a]=c.useState(q),[e,r]=c.useState([]),i=c.useRef(1),o=s.some(d=>d.role==="agent"&&"streaming"in d&&d.streaming),t=(d,m)=>{a(g=>g.map(p=>p.id===d?{...p,...m}:p))},l=d=>{const m=`u-${Date.now()}`,g=`a-${Date.now()}`;a(p=>[...p,{id:m,role:"user",content:d},{id:g,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{t(g,{content:"Got it — let me look into that.",streaming:!1})},2500)},u=d=>{if(o){r(m=>[...m,{id:`q-${i.current++}`,text:d}]);return}l(d)};return c.useEffect(()=>{if(o||e.length===0)return;const[d,...m]=e;r(m),l(d.text)},[o,e.length]),n.jsxs(n.Fragment,{children:[n.jsx(y,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:T,onSelectHistoryItem:d=>console.log("history",d)}),n.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[n.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:n.jsx(C,{messages:s})}),n.jsx(A,{onSend:u,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:M,selectedModelId:w,queuedMessages:e,onCancelQueued:d=>r(m=>m.filter(g=>g.id!==d))})]})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
 long titles ellipsize within the strip's allotment.`,...b.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source},description:{story:"History row actions: hover edit (inline rename) + hover delete.",...f.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...S.parameters?.docs?.source},description:{story:"Composer with the model selector — the realistic host configuration.",...S.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
 several stack in send order, each individually cancellable.`,...x.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source},description:{story:`Full sidebar with live queue behavior: sending while the agent is still
 replying queues the message above the input; queued messages auto-send
 in order as each reply finishes.`,...I.parameters?.docs?.description}}};const X=["Header","ControlledTabs","ActiveLastTab","History","Input","QueuedMessage","Playground"];export{v as ActiveLastTab,b as ControlledTabs,h as Header,f as History,S as Input,I as Playground,x as QueuedMessage,X as __namedExportsOrder,K as default};
