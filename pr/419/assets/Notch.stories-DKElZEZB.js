import{j as t}from"./iframe-DX_nr03b.js";import{N as s}from"./Notch-DaUBHy85.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const x={title:"UI/Notch/Notch",component:s,args:{width:200,height:150,notchWidth:40,notchHeight:50,notchSide:"right",notchOffset:0,radius:8,inverseRadius:6,strokeWidth:1},argTypes:{notchSide:{control:"select",options:["top","bottom","left","right"]},width:{control:{type:"range",min:100,max:400,step:10}},height:{control:{type:"range",min:80,max:300,step:10}},notchWidth:{control:{type:"range",min:20,max:80,step:2}},notchHeight:{control:{type:"range",min:20,max:100,step:2}},notchOffset:{control:{type:"range",min:-100,max:100,step:1}},radius:{control:{type:"range",min:0,max:20,step:1}},inverseRadius:{control:{type:"range",min:0,max:16,step:1}},notchGap:{control:{type:"range",min:0,max:40,step:1}},strokeWidth:{control:{type:"range",min:0,max:4,step:.5}}}},a={},n={render:()=>t.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(e=>t.jsxs("div",{children:[t.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:e}),t.jsx(s,{width:160,height:120,notchWidth:36,notchHeight:40,notchSide:e,notchOffset:0})]},e))})},o={args:{stroke:"none"}},i={args:{fill:"none"}},c={render:()=>t.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:[0,30,50,-30].map(e=>t.jsxs("div",{children:[t.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["offset: ",e]}),t.jsx(s,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:e})]},e))})},r={render:()=>t.jsx("div",{className:"flex gap-8 p-4",children:[0,8,16].map(e=>t.jsxs("div",{children:[t.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["notchGap: ",e]}),t.jsx(s,{width:160,height:120,notchWidth:52,notchHeight:46,notchSide:"top",notchOffset:-24,radius:12,inverseRadius:10,notchGap:e})]},e))})},d={render:()=>t.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(e=>t.jsxs("div",{children:[t.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["headOnly — ",e]}),t.jsx(s,{width:160,height:120,notchWidth:60,notchHeight:40,notchSide:e,headOnly:!0})]},e))})},h={render:()=>t.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(e=>t.jsxs("div",{children:[t.jsxs("p",{className:"text-xs text-on-surface-variant mb-2",children:["headOnly — ",e," — offset 30"]}),t.jsx(s,{width:160,height:120,notchWidth:60,notchHeight:40,notchSide:e,notchOffset:30,headOnly:!0})]},e))})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    fill: "none"
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {[0, 30, 50, -30].map(offset => <div key={offset}>
          <p className="text-xs text-on-surface-variant mb-2">offset: {offset}</p>
          <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={offset} />
        </div>)}
    </div>
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8 p-4">
      {[0, 8, 16].map(gap => <div key={gap}>
          <p className="text-xs text-on-surface-variant mb-2">notchGap: {gap}</p>
          <Notch width={160} height={120} notchWidth={52} notchHeight={46} notchSide="top" notchOffset={-24} radius={12} inverseRadius={10} notchGap={gap} />
        </div>)}
    </div>
}`,...r.parameters?.docs?.source},description:{story:"A shorter notch with the same tip and the same content box: the body's edge drops toward the tip.",...r.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map(side => <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">headOnly — {side}</p>
          <Notch width={160} height={120} notchWidth={60} notchHeight={40} notchSide={side} headOnly />
        </div>)}
    </div>
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map(side => <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">headOnly — {side} — offset 30</p>
          <Notch width={160} height={120} notchWidth={60} notchHeight={40} notchSide={side} notchOffset={30} headOnly />
        </div>)}
    </div>
}`,...h.parameters?.docs?.source}}};const f=["Playground","AllSides","FillOnly","OutlineOnly","WithOffset","WithNotchGap","HeadOnly","HeadOnlyWithOffset"];export{n as AllSides,o as FillOnly,d as HeadOnly,h as HeadOnlyWithOffset,i as OutlineOnly,a as Playground,r as WithNotchGap,c as WithOffset,f as __namedExportsOrder,x as default};
