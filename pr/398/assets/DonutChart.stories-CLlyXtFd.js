import{j as e}from"./iframe-BKrgUUzQ.js";import{c as Q}from"./cn-IyxL_b2c.js";import{n as Z,s as R,a as X,d as H,f as J,i as Y}from"./chartGeometry-Bt9OyXpP.js";import"./preload-helper-PPVm8Dsz.js";const C=100,a=C/2,N=46,$=2;function k({data:n,total:s,centerLabel:b,measure:E,formatValue:P,legend:F=!0,thickness:M=.3,emptyLabel:D="No data",title:O,className:V}){const w=J(E,P),{data:x,total:L}=Z(n),q=Math.max(s??L,L),_=N*(1-Math.min(Math.max(M,.05),.9)),S=x.filter(t=>t.value>0),B=N-_,W=(N+_)/2,T=2*Math.PI*W;let z=0;const G=S.map((t,r)=>{const o=t.value/q*T,j=z;z+=o;const l=x.indexOf(t),i=Math.max(1.5,Math.min(B,o-$)),I=Math.max(0,o-$-i);return{datum:t,paletteIndex:l,color:R(l,t.tone),offset:j+i/2,dash:I,width:i,arc:o,index:r}}),v=S.length===0||q<=0,A=w(s??L),U=A.length>8?9:A.length>5?12:16;return e.jsxs("div",{className:Q("flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center",V),children:[e.jsxs("svg",{className:"aspect-square w-full max-w-[200px] shrink-0",viewBox:`0 0 ${C} ${C}`,role:"img","aria-label":v?[O,D].filter(Boolean).join(" — "):X(O,S,w),children:[G.map(({datum:t,color:r,paletteIndex:o,offset:j,dash:l,arc:i,width:I})=>{const K=Y(i/T*360);return e.jsx("circle",{cx:a,cy:a,r:W,fill:"none",stroke:r,strokeWidth:I,strokeLinecap:"round",...K?{}:{strokeDasharray:`${l.toFixed(2)} ${(T-l).toFixed(2)}`,strokeDashoffset:(-j).toFixed(2)},transform:`rotate(-90 ${a} ${a})`},t.key)}),(b||!v)&&e.jsxs(e.Fragment,{children:[e.jsx("text",{x:a,y:b?a-4:a,textAnchor:"middle",dominantBaseline:"central",fontSize:U,fontWeight:"bold",fill:"currentColor",children:v?"—":A}),b&&e.jsx("text",{x:a,y:a+11,textAnchor:"middle",dominantBaseline:"central",fontSize:"7",fill:"currentColor",opacity:"0.6",children:b})]})]}),F&&e.jsx("ul",{className:"flex w-full min-w-0 flex-col gap-1.5 text-sm sm:w-auto sm:min-w-[9rem]",children:v?e.jsx("li",{className:"text-on-surface-variant",children:D}):x.map((t,r)=>e.jsxs("li",{className:"flex min-w-0 items-center gap-2",children:[e.jsx("span",{"aria-hidden":"true",className:"size-2.5 shrink-0 rounded-full",style:{backgroundColor:R(r,t.tone)}}),e.jsx("span",{className:"min-w-0 flex-1 truncate text-on-surface-variant",children:H(t)}),e.jsx("span",{className:"shrink-0 tabular-nums text-on-surface",children:w(t.value)})]},t.key))})]})}k.__docgenInfo={description:"",methods:[],displayName:"DonutChart",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"ChartDatum"}],raw:"ChartDatum[]"},description:"The categories. Order is drawing order, clockwise from twelve o'clock."},total:{required:!1,tsType:{name:"number"},description:`The number under the centre label. Defaults to the sum of the data.

Pass it when the whole is larger than what is drawn — "3 of 47 placements",
or a report the server truncated — so the ring shows a share of the real
denominator instead of implying the drawn slices are everything. A total
BELOW the sum is ignored: the drawing stays a whole.`},centerLabel:{required:!1,tsType:{name:"string"},description:'Word under the centre figure, e.g. "attempts". Omit for a bare ring.'},measure:{required:!1,tsType:{name:"ChartMeasure"},description:'What the values are. `"count"` groups thousands; `"rate"` takes the ratio\nthe server computed (0.0234) and writes what an operator reads (2.3%).\nSetting it is how two pages agree on what a number looks like.'},formatValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number) => string",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"string"}}},description:"Full control of the value text, for what no measure covers — a currency, a\nduration, a locale the kit does not know. It WINS over `measure`; reaching\nfor it when `measure` would do is choosing to drift from the other pages."},legend:{required:!1,tsType:{name:"boolean"},description:"Show the legend beside (or under) the ring. Default `true`.",defaultValue:{value:"true",computed:!1}},thickness:{required:!1,tsType:{name:"number"},description:`Ring thickness as a share of its radius, 0-1. Default \`0.3\`.

