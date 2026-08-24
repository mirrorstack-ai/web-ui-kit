import{j as e}from"./iframe-Dup9NiDr.js";import{d as t,b as p}from"./AgentSidebarMessages-CUzADp5L.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-aX5VzrE_.js";import"./Logo-BR1grpJ9.js";import"./IconButton-VNWR6jem.js";import"./Progress-BJW1fGF4.js";import"./button-styles-CZHSjrxJ.js";import"./AgentSidebarMultiQuestion-K8JzKmih.js";import"./Button-PD0L4tRp.js";import"./FloatingLabelInput-CvaQfyxJ.js";import"./SegmentedButton-CBShBU6H.js";import"./Switch-Bn5jysCy.js";const T={title:"UI/Agent/ToolCall",decorators:[m=>e.jsx("div",{className:"w-[420px] rounded-2xl bg-on-background p-4 flex flex-col gap-2",children:e.jsx(m,{})})]},l={render:()=>e.jsx(t,{tool:{moduleSlug:"cms",tool:"get_page",status:"started"}})},d={render:()=>e.jsx(t,{tool:{moduleSlug:"cms",tool:"get_page",status:"done",durationMs:1234}})},i={render:()=>e.jsx(t,{tool:{moduleSlug:"cms",tool:"get_page",status:"done",durationMs:842,args:{slug:"home"},result:{id:"abc123",title:"Home",status:"published"}}})},u={render:()=>e.jsx(t,{tool:{moduleSlug:"cms",tool:"create_post",status:"error"}})},c={render:()=>e.jsx(t,{tool:{moduleSlug:"cms",tool:"create_post",status:"error",durationMs:310,args:{title:"Draft 1",body:"..."},error:"permission_denied: you are not an admin of this app"}})},r={render:()=>e.jsx(t,{tool:{appSlug:"kaohsiung-pet",moduleSlug:"cms",tool:"list_posts",status:"done",durationMs:93,args:{limit:10},result:[{id:"1"},{id:"2"}]}})},s={render:()=>{const m=Array.from({length:16},(g,o)=>({id:`tool-${o}`,role:"tool",tool:{moduleSlug:`module-${o%3+1}`,tool:["fetch_data","write_record","send_event"][o%3],status:["started","done","error"][o%3],durationMs:o%3!==0?100+o*50:void 0}}));return e.jsx(p,{messages:m,autoScroll:!1})}},a={render:()=>e.jsx(p,{autoScroll:!1,messages:[{id:"u1",role:"user",content:"List my recent posts"},{id:"t1",role:"tool",tool:{moduleSlug:"cms",tool:"list_posts",status:"done",durationMs:214,args:{limit:5},result:[{id:"p1",title:"Hello world"}]}},{id:"a1",role:"agent",content:'You have 1 recent post: "Hello world".'}]})},n={render:()=>e.jsx(p,{autoScroll:!1,messages:[{id:"u1",role:"user",content:"Publish the draft"},{id:"t1",role:"tool",tool:{moduleSlug:"cms",tool:"publish_post",status:"started"}}]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarToolCall tool={{
    moduleSlug: "cms",
    tool: "get_page",
    status: "started"
  }} />
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarToolCall tool={{
    moduleSlug: "cms",
    tool: "get_page",
    status: "done",
    durationMs: 1234
  }} />
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarToolCall tool={{
    moduleSlug: "cms",
    tool: "get_page",
    status: "done",
    durationMs: 842,
    args: {
      slug: "home"
    },
    result: {
      id: "abc123",
      title: "Home",
      status: "published"
    }
  }} />
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarToolCall tool={{
    moduleSlug: "cms",
    tool: "create_post",
    status: "error"
  }} />
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarToolCall tool={{
    moduleSlug: "cms",
    tool: "create_post",
    status: "error",
    durationMs: 310,
    args: {
      title: "Draft 1",
      body: "..."
    },
    error: "permission_denied: you are not an admin of this app"
  }} />
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarToolCall tool={{
    appSlug: "kaohsiung-pet",
    moduleSlug: "cms",
    tool: "list_posts",
    status: "done",
    durationMs: 93,
    args: {
      limit: 10
    },
    result: [{
      id: "1"
    }, {
      id: "2"
    }]
  }} />
}`,...r.parameters?.docs?.source},description:{story:"Account-scope call: 3-segment app · module · tool label.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const messages: AgentSidebarMessage[] = Array.from({
      length: 16
    }, (_, i) => ({
      id: \`tool-\${i}\`,
      role: "tool" as const,
      tool: {
        moduleSlug: \`module-\${i % 3 + 1}\`,
        tool: ["fetch_data", "write_record", "send_event"][i % 3],
        status: (["started", "done", "error"] as const)[i % 3],
        durationMs: i % 3 !== 0 ? 100 + i * 50 : undefined
      }
    }));
    return <AgentSidebarMessages messages={messages} autoScroll={false} />;
  }
}`,...s.parameters?.docs?.source},description:{story:"B-2 caps 16 calls per turn — the stack must stay calm.",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages autoScroll={false} messages={[{
    id: "u1",
    role: "user",
    content: "List my recent posts"
  }, {
    id: "t1",
    role: "tool",
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
    id: "a1",
    role: "agent",
    content: 'You have 1 recent post: "Hello world".'
  }]} />
}`,...a.parameters?.docs?.source},description:{story:"Replay: persisted rows carry full meta (args/result/duration).",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <AgentSidebarMessages autoScroll={false} messages={[{
    id: "u1",
    role: "user",
    content: "Publish the draft"
  }, {
    id: "t1",
    role: "tool",
    tool: {
      moduleSlug: "cms",
      tool: "publish_post",
      status: "started"
    }
  }]} />
}`,...n.parameters?.docs?.source},description:{story:"Live: the SSE `tool` event carries no args/result — a transient started row.",...n.parameters?.docs?.description}}};const E=["Started","Done","DoneWithDetail","ErrorNoDetail","ErrorWithDetail","WithAppSlug","SixteenRowStack","ReplayShape","LiveShape"];export{d as Done,i as DoneWithDetail,u as ErrorNoDetail,c as ErrorWithDetail,n as LiveShape,a as ReplayShape,s as SixteenRowStack,l as Started,r as WithAppSlug,E as __namedExportsOrder,T as default};
