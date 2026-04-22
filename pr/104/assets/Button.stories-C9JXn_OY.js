import{j as r}from"./iframe-CFPr974Q.js";import{B as t}from"./Button-Bg9LUkAY.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-CK-sepSk.js";import"./Icon-C7M0bJW6.js";import"./button-styles-DvQkePbc.js";const B={title:"UI/Actions/Button",component:t,args:{children:"Button",variant:"filled",color:"primary",size:"md"},argTypes:{variant:{control:"select",options:["filled","tonal","outline","text"]},color:{control:"select",options:["primary","secondary","tertiary","error","warning"]},size:{control:"select",options:["sm","md","lg"]},loading:{control:"boolean"},fullWidth:{control:"boolean"},disabled:{control:"boolean"},leftIcon:{control:"text"},rightIcon:{control:"text"}}},o={},n={render:e=>r.jsxs("div",{className:"flex gap-3 items-center",children:[r.jsx(t,{...e,variant:"filled",children:"Filled"}),r.jsx(t,{...e,variant:"tonal",children:"Tonal"}),r.jsx(t,{...e,variant:"outline",children:"Outline"}),r.jsx(t,{...e,variant:"text",children:"Text"})]})},s={render:e=>r.jsxs("div",{className:"flex gap-3 items-center",children:[r.jsx(t,{...e,color:"primary",children:"Primary"}),r.jsx(t,{...e,color:"secondary",children:"Secondary"}),r.jsx(t,{...e,color:"tertiary",children:"Tertiary"}),r.jsx(t,{...e,color:"error",children:"Error"}),r.jsx(t,{...e,color:"warning",children:"Warning"})]})},a={render:e=>r.jsxs("div",{className:"flex gap-3 items-center",children:[r.jsx(t,{...e,size:"sm",children:"Small"}),r.jsx(t,{...e,size:"md",children:"Medium"}),r.jsx(t,{...e,size:"lg",children:"Large"})]})},i={render:e=>r.jsxs("div",{className:"flex gap-3 items-center",children:[r.jsx(t,{...e,leftIcon:"add",children:"Create"}),r.jsx(t,{...e,rightIcon:"arrow_forward",children:"Next"}),r.jsx(t,{...e,leftIcon:"save",variant:"tonal",children:"Save"})]})},c={render:e=>r.jsxs("div",{className:"flex gap-3 items-center",children:[r.jsx(t,{...e,size:"sm",loading:!0,children:"Small"}),r.jsx(t,{...e,size:"md",loading:!0,children:"Medium"}),r.jsx(t,{...e,size:"lg",loading:!0,children:"Large"})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...o.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} variant="filled">Filled</Button>
      <Button {...args} variant="tonal">Tonal</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="text">Text</Button>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"All variants side by side",...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} color="primary">Primary</Button>
      <Button {...args} color="secondary">Secondary</Button>
      <Button {...args} color="tertiary">Tertiary</Button>
      <Button {...args} color="error">Error</Button>
      <Button {...args} color="warning">Warning</Button>
    </div>
}`,...s.parameters?.docs?.source},description:{story:"All colors side by side",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
}`,...a.parameters?.docs?.source},description:{story:"All sizes side by side",...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} leftIcon="add">Create</Button>
      <Button {...args} rightIcon="arrow_forward">Next</Button>
      <Button {...args} leftIcon="save" variant="tonal">Save</Button>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Buttons with icons",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} size="sm" loading>Small</Button>
      <Button {...args} size="md" loading>Medium</Button>
      <Button {...args} size="lg" loading>Large</Button>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Loading state",...c.parameters?.docs?.description}}};const v=["Playground","Variants","Colors","Sizes","WithIcons","Loading"];export{s as Colors,c as Loading,o as Playground,a as Sizes,n as Variants,i as WithIcons,v as __namedExportsOrder,B as default};
