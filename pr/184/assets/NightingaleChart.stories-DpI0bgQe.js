import{r as k,j as a}from"./iframe-BB3QIYhY.js";import{r as B}from"./index-2ijxVKG8.js";import{c as f}from"./cn-IyxL_b2c.js";import{w as O,r as Y,p as z}from"./chart-arc-mB-lH4PW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BfnLJLR6.js";function d({data:t,size:n=200,scale:y="area",legend:q=!0,formatValue:b,chipClassName:F,className:N}){const[l,s]=k.useState(null),j=(e,r)=>b?b(e,r):e.toLocaleString(),h=k.useMemo(()=>{const e=n/2,r=e-2,g=r*.14,M=t.length===1,S=t.length>0?360/t.length:360,R=Math.max(0,...t.map(o=>o.value))||1,E=t.length>1?4:0;return t.map((o,p)=>{const P=Math.max(0,o.value)/R,v=g+(r-g)*(y==="radius"?P:Math.sqrt(P));return{d:o,i:p,color:o.color??z(p),path:M?O(e,e,v):Y(e,e,g,v,p*S+E/2,(p+1)*S-E/2,v*.09)}})},[t,n,y]),m=l!=null?h[l.index]:void 0,C=m!==void 0&&typeof document<"u"?B.createPortal(a.jsxs("span",{className:f("pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium shadow-md",F??"bg-on-surface text-surface"),style:{left:l.x||0,top:(l.y||0)-10},children:[m.d.label," · ",j(m.d.value,m.d)]}),document.body):null,w=e=>r=>s({index:e,x:r.clientX,y:r.clientY}),D=a.jsx("svg",{viewBox:`0 0 ${n} ${n}`,width:n,height:n,onPointerLeave:()=>s(null),className:"shrink-0",children:h.map(e=>a.jsx("path",{d:e.path,fill:e.color,fillOpacity:l!=null&&l.index!==e.i?.4:1,className:"cursor-default transition-[fill-opacity]",onPointerEnter:w(e.i),onPointerMove:w(e.i),children:a.jsx("title",{children:`${e.d.label}: ${e.d.value}`})},e.i))});return q?a.jsxs("div",{className:f("flex items-center gap-4",N),children:[D,a.jsx("ul",{className:"flex min-w-0 flex-col gap-1.5 text-xs",children:h.map(e=>a.jsxs("li",{className:"flex items-center gap-2",onPointerEnter:r=>s({index:e.i,x:r.clientX,y:r.clientY}),onPointerMove:r=>s({index:e.i,x:r.clientX,y:r.clientY}),onPointerLeave:()=>s(null),children:[a.jsx("span",{className:"size-2.5 shrink-0 rounded-sm",style:{backgroundColor:e.color}}),a.jsx("span",{className:"min-w-0 flex-1 truncate text-on-surface-variant",children:e.d.label}),a.jsx("span",{className:"shrink-0 font-medium tabular-nums text-on-surface",children:j(e.d.value,e.d)})]},e.i))}),C]}):a.jsxs("div",{className:f("inline-flex",N),children:[D,C]})}d.__docgenInfo={description:"",methods:[],displayName:"NightingaleChart",props:{data:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"NightingaleChartDatum"}],raw:"ReadonlyArray<NightingaleChartDatum>"},description:""},size:{required:!1,tsType:{name:"number"},description:"Width / height in px. Default 200.",defaultValue:{value:"200",computed:!1}},scale:{required:!1,tsType:{name:"union",raw:'"area" | "radius"',elements:[{name:"literal",value:'"area"'},{name:"literal",value:'"radius"'}]},description:'`"area"` (default) — radius ∝ √value, so a sector\'s *area* tracks the value.\n `"radius"` — radius ∝ value (exaggerates differences).',defaultValue:{value:'"area"',computed:!1}},legend:{required:!1,tsType:{name:"boolean"},description:"Show a colour / label / value legend beside the chart. Default true.",defaultValue:{value:"true",computed:!1}},formatValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number, datum: NightingaleChartDatum) => ReactNode",signature:{arguments:[{type:{name:"number"},name:"value"},{type:{name:"NightingaleChartDatum"},name:"datum"}],return:{name:"ReactNode"}}},description:"Format a value for the legend + hover chip. Default `value.toLocaleString()`."},chipClassName:{required:!1,tsType:{name:"string"},description:'Classes for the floating hover chip. Default `"bg-on-surface text-surface"`.'},className:{required:!1,tsType:{name:"string"},description:""}}};const T=[{label:"Mon",value:320},{label:"Tue",value:410},{label:"Wed",value:480},{label:"Thu",value:390},{label:"Fri",value:520},{label:"Sat",value:180},{label:"Sun",value:140}],I={title:"UI/Chart/NightingaleChart",component:d,args:{data:T,size:220,scale:"area",legend:!0},argTypes:{size:{control:{type:"range",min:140,max:320,step:10}},scale:{control:{type:"inline-radio"},options:["area","radius"]}}},x=({children:t})=>a.jsx("div",{className:"bg-background p-6",children:a.jsx("div",{className:"inline-block rounded-2xl border border-outline-variant p-5",children:t})}),i={render:t=>a.jsx(x,{children:a.jsx(d,{...t})})},c={render:()=>a.jsx(x,{children:a.jsx(d,{data:T,size:220,scale:"radius"})})},u={render:()=>a.jsx(x,{children:a.jsx(d,{size:200,legend:!1,data:[{label:"Compute",value:62,color:"var(--color-primary)"},{label:"Storage",value:28,color:"var(--color-tertiary)"},{label:"Egress",value:41,color:"var(--color-secondary)"},{label:"DB",value:19,color:"var(--color-success)"},{label:"Other",value:8,color:"var(--color-warning)"}]})})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <Frame>
      <NightingaleChart {...args} />
    </Frame>
}`,...i.parameters?.docs?.source},description:{story:`Equal-angle sectors, radius ∝ √value (so area tracks the value). Hover a
 sector for a chip.`,...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <NightingaleChart data={WEEKDAYS} size={220} scale="radius" />
    </Frame>
}`,...c.parameters?.docs?.source},description:{story:'`scale="radius"` makes the radius linear in the value — differences read\n bigger.',...c.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Frame>
      <NightingaleChart size={200} legend={false} data={[{
      label: "Compute",
      value: 62,
      color: "var(--color-primary)"
    }, {
      label: "Storage",
      value: 28,
      color: "var(--color-tertiary)"
    }, {
      label: "Egress",
      value: 41,
      color: "var(--color-secondary)"
    }, {
      label: "DB",
      value: 19,
      color: "var(--color-success)"
    }, {
      label: "Other",
      value: 8,
      color: "var(--color-warning)"
    }]} />
    </Frame>
}`,...u.parameters?.docs?.source},description:{story:"`legend={false}` with custom per-datum colours.",...u.parameters?.docs?.description}}};const X=["Playground","RadiusScale","Bare"];export{u as Bare,i as Playground,c as RadiusScale,X as __namedExportsOrder,I as default};
