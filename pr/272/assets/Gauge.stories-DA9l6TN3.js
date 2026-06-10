import{j as e}from"./iframe-DFqMsVVo.js";import{c as b}from"./cn-IyxL_b2c.js";import{d as u}from"./tone-B_C-zL0B.js";import"./preload-helper-PPVm8Dsz.js";const m=2*Math.PI*40;function y(r,t){if(t)return r<t.error?u.error:r<t.warn?u.warning:u.success}function s({value:r,label:t,format:h,thresholds:f,className:g}){const p=Math.max(0,Math.min(100,r)),x=m*(1-p/100),d=y(p,f),w=h??`${r}%`;return e.jsxs("div",{className:b("flex h-full w-full flex-col items-center justify-center",g),children:[e.jsxs("svg",{className:"aspect-square w-full max-w-[80%]",viewBox:"0 0 100 100","aria-hidden":"true",children:[e.jsx("circle",{cx:"50",cy:"50",r:"40",fill:"none",stroke:"currentColor",strokeWidth:"8",opacity:"0.1"}),e.jsx("circle",{cx:"50",cy:"50",r:"40",fill:"none",strokeWidth:"8",strokeLinecap:"round",strokeDasharray:m,strokeDashoffset:x,transform:"rotate(-90 50 50)",...d?{stroke:d,style:{stroke:d}}:{stroke:"currentColor",opacity:.7}}),e.jsx("text",{x:"50",y:"50",textAnchor:"middle",dominantBaseline:"central",fontSize:"18",fontWeight:"bold",fill:"currentColor",children:w})]}),t&&e.jsx("span",{className:"text-center text-xs opacity-60",children:t})]})}s.__docgenInfo={description:"",methods:[],displayName:"Gauge",props:{value:{required:!0,tsType:{name:"number"},description:"0-100"},label:{required:!1,tsType:{name:"string"},description:"Label rendered below the gauge."},format:{required:!1,tsType:{name:"string"},description:"Override display text inside the ring. If omitted: `${value}%`."},thresholds:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  warn: number;
  error: number;
}`,signature:{properties:[{key:"warn",value:{name:"number",required:!0}},{key:"error",value:{name:"number",required:!0}}]}},description:"Color breakpoints. Above `warn` is success, below `warn` is warning, below `error` is error."},className:{required:!1,tsType:{name:"string"},description:""}}};const S={title:"UI/Blocks/Gauge",component:s,parameters:{layout:"centered"}},l=r=>e.jsx("div",{className:"h-[200px] w-[200px] rounded-xl border border-outline-variant px-2 py-4 text-on-surface",children:r}),a={render:()=>l(e.jsx(s,{value:99.94,label:"Uptime",format:"99.94%",thresholds:{warn:99,error:95}}))},o={render:()=>l(e.jsx(s,{value:72,label:"Docs coverage",thresholds:{warn:80,error:50}}))},n={render:()=>l(e.jsx(s,{value:34,label:"Error budget",format:"34%",thresholds:{warn:50,error:20}}))},i={render:()=>l(e.jsx(s,{value:100,label:"Health"}))},c={render:()=>l(e.jsx(s,{value:12,label:"SLA",thresholds:{warn:50,error:25}}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={99.94} label="Uptime" format="99.94%" thresholds={{
    warn: 99,
    error: 95
  }} />)
}`,...a.parameters?.docs?.source},description:{story:"High uptime with custom format string.",...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={72} label="Docs coverage" thresholds={{
    warn: 80,
    error: 50
  }} />)
}`,...o.parameters?.docs?.source},description:{story:"Docs coverage sitting below the warn threshold.",...o.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={34} label="Error budget" format="34%" thresholds={{
    warn: 50,
    error: 20
  }} />)
}`,...n.parameters?.docs?.source},description:{story:"Error budget in the warning zone.",...n.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={100} label="Health" />)
}`,...i.parameters?.docs?.source},description:{story:"Full health, no thresholds needed.",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => wrap(<Gauge value={12} label="SLA" thresholds={{
    warn: 50,
    error: 25
  }} />)
}`,...c.parameters?.docs?.source},description:{story:"Critical SLA below the error threshold.",...c.parameters?.docs?.description}}};const E=["Uptime","DocsScore","ErrorBudget","Full","Critical"];export{c as Critical,o as DocsScore,n as ErrorBudget,i as Full,a as Uptime,E as __namedExportsOrder,S as default};
