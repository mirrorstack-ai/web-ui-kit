import{j as t}from"./iframe-qStpLu3N.js";import{T as n}from"./Timeline-OLNNUcEr.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Pwdykewk.js";const y={title:"UI/Notch/Blocks/Timeline",component:n,parameters:{layout:"centered"}},o=({children:a,width:e=200,height:i=260})=>t.jsx("div",{className:"border border-outline-variant rounded-xl text-on-surface",style:{width:e,height:i},children:a}),c=[{icon:"download",text:"Installed by My App",time:"2h ago",status:"success"},{icon:"publish",text:"v0.1.0 published",time:"1d ago",status:"success"},{icon:"settings",text:"Config updated",time:"3d ago"},{icon:"delete",text:"Uninstalled from Test App",time:"5d ago",status:"error"},{icon:"code",text:"Created",time:"2w ago"}],r={render:()=>t.jsx(o,{children:t.jsx(n,{entries:c})})},d=Array.from({length:12},(a,e)=>({icon:["sync","edit","visibility","cloud_upload"][e%4],text:`Event #${e+1} — ${["Synced data","Edited config","Viewed logs","Uploaded asset"][e%4]}`,time:`${e+1}h ago`,status:["default","success","warning","error"][e%4]})),s={render:()=>t.jsx(o,{children:t.jsx(n,{entries:d})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Timeline entries={activityEntries} />
    </Wrapper>
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Timeline entries={manyEntries} />
    </Wrapper>
}`,...s.parameters?.docs?.source}}};const g=["Activity","ManyEntries"];export{r as Activity,s as ManyEntries,g as __namedExportsOrder,y as default};
