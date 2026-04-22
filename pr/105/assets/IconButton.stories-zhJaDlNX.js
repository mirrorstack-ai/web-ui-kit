import{j as a}from"./iframe-1FNdXsP6.js";import{I as e}from"./IconButton-D5ki_mYm.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-C4iXvWXL.js";import"./Icon-0CXNAiBM.js";import"./button-styles-DvQkePbc.js";const u={title:"UI/Actions/IconButton",component:e,args:{icon:"settings","aria-label":"Settings",variant:"filled",color:"primary",size:"md"},argTypes:{icon:{control:"text"},variant:{control:"select",options:["filled","tonal","outline","text"]},color:{control:"select",options:["primary","secondary","tertiary","error","warning"]},size:{control:"select",options:["sm","md","lg"]},loading:{control:"boolean"},disabled:{control:"boolean"},tooltip:{control:"text"}}},o={},i={render:r=>a.jsxs("div",{className:"flex gap-3 items-center",children:[a.jsx(e,{...r,variant:"filled",icon:"favorite","aria-label":"Favorite"}),a.jsx(e,{...r,variant:"tonal",icon:"favorite","aria-label":"Favorite"}),a.jsx(e,{...r,variant:"outline",icon:"favorite","aria-label":"Favorite"}),a.jsx(e,{...r,variant:"text",icon:"favorite","aria-label":"Favorite"})]})},n={render:r=>a.jsxs("div",{className:"flex gap-3 items-center",children:[a.jsx(e,{...r,variant:"filled",color:"primary",icon:"star","aria-label":"Primary"}),a.jsx(e,{...r,variant:"filled",color:"secondary",icon:"star","aria-label":"Secondary"}),a.jsx(e,{...r,variant:"filled",color:"tertiary",icon:"star","aria-label":"Tertiary"}),a.jsx(e,{...r,variant:"filled",color:"error",icon:"delete","aria-label":"Error"}),a.jsx(e,{...r,variant:"filled",color:"warning",icon:"warning","aria-label":"Warning"})]})},s={render:r=>a.jsxs("div",{className:"flex gap-3 items-center",children:[a.jsx(e,{...r,size:"sm",icon:"close","aria-label":"Small"}),a.jsx(e,{...r,size:"md",icon:"close","aria-label":"Medium"}),a.jsx(e,{...r,size:"lg",icon:"close","aria-label":"Large"})]})},t={render:r=>a.jsxs("div",{className:"flex gap-3 items-center",children:[a.jsx(e,{...r,size:"sm",loading:!0,icon:"refresh","aria-label":"Loading small"}),a.jsx(e,{...r,size:"md",loading:!0,icon:"refresh","aria-label":"Loading medium"}),a.jsx(e,{...r,size:"lg",loading:!0,icon:"refresh","aria-label":"Loading large"})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <IconButton {...args} variant="filled" icon="favorite" aria-label="Favorite" />
      <IconButton {...args} variant="tonal" icon="favorite" aria-label="Favorite" />
      <IconButton {...args} variant="outline" icon="favorite" aria-label="Favorite" />
      <IconButton {...args} variant="text" icon="favorite" aria-label="Favorite" />
    </div>
}`,...i.parameters?.docs?.source},description:{story:"All variants side by side",...i.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <IconButton {...args} variant="filled" color="primary" icon="star" aria-label="Primary" />
      <IconButton {...args} variant="filled" color="secondary" icon="star" aria-label="Secondary" />
      <IconButton {...args} variant="filled" color="tertiary" icon="star" aria-label="Tertiary" />
      <IconButton {...args} variant="filled" color="error" icon="delete" aria-label="Error" />
      <IconButton {...args} variant="filled" color="warning" icon="warning" aria-label="Warning" />
    </div>
}`,...n.parameters?.docs?.source},description:{story:"All colors side by side",...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <IconButton {...args} size="sm" icon="close" aria-label="Small" />
      <IconButton {...args} size="md" icon="close" aria-label="Medium" />
      <IconButton {...args} size="lg" icon="close" aria-label="Large" />
    </div>
}`,...s.parameters?.docs?.source},description:{story:"All sizes side by side",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <IconButton {...args} size="sm" loading icon="refresh" aria-label="Loading small" />
      <IconButton {...args} size="md" loading icon="refresh" aria-label="Loading medium" />
      <IconButton {...args} size="lg" loading icon="refresh" aria-label="Loading large" />
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Loading state replaces icon with spinner",...t.parameters?.docs?.description}}};const f=["Playground","Variants","Colors","Sizes","Loading"];export{n as Colors,t as Loading,o as Playground,s as Sizes,i as Variants,f as __namedExportsOrder,u as default};
