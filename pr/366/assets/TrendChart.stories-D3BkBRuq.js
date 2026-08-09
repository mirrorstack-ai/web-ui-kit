import{r as y,j as e}from"./iframe-Bvsj7qvu.js";import{c as B}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const G={top:8,right:4,bottom:20,left:36},Y={pts:[],line:"",area:""};function P(r,u,i,g,h,b){const j=h-g||1,{top:m,right:C,bottom:v,left:f}=b,d=r.map((c,n)=>[f+n/(r.length-1)*(u-f-C),m+(1-(c-g)/j)*(i-m-v)]);let k=`M${d[0][0].toFixed(1)},${d[0][1].toFixed(1)}`;for(let c=0;c<d.length-1;c++){const n=d[c-1]??d[c],N=d[c],s=d[c+1],S=d[c+2]??s,p=N[0]+(s[0]-n[0])/6,t=N[1]+(s[1]-n[1])/6,O=s[0]-(S[0]-N[0])/6,L=s[1]-(S[1]-N[1])/6;k+=` C${p.toFixed(1)},${t.toFixed(1)} ${O.toFixed(1)},${L.toFixed(1)} ${s[0].toFixed(1)},${s[1].toFixed(1)}`}const A=k+` L${d.at(-1)[0].toFixed(1)},${(i-v).toFixed(1)} L${d[0][0].toFixed(1)},${(i-v).toFixed(1)} Z`;return{pts:d,line:k,area:A}}function z(r){const u=y.useRef(null),[i,g]=y.useState(r);return y.useEffect(()=>{const h=u.current;if(!h)return;g(h.getBoundingClientRect().width);const b=new ResizeObserver(([j])=>{const m=j.contentRect.width;g(C=>Math.abs(C-m)<.5?C:m)});return b.observe(h),()=>b.disconnect()},[]),[i,u]}function T({values:r,labels:u,color:i,fillId:g,height:h=140,unit:b="",showArea:j=!0,showXAxisLabels:m=!0,labelEvery:C=4,thresholdY:v,overlays:f,className:d}){const k=y.useId(),A=g??`trend-chart-${k}`,c=y.useRef(null),[n,N]=z(400),[s,S]=y.useState(null),p=h,t=y.useMemo(()=>({...G,bottom:m?20:4}),[m]),{main:O,subs:L,threshY:E,yTicks:X}=y.useMemo(()=>{if(r.length<2)return{main:Y,subs:[],threshY:null,yTicks:[]};const a=f?.filter(x=>x.fixedMax==null).flatMap(x=>x.values)??[],o=0,l=Math.max(...r,...a)*1.15||1,_=l-o||1;return{main:P(r,n,p,o,l,t),subs:(f??[]).map(x=>x.values.length<2?null:P(x.values,n,p,o,x.fixedMax??l,t)),threshY:v!=null?t.top+(1-(v-o)/_)*(p-t.top-t.bottom):null,yTicks:[0,.25,.5,.75,1].map(x=>({v:o+x*_,y:t.top+(1-x)*(p-t.top-t.bottom)}))}},[r,f,n,p,t,v]),V=y.useCallback(a=>{const o=c.current?.getBoundingClientRect();if(!o||r.length<2)return;const l=Math.round(((a.clientX-o.left)/o.width*n-t.left)/(n-t.left-t.right)*(r.length-1));S(Math.max(0,Math.min(r.length-1,l)))},[r.length,n,t.left,t.right]),w=s!=null?O.pts[s]:null;return e.jsxs("div",{ref:N,className:B("relative w-full",d),children:[e.jsxs("svg",{ref:c,viewBox:`0 0 ${n} ${p}`,width:n,height:p,onMouseMove:V,onMouseLeave:()=>S(null),children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:A,x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",className:i,stopColor:"currentColor",stopOpacity:"0.18"}),e.jsx("stop",{offset:"100%",className:i,stopColor:"currentColor",stopOpacity:"0.01"})]}),v!=null&&e.jsxs("linearGradient",{id:`${A}-threshold`,x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",className:"text-error",stopColor:"currentColor",stopOpacity:"0.20"}),e.jsx("stop",{offset:"100%",className:"text-error",stopColor:"currentColor",stopOpacity:"0.02"})]})]}),X.slice(1,-1).map(a=>e.jsx("line",{x1:t.left,y1:a.y,x2:n-t.right,y2:a.y,stroke:"currentColor",strokeOpacity:"0.07",strokeWidth:"1"},a.v)),X.filter((a,o)=>o%2===0).map(a=>e.jsxs("text",{x:t.left-4,y:a.y+4,textAnchor:"end",fontSize:"9",fill:"currentColor",fillOpacity:"0.4",children:[a.v<1?a.v.toFixed(1):Math.round(a.v),b]},a.v)),E!=null&&j&&e.jsx("rect",{x:t.left,y:t.top,width:n-t.left-t.right,height:E-t.top,fill:`url(#${A}-threshold)`}),E!=null&&e.jsx("line",{x1:t.left,y1:E,x2:n-t.right,y2:E,className:"text-error",stroke:"currentColor",strokeOpacity:"0.4",strokeWidth:"1",strokeDasharray:"4 3"}),j&&e.jsx("path",{d:O.area,fill:`url(#${A})`}),(f??[]).map((a,o)=>{const l=L[o];return l?e.jsx("path",{className:a.color,d:l.line,fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeOpacity:"0.85",strokeDasharray:"4 3"},a.label):null}),e.jsx("path",{className:i,d:O.line,fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),m&&u.map((a,o)=>{if(o%C!==0)return null;const l=t.left+o/(r.length-1)*(n-t.left-t.right);return e.jsx("text",{x:l,y:p-4,textAnchor:"middle",fontSize:"9",fill:"currentColor",fillOpacity:"0.4",children:a},a)}),w&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:w[0],y1:t.top,x2:w[0],y2:p-t.bottom,stroke:"currentColor",strokeOpacity:"0.15",strokeWidth:"1"}),e.jsx("circle",{className:i,cx:w[0],cy:w[1],r:"3.5",fill:"currentColor"}),(f??[]).map((a,o)=>{const l=L[o];return l&&s!=null?e.jsx("circle",{className:a.color,cx:l.pts[s][0],cy:l.pts[s][1],r:"3",fill:"currentColor",fillOpacity:"0.85"},a.label):null})]})]}),s!=null&&w&&e.jsxs("div",{className:"pointer-events-none absolute top-1 z-10 rounded-lg border border-outline-variant/40 bg-surface-container px-2.5 py-1.5 text-xs shadow-md",style:{left:`${w[0]/n*100}%`,transform:w[0]>n*.7?"translateX(-110%)":"translateX(8px)"},children:[e.jsx("p",{className:"mb-0.5 text-on-surface-variant",children:u[s]}),e.jsxs("p",{className:"font-medium text-on-surface",children:[r[s]<1?r[s].toFixed(2):Math.round(r[s]),b]}),(f??[]).map(a=>e.jsxs("p",{className:"text-on-surface-variant/70",children:[a.label,": ",a.values[s]<1?a.values[s].toFixed(2):Math.round(a.values[s]),a.unit??b]},a.label))]})]})}T.__docgenInfo={description:"",methods:[],displayName:"TrendChart",props:{values:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:"Main series values — plotted as the solid line (+ area fill if `showArea`)."},labels:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"One label per value. Used for x-axis ticks (when `showXAxisLabels`) and\n as the hover-tooltip heading."},color:{required:!0,tsType:{name:"string"},description:`Tailwind text-color utility class for the main series (e.g.
 "text-primary"), applied via \`currentColor\` — matches Sparkline's
 color convention. Never a raw hex/CSS color, so the chart follows the
 design system's light/dark tokens automatically.`},fillId:{required:!1,tsType:{name:"string"},description:"Unique id for this chart's SVG gradient `<defs>`. Auto-generated via\n `useId()` when omitted — pass explicitly only if you need a stable,\n predictable id (e.g. snapshot tests)."},height:{required:!1,tsType:{name:"number"},description:"SVG viewBox height in px. Default `140`.",defaultValue:{value:"140",computed:!1}},unit:{required:!1,tsType:{name:"string"},description:'Unit suffix appended to the main series\' y-axis tick labels and\n tooltip value. Default `""`.',defaultValue:{value:'""',computed:!1}},showArea:{required:!1,tsType:{name:"boolean"},description:"Render the gradient area fill beneath the main line. Default `true`.",defaultValue:{value:"true",computed:!1}},showXAxisLabels:{required:!1,tsType:{name:"boolean"},description:"Render x-axis time labels below the chart (every `labelEvery`-th\n label). Default `true`. Set `false` for compact tiles where axis\n labels add noise without adding information — the chart reclaims the\n bottom margin those labels would otherwise occupy.",defaultValue:{value:"true",computed:!1}},labelEvery:{required:!1,tsType:{name:"number"},description:"When `showXAxisLabels` is true, render only every Nth label. Default `4`.",defaultValue:{value:"4",computed:!1}},thresholdY:{required:!1,tsType:{name:"number"},description:"Draw a dashed threshold line at this y-value, with red-tinted shading\n above it (the shading only renders when `showArea` is also true; the\n dashed line itself always renders). Omit for no threshold."},overlays:{required:!1,tsType:{name:"Array",elements:[{name:"TrendChartOverlay"}],raw:"TrendChartOverlay[]"},description:`Zero or more additional dashed series drawn over the main line, each
 with its own hover dot and tooltip row.`},className:{required:!1,tsType:{name:"string"},description:"Extra classes on the chart's outer wrapper `div`."}}};const U=Array.from({length:24},(r,u)=>`${String(u).padStart(2,"0")}:00`);function M(r,u,i=1){return U.map((g,h)=>Math.max(0,r+Math.sin((h+i)/2.3)*u+h*i%5))}const W=M(220,90,1),H=M(140,40,2),Q=M(80,20,3),Z=M(180,120,4),J=M(3,2,5),K=M(.8,.6,6),ae={title:"UI/Blocks/TrendChart",component:T,args:{values:W,labels:U,color:"text-primary",fillId:"trend-chart-story-fill"},argTypes:{values:{control:"object"},labels:{control:"object"},height:{control:{type:"number",min:80,max:320,step:10}},unit:{control:"text"},showArea:{control:"boolean"},showXAxisLabels:{control:"boolean"},labelEvery:{control:{type:"number",min:1,max:12,step:1}},thresholdY:{control:{type:"number",min:0,max:400,step:10}}}},R={render:r=>e.jsx("div",{className:"w-[520px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary",children:e.jsx(T,{...r})})},$={args:{values:H,color:"text-primary",unit:"ms",showArea:!1,fillId:"trend-chart-story-p95",overlays:[{values:Q,color:"text-secondary",label:"p50"}]},render:r=>e.jsx("div",{className:"w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary",children:e.jsx(T,{...r})})},F={args:{values:W,color:"text-primary",fillId:"trend-chart-story-requests",overlays:[{values:J,color:"text-warning",label:"4xx",fixedMax:10,unit:"%"},{values:K,color:"text-error",label:"5xx",fixedMax:10,unit:"%"}]},render:r=>e.jsx("div",{className:"w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary",children:e.jsx(T,{...r})})},I={args:{values:Z,color:"text-warning",unit:"ms",thresholdY:300,fillId:"trend-chart-story-cold-start"},render:r=>e.jsx("div",{className:"w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-warning",children:e.jsx(T,{...r})})},q={args:{values:W,color:"text-primary",height:100,showXAxisLabels:!1,fillId:"trend-chart-story-compact"},render:r=>e.jsx("div",{className:"w-80 rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary",children:e.jsx(T,{...r})})},D={args:{values:[],labels:[],color:"text-primary",fillId:"trend-chart-story-empty"},render:r=>e.jsx("div",{className:"w-80 rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary",children:e.jsx(T,{...r})})};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[520px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
}`,...R.parameters?.docs?.source},description:{story:"The base chart — a smooth line with an area fill and x-axis labels.",...R.parameters?.docs?.description}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    values: P95,
    color: "text-primary",
    unit: "ms",
    showArea: false,
    fillId: "trend-chart-story-p95",
    overlays: [{
      values: P50,
      color: "text-secondary",
      label: "p50"
    }]
  },
  render: args => <div className="w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
}`,...$.parameters?.docs?.source},description:{story:`A single dashed overlay sharing the main series' auto-scaled axis (e.g.
 p50 read alongside p95, both in ms).`,...$.parameters?.docs?.description}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    values: REQUESTS,
    color: "text-primary",
    fillId: "trend-chart-story-requests",
    overlays: [{
      values: RATE_4XX,
      color: "text-warning",
      label: "4xx",
      fixedMax: 10,
      unit: "%"
    }, {
      values: RATE_5XX,
      color: "text-error",
      label: "5xx",
      fixedMax: 10,
      unit: "%"
    }]
  },
  render: args => <div className="w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
}`,...F.parameters?.docs?.source},description:{story:"Multiple overlays, each pinned to its own `fixedMax` — 4xx/5xx rates (%)\n overlaid on a request-count chart. Auto-scaling a stable ~1-3% rate to\n fill the whole height would exaggerate it into a dramatic-looking wave.",...F.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    values: COLD_START,
    color: "text-warning",
    unit: "ms",
    thresholdY: 300,
    fillId: "trend-chart-story-cold-start"
  },
  render: args => <div className="w-[420px] rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-warning">
      <TrendChart {...args} />
    </div>
}`,...I.parameters?.docs?.source},description:{story:"A dashed threshold line with red-tinted shading above it — the shading\n only renders when `showArea` is also true; the line itself always renders.",...I.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    values: REQUESTS,
    color: "text-primary",
    height: 100,
    showXAxisLabels: false,
    fillId: "trend-chart-story-compact"
  },
  render: args => <div className="w-80 rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
}`,...q.parameters?.docs?.source},description:{story:`Compact tile look: no x-axis labels, tighter bottom margin. Used by
 dashboard tiles where axis labels would add noise without information.`,...q.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    values: [],
    labels: [],
    color: "text-primary",
    fillId: "trend-chart-story-empty"
  },
  render: args => <div className="w-80 rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-primary">
      <TrendChart {...args} />
    </div>
}`,...D.parameters?.docs?.source},description:{story:`Fewer than 2 points (e.g. data still loading) renders an empty chart
 frame instead of throwing.`,...D.parameters?.docs?.description}}};const se=["Playground","WithOverlay","WithFixedMaxOverlays","WithThreshold","NoAxisLabels","EmptyData"];export{D as EmptyData,q as NoAxisLabels,R as Playground,F as WithFixedMaxOverlays,$ as WithOverlay,I as WithThreshold,se as __namedExportsOrder,ae as default};
