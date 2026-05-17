import{j as a}from"./iframe-D1o4m_AD.js";import{S as s}from"./Sparkline-CYIKKnDI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D5FwODzn.js";import"./index-C7UDeRxC.js";import"./cn-IyxL_b2c.js";const u={title:"UI/Chart/Sparkline",component:s,args:{data:[38,62,50,78,55,70,90,60,75,95,85,100]},argTypes:{data:{control:"object"}}},i=[470,760,600,950,680,870,1100,740,920,1180,1050,1240].map((n,l)=>({value:Math.round(n/1240*100),label:`Wk ${l+1} · ${n.toLocaleString()}`})),r={render:n=>a.jsx("div",{className:"bg-background p-6",children:a.jsx("div",{className:"h-28 w-64 rounded-2xl border border-outline-variant p-3",children:a.jsx(s,{...n,className:"h-full"})})})},e={render:()=>a.jsxs("div",{className:"flex flex-wrap items-start gap-6 bg-background p-6",children:[a.jsx("div",{className:"h-24 w-64 rounded-2xl bg-surface-container-low p-3",children:a.jsx(s,{data:i,className:"h-full"})}),a.jsx("div",{className:"h-24 w-64 rounded-2xl bg-primary-container p-3",children:a.jsx(s,{data:i,className:"h-full",barClassName:"bg-on-primary-container/25",barActiveClassName:"bg-on-primary-container/55"})}),a.jsx("div",{className:"h-40 w-80 rounded-2xl bg-surface-container p-4",children:a.jsx(s,{data:i,className:"h-full",barClassName:"bg-primary/40",barActiveClassName:"bg-primary/70"})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <div className="bg-background p-6">
      <div className="h-28 w-64 rounded-2xl border border-outline-variant p-3">
        <Sparkline {...args} className="h-full" />
      </div>
    </div>
}`,...r.parameters?.docs?.source},description:{story:"A `Sparkline` fills its container — drop it in any sized box. Hover a bar.",...r.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source},description:{story:'Bar / hover colours are passed via `barClassName` / `barActiveClassName`, so\n a sparkline reads well on whatever surface it sits on. (Give it a height —\n it fills its container; here via `className="h-full"`.)',...e.parameters?.docs?.description}}};const b=["Playground","Tones"];export{r as Playground,e as Tones,b as __namedExportsOrder,u as default};
