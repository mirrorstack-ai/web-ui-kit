import{r as C,j as M}from"./iframe-B4FMDjE5.js";import{M as qe}from"./MetricBlock-B4G_7-eE.js";import{S as _e}from"./Sparkline-BVtE-Dp_.js";import{D as Be}from"./DataList-BD9EuU9L.js";import{D as Ue}from"./DataTable-p_FxDhKK.js";import{S as Oe}from"./StatusIndicator-mu9kjhti.js";import{S as Ve}from"./StarRating-DMhwjPpq.js";import{T as Fe}from"./Timeline-CrlIZLL5.js";import{G as We}from"./Gauge-CAiLo5X6.js";import{c as ne}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-XAe3e8WP.js";import"./index-CObsgKzA.js";import"./index-rbYA3msP.js";const Ce={Metric:qe,Sparkline:_e,List:Be,Table:Ue,Status:Oe,Rating:Ve,Timeline:Fe,Gauge:We},Me=(e,t)=>`${e},${t}`;function ge(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function ze(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function $e(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:a=0}){const s=e.length,u=(d,v)=>d>=0&&d<s&&v>=0&&v<e[d].length&&!!e[d][v],h=Math.max(0,Math.min(a,t-2))/2,y=new Map,b=(d,v)=>{const L=Me(d[0],d[1]),j=y.get(L);j?j.push(v):y.set(L,[v])};for(let d=0;d<s;d++)for(let v=0;v<e[d].length;v++){if(!e[d][v])continue;const L=[v,d],j=[v+1,d],T=[v+1,d+1],R=[v,d+1];u(d-1,v)||b(L,j),u(d,v+1)||b(j,T),u(d+1,v)||b(T,R),u(d,v-1)||b(R,L)}const $=new Set,E=[],G=(d,v)=>`${d}>${v[0]},${v[1]}`;for(const[d,v]of y){const[L,j]=d.split(",").map(Number);for(const T of v){if($.has(G(d,T)))continue;const R=[];let I=[L,j],l=d,i=T,w=[0,0];for(;i;){const N=G(l,i);if($.has(N))break;$.add(N),R.push(I),w=[i[0]-I[0],i[1]-I[1]],I=i,l=Me(i[0],i[1]);const g=y.get(l)??[];let p=null,_=Number.POSITIVE_INFINITY;for(const q of g){if($.has(G(l,q)))continue;const O=q[0]-I[0],V=q[1]-I[1],F=w[0]*V-w[1]*O;F<_&&(_=F,p=q)}i=p}const S=Xe(R).map(([N,g])=>[N*t,g*t]);if(S.length>=3){const N=h>0?Ye(S,h):S;E.push(He(N,n,r))}}}return E.join(" ")}function Xe(e){const t=e.length,n=[];for(let r=0;r<t;r++){const a=e[(r-1+t)%t],s=e[r],u=e[(r+1)%t],h=s[0]-a[0],y=s[1]-a[1],b=u[0]-s[0],$=u[1]-s[1];h*$-y*b!==0&&n.push(s)}return n}function Ye(e,t){const n=e.length,r=e.map((s,u)=>{const h=e[(u+1)%n],y=Math.sign(h[0]-s[0]),b=Math.sign(h[1]-s[1]);return b===0?{axis:"y",value:s[1]+y*t}:{axis:"x",value:s[0]+-b*t}}),a=[];for(let s=0;s<n;s++){const u=r[(s-1+n)%n],h=r[s],y=u.axis==="x"?u.value:h.value,b=u.axis==="y"?u.value:h.value;a.push([y,b])}return a}function He(e,t,n){const r=e.length,a=[];for(let s=0;s<r;s++){const u=e[(s-1+r)%r],h=e[s],y=e[(s+1)%r],b=Le(u,h),$=Le(h,y),E=Ie(u,h),G=Ie(h,y),v=E[0]*G[1]-E[1]*G[0]>0,L=Math.min(v?t:n,b/2,$/2),j=[h[0]-E[0]*L,h[1]-E[1]*L],T=[h[0]+G[0]*L,h[1]+G[1]*L];a.push(`${s===0?"M":"L"} ${Se(j)}`),L>0&&a.push(`A ${me(L)} ${me(L)} 0 0 ${v?1:0} ${Se(T)}`)}return a.push("Z"),a.join(" ")}function Le(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function Ie(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function me(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Se(e){return`${me(e[0])},${me(e[1])}`}const Ke=96;function ke({shape:e,tier:t=1,block:n=Ke,gap:r=0,radius:a=24,inverseRadius:s=32,fill:u="var(--color-surface-container-low)",stroke:h="var(--color-outline-variant)",strokeWidth:y=1,children:b,pad:$=16,noClip:E=!1,className:G,style:d}){const L=`block-shape-clip-${C.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,j=e.length,T=ge(e),R=C.useMemo(()=>ze(e,t),[e,t]),I=T*n,l=j*n,i=C.useMemo(()=>$e(R,{cell:n,gap:r,radius:a,inverseRadius:s}),[R,n,r,a,s]),w=y/2;return M.jsxs("div",{className:ne("relative",G),style:{width:I,height:l,...d},children:[M.jsxs("svg",{width:I,height:l,viewBox:`${-w} ${-w} ${I+y} ${l+y}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!E&&M.jsx("defs",{children:M.jsx("clipPath",{id:L,clipPathUnits:"userSpaceOnUse",children:M.jsx("path",{d:i})})}),M.jsx("path",{d:i,fill:u,stroke:h,strokeWidth:y,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),M.jsx("div",{className:ne("absolute inset-0",!E&&"overflow-hidden"),style:{padding:$,clipPath:E?void 0:`url(#${L})`},children:b})]})}ke.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ze=1e5;function Qe(e){let t=1,n=1;for(const a of e)t=Math.max(t,a.row+a.rows),n=Math.max(n,a.col+a.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const a of e)for(let s=0;s<a.rows;s++)for(let u=0;u<a.cols;u++)r[a.row+s][a.col+u]=!0;return r}const Je={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function Ae(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Ne(e){return Ae(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function et(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let a=0;a<e.length;a++)for(let s=0;s<n;s++){const u=[];for(let h=0;h<e[a].length;h++)for(let y=0;y<n;y++)u.push(e[a][h]);r.push(u)}return r}function Ee(e,t){const n={...Je,...t},r=Math.max(1,Math.floor(e.cols)),a=[],s=l=>{for(;a.length<=l;)a.push(new Array(r).fill(!1))},u=(l,i,w)=>{for(let S=0;S<l.length;S++){const N=l[S];for(let g=0;g<N.length;g++){if(!N[g])continue;const p=i+g;if(p<0||p>=r)return!0;const _=w+S;if(s(_),a[_][p])return!0}}return!1},h=(l,i,w)=>{for(let S=0;S<l.length;S++){const N=l[S];for(let g=0;g<N.length;g++)N[g]&&(s(w+S),a[w+S][i+g]=!0)}},y=(l,i,w)=>n.W_pos*Number(l)+n.W_shape*Number(i)+n.W_scale*(w-1),b=l=>{const i=l.desire.position===void 0?[["0",void 0]]:Ne(l.desire.position),w=Ne(l.desire.shape),S=l.desire.scale?Array.from({length:n.maxScale},(g,p)=>p+1):[1],N=[];for(const[g,p]of i)for(const[_,q]of w)for(const O of S){const V=O===1?q:et(q,O);N.push({posKey:g,shapeKey:_,pos:p,mask:V,scale:O,cost:y(g,_,O)})}return N.sort((g,p)=>g.cost-p.cost),N},$=(l,i)=>{const w=ge(i.mask),S=i.mask.length;if(w>r)return null;const N=(g,p)=>(h(i.mask,g,p),{key:l.key,item:l.item,col:g,row:p,mask:i.mask,cols:w,rows:S,priorityUsed:{position:i.posKey,shape:i.shapeKey},scale:i.scale,cost:i.cost});if(i.pos){const[g,p]=i.pos;return g>=0&&g+w<=r&&p>=0&&!u(i.mask,g,p)?N(g,p):null}for(let g=0;g<Ze;g++)for(let p=0;p+w<=r;p++)if(!u(i.mask,p,g))return N(p,g);return null},E=l=>{for(const i of b(l)){const w=$(l,i);if(w)return w}return null},G=l=>{const i=l.desire.position;return i!==void 0&&!Ae(i)},d=[],v=[],L=[];for(const l of e.items)if(G(l)){const i=E(l);i?d.push(i):L.push({...l,desire:{...l.desire,position:void 0}})}else L.push(l);for(const l of L){const i=E(l);i?d.push(i):v.push(l.key)}let j=0,T=0;for(const l of d){const i=b(e.items.find(w=>w.key===l.key));j+=l.cost,T+=i[i.length-1]?.cost??0}const R=T===0?1:1-j/T;let I=0;for(const l of d)I=Math.max(I,l.row+l.rows);return{placements:d,rowsUsed:I,unfit:v,satisfaction:R}}const tt="neutral",nt={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},ot={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},pe={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},rt={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},st={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function at(e){const t=e.variant??"auto",n=t==="auto"?tt:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function Re(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function be(e){const t=e??{},{type:n,variant:r}=at(t),a=t.gradient??0;switch(n){case"filled":{const s=nt[r];return{fill:s,cssBackground:Re(s,a),color:ot[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:pe[r],stroke:rt[r],strokeWidth:1,elevated:!1};case"elevated":{const s=r==="warn"||r==="error",u=st[r];return{fill:u,cssBackground:Re(u,a),color:pe[r],stroke:"none",strokeWidth:0,...s?{accentBar:pe[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:pe[r],stroke:"none",strokeWidth:0,elevated:!1}}}const Te=16;function ve(e,t){try{e.setPointerCapture(t)}catch{}}function Pe(e,t){try{e.releasePointerCapture(t)}catch{}}const we=(e,t)=>`${e}::${t}`;function it(e){return e.map(t=>t.map(n=>n?1:0))}function lt(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function De(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function ct(e){let t=1;for(const{sub:n}of e){const r=ge(De(n.desire.shape)),a=n.desire.position,s=Array.isArray(a)?a[0]:0;t=Math.max(t,s+r)}return t}function ut(e,t,n){const r=[];return t.forEach((a,s)=>{n.has(we(e,s))||r.push({sub:a,index:s})}),r}function pt(e,t){return Ee({items:e.map(n=>({key:we(t,n.index),desire:n.sub.desire,item:n})),cols:ct(e)})}function dt(e){const t=[];for(let n=0;n<e.mask.length;n++){const r=e.mask[n];for(let a=0;a<r.length;a++)r[a]&&t.push([e.col+a,e.row+n])}return t}function mt(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(dt),n=new Array(e.length).fill(!1),r=(s,u)=>{for(const[h,y]of t[s])for(const[b,$]of t[u])if(Math.abs(h-b)<=1&&Math.abs(y-$)<=1)return!0;return!1},a=[];for(let s=0;s<e.length;s++){if(n[s])continue;n[s]=!0;const u=[s],h=[];for(;u.length;){const y=u.shift();h.push(e[y]);for(let b=0;b<e.length;b++)!n[b]&&r(y,b)&&(n[b]=!0,u.push(b))}a.push(h)}return a}function ht(e,t){const n=new Map;e.forEach((a,s)=>{const u=t.get(a.key),h=u!=null?`g:${u}`:`s:${s}`,y=n.get(h);y?y.push(a):n.set(h,[a])});const r=[];for(const a of n.values())for(const s of mt(a))r.push(s);return r}function Ge({items:e,cols:t="auto",blockMin:n=Ke,gap:r=8,nest:a=!0,primitives:s,onItemError:u,draggable:h=!1,onItemMove:y,onSubItemPromote:b,className:$,style:E}){const G=C.useMemo(()=>s?{...Ce,...s}:Ce,[s]),d=C.useRef(null),[v,L]=C.useState(null);C.useLayoutEffect(()=>{const c=d.current;if(!c)return;const o=()=>L(c.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const f=new ResizeObserver(o);return f.observe(c),()=>f.disconnect()},[]);const j=C.useMemo(()=>lt(e),[e]),{resolvedCols:T,block:R}=C.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(v==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(v/n));return{resolvedCols:c,block:v/c}},[t,n,v]),[I,l]=C.useState(new Map),[i,w]=C.useState(null),S=C.useRef(null);S.current=i;const[N,g]=C.useState(new Map),[p,_]=C.useState(null),q=C.useRef(null);q.current=p;const O=C.useCallback((c,o)=>{o.button!=null&&o.button!==0||(ve(o.currentTarget,o.pointerId),w({key:c.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:c.col,originRow:c.row,originCols:c.cols,dx:0,dy:0}))},[]),V=C.useCallback((c,o)=>{if(o.button!=null&&o.button!==0)return;ve(o.currentTarget,o.pointerId);const f=c[0];w({key:f.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:f.col,originRow:f.row,originCols:f.cols,dx:0,dy:0,members:c.map(m=>({key:m.key,col:m.col,row:m.row,cols:m.cols,rows:m.rows}))})},[]),F=C.useCallback((c,o,f,m)=>{if(m.button!=null&&m.button!==0)return;ve(m.currentTarget,m.pointerId);const K=be(c.item.theme??{});_({parentKey:c.key,subIndex:o.index,pointerId:m.pointerId,startX:m.clientX,startY:m.clientY,dx:0,dy:0,panelCol:c.col,panelRow:c.row,panelCols:c.cols,panelRows:c.rows,subCol:f.col,subRow:f.row,ghostShape:it(f.mask),ghostFill:K.fill,ghostStroke:K.stroke,ghostStrokeWidth:K.strokeWidth,ghostUi:o.sub.ui,ghostColor:K.color})},[]),ce=C.useCallback(c=>{const o=S.current;if(!o||c.pointerId!==o.pointerId)return;const f=c.clientX-o.startX,m=c.clientY-o.startY;f===o.dx&&m===o.dy||w({...o,dx:f,dy:m})},[]),ue=C.useCallback(c=>{const o=S.current;if(!o||c.pointerId!==o.pointerId)return;Pe(c.currentTarget,c.pointerId),w(null);const f=R||n,m=T??1;if(o.members){const U=Math.min(...o.members.map(z=>z.col)),W=Math.min(...o.members.map(z=>z.row)),X=Math.max(...o.members.map(z=>z.col+z.cols)),te=Math.max(-U,Math.min(m-X,Math.round(o.dx/f))),ye=Math.max(-W,Math.round(o.dy/f));if(te===0&&ye===0)return;l(z=>{const xe=new Map(z);for(const fe of o.members)xe.set(fe.key,[fe.col+te,fe.row+ye]);return xe});for(const z of o.members)y?.(z.key,[z.col+te,z.row+ye]);return}const K=Math.max(0,m-o.originCols),B=Math.min(K,Math.max(0,o.originCol+Math.round(o.dx/f))),k=Math.max(0,o.originRow+Math.round(o.dy/f)),A=[B,k];l(U=>new Map(U).set(o.key,A)),y?.(o.key,A)},[R,n,T,y]),Y=C.useCallback(c=>{const o=q.current;if(!o||c.pointerId!==o.pointerId)return;const f=c.clientX-o.startX,m=c.clientY-o.startY;f===o.dx&&m===o.dy||_({...o,dx:f,dy:m})},[]),he=C.useCallback(c=>{const o=q.current;if(!o||c.pointerId!==o.pointerId)return;Pe(c.currentTarget,c.pointerId),_(null);const f=R||n,m=d.current?.getBoundingClientRect(),K=m?Math.max(0,Math.floor((c.clientX-m.left)/f)):o.panelCol+o.subCol,B=m?Math.max(0,Math.floor((c.clientY-m.top)/f)):o.panelRow+o.subRow,k=[K,B],A=we(o.parentKey,o.subIndex),U=j.find(X=>X.key===o.parentKey),W=U?.subItems?.[o.subIndex];W&&g(X=>new Map(X).set(A,{parentKey:o.parentKey,item:{key:`promoted::${A}`,desire:{position:k,shape:De(W.desire.shape)},theme:{...U.theme,...W.theme},groupKey:U.groupKey??o.parentKey,ui:W.ui}})),l(X=>X.has(o.parentKey)?X:new Map(X).set(o.parentKey,[o.panelCol,o.panelRow])),b?.(o.parentKey,o.subIndex,k)},[R,n,j,b]),{layout:J,panelSubLayouts:x,components:D}=C.useMemo(()=>{const c={layout:null,panelSubLayouts:new Map,components:[]};if(T==null)return c;const o=new Set(j.map(k=>k.key)),f=new Map,m=new Map,K=j.map(k=>{const A=I.get(k.key);let U=A?{...k.desire,position:A}:k.desire,W=k.groupKey;if(k.subItems&&k.subItems.length>0){const X=ut(k.key,k.subItems,N),te=pt(X,k.key);f.set(k.key,te),U={...U,shape:Qe(te.placements)},W=k.groupKey??k.key}return m.set(k.key,W),{key:k.key,desire:U,groupKey:W,item:k}});for(const{item:k,parentKey:A}of N.values()){if(!o.has(A))continue;const U=I.get(k.key),W=U?{...k.desire,position:U}:k.desire;m.set(k.key,k.groupKey),K.push({key:k.key,desire:W,groupKey:k.groupKey,item:k})}const B=Ee({items:K,cols:T});return{layout:B,panelSubLayouts:f,components:ht(B.placements,m)}},[j,T,a,I,N]),H=J?.unfit.join(",")??"";C.useEffect(()=>{},[H,T,J]);const Q=J?.rowsUsed??0;return M.jsxs("div",{ref:d,className:ne("relative w-full",$),style:{minHeight:Q>0?Q*R:void 0,...E},children:[D.map(c=>{const o=c.map(A=>A.key).join("|"),f=i?c.find(A=>A.key===i.key):void 0,m=f&&i?[i.dx,i.dy]:void 0,K=p&&c.some(A=>A.key===p.parentKey)?{parentKey:p.parentKey,subIndex:p.subIndex}:null,B=c.some(A=>I.has(A.key)),k=i?.members!=null&&f!=null;return M.jsx(yt,{members:c,block:R,gap:r,primitives:G,onItemError:u,draggable:h,panelSubLayouts:x,dragKey:f?.key??null,dragOffset:m,wholeDrag:k,draggingSub:K,overridden:B,onItemDragStart:O,onComponentDragStart:V,onSubDragStart:F,onSubDragMove:Y,onSubDragEnd:he,onDragMove:ce,onDragEnd:ue},o)}),p&&(()=>{const c=G?.[p.ghostUi.type];return M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(p.panelCol+p.subCol)*R+p.dx,top:(p.panelRow+p.subRow)*R+p.dy,color:p.ghostColor},children:M.jsx(ke,{shape:p.ghostShape,block:R,gap:r,fill:p.ghostFill,stroke:p.ghostStroke,strokeWidth:p.ghostStrokeWidth,children:c?M.jsx(c,{...p.ghostUi}):null})})})()]})}const yt=C.memo(function({members:t,block:n,gap:r,primitives:a,onItemError:s,draggable:u=!1,panelSubLayouts:h,dragKey:y,dragOffset:b,wholeDrag:$=!1,draggingSub:E,overridden:G=!1,onItemDragStart:d,onComponentDragStart:v,onSubDragStart:L,onSubDragMove:j,onSubDragEnd:T,onDragMove:R,onDragEnd:I}){let l=1/0,i=1/0,w=0,S=0;for(const x of t)l=Math.min(l,x.col),i=Math.min(i,x.row),w=Math.max(w,x.col+x.cols),S=Math.max(S,x.row+x.rows);const N=Math.max(1,w-l),g=Math.max(1,S-i),p=C.useMemo(()=>{const x=Array.from({length:g},()=>new Array(N).fill(0));for(const D of t)for(let H=0;H<D.mask.length;H++){const Q=D.mask[H];for(let c=0;c<Q.length;c++)Q[c]&&(x[D.row-i+H][D.col-l+c]=1)}return x},[t,N,g,l,i]),_=C.useMemo(()=>$e(p.map(x=>x.map(Boolean)),{cell:n,gap:r,radius:24,inverseRadius:32}),[p,n,r]),q=t[0],O=q.item,V=C.useMemo(()=>be(O.theme??{}),[O.theme?.type,O.theme?.variant,O.theme?.gradient]);C.useEffect(()=>{if(s)for(const x of t){const D=x.item;D.ui&&!a?.[D.ui.type]&&s(x.key,{kind:"unknown-primitive",type:D.ui.type})}},[t,a,s]);const F=t.length===1&&!h.has(q.key),ce=(F||$)&&y===q.key,ue=y!=null&&!F&&!$,Y={position:"absolute",left:l*n,top:i*n,color:V.color};ce&&b?(Y.transform=`translate(${b[0]}px, ${b[1]}px)`,Y.zIndex=20):G&&(Y.zIndex=10),u&&(Y.cursor=ce?"grabbing":"grab",Y.touchAction="none"),ue||(Y.clipPath=`path('${_}')`);const he=u&&F&&d?{onPointerDown:x=>d(q,x),onPointerMove:R,onPointerUp:I,onPointerCancel:I}:u&&!F&&v?{onPointerDown:x=>v(t,x),onPointerMove:R,onPointerUp:I,onPointerCancel:I}:void 0,J=[];for(const x of t){const D=x.item,H=x.col-l,Q=x.row-i,c=h.get(x.key);if(c)for(const o of c.placements){const f=o.item,m=E?.parentKey===x.key&&E.subIndex===f.index,K=f.sub,B=K.ui?a?.[K.ui.type]:void 0,k=u&&L?{onPointerDown:A=>{A.stopPropagation(),L(x,f,o,A)},onPointerMove:j,onPointerUp:T,onPointerCancel:T}:void 0;J.push(M.jsx("div",{className:"absolute",style:{left:(H+o.col)*n,top:(Q+o.row)*n,width:o.cols*n,height:o.rows*n,padding:Te,opacity:m?0:void 0},children:M.jsx("div",{...k,className:ne("h-full w-full",u&&"cursor-grab touch-none"),children:B?M.jsx(B,{...K.ui}):M.jsx(je,{type:K.ui.type})})},`${x.key}/${f.index}`))}else{const o=D.ui?a?.[D.ui.type]:void 0,f=u&&!F&&d?{onPointerDown:B=>{B.stopPropagation(),d(x,B)},onPointerMove:R,onPointerUp:I,onPointerCancel:I}:void 0,m=!F&&!$&&y===x.key,K=be(D.theme??{});J.push(M.jsx("div",{className:"absolute",style:{left:H*n,top:Q*n,width:x.cols*n,height:x.rows*n,padding:Te,transform:m&&b?`translate(${b[0]}px, ${b[1]}px)`:void 0,zIndex:m?30:void 0,background:m?K.cssBackground:void 0,color:m?K.color:void 0,borderRadius:m?24:void 0},children:M.jsx("div",{...f,className:ne("h-full w-full",u&&!F&&"cursor-grab touch-none"),children:o&&D.ui?M.jsx(o,{...D.ui}):D.ui?M.jsx(je,{type:D.ui.type}):null})},x.key))}}return M.jsx("div",{...he,className:ne(u&&"select-none",V.elevated&&"drop-shadow-lg"),style:Y,children:M.jsxs(ke,{shape:p,block:n,gap:r,fill:V.fill,stroke:V.stroke,strokeWidth:V.strokeWidth,pad:0,noClip:ue,children:[V.accentBar&&M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:V.accentBar}}),J]})})});function je({type:e}){return M.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",M.jsx("code",{className:"ml-1",children:e})]})}Ge.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const jt={title:"UI/Notch/NotchGrid",component:Ge,parameters:{layout:"fullscreen"}},ft=({label:e,value:t})=>M.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[M.jsx("div",{className:"text-xs opacity-75",children:e}),M.jsx("div",{className:"text-xl font-semibold",children:t})]}),vt=({label:e,children:t})=>M.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),ee={Label:ft,Center:vt},Z=(...e)=>e.map(t=>t.map(n=>n===1)),P=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),de={args:{primitives:ee,items:[{key:"hero",desire:{shape:P(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:P(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:P(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},oe={args:{primitives:ee,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:P(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},re={args:{primitives:ee,items:[{key:"panel",desire:{shape:P(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:P(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:P(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:P(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:P(1,1)},ui:{type:"Label",label:"B"}}]}]}},se={args:{primitives:ee,items:[{key:"first",desire:{position:[0,0],shape:P(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:P(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},ae={args:{primitives:ee,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:P(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},ie={args:{primitives:ee,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:Z([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:P(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:Z([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:Z([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:Z([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:P(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:Z([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},le={args:{primitives:ee,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:Z([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:Z([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:Z([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:Z([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:P(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:P(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:P(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:P(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};de.parameters={...de.parameters,docs:{...de.parameters?.docs,source:{originalSource:`{
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
}`,...de.parameters?.docs?.source}}};oe.parameters={...oe.parameters,docs:{...oe.parameters?.docs,source:{originalSource:`{
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
}`,...oe.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...oe.parameters?.docs?.description}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
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
}`,...re.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,...re.parameters?.docs?.description}}};se.parameters={...se.parameters,docs:{...se.parameters?.docs,source:{originalSource:`{
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
}`,...se.parameters?.docs?.source},description:{story:`Priority-mapped position: each tile prefers (0,0), but only the first to
 claim it lands there. Others fall back to their secondary positions.`,...se.parameters?.docs?.description}}};ae.parameters={...ae.parameters,docs:{...ae.parameters?.docs,source:{originalSource:`{
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
}`,...ae.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations. `cols: 6` keeps each chrome\n `type` on its own row (6 variants across) so the rows read as\n filled / outlined / elevated / ghost top-to-bottom. Elevated tiles\n carry the variant accent on their text so they don't all look alike.",...ae.parameters?.docs?.description}}};ie.parameters={...ie.parameters,docs:{...ie.parameters?.docs,source:{originalSource:`{
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
}`,...ie.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...ie.parameters?.docs?.description}}};le.parameters={...le.parameters,docs:{...le.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    cols: 8,
    blockMin: 96,
    draggable: true,
    onItemMove: (key, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] drop:", key, pos);
    },
    onSubItemPromote: (parentKey, subIndex, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] sub drop:", parentKey, subIndex, pos);
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
      // 3×2 panel — drag its sub-cells around, or out to promote them.
      key: "panel",
      desire: {
        position: [3, 3],
        shape: r(3, 2)
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
          position: [1, 0],
          shape: r(1, 1)
        },
        ui: {
          type: "Label",
          label: "Calls",
          value: "1.2k"
        }
      }, {
        desire: {
          position: [2, 1],
          shape: r(1, 1)
        },
        ui: {
          type: "Label",
          label: "Errs",
          value: "3"
        }
      }]
    }] satisfies NotchGridItem[]
  }
}`,...le.parameters?.docs?.source},description:{story:"Outer-grid drag over the same rich notched footprints as `CustomShapes`:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...le.parameters?.docs?.description}}};const $t=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{oe as AutoSize,de as Basic,ie as CustomShapes,le as Draggable,se as PriorityFallback,re as SubItems,ae as ThemeGallery,$t as __namedExportsOrder,jt as default};
