import{r as g,j as e}from"./iframe-DVvTN3Cl.js";import{A as p,b as h,a as u,m as S,c as b}from"./mock-data-D9N_Vr_P.js";import{a as M}from"./AgentSidebarMessages-GT20mmL3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-NNRPfBsU.js";import"./index-shzS5DVU.js";import"./cn-IyxL_b2c.js";import"./IconButton-cr3v7kIQ.js";import"./Progress-0TyE1yj8.js";import"./Icon-DBk5_Wz_.js";import"./button-styles-CZHSjrxJ.js";import"./Notch-BoUp-DGO.js";import"./useClickOutside-G745IfhB.js";import"./useModelSelection-DzNkvkmt.js";import"./useMenuKeyNav-djuXIfDX.js";import"./Logo-BiYwtq0N.js";import"./AgentSidebarMultiQuestion--4FwNMaa.js";import"./Button-DYQj-qiO.js";import"./FloatingLabelInput-Dmjmp2zC.js";import"./SegmentedButton-D2Zw5ye_.js";import"./Switch-BWVzaza-.js";const O={title:"UI/Agent/Sidebar",decorators:[o=>e.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(o,{})})]},d={render:()=>{const[o,n]=g.useState(420);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(p,{sidebarWidth:o,onToggleCollapse:()=>n(o<=350?600:350),onClose:()=>console.log("close"),history:h,onSelectHistoryItem:t=>console.log("history",t)})})}},l={render:()=>e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(u,{onSend:o=>console.log("Send:",o),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},c={render:()=>{const[o,n]=g.useState("anthropic.claude-haiku-4-5-20251001-v1:0");return e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(u,{onSend:t=>console.log("Send:",t),models:S,selectedModelId:o,onSelectModel:n})})}},i={render:()=>{const[o,n]=g.useState(b),t=(s,m)=>{n(a=>a.map(r=>r.id===s?{...r,...m}:r))},x=s=>{const m=`u-${Date.now()}`,a=`a-${Date.now()}`;n(r=>[...r,{id:m,role:"user",content:s},{id:a,role:"agent",content:"",streaming:!0}]),setTimeout(()=>{t(a,{content:"Got it — let me look into that.",streaming:!1})},1500)};return e.jsxs(e.Fragment,{children:[e.jsx(p,{sidebarWidth:420,onToggleCollapse:()=>{},onClose:()=>{},history:h,onSelectHistoryItem:s=>console.log("history",s)}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col min-h-0",children:[e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsx(M,{messages:o})}),e.jsx(u,{onSend:x,onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic"),models:S,selectedModelId:"anthropic.claude-haiku-4-5-20251001-v1:0"})]})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(420);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} history={mockAgentHistory} onSelectHistoryItem={id => console.log("history", id)} />
      </div>;
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [modelId, setModelId] = useState("anthropic.claude-haiku-4-5-20251001-v1:0");
    return <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} models={mockAgentModels} selectedModelId={modelId} onSelectModel={setModelId} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const U=["Header","Input","InputWithModelSelector","Playground"];export{d as Header,l as Input,c as InputWithModelSelector,i as Playground,U as __namedExportsOrder,O as default};
