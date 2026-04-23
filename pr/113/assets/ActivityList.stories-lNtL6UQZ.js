import{j as e,r as f}from"./iframe-B1w68Gd8.js";import{c as u}from"./cn-IyxL_b2c.js";import{B as x}from"./Button-Bu9mQqNu.js";import{I as h}from"./Icon-CE41KYxD.js";import{P as v}from"./Progress-B_ed1QIV.js";import"./preload-helper-PPVm8Dsz.js";import"./button-styles-DvQkePbc.js";function g({items:s,loading:l=!1,hasMore:m=!1,loadingMore:a=!1,onLoadMore:t,emptyMessage:y="No activity recorded yet.",className:p}){return l?e.jsx("div",{className:u("py-8 text-center",p),children:e.jsx(v,{type:"circular",size:"md"})}):s.length===0?e.jsx("p",{className:u("text-sm text-on-surface-variant text-center py-8",p),children:y}):e.jsxs("div",{className:u("space-y-1",p),children:[s.map(r=>e.jsxs("div",{className:"flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-container",children:[e.jsx(h,{name:r.icon,size:20,className:"text-on-surface-variant shrink-0"}),e.jsx("span",{className:"text-sm font-medium text-on-surface",children:r.label}),e.jsx("span",{className:"text-xs text-on-surface-variant ml-auto shrink-0",children:r.timestamp})]},r.id)),m&&t&&e.jsx("div",{className:"mt-3 text-center",children:e.jsx(x,{variant:"text",size:"sm",onClick:t,loading:a,children:"Load more"})})]})}g.__docgenInfo={description:"",methods:[],displayName:"ActivityList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"ActivityItem"}],raw:"ActivityItem[]"},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},hasMore:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},loadingMore:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onLoadMore:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},emptyMessage:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"No activity recorded yet."',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const c=[{id:"1",icon:"login",label:"Signed in from Chrome on macOS",timestamp:"2 min ago"},{id:"2",icon:"key",label:"Registered a new passkey",timestamp:"1 hour ago"},{id:"3",icon:"edit",label:"Updated profile picture",timestamp:"3 hours ago"},{id:"4",icon:"security",label:"Changed password",timestamp:"Yesterday"},{id:"5",icon:"devices",label:"Revoked session on Firefox",timestamp:"2 days ago"}],T={title:"UI/Data/ActivityList",component:g,args:{items:c},argTypes:{loading:{control:"boolean"},hasMore:{control:"boolean"},loadingMore:{control:"boolean"}},decorators:[s=>e.jsx("div",{className:"max-w-lg",children:e.jsx(s,{})})]},o={},n={args:{items:[],loading:!0}},i={args:{items:[]}},d={render:()=>{const[s,l]=f.useState(c.slice(0,3)),[m,a]=f.useState(!1),t=()=>{a(!0),setTimeout(()=>{l(c),a(!1)},1e3)};return e.jsx(g,{items:s,hasMore:s.length<c.length,loadingMore:m,onLoadMore:t})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    loading: true
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [items, setItems] = useState(sampleItems.slice(0, 3));
    const [loadingMore, setLoadingMore] = useState(false);
    const handleLoadMore = () => {
      setLoadingMore(true);
      setTimeout(() => {
        setItems(sampleItems);
        setLoadingMore(false);
      }, 1000);
    };
    return <ActivityList items={items} hasMore={items.length < sampleItems.length} loadingMore={loadingMore} onLoadMore={handleLoadMore} />;
  }
}`,...d.parameters?.docs?.source}}};const q=["Playground","Loading","Empty","WithLoadMore"];export{i as Empty,n as Loading,o as Playground,d as WithLoadMore,q as __namedExportsOrder,T as default};
