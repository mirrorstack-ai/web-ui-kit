import{j as e}from"./iframe-cfJL5y36.js";import{A as s,a as o}from"./AgentSidebarMessage-BvyR17kf.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const i={title:"UI/Agent/Messages",decorators:[t=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(t,{})})]},r={render:()=>e.jsx(o,{content:"Update my username to alice2 and turn on dark mode."})},a={render:()=>e.jsx(s,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(s,{content:"",streaming:!0}),e.jsx(s,{content:"Updating your profile now",streaming:!0})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...n.parameters?.docs?.source}}};const p=["User","Agent","AgentStreaming"];export{a as Agent,n as AgentStreaming,r as User,p as __namedExportsOrder,i as default};
