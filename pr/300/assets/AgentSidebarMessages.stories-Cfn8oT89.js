import{j as e}from"./iframe-BsKFuHLG.js";import{a as c,b as d,c as k}from"./AgentSidebarMessages-LWPBcqgf.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DIuQrOow.js";import"./Logo-DL4rLCQ5.js";import"./IconButton-BZGBM32W.js";import"./Progress-Ykf4TOZL.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-DVRVTvBz.js";import"./Button-DRpRbmX0.js";import"./FloatingLabelInput-DKfLEets.js";import"./SegmentedButton-DyW17LTs.js";import"./Switch-BzZ6Vcn4.js";const F={title:"UI/Agent/Messages",decorators:[b=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(b,{})})]},g={render:()=>e.jsx(k,{content:"Update my username to alice2 and turn on dark mode."})},p={render:()=>e.jsx(c,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},y=`## Account changes

This week you made **three** changes:

1. Renamed your username to \`alice2\`
2. Enabled *dark mode*
3. Added a passkey

Run this to verify from the CLI:

\`\`\`bash
mirrorstack account audit --since 7d
\`\`\`

See the [audit log docs](https://docs.mirrorstack.ai/audit) for details.`,r={render:()=>e.jsx(c,{content:y})},s={render:()=>e.jsx(c,{content:`## Checking availability

Here's what I found so far:

- Username **alice2** is available
- Dark mode is \`off\` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)

\`\`\`bash
mirrorstack account au`,streaming:!0})},l={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(c,{content:"",streaming:!0}),e.jsx(c,{content:"Updating your profile now",streaming:!0})]})},h=()=>{},m={onCopyMessage:h,onRateMessage:h,onRerunMessage:h},f={id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook."},u=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},f],a={render:()=>e.jsx(d,{messages:u,...m})},n={render:()=>e.jsx(d,{messages:[u[0],{...f,feedback:"up"}],...m})},t={render:()=>e.jsx(d,{messages:[u[0],{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],...m})},o={render:()=>e.jsx(d,{messages:u,...m,showLogo:!0})},A=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],i={render:()=>e.jsx(d,{messages:A,...m,showLogo:!0})};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...p.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content={markdownReply} />
}`,...r.parameters?.docs?.source},description:{story:"Agent replies render Markdown: headings, lists, inline + fenced code, links.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'{\n  render: () => <AgentSidebarAgentMessage content={"## Checking availability\\n\\nHere\'s what I found so far:\\n\\n- Username **alice2** is available\\n- Dark mode is `off` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)\\n\\n```bash\\nmirrorstack account au"} streaming />\n}',...s.parameters?.docs?.source},description:{story:`Mid-stream markdown with every construct a real reply carries — heading,
 bold, list, inline code, link — and an unterminated code fence that
 renders calmly as a code block until the closing fence arrives.`,...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source},description:{story:"Brand mark in the sidebar accent below the list when the last message is finished.",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={respondingThread} {...actionCallbacks} showLogo />
}`,...i.parameters?.docs?.source},description:{story:'While the last agent message is still streaming, the brand logo renders and\n SPINS below the list as the "responding" indicator (the loading prop is wired\n from the last agent message\'s `streaming` flag). It settles to the static\n mark once the reply finishes — see `WithLogo`.',...i.parameters?.docs?.description}}};const H=["User","Agent","AgentMarkdown","AgentMarkdownStreaming","AgentStreaming","FinishedWithActions","FeedbackSelected","StreamingHidesActions","WithLogo","Responding"];export{p as Agent,r as AgentMarkdown,s as AgentMarkdownStreaming,l as AgentStreaming,n as FeedbackSelected,a as FinishedWithActions,i as Responding,t as StreamingHidesActions,g as User,o as WithLogo,H as __namedExportsOrder,F as default};
