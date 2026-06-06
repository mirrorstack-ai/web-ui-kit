import{j as t}from"./iframe-BqIS6DQv.js";import{T as n}from"./Timeline-DVoDiVHU.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-CYnEGxzf.js";const y={title:"UI/Notch/Blocks/Timeline",component:n,parameters:{layout:"centered"}},i=({children:o,width:e=200,height:a=260})=>t.jsx("div",{className:"border border-outline-variant rounded-xl text-on-surface px-2 py-4",style:{width:e,height:a},children:o}),c=[{icon:"download",text:"Installed by My App",time:"2h ago",status:"success"},{icon:"publish",text:"v0.1.0 published",time:"1d ago",status:"success"},{icon:"settings",text:"Config updated",time:"3d ago"},{icon:"delete",text:"Uninstalled from Test App",time:"5d ago",status:"error"},{icon:"code",text:"Created",time:"2w ago"}],r={render:()=>t.jsx(i,{children:t.jsx(n,{entries:c})})},d=Array.from({length:12},(o,e)=>({icon:["sync","edit","visibility","cloud_upload"][e%4],text:`Event #${e+1} — ${["Synced data","Edited config","Viewed logs","Uploaded asset"][e%4]}`,time:`${e+1}h ago`})),s={render:()=>t.jsx(i,{children:t.jsx(n,{entries:d})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Timeline entries={activityEntries} />
    </Wrapper>
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Timeline entries={manyEntries} />
    </Wrapper>
}`,...s.parameters?.docs?.source}}};const g=["Activity","ManyEntries"];export{r as Activity,s as ManyEntries,g as __namedExportsOrder,y as default};
