import{j as t}from"./iframe-BKrgUUzQ.js";import{c as $}from"./cn-IyxL_b2c.js";import{n as U,r as B,s as j,a as P,d as z,R as H,f as F}from"./chartGeometry-Bt9OyXpP.js";import"./preload-helper-PPVm8Dsz.js";const w=100,n=w/2,x=43,l=9,G=4,X=4,Q=60,Z=[.25,.5,.75,1];function q({data:e,max:o,measure:T,formatValue:I,legend:E=!0,emptyLabel:C="No data",corner:_=X,title:S,className:M}){const k=F(T,I),{data:r}=U(e),A=r.reduce((a,s)=>Math.max(a,s.value),0),N=Math.max(o??(T==="rate"?H:A),Number.EPSILON),i=r.length===0||A<=0,f=r.length>0?360/r.length:360,V=Math.min(G,f*.3),R=Math.min(f-V,Q);return t.jsxs("div",{className:$("flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center",M),children:[t.jsxs("svg",{className:"aspect-square w-full max-w-[200px] shrink-0",viewBox:`0 0 ${w} ${w}`,role:"img","aria-label":i?[S,C].filter(Boolean).join(" — "):P(S,r,k),children:[Z.map(a=>t.jsx("circle",{cx:n,cy:n,r:l+(x-l)*a,fill:"none",stroke:"currentColor",strokeWidth:"0.5",opacity:a===1?.2:.1},a)),!i&&r.map((a,s)=>{if(a.value<=0)return null;const L=l+(x-l)*Math.min(a.value/N,1),{d:O,strokeWidth:W}=B(n,n,l,Math.max(L,l+.5),s*f-R/2,s*f+R/2,Math.max(0,_)),D=j(s,a.tone);return t.jsx("path",{d:O,fill:D,stroke:D,strokeWidth:W,strokeLinejoin:"round"},a.key)}),t.jsx("circle",{cx:n,cy:n,r:l,fill:"currentColor",opacity:"0.06"}),i&&t.jsx("text",{x:n,y:n,textAnchor:"middle",dominantBaseline:"central",fontSize:"7",fill:"currentColor",opacity:"0.6",children:"—"}),!i&&t.jsx("text",{x:n,y:n-x-3.5,textAnchor:"middle",dominantBaseline:"central",fontSize:"5",fill:"currentColor",opacity:"0.5",children:k(N)})]}),E&&t.jsx("ul",{className:"flex w-full min-w-0 flex-col gap-1.5 text-sm sm:w-auto sm:min-w-[9rem]",children:i?t.jsx("li",{className:"text-on-surface-variant",children:C}):r.map((a,s)=>t.jsxs("li",{className:"flex min-w-0 items-center gap-2",children:[t.jsx("span",{"aria-hidden":"true",className:"size-2.5 shrink-0 rounded-full",style:{backgroundColor:j(s,a.tone)}}),t.jsx("span",{className:"min-w-0 flex-1 truncate text-on-surface-variant",children:z(a)}),t.jsx("span",{className:"shrink-0 tabular-nums text-on-surface",children:k(a.value)})]},a.key))})]})}q.__docgenInfo={description:"",methods:[],displayName:"PolarChart",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"ChartDatum"}],raw:"ChartDatum[]"},description:"The categories. One wedge each, clockwise from twelve o'clock."},max:{required:!1,tsType:{name:"number"},description:`The value a full-length wedge represents. Defaults to the largest value in
the data — except under \`measure="rate"\`, where it defaults to 1, because a
ratio's whole is always 1.

🔴 IT IS IN THE VALUES' OWN UNITS, and \`formatValue\` does not change that:
a ctr series of ratios wants \`max={0.05}\`, not \`max={5}\`. Only the text
goes through the formatter; the wedge is drawn from the raw number.

🔴 AND WITHOUT IT A RATE FLATTERS ITSELF. With the largest-value default
the best category always reaches the rim, so a quiz where nothing exceeds
30% looks exactly like one where everything is at 100%. Declaring
\`measure="rate"\` is usually better than declaring a max: it gets the right
ceiling and the right text together.`},measure:{required:!1,tsType:{name:"ChartMeasure"},description:'What the values are. `"count"` groups thousands; `"rate"` takes the ratio\nthe server computed (0.0234), writes what an operator reads (2.3%), and\nscales the wedges against a whole of 1 rather than against the leader.'},formatValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number) => string",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"string"}}},description:"Full control of the value text, for what no measure covers — a currency, a\nduration, a locale the kit does not know. It WINS over `measure` for the\ntext, and changes nothing about the geometry."},legend:{required:!1,tsType:{name:"boolean"},description:"Show the legend beside (or under) the wedges. Default `true`.",defaultValue:{value:"true",computed:!1}},emptyLabel:{required:!1,tsType:{name:"string"},description:'What to say when there is nothing to draw. Default `"No data"`.',defaultValue:{value:'"No data"',computed:!1}},corner:{required:!1,tsType:{name:"number"},description:`How much of each corner is rounded, in the chart's own units (its radius is
43). Default 4.

