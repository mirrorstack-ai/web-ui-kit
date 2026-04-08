import{j as e}from"./iframe-DwxZVIVL.js";import{c as g}from"./cn-IyxL_b2c.js";import{P as j}from"./Progress-DbsOdFb-.js";import{v as S,i as z}from"./button-styles-DvQkePbc.js";import"./preload-helper-PPVm8Dsz.js";const N={sm:"h-10 px-3 text-sm",md:"px-4 py-3",lg:"px-6 py-4 text-lg"},b={sm:{width:16,height:16},md:{width:24,height:24},lg:{width:32,height:32}},w={sm:"gap-1",md:"gap-2",lg:"gap-3"};function f({name:r,size:d}){return e.jsx("span",{className:"material-symbols-rounded",style:{fontSize:z[d]},children:r})}function t({variant:r="filled",color:d="primary",size:s="md",loading:m=!1,fullWidth:x=!1,leftIcon:u,rightIcon:p,children:y,className:h,disabled:v,...B}){return e.jsxs("button",{className:g("relative inline-flex items-center justify-center font-medium rounded-lg transition-all cursor-pointer active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",S[r][d],N[s],x&&"w-full",h),disabled:v||m,...B,children:[m&&e.jsx("span",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx(j,{type:"circular",variant:"wave",size:"sm",color:"current",style:b[s]})}),e.jsxs("span",{className:g("inline-flex items-center",w[s],m&&"opacity-0"),children:[u&&e.jsx(f,{name:u,size:s}),y,p&&e.jsx(f,{name:p,size:s})]})]})}t.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"ButtonVariant"},description:"",defaultValue:{value:'"filled"',computed:!1}},color:{required:!1,tsType:{name:"ButtonColor"},description:"",defaultValue:{value:'"primary"',computed:!1}},size:{required:!1,tsType:{name:"ButtonSize"},description:"",defaultValue:{value:'"md"',computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},leftIcon:{required:!1,tsType:{name:"string"},description:""},rightIcon:{required:!1,tsType:{name:"string"},description:""}},composes:["ButtonHTMLAttributes"]};const M={title:"UI/Actions/Button",component:t,args:{children:"Button",variant:"filled",color:"primary",size:"md"},argTypes:{variant:{control:"select",options:["filled","tonal","outline","text"]},color:{control:"select",options:["primary","secondary","tertiary","error","warning"]},size:{control:"select",options:["sm","md","lg"]},loading:{control:"boolean"},fullWidth:{control:"boolean"},disabled:{control:"boolean"},leftIcon:{control:"text"},rightIcon:{control:"text"}}},n={},a={render:r=>e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(t,{...r,variant:"filled",children:"Filled"}),e.jsx(t,{...r,variant:"tonal",children:"Tonal"}),e.jsx(t,{...r,variant:"outline",children:"Outline"}),e.jsx(t,{...r,variant:"text",children:"Text"})]})},o={render:r=>e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(t,{...r,color:"primary",children:"Primary"}),e.jsx(t,{...r,color:"secondary",children:"Secondary"}),e.jsx(t,{...r,color:"tertiary",children:"Tertiary"}),e.jsx(t,{...r,color:"error",children:"Error"}),e.jsx(t,{...r,color:"warning",children:"Warning"})]})},i={render:r=>e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(t,{...r,size:"sm",children:"Small"}),e.jsx(t,{...r,size:"md",children:"Medium"}),e.jsx(t,{...r,size:"lg",children:"Large"})]})},l={render:r=>e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(t,{...r,leftIcon:"add",children:"Create"}),e.jsx(t,{...r,rightIcon:"arrow_forward",children:"Next"}),e.jsx(t,{...r,leftIcon:"save",variant:"tonal",children:"Save"})]})},c={render:r=>e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(t,{...r,size:"sm",loading:!0,children:"Small"}),e.jsx(t,{...r,size:"md",loading:!0,children:"Medium"}),e.jsx(t,{...r,size:"lg",loading:!0,children:"Large"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} variant="filled">Filled</Button>
      <Button {...args} variant="tonal">Tonal</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="text">Text</Button>
    </div>
}`,...a.parameters?.docs?.source},description:{story:"All variants side by side",...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} color="primary">Primary</Button>
      <Button {...args} color="secondary">Secondary</Button>
      <Button {...args} color="tertiary">Tertiary</Button>
      <Button {...args} color="error">Error</Button>
      <Button {...args} color="warning">Warning</Button>
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All colors side by side",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"All sizes side by side",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} leftIcon="add">Create</Button>
      <Button {...args} rightIcon="arrow_forward">Next</Button>
      <Button {...args} leftIcon="save" variant="tonal">Save</Button>
    </div>
}`,...l.parameters?.docs?.source},description:{story:"Buttons with icons",...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-3 items-center">
      <Button {...args} size="sm" loading>Small</Button>
      <Button {...args} size="md" loading>Medium</Button>
      <Button {...args} size="lg" loading>Large</Button>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Loading state",...c.parameters?.docs?.description}}};const P=["Playground","Variants","Colors","Sizes","WithIcons","Loading"];export{o as Colors,c as Loading,n as Playground,i as Sizes,a as Variants,l as WithIcons,P as __namedExportsOrder,M as default};
