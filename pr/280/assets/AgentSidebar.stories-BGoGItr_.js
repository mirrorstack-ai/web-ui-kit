import{r as d,j as e}from"./iframe-C0BxL705.js";import{A as M,a as m}from"./AgentSidebarInput-DvS3eScz.js";import{a as f}from"./AgentSidebarMessages-Dmga1J1t.js";import{c as u,m as y,d as A}from"./mock-data-CzZqGKCV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DPf3e2T5.js";import"./index-nV5vy3dV.js";import"./cn-IyxL_b2c.js";import"./IconButton-BPU16r-P.js";import"./Progress-CSrELwRs.js";import"./Icon-BI85pGYX.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-yOlo0XBM.js";import"./useClickOutside-C-PtQHMV.js";import"./useMenuKeyNav-XkfjFVAY.js";import"./Logo-WJQHABUg.js";import"./AgentSidebarMultiQuestion-C56rht9X.js";import"./Button-BHd14CoG.js";import"./FloatingLabelInput-DJ8JPdFJ.js";import"./SegmentedButton-C8mgOumj.js";import"./Switch-Cxb5Yhgo.js";const B={title:"UI/Agent/Sidebar",decorators:[n=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(n,{})})]},g={render:()=>{const[n,o]=d.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(M,{sidebarWidth:n,onToggleCollapse:()=>o(n<=350?600:350),onClose:()=>console.log("close"),history:u,onSelectHistoryItem:t=>console.log("history",t)})})}},p={render:()=>{const[n,o]=d.useState([{id:"conv-1",title:"New chat"},{id:"conv-2",title:"Update display name"}]),[t,i]=d.useState("conv-1"),r=d.useRef(3),c=s=>{const a={id:`conv-${r.current++}`,title:s};o(l=>[...l,a]),i(a.id)};return e.jsx("div",{className:"bg-surface-container",children:e.jsx(M,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:s=>{const a=u.flatMap(l=>l.items).find(l=>l.id===s);c(a?.title??"New chat")},tabs:n,activeTabId:t,onSelectTab:i,onCloseTab:s=>{const a=n.filter(l=>l.id!==s);a.length&&(o(a),t===s&&i(a[a.length-1].id))},onNewTab:()=>c("New chat")})})}},b={render:()=>{const[n,o]=d.useState(u);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(M,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:n,onSelectHistoryItem:t=>console.log("open",t),onRenameConversation:(t,i)=>{o(r=>r.map(c=>({...c,items:c.items.map(s=>s.id===t?{...s,title:i}:s)})))}})})}},h={render:()=>e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(m,{onSend:n=>console.log("Send:",n),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},S={render:()=>{const[n,o]=d.useState("anthropic.claude-haiku-4-5-20251001-v1:0");return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(m,{onSend:t=>console.log("Send:",t),models:y,selectedModelId:n,onSelectModel:o})})}},v={render:()=>{const[n,o]=d.useState("Summarize the last 3 deployments and show me any failures");return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(m,{onSend:t=>console.log("Send:",t),queuedMessage:n,onCancelQueued:()=>o(void 0)})})}},x={render:()=>{const[n,o]=d.useState("Summarize the last 3 deployments"),[t,i]=d.useState("anthropic.claude-haiku-4-5-20251001-v1:0");return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(m,{onSend:r=>console.log("Send:",r),models:y,selectedModelId:t,onSelectModel:i,queuedMessage:n,onCancelQueued:()=>o(void 0)})})}},I={render:()=>{const[n,o]=d.useState(A),t=(r,c)=>{o(s=>s.map(a=>a.id===r?{...a,...c}:a))},i=r=>{const c=`u-${Date.now()}`,s=`a-${Date.now()}`;o(a=>[...a,{id:c,role:"user",content:r},{id:s,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{t(s,{content:"Got it — let me look into that.",streaming:!1})},1500)};return e.jsxs(e.Fragment,{children:[e.jsx(M,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:u,onSelectHistoryItem:r=>console.log("history",r)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(f,{messages:n})}),e.jsx(m,{onSend:i,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:y,selectedModelId:"anthropic.claude-haiku-4-5-20251001-v1:0"})]})]})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
        // Consumer opens a history entry as a NEW tab.
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
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
      }} />
      </div>;
  }
}`,...b.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState("anthropic.claude-haiku-4-5-20251001-v1:0");
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [queued, setQueued] = useState<string | undefined>("Summarize the last 3 deployments and show me any failures");
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} queuedMessage={queued} onCancelQueued={() => setQueued(undefined)} />
      </div>;
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [queued, setQueued] = useState<string | undefined>("Summarize the last 3 deployments");
    const [modelId, setModelId] = useState("anthropic.claude-haiku-4-5-20251001-v1:0");
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} queuedMessage={queued} onCancelQueued={() => setQueued(undefined)} />
      </div>;
  }
}`,...x.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};const J=["Header","ControlledTabs","HistoryRename","Input","InputWithModelSelector","QueuedMessage","QueuedMessageWithModelSelector","Playground"];export{p as ControlledTabs,g as Header,b as HistoryRename,h as Input,S as InputWithModelSelector,I as Playground,v as QueuedMessage,x as QueuedMessageWithModelSelector,J as __namedExportsOrder,B as default};
