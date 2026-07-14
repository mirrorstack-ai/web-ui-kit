import{j as a}from"./iframe-CtVxCYeZ.js";import{S as e}from"./Sparkline-CEuZTrYA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DswA_UWB.js";import"./index-sUACj2CU.js";import"./cn-IyxL_b2c.js";const b={title:"UI/Blocks/Sparkline",component:e,args:{data:[38,62,50,78,55,70,90,60,75,95,85,100]},argTypes:{data:{control:"object"},variant:{control:"inline-radio",options:["bar","line","area"]},strokeWidth:{control:{type:"number",min:.5,max:8,step:.5}},opacity:{control:{type:"number",min:0,max:1,step:.05}}}},s=[470,760,600,950,680,870,1100,740,920,1180,1050,1240].map((r,c)=>({value:Math.round(r/1240*100),label:`Wk ${c+1} · ${r.toLocaleString()}`})),n={render:r=>a.jsx("div",{className:"bg-background p-6",children:a.jsx("div",{className:"h-28 w-64 rounded-2xl border border-outline-variant p-3",children:a.jsx(e,{...r,className:"h-full"})})})},t={render:()=>a.jsxs("div",{className:"flex flex-wrap items-start gap-6 bg-background p-6",children:[a.jsx("div",{className:"h-24 w-64 rounded-2xl bg-surface-container-low p-3",children:a.jsx(e,{data:s,className:"h-full"})}),a.jsx("div",{className:"h-24 w-64 rounded-2xl bg-primary-container p-3",children:a.jsx(e,{data:s,className:"h-full",barClassName:"bg-on-primary-container/25",barActiveClassName:"bg-on-primary-container/55"})}),a.jsx("div",{className:"h-40 w-80 rounded-2xl bg-surface-container p-4",children:a.jsx(e,{data:s,className:"h-full",barClassName:"bg-primary/40",barActiveClassName:"bg-primary/70"})})]})},i={args:{variant:"line"},render:r=>a.jsx("div",{className:"bg-background p-6",children:a.jsx("div",{className:"h-28 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{...r,className:"h-full"})})})},l={args:{variant:"area"},render:r=>a.jsx("div",{className:"bg-background p-6",children:a.jsx("div",{className:"h-28 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{...r,className:"h-full"})})})},d={args:{variant:"line",strokeWidth:3,opacity:1},render:r=>a.jsxs("div",{className:"flex flex-wrap items-start gap-6 bg-background p-6",children:[a.jsxs("div",{className:"space-y-1",children:[a.jsx("span",{className:"text-xs text-on-surface-variant",children:"Defaults"}),a.jsx("div",{className:"h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{data:s,variant:"line",className:"h-full"})})]}),a.jsxs("div",{className:"space-y-1",children:[a.jsx("span",{className:"text-xs text-on-surface-variant",children:"strokeWidth=3, opacity=1"}),a.jsx("div",{className:"h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{...r,data:s,className:"h-full"})})]}),a.jsxs("div",{className:"space-y-1",children:[a.jsx("span",{className:"text-xs text-on-surface-variant",children:"Area · strokeWidth=2.5, opacity=0.9"}),a.jsx("div",{className:"h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{data:s,variant:"area",strokeWidth:2.5,opacity:.9,className:"h-full"})})]})]})},o={render:()=>a.jsxs("div",{className:"flex flex-wrap items-start gap-6 bg-background p-6",children:[a.jsxs("div",{className:"space-y-1",children:[a.jsx("span",{className:"text-xs text-on-surface-variant",children:"Bar"}),a.jsx("div",{className:"h-24 w-64 rounded-2xl border border-outline-variant p-3",children:a.jsx(e,{data:s,variant:"bar",className:"h-full"})})]}),a.jsxs("div",{className:"space-y-1",children:[a.jsx("span",{className:"text-xs text-on-surface-variant",children:"Line"}),a.jsx("div",{className:"h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{data:s,variant:"line",className:"h-full"})})]}),a.jsxs("div",{className:"space-y-1",children:[a.jsx("span",{className:"text-xs text-on-surface-variant",children:"Area"}),a.jsx("div",{className:"h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary",children:a.jsx(e,{data:s,variant:"area",className:"h-full"})})]})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"A `Sparkline` fills its container — drop it in any sized box. Hover a bar.",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="h-24 w-64 rounded-2xl bg-surface-container-low p-3">
        <Sparkline data={LABELLED} className="h-full" />
      </div>
      <div className="h-24 w-64 rounded-2xl bg-primary-container p-3">
        <Sparkline data={LABELLED} className="h-full" barClassName="bg-on-primary-container/25" barActiveClassName="bg-on-primary-container/55" />
      </div>
      <div className="h-40 w-80 rounded-2xl bg-surface-container p-4">
        <Sparkline data={LABELLED} className="h-full" barClassName="bg-primary/40" barActiveClassName="bg-primary/70" />
      </div>
    </div>
}`,...t.parameters?.docs?.source},description:{story:'Bar / hover colours are passed via `barClassName` / `barActiveClassName`, so\n a sparkline reads well on whatever surface it sits on. (Give it a height —\n it fills its container; here via `className="h-full"`.)',...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "line"
  },
  render: args => <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Smooth line — no hover chips, just a stroke that follows the data.",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "area"
  },
  render: args => <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
}`,...l.parameters?.docs?.source},description:{story:"Filled area beneath the line for at-a-glance trend weight.",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "line",
    strokeWidth: 3,
    opacity: 1
  },
  render: args => <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Defaults</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="line" className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">strokeWidth=3, opacity=1</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline {...args} data={LABELLED} className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Area · strokeWidth=2.5, opacity=0.9</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="area" strokeWidth={2.5} opacity={0.9} className="h-full" />
        </div>
      </div>
    </div>
}`,...d.parameters?.docs?.source},description:{story:"`strokeWidth` (px, non-scaling) and `opacity` (0–1) tune the line stroke.\n Defaults match the previous hardcoded look (`1.5` / `0.6` line, `0.5` area);\n the area fill keeps its fixed `0.15` opacity regardless.",...d.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-start gap-6 bg-background p-6">
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Bar</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3">
          <Sparkline data={LABELLED} variant="bar" className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Line</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="line" className="h-full" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">Area</span>
        <div className="h-24 w-64 rounded-2xl border border-outline-variant p-3 text-primary">
          <Sparkline data={LABELLED} variant="area" className="h-full" />
        </div>
      </div>
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All three variants side-by-side for comparison.",...o.parameters?.docs?.description}}};const N=["Playground","Tones","Line","Area","StrokeAndOpacity","AllVariants"];export{o as AllVariants,l as Area,i as Line,n as Playground,d as StrokeAndOpacity,t as Tones,N as __namedExportsOrder,b as default};
