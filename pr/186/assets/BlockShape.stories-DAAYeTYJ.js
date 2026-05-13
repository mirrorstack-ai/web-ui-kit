import{j as e}from"./iframe-Kctdwder.js";import{I as l}from"./Icon-CGLqEm2e.js";import{B as i}from"./BlockShape-i04vuIhv.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const f={title:"UI/Notch/BlockShape",component:i,args:{shape:[[0,1,1,1],[1,1,1,1],[1,1,1,0]],tier:1,block:96,gap:0,radius:24,inverseRadius:32,strokeWidth:1},argTypes:{shape:{control:"object"},tier:{control:{type:"range",min:1,max:4,step:1}},block:{control:{type:"range",min:40,max:140,step:4}},gap:{control:{type:"range",min:0,max:40,step:2}},radius:{control:{type:"range",min:0,max:44,step:1}},inverseRadius:{control:{type:"range",min:0,max:48,step:1}},strokeWidth:{control:{type:"range",min:0,max:4,step:.5}}}},t={render:a=>e.jsx(i,{...a,children:e.jsxs("div",{className:"flex h-full flex-col justify-between text-on-surface",children:[e.jsx(l,{name:"dashboard",size:20,className:"text-primary"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Edit the `shape` matrix"}),e.jsx("p",{className:"text-lg font-medium",children:"Notched block"})]})]})})},p={Rect:[[1,1,1],[1,1,1]],"User example":[[0,1,1,1],[1,1,1,1],[1,1,1,0]],"L-shape":[[1,0,0],[1,0,0],[1,1,1]],Plus:[[0,1,0],[1,1,1],[0,1,0]],"Edge notch":[[1,1,1,1],[1,1,0,0],[1,1,1,1]],Donut:[[1,1,1],[1,0,1],[1,1,1]],Staircase:[[1,0,0],[1,1,0],[0,1,1],[0,0,1]]},n={render:()=>e.jsx("div",{className:"flex flex-wrap items-start gap-8 p-4",children:Object.entries(p).map(([a,s])=>e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(i,{shape:s,children:e.jsx("span",{className:"text-xs text-on-surface-variant",children:a})}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:a})]},a))})},o={args:{fill:"none",stroke:"var(--color-primary)",strokeWidth:1.5}},c={args:{stroke:"none",fill:"var(--color-primary-container)"}},r={render:()=>{const a=[[0,1,1,2,2],[1,1,1,2,2],[1,1,1,3,3],[0,1,1,3,3]];return e.jsx("div",{className:"flex flex-wrap items-start gap-10 p-4",children:[1,2,3].map(s=>e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(i,{shape:a,tier:s,block:72,children:e.jsxs("span",{className:"text-xs text-on-surface-variant",children:["tier ",s]})}),e.jsxs("p",{className:"text-xs text-on-surface-variant",children:["tier = ",s]})]},s))})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <BlockShape {...args}>
      <div className="flex h-full flex-col justify-between text-on-surface">
        <Icon name="dashboard" size={20} className="text-primary" />
        <div>
          <p className="text-xs text-on-surface-variant">Edit the \`shape\` matrix</p>
          <p className="text-lg font-medium">Notched block</p>
        </div>
      </div>
    </BlockShape>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-start gap-8 p-4">
      {Object.entries(SHAPES).map(([name, shape]) => <div key={name} className="flex flex-col items-center gap-2">
          <BlockShape shape={shape}>
            <span className="text-xs text-on-surface-variant">{name}</span>
          </BlockShape>
          <p className="text-xs text-on-surface-variant">{name}</p>
        </div>)}
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fill: "none",
    stroke: "var(--color-primary)",
    strokeWidth: 1.5
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    stroke: "none",
    fill: "var(--color-primary-container)"
  }
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const shape = [[0, 1, 1, 2, 2], [1, 1, 1, 2, 2], [1, 1, 1, 3, 3], [0, 1, 1, 3, 3]];
    return <div className="flex flex-wrap items-start gap-10 p-4">
        {[1, 2, 3].map(tier => <div key={tier} className="flex flex-col items-center gap-2">
            <BlockShape shape={shape} tier={tier} block={72}>
              <span className="text-xs text-on-surface-variant">tier {tier}</span>
            </BlockShape>
            <p className="text-xs text-on-surface-variant">tier = {tier}</p>
          </div>)}
      </div>;
  }
}`,...r.parameters?.docs?.source},description:{story:"Same shape rendered at each tier — cells marked 2 / 3 join as space unlocks.",...r.parameters?.docs?.description}}};const v=["Playground","Gallery","Outlined","FilledNoStroke","ResponsiveTiers"];export{c as FilledNoStroke,n as Gallery,o as Outlined,t as Playground,r as ResponsiveTiers,v as __namedExportsOrder,f as default};
