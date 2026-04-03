import{j as e,r as y}from"./iframe-D86K6Uep.js";import{c as f}from"./cn-IyxL_b2c.js";import{B as h}from"./Button-DHwrW_1G.js";import{P as x}from"./Progress-BKAroQKN.js";import"./preload-helper-PPVm8Dsz.js";function g({items:i,loading:d=!1,hasMore:m=!1,loadingMore:p=!1,onLoadMore:s,emptyMessage:u="No activity recorded yet.",className:t}){return d?e.jsx("div",{className:f("py-8 text-center",t),children:e.jsx(x,{type:"circular",size:"lg"})}):i.length===0?e.jsx("p",{className:f("text-sm text-on-surface-variant text-center py-8",t),children:u}):e.jsxs("div",{className:t,children:[e.jsx("div",{className:"space-y-1",children:i.map(c=>e.jsxs("div",{className:"flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-container",children:[e.jsx("span",{className:"material-symbols-rounded text-on-surface-variant shrink-0","aria-hidden":"true",style:{fontSize:18},children:c.icon}),e.jsx("span",{className:"text-sm font-medium text-on-surface",children:c.label}),e.jsx("span",{className:"text-xs text-on-surface-variant ml-auto shrink-0",children:c.timestamp})]},c.id))}),m&&s&&e.jsx("div",{className:"mt-3 text-center",children:e.jsx(h,{variant:"text",onClick:s,loading:p,children:"Load more"})})]})}g.__docgenInfo={description:"",methods:[],displayName:"ActivityList",props:{items:{required:!0,tsType:{name:"unknown"},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},hasMore:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},loadingMore:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onLoadMore:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},emptyMessage:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"No activity recorded yet."',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const l=[{id:"1",icon:"edit",label:"Updated project settings",timestamp:"2 min ago"},{id:"2",icon:"person_add",label:"Invited a new team member",timestamp:"15 min ago"},{id:"3",icon:"upload_file",label:"Uploaded design assets",timestamp:"1 hour ago"},{id:"4",icon:"deployed_code",label:"Deployed to production",timestamp:"3 hours ago"},{id:"5",icon:"bug_report",label:"Resolved critical bug",timestamp:"Yesterday"}],N={title:"UI/Data/ActivityList",component:g,args:{items:l,loading:!1,hasMore:!1,loadingMore:!1,emptyMessage:"No activity recorded yet."},argTypes:{loading:{control:"boolean"},hasMore:{control:"boolean"},loadingMore:{control:"boolean"},emptyMessage:{control:"text"}}},a={},r={args:{loading:!0,items:[]}},o={args:{items:[],emptyMessage:"No activity recorded yet."}},n={render:i=>{const[d,m]=y.useState(l.slice(0,3)),[p,s]=y.useState(!1),u=()=>{s(!0),setTimeout(()=>{m(t=>[...t,...l.slice(t.length)]),s(!1)},1e3)};return e.jsx(g,{...i,items:d,hasMore:d.length<l.length,loadingMore:p,onLoadMore:u})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    items: []
  }
}`,...r.parameters?.docs?.source},description:{story:"Loading state with spinner",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    emptyMessage: "No activity recorded yet."
  }
}`,...o.parameters?.docs?.source},description:{story:"Empty state with custom message",...o.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [items, setItems] = useState<ActivityItem[]>(sampleItems.slice(0, 3));
    const [loadingMore, setLoadingMore] = useState(false);
    const handleLoadMore = () => {
      setLoadingMore(true);
      setTimeout(() => {
        setItems(prev => [...prev, ...sampleItems.slice(prev.length)]);
        setLoadingMore(false);
      }, 1000);
    };
    return <ActivityList {...args} items={items} hasMore={items.length < sampleItems.length} loadingMore={loadingMore} onLoadMore={handleLoadMore} />;
  }
}`,...n.parameters?.docs?.source},description:{story:"List with load-more button",...n.parameters?.docs?.description}}};const I=["Playground","Loading","Empty","WithLoadMore"];export{o as Empty,r as Loading,a as Playground,n as WithLoadMore,I as __namedExportsOrder,N as default};
