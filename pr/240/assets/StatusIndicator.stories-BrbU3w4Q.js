import{j as e}from"./iframe-BELSMW0y.js";import{S as s}from"./StatusIndicator-DATBQ8kB.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DaR-u2x5.js";const x={title:"UI/Notch/Blocks/Status",component:s,parameters:{layout:"centered"}},a=({size:n=150,children:r})=>e.jsx("div",{className:"border border-outline-variant rounded-xl p-2 text-on-surface",style:{width:n,height:n},children:r}),t={render:()=>e.jsx(a,{children:e.jsx(s,{status:"online",label:"Tunnel",sub:"v0.1.0"})})},l={render:()=>e.jsx(a,{children:e.jsx(s,{status:"offline",label:"Tunnel",sub:"last seen 2h ago"})})},o={render:()=>e.jsx(a,{children:e.jsx(s,{status:"warning",label:"CI",sub:"flaky test"})})},u={render:()=>e.jsx(a,{children:e.jsx(s,{status:"error",label:"Health",sub:"3 failures"})})},c={render:()=>e.jsx(a,{children:e.jsx(s,{status:"online",icon:"cloud_done",label:"Deployed",sub:"us-east-1"})})},i={render:()=>{const n=[{status:"online",label:"Tunnel",sub:"v0.1.0"},{status:"offline",label:"Tunnel",sub:"last seen 2h ago"},{status:"warning",label:"CI",sub:"flaky test"},{status:"error",label:"Health",sub:"3 failures"},{status:"unknown",label:"DNS",sub:"checking..."}];return e.jsx("div",{className:"flex flex-row gap-2",children:n.map(r=>e.jsx(a,{size:120,children:e.jsx(s,{status:r.status,label:r.label,sub:r.sub})},r.status))})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="online" label="Tunnel" sub="v0.1.0" />
    </Wrapper>
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="offline" label="Tunnel" sub="last seen 2h ago" />
    </Wrapper>
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="warning" label="CI" sub="flaky test" />
    </Wrapper>
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="error" label="Health" sub="3 failures" />
    </Wrapper>
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="online" icon="cloud_done" label="Deployed" sub="us-east-1" />
    </Wrapper>
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const g=["Online","Offline","Warning","Error","WithIcon","AllStates"];export{i as AllStates,u as Error,l as Offline,t as Online,o as Warning,c as WithIcon,g as __namedExportsOrder,x as default};