Thinner than it was: with round caps a slice is as wide as the ring, so a
fat ring turns a small share into something that reads as a dot rather
than as a short arc.`,defaultValue:{value:"0.3",computed:!1}},emptyLabel:{required:!1,tsType:{name:"string"},description:'What to say when there is nothing to draw. Default `"No data"`.',defaultValue:{value:'"No data"',computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Names the chart for assistive technology, and titles the legend region."},className:{required:!1,tsType:{name:"string"},description:""}}};const re={title:"UI/Blocks/DonutChart",component:k,parameters:{layout:"centered"},render:n=>ee(e.jsx(k,{...n})),argTypes:{thickness:{control:{type:"range",min:.05,max:.9,step:.01},description:"Ring thickness as a share of its radius."},total:{control:{type:"number"}},measure:{control:{type:"inline-radio"},options:["count","rate"]},legend:{control:{type:"boolean"}},title:{control:{type:"text"}},centerLabel:{control:{type:"text"}},emptyLabel:{control:{type:"text"}},data:{control:!1},formatValue:{control:!1},className:{control:!1}}},ee=n=>e.jsx("div",{className:"w-full max-w-[420px] rounded-xl border border-outline-variant p-4 text-on-surface",children:n}),c={args:{title:"Attempts",centerLabel:"attempts",data:[{key:"passed",label:"通過",value:184,tone:"success"},{key:"failed",label:"未通過",value:63,tone:"error"},{key:"open",label:"未提交",value:22,tone:"warning"}]}},d={args:{title:"Impressions",centerLabel:"impressions",measure:"count",data:[{key:"home-top",label:"首頁上方",value:48210},{key:"list-inline",label:"列表插入",value:30140},{key:"detail-side",label:"詳情側欄",value:12480},{key:"footer",label:"頁尾",value:4310}]}},m={args:{title:"Attempts",centerLabel:"attempts",data:[{key:"passed",label:"通過",value:40,tone:"success"}]}},u={args:{title:"Impressions",centerLabel:"of 47 placements",total:12e4,measure:"count",data:[{key:"a",label:"首頁上方",value:41e3},{key:"b",label:"列表插入",value:22500},{key:"c",label:"詳情側欄",value:9100}]}},p={args:{title:"Impressions",centerLabel:"impressions",measure:"count",emptyLabel:"尚無曝光",data:[{key:"home-top",label:"首頁上方",value:0},{key:"list-inline",label:"列表插入",value:0},{key:"footer",label:"頁尾",value:0}]}},h={args:{title:"Attempts",centerLabel:"attempts",emptyLabel:"尚無資料",data:[{key:"passed",label:"通過",value:0,tone:"success"},{key:"failed",label:"未通過",value:0,tone:"error"}]}},y={args:{title:"Impressions",centerLabel:"impressions",measure:"count",data:[{key:"ad_0f21c8",label:"春季招生",value:31200},{key:"ad_7f3ab1",label:"",value:12480}]}},f={args:{title:"Placements",data:Array.from({length:7},(n,s)=>({key:`p${s}`,label:`版位 ${s+1}`,value:70-s*8}))}},g={render:n=>e.jsx("div",{className:"w-full max-w-[200px] rounded-xl border border-outline-variant p-4 text-on-surface",children:e.jsx(k,{...n})}),args:{title:"Attempts",legend:!1,centerLabel:"attempts",data:[{key:"passed",label:"通過",value:184,tone:"success"},{key:"failed",label:"未通過",value:63,tone:"error"}]}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Attempts",
    centerLabel: "attempts",
    data: [{
      key: "passed",
      label: "通過",
      value: 184,
      tone: "success"
    }, {
      key: "failed",
      label: "未通過",
      value: 63,
      tone: "error"
    }, {
      key: "open",
      label: "未提交",
      value: 22,
      tone: "warning"
    }]
  }
}`,...c.parameters?.docs?.source},description:{story:`quiz-core 統計, the shape it actually holds: attempts split into passed,
failed and still open. The ring answers "how did this quiz go", which the
pass-rate Gauge could only answer for one number at a time.`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Impressions",
    centerLabel: "impressions",
    measure: "count",
    data: [{
      key: "home-top",
      label: "首頁上方",
      value: 48210
    }, {
      key: "list-inline",
      label: "列表插入",
      value: 30140
    }, {
      key: "detail-side",
      label: "詳情側欄",
      value: 12480
    }, {
      key: "footer",
      label: "頁尾",
      value: 4310
    }]
  }
}`,...d.parameters?.docs?.source},description:{story:`ad-core's analytics block: impressions by placement. The tones are left unset
because one placement is not better than another — the palette orders them,
nothing more.`,...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Attempts",
    centerLabel: "attempts",
    data: [{
      key: "passed",
      label: "通過",
      value: 40,
      tone: "success"
    }]
  }
}`,...m.parameters?.docs?.source},description:{story:`One category holding everything. The segment is drawn as a full circle: an
SVG arc between two identical points draws nothing, so the naive version of
this renders an empty ring and reads as missing data.`,...m.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Impressions",
    centerLabel: "of 47 placements",
    total: 120000,
    measure: "count",
    data: [{
      key: "a",
      label: "首頁上方",
      value: 41000
    }, {
      key: "b",
      label: "列表插入",
      value: 22500
    }, {
      key: "c",
      label: "詳情側欄",
      value: 9100
    }]
  }
}`,...u.parameters?.docs?.source},description:{story:`An explicit total larger than the slices: three placements of forty-seven
carry every impression so far. The ring stays a share of the real
denominator instead of implying the three are all there is.`,...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Impressions",
    centerLabel: "impressions",
    measure: "count",
    emptyLabel: "尚無曝光",
    data: [{
      key: "home-top",
      label: "首頁上方",
      value: 0
    }, {
      key: "list-inline",
      label: "列表插入",
      value: 0
    }, {
      key: "footer",
      label: "頁尾",
      value: 0
    }]
  }
}`,...p.parameters?.docs?.source},description:{story:`ad-core's first day: every placement configured, nothing served yet. The ring
stays and the figure is a dash — never one placement taking 100% of nothing.
This is the state the block shows until a campaign runs, not an edge case.`,...p.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Attempts",
    centerLabel: "attempts",
    emptyLabel: "尚無資料",
    data: [{
      key: "passed",
      label: "通過",
      value: 0,
      tone: "success"
    }, {
      key: "failed",
      label: "未通過",
      value: 0,
      tone: "error"
    }]
  }
}`,...h.parameters?.docs?.source},description:{story:"A quiz nobody has attempted: the same state from the other consumer.",...h.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Impressions",
    centerLabel: "impressions",
    measure: "count",
    data: [{
      key: "ad_0f21c8",
      label: "春季招生",
      value: 31200
    }, {
      key: "ad_7f3ab1",
      label: "",
      value: 12480
    }]
  }
}`,...y.parameters?.docs?.source},description:{story:`A deleted creative keeps its totals — ad_daily_stats outlives the ad on
purpose — and arrives with no label. The legend shows its key rather than a
word the kit invented, because one page over the same blank means a placement
nobody has named yet.`,...y.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Placements",
    data: Array.from({
      length: 7
    }, (_, index) => ({
      key: \`p\${index}\`,
      label: \`版位 \${index + 1}\`,
      value: 70 - index * 8
    }))
  }
}`,...f.parameters?.docs?.source},description:{story:"Seven categories: the palette cycles rather than inventing a seventh token.",...f.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  // Its own narrow frame, but still args-driven so the controls work here too.
  render: args => <div className="w-full max-w-[200px] rounded-xl border border-outline-variant p-4 text-on-surface">
      <DonutChart {...args} />
    </div>,
  args: {
    title: "Attempts",
    legend: false,
    centerLabel: "attempts",
    data: [{
      key: "passed",
      label: "通過",
      value: 184,
      tone: "success"
    }, {
      key: "failed",
      label: "未通過",
      value: 63,
      tone: "error"
    }]
  }
}`,...g.parameters?.docs?.source},description:{story:"Without the legend, for a narrow cell that carries its labels elsewhere.",...g.parameters?.docs?.description}}};const oe=["QuizOutcomes","ImpressionShare","SingleCategory","PartialOfKnownWhole","DayOneAllZero","Empty","DeletedCreative","PaletteCycles","RingOnly"];export{p as DayOneAllZero,y as DeletedCreative,h as Empty,d as ImpressionShare,f as PaletteCycles,u as PartialOfKnownWhole,c as QuizOutcomes,g as RingOnly,m as SingleCategory,oe as __namedExportsOrder,re as default};
