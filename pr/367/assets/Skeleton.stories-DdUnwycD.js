import{j as e}from"./iframe-EEsvzDxv.js";import{c as d}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function s({width:r="w-full",height:t="h-4",className:c="",lines:p=1}){const h=Math.max(1,Math.round(p));return h>1?e.jsx("div",{className:d("space-y-2",c),children:Array.from({length:h},(g,m)=>e.jsx("div",{className:d(r,t,"bg-surface-container-highest rounded animate-pulse")},m))}):e.jsx("div",{className:d(r,t,"bg-surface-container-highest rounded animate-pulse",c)})}s.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{width:{required:!1,tsType:{name:"string"},description:'Tailwind width class (e.g. "w-full", "w-48")',defaultValue:{value:'"w-full"',computed:!1}},height:{required:!1,tsType:{name:"string"},description:'Tailwind height class (e.g. "h-4", "h-8")',defaultValue:{value:'"h-4"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional classes",defaultValue:{value:'""',computed:!1}},lines:{required:!1,tsType:{name:"number"},description:"Renders multiple skeleton bars with vertical spacing",defaultValue:{value:"1",computed:!1}}}};function u({children:r,label:t}){return e.jsx("div",{role:"status","aria-busy":"true","aria-label":t,children:e.jsx("div",{"aria-hidden":"true",children:r})})}u.__docgenInfo={description:`Announces a loading region once while hiding its decorative placeholders
from assistive technology. The required label is supplied by the host so the
kit does not own module locale catalogs or silently fall back to English.`,methods:[],displayName:"SkeletonRegion",props:{children:{required:!0,tsType:{name:"ReactNode"},description:"Visual skeleton elements to hide from assistive technology."},label:{required:!0,tsType:{name:"string"},description:"Already-localized text announcing what is loading."}}};const v={title:"UI/Feedback/Skeleton",component:s,args:{width:"w-full",height:"h-4",lines:1},argTypes:{width:{control:"text"},height:{control:"text"},lines:{control:{type:"number",min:1}}}},a={},n={args:{lines:4}},i={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{width:"w-3/4",height:"h-6"}),e.jsx(s,{width:"w-1/2",height:"h-4"}),e.jsx(s,{width:"w-48",height:"h-4"}),e.jsx(s,{width:"w-24",height:"h-3"})]})},o={render:()=>e.jsxs("div",{className:"w-80 space-y-3 rounded-lg border border-outline-variant p-4",children:[e.jsx(s,{width:"w-10",height:"h-10",className:"rounded-full"}),e.jsx(s,{width:"w-3/4",height:"h-5"}),e.jsx(s,{lines:3})]})},l={render:()=>e.jsx(u,{label:"Loading profile",children:e.jsxs("div",{className:"w-80 space-y-3 rounded-lg border border-outline-variant p-4",children:[e.jsx(s,{width:"w-12",height:"h-12",className:"rounded-full"}),e.jsx(s,{width:"w-2/3",height:"h-5"}),e.jsx(s,{lines:3})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    lines: 4
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <Skeleton width="w-3/4" height="h-6" />
      <Skeleton width="w-1/2" height="h-4" />
      <Skeleton width="w-48" height="h-4" />
      <Skeleton width="w-24" height="h-3" />
    </div>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-3 rounded-lg border border-outline-variant p-4">
      <Skeleton width="w-10" height="h-10" className="rounded-full" />
      <Skeleton width="w-3/4" height="h-5" />
      <Skeleton lines={3} />
    </div>
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <SkeletonRegion label="Loading profile">
      <div className="w-80 space-y-3 rounded-lg border border-outline-variant p-4">
        <Skeleton width="w-12" height="h-12" className="rounded-full" />
        <Skeleton width="w-2/3" height="h-5" />
        <Skeleton lines={3} />
      </div>
    </SkeletonRegion>
}`,...l.parameters?.docs?.source}}};const y=["Playground","MultiLine","CustomSizes","CardPlaceholder","Region"];export{o as CardPlaceholder,i as CustomSizes,n as MultiLine,a as Playground,l as Region,y as __namedExportsOrder,v as default};
