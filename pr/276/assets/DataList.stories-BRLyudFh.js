import{j as e}from"./iframe-DpcrCo5L.js";import{c}from"./cn-IyxL_b2c.js";import{I as p}from"./Icon-B7lKQD-3.js";import{d as x,a as y}from"./tone-B_C-zL0B.js";import"./preload-helper-PPVm8Dsz.js";function u({items:s,emptyIcon:t,emptyLabel:m="No items",className:l}){return s.length===0?e.jsxs("div",{className:c("h-full w-full flex flex-col items-center justify-center gap-1",l),children:[t&&e.jsx(p,{name:t,size:32,className:"opacity-30"}),e.jsx("span",{className:"text-xs opacity-40",children:m})]}):e.jsx("div",{className:c("h-full w-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:currentColor_transparent]",l),children:s.map((r,d)=>e.jsxs("div",{className:c("flex items-center gap-2.5 px-1 py-1.5 border-b border-current/5",d===s.length-1&&"border-b-0"),children:[r.avatar?e.jsx("img",{src:r.avatar,alt:"",className:"w-5 h-5 rounded-full object-cover shrink-0"}):r.icon?e.jsx(p,{name:r.icon,size:16,className:"opacity-60"}):null,e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[r.status&&r.status!=="default"&&e.jsx("span",{className:"shrink-0 inline-block w-1.5 h-1.5 rounded-full",style:{backgroundColor:x[r.status]},children:e.jsx("span",{className:"sr-only",children:y[r.status]})}),e.jsx("span",{className:"text-xs font-medium truncate",children:r.title})]}),r.description&&e.jsx("span",{className:"block text-[10px] opacity-40 truncate",children:r.description})]}),r.trailing&&e.jsx("span",{className:"text-[10px] opacity-40 whitespace-nowrap shrink-0",children:r.trailing})]},d))})}u.__docgenInfo={description:"",methods:[],displayName:"DataList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"DataListItem"}],raw:"DataListItem[]"},description:""},emptyIcon:{required:!1,tsType:{name:"string"},description:""},emptyLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"No items"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const I={title:"UI/Blocks/List",component:u,parameters:{layout:"centered"}},g=[{icon:"bug_report",title:"Fix OAuth refresh token expiry edge case",description:"opened by @alice",trailing:"2d ago",status:"error"},{icon:"lightbulb",title:"Add dark mode toggle to settings page",description:"opened by @bob",trailing:"4d ago",status:"success"},{icon:"bug_report",title:"Sidebar flickers on route change",description:"opened by @carol",trailing:"1w ago",status:"warning"},{icon:"lightbulb",title:"Support custom domain mapping",description:"opened by @dave",trailing:"2w ago",status:"success"},{icon:"bug_report",title:"CSV export truncates long fields",description:"opened by @eve",trailing:"3w ago",status:"error"}],a={args:{items:g},decorators:[s=>e.jsx("div",{className:"w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4",children:e.jsx(s,{})})]},b=[{icon:"web",title:"My SaaS App",description:"oauth-core v0.1.0",trailing:"May 20"},{icon:"web",title:"Analytics Dashboard",description:"oauth-core v0.2.1",trailing:"May 18"},{icon:"web",title:"CRM Integration",description:"oauth-core v0.1.3",trailing:"May 15"},{icon:"web",title:"Billing Portal",description:"oauth-core v0.3.0",trailing:"May 12"}],o={args:{items:b},decorators:[s=>e.jsx("div",{className:"w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4",children:e.jsx(s,{})})]},n={args:{items:[],emptyIcon:"inbox",emptyLabel:"No items yet"},decorators:[s=>e.jsx("div",{className:"w-[200px] h-[150px] border border-outline-variant rounded-xl text-on-surface px-2 py-4",children:e.jsx(s,{})})]},h=Array.from({length:15},(s,t)=>({icon:"description",title:`Document ${t+1}`,description:`Updated by @user${t+1}`,trailing:`${t+1}d ago`,status:["default","success","warning","error"][t%4]})),i={args:{items:h},decorators:[s=>e.jsx("div",{className:"w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4",children:e.jsx(s,{})})]};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: issueItems
  },
  decorators: [Story => <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>]
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: appItems
  },
  decorators: [Story => <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>]
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    emptyIcon: "inbox",
    emptyLabel: "No items yet"
  },
  decorators: [Story => <div className="w-[200px] h-[150px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>]
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: manyItems
  },
  decorators: [Story => <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>]
}`,...i.parameters?.docs?.source}}};const S=["Issues","InstalledApps","Empty","ManyItems"];export{n as Empty,o as InstalledApps,a as Issues,i as ManyItems,S as __namedExportsOrder,I as default};
