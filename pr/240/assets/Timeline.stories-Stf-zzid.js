import{j as t}from"./iframe-BELSMW0y.js";import{T as n}from"./Timeline-CKQ7ua10.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DaR-u2x5.js";const h={title:"UI/Notch/Blocks/Timeline",component:n,parameters:{layout:"centered"}},i=({children:a,width:e=300,height:c=300})=>t.jsx("div",{className:"border border-outline-variant rounded-xl text-on-surface",style:{width:e,height:c},children:a}),d=[{icon:"download",text:"Installed by My App",time:"2h ago",status:"success"},{icon:"publish",text:"v0.1.0 published",time:"1d ago",status:"success"},{icon:"settings",text:"Config updated",time:"3d ago"},{icon:"delete",text:"Uninstalled from Test App",time:"5d ago",status:"error"},{icon:"code",text:"Created",time:"2w ago"}],r={render:()=>t.jsx(i,{children:t.jsx(n,{entries:d})})},p=[{icon:"rocket_launch",text:"Deployed to production",time:"10m ago",status:"success"},{icon:"build",text:"Build completed",time:"15m ago",status:"success"},{icon:"error",text:"Build failed — retrying",time:"20m ago",status:"error"},{icon:"play_arrow",text:"Deploy triggered",time:"25m ago"}],s={render:()=>t.jsx(i,{height:250,children:t.jsx(n,{entries:p})})},m=Array.from({length:12},(a,e)=>({icon:["sync","edit","visibility","cloud_upload"][e%4],text:`Event #${e+1} — ${["Synced data","Edited config","Viewed logs","Uploaded asset"][e%4]}`,time:`${e+1}h ago`,status:["default","success","warning","error"][e%4]})),o={render:()=>t.jsx(i,{children:t.jsx(n,{entries:m})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Timeline entries={activityEntries} />
    </Wrapper>
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper height={250}>
      <Timeline entries={deployEntries} />
    </Wrapper>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Timeline entries={manyEntries} />
    </Wrapper>
}`,...o.parameters?.docs?.source}}};const E=["Activity","DeployLog","ManyEntries"];export{r as Activity,s as DeployLog,o as ManyEntries,E as __namedExportsOrder,h as default};
