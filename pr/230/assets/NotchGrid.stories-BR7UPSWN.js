import{r as T,j as L}from"./iframe-CjmuXq0F.js";import{c as z}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const X=(e,t)=>`${e},${t}`;function ee(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function ce(e,t){return e.map(n=>n.map(a=>a>=1&&a<=t))}function pe(e,{cell:t,radius:n=24,inverseRadius:a=32,gap:y=0}){const s=e.length,d=(i,c)=>i>=0&&i<s&&c>=0&&c<e[i].length&&!!e[i][c],h=Math.max(0,Math.min(y,t-2))/2,v=new Map,w=(i,c)=>{const p=X(i[0],i[1]),N=v.get(p);N?N.push(c):v.set(p,[c])};for(let i=0;i<s;i++)for(let c=0;c<e[i].length;c++){if(!e[i][c])continue;const p=[c,i],N=[c+1,i],I=[c+1,i+1],$=[c,i+1];d(i-1,c)||w(p,N),d(i,c+1)||w(N,I),d(i+1,c)||w(I,$),d(i,c-1)||w($,p)}const j=new Set,S=[],M=(i,c)=>`${i}>${c[0]},${c[1]}`;for(const[i,c]of v){const[p,N]=i.split(",").map(Number);for(const I of c){if(j.has(M(i,I)))continue;const $=[];let x=[p,N],o=i,r=I,b=[0,0];for(;r;){const m=M(o,r);if(j.has(m))break;j.add(m),$.push(x),b=[r[0]-x[0],r[1]-x[1]],x=r,o=X(r[0],r[1]);const u=v.get(o)??[];let g=null,l=Number.POSITIVE_INFINITY;for(const f of u){if(j.has(M(o,f)))continue;const R=f[0]-x[0],P=f[1]-x[1],U=b[0]*P-b[1]*R;U<l&&(l=U,g=f)}r=g}const k=ue($).map(([m,u])=>[m*t,u*t]);if(k.length>=3){const m=h>0?de(k,h):k;S.push(ye(m,n,a))}}}return S.join(" ")}function ue(e){const t=e.length,n=[];for(let a=0;a<t;a++){const y=e[(a-1+t)%t],s=e[a],d=e[(a+1)%t],h=s[0]-y[0],v=s[1]-y[1],w=d[0]-s[0],j=d[1]-s[1];h*j-v*w!==0&&n.push(s)}return n}function de(e,t){const n=e.length,a=e.map((s,d)=>{const h=e[(d+1)%n],v=Math.sign(h[0]-s[0]),w=Math.sign(h[1]-s[1]);return w===0?{axis:"y",value:s[1]+v*t}:{axis:"x",value:s[0]+-w*t}}),y=[];for(let s=0;s<n;s++){const d=a[(s-1+n)%n],h=a[s],v=d.axis==="x"?d.value:h.value,w=d.axis==="y"?d.value:h.value;y.push([v,w])}return y}function ye(e,t,n){const a=e.length,y=[];for(let s=0;s<a;s++){const d=e[(s-1+a)%a],h=e[s],v=e[(s+1)%a],w=Y(d,h),j=Y(h,v),S=H(d,h),M=H(h,v),c=S[0]*M[1]-S[1]*M[0]>0,p=Math.min(c?t:n,w/2,j/2),N=[h[0]-S[0]*p,h[1]-S[1]*p],I=[h[0]+M[0]*p,h[1]+M[1]*p];y.push(`${s===0?"M":"L"} ${Z(N)}`),p>0&&y.push(`A ${K(p)} ${K(p)} 0 0 ${c?1:0} ${Z(I)}`)}return y.push("Z"),y.join(" ")}function Y(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function H(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function K(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Z(e){return`${K(e[0])},${K(e[1])}`}const te=96;function ne({shape:e,tier:t=1,block:n=te,gap:a=0,radius:y=24,inverseRadius:s=32,fill:d="var(--color-surface-container-low)",stroke:h="var(--color-outline-variant)",strokeWidth:v=1,children:w,pad:j=16,noClip:S=!1,className:M,style:i}){const p=`block-shape-clip-${T.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,N=e.length,I=ee(e),$=T.useMemo(()=>ce(e,t),[e,t]),x=I*n,o=N*n,r=T.useMemo(()=>pe($,{cell:n,gap:a,radius:y,inverseRadius:s}),[$,n,a,y,s]),b=v/2;return L.jsxs("div",{className:z("relative",M),style:{width:x,height:o,...i},children:[L.jsxs("svg",{width:x,height:o,viewBox:`${-b} ${-b} ${x+v} ${o+v}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!S&&L.jsx("defs",{children:L.jsx("clipPath",{id:p,clipPathUnits:"userSpaceOnUse",children:L.jsx("path",{d:r})})}),L.jsx("path",{d:r,fill:d,stroke:h,strokeWidth:v,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),L.jsx("div",{className:z("absolute inset-0",!S&&"overflow-hidden"),style:{padding:j,clipPath:S?void 0:`url(#${p})`},children:w})]})}ne.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const he=1e5,me={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function re(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Q(e){return re(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function fe(e,t){if(t<=1)return e;const n=Math.floor(t),a=[];for(let y=0;y<e.length;y++)for(let s=0;s<n;s++){const d=[];for(let h=0;h<e[y].length;h++)for(let v=0;v<n;v++)d.push(e[y][h]);a.push(d)}return a}function oe(e,t){const n={...me,...t},a=Math.max(1,Math.floor(e.cols)),y=[],s=o=>{for(;y.length<=o;)y.push(new Array(a).fill(!1))},d=(o,r,b)=>{for(let k=0;k<o.length;k++){const m=o[k];for(let u=0;u<m.length;u++){if(!m[u])continue;const g=r+u;if(g<0||g>=a)return!0;const l=b+k;if(s(l),y[l][g])return!0}}return!1},h=(o,r,b)=>{for(let k=0;k<o.length;k++){const m=o[k];for(let u=0;u<m.length;u++)m[u]&&(s(b+k),y[b+k][r+u]=!0)}},v=(o,r,b)=>n.W_pos*Number(o)+n.W_shape*Number(r)+n.W_scale*(b-1),w=o=>{const r=o.desire.position===void 0?[["0",void 0]]:Q(o.desire.position),b=Q(o.desire.shape),k=o.desire.scale?Array.from({length:n.maxScale},(u,g)=>g+1):[1],m=[];for(const[u,g]of r)for(const[l,f]of b)for(const R of k){const P=R===1?f:fe(f,R);m.push({posKey:u,shapeKey:l,pos:g,mask:P,scale:R,cost:v(u,l,R)})}return m.sort((u,g)=>u.cost-g.cost),m},j=(o,r)=>{const b=ee(r.mask),k=r.mask.length;if(b>a)return null;const m=(u,g)=>(h(r.mask,u,g),{key:o.key,item:o.item,col:u,row:g,mask:r.mask,cols:b,rows:k,priorityUsed:{position:r.posKey,shape:r.shapeKey},scale:r.scale,cost:r.cost});if(r.pos){const[u,g]=r.pos;return u>=0&&u+b<=a&&g>=0&&!d(r.mask,u,g)?m(u,g):null}for(let u=0;u<he;u++)for(let g=0;g+b<=a;g++)if(!d(r.mask,g,u))return m(g,u);return null},S=o=>{for(const r of w(o)){const b=j(o,r);if(b)return b}return null},M=o=>{const r=o.desire.position;return r!==void 0&&!re(r)},i=[],c=[],p=[];for(const o of e.items)if(M(o)){const r=S(o);r?i.push(r):p.push({...o,desire:{...o.desire,position:void 0}})}else p.push(o);for(const o of p){const r=S(o);r?i.push(r):c.push(o.key)}let N=0,I=0;for(const o of i){const r=w(e.items.find(b=>b.key===o.key));N+=o.cost,I+=r[r.length-1]?.cost??0}const $=I===0?1:1-N/I;let x=0;for(const o of i)x=Math.max(x,o.row+o.rows);return{placements:i,rowsUsed:x,unfit:c,satisfaction:$}}const ve="neutral",be={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},ge={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},V={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},ke={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},we={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function xe(e){const t=e.variant??"auto",n=t==="auto"?ve:t,a=e.type??"auto";return{type:a==="auto"?t==="auto"?"ghost":"filled":a,variant:n}}function J(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function Le(e){const t=e??{},{type:n,variant:a}=xe(t),y=t.gradient??0;switch(n){case"filled":{const s=be[a];return{fill:s,cssBackground:J(s,y),color:ge[a],stroke:"none",strokeWidth:0,boxShadow:"none",filter:"none"}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:V[a],stroke:ke[a],strokeWidth:1,boxShadow:"none",filter:"none"};case"elevated":{const s=a==="warn"||a==="error",d=we[a];return{fill:d,cssBackground:J(d,y),color:V[a],stroke:"none",strokeWidth:0,...s?{accentBar:V[a]}:{},boxShadow:"var(--shadow-m3-1)",filter:"var(--filter-m3-1)"}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:V[a],stroke:"none",strokeWidth:0,boxShadow:"none",filter:"none"}}}function Ce(e){return e.map(t=>t.map(n=>n?1:0))}function Ne(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function ae({items:e,cols:t="auto",blockMin:n=te,gap:a=8,nest:y=!0,primitives:s,onItemError:d,draggable:h=!1,onItemMove:v,className:w,style:j}){const S=T.useRef(null),[M,i]=T.useState(null);T.useLayoutEffect(()=>{const l=S.current;if(!l)return;const f=()=>i(l.getBoundingClientRect().width);if(f(),typeof ResizeObserver>"u")return;const R=new ResizeObserver(f);return R.observe(l),()=>R.disconnect()},[]);const c=T.useMemo(()=>Ne(e),[e]),{resolvedCols:p,block:N}=T.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(M==null)return{resolvedCols:null,block:n};const l=Math.max(1,Math.floor(M/n));return{resolvedCols:l,block:M/l}},[t,n,M]),[I,$]=T.useState(new Map),[x,o]=T.useState(null),r=T.useRef(null);r.current=x;const b=T.useCallback(l=>{const f=r.current;if(!f||l.pointerId!==f.pointerId)return;const R=l.clientX-f.startX,P=l.clientY-f.startY;R===f.dx&&P===f.dy||o({...f,dx:R,dy:P})},[]),k=T.useCallback(l=>{const f=r.current;if(!f||l.pointerId!==f.pointerId)return;try{l.currentTarget.releasePointerCapture(l.pointerId)}catch{}o(null);const R=N||n,U=Math.max(0,(p??1)-f.originCols),se=Math.min(U,Math.max(0,f.originCol+Math.round(f.dx/R))),ie=Math.max(0,f.originRow+Math.round(f.dy/R)),W=[se,ie];$(le=>new Map(le).set(f.key,W)),v?.(f.key,W)},[N,n,p,v]),m=T.useMemo(()=>p==null?null:oe({items:c.map(l=>{const f=I.get(l.key);return{key:l.key,desire:f?{...l.desire,position:f}:l.desire,groupKey:l.groupKey,item:l}}),cols:p}),[c,p,y,I]),u=m?.unfit.join(",")??"";T.useEffect(()=>{},[u,p,m]);const g=m?.rowsUsed??0;return L.jsx("div",{ref:S,className:z("relative w-full",w),style:{minHeight:g>0?g*N:void 0,...j},children:m?.placements.map(l=>{const R=x?.key===l.key&&x?[x.dx,x.dy]:void 0;return L.jsx(Ie,{placement:l,item:l.item,block:N,gap:a,primitives:s,onItemError:d,parentTheme:void 0,draggable:h,dragOffset:R,hasOverride:I.has(l.key),onDragStart:h?P=>{if(!(P.button!=null&&P.button!==0)){try{P.currentTarget.setPointerCapture(P.pointerId)}catch{}o({key:l.key,pointerId:P.pointerId,startX:P.clientX,startY:P.clientY,originCol:l.col,originRow:l.row,originCols:l.cols,dx:0,dy:0})}}:void 0,onDragMove:b,onDragEnd:k},l.key)})})}const Ie=T.memo(function e({placement:t,item:n,block:a,gap:y,primitives:s,onItemError:d,parentTheme:h,draggable:v=!1,dragOffset:w,hasOverride:j=!1,onDragStart:S,onDragMove:M,onDragEnd:i}){const c=h?{...n.theme,type:h.type}:n.theme??{},p=T.useMemo(()=>Le(c),[c.type,c.variant,c.gradient]),N=T.useMemo(()=>Ce(t.mask),[t.mask]),I=T.useMemo(()=>!n.subItems||n.subItems.length===0?null:oe({items:n.subItems.map((m,u)=>({key:m.key??`${t.key}/${u}`,desire:m.desire,item:m})),cols:t.cols}),[n.subItems,t.cols,t.key]),$=n.ui?s?.[n.ui.type]:void 0,x=n.ui!=null&&!$;T.useEffect(()=>{x&&d&&n.ui&&d(t.key,{kind:"unknown-primitive",type:n.ui.type})},[x,d,t.key,n.ui]);const o=w!==void 0,r={position:"absolute",left:t.col*a,top:t.row*a,color:p.color};p.filter!=="none"&&(r.filter=p.filter),o?(r.transform=`translate(${w[0]}px, ${w[1]}px)`,r.zIndex=20):j&&(r.zIndex=10),v&&(r.cursor=o?"grabbing":"grab",r.touchAction="none");const b=v?{onPointerDown:S,onPointerMove:M,onPointerUp:i,onPointerCancel:i}:void 0;let k=null;return I?k=L.jsx("div",{className:"relative h-full w-full",children:I.placements.map(m=>L.jsx(e,{placement:m,item:m.item,block:a,gap:y,primitives:s,onItemError:d,parentTheme:c},m.key))}):$&&n.ui?k=L.jsx($,{...n.ui}):x&&n.ui&&(k=L.jsx(Te,{type:n.ui.type})),L.jsx("div",{...b,className:v?"select-none":void 0,style:r,children:L.jsxs(ne,{shape:N,block:a,gap:y,fill:p.fill,stroke:p.stroke,strokeWidth:p.strokeWidth,pad:I?0:16,children:[p.accentBar&&L.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:p.accentBar}}),k]})})});function Te({type:e}){return L.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",L.jsx("code",{className:"ml-1",children:e})]})}ae.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:`Enable outer-grid drag-to-place. Dropped items pin to their new cell
 (winning the cell on next solve); everything else re-flows around them.`,defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after a drag drops an item, with its new block position."},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Pe={title:"UI/Notch/NotchGrid",component:ae,parameters:{layout:"fullscreen"}},Se=({label:e,value:t})=>L.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[L.jsx("div",{className:"text-xs opacity-75",children:e}),L.jsx("div",{className:"text-xl font-semibold",children:t})]}),Me=({label:e,children:t})=>L.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),A={Label:Se,Center:Me},E=(...e)=>e.map(t=>t.map(n=>n===1)),C=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),F={args:{primitives:A,items:[{key:"hero",desire:{shape:C(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:C(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:C(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:C(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},D={args:{primitives:A,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:C(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},_={args:{primitives:A,items:[{key:"panel",desire:{shape:C(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:C(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:C(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:C(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:C(1,1)},ui:{type:"Label",label:"B"}}]}]}},q={args:{primitives:A,items:[{key:"first",desire:{position:[0,0],shape:C(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:C(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},G={args:{primitives:A,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:C(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},B={args:{primitives:A,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:E([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:C(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:E([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:C(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:C(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:C(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:C(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:E([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:E([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:C(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:E([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},O={args:{primitives:A,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},items:[{key:"L",desire:{position:[0,0],shape:E([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:E([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:E([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:E([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:C(2,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:C(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,1],shape:C(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}}]}]}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    items: [{
      key: "hero",
      desire: {
        shape: r(2, 2)
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "Hero",
        value: "42"
      }
    }, {
      key: "users",
      desire: {
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "Users",
        value: "1,204"
      }
    }, {
      key: "events",
      desire: {
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "tertiary"
      },
      ui: {
        type: "Label",
        label: "Events",
        value: "8.3k"
      }
    }, {
      key: "uptime",
      desire: {
        shape: r(2, 1)
      },
      theme: {
        type: "outlined",
        variant: "neutral"
      },
      ui: {
        type: "Label",
        label: "Uptime",
        value: "99.94%"
      }
    }] satisfies NotchGridItem[]
  }
}`,...F.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    items: Array.from({
      length: 12
    }, (_, i) => ({
      key: \`t\${i}\`,
      desire: {
        shape: r(1, 1)
      },
      theme: {
        type: "filled" as const,
        variant: (["primary", "secondary", "tertiary", "neutral"] as const)[i % 4]
      },
      ui: {
        type: "Label",
        label: \`#\${i + 1}\`,
        value: i + 1
      }
    }))
  }
}`,...D.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...D.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    items: [{
      key: "panel",
      desire: {
        shape: r(3, 3)
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      subItems: [{
        desire: {
          position: [0, 0],
          shape: r(2, 2)
        },
        ui: {
          type: "Label",
          label: "Big",
          value: "★"
        }
      }, {
        desire: {
          position: [2, 0],
          shape: r(1, 1)
        },
        ui: {
          type: "Label",
          label: "A"
        }
      }, {
        desire: {
          position: [0, 2],
          shape: r(2, 1)
        },
        ui: {
          type: "Label",
          label: "Wide"
        }
      }, {
        desire: {
          position: [2, 2],
          shape: r(1, 1)
        },
        ui: {
          type: "Label",
          label: "B"
        }
      }]
    }] satisfies NotchGridItem[]
  }
}`,..._.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,..._.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    items: [{
      key: "first",
      desire: {
        position: [0, 0],
        shape: r(2, 2)
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "First",
        value: "wins (0,0)"
      }
    }, {
      key: "second",
      desire: {
        position: {
          "0": [0, 0],
          "1": [2, 0]
        },
        shape: r(2, 2)
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "Second",
        value: "falls to (2,0)"
      }
    }] satisfies NotchGridItem[]
  }
}`,...q.parameters?.docs?.source},description:{story:`Priority-mapped position: each tile prefers (0,0), but only the first to
 claim it lands there. Others fall back to their secondary positions.`,...q.parameters?.docs?.description}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    cols: 6,
    blockMin: 120,
    items: (["filled", "outlined", "elevated", "ghost"] as const).flatMap(type => (["primary", "secondary", "tertiary", "neutral", "warn", "error"] as const).map(variant => ({
      key: \`\${type}-\${variant}\`,
      desire: {
        shape: r(1, 1)
      },
      theme: {
        type,
        variant
      },
      ui: {
        type: "Center",
        label: \`\${type} \${variant}\`
      }
    }))) as NotchGridItem[]
  }
}`,...G.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations. `cols: 6` keeps each chrome\n `type` on its own row (6 variants across) so the rows read as\n filled / outlined / elevated / ghost top-to-bottom. Elevated tiles\n carry the variant accent on their text so they don't all look alike.",...G.parameters?.docs?.description}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    cols: 8,
    blockMin: 96,
    items: [
    // L-hero (3×3 with bottom-right corner notched out)
    {
      key: "L",
      desire: {
        position: [0, 0],
        shape: m([1, 1, 1], [1, 1, 1], [1, 1, 0])
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "L-hero",
        value: "3×3 − ⌐"
      }
    },
    // 1×1 dropping into L's bottom-right notch (col 2, row 2)
    {
      key: "L-notch-fill",
      desire: {
        position: [2, 2],
        shape: r(1, 1)
      },
      theme: {
        type: "outlined",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "Nestled"
      }
    },
    // Plus shape (4 corner notches)
    {
      key: "plus",
      desire: {
        position: [3, 0],
        shape: m([0, 1, 0], [1, 1, 1], [0, 1, 0])
      },
      theme: {
        type: "filled",
        variant: "tertiary"
      },
      ui: {
        type: "Center",
        label: "✚"
      }
    },
    // 1×1s dropping into the plus's four corner notches
    {
      key: "p-tl",
      desire: {
        position: [3, 0],
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "↖"
      }
    }, {
      key: "p-tr",
      desire: {
        position: [5, 0],
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "↗"
      }
    }, {
      key: "p-bl",
      desire: {
        position: [3, 2],
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "↙"
      }
    }, {
      key: "p-br",
      desire: {
        position: [5, 2],
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "↘"
      }
    },
    // T shape (3×2 with the bottom corners notched out)
    {
      key: "T",
      desire: {
        position: [0, 3],
        shape: m([1, 1, 1], [0, 1, 0])
      },
      theme: {
        type: "outlined",
        variant: "neutral"
      },
      ui: {
        type: "Center",
        label: "T"
      }
    },
    // 4×2 chart with notched top-right corner (the closed PR's chart shape)
    {
      key: "chart",
      desire: {
        position: [4, 3],
        shape: m([1, 1, 1, 0], [1, 1, 1, 1])
      },
      theme: {
        type: "filled",
        variant: "tertiary"
      },
      ui: {
        type: "Label",
        label: "Usage",
        value: "30d"
      }
    },
    // 1×1 dropping into the chart's top-right notch
    {
      key: "chart-notch",
      desire: {
        position: [7, 3],
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "Now"
      }
    },
    // Diagonal junction — a 2×2 block and a 1×1 block meet only at a
    // corner. Exercises the outline tracer's diagonal-junction handling
    // (the two regions read as one shape with two concave arcs facing
    // each other, per PR #188).
    //   o o x
    //   o o x
    //   x x o
    {
      key: "diagonal",
      desire: {
        position: [0, 5],
        shape: m([1, 1, 0], [1, 1, 0], [0, 0, 1])
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "Diagonal",
        value: "junction"
      }
    }] satisfies NotchGridItem[]
  }
}`,...B.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...B.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    cols: 8,
    blockMin: 96,
    draggable: true,
    onItemMove: (key, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] drop:", key, pos);
    },
    items: [{
      key: "L",
      desire: {
        position: [0, 0],
        shape: m([1, 1, 1], [1, 1, 1], [1, 1, 0])
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "L-hero",
        value: "drag me"
      }
    }, {
      key: "plus",
      desire: {
        position: [3, 0],
        shape: m([0, 1, 0], [1, 1, 1], [0, 1, 0])
      },
      theme: {
        type: "filled",
        variant: "tertiary"
      },
      ui: {
        type: "Center",
        label: "✚"
      }
    }, {
      key: "chart",
      desire: {
        position: [6, 0],
        shape: m([1, 1, 0], [1, 1, 1])
      },
      theme: {
        type: "elevated",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "Usage",
        value: "30d"
      }
    }, {
      key: "diagonal",
      desire: {
        position: [0, 3],
        shape: m([1, 1, 0], [1, 1, 0], [0, 0, 1])
      },
      theme: {
        type: "filled",
        variant: "secondary"
      },
      ui: {
        type: "Label",
        label: "Diagonal",
        value: "junction"
      }
    }, {
      key: "panel",
      desire: {
        position: [3, 3],
        shape: r(2, 2)
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      subItems: [{
        desire: {
          position: [0, 0],
          shape: r(1, 1)
        },
        ui: {
          type: "Label",
          label: "Cron",
          value: "8/d"
        }
      }, {
        desire: {
          position: [1, 1],
          shape: r(1, 1)
        },
        ui: {
          type: "Label",
          label: "Calls",
          value: "1.2k"
        }
      }]
    }] satisfies NotchGridItem[]
  }
}`,...O.parameters?.docs?.source},description:{story:`Outer-grid drag over the same rich notched footprints as \`CustomShapes\`:
 grab any top-level tile (incl. L-hero, plus, chart, diagonal, and the
 sub-item panel) and drop it on another cell — it pins to the new spot and
 everything else re-flows around it. \`onItemMove\` reports the new
 \`[col, row]\`.

 NOTE: dragging a *sub-item* out of the panel (promote-to-outer) and
 dragging the panel chrome itself are the next slice (re-targeted from
 closed PRs #193 / #194) — not wired in this story yet.`,...O.parameters?.docs?.description}}};const Ee=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{D as AutoSize,F as Basic,B as CustomShapes,O as Draggable,q as PriorityFallback,_ as SubItems,G as ThemeGallery,Ee as __namedExportsOrder,Pe as default};