A bar too narrow to carry the full radius rounds less automatically, and 0
gives square corners. The gap between bars is unaffected at any value —
each edge carries its own inset angle, so rounding costs the seam nothing.`,defaultValue:{value:"4",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Names the chart for assistive technology."},className:{required:!1,tsType:{name:"string"},description:""}}};const te={title:"UI/Blocks/PolarChart",component:q,parameters:{layout:"centered"},render:e=>K(t.jsx(q,{...e})),argTypes:{corner:{control:{type:"range",min:0,max:12,step:.5},description:"Corner rounding in chart units (the chart's radius is 43). 0 is square."},max:{control:{type:"number"}},measure:{control:{type:"inline-radio"},options:["count","rate"]},legend:{control:{type:"boolean"}},title:{control:{type:"text"}},emptyLabel:{control:{type:"text"}},data:{control:!1},formatValue:{control:!1},className:{control:!1}}},K=e=>t.jsx("div",{className:"w-full max-w-[420px] rounded-xl border border-outline-variant p-4 text-on-surface",children:e}),c={args:{title:"每題答對率",max:100,formatValue:e=>`${Math.round(e)}%`,data:[{key:"q1",label:"第 1 題",value:92},{key:"q2",label:"第 2 題",value:74},{key:"q3",label:"第 3 題",value:41},{key:"q4",label:"第 4 題",value:88},{key:"q5",label:"第 5 題",value:63},{key:"q6",label:"第 6 題",value:12}]}},u={args:{title:"每題答對率（無 max，示警用）",formatValue:e=>`${Math.round(e)}%`,data:[{key:"q1",label:"第 1 題",value:41},{key:"q2",label:"第 2 題",value:33},{key:"q3",label:"第 3 題",value:28},{key:"q4",label:"第 4 題",value:19}]}},d={args:{title:"各版位點擊率",measure:"rate",max:.05,data:[{key:"home-top",label:"首頁上方",value:.0382},{key:"list-inline",label:"列表插入",value:.0241},{key:"detail-side",label:"詳情側欄",value:.0115},{key:"footer",label:"頁尾",value:.0034}]}},m={args:{title:"各版位點擊率（以 100% 為尺規）",measure:"rate",data:[{key:"home-top",label:"首頁上方",value:.0382},{key:"list-inline",label:"列表插入",value:.0241},{key:"detail-side",label:"詳情側欄",value:.0115},{key:"footer",label:"頁尾",value:.0034}]}},h={args:{title:"各版位點擊率",measure:"rate",emptyLabel:"尚無點擊",data:[{key:"home-top",label:"首頁上方",value:0},{key:"list-inline",label:"列表插入",value:0},{key:"footer",label:"頁尾",value:0}]}},p={args:{title:"各廣告點擊率",measure:"rate",max:.05,data:[{key:"ad_0f21c8",label:"春季招生",value:.0402},{key:"ad_7f3ab1",label:"",value:.0188}]}},y={args:{title:"Clicks by placement",formatValue:e=>e.toLocaleString("en-US"),data:[{key:"a",label:"首頁上方",value:1842},{key:"b",label:"列表插入",value:726},{key:"c",label:"詳情側欄",value:143}]}},g={args:{title:"每題答對率",max:100,formatValue:e=>`${e}%`,data:[{key:"q1",label:"第 1 題",value:76}]}},b={args:{title:"每題答對率",max:100,emptyLabel:"尚無作答",data:[{key:"q1",label:"第 1 題",value:0},{key:"q2",label:"第 2 題",value:0}]}},v={args:{title:"每題答對率",max:100,legend:!1,formatValue:e=>`${e}%`,data:Array.from({length:12},(e,o)=>({key:`q${o}`,label:`第 ${o+1} 題`,value:30+o*17%70}))}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: "每題答對率",
    max: 100,
    formatValue: value => \`\${Math.round(value)}%\`,
    data: [{
      key: "q1",
      label: "第 1 題",
      value: 92
    }, {
      key: "q2",
      label: "第 2 題",
      value: 74
    }, {
      key: "q3",
      label: "第 3 題",
      value: 41
    }, {
      key: "q4",
      label: "第 4 題",
      value: 88
    }, {
      key: "q5",
      label: "第 5 題",
      value: 63
    }, {
      key: "q6",
      label: "第 6 題",
      value: 12
    }]
  }
}`,...c.parameters?.docs?.source},description:{story:`quiz-core 統計: correct rate per question, the figure that was going through
TrendChart — a smooth curve drawn over question index, which invents a trend
between categories that have no order. \`max={100}\` is what keeps a percentage
a percentage.`,...c.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: "每題答對率（無 max，示警用）",
    formatValue: value => \`\${Math.round(value)}%\`,
    data: [{
      key: "q1",
      label: "第 1 題",
      value: 41
    }, {
      key: "q2",
      label: "第 2 題",
      value: 33
    }, {
      key: "q3",
      label: "第 3 題",
      value: 28
    }, {
      key: "q4",
      label: "第 4 題",
      value: 19
    }]
  }
}`,...u.parameters?.docs?.source},description:{story:`🔴 The same data WITHOUT \`max\`: every wedge is scaled to the best category,
so a quiz where nothing exceeds 41% looks like one with a top score. Kept as
a story because it is the mistake the prop exists to prevent, and it is only
visible side by side.`,...u.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: "各版位點擊率",
    measure: "rate",
    max: 0.05,
    data: [{
      key: "home-top",
      label: "首頁上方",
      value: 0.0382
    }, {
      key: "list-inline",
      label: "列表插入",
      value: 0.0241
    }, {
      key: "detail-side",
      label: "詳情側欄",
      value: 0.0115
    }, {
      key: "footer",
      label: "頁尾",
      value: 0.0034
    }]
  }
}`,...d.parameters?.docs?.source},description:{story:`ad-core's analytics block: CTR by placement. A ring would be wrong here —
rates are not parts of a whole, and stacking them would add up to nothing
meaningful.`,...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: "各版位點擊率（以 100% 為尺規）",
    measure: "rate",
    data: [{
      key: "home-top",
      label: "首頁上方",
      value: 0.0382
    }, {
      key: "list-inline",
      label: "列表插入",
      value: 0.0241
    }, {
      key: "detail-side",
      label: "詳情側欄",
      value: 0.0115
    }, {
      key: "footer",
      label: "頁尾",
      value: 0.0034
    }]
  }
}`,...m.parameters?.docs?.source},description:{story:'The same CTR with NO max: `measure="rate"` alone scales against a whole of 1,\nwhich is honest but squashes four placements into stubs. The `max={0.05}`\nabove is the readable version — and the two together are the argument for\ndeclaring a ceiling in the units the DATA is in, not the units it prints in.',...m.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: "各版位點擊率",
    measure: "rate",
    emptyLabel: "尚無點擊",
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
}`,...h.parameters?.docs?.source},description:{story:`ad-core's first day: every placement is configured and nothing has been
clicked. Not an edge case — it is what the block shows until a campaign runs.`,...h.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: "各廣告點擊率",
    measure: "rate",
    max: 0.05,
    data: [{
      key: "ad_0f21c8",
      label: "春季招生",
      value: 0.0402
    }, {
      key: "ad_7f3ab1",
      label: "",
      value: 0.0188
    }]
  }
}`,...p.parameters?.docs?.source},description:{story:`A creative that was deleted: ad_daily_stats outlives the ad on purpose, so
the row survives with no label. The kit falls back to the key — it will not
write "Deleted", because one page over the same blank means a placement
nobody has named.`,...p.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Clicks by placement",
    formatValue: value => value.toLocaleString("en-US"),
    data: [{
      key: "a",
      label: "首頁上方",
      value: 1842
    }, {
      key: "b",
      label: "列表插入",
      value: 726
    }, {
      key: "c",
      label: "詳情側欄",
      value: 143
    }]
  }
}`,...y.parameters?.docs?.source},description:{story:"Counts rather than rates: no ceiling to declare, so the largest sets the rim.",...y.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: "每題答對率",
    max: 100,
    formatValue: value => \`\${value}%\`,
    data: [{
      key: "q1",
      label: "第 1 題",
      value: 76
    }]
  }
}`,...g.parameters?.docs?.source},description:{story:"One category: a wedge, not a full-circle degenerate arc.",...g.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: "每題答對率",
    max: 100,
    emptyLabel: "尚無作答",
    data: [{
      key: "q1",
      label: "第 1 題",
      value: 0
    }, {
      key: "q2",
      label: "第 2 題",
      value: 0
    }]
  }
}`,...b.parameters?.docs?.source},description:{story:"Nobody has answered anything yet: guides and hub, no wedges, a dash.",...b.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    title: "每題答對率",
    max: 100,
    legend: false,
    formatValue: (value: number) => \`\${value}%\`,
    data: Array.from({
      length: 12
    }, (_, index) => ({
      key: \`q\${index}\`,
      label: \`第 \${index + 1} 題\`,
      value: 30 + index * 17 % 70
    }))
  }
}`,...v.parameters?.docs?.source},description:{story:"Twelve categories, to see where the wedges stop being readable.",...v.parameters?.docs?.description}}};const ne=["CorrectRatePerQuestion","RateWithoutAMaximum","CtrByPlacement","RateAgainstItsWhole","DayOneAllZero","DeletedCreative","RawCounts","SingleCategory","Empty","ManyCategories"];export{c as CorrectRatePerQuestion,d as CtrByPlacement,h as DayOneAllZero,p as DeletedCreative,b as Empty,v as ManyCategories,m as RateAgainstItsWhole,u as RateWithoutAMaximum,y as RawCounts,g as SingleCategory,ne as __namedExportsOrder,te as default};
