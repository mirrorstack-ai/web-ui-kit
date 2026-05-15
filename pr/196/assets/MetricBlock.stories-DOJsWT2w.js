import{j as e}from"./iframe-CwiNDzEN.js";import{c as s}from"./cn-IyxL_b2c.js";import{I as v}from"./Icon-C9Q7zA0w.js";import{S as P}from"./Sparkline-Ds944jww.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C-iqanTX.js";const U={surface:{icon:"text-primary",label:"text-on-surface-variant",value:"text-on-surface",bar:"bg-primary/30 hover:bg-primary/60",barActive:"bg-primary/60",divider:"border-outline-variant"},primary:{icon:"text-on-primary-container",label:"text-on-primary-container/70",value:"text-on-primary-container",bar:"bg-on-primary-container/25 hover:bg-on-primary-container/55",barActive:"bg-on-primary-container/55",divider:"border-on-primary-container/20"}},E={up:"text-success",down:"text-error"},R=(a,l)=>l??(typeof a=="string"&&/^[-−]/.test(a.trim())?"down":"up");function t({icon:a,label:l,value:c,delta:o,deltaTrend:u,hint:T,chart:y,stats:w,layout:j="stacked",tone:A="surface",className:p}){const n=U[A],z=R(o,u),N=!!y&&y.length>0,m=o!=null&&e.jsx("span",{className:s("shrink-0 text-xs font-medium",E[z]),children:o}),x=r=>N?e.jsx(P,{data:y,barClassName:n.bar,barActiveClassName:n.barActive,className:r}):null,h=r=>T!=null?e.jsx("p",{className:s("truncate text-xs",n.label,r),children:T}):null,C=!!w&&w.length>0,$=C?e.jsx("div",{className:s("flex gap-3 border-t pt-2",n.divider),children:w.map((r,_)=>{const L=R(r.delta,r.deltaTrend);return e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:s("truncate text-[10px]",n.label),children:r.label}),e.jsxs("p",{className:s("truncate text-sm font-medium",n.value),children:[r.value,r.delta!=null&&e.jsx("span",{className:s("ml-1 text-[10px] font-medium",E[L]),children:r.delta})]})]},_)})}):null,k=r=>c!=null?e.jsx("p",{className:s(r,n.value),children:c}):null;let d;return j==="wide"?d=e.jsxs("div",{className:s("flex h-full items-center gap-3",p),children:[a?e.jsx(v,{name:a,size:24,className:n.icon}):null,e.jsxs("div",{className:"min-w-0",children:[e.jsxs("div",{className:"flex items-baseline gap-2",children:[e.jsx("p",{className:s("truncate text-xs",n.label),children:l}),!N&&m]}),k("text-2xl font-semibold leading-tight"),h()]}),x("ml-auto h-2/3 w-[42%] self-center")]}):j==="chart"?d=e.jsxs("div",{className:s("flex h-full flex-col gap-2",p),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[a?e.jsx(v,{name:a,size:20,className:n.icon}):null,e.jsx("p",{className:s("min-w-0 flex-1 truncate text-sm font-medium",n.label),children:l}),m]}),x("flex-1"),C?$:h("mt-auto")]}):j==="bigcard"?d=e.jsxs("div",{className:s("flex h-full flex-col gap-2",p),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[a?e.jsx(v,{name:a,size:20,className:n.icon}):null,e.jsx("p",{className:s("min-w-0 flex-1 truncate text-sm font-medium",n.label),children:l}),m]}),e.jsxs("div",{className:"flex flex-1 items-end gap-3",children:[k("shrink-0 text-3xl font-semibold leading-none"),x("h-full flex-1")]}),C?$:h("mt-auto")]}):j==="card"?d=e.jsxs("div",{className:s("flex h-full flex-col gap-2",p),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[a?e.jsx(v,{name:a,size:20,className:n.icon}):null,e.jsx("p",{className:s("min-w-0 flex-1 truncate text-sm font-medium",n.label),children:l}),m]}),k("text-3xl font-semibold leading-none"),x("mt-1 flex-1"),h(N?void 0:"mt-auto")]}):d=e.jsxs("div",{className:s("flex h-full flex-col gap-2",p),children:[e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[a?e.jsx(v,{name:a,size:18,className:n.icon}):e.jsx("span",{"aria-hidden":"true"}),m]}),x("flex-1"),e.jsxs("div",{className:N?void 0:"mt-auto",children:[e.jsx("p",{className:s("text-xs",n.label),children:l}),k("text-lg font-medium leading-tight"),h("mt-0.5")]})]}),d}const H={title:"UI/Notch/Blocks/Metric",component:t,args:{icon:"apps",label:"Installs",value:"1,240",delta:"+18%",tone:"surface"},argTypes:{tone:{control:"inline-radio",options:["surface","primary"]},deltaTrend:{control:"inline-radio",options:[void 0,"up","down"]},icon:{control:"text"},delta:{control:"text"},hint:{control:"text"}}},b={render:a=>e.jsx("div",{className:"bg-background p-6",children:e.jsx("div",{className:"size-24 rounded-2xl bg-surface-container-low p-4",children:e.jsx(t,{...a})})})},M=(a,l)=>{const c=Math.max(...a);return a.map((o,u)=>({value:Math.round(o/c*100),label:l(o,u+1)}))},S=M([470,760,600,950,680,870,1100,740,920,1180,1050,1240],(a,l)=>`Wk ${l} · ${a.toLocaleString()} installs`),I=M([3.8,5.1,4.4,6.8,5.2,7,9.2,6.1,7.8,9.9,8.7,12.4],(a,l)=>`Wk ${l} · $${a}k`),B=M([1.2,1.6,1.4,1.9,1.7,2,1.8,2.3,2,2.5,2.2,2.1],(a,l)=>`Wk ${l} · ${a}k req/min`),i=({cols:a=1,rows:l=1,pad:c=4,tone:o="surface",children:u})=>e.jsx("div",{className:`rounded-2xl ${o==="primary"?"bg-primary-container":"bg-surface-container-low"} ${c===6?"p-6":"p-4"}`,style:{gridColumn:`span ${a}`,gridRow:`span ${l}`},children:u}),g={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs("div",{className:"grid auto-rows-[96px] grid-cols-[repeat(6,96px)] gap-2",children:[e.jsx(i,{cols:3,rows:2,pad:6,tone:"primary",children:e.jsx(t,{layout:"bigcard",icon:"apps",label:"Installs",value:"1,240",delta:"+18%",chart:S,stats:[{label:"This week",value:"1,240",delta:"+18%"},{label:"MTD",value:"4,180",delta:"+11%"},{label:"Conversion",value:"3.2%",delta:"-0.4%"}],tone:"primary"})}),e.jsx(i,{cols:2,rows:2,pad:6,children:e.jsx(t,{layout:"card",icon:"payments",label:"Revenue",value:"$12.4k",delta:"+22%",hint:"vs $10.2k / 30d ago",chart:I})}),e.jsx(i,{cols:3,children:e.jsx(t,{layout:"wide",icon:"speed",label:"Throughput",value:"2.1k/s",delta:"+9%",chart:B})}),e.jsx(i,{children:e.jsx(t,{icon:"error",label:"Churn",value:"3",delta:"-12%"})}),e.jsx(i,{cols:2,children:e.jsx(t,{layout:"wide",icon:"schedule",label:"Avg latency",value:"142ms",delta:"-8%",hint:"p99 312ms"})}),e.jsx(i,{rows:2,children:e.jsx(t,{icon:"trending_up",label:"Req / min",value:"2.1k",delta:"+9%",chart:B})}),e.jsx(i,{children:e.jsx(t,{icon:"groups",label:"Tenants",value:"37",delta:"+2"})}),e.jsx(i,{children:e.jsx(t,{icon:"bolt",label:"Cold starts",value:"3",delta:"-1"})}),e.jsx(i,{children:e.jsx(t,{icon:"new_releases",label:"Version",value:"v0.3.1"})})]})})},f={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs("div",{className:"grid auto-rows-[96px] grid-cols-[repeat(7,96px)] gap-2",children:[e.jsx(i,{cols:3,rows:3,pad:6,children:e.jsx(t,{layout:"chart",icon:"payments",label:"Revenue",delta:"+22%",chart:I,stats:[{label:"This week",value:"$12.4k",delta:"+22%"},{label:"MTD",value:"$41.8k",delta:"+9%"},{label:"ARPU",value:"$8.40",delta:"+3%"}]})}),e.jsx(i,{cols:4,rows:3,pad:6,tone:"primary",children:e.jsx(t,{layout:"chart",icon:"apps",label:"Installs",delta:"+18%",chart:S,stats:[{label:"This week",value:"1,240",delta:"+18%"},{label:"Month-to-date",value:"4,180",delta:"+11%"},{label:"Conversion",value:"3.2%",delta:"-0.4%"},{label:"Per tenant",value:"33.5",delta:"+2%"}],tone:"primary"})})]})})};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <div className="bg-background p-6">
      <div className="size-24 rounded-2xl bg-surface-container-low p-4">
        <MetricBlock {...args} />
      </div>
    </div>
}`,...b.parameters?.docs?.source},description:{story:"Standalone, in a 96px (`size-24`) box — the natural 1×1 footprint.",...b.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="bg-background p-6">
      <div className="grid auto-rows-[96px] grid-cols-[repeat(6,96px)] gap-2">
        {/* 3×2 — bigcard: header · big number · chart · sub-stats */}
        <Cell cols={3} rows={2} pad={6} tone="primary">
          <MetricBlock layout="bigcard" icon="apps" label="Installs" value="1,240" delta="+18%" chart={INSTALLS} stats={[{
          label: "This week",
          value: "1,240",
          delta: "+18%"
        }, {
          label: "MTD",
          value: "4,180",
          delta: "+11%"
        }, {
          label: "Conversion",
          value: "3.2%",
          delta: "-0.4%"
        }]} tone="primary" />
        </Cell>
        {/* 2×2 — card: header + big value + chart filling the rest */}
        <Cell cols={2} rows={2} pad={6}>
          <MetricBlock layout="card" icon="payments" label="Revenue" value="$12.4k" delta="+22%" hint="vs $10.2k / 30d ago" chart={REVENUE} />
        </Cell>
        {/* 3×1 — wide with the sparkline on the right */}
        <Cell cols={3}>
          <MetricBlock layout="wide" icon="speed" label="Throughput" value="2.1k/s" delta="+9%" chart={REQ_MIN} />
        </Cell>
        {/* 1×1 */}
        <Cell>
          <MetricBlock icon="error" label="Churn" value="3" delta="-12%" />
        </Cell>
        {/* 2×1 — wide, no chart: delta sits next to the label */}
        <Cell cols={2}>
          <MetricBlock layout="wide" icon="schedule" label="Avg latency" value="142ms" delta="-8%" hint="p99 312ms" />
        </Cell>
        {/* 1×2 — sparkline fills the second row */}
        <Cell rows={2}>
          <MetricBlock icon="trending_up" label="Req / min" value="2.1k" delta="+9%" chart={REQ_MIN} />
        </Cell>
        <Cell>
          <MetricBlock icon="groups" label="Tenants" value="37" delta="+2" />
        </Cell>
        <Cell>
          <MetricBlock icon="bolt" label="Cold starts" value="3" delta="-1" />
        </Cell>
        <Cell>
          <MetricBlock icon="new_releases" label="Version" value="v0.3.1" />
        </Cell>
      </div>
    </div>
}`,...g.parameters?.docs?.source},description:{story:'Every footprint side by side: 1×1 tiles, a 1×2 (`chart` fills the extra\n height), a 2×1 (`layout="wide"`, no room for a chart), a 3×1 (`wide` +\n sparkline on the right), a 2×2 (`layout="card"`), and a 3×2 (`bigcard` —\n header, big value beside the sparkline, sub-stats row).',...g.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="bg-background p-6">
      <div className="grid auto-rows-[96px] grid-cols-[repeat(7,96px)] gap-2">
        {/* 3×3 */}
        <Cell cols={3} rows={3} pad={6}>
          <MetricBlock layout="chart" icon="payments" label="Revenue" delta="+22%" chart={REVENUE} stats={[{
          label: "This week",
          value: "$12.4k",
          delta: "+22%"
        }, {
          label: "MTD",
          value: "$41.8k",
          delta: "+9%"
        }, {
          label: "ARPU",
          value: "$8.40",
          delta: "+3%"
        }]} />
        </Cell>
        {/* 4×3 */}
        <Cell cols={4} rows={3} pad={6} tone="primary">
          <MetricBlock layout="chart" icon="apps" label="Installs" delta="+18%" chart={INSTALLS} stats={[{
          label: "This week",
          value: "1,240",
          delta: "+18%"
        }, {
          label: "Month-to-date",
          value: "4,180",
          delta: "+11%"
        }, {
          label: "Conversion",
          value: "3.2%",
          delta: "-0.4%"
        }, {
          label: "Per tenant",
          value: "33.5",
          delta: "+2%"
        }]} tone="primary" />
        </Cell>
      </div>
    </div>
}`,...f.parameters?.docs?.source},description:{story:'`layout="chart"` for 3×3 and larger — chart-led: header (label · trend), a\n full-width sparkline filling the middle, and a stats row underneath. No big\n value — the chart and stats carry it. Hover a bar for its labelled value.',...f.parameters?.docs?.description}}};const X=["Playground","Sizes","BigCard"];export{f as BigCard,b as Playground,g as Sizes,X as __namedExportsOrder,H as default};
