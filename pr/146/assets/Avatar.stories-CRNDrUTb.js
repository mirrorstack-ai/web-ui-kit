import{j as l}from"./iframe-DDkoUvEw.js";import{A as i}from"./Avatar-CZOR73hD.js";import{P as n}from"./Progress-Yx0Pn1NP.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Ciz3QftZ.js";const z={title:"UI/Media/Avatar",component:i,args:{fallback:"A",size:"lg"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},fallback:{control:"text"},src:{control:"text"},editable:{control:"boolean"},square:{control:"boolean"}}},r={},a={render:()=>l.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(e=>l.jsx(i,{size:e,fallback:"M"},e))})},s={args:{src:"https://i.pravatar.cc/150?img=12",size:"xl"}},o={args:{size:"xl",editable:!0,fallback:"J",onFileSelect:e=>console.log("Selected:",e.name)}},t={args:{square:!0,size:"xl",fallback:"S"}},c={args:{size:"xl",editable:!0,overlay:l.jsx(n,{type:"circular",variant:"wave",size:"sm",color:"primary"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} fallback="M" />)}
    </div>
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    size: "xl"
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    fallback: "J",
    onFileSelect: file => console.log("Selected:", file.name)
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    square: true,
    size: "xl",
    fallback: "S"
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    overlay: <Progress type="circular" variant="wave" size="sm" color="primary" />
  }
}`,...c.parameters?.docs?.source}}};const b=["Playground","Sizes","WithImage","Editable","Square","WithOverlay"];export{o as Editable,r as Playground,a as Sizes,t as Square,s as WithImage,c as WithOverlay,b as __namedExportsOrder,z as default};
