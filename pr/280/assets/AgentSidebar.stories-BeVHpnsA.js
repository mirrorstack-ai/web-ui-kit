import{r as l,j as e}from"./iframe-DEnoIg4z.js";import{A as v,a as I}from"./AgentSidebarInput-CF20sQHP.js";import{a as f}from"./AgentSidebarMessages-BpOocnkO.js";import{c as b,m as y,d as M}from"./mock-data-BzkRIeCe.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DYBBkx_f.js";import"./index-C8sMSaYn.js";import"./cn-IyxL_b2c.js";import"./IconButton-DZi72ChX.js";import"./Progress-KOJu0nyr.js";import"./Icon-Cuzwbzpy.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-Dldtsnvv.js";import"./useClickOutside-CgI1STqm.js";import"./useMenuKeyNav-BaFOAdlz.js";import"./Logo-Cy_uqajp.js";import"./AgentSidebarMultiQuestion-Bls4DQH8.js";import"./Button-DxtO4ukz.js";import"./FloatingLabelInput-DxJZ4zOA.js";import"./SegmentedButton-CXT5EY7s.js";import"./Switch-0TWNBxAi.js";const x="anthropic.claude-haiku-4-5-20251001-v1:0",G={title:"UI/Agent/Sidebar",decorators:[o=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(o,{})})]},m={render:()=>{const[o,a]=l.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(v,{sidebarWidth:o,onToggleCollapse:()=>a(o<=350?600:350),onClose:()=>console.log("close"),history:b,onSelectHistoryItem:t=>console.log("history",t)})})}},g={render:()=>{const[o,a]=l.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[t,i]=l.useState("conv-1"),n=l.useRef(3),d=s=>{const r={id:`conv-${n.current++}`,title:s};a(c=>[...c,r]),i(r.id)};return e.jsx("div",{className:"bg-surface-container",children:e.jsx(v,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:b,onSelectHistoryItem:s=>{const r=b.flatMap(c=>c.items).find(c=>c.id===s);d(r?.title??"New chat")},tabs:o,activeTabId:t,onSelectTab:i,onCloseTab:s=>{const r=o.filter(c=>c.id!==s);r.length&&(a(r),t===s&&i(r[r.length-1].id))},onNewTab:()=>d("New chat")})})}},u={render:()=>{const[o,a]=l.useState(b);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(v,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:o,onSelectHistoryItem:t=>console.log("open",t),onRenameConversation:(t,i)=>{a(n=>n.map(d=>({...d,items:d.items.map(s=>s.id===t?{...s,title:i}:s)})))},onDeleteConversation:t=>{a(i=>i.map(n=>({...n,items:n.items.filter(d=>d.id!==t)})).filter(n=>n.items.length>0))}})})}},p={render:()=>{const[o,a]=l.useState(x);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(I,{onSend:t=>console.log("Send:",t),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:y,selectedModelId:o,onSelectModel:a})})}},h={render:()=>{const[o,a]=l.useState("Summarize the last 3 deployments and show me any failures"),[t,i]=l.useState(x);return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(I,{onSend:n=>console.log("Send:",n),models:y,selectedModelId:t,onSelectModel:i,queuedMessage:o,onCancelQueued:()=>a(void 0)})})}},S={render:()=>{const[o,a]=l.useState(M),t=(n,d)=>{a(s=>s.map(r=>r.id===n?{...r,...d}:r))},i=n=>{const d=`u-${Date.now()}`,s=`a-${Date.now()}`;a(r=>[...r,{id:d,role:"user",content:n},{id:s,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{t(s,{content:"Got it — let me look into that.",streaming:!1})},1500)};return e.jsxs(e.Fragment,{children:[e.jsx(v,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:b,onSelectHistoryItem:n=>console.log("history",n)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(f,{messages:o})}),e.jsx(I,{onSend:i,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:y,selectedModelId:x})]})]})}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...m.parameters?.docs?.source},description:{story:"Uncontrolled header: internal tab state, history open/select only.",...m.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source},description:{story:`Controlled tabs: titles from the consumer, history opens as a NEW tab,
 long titles ellipsize within the strip's allotment.`,...g.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source},description:{story:"History row actions: hover edit (inline rename) + hover delete.",...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...p.parameters?.docs?.source},description:{story:"Composer with the model selector — the realistic host configuration.",...p.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [queued, setQueued] = useState<string | undefined>("Summarize the last 3 deployments and show me any failures");
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} queuedMessage={queued} onCancelQueued={() => setQueued(undefined)} />
      </div>;
  }
}`,...h.parameters?.docs?.source},description:{story:"Queued-message chip pinned above the textarea while a reply streams.",...h.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
          <AgentSidebarInput onSend={handleSend} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} models={mockAgentModels} selectedModelId={DEFAULT_MODEL_ID} />
        </div>
      </>;
  }
}`,...S.parameters?.docs?.source}}};const P=["Header","ControlledTabs","History","Input","QueuedMessage","Playground"];export{g as ControlledTabs,m as Header,u as History,p as Input,S as Playground,h as QueuedMessage,P as __namedExportsOrder,G as default};
