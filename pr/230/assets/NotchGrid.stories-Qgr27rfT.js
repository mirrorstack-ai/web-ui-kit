import{r as M,j as g}from"./iframe-B9Ckxf5E.js";import{c as F}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const z=(e,n)=>`${e},${n}`;function Y(e){let n=0;for(const t of e)n=Math.max(n,t.length);return n}function oe(e,n){return e.map(t=>t.map(r=>r>=1&&r<=n))}function ae(e,{cell:n,radius:t=24,inverseRadius:r=32,gap:u=0}){const a=e.length,y=(i,l)=>i>=0&&i<a&&l>=0&&l<e[i].length&&!!e[i][l],d=Math.max(0,Math.min(u,n-2))/2,p=new Map,b=(i,l)=>{const h=z(i[0],i[1]),L=p.get(h);L?L.push(l):p.set(h,[l])};for(let i=0;i<a;i++)for(let l=0;l<e[i].length;l++){if(!e[i][l])continue;const h=[l,i],L=[l+1,i],c=[l+1,i+1],$=[l,i+1];y(i-1,l)||b(h,L),y(i,l+1)||b(L,c),y(i+1,l)||b(c,$),y(i,l-1)||b($,h)}const k=new Set,S=[],x=(i,l)=>`${i}>${l[0]},${l[1]}`;for(const[i,l]of p){const[h,L]=i.split(",").map(Number);for(const c of l){if(k.has(x(i,c)))continue;const $=[];let I=[h,L],s=i,o=c,f=[0,0];for(;o;){const N=x(s,o);if(k.has(N))break;k.add(N),$.push(I),f=[o[0]-I[0],o[1]-I[1]],I=o,s=z(o[0],o[1]);const m=p.get(s)??[];let v=null,C=Number.POSITIVE_INFINITY;for(const j of m){if(k.has(x(s,j)))continue;const R=j[0]-I[0],B=j[1]-I[1],K=f[0]*B-f[1]*R;K<C&&(C=K,v=j)}o=v}const T=ie($).map(([N,m])=>[N*n,m*n]);if(T.length>=3){const N=d>0?le(T,d):T;S.push(ce(N,t,r))}}}return S.join(" ")}function ie(e){const n=e.length,t=[];for(let r=0;r<n;r++){const u=e[(r-1+n)%n],a=e[r],y=e[(r+1)%n],d=a[0]-u[0],p=a[1]-u[1],b=y[0]-a[0],k=y[1]-a[1];d*k-p*b!==0&&t.push(a)}return t}function le(e,n){const t=e.length,r=e.map((a,y)=>{const d=e[(y+1)%t],p=Math.sign(d[0]-a[0]),b=Math.sign(d[1]-a[1]);return b===0?{axis:"y",value:a[1]+p*n}:{axis:"x",value:a[0]+-b*n}}),u=[];for(let a=0;a<t;a++){const y=r[(a-1+t)%t],d=r[a],p=y.axis==="x"?y.value:d.value,b=y.axis==="y"?y.value:d.value;u.push([p,b])}return u}function ce(e,n,t){const r=e.length,u=[];for(let a=0;a<r;a++){const y=e[(a-1+r)%r],d=e[a],p=e[(a+1)%r],b=W(y,d),k=W(d,p),S=Z(y,d),x=Z(d,p),l=S[0]*x[1]-S[1]*x[0]>0,h=Math.min(l?n:t,b/2,k/2),L=[d[0]-S[0]*h,d[1]-S[1]*h],c=[d[0]+x[0]*h,d[1]+x[1]*h];u.push(`${a===0?"M":"L"} ${H(L)}`),h>0&&u.push(`A ${V(h)} ${V(h)} 0 0 ${l?1:0} ${H(c)}`)}return u.push("Z"),u.join(" ")}function W(e,n){return Math.abs(n[0]-e[0])+Math.abs(n[1]-e[1])}function Z(e,n){return[Math.sign(n[0]-e[0]),Math.sign(n[1]-e[1])]}function V(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function H(e){return`${V(e[0])},${V(e[1])}`}const J=96;function ee({shape:e,tier:n=1,block:t=J,gap:r=0,radius:u=24,inverseRadius:a=32,fill:y="var(--color-surface-container-low)",stroke:d="var(--color-outline-variant)",strokeWidth:p=1,children:b,pad:k=16,noClip:S=!1,className:x,style:i}){const h=`block-shape-clip-${M.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,L=e.length,c=Y(e),$=M.useMemo(()=>oe(e,n),[e,n]),I=c*t,s=L*t,o=M.useMemo(()=>ae($,{cell:t,gap:r,radius:u,inverseRadius:a}),[$,t,r,u,a]),f=p/2;return g.jsxs("div",{className:F("relative",x),style:{width:I,height:s,...i},children:[g.jsxs("svg",{width:I,height:s,viewBox:`${-f} ${-f} ${I+p} ${s+p}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!S&&g.jsx("defs",{children:g.jsx("clipPath",{id:h,clipPathUnits:"userSpaceOnUse",children:g.jsx("path",{d:o})})}),g.jsx("path",{d:o,fill:y,stroke:d,strokeWidth:p,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),g.jsx("div",{className:F("absolute inset-0",!S&&"overflow-hidden"),style:{padding:k,clipPath:S?void 0:`url(#${h})`},children:b})]})}ee.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const ue=1e5,pe={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function ne(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const n=Object.keys(e);return n.length>0&&n.every(t=>/^\d+$/.test(t))}function Q(e){return ne(e)?Object.keys(e).sort((n,t)=>Number(n)-Number(t)).map(n=>[n,e[n]]):[["0",e]]}function de(e,n){if(n<=1)return e;const t=Math.floor(n),r=[];for(let u=0;u<e.length;u++)for(let a=0;a<t;a++){const y=[];for(let d=0;d<e[u].length;d++)for(let p=0;p<t;p++)y.push(e[u][d]);r.push(y)}return r}function te(e,n){const t={...pe,...n},r=Math.max(1,Math.floor(e.cols)),u=[],a=s=>{for(;u.length<=s;)u.push(new Array(r).fill(!1))},y=(s,o,f)=>{for(let T=0;T<s.length;T++){const N=s[T];for(let m=0;m<N.length;m++){if(!N[m])continue;const v=o+m;if(v<0||v>=r)return!0;const C=f+T;if(a(C),u[C][v])return!0}}return!1},d=(s,o,f)=>{for(let T=0;T<s.length;T++){const N=s[T];for(let m=0;m<N.length;m++)N[m]&&(a(f+T),u[f+T][o+m]=!0)}},p=(s,o,f)=>t.W_pos*Number(s)+t.W_shape*Number(o)+t.W_scale*(f-1),b=s=>{const o=s.desire.position===void 0?[["0",void 0]]:Q(s.desire.position),f=Q(s.desire.shape),T=s.desire.scale?Array.from({length:t.maxScale},(m,v)=>v+1):[1],N=[];for(const[m,v]of o)for(const[C,j]of f)for(const R of T){const B=R===1?j:de(j,R);N.push({posKey:m,shapeKey:C,pos:v,mask:B,scale:R,cost:p(m,C,R)})}return N.sort((m,v)=>m.cost-v.cost),N},k=(s,o)=>{const f=Y(o.mask),T=o.mask.length;if(f>r)return null;const N=(m,v)=>(d(o.mask,m,v),{key:s.key,item:s.item,col:m,row:v,mask:o.mask,cols:f,rows:T,priorityUsed:{position:o.posKey,shape:o.shapeKey},scale:o.scale,cost:o.cost});if(o.pos){const[m,v]=o.pos;return m>=0&&m+f<=r&&v>=0&&!y(o.mask,m,v)?N(m,v):null}for(let m=0;m<ue;m++)for(let v=0;v+f<=r;v++)if(!y(o.mask,v,m))return N(v,m);return null},S=s=>{for(const o of b(s)){const f=k(s,o);if(f)return f}return null},x=s=>{const o=s.desire.position;return o!==void 0&&!ne(o)},i=[],l=[],h=[];for(const s of e.items)if(x(s)){const o=S(s);o?i.push(o):h.push({...s,desire:{...s.desire,position:void 0}})}else h.push(s);for(const s of h){const o=S(s);o?i.push(o):l.push(s.key)}let L=0,c=0;for(const s of i){const o=b(e.items.find(f=>f.key===s.key));L+=s.cost,c+=o[o.length-1]?.cost??0}const $=c===0?1:1-L/c;let I=0;for(const s of i)I=Math.max(I,s.row+s.rows);return{placements:i,rowsUsed:I,unfit:l,satisfaction:$}}const me="neutral",ye={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},he={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},D={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},fe={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},ve={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function be(e){const n=e.variant??"auto",t=n==="auto"?me:n,r=e.type??"auto";return{type:r==="auto"?n==="auto"?"ghost":"filled":r,variant:t}}function X(e,n){if(n<=0||e==="transparent")return e;const t=Math.min(1,n)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${t}%) 0%, ${e} 100%)`}function ge(e){const n=e??{},{type:t,variant:r}=be(n),u=n.gradient??0;switch(t){case"filled":return{background:X(ye[r],u),color:he[r],border:"none",boxShadow:"none"};case"outlined":return{background:"transparent",color:D[r],border:`1px solid ${fe[r]}`,boxShadow:"none"};case"elevated":{const a=r==="warn"||r==="error";return{background:X(ve[r],u),color:"var(--color-on-surface)",border:"none",...a?{borderLeft:`4px solid ${D[r]}`}:{},boxShadow:"var(--shadow-m3-1)"}}case"ghost":return{background:"transparent",color:D[r],border:"none",boxShadow:"none"}}}function ke(e){return e.map(n=>n.map(t=>t?1:0))}function we(e){if(e==="none")return{stroke:"none",strokeWidth:0};const n=e.match(/^(\d+)px\s+solid\s+(.+)$/);return n?{stroke:n[2],strokeWidth:Number(n[1])}:{stroke:e,strokeWidth:1}}function xe(e){return e.map((n,t)=>n.key?n:{...n,key:`item-${t}`})}function re({items:e,cols:n="auto",blockMin:t=J,gap:r=8,nest:u=!0,primitives:a,onItemError:y,className:d,style:p}){const b=M.useRef(null),[k,S]=M.useState(null);M.useLayoutEffect(()=>{const c=b.current;if(!c)return;const $=()=>S(c.getBoundingClientRect().width);if($(),typeof ResizeObserver>"u")return;const I=new ResizeObserver($);return I.observe(c),()=>I.disconnect()},[]);const x=M.useMemo(()=>xe(e),[e]),{resolvedCols:i,block:l}=M.useMemo(()=>{if(n!=="auto")return{resolvedCols:n,block:t};if(k==null)return{resolvedCols:null,block:t};const c=Math.max(1,Math.floor(k/t));return{resolvedCols:c,block:k/c}},[n,t,k]),h=M.useMemo(()=>i==null?null:te({items:x.map(c=>({key:c.key,desire:c.desire,groupKey:c.groupKey,item:c})),cols:i}),[x,i,u]),L=h?.rowsUsed??0;return g.jsx("div",{ref:b,className:F("relative w-full",d),style:{minHeight:L>0?L*l:void 0,...p},children:h?h.placements.map(c=>g.jsx(se,{placement:c,item:c.item,block:l,gap:r,primitives:a,onItemError:y,parentTheme:void 0},c.key)):null})}function se({placement:e,item:n,block:t,gap:r,primitives:u,onItemError:a,parentTheme:y}){const d=y?{...n.theme,type:y.type}:n.theme??{},p=ge(d),{stroke:b,strokeWidth:k}=we(p.border),S=M.useMemo(()=>ke(e.mask),[e.mask]),x=M.useMemo(()=>!n.subItems||n.subItems.length===0?null:te({items:n.subItems.map((c,$)=>({key:c.key??`${e.key}/${$}`,desire:c.desire,item:{...c}})),cols:e.cols}),[n.subItems,e.cols,e.key]),i=n.ui?u?.[n.ui.type]:void 0,l=n.ui!=null&&!i;M.useEffect(()=>{l&&a&&n.ui&&a(e.key,{kind:"unknown-primitive",type:n.ui.type})},[l,a,e.key,n.ui]);const h={position:"absolute",left:e.col*t,top:e.row*t,color:p.color,boxShadow:p.boxShadow,...p.borderLeft?{borderLeft:p.borderLeft}:{}},L=p.background.startsWith("linear-gradient")?void 0:p.background;return g.jsx("div",{style:h,children:g.jsx(ee,{shape:S,block:t,gap:r,fill:L??"transparent",stroke:b,strokeWidth:k,pad:x?0:16,children:x?g.jsx("div",{className:"relative h-full w-full",children:x.placements.map(c=>g.jsx(se,{placement:c,item:c.item,block:t,gap:r,primitives:u,onItemError:a,parentTheme:d},c.key))}):i&&n.ui?g.jsx(i,{...n.ui}):l&&n.ui?g.jsx(Le,{type:n.ui.type}):null})})}function Le({type:e}){return g.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",g.jsx("code",{className:"ml-1",children:e})]})}re.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ce={title:"UI/Notch/NotchGrid",component:re,parameters:{layout:"fullscreen"}},Ne=({label:e,value:n})=>g.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[g.jsx("div",{className:"text-xs opacity-75",children:e}),g.jsx("div",{className:"text-xl font-semibold",children:n})]}),Se=({label:e,children:n})=>g.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:n??e}),E={Label:Ne,Center:Se},Te=(...e)=>e.map(n=>n.map(t=>t===1)),w=(e,n)=>Array.from({length:n},()=>Array(e).fill(!0)),U={args:{primitives:E,items:[{key:"hero",desire:{shape:w(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:w(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:w(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:w(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},A={args:{primitives:E,items:Array.from({length:12},(e,n)=>({key:`t${n}`,desire:{shape:w(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][n%4]},ui:{type:"Label",label:`#${n+1}`,value:n+1}}))}},_={args:{primitives:E,items:[{key:"panel",desire:{shape:w(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:w(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:w(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:w(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:w(1,1)},ui:{type:"Label",label:"B"}}]}]}},G={args:{primitives:E,items:[{key:"first",desire:{position:[0,0],shape:w(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:w(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},q={args:{primitives:E,cols:4,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(n=>({key:`${e}-${n}`,desire:{shape:w(1,1)},theme:{type:e,variant:n},ui:{type:"Center",label:`${n}`}})))}},P={args:{primitives:E,onItemError:(e,n)=>{console.warn("[NotchGrid story] onItemError:",e,n)},items:[{key:"known",desire:{shape:w(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"OK"}},{key:"broken",desire:{shape:w(2,2)},theme:{type:"outlined",variant:"error"},ui:{type:"DoesNotExist"}}]}},O={args:{primitives:E,items:[{key:"hero",desire:{position:[0,0],shape:Te([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Module",value:"MirrorStack"}},{key:"installs",desire:{position:[2,2],shape:w(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Installs",value:"12"}},{key:"panel",desire:{position:[3,0],shape:w(2,3)},theme:{type:"filled",variant:"tertiary"},subItems:[{desire:{position:[0,0],shape:w(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[0,1],shape:w(2,2)},ui:{type:"Label",label:"Calls × markup",value:"$420"}}]},{key:"tenants",desire:{position:[0,3],shape:w(1,1)},theme:{type:"elevated",variant:"neutral"},ui:{type:"Label",label:"Tenants",value:"47"}}]}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations applied to identical 1×1 tiles.",...q.parameters?.docs?.description}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source},description:{story:"Unknown `ui.type` fires `onItemError` and renders an in-tile placeholder\n so the layout doesn't collapse. The renderer can then drive the\n L3 agent-sidebar flow (see dynamic-ui TBD 04 L3).",...P.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source},description:{story:`The architecture doc's overview-page example, adapted: an L-shaped hero,
 a sub-item panel with mixed sizes, and a few accessory tiles.`,...O.parameters?.docs?.description}}};const je=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","UnknownPrimitive","OverviewPage"];export{A as AutoSize,U as Basic,O as OverviewPage,G as PriorityFallback,_ as SubItems,q as ThemeGallery,P as UnknownPrimitive,je as __namedExportsOrder,Ce as default};
