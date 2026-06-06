import{j as e}from"./iframe-BUCJYnEs.js";import{S as r}from"./StatusIndicator-uC1fghh5.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-Cz-IOiij.js";const p={title:"UI/Notch/Blocks/Status",component:r,parameters:{layout:"centered"}},l=({size:t=110,children:s})=>e.jsx("div",{className:"border border-outline-variant rounded-xl px-2 py-4 text-on-surface",style:{width:t,height:t},children:s}),n={render:()=>e.jsx(l,{children:e.jsx(r,{status:"online",label:"Tunnel",sub:"v0.1.0"})})},a={render:()=>{const t=[{status:"online",label:"Tunnel",sub:"v0.1.0"},{status:"offline",label:"Tunnel",sub:"last seen 2h ago"},{status:"warning",label:"CI",sub:"flaky test"},{status:"error",label:"Health",sub:"3 failures"},{status:"unknown",label:"DNS",sub:"checking..."}];return e.jsx("div",{className:"flex flex-row gap-2",children:t.map(s=>e.jsx(l,{size:120,children:e.jsx(r,{status:s.status,label:s.label,sub:s.sub})},s.status))})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="online" label="Tunnel" sub="v0.1.0" />
    </Wrapper>
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const states: {
      status: StatusLevel;
      label: string;
      sub: string;
    }[] = [{
      status: "online",
      label: "Tunnel",
      sub: "v0.1.0"
    }, {
      status: "offline",
      label: "Tunnel",
      sub: "last seen 2h ago"
    }, {
      status: "warning",
      label: "CI",
      sub: "flaky test"
    }, {
      status: "error",
      label: "Health",
      sub: "3 failures"
    }, {
      status: "unknown",
      label: "DNS",
      sub: "checking..."
    }];
    return <div className="flex flex-row gap-2">
        {states.map(s => <Wrapper key={s.status} size={120}>
            <StatusIndicator status={s.status} label={s.label} sub={s.sub} />
          </Wrapper>)}
      </div>;
  }
}`,...a.parameters?.docs?.source}}};const d=["Online","AllStates"];export{a as AllStates,n as Online,d as __namedExportsOrder,p as default};
