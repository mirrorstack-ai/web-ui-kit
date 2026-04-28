import{j as e}from"./iframe-BzJFRC02.js";import{c as i}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function s({width:o="w-full",height:l="h-4",className:d="",lines:h=1}){const c=Math.max(1,Math.round(h));return c>1?e.jsx("div",{className:i("space-y-2",d),children:Array.from({length:c},(m,u)=>e.jsx("div",{className:i(o,l,"bg-surface-container-highest rounded animate-pulse")},u))}):e.jsx("div",{className:i(o,l,"bg-surface-container-highest rounded animate-pulse",d)})}s.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{width:{required:!1,tsType:{name:"string"},description:'Tailwind width class (e.g. "w-full", "w-48")',defaultValue:{value:'"w-full"',computed:!1}},height:{required:!1,tsType:{name:"string"},description:'Tailwind height class (e.g. "h-4", "h-8")',defaultValue:{value:'"h-4"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional classes",defaultValue:{value:'""',computed:!1}},lines:{required:!1,tsType:{name:"number"},description:"Renders multiple skeleton bars with vertical spacing",defaultValue:{value:"1",computed:!1}}}};const f={title:"UI/Feedback/Skeleton",component:s,args:{width:"w-full",height:"h-4",lines:1},argTypes:{width:{control:"text"},height:{control:"text"},lines:{control:{type:"number",min:1}}}},r={},t={args:{lines:4}},a={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{width:"w-3/4",height:"h-6"}),e.jsx(s,{width:"w-1/2",height:"h-4"}),e.jsx(s,{width:"w-48",height:"h-4"}),e.jsx(s,{width:"w-24",height:"h-3"})]})},n={render:()=>e.jsxs("div",{className:"w-80 space-y-3 rounded-lg border border-outline-variant p-4",children:[e.jsx(s,{width:"w-10",height:"h-10",className:"rounded-full"}),e.jsx(s,{width:"w-3/4",height:"h-5"}),e.jsx(s,{lines:3})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    lines: 4
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <Skeleton width="w-3/4" height="h-6" />
      <Skeleton width="w-1/2" height="h-4" />
      <Skeleton width="w-48" height="h-4" />
      <Skeleton width="w-24" height="h-3" />
    </div>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-3 rounded-lg border border-outline-variant p-4">
      <Skeleton width="w-10" height="h-10" className="rounded-full" />
      <Skeleton width="w-3/4" height="h-5" />
      <Skeleton lines={3} />
    </div>
}`,...n.parameters?.docs?.source}}};const x=["Playground","MultiLine","CustomSizes","CardPlaceholder"];export{n as CardPlaceholder,a as CustomSizes,t as MultiLine,r as Playground,x as __namedExportsOrder,f as default};
