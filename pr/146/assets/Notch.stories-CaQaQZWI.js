import{j as e}from"./iframe-DDkoUvEw.js";import{N as s}from"./Notch-BmzvNpsE.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const g={title:"UI/Surfaces/Notch",component:s,args:{width:200,height:150,notchWidth:40,notchHeight:50,notchSide:"right",notchOffset:0,radius:8,inverseRadius:6,strokeWidth:1},argTypes:{notchSide:{control:"select",options:["top","bottom","left","right"]},width:{control:{type:"range",min:100,max:400,step:10}},height:{control:{type:"range",min:80,max:300,step:10}},notchWidth:{control:{type:"range",min:20,max:80,step:2}},notchHeight:{control:{type:"range",min:20,max:100,step:2}},notchOffset:{control:{type:"range",min:-100,max:100,step:1}},radius:{control:{type:"range",min:0,max:20,step:1}},inverseRadius:{control:{type:"range",min:0,max:16,step:1}},strokeWidth:{control:{type:"range",min:0,max:4,step:.5}}}},r={},n={render:()=>e.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(t=>e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:t}),e.jsx(s,{width:160,height:120,notchWidth:36,notchHeight:40,notchSide:t,notchOffset:0})]},t))})},o={args:{stroke:"none"}},a={args:{fill:"none"}},i={render:()=>e.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:[0,30,50,-30].map(t=>e.jsxs("div",{children:[e.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["offset: ",t]}),e.jsx(s,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:t})]},t))})},c={render:()=>e.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(t=>e.jsxs("div",{children:[e.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["headOnly — ",t]}),e.jsx(s,{width:160,height:120,notchWidth:60,notchHeight:40,notchSide:t,headOnly:!0})]},t))})},d={render:()=>e.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(t=>e.jsxs("div",{children:[e.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["headOnly — ",t," — offset 30"]}),e.jsx(s,{width:160,height:120,notchWidth:60,notchHeight:40,notchSide:t,notchOffset:30,headOnly:!0})]},t))})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map(side => <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">{side}</p>
          <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchSide={side} notchOffset={0} />
        </div>)}
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    stroke: "none"
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    fill: "none"
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {[0, 30, 50, -30].map(offset => <div key={offset}>
          <p className="text-xs text-on-surface-variant mb-2">offset: {offset}</p>
          <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={offset} />
        </div>)}
    </div>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map(side => <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">headOnly — {side}</p>
          <Notch width={160} height={120} notchWidth={60} notchHeight={40} notchSide={side} headOnly />
        </div>)}
    </div>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map(side => <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">headOnly — {side} — offset 30</p>
          <Notch width={160} height={120} notchWidth={60} notchHeight={40} notchSide={side} notchOffset={30} headOnly />
        </div>)}
    </div>
}`,...d.parameters?.docs?.source}}};const f=["Playground","AllSides","FillOnly","OutlineOnly","WithOffset","HeadOnly","HeadOnlyWithOffset"];export{n as AllSides,o as FillOnly,c as HeadOnly,d as HeadOnlyWithOffset,a as OutlineOnly,r as Playground,i as WithOffset,f as __namedExportsOrder,g as default};
