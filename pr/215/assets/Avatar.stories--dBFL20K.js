import{j as a}from"./iframe-DNa9iAv8.js";import{A as m}from"./Avatar-DpnDhKt4.js";import{P as d}from"./Progress-BU-h-5si.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-BsSed7sh.js";const z={title:"UI/Media/Avatar",component:m,args:{fallback:"A",size:"lg"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},fallback:{control:"text"},src:{control:"text"},editable:{control:"boolean"},square:{control:"boolean"}}},t={},o={render:()=>a.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(e=>a.jsx(m,{size:e,fallback:"M"},e))})},r={render:()=>a.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(e=>a.jsx(m,{size:e,square:!0,fallback:"M"},e))})},l={args:{src:"https://i.pravatar.cc/150?img=12",size:"xl"}},n={args:{size:"xl",editable:!0,fallback:"J",onFileSelect:e=>console.log("Selected:",e.name)}},c={args:{square:!0,size:"xl",fallback:"S"}},i={args:{size:"xl",editable:!0,overlay:a.jsx(d,{type:"circular",variant:"wave",size:"sm",color:"primary"})}},s={args:{size:"xl",square:!0,fallback:"",overlay:a.jsx("span",{className:"material-symbols-rounded text-primary",style:{fontSize:40},children:"rocket_launch"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} fallback="M" />)}
    </div>
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} square fallback="M" />)}
    </div>
}`,...r.parameters?.docs?.source},description:{story:"Square avatars get a per-size radius — `sm` → `rounded-md`, `md` →\n`rounded-lg`, `lg` → `rounded-xl`, `xl` → `rounded-2xl`. Each radius\nis ~15-20% of the side length so the visual rounding ratio stays\nconsistent as the avatar scales.",...r.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    size: "xl"
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    fallback: "J",
    onFileSelect: file => console.log("Selected:", file.name)
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    square: true,
    size: "xl",
    fallback: "S"
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    overlay: <Progress type="circular" variant="wave" size="sm" color="primary" />
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    square: true,
    fallback: "",
    overlay: <span className="material-symbols-rounded text-primary" style={{
      fontSize: 40
    }}>
        rocket_launch
      </span>
  }
}`,...s.parameters?.docs?.source},description:{story:"`overlay` now renders for non-editable avatars too — useful for\nshowing a material symbol icon as the avatar (e.g. a module's\ndeclared icon) instead of an initials fallback.",...s.parameters?.docs?.description}}};const y=["Playground","Sizes","SquareSizes","WithImage","Editable","Square","WithOverlay","WithIconOverlay"];export{n as Editable,t as Playground,o as Sizes,c as Square,r as SquareSizes,s as WithIconOverlay,l as WithImage,i as WithOverlay,y as __namedExportsOrder,z as default};
