import{r as j,j as k}from"./iframe-DXENWXWT.js";import{c as z}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const Z=(e,t)=>`${e},${t}`;function ee(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function ie(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function le(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:p=0}){const s=e.length,h=(i,l)=>i>=0&&i<s&&l>=0&&l<e[i].length&&!!e[i][l],d=Math.max(0,Math.min(p,t-2))/2,u=new Map,g=(i,l)=>{const m=Z(i[0],i[1]),L=u.get(m);L?L.push(l):u.set(m,[l])};for(let i=0;i<s;i++)for(let l=0;l<e[i].length;l++){if(!e[i][l])continue;const m=[l,i],L=[l+1,i],c=[l+1,i+1],C=[l,i+1];h(i-1,l)||g(m,L),h(i,l+1)||g(L,c),h(i+1,l)||g(c,C),h(i,l-1)||g(C,m)}const w=new Set,T=[],x=(i,l)=>`${i}>${l[0]},${l[1]}`;for(const[i,l]of u){const[m,L]=i.split(",").map(Number);for(const c of l){if(w.has(x(i,c)))continue;const C=[];let I=[m,L],o=i,a=c,v=[0,0];for(;a;){const N=x(o,a);if(w.has(N))break;w.add(N),C.push(I),v=[a[0]-I[0],a[1]-I[1]],I=a,o=Z(a[0],a[1]);const y=u.get(o)??[];let b=null,M=Number.POSITIVE_INFINITY;for(const E of y){if(w.has(x(o,E)))continue;const R=E[0]-I[0],F=E[1]-I[1],W=v[0]*F-v[1]*R;W<M&&(M=W,b=E)}a=b}const S=ce(C).map(([N,y])=>[N*t,y*t]);if(S.length>=3){const N=d>0?pe(S,d):S;T.push(ue(N,n,r))}}}return T.join(" ")}function ce(e){const t=e.length,n=[];for(let r=0;r<t;r++){const p=e[(r-1+t)%t],s=e[r],h=e[(r+1)%t],d=s[0]-p[0],u=s[1]-p[1],g=h[0]-s[0],w=h[1]-s[1];d*w-u*g!==0&&n.push(s)}return n}function pe(e,t){const n=e.length,r=e.map((s,h)=>{const d=e[(h+1)%n],u=Math.sign(d[0]-s[0]),g=Math.sign(d[1]-s[1]);return g===0?{axis:"y",value:s[1]+u*t}:{axis:"x",value:s[0]+-g*t}}),p=[];for(let s=0;s<n;s++){const h=r[(s-1+n)%n],d=r[s],u=h.axis==="x"?h.value:d.value,g=h.axis==="y"?h.value:d.value;p.push([u,g])}return p}function ue(e,t,n){const r=e.length,p=[];for(let s=0;s<r;s++){const h=e[(s-1+r)%r],d=e[s],u=e[(s+1)%r],g=H(h,d),w=H(d,u),T=Q(h,d),x=Q(d,u),l=T[0]*x[1]-T[1]*x[0]>0,m=Math.min(l?t:n,g/2,w/2),L=[d[0]-T[0]*m,d[1]-T[1]*m],c=[d[0]+x[0]*m,d[1]+x[1]*m];p.push(`${s===0?"M":"L"} ${X(L)}`),m>0&&p.push(`A ${V(m)} ${V(m)} 0 0 ${l?1:0} ${X(c)}`)}return p.push("Z"),p.join(" ")}function H(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function Q(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function V(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function X(e){return`${V(e[0])},${V(e[1])}`}const te=96;function ne({shape:e,tier:t=1,block:n=te,gap:r=0,radius:p=24,inverseRadius:s=32,fill:h="var(--color-surface-container-low)",stroke:d="var(--color-outline-variant)",strokeWidth:u=1,children:g,pad:w=16,noClip:T=!1,className:x,style:i}){const m=`block-shape-clip-${j.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,L=e.length,c=ee(e),C=j.useMemo(()=>ie(e,t),[e,t]),I=c*n,o=L*n,a=j.useMemo(()=>le(C,{cell:n,gap:r,radius:p,inverseRadius:s}),[C,n,r,p,s]),v=u/2;return k.jsxs("div",{className:z("relative",x),style:{width:I,height:o,...i},children:[k.jsxs("svg",{width:I,height:o,viewBox:`${-v} ${-v} ${I+u} ${o+u}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!T&&k.jsx("defs",{children:k.jsx("clipPath",{id:m,clipPathUnits:"userSpaceOnUse",children:k.jsx("path",{d:a})})}),k.jsx("path",{d:a,fill:h,stroke:d,strokeWidth:u,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),k.jsx("div",{className:z("absolute inset-0",!T&&"overflow-hidden"),style:{padding:w,clipPath:T?void 0:`url(#${m})`},children:g})]})}ne.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const de=1e5,ye={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function re(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Y(e){return re(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function he(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let p=0;p<e.length;p++)for(let s=0;s<n;s++){const h=[];for(let d=0;d<e[p].length;d++)for(let u=0;u<n;u++)h.push(e[p][d]);r.push(h)}return r}function oe(e,t){const n={...ye,...t},r=Math.max(1,Math.floor(e.cols)),p=[],s=o=>{for(;p.length<=o;)p.push(new Array(r).fill(!1))},h=(o,a,v)=>{for(let S=0;S<o.length;S++){const N=o[S];for(let y=0;y<N.length;y++){if(!N[y])continue;const b=a+y;if(b<0||b>=r)return!0;const M=v+S;if(s(M),p[M][b])return!0}}return!1},d=(o,a,v)=>{for(let S=0;S<o.length;S++){const N=o[S];for(let y=0;y<N.length;y++)N[y]&&(s(v+S),p[v+S][a+y]=!0)}},u=(o,a,v)=>n.W_pos*Number(o)+n.W_shape*Number(a)+n.W_scale*(v-1),g=o=>{const a=o.desire.position===void 0?[["0",void 0]]:Y(o.desire.position),v=Y(o.desire.shape),S=o.desire.scale?Array.from({length:n.maxScale},(y,b)=>b+1):[1],N=[];for(const[y,b]of a)for(const[M,E]of v)for(const R of S){const F=R===1?E:he(E,R);N.push({posKey:y,shapeKey:M,pos:b,mask:F,scale:R,cost:u(y,M,R)})}return N.sort((y,b)=>y.cost-b.cost),N},w=(o,a)=>{const v=ee(a.mask),S=a.mask.length;if(v>r)return null;const N=(y,b)=>(d(a.mask,y,b),{key:o.key,item:o.item,col:y,row:b,mask:a.mask,cols:v,rows:S,priorityUsed:{position:a.posKey,shape:a.shapeKey},scale:a.scale,cost:a.cost});if(a.pos){const[y,b]=a.pos;return y>=0&&y+v<=r&&b>=0&&!h(a.mask,y,b)?N(y,b):null}for(let y=0;y<de;y++)for(let b=0;b+v<=r;b++)if(!h(a.mask,b,y))return N(b,y);return null},T=o=>{for(const a of g(o)){const v=w(o,a);if(v)return v}return null},x=o=>{const a=o.desire.position;return a!==void 0&&!re(a)},i=[],l=[],m=[];for(const o of e.items)if(x(o)){const a=T(o);a?i.push(a):m.push({...o,desire:{...o.desire,position:void 0}})}else m.push(o);for(const o of m){const a=T(o);a?i.push(a):l.push(o.key)}let L=0,c=0;for(const o of i){const a=g(e.items.find(v=>v.key===o.key));L+=o.cost,c+=a[a.length-1]?.cost??0}const C=c===0?1:1-L/c;let I=0;for(const o of i)I=Math.max(I,o.row+o.rows);return{placements:i,rowsUsed:I,unfit:l,satisfaction:C}}const me="neutral",fe={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},ve={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},K={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},be={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},ge={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function ke(e){const t=e.variant??"auto",n=t==="auto"?me:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function J(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function we(e){const t=e??{},{type:n,variant:r}=ke(t),p=t.gradient??0;switch(n){case"filled":return{background:J(fe[r],p),color:ve[r],border:"none",boxShadow:"none",filter:"none"};case"outlined":return{background:"transparent",color:K[r],border:`1px solid ${be[r]}`,boxShadow:"none",filter:"none"};case"elevated":{const s=r==="warn"||r==="error";return{background:J(ge[r],p),color:"var(--color-on-surface)",border:"none",...s?{accentBar:K[r]}:{},boxShadow:"var(--shadow-m3-1)",filter:"var(--filter-m3-1)"}}case"ghost":return{background:"transparent",color:K[r],border:"none",boxShadow:"none",filter:"none"}}}function xe(e){return e.map(t=>t.map(n=>n?1:0))}function Le(e){if(e==="none")return{stroke:"none",strokeWidth:0};const t=e.match(/^(\d+)px\s+solid\s+(.+)$/);return t?{stroke:t[2],strokeWidth:Number(t[1])}:{stroke:e,strokeWidth:1}}function Ne(e){return e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function ae({items:e,cols:t="auto",blockMin:n=te,gap:r=8,nest:p=!0,primitives:s,onItemError:h,className:d,style:u}){const g=j.useRef(null),[w,T]=j.useState(null);j.useLayoutEffect(()=>{const c=g.current;if(!c)return;const C=()=>T(c.getBoundingClientRect().width);if(C(),typeof ResizeObserver>"u")return;const I=new ResizeObserver(C);return I.observe(c),()=>I.disconnect()},[]);const x=j.useMemo(()=>Ne(e),[e]),{resolvedCols:i,block:l}=j.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(w==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(w/n));return{resolvedCols:c,block:w/c}},[t,n,w]),m=j.useMemo(()=>i==null?null:oe({items:x.map(c=>({key:c.key,desire:c.desire,groupKey:c.groupKey,item:c})),cols:i}),[x,i,p]),L=m?.rowsUsed??0;return k.jsx("div",{ref:g,className:z("relative w-full",d),style:{minHeight:L>0?L*l:void 0,...u},children:m?m.placements.map(c=>k.jsx(se,{placement:c,item:c.item,block:l,gap:r,primitives:s,onItemError:h,parentTheme:void 0},c.key)):null})}function se({placement:e,item:t,block:n,gap:r,primitives:p,onItemError:s,parentTheme:h}){const d=h?{...t.theme,type:h.type}:t.theme??{},u=we(d),{stroke:g,strokeWidth:w}=Le(u.border),T=j.useMemo(()=>xe(e.mask),[e.mask]),x=j.useMemo(()=>!t.subItems||t.subItems.length===0?null:oe({items:t.subItems.map((c,C)=>({key:c.key??`${e.key}/${C}`,desire:c.desire,item:{...c}})),cols:e.cols}),[t.subItems,e.cols,e.key]),i=t.ui?p?.[t.ui.type]:void 0,l=t.ui!=null&&!i;j.useEffect(()=>{l&&s&&t.ui&&s(e.key,{kind:"unknown-primitive",type:t.ui.type})},[l,s,e.key,t.ui]);const m={position:"absolute",left:e.col*n,top:e.row*n,color:u.color,...u.filter!=="none"?{filter:u.filter}:{}},L=u.background.startsWith("linear-gradient")?void 0:u.background;return k.jsx("div",{style:m,children:k.jsxs(ne,{shape:T,block:n,gap:r,fill:L??"transparent",stroke:g,strokeWidth:w,pad:x?0:16,children:[u.accentBar&&k.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute top-2 bottom-2 left-2 w-1 rounded-full",style:{background:u.accentBar}}),x?k.jsx("div",{className:"relative h-full w-full",children:x.placements.map(c=>k.jsx(se,{placement:c,item:c.item,block:n,gap:r,primitives:p,onItemError:s,parentTheme:d},c.key))}):i&&t.ui?k.jsx(i,{...t.ui}):l&&t.ui?k.jsx(Te,{type:t.ui.type}):null]})})}function Te({type:e}){return k.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",k.jsx("code",{className:"ml-1",children:e})]})}ae.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const $e={title:"UI/Notch/NotchGrid",component:ae,parameters:{layout:"fullscreen"}},Se=({label:e,value:t})=>k.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[k.jsx("div",{className:"text-xs opacity-75",children:e}),k.jsx("div",{className:"text-xl font-semibold",children:t})]}),Ie=({label:e,children:t})=>k.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),$={Label:Se,Center:Ie},A=(...e)=>e.map(t=>t.map(n=>n===1)),f=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),U={args:{primitives:$,items:[{key:"hero",desire:{shape:f(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:f(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:f(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},P={args:{primitives:$,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:f(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},_={args:{primitives:$,items:[{key:"panel",desire:{shape:f(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:f(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:f(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:f(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:f(1,1)},ui:{type:"Label",label:"B"}}]}]}},G={args:{primitives:$,items:[{key:"first",desire:{position:[0,0],shape:f(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:f(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},q={args:{primitives:$,cols:4,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:f(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${t}`}})))}},D={args:{primitives:$,onItemError:(e,t)=>{console.warn("[NotchGrid story] onItemError:",e,t)},items:[{key:"known",desire:{shape:f(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"OK"}},{key:"broken",desire:{shape:f(2,2)},theme:{type:"outlined",variant:"error"},ui:{type:"DoesNotExist"}}]}},O={args:{primitives:$,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:A([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:f(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:A([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:A([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:A([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:f(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:A([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},B={args:{primitives:$,items:[{key:"hero",desire:{position:[0,0],shape:A([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Module",value:"MirrorStack"}},{key:"installs",desire:{position:[2,2],shape:f(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Installs",value:"12"}},{key:"panel",desire:{position:[3,0],shape:f(2,3)},theme:{type:"filled",variant:"tertiary"},subItems:[{desire:{position:[0,0],shape:f(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[0,1],shape:f(2,2)},ui:{type:"Label",label:"Calls × markup",value:"$420"}}]},{key:"tenants",desire:{position:[0,3],shape:f(1,1)},theme:{type:"elevated",variant:"neutral"},ui:{type:"Label",label:"Tenants",value:"47"}}]}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...P.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,..._.parameters?.docs?.description}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source},description:{story:`Priority-mapped position: each tile prefers (0,0), but only the first to
 claim it lands there. Others fall back to their secondary positions.`,...G.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    cols: 4,
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
        label: \`\${variant}\`
      }
    }))) as NotchGridItem[]
  }
}`,...q.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations applied to identical 1×1 tiles.",...q.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    onItemError: (key, error) => {
      // eslint-disable-next-line no-console
      console.warn("[NotchGrid story] onItemError:", key, error);
    },
    items: [{
      key: "known",
      desire: {
        shape: r(1, 1)
      },
      theme: {
        type: "filled",
        variant: "primary"
      },
      ui: {
        type: "Label",
        label: "OK"
      }
    }, {
      key: "broken",
      desire: {
        shape: r(2, 2)
      },
      theme: {
        type: "outlined",
        variant: "error"
      },
      ui: {
        type: "DoesNotExist"
      }
    }] satisfies NotchGridItem[]
  }
}`,...D.parameters?.docs?.source},description:{story:"Unknown `ui.type` fires `onItemError` and renders an in-tile placeholder\n so the layout doesn't collapse. The renderer can then drive the\n L3 agent-sidebar flow (see dynamic-ui TBD 04 L3).",...D.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...O.parameters?.docs?.description}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    items: [{
      key: "hero",
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
        label: "Module",
        value: "MirrorStack"
      }
    }, {
      key: "installs",
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
        label: "Installs",
        value: "12"
      }
    }, {
      key: "panel",
      desire: {
        position: [3, 0],
        shape: r(2, 3)
      },
      theme: {
        type: "filled",
        variant: "tertiary"
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
          position: [0, 1],
          shape: r(2, 2)
        },
        ui: {
          type: "Label",
          label: "Calls × markup",
          value: "$420"
        }
      }]
    }, {
      key: "tenants",
      desire: {
        position: [0, 3],
        shape: r(1, 1)
      },
      theme: {
        type: "elevated",
        variant: "neutral"
      },
      ui: {
        type: "Label",
        label: "Tenants",
        value: "47"
      }
    }] satisfies NotchGridItem[]
  }
}`,...B.parameters?.docs?.source},description:{story:`The architecture doc's overview-page example, adapted: an L-shaped hero,
 a sub-item panel with mixed sizes, and a few accessory tiles.`,...B.parameters?.docs?.description}}};const Ee=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","UnknownPrimitive","CustomShapes","OverviewPage"];export{P as AutoSize,U as Basic,O as CustomShapes,B as OverviewPage,G as PriorityFallback,_ as SubItems,q as ThemeGallery,D as UnknownPrimitive,Ee as __namedExportsOrder,$e as default};
