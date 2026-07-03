import{j as e}from"./iframe-B5qEi8yh.js";import{a as t,b as m,c as S}from"./AgentSidebarMessages-ep1PUVcg.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-CR2DlkM7.js";import"./Logo-CGUqddVD.js";import"./IconButton-CTjj2die.js";import"./Progress-5u5gRbfn.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-CbuxCUgD.js";import"./Button-CnvsDRJ1.js";import"./FloatingLabelInput-CMSqgm3W.js";import"./SegmentedButton-BCGyCDS_.js";import"./Switch-C6h_wSPR.js";const W={title:"UI/Agent/Messages",decorators:[k=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(k,{})})]},p={render:()=>e.jsx(S,{content:"Update my username to alice2 and turn on dark mode."})},u={render:()=>e.jsx(t,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},A=`## Account changes

This week you made **three** changes:

1. Renamed your username to \`alice2\`
2. Enabled *dark mode*
3. Added a passkey

Run this to verify from the CLI:

\`\`\`bash
mirrorstack account audit --since 7d
\`\`\`

See the [audit log docs](https://docs.mirrorstack.ai/audit) for details.`,s={render:()=>e.jsx(t,{content:A})},r={render:()=>e.jsx(t,{content:`## Checking availability

Here's what I found so far:

- Username **alice2** is available
- Dark mode is \`off\` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)

\`\`\`bash
mirrorstack account au`,streaming:!0})},h={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(t,{content:"",streaming:!0}),e.jsx(t,{content:"Updating your profile now",streaming:!0})]})},n={render:()=>e.jsx(t,{content:`Let me check your recent posts and tidy up the drafts.

Done — published the latest draft and archived the two stale ones.`,segments:[{type:"text",text:"Let me check your recent posts and tidy up the drafts."},{type:"tool",id:"t-1",tool:{moduleSlug:"cms",tool:"list_posts",status:"done",durationMs:214,args:{limit:5},result:[{id:"p1",title:"Hello world"}]}},{type:"tool",id:"t-2",tool:{moduleSlug:"cms",tool:"publish_post",status:"done",durationMs:96}},{type:"text",text:"Done — published the latest draft and archived the two stale ones."}]})},a={render:()=>e.jsx(t,{streaming:!0,content:"Checking your account settings.",segments:[{type:"text",text:"Checking your account settings."},{type:"tool",id:"t-1",tool:{moduleSlug:"account",tool:"get_preferences",status:"started"}}]})},f=()=>{},g={onCopyMessage:f,onRateMessage:f,onRerunMessage:f},b={id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook."},y=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},b],o={render:()=>e.jsx(m,{messages:y,...g})},i={render:()=>e.jsx(m,{messages:[y[0],{...b,feedback:"up"}],...g})},d={render:()=>e.jsx(m,{messages:[y[0],{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],...g})},c={render:()=>e.jsx(m,{messages:y,...g,showLogo:!0})},x=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],l={render:()=>e.jsx(m,{messages:x,...g,showLogo:!0})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...u.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content={markdownReply} />
}`,...s.parameters?.docs?.source},description:{story:"Agent replies render Markdown: headings, lists, inline + fenced code, links.",...s.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:'{\n  render: () => <AgentSidebarAgentMessage content={"## Checking availability\\n\\nHere\'s what I found so far:\\n\\n- Username **alice2** is available\\n- Dark mode is `off` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)\\n\\n```bash\\nmirrorstack account au"} streaming />\n}',...r.parameters?.docs?.source},description:{story:`Mid-stream markdown with every construct a real reply carries — heading,
 bold, list, inline code, link — and an unterminated code fence that
 renders calmly as a code block until the closing fence arrives.`,...r.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...h.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content={"Let me check your recent posts and tidy up the drafts.\\n\\nDone — published the latest draft and archived the two stale ones."} segments={[{
    type: "text",
    text: "Let me check your recent posts and tidy up the drafts."
  }, {
    type: "tool",
    id: "t-1",
    tool: {
      moduleSlug: "cms",
      tool: "list_posts",
      status: "done",
      durationMs: 214,
      args: {
        limit: 5
      },
      result: [{
        id: "p1",
        title: "Hello world"
      }]
    }
  }, {
    type: "tool",
    id: "t-2",
    tool: {
      moduleSlug: "cms",
      tool: "publish_post",
      status: "done",
      durationMs: 96
    }
  }, {
    type: "text",
    text: "Done — published the latest draft and archived the two stale ones."
  }]} />
}`,...n.parameters?.docs?.source},description:{story:`A reply whose tool calls are interleaved with the response text in stream
 order — prose, then a tool step, then more prose — instead of every tool
 call hoisted to the top of the message.`,...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage streaming content="Checking your account settings." segments={[{
    type: "text",
    text: "Checking your account settings."
  }, {
    type: "tool",
    id: "t-1",
    tool: {
      moduleSlug: "account",
      tool: "get_preferences",
      status: "started"
    }
  }]} />
}`,...a.parameters?.docs?.source},description:{story:`Mid-stream: text has streamed, a tool is running, and the blinking caret
 stays off because the trailing tool's spinner is the live indicator.`,...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} />
}`,...o.parameters?.docs?.source},description:{story:"Copy / thumbs / rerun appear under finished agent messages only.",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    ...finishedAgentMsg,
    feedback: "up"
  }]} {...actionCallbacks} />
}`,...i.parameters?.docs?.source},description:{story:"A previously-recorded rating renders the thumb filled at full ink.",...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    id: "m-2",
    role: "agent",
    content: "Pulling your audit log",
    streaming: true
  }]} {...actionCallbacks} />
}`,...d.parameters?.docs?.source},description:{story:"The action row stays hidden while the agent is still streaming.",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} showLogo />
}`,...c.parameters?.docs?.source},description:{story:"Brand mark in the sidebar accent below the list when the last message is finished.",...c.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={respondingThread} {...actionCallbacks} showLogo />
}`,...l.parameters?.docs?.source},description:{story:'While the last agent message is still streaming, the brand logo renders and\n SPINS below the list as the "responding" indicator (the loading prop is wired\n from the last agent message\'s `streaming` flag). It settles to the static\n mark once the reply finishes — see `WithLogo`.',...l.parameters?.docs?.description}}};const F=["User","Agent","AgentMarkdown","AgentMarkdownStreaming","AgentStreaming","AgentInterleavedToolCalls","AgentInterleavedStreaming","FinishedWithActions","FeedbackSelected","StreamingHidesActions","WithLogo","Responding"];export{u as Agent,a as AgentInterleavedStreaming,n as AgentInterleavedToolCalls,s as AgentMarkdown,r as AgentMarkdownStreaming,h as AgentStreaming,i as FeedbackSelected,o as FinishedWithActions,l as Responding,d as StreamingHidesActions,p as User,c as WithLogo,F as __namedExportsOrder,W as default};
