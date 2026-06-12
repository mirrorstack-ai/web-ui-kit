import{j as e}from"./iframe-DCKxHCay.js";import{A as p,a as d,b as h}from"./AgentSidebarMessages-BcSOEHTv.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-C4Klkdu8.js";import"./Logo-hfj3obs1.js";import"./IconButton-DTnAWbxa.js";import"./Progress-BBFRFGgU.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-305k2dOg.js";import"./Button-C5IAe_81.js";import"./FloatingLabelInput-BD37QGDl.js";import"./SegmentedButton-BSNoIjUv.js";import"./Switch-Dfyj6TBO.js";const F={title:"UI/Agent/Messages",decorators:[u=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(u,{})})]},t={render:()=>e.jsx(h,{content:"Update my username to alice2 and turn on dark mode."})},o={render:()=>e.jsx(p,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(p,{content:"",streaming:!0}),e.jsx(p,{content:"Updating your profile now",streaming:!0})]})},g=()=>{},c={onCopyMessage:g,onRateMessage:g,onRerunMessage:g},l={id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook."},m=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},l],r={render:()=>e.jsx(d,{messages:m,...c})},s={render:()=>e.jsx(d,{messages:[m[0],{...l,feedback:"up"}],...c})},a={render:()=>e.jsx(d,{messages:[m[0],{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],...c})},n={render:()=>e.jsx(d,{messages:m,...c,showLogo:!0})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} />
}`,...r.parameters?.docs?.source},description:{story:"Copy / thumbs / rerun appear under finished agent messages only.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    ...finishedAgentMsg,
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
}`,...n.parameters?.docs?.source},description:{story:"Brand mark in the sidebar accent below the list when the last message is finished.",...n.parameters?.docs?.description}}};const L=["User","Agent","AgentStreaming","FinishedWithActions","FeedbackSelected","StreamingHidesActions","WithLogo"];export{o as Agent,i as AgentStreaming,s as FeedbackSelected,r as FinishedWithActions,a as StreamingHidesActions,t as User,n as WithLogo,L as __namedExportsOrder,F as default};
