import{r as $,j as k}from"./iframe-BS4g-Ane.js";import{c as z}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const Z=(e,t)=>`${e},${t}`;function ee(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function ie(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function le(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:p=0}){const a=e.length,m=(i,l)=>i>=0&&i<a&&l>=0&&l<e[i].length&&!!e[i][l],d=Math.max(0,Math.min(p,t-2))/2,u=new Map,g=(i,l)=>{const h=Z(i[0],i[1]),L=u.get(h);L?L.push(l):u.set(h,[l])};for(let i=0;i<a;i++)for(let l=0;l<e[i].length;l++){if(!e[i][l])continue;const h=[l,i],L=[l+1,i],c=[l+1,i+1],C=[l,i+1];m(i-1,l)||g(h,L),m(i,l+1)||g(L,c),m(i+1,l)||g(c,C),m(i,l-1)||g(C,h)}const w=new Set,T=[],x=(i,l)=>`${i}>${l[0]},${l[1]}`;for(const[i,l]of u){const[h,L]=i.split(",").map(Number);for(const c of l){if(w.has(x(i,c)))continue;const C=[];let I=[h,L],s=i,o=c,v=[0,0];for(;o;){const N=x(s,o);if(w.has(N))break;w.add(N),C.push(I),v=[o[0]-I[0],o[1]-I[1]],I=o,s=Z(o[0],o[1]);const y=u.get(s)??[];let b=null,M=Number.POSITIVE_INFINITY;for(const E of y){if(w.has(x(s,E)))continue;const R=E[0]-I[0],F=E[1]-I[1],W=v[0]*F-v[1]*R;W<M&&(M=W,b=E)}o=b}const S=ce(C).map(([N,y])=>[N*t,y*t]);if(S.length>=3){const N=d>0?pe(S,d):S;T.push(ue(N,n,r))}}}return T.join(" ")}function ce(e){const t=e.length,n=[];for(let r=0;r<t;r++){const p=e[(r-1+t)%t],a=e[r],m=e[(r+1)%t],d=a[0]-p[0],u=a[1]-p[1],g=m[0]-a[0],w=m[1]-a[1];d*w-u*g!==0&&n.push(a)}return n}function pe(e,t){const n=e.length,r=e.map((a,m)=>{const d=e[(m+1)%n],u=Math.sign(d[0]-a[0]),g=Math.sign(d[1]-a[1]);return g===0?{axis:"y",value:a[1]+u*t}:{axis:"x",value:a[0]+-g*t}}),p=[];for(let a=0;a<n;a++){const m=r[(a-1+n)%n],d=r[a],u=m.axis==="x"?m.value:d.value,g=m.axis==="y"?m.value:d.value;p.push([u,g])}return p}function ue(e,t,n){const r=e.length,p=[];for(let a=0;a<r;a++){const m=e[(a-1+r)%r],d=e[a],u=e[(a+1)%r],g=H(m,d),w=H(d,u),T=Q(m,d),x=Q(d,u),l=T[0]*x[1]-T[1]*x[0]>0,h=Math.min(l?t:n,g/2,w/2),L=[d[0]-T[0]*h,d[1]-T[1]*h],c=[d[0]+x[0]*h,d[1]+x[1]*h];p.push(`${a===0?"M":"L"} ${X(L)}`),h>0&&p.push(`A ${B(h)} ${B(h)} 0 0 ${l?1:0} ${X(c)}`)}return p.push("Z"),p.join(" ")}function H(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function Q(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function B(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function X(e){return`${B(e[0])},${B(e[1])}`}const te=96;function ne({shape:e,tier:t=1,block:n=te,gap:r=0,radius:p=24,inverseRadius:a=32,fill:m="var(--color-surface-container-low)",stroke:d="var(--color-outline-variant)",strokeWidth:u=1,children:g,pad:w=16,noClip:T=!1,className:x,style:i}){const h=`block-shape-clip-${$.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,L=e.length,c=ee(e),C=$.useMemo(()=>ie(e,t),[e,t]),I=c*n,s=L*n,o=$.useMemo(()=>le(C,{cell:n,gap:r,radius:p,inverseRadius:a}),[C,n,r,p,a]),v=u/2;return k.jsxs("div",{className:z("relative",x),style:{width:I,height:s,...i},children:[k.jsxs("svg",{width:I,height:s,viewBox:`${-v} ${-v} ${I+u} ${s+u}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!T&&k.jsx("defs",{children:k.jsx("clipPath",{id:h,clipPathUnits:"userSpaceOnUse",children:k.jsx("path",{d:o})})}),k.jsx("path",{d:o,fill:m,stroke:d,strokeWidth:u,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),k.jsx("div",{className:z("absolute inset-0",!T&&"overflow-hidden"),style:{padding:w,clipPath:T?void 0:`url(#${h})`},children:g})]})}ne.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const de=1e5,ye={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function re(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Y(e){return re(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function me(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let p=0;p<e.length;p++)for(let a=0;a<n;a++){const m=[];for(let d=0;d<e[p].length;d++)for(let u=0;u<n;u++)m.push(e[p][d]);r.push(m)}return r}function se(e,t){const n={...ye,...t},r=Math.max(1,Math.floor(e.cols)),p=[],a=s=>{for(;p.length<=s;)p.push(new Array(r).fill(!1))},m=(s,o,v)=>{for(let S=0;S<s.length;S++){const N=s[S];for(let y=0;y<N.length;y++){if(!N[y])continue;const b=o+y;if(b<0||b>=r)return!0;const M=v+S;if(a(M),p[M][b])return!0}}return!1},d=(s,o,v)=>{for(let S=0;S<s.length;S++){const N=s[S];for(let y=0;y<N.length;y++)N[y]&&(a(v+S),p[v+S][o+y]=!0)}},u=(s,o,v)=>n.W_pos*Number(s)+n.W_shape*Number(o)+n.W_scale*(v-1),g=s=>{const o=s.desire.position===void 0?[["0",void 0]]:Y(s.desire.position),v=Y(s.desire.shape),S=s.desire.scale?Array.from({length:n.maxScale},(y,b)=>b+1):[1],N=[];for(const[y,b]of o)for(const[M,E]of v)for(const R of S){const F=R===1?E:me(E,R);N.push({posKey:y,shapeKey:M,pos:b,mask:F,scale:R,cost:u(y,M,R)})}return N.sort((y,b)=>y.cost-b.cost),N},w=(s,o)=>{const v=ee(o.mask),S=o.mask.length;if(v>r)return null;const N=(y,b)=>(d(o.mask,y,b),{key:s.key,item:s.item,col:y,row:b,mask:o.mask,cols:v,rows:S,priorityUsed:{position:o.posKey,shape:o.shapeKey},scale:o.scale,cost:o.cost});if(o.pos){const[y,b]=o.pos;return y>=0&&y+v<=r&&b>=0&&!m(o.mask,y,b)?N(y,b):null}for(let y=0;y<de;y++)for(let b=0;b+v<=r;b++)if(!m(o.mask,b,y))return N(b,y);return null},T=s=>{for(const o of g(s)){const v=w(s,o);if(v)return v}return null},x=s=>{const o=s.desire.position;return o!==void 0&&!re(o)},i=[],l=[],h=[];for(const s of e.items)if(x(s)){const o=T(s);o?i.push(o):h.push({...s,desire:{...s.desire,position:void 0}})}else h.push(s);for(const s of h){const o=T(s);o?i.push(o):l.push(s.key)}let L=0,c=0;for(const s of i){const o=g(e.items.find(v=>v.key===s.key));L+=s.cost,c+=o[o.length-1]?.cost??0}const C=c===0?1:1-L/c;let I=0;for(const s of i)I=Math.max(I,s.row+s.rows);return{placements:i,rowsUsed:I,unfit:l,satisfaction:C}}const he="neutral",fe={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},ve={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},K={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},be={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},ge={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function ke(e){const t=e.variant??"auto",n=t==="auto"?he:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function J(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function we(e){const t=e??{},{type:n,variant:r}=ke(t),p=t.gradient??0;switch(n){case"filled":return{background:J(fe[r],p),color:ve[r],border:"none",boxShadow:"none",filter:"none"};case"outlined":return{background:"transparent",color:K[r],border:`1px solid ${be[r]}`,boxShadow:"none",filter:"none"};case"elevated":{const a=r==="warn"||r==="error";return{background:J(ge[r],p),color:"var(--color-on-surface)",border:"none",...a?{borderLeft:`4px solid ${K[r]}`}:{},boxShadow:"var(--shadow-m3-1)",filter:"var(--filter-m3-1)"}}case"ghost":return{background:"transparent",color:K[r],border:"none",boxShadow:"none",filter:"none"}}}function xe(e){return e.map(t=>t.map(n=>n?1:0))}function Le(e){if(e==="none")return{stroke:"none",strokeWidth:0};const t=e.match(/^(\d+)px\s+solid\s+(.+)$/);return t?{stroke:t[2],strokeWidth:Number(t[1])}:{stroke:e,strokeWidth:1}}function Ne(e){return e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function oe({items:e,cols:t="auto",blockMin:n=te,gap:r=8,nest:p=!0,primitives:a,onItemError:m,className:d,style:u}){const g=$.useRef(null),[w,T]=$.useState(null);$.useLayoutEffect(()=>{const c=g.current;if(!c)return;const C=()=>T(c.getBoundingClientRect().width);if(C(),typeof ResizeObserver>"u")return;const I=new ResizeObserver(C);return I.observe(c),()=>I.disconnect()},[]);const x=$.useMemo(()=>Ne(e),[e]),{resolvedCols:i,block:l}=$.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(w==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(w/n));return{resolvedCols:c,block:w/c}},[t,n,w]),h=$.useMemo(()=>i==null?null:se({items:x.map(c=>({key:c.key,desire:c.desire,groupKey:c.groupKey,item:c})),cols:i}),[x,i,p]),L=h?.rowsUsed??0;return k.jsx("div",{ref:g,className:z("relative w-full",d),style:{minHeight:L>0?L*l:void 0,...u},children:h?h.placements.map(c=>k.jsx(ae,{placement:c,item:c.item,block:l,gap:r,primitives:a,onItemError:m,parentTheme:void 0},c.key)):null})}function ae({placement:e,item:t,block:n,gap:r,primitives:p,onItemError:a,parentTheme:m}){const d=m?{...t.theme,type:m.type}:t.theme??{},u=we(d),{stroke:g,strokeWidth:w}=Le(u.border),T=$.useMemo(()=>xe(e.mask),[e.mask]),x=$.useMemo(()=>!t.subItems||t.subItems.length===0?null:se({items:t.subItems.map((c,C)=>({key:c.key??`${e.key}/${C}`,desire:c.desire,item:{...c}})),cols:e.cols}),[t.subItems,e.cols,e.key]),i=t.ui?p?.[t.ui.type]:void 0,l=t.ui!=null&&!i;$.useEffect(()=>{l&&a&&t.ui&&a(e.key,{kind:"unknown-primitive",type:t.ui.type})},[l,a,e.key,t.ui]);const h={position:"absolute",left:e.col*n,top:e.row*n,color:u.color,...u.filter!=="none"?{filter:u.filter}:{},...u.borderLeft?{borderLeft:u.borderLeft}:{}},L=u.background.startsWith("linear-gradient")?void 0:u.background;return k.jsx("div",{style:h,children:k.jsx(ne,{shape:T,block:n,gap:r,fill:L??"transparent",stroke:g,strokeWidth:w,pad:x?0:16,children:x?k.jsx("div",{className:"relative h-full w-full",children:x.placements.map(c=>k.jsx(ae,{placement:c,item:c.item,block:n,gap:r,primitives:p,onItemError:a,parentTheme:d},c.key))}):i&&t.ui?k.jsx(i,{...t.ui}):l&&t.ui?k.jsx(Te,{type:t.ui.type}):null})})}function Te({type:e}){return k.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",k.jsx("code",{className:"ml-1",children:e})]})}oe.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const je={title:"UI/Notch/NotchGrid",component:oe,parameters:{layout:"fullscreen"}},Se=({label:e,value:t})=>k.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[k.jsx("div",{className:"text-xs opacity-75",children:e}),k.jsx("div",{className:"text-xl font-semibold",children:t})]}),Ie=({label:e,children:t})=>k.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),j={Label:Se,Center:Ie},D=(...e)=>e.map(t=>t.map(n=>n===1)),f=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),V={args:{primitives:j,items:[{key:"hero",desire:{shape:f(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:f(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:f(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},A={args:{primitives:j,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:f(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},_={args:{primitives:j,items:[{key:"panel",desire:{shape:f(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:f(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:f(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:f(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:f(1,1)},ui:{type:"Label",label:"B"}}]}]}},G={args:{primitives:j,items:[{key:"first",desire:{position:[0,0],shape:f(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:f(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},P={args:{primitives:j,cols:4,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:f(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${t}`}})))}},q={args:{primitives:j,onItemError:(e,t)=>{console.warn("[NotchGrid story] onItemError:",e,t)},items:[{key:"known",desire:{shape:f(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"OK"}},{key:"broken",desire:{shape:f(2,2)},theme:{type:"outlined",variant:"error"},ui:{type:"DoesNotExist"}}]}},O={args:{primitives:j,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:D([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:f(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:D([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:f(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:D([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:D([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:f(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}}]}},U={args:{primitives:j,items:[{key:"hero",desire:{position:[0,0],shape:D([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Module",value:"MirrorStack"}},{key:"installs",desire:{position:[2,2],shape:f(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Installs",value:"12"}},{key:"panel",desire:{position:[3,0],shape:f(2,3)},theme:{type:"filled",variant:"tertiary"},subItems:[{desire:{position:[0,0],shape:f(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[0,1],shape:f(2,2)},ui:{type:"Label",label:"Calls × markup",value:"$420"}}]},{key:"tenants",desire:{position:[0,3],shape:f(1,1)},theme:{type:"elevated",variant:"neutral"},ui:{type:"Label",label:"Tenants",value:"47"}}]}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...A.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
 claim it lands there. Others fall back to their secondary positions.`,...G.parameters?.docs?.description}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations applied to identical 1×1 tiles.",...P.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source},description:{story:"Unknown `ui.type` fires `onItemError` and renders an in-tile placeholder\n so the layout doesn't collapse. The renderer can then drive the\n L3 agent-sidebar flow (see dynamic-ui TBD 04 L3).",...q.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
    }] satisfies NotchGridItem[]
  }
}`,...O.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...O.parameters?.docs?.description}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source},description:{story:`The architecture doc's overview-page example, adapted: an L-shaped hero,
 a sub-item panel with mixed sizes, and a few accessory tiles.`,...U.parameters?.docs?.description}}};const Ee=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","UnknownPrimitive","CustomShapes","OverviewPage"];export{A as AutoSize,V as Basic,O as CustomShapes,U as OverviewPage,G as PriorityFallback,_ as SubItems,P as ThemeGallery,q as UnknownPrimitive,Ee as __namedExportsOrder,je as default};
