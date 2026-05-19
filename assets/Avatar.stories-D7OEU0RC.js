import{j as a}from"./iframe-fr4vQoSD.js";import{A as r}from"./Avatar-CseNOvCt.js";import{P as p}from"./Progress-CZu3nE8-.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-CQr7PWw3.js";const b={title:"UI/Media/Avatar",component:r,args:{fallback:"A",size:"lg"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},fallback:{control:"text"},src:{control:"text"},editable:{control:"boolean"},square:{control:"boolean"}}},o={},c={render:()=>a.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(e=>a.jsx(r,{size:e,fallback:"M"},e))})},s={render:()=>a.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(e=>a.jsx(r,{size:e,square:!0,fallback:"M"},e))})},t={render:()=>a.jsx("div",{className:"flex flex-col gap-4",children:["sm","md","lg","xl"].map(e=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(r,{size:e,fallback:"A"}),a.jsx(r,{size:e,fallback:"AB"}),a.jsx(r,{size:e,fallback:"ABC"})]},e))})},n={args:{src:"https://i.pravatar.cc/150?img=12",size:"xl"}},i={args:{size:"xl",editable:!0,fallback:"J",onFileSelect:e=>console.log("Selected:",e.name)}},m={args:{square:!0,size:"xl",fallback:"S"}},d={args:{size:"xl",editable:!0,overlay:a.jsx(p,{type:"circular",variant:"wave",size:"sm",color:"primary"})}},l={args:{size:"xl",square:!0,fallback:"",overlay:a.jsx("span",{className:"material-symbols-rounded text-primary",style:{fontSize:40},children:"rocket_launch"})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} fallback="M" />)}
    </div>
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} square fallback="M" />)}
    </div>
}`,...s.parameters?.docs?.source},description:{story:"Square avatars get a per-size radius — `sm` → `rounded-md`, `md` →\n`rounded-lg`, `lg` → `rounded-xl`, `xl` → `rounded-2xl`. Each radius\nis ~15-20% of the side length so the visual rounding ratio stays\nconsistent as the avatar scales.",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <div key={size} className="flex items-center gap-4">
          <Avatar size={size} fallback="A" />
          <Avatar size={size} fallback="AB" />
          <Avatar size={size} fallback="ABC" />
        </div>)}
    </div>
}`,...t.parameters?.docs?.source},description:{story:`Fallback supports up to 3 characters. Pass "AB" for two-letter
initials, "ABC" for three-letter monograms — the text size scales
down per char count so each variant stays legible at every Avatar
size.`,...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    size: "xl"
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    fallback: "J",
    onFileSelect: file => console.log("Selected:", file.name)
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    square: true,
    size: "xl",
    fallback: "S"
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    overlay: <Progress type="circular" variant="wave" size="sm" color="primary" />
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source},description:{story:"`overlay` now renders for non-editable avatars too — useful for\nshowing a material symbol icon as the avatar (e.g. a module's\ndeclared icon) instead of an initials fallback.",...l.parameters?.docs?.description}}};const y=["Playground","Sizes","SquareSizes","MultiCharFallback","WithImage","Editable","Square","WithOverlay","WithIconOverlay"];export{i as Editable,t as MultiCharFallback,o as Playground,c as Sizes,m as Square,s as SquareSizes,l as WithIconOverlay,n as WithImage,d as WithOverlay,y as __namedExportsOrder,b as default};
