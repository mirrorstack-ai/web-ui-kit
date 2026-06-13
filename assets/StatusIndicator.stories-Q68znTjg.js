import{j as e}from"./iframe-C31rK0Md.js";import{c}from"./cn-IyxL_b2c.js";import{I as b}from"./Icon-P09SxugT.js";import"./preload-helper-PPVm8Dsz.js";const x={online:"var(--color-success)",warning:"var(--color-warning)",error:"var(--color-error)",offline:"currentColor",unknown:"currentColor"},h={online:!0,warning:!0,error:!1,offline:!1,unknown:!1},g={online:"Online",offline:"Offline",warning:"Warning",error:"Error",unknown:"Unknown"};function t({status:n,label:s,sub:o,icon:i,pulse:p,className:m}){const l=x[n],f=p??h[n],u=g[n];return e.jsxs("div",{className:c("h-full w-full flex flex-col justify-between",m),role:"status",children:[e.jsx("span",{className:"sr-only",children:`Status: ${u}`}),e.jsx("div",{children:i?e.jsx("span",{style:{color:l},"aria-label":u,children:e.jsx(b,{name:i,size:20})}):e.jsxs("div",{className:"relative h-4 w-4",children:[f&&e.jsx("span",{className:"absolute inset-0 rounded-full animate-pulse",style:{backgroundColor:l,opacity:.3},"aria-hidden":"true"}),e.jsx("span",{className:c("absolute top-1 left-1 h-2 w-2 rounded-full",n==="offline"&&"opacity-30",n==="unknown"&&"opacity-20"),style:{backgroundColor:l},"aria-hidden":"true"})]})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-xs opacity-60 truncate",children:s}),o&&e.jsx("p",{className:"text-[10px] opacity-40 truncate",children:o})]})]})}t.__docgenInfo={description:"",methods:[],displayName:"StatusIndicator",props:{status:{required:!0,tsType:{name:"union",raw:`| "online"
| "offline"
| "warning"
| "error"
| "unknown"`,elements:[{name:"literal",value:'"online"'},{name:"literal",value:'"offline"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'},{name:"literal",value:'"unknown"'}]},description:""},label:{required:!0,tsType:{name:"string"},description:""},sub:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"string"},description:"Material Symbols icon name — replaces the status dot"},pulse:{required:!1,tsType:{name:"boolean"},description:"Animate the dot. Defaults to true for online and warning."},className:{required:!1,tsType:{name:"string"},description:""}}};const k={title:"UI/Blocks/Status",component:t,parameters:{layout:"centered"}},d=({size:n=110,children:s})=>e.jsx("div",{className:"border border-outline-variant rounded-xl px-2 py-4 text-on-surface",style:{width:n,height:n},children:s}),a={render:()=>e.jsx(d,{children:e.jsx(t,{status:"online",label:"Tunnel",sub:"v0.1.0"})})},r={render:()=>{const n=[{status:"online",label:"Tunnel",sub:"v0.1.0"},{status:"offline",label:"Tunnel",sub:"last seen 2h ago"},{status:"warning",label:"CI",sub:"flaky test"},{status:"error",label:"Health",sub:"3 failures"},{status:"unknown",label:"DNS",sub:"checking..."}];return e.jsx("div",{className:"flex flex-row gap-2",children:n.map(s=>e.jsx(d,{size:120,children:e.jsx(t,{status:s.status,label:s.label,sub:s.sub})},s.status))})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <StatusIndicator status="online" label="Tunnel" sub="v0.1.0" />
    </Wrapper>
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const N=["Online","AllStates"];export{r as AllStates,a as Online,N as __namedExportsOrder,k as default};
