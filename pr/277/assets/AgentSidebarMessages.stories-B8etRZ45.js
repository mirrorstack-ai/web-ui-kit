import{j as e}from"./iframe-DGbHXgXA.js";import{A as p,a as i,b as u}from"./AgentSidebarMessages-CDfRFFPh.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-CEhHViOo.js";import"./Logo-DUI0LATo.js";import"./IconButton-kRHES2ek.js";import"./Progress-WpJ9UQBu.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-BC2-VT4C.js";import"./Button-Bey56_Cm.js";import"./FloatingLabelInput-aR40eNQT.js";import"./SegmentedButton-By0OeOrB.js";import"./Switch-BQ6u889E.js";const T={title:"UI/Agent/Messages",decorators:[l=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(l,{})})]},o={render:()=>e.jsx(u,{content:"Update my username to alice2 and turn on dark mode."})},t={render:()=>e.jsx(p,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(p,{content:"",streaming:!0}),e.jsx(p,{content:"Updating your profile now",streaming:!0})]})},g=()=>{},c={onMessageCopy:g,onMessageFeedback:g,onMessageRerun:g},m=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},{id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook."}],r={render:()=>e.jsx(i,{messages:m,...c})},s={render:()=>e.jsx(i,{messages:[m[0],{id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook.",feedback:"up"}],...c})},a={render:()=>e.jsx(i,{messages:[m[0],{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],...c})},n={render:()=>e.jsx(i,{messages:m,...c,showLogo:!0})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...d.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} />
}`,...r.parameters?.docs?.source},description:{story:"Copy / thumbs / rerun appear under finished agent messages only.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    id: "m-2",
    role: "agent",
    content: "You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook.",
    feedback: "up"
  }]} {...actionCallbacks} />
}`,...s.parameters?.docs?.source},description:{story:"A previously-recorded rating renders the thumb filled at full ink.",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    id: "m-2",
    role: "agent",
    content: "Pulling your audit log",
    streaming: true
  }]} {...actionCallbacks} />
}`,...a.parameters?.docs?.source},description:{story:"The action row stays hidden while the agent is still streaming.",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} showLogo />
}`,...n.parameters?.docs?.source},description:{story:"Subdued brand mark below the list when the last message is finished.",...n.parameters?.docs?.description}}};const F=["User","Agent","AgentStreaming","FinishedWithActions","FeedbackSelected","StreamingHidesActions","WithLogo"];export{t as Agent,d as AgentStreaming,s as FeedbackSelected,r as FinishedWithActions,a as StreamingHidesActions,o as User,n as WithLogo,F as __namedExportsOrder,T as default};
