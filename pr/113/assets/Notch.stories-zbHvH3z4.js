import{j as a}from"./iframe-KfA8hHxL.js";import{c as _}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function I(s,o,t,c,l,e,i){const d=s+t,h=l+c,f=l===0,r=h>=o,n=[];return n.push(`M ${e},0`),f?(n.push(`H ${d-e}`),n.push(`A ${e},${e} 0 0,1 ${d},${e}`)):(n.push(`H ${s-e}`),n.push(`A ${e},${e} 0 0,1 ${s},${e}`),n.push(`V ${l-i}`),n.push(`A ${i},${i} 0 0,0 ${s+i},${l}`),n.push(`H ${d-e}`),n.push(`A ${e},${e} 0 0,1 ${d},${l+e}`)),r?(n.push(`V ${o-e}`),n.push(`A ${e},${e} 0 0,1 ${d-e},${o}`)):(n.push(`V ${h-e}`),n.push(`A ${e},${e} 0 0,1 ${d-e},${h}`),n.push(`H ${s+i}`),n.push(`A ${i},${i} 0 0,0 ${s},${h+i}`),n.push(`V ${o-e}`),n.push(`A ${e},${e} 0 0,1 ${s-e},${o}`)),n.push(`H ${e}`),n.push(`A ${e},${e} 0 0,1 0,${o-e}`),n.push(`V ${e}`),n.push(`A ${e},${e} 0 0,1 ${e},0`),n.push("Z"),n.join(" ")}function M(s,o,t){return[`M ${t},0`,`H ${s-t}`,`A ${t},${t} 0 0,1 ${s},${t}`,`V ${o-t}`,`A ${t},${t} 0 0,1 ${s-t},${o}`,`H ${t}`,`A ${t},${t} 0 0,1 0,${o-t}`,`V ${t}`,`A ${t},${t} 0 0,1 ${t},0`,"Z"].join(" ")}function Z(s,o,t){return s>=0?s:o-t+s}function u({width:s,height:o,notchWidth:t,notchHeight:c,notchSide:l="right",notchOffset:e=0,radius:i=8,inverseRadius:d=6,fill:h="var(--color-surface-container-low)",stroke:f="var(--color-primary)",strokeWidth:r=1,headOnly:n=!1,className:S,style:V}){const $=r/2;if(n)return a.jsx("svg",{width:t+r,height:c+r,viewBox:`${-$} ${-$} ${t+r} ${c+r}`,className:_("pointer-events-none",S),style:V,children:a.jsx("path",{d:M(t,c,i),fill:h,stroke:f,strokeWidth:r})});const p=l==="right"||l==="left",A=p?s:o,w=p?o:s,T=p?t:c,E=p?c:t,j=p?o:s,H=p?c:t,B=Z(e,j,H),q=i+d;let m=B;m>0&&m<q&&(m=0);const P=j-H-m;P>0&&P<q&&(m=j-H);const D=I(A,w,T,E,m,i,d),W=p?s+t:s,G=p?o:o+c;let g;const R=A+T,F=w;switch(l){case"right":break;case"left":g=`translate(${R}, 0) scale(-1, 1)`;break;case"bottom":g=`translate(0, ${R}) rotate(-90)`;break;case"top":g=`translate(${F}, 0) rotate(90)`;break}return a.jsx("svg",{width:W+r,height:G+r,viewBox:`${-$} ${-$} ${W+r} ${G+r}`,className:_("pointer-events-none",S),style:V,children:a.jsx("path",{d:D,fill:h,stroke:f,strokeWidth:r,transform:g})})}u.__docgenInfo={description:"",methods:[],displayName:"Notch",props:{width:{required:!0,tsType:{name:"number"},description:""},height:{required:!0,tsType:{name:"number"},description:""},notchWidth:{required:!0,tsType:{name:"number"},description:""},notchHeight:{required:!0,tsType:{name:"number"},description:""},notchSide:{required:!1,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},notchOffset:{required:!1,tsType:{name:"number"},description:"Offset from start of edge. Positive = from top/left, negative = from bottom/right",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"8",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'SVG fill color. Defaults to surface-container-low. Set "none" to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'SVG stroke color. Defaults to primary. Set "none" to disable.',defaultValue:{value:'"var(--color-primary)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},headOnly:{required:!1,tsType:{name:"boolean"},description:"Render only the notch tab, no body",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const L={title:"UI/Surfaces/Notch",component:u,args:{width:200,height:150,notchWidth:40,notchHeight:50,notchSide:"right",notchOffset:0,radius:8,inverseRadius:6,strokeWidth:1},argTypes:{notchSide:{control:"select",options:["top","bottom","left","right"]},width:{control:{type:"range",min:100,max:400,step:10}},height:{control:{type:"range",min:80,max:300,step:10}},notchWidth:{control:{type:"range",min:20,max:80,step:2}},notchHeight:{control:{type:"range",min:20,max:100,step:2}},notchOffset:{control:{type:"range",min:-100,max:100,step:1}},radius:{control:{type:"range",min:0,max:20,step:1}},inverseRadius:{control:{type:"range",min:0,max:16,step:1}},strokeWidth:{control:{type:"range",min:0,max:4,step:.5}}}},x={},v={render:()=>a.jsx("div",{className:"grid grid-cols-2 gap-8 p-4",children:["right","left","top","bottom"].map(s=>a.jsxs("div",{children:[a.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:s}),a.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchSide:s,notchOffset:0})]},s))})},b={args:{stroke:"none"}},y={args:{fill:"none"}},O={render:()=>a.jsxs("div",{className:"grid grid-cols-2 gap-8 p-4",children:[a.jsxs("div",{children:[a.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: 0 (start)"}),a.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:0})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: 30"}),a.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:30})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: -0 (end)"}),a.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:-0})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-xs text-on-surface-variant mb-2",children:"offset: -30"}),a.jsx(u,{width:160,height:120,notchWidth:36,notchHeight:40,notchOffset:-30})]})]})},N={args:{headOnly:!0,notchWidth:60,notchHeight:40}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"{}",...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};const U=["Playground","AllSides","FillOnly","OutlineOnly","WithOffset","HeadOnly"];export{v as AllSides,b as FillOnly,N as HeadOnly,y as OutlineOnly,x as Playground,O as WithOffset,U as __namedExportsOrder,L as default};
