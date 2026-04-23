import{j as o}from"./iframe-D6DPur46.js";import{c as B}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function Z(t,a,r,n,d,e,i){const l=t+r,h=d+n,f=d===0,c=h>=a,s=[];return s.push(`M ${e},0`),f?(s.push(`H ${l-e}`),s.push(`A ${e},${e} 0 0,1 ${l},${e}`)):(s.push(`H ${t-e}`),s.push(`A ${e},${e} 0 0,1 ${t},${e}`),s.push(`V ${d-i}`),s.push(`A ${i},${i} 0 0,0 ${t+i},${d}`),s.push(`H ${l-e}`),s.push(`A ${e},${e} 0 0,1 ${l},${d+e}`)),c?(s.push(`V ${a-e}`),s.push(`A ${e},${e} 0 0,1 ${l-e},${a}`)):(s.push(`V ${h-e}`),s.push(`A ${e},${e} 0 0,1 ${l-e},${h}`),s.push(`H ${t+i}`),s.push(`A ${i},${i} 0 0,0 ${t},${h+i}`),s.push(`V ${a-e}`),s.push(`A ${e},${e} 0 0,1 ${t-e},${a}`)),s.push(`H ${e}`),s.push(`A ${e},${e} 0 0,1 0,${a-e}`),s.push(`V ${e}`),s.push(`A ${e},${e} 0 0,1 ${e},0`),s.push("Z"),s.join(" ")}function k(t,a,r,n){return[`M 0,${a}`,`V ${a-n}`,`A ${n},${n} 0 0,0 ${n},${a}`,`V ${r}`,`A ${r},${r} 0 0,1 ${n+r},0`,`H ${n+t-r}`,`A ${r},${r} 0 0,1 ${n+t},${r}`,`V ${a}`,`A ${n},${n} 0 0,0 ${n+t+n},${a-n}`,`V ${a}`,"Z"].join(" ")}function z(t,a,r){return t>=0?t:a-r+t}function u({width:t,height:a,notchWidth:r,notchHeight:n,notchSide:d="right",notchOffset:e=0,radius:i=8,inverseRadius:l=6,fill:h="var(--color-surface-container-low)",stroke:f="var(--color-primary)",strokeWidth:c=1,headOnly:s=!1,className:S,style:V}){const $=c/2;if(s){const E=l,R=r+E*2;return o.jsx("svg",{width:R+c,height:n+c,viewBox:`${-$} ${-$} ${R+c} ${n+c}`,className:B("pointer-events-none",S),style:V,children:o.jsx("path",{d:k(r,n,i,E),fill:h,stroke:f,strokeWidth:c})})}const p=d==="right"||d==="left",A=p?t:a,w=p?a:t,T=p?r:n,D=p?n:r,j=p?a:t,H=p?n:r,F=z(e,j,H),q=i+l;let m=F;m>0&&m<q&&(m=0);const W=j-H-m;W>0&&W<q&&(m=j-H);const I=Z(A,w,T,D,m,i,l),P=p?t+r:t,G=p?a:a+n;let g;const _=A+T,M=w;switch(d){case"right":break;case"left":g=`translate(${_}, 0) scale(-1, 1)`;break;case"bottom":g=`translate(0, ${_}) rotate(-90)`;break;case"top":g=`translate(${M}, 0) rotate(90)`;break}return o.jsx("svg",{width:P+c,height:G+c,viewBox:`${-$} ${-$} ${P+c} ${G+c}`,className:B("pointer-events-none",S),style:V,children:o.jsx("path",{d:I,fill:h,stroke:f,strokeWidth:c,transform:g})})}u.__docgenInfo={description:"",methods:[],displayName:"Notch",props:{width:{required:!0,tsType:{name:"number"},description:""},height:{required:!0,tsType:{name:"number"},description:""},notchWidth:{required:!0,tsType:{name:"number"},description:""},notchHeight:{required:!0,tsType:{name:"number"},description:""},notchSide:{required:!1,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},notchOffset:{required:!1,tsType:{name:"number"},description:"Offset from start of edge. Positive = from top/left, negative = from bottom/right",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"8",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'SVG fill color. Defaults to surface-container-low. Set "none" to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'SVG stroke color. Defaults to primary. Set "none" to disable.',defaultValue:{value:'"var(--color-primary)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},headOnly:{required:!1,tsType:{name:"boolean"},description:"Render only the notch tab, no body",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const J={title:"UI/Surfaces/Notch",component:u,args:{width:200,height:150,notchWidth:40,notchHeight:50,notchSide:"right",notchOffset:0,radius:8,inverseRadius:6,strokeWidth:1},argTypes:{notchSide:{control:"select",options:["top","bottom","left","right"]},width:{control:{type:"range",min:100,max:400,step:10}},height:{control:{type:"range",min:80,max:300,step:10}},notchWidth:{control:{type:"range",min:20,max:80,step:2}},notchHeight:{control:{type:"range",min:20,max:100,step:2}},notchOffset:{control:{type:"range",min:-100,max:100,step:1}},radius:{control:{type:"range",min:0,max:20,step:1}},inverseRadius:{control:{type:"range",min:0,max:16,step:1}},strokeWidth:{control:{type:"range",min:0,max:4,step:.5}}}},x={},v={render:()=>o.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(t=>o.jsxs("div",{children:[o.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:t}),o.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchSide:t,notchOffset:0})]},t))})},b={args:{stroke:"none"}},y={args:{fill:"none"}},O={render:()=>o.jsxs("div",{className:"grid grid-cols-2 gap-8 p-4",children:[o.jsxs("div",{children:[o.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: 0 (start)"}),o.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:0})]}),o.jsxs("div",{children:[o.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: 30"}),o.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:30})]}),o.jsxs("div",{children:[o.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: -0 (end)"}),o.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:-0})]}),o.jsxs("div",{children:[o.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: -30"}),o.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:-30})]})]})},N={args:{headOnly:!0,notchWidth:60,notchHeight:40}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"{}",...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map(side => <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">{side}</p>
          <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchSide={side} notchOffset={0} />
        </div>)}
    </div>
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    stroke: "none"
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    fill: "none"
  }
}`,...y.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8 p-4">
      <div>
        <p className="text-xs text-on-surface-variant mb-2">offset: 0 (start)</p>
        <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={0} />
      </div>
      <div>
        <p className="text-xs text-on-surface-variant mb-2">offset: 30</p>
        <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={30} />
      </div>
      <div>
        <p className="text-xs text-on-surface-variant mb-2">offset: -0 (end)</p>
        <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={-0} />
      </div>
      <div>
        <p className="text-xs text-on-surface-variant mb-2">offset: -30</p>
        <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={-30} />
      </div>
    </div>
}`,...O.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    headOnly: true,
    notchWidth: 60,
    notchHeight: 40
  }
}`,...N.parameters?.docs?.source}}};const K=["Playground","AllSides","FillOnly","OutlineOnly","WithOffset","HeadOnly"];export{v as AllSides,b as FillOnly,N as HeadOnly,y as OutlineOnly,x as Playground,O as WithOffset,K as __namedExportsOrder,J as default};
