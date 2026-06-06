import{j as r}from"./iframe-C-V_RQS7.js";import{G as e}from"./Gauge-BmspVzc3.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const u={title:"UI/Notch/Blocks/Gauge",component:e,parameters:{layout:"centered"}},c=d=>r.jsx("div",{className:"h-[200px] w-[200px] rounded-xl border border-outline-variant p-2 text-on-surface",children:d}),o={render:()=>c(r.jsx(e,{value:99.94,label:"Uptime",format:"99.94%",thresholds:{warn:99,error:95}}))},a={render:()=>c(r.jsx(e,{value:72,label:"Docs coverage",thresholds:{warn:80,error:50}}))},s={render:()=>c(r.jsx(e,{value:34,label:"Error budget",format:"34%",thresholds:{warn:50,error:20}}))},t={render:()=>c(r.jsx(e,{value:100,label:"Health"}))},n={render:()=>c(r.jsx(e,{value:12,label:"SLA",thresholds:{warn:50,error:25}}))};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={99.94} label="Uptime" format="99.94%" thresholds={{
    warn: 99,
    error: 95
  }} />)
}`,...o.parameters?.docs?.source},description:{story:"High uptime with custom format string.",...o.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={72} label="Docs coverage" thresholds={{
    warn: 80,
    error: 50
  }} />)
}`,...a.parameters?.docs?.source},description:{story:"Docs coverage sitting below the warn threshold.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={34} label="Error budget" format="34%" thresholds={{
    warn: 50,
    error: 20
  }} />)
}`,...s.parameters?.docs?.source},description:{story:"Error budget in the warning zone.",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={100} label="Health" />)
}`,...t.parameters?.docs?.source},description:{story:"Full health, no thresholds needed.",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={12} label="SLA" thresholds={{
    warn: 50,
    error: 25
  }} />)
}`,...n.parameters?.docs?.source},description:{story:"Critical SLA below the error threshold.",...n.parameters?.docs?.description}}};const h=["Uptime","DocsScore","ErrorBudget","Full","Critical"];export{n as Critical,a as DocsScore,s as ErrorBudget,t as Full,o as Uptime,h as __namedExportsOrder,u as default};
