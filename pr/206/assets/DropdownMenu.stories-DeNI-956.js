import{j as n}from"./iframe-TV02NmAC.js";import{D as o}from"./DropdownMenu-BOvQ8PIW.js";import{I as i}from"./IconButton-D8u1XEEa.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Bvug3YWf.js";import"./Notch-D3pJ9irq.js";import"./Progress-DkxW_OVV.js";import"./button-styles-BPC6xbbG.js";const g={title:"UI/Navigation/DropdownMenu",component:o,decorators:[t=>n.jsx("div",{className:"p-8 min-h-[300px]",children:n.jsx(t,{})})]},e={args:{trigger:n.jsx(i,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:t=>console.log("Selected:",t.id)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <IconButton icon="more_vert" aria-label="Open menu" variant="filled" />,
    items: [{
      id: "edit",
      label: "Edit",
      icon: "edit"
    }, {
      id: "duplicate",
      label: "Duplicate",
      icon: "content_copy"
    }, {
      type: "separator" as const
    }, {
      id: "delete",
      label: "Delete",
      icon: "delete",
      variant: "danger" as const
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...e.parameters?.docs?.source}}};const b=["Playground"];export{e as Playground,b as __namedExportsOrder,g as default};
