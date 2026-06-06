import{j as r}from"./iframe-qStpLu3N.js";import{D as i}from"./DataList-usMKo6nm.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Pwdykewk.js";const b={title:"UI/Notch/Blocks/List",component:i,parameters:{layout:"centered"}},c=[{icon:"bug_report",title:"Fix OAuth refresh token expiry edge case",description:"opened by @alice",trailing:"2d ago",status:"error"},{icon:"lightbulb",title:"Add dark mode toggle to settings page",description:"opened by @bob",trailing:"4d ago",status:"success"},{icon:"bug_report",title:"Sidebar flickers on route change",description:"opened by @carol",trailing:"1w ago",status:"warning"},{icon:"lightbulb",title:"Support custom domain mapping",description:"opened by @dave",trailing:"2w ago",status:"success"},{icon:"bug_report",title:"CSV export truncates long fields",description:"opened by @eve",trailing:"3w ago",status:"error"}],o={args:{items:c},decorators:[e=>r.jsx("div",{className:"w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface p-2",children:r.jsx(e,{})})]},d=[{icon:"web",title:"My SaaS App",description:"oauth-core v0.1.0",trailing:"May 20"},{icon:"web",title:"Analytics Dashboard",description:"oauth-core v0.2.1",trailing:"May 18"},{icon:"web",title:"CRM Integration",description:"oauth-core v0.1.3",trailing:"May 15"},{icon:"web",title:"Billing Portal",description:"oauth-core v0.3.0",trailing:"May 12"}],s={args:{items:d},decorators:[e=>r.jsx("div",{className:"w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface p-2",children:r.jsx(e,{})})]},a={args:{items:[],emptyIcon:"inbox",emptyLabel:"No items yet"},decorators:[e=>r.jsx("div",{className:"w-[200px] h-[150px] border border-outline-variant rounded-xl text-on-surface p-2",children:r.jsx(e,{})})]},p=Array.from({length:15},(e,t)=>({icon:"description",title:`Document ${t+1}`,description:`Updated by @user${t+1}`,trailing:`${t+1}d ago`,status:["default","success","warning","error"][t%4]})),n={args:{items:p},decorators:[e=>r.jsx("div",{className:"w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface p-2",children:r.jsx(e,{})})]};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: issueItems
  },
  decorators: [Story => <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface p-2">
        <Story />
      </div>]
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: appItems
  },
  decorators: [Story => <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface p-2">
        <Story />
      </div>]
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    emptyIcon: "inbox",
    emptyLabel: "No items yet"
  },
  decorators: [Story => <div className="w-[200px] h-[150px] border border-outline-variant rounded-xl text-on-surface p-2">
        <Story />
      </div>]
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: manyItems
  },
  decorators: [Story => <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface p-2">
        <Story />
      </div>]
}`,...n.parameters?.docs?.source}}};const y=["Issues","InstalledApps","Empty","ManyItems"];export{a as Empty,s as InstalledApps,o as Issues,n as ManyItems,y as __namedExportsOrder,b as default};
