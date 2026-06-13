import{j as e}from"./iframe-Brs60jez.js";import{a as i,b as g,c as b}from"./AgentSidebarMessages-CaigQD3q.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DsiPvA29.js";import"./Logo-BOg-xYA6.js";import"./IconButton-Cm7BGk7Q.js";import"./Progress-pfnZHNxY.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-DPqsHgnB.js";import"./Button-DpbBsoEv.js";import"./FloatingLabelInput-BySRaqFd.js";import"./SegmentedButton-CN2C1fI2.js";import"./Switch-DPWNRaaq.js";const F={title:"UI/Agent/Messages",decorators:[f=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(f,{})})]},c={render:()=>e.jsx(b,{content:"Update my username to alice2 and turn on dark mode."})},d={render:()=>e.jsx(i,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},k=`## Account changes

This week you made **three** changes:

1. Renamed your username to \`alice2\`
2. Enabled *dark mode*
3. Added a passkey

Run this to verify from the CLI:

\`\`\`bash
mirrorstack account audit --since 7d
\`\`\`

See the [audit log docs](https://docs.mirrorstack.ai/audit) for details.`,r={render:()=>e.jsx(i,{content:k})},s={render:()=>e.jsx(i,{content:`## Checking availability

Here's what I found so far:

- Username **alice2** is available
- Dark mode is \`off\` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)

\`\`\`bash
mirrorstack account au`,streaming:!0})},m={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(i,{content:"",streaming:!0}),e.jsx(i,{content:"Updating your profile now",streaming:!0})]})},u=()=>{},p={onCopyMessage:u,onRateMessage:u,onRerunMessage:u},h={id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook."},l=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},h],a={render:()=>e.jsx(g,{messages:l,...p})},n={render:()=>e.jsx(g,{messages:[l[0],{...h,feedback:"up"}],...p})},t={render:()=>e.jsx(g,{messages:[l[0],{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],...p})},o={render:()=>e.jsx(g,{messages:l,...p,showLogo:!0})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...d.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content={markdownReply} />
}`,...r.parameters?.docs?.source},description:{story:"Agent replies render Markdown: headings, lists, inline + fenced code, links.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'{\n  render: () => <AgentSidebarAgentMessage content={"## Checking availability\\n\\nHere\'s what I found so far:\\n\\n- Username **alice2** is available\\n- Dark mode is `off` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)\\n\\n```bash\\nmirrorstack account au"} streaming />\n}',...s.parameters?.docs?.source},description:{story:`Mid-stream markdown with every construct a real reply carries — heading,
 bold, list, inline code, link — and an unterminated code fence that
 renders calmly as a code block until the closing fence arrives.`,...s.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...m.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} />
}`,...a.parameters?.docs?.source},description:{story:"Copy / thumbs / rerun appear under finished agent messages only.",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    ...finishedAgentMsg,
    feedback: "up"
  }]} {...actionCallbacks} />
}`,...n.parameters?.docs?.source},description:{story:"A previously-recorded rating renders the thumb filled at full ink.",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    id: "m-2",
    role: "agent",
    content: "Pulling your audit log",
    streaming: true
  }]} {...actionCallbacks} />
}`,...t.parameters?.docs?.source},description:{story:"The action row stays hidden while the agent is still streaming.",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} showLogo />
}`,...o.parameters?.docs?.source},description:{story:"Brand mark in the sidebar accent below the list when the last message is finished.",...o.parameters?.docs?.description}}};const H=["User","Agent","AgentMarkdown","AgentMarkdownStreaming","AgentStreaming","FinishedWithActions","FeedbackSelected","StreamingHidesActions","WithLogo"];export{d as Agent,r as AgentMarkdown,s as AgentMarkdownStreaming,m as AgentStreaming,n as FeedbackSelected,a as FinishedWithActions,t as StreamingHidesActions,c as User,o as WithLogo,H as __namedExportsOrder,F as default};
