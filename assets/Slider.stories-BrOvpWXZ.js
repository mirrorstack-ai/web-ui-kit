import{j as e,r as u}from"./iframe-CLRdurlR.js";import{S as n}from"./Slider-_WnsHcDH.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const h={title:"UI/Inputs/Slider",component:n,decorators:[o=>e.jsx("div",{style:{width:240},children:e.jsx(o,{})})]},i=({initial:o,min:d,max:c,step:m})=>{const[l,p]=u.useState(o);return e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"text-sm text-on-surface-variant text-right tabular-nums",children:l}),e.jsx(n,{value:l,onChange:p,min:d,max:c,step:m,"aria-label":"Demo slider"})]})},r={render:()=>e.jsx(i,{initial:40})},a={render:()=>e.jsx(i,{initial:8,min:4,max:20,step:1})},s={render:()=>e.jsx(i,{initial:1,min:.5,max:3,step:.1})},t={render:()=>e.jsx(n,{value:30,onChange:()=>{},disabled:!0,"aria-label":"Disabled"})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled initial={40} />
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled initial={8} min={4} max={20} step={1} />
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Controlled initial={1} min={0.5} max={3} step={0.1} />
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Slider value={30} onChange={() => {}} disabled aria-label="Disabled" />
}`,...t.parameters?.docs?.source}}};const g=["Default","WithBounds","FloatStep","Disabled"];export{r as Default,t as Disabled,s as FloatStep,a as WithBounds,g as __namedExportsOrder,h as default};
