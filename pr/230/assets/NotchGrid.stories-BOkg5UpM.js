import{r as S,j as w}from"./iframe-B4IrxJRc.js";import{c as K}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const Y=(e,t)=>`${e},${t}`;function W(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function de(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function ye(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:i=0}){const a=e.length,p=(c,u)=>c>=0&&c<a&&u>=0&&u<e[c].length&&!!e[c][u],y=Math.max(0,Math.min(i,t-2))/2,v=new Map,C=(c,u)=>{const f=Y(c[0],c[1]),x=v.get(f);x?x.push(u):v.set(f,[u])};for(let c=0;c<a;c++)for(let u=0;u<e[c].length;u++){if(!e[c][u])continue;const f=[u,c],x=[u+1,c],I=[u+1,c+1],A=[u,c+1];p(c-1,u)||C(f,x),p(c,u+1)||C(x,I),p(c+1,u)||C(I,A),p(c,u-1)||C(A,f)}const R=new Set,j=[],T=(c,u)=>`${c}>${u[0]},${u[1]}`;for(const[c,u]of v){const[f,x]=c.split(",").map(Number);for(const I of u){if(R.has(T(c,I)))continue;const A=[];let L=[f,x],o=c,s=I,h=[0,0];for(;s;){const b=T(o,s);if(R.has(b))break;R.add(b),A.push(L),h=[s[0]-L[0],s[1]-L[1]],L=s,o=Y(s[0],s[1]);const d=v.get(o)??[];let k=null,l=Number.POSITIVE_INFINITY;for(const m of d){if(R.has(T(o,m)))continue;const M=m[0]-L[0],$=m[1]-L[1],U=h[0]*$-h[1]*M;U<l&&(l=U,k=m)}s=k}const g=he(A).map(([b,d])=>[b*t,d*t]);if(g.length>=3){const b=y>0?me(g,y):g;j.push(fe(b,n,r))}}}return j.join(" ")}function he(e){const t=e.length,n=[];for(let r=0;r<t;r++){const i=e[(r-1+t)%t],a=e[r],p=e[(r+1)%t],y=a[0]-i[0],v=a[1]-i[1],C=p[0]-a[0],R=p[1]-a[1];y*R-v*C!==0&&n.push(a)}return n}function me(e,t){const n=e.length,r=e.map((a,p)=>{const y=e[(p+1)%n],v=Math.sign(y[0]-a[0]),C=Math.sign(y[1]-a[1]);return C===0?{axis:"y",value:a[1]+v*t}:{axis:"x",value:a[0]+-C*t}}),i=[];for(let a=0;a<n;a++){const p=r[(a-1+n)%n],y=r[a],v=p.axis==="x"?p.value:y.value,C=p.axis==="y"?p.value:y.value;i.push([v,C])}return i}function fe(e,t,n){const r=e.length,i=[];for(let a=0;a<r;a++){const p=e[(a-1+r)%r],y=e[a],v=e[(a+1)%r],C=H(p,y),R=H(y,v),j=Z(p,y),T=Z(y,v),u=j[0]*T[1]-j[1]*T[0]>0,f=Math.min(u?t:n,C/2,R/2),x=[y[0]-j[0]*f,y[1]-j[1]*f],I=[y[0]+T[0]*f,y[1]+T[1]*f];i.push(`${a===0?"M":"L"} ${Q(x)}`),f>0&&i.push(`A ${z(f)} ${z(f)} 0 0 ${u?1:0} ${Q(I)}`)}return i.push("Z"),i.join(" ")}function H(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function Z(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function z(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Q(e){return`${z(e[0])},${z(e[1])}`}const re=96;function oe({shape:e,tier:t=1,block:n=re,gap:r=0,radius:i=24,inverseRadius:a=32,fill:p="var(--color-surface-container-low)",stroke:y="var(--color-outline-variant)",strokeWidth:v=1,children:C,pad:R=16,noClip:j=!1,className:T,style:c}){const f=`block-shape-clip-${S.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,x=e.length,I=W(e),A=S.useMemo(()=>de(e,t),[e,t]),L=I*n,o=x*n,s=S.useMemo(()=>ye(A,{cell:n,gap:r,radius:i,inverseRadius:a}),[A,n,r,i,a]),h=v/2;return w.jsxs("div",{className:K("relative",T),style:{width:L,height:o,...c},children:[w.jsxs("svg",{width:L,height:o,viewBox:`${-h} ${-h} ${L+v} ${o+v}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!j&&w.jsx("defs",{children:w.jsx("clipPath",{id:f,clipPathUnits:"userSpaceOnUse",children:w.jsx("path",{d:s})})}),w.jsx("path",{d:s,fill:p,stroke:y,strokeWidth:v,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),w.jsx("div",{className:K("absolute inset-0",!j&&"overflow-hidden"),style:{padding:R,clipPath:j?void 0:`url(#${f})`},children:C})]})}oe.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const ve=1e5;function be(e){let t=1,n=1;for(const i of e)t=Math.max(t,i.row+i.rows),n=Math.max(n,i.col+i.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const i of e)for(let a=0;a<i.rows;a++)for(let p=0;p<i.cols;p++)r[i.row+a][i.col+p]=!0;return r}const ge={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function se(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function J(e){return se(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function ke(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let i=0;i<e.length;i++)for(let a=0;a<n;a++){const p=[];for(let y=0;y<e[i].length;y++)for(let v=0;v<n;v++)p.push(e[i][y]);r.push(p)}return r}function ae(e,t){const n={...ge,...t},r=Math.max(1,Math.floor(e.cols)),i=[],a=o=>{for(;i.length<=o;)i.push(new Array(r).fill(!1))},p=(o,s,h)=>{for(let g=0;g<o.length;g++){const b=o[g];for(let d=0;d<b.length;d++){if(!b[d])continue;const k=s+d;if(k<0||k>=r)return!0;const l=h+g;if(a(l),i[l][k])return!0}}return!1},y=(o,s,h)=>{for(let g=0;g<o.length;g++){const b=o[g];for(let d=0;d<b.length;d++)b[d]&&(a(h+g),i[h+g][s+d]=!0)}},v=(o,s,h)=>n.W_pos*Number(o)+n.W_shape*Number(s)+n.W_scale*(h-1),C=o=>{const s=o.desire.position===void 0?[["0",void 0]]:J(o.desire.position),h=J(o.desire.shape),g=o.desire.scale?Array.from({length:n.maxScale},(d,k)=>k+1):[1],b=[];for(const[d,k]of s)for(const[l,m]of h)for(const M of g){const $=M===1?m:ke(m,M);b.push({posKey:d,shapeKey:l,pos:k,mask:$,scale:M,cost:v(d,l,M)})}return b.sort((d,k)=>d.cost-k.cost),b},R=(o,s)=>{const h=W(s.mask),g=s.mask.length;if(h>r)return null;const b=(d,k)=>(y(s.mask,d,k),{key:o.key,item:o.item,col:d,row:k,mask:s.mask,cols:h,rows:g,priorityUsed:{position:s.posKey,shape:s.shapeKey},scale:s.scale,cost:s.cost});if(s.pos){const[d,k]=s.pos;return d>=0&&d+h<=r&&k>=0&&!p(s.mask,d,k)?b(d,k):null}for(let d=0;d<ve;d++)for(let k=0;k+h<=r;k++)if(!p(s.mask,k,d))return b(k,d);return null},j=o=>{for(const s of C(o)){const h=R(o,s);if(h)return h}return null},T=o=>{const s=o.desire.position;return s!==void 0&&!se(s)},c=[],u=[],f=[];for(const o of e.items)if(T(o)){const s=j(o);s?c.push(s):f.push({...o,desire:{...o.desire,position:void 0}})}else f.push(o);for(const o of f){const s=j(o);s?c.push(s):u.push(o.key)}let x=0,I=0;for(const o of c){const s=C(e.items.find(h=>h.key===o.key));x+=o.cost,I+=s[s.length-1]?.cost??0}const A=I===0?1:1-x/I;let L=0;for(const o of c)L=Math.max(L,o.row+o.rows);return{placements:c,rowsUsed:L,unfit:u,satisfaction:A}}const we="neutral",xe={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Le={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},V={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ce={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ne={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Ie(e){const t=e.variant??"auto",n=t==="auto"?we:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function ee(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function Me(e){const t=e??{},{type:n,variant:r}=Ie(t),i=t.gradient??0;switch(n){case"filled":{const a=xe[r];return{fill:a,cssBackground:ee(a,i),color:Le[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:V[r],stroke:Ce[r],strokeWidth:1,elevated:!1};case"elevated":{const a=r==="warn"||r==="error",p=Ne[r];return{fill:p,cssBackground:ee(p,i),color:V[r],stroke:"none",strokeWidth:0,...a?{accentBar:V[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:V[r],stroke:"none",strokeWidth:0,elevated:!1}}}const te=16;function Te(e){return e.map(t=>t.map(n=>n?1:0))}function Se(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function je(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function Re(e){let t=1;for(const n of e){const r=W(je(n.desire.shape)),i=n.desire.position,a=Array.isArray(i)?i[0]:0;t=Math.max(t,a+r)}return t}function ie(e,t){return ae({items:e.map((n,r)=>({key:n.key??`${t}/${r}`,desire:n.desire,item:n})),cols:Re(e)})}function le({items:e,cols:t="auto",blockMin:n=re,gap:r=8,nest:i=!0,primitives:a,onItemError:p,draggable:y=!1,onItemMove:v,className:C,style:R}){const j=S.useRef(null),[T,c]=S.useState(null);S.useLayoutEffect(()=>{const l=j.current;if(!l)return;const m=()=>c(l.getBoundingClientRect().width);if(m(),typeof ResizeObserver>"u")return;const M=new ResizeObserver(m);return M.observe(l),()=>M.disconnect()},[]);const u=S.useMemo(()=>Se(e),[e]),{resolvedCols:f,block:x}=S.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(T==null)return{resolvedCols:null,block:n};const l=Math.max(1,Math.floor(T/n));return{resolvedCols:l,block:T/l}},[t,n,T]),[I,A]=S.useState(new Map),[L,o]=S.useState(null),s=S.useRef(null);s.current=L;const h=S.useCallback(l=>{const m=s.current;if(!m||l.pointerId!==m.pointerId)return;const M=l.clientX-m.startX,$=l.clientY-m.startY;M===m.dx&&$===m.dy||o({...m,dx:M,dy:$})},[]),g=S.useCallback(l=>{const m=s.current;if(!m||l.pointerId!==m.pointerId)return;try{l.currentTarget.releasePointerCapture(l.pointerId)}catch{}o(null);const M=x||n,U=Math.max(0,(f??1)-m.originCols),ce=Math.min(U,Math.max(0,m.originCol+Math.round(m.dx/M))),ue=Math.max(0,m.originRow+Math.round(m.dy/M)),X=[ce,ue];A(pe=>new Map(pe).set(m.key,X)),v?.(m.key,X)},[x,n,f,v]),b=S.useMemo(()=>f==null?null:ae({items:u.map(l=>{const m=I.get(l.key);let M=m?{...l.desire,position:m}:l.desire;if(l.subItems&&l.subItems.length>0){const $=be(ie(l.subItems,l.key).placements);M={...M,shape:$}}return{key:l.key,desire:M,groupKey:l.groupKey,item:l}}),cols:f}),[u,f,i,I]),d=b?.unfit.join(",")??"";S.useEffect(()=>{},[d,f,b]);const k=b?.rowsUsed??0;return w.jsx("div",{ref:j,className:K("relative w-full",C),style:{minHeight:k>0?k*x:void 0,...R},children:b?.placements.map(l=>{const M=L?.key===l.key&&L?[L.dx,L.dy]:void 0;return w.jsx($e,{placement:l,item:l.item,block:x,gap:r,primitives:a,onItemError:p,draggable:y,dragOffset:M,hasOverride:I.has(l.key),onDragStart:y?$=>{if(!($.button!=null&&$.button!==0)){try{$.currentTarget.setPointerCapture($.pointerId)}catch{}o({key:l.key,pointerId:$.pointerId,startX:$.clientX,startY:$.clientY,originCol:l.col,originRow:l.row,originCols:l.cols,dx:0,dy:0})}}:void 0,onDragMove:h,onDragEnd:g},l.key)})})}const $e=S.memo(function({placement:t,item:n,block:r,gap:i,primitives:a,onItemError:p,draggable:y=!1,dragOffset:v,hasOverride:C=!1,onDragStart:R,onDragMove:j,onDragEnd:T}){const c=n.theme??{},u=S.useMemo(()=>Me(c),[c.type,c.variant,c.gradient]),f=S.useMemo(()=>Te(t.mask),[t.mask]),x=S.useMemo(()=>!n.subItems||n.subItems.length===0?null:ie(n.subItems,t.key),[n.subItems,t.key]),I=n.ui?a?.[n.ui.type]:void 0,A=n.ui!=null&&!I;S.useEffect(()=>{A&&p&&n.ui&&p(t.key,{kind:"unknown-primitive",type:n.ui.type})},[A,p,t.key,n.ui]);const L=v!==void 0,o={position:"absolute",left:t.col*r,top:t.row*r,color:u.color};L?(o.transform=`translate(${v[0]}px, ${v[1]}px)`,o.zIndex=20):C&&(o.zIndex=10),y&&(o.cursor=L?"grabbing":"grab",o.touchAction="none");const s=y?{onPointerDown:R,onPointerMove:j,onPointerUp:T,onPointerCancel:T}:void 0;let h=null;return x?h=w.jsx("div",{className:"relative h-full w-full",children:x.placements.map(g=>{const b=g.item,d=b.ui?a?.[b.ui.type]:void 0;return w.jsx("div",{className:"absolute",style:{left:g.col*r,top:g.row*r,width:g.cols*r,height:g.rows*r,padding:te},children:d?w.jsx(d,{...b.ui}):w.jsx(ne,{type:b.ui.type})},g.key)})}):I&&n.ui?h=w.jsx(I,{...n.ui}):A&&n.ui&&(h=w.jsx(ne,{type:n.ui.type})),w.jsx("div",{...s,className:K(y&&"select-none",u.elevated&&"drop-shadow-lg"),style:o,children:w.jsxs(oe,{shape:f,block:r,gap:i,fill:u.fill,stroke:u.stroke,strokeWidth:u.strokeWidth,pad:x?0:te,children:[u.accentBar&&w.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:u.accentBar}}),h]})})});function ne({type:e}){return w.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",w.jsx("code",{className:"ml-1",children:e})]})}le.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:`Enable outer-grid drag-to-place. Dropped items pin to their new cell
 (winning the cell on next solve); everything else re-flows around them.`,defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after a drag drops an item, with its new block position."},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const qe={title:"UI/Notch/NotchGrid",component:le,parameters:{layout:"fullscreen"}},Ae=({label:e,value:t})=>w.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[w.jsx("div",{className:"text-xs opacity-75",children:e}),w.jsx("div",{className:"text-xl font-semibold",children:t})]}),Pe=({label:e,children:t})=>w.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),E={Label:Ae,Center:Pe},P=(...e)=>e.map(t=>t.map(n=>n===1)),N=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),F={args:{primitives:E,items:[{key:"hero",desire:{shape:N(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:N(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:N(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:N(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},D={args:{primitives:E,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:N(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},_={args:{primitives:E,items:[{key:"panel",desire:{shape:N(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:N(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:N(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:N(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:N(1,1)},ui:{type:"Label",label:"B"}}]}]}},q={args:{primitives:E,items:[{key:"first",desire:{position:[0,0],shape:N(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:N(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},G={args:{primitives:E,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:N(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},B={args:{primitives:E,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:P([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:N(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:P([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:N(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:N(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:N(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:N(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:P([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:P([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:N(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:P([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},O={args:{primitives:E,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},items:[{key:"L",desire:{position:[0,0],shape:P([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:P([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:P([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:P([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:N(2,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:N(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,1],shape:N(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}}]}]}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
 closed PRs #193 / #194) — not wired in this story yet.`,...O.parameters?.docs?.description}}};const Ge=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{D as AutoSize,F as Basic,B as CustomShapes,O as Draggable,q as PriorityFallback,_ as SubItems,G as ThemeGallery,Ge as __namedExportsOrder,qe as default};
