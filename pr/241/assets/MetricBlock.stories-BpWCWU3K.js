import{j as e}from"./iframe-DbM6R8Cx.js";import{M as a}from"./MetricBlock-QVPGSVof.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DaS1LqsN.js";import"./Sparkline-CVKvgqyp.js";import"./index-CIOTjF0c.js";import"./index-D44MphJf.js";const j={title:"UI/Notch/Blocks/Metric",component:a,args:{icon:"apps",label:"Installs",value:"1,240",delta:"+18%",tone:"surface"},argTypes:{tone:{control:"inline-radio",options:["surface","primary"]},deltaTrend:{control:"inline-radio",options:[void 0,"up","down"]},icon:{control:"text"},delta:{control:"text"},hint:{control:"text"}}},t={render:l=>e.jsx("div",{className:"bg-background p-6",children:e.jsx("div",{className:"size-24 rounded-2xl bg-surface-container-low p-4",children:e.jsx(a,{...l})})})},p=(l,r)=>{const c=Math.max(...l);return l.map((i,d)=>({value:Math.round(i/c*100),label:r(i,d+1)}))},h=p([470,760,600,950,680,870,1100,740,920,1180,1050,1240],(l,r)=>`Wk ${r} · ${l.toLocaleString()} installs`),b=p([3.8,5.1,4.4,6.8,5.2,7,9.2,6.1,7.8,9.9,8.7,12.4],(l,r)=>`Wk ${r} · $${l}k`),u=p([1.2,1.6,1.4,1.9,1.7,2,1.8,2.3,2,2.5,2.2,2.1],(l,r)=>`Wk ${r} · ${l}k req/min`),n=({cols:l=1,rows:r=1,pad:c=4,tone:i="surface",children:d})=>e.jsx("div",{className:`rounded-2xl ${i==="primary"?"bg-primary-container":"bg-surface-container-low"} ${c===6?"p-6":"p-4"}`,style:{gridColumn:`span ${l}`,gridRow:`span ${r}`},children:d}),s={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs("div",{className:"grid auto-rows-[96px] grid-cols-[repeat(6,96px)] gap-2",children:[e.jsx(n,{cols:3,rows:2,pad:6,tone:"primary",children:e.jsx(a,{layout:"bigcard",icon:"apps",label:"Installs",value:"1,240",delta:"+18%",chart:h,stats:[{label:"This week",value:"1,240",delta:"+18%"},{label:"MTD",value:"4,180",delta:"+11%"},{label:"Conversion",value:"3.2%",delta:"-0.4%"}],tone:"primary"})}),e.jsx(n,{cols:2,rows:2,pad:6,children:e.jsx(a,{layout:"card",icon:"payments",label:"Revenue",value:"$12.4k",delta:"+22%",hint:"vs $10.2k / 30d ago",chart:b})}),e.jsx(n,{cols:3,children:e.jsx(a,{layout:"wide",icon:"speed",label:"Throughput",value:"2.1k/s",delta:"+9%",chart:u})}),e.jsx(n,{children:e.jsx(a,{icon:"error",label:"Churn",value:"3",delta:"-12%"})}),e.jsx(n,{cols:2,children:e.jsx(a,{layout:"wide",icon:"schedule",label:"Avg latency",value:"142ms",delta:"-8%",hint:"p99 312ms"})}),e.jsx(n,{rows:2,children:e.jsx(a,{icon:"trending_up",label:"Req / min",value:"2.1k",delta:"+9%",chart:u})}),e.jsx(n,{children:e.jsx(a,{icon:"groups",label:"Tenants",value:"37",delta:"+2"})}),e.jsx(n,{children:e.jsx(a,{icon:"bolt",label:"Cold starts",value:"3",delta:"-1"})}),e.jsx(n,{children:e.jsx(a,{icon:"new_releases",label:"Version",value:"v0.3.1"})})]})})},o={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs("div",{className:"grid auto-rows-[96px] grid-cols-[repeat(7,96px)] gap-2",children:[e.jsx(n,{cols:3,rows:3,pad:6,children:e.jsx(a,{layout:"chart",icon:"payments",label:"Revenue",delta:"+22%",chart:b,stats:[{label:"This week",value:"$12.4k",delta:"+22%"},{label:"MTD",value:"$41.8k",delta:"+9%"},{label:"ARPU",value:"$8.40",delta:"+3%"}]})}),e.jsx(n,{cols:4,rows:3,pad:6,tone:"primary",children:e.jsx(a,{layout:"chart",icon:"apps",label:"Installs",delta:"+18%",chart:h,stats:[{label:"This week",value:"1,240",delta:"+18%"},{label:"Month-to-date",value:"4,180",delta:"+11%"},{label:"Conversion",value:"3.2%",delta:"-0.4%"},{label:"Per tenant",value:"33.5",delta:"+2%"}],tone:"primary"})})]})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="bg-background p-6">
      <div className="size-24 rounded-2xl bg-surface-container-low p-4">
        <MetricBlock {...args} />
      </div>
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Standalone, in a 96px (`size-24`) box — the natural 1×1 footprint.",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source},description:{story:'Every footprint side by side: 1×1 tiles, a 1×2 (`chart` fills the extra\n height), a 2×1 (`layout="wide"`, no room for a chart), a 3×1 (`wide` +\n sparkline on the right), a 2×2 (`layout="card"`), and a 3×2 (`bigcard` —\n header, big value beside the sparkline, sub-stats row).',...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source},description:{story:'`layout="chart"` for 3×3 and larger — chart-led: header (label · trend), a\n full-width sparkline filling the middle, and a stats row underneath. No big\n value — the chart and stats carry it. Hover a bar for its labelled value.',...o.parameters?.docs?.description}}};const M=["Playground","Sizes","BigCard"];export{o as BigCard,t as Playground,s as Sizes,M as __namedExportsOrder,j as default};
