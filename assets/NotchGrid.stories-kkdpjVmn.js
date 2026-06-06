import{r as C,j as M}from"./iframe-DRHfpBh4.js";import{M as $e}from"./MetricBlock-D4t7dVsM.js";import{S as Ee}from"./Sparkline-BDmom2GH.js";import{D as De}from"./DataList-BSE9kF5t.js";import{D as qe}from"./DataTable-C5NL-s8A.js";import{S as Be}from"./StatusIndicator-DdQ_jyd9.js";import{S as _e}from"./StarRating-DfKFu7QI.js";import{T as Ge}from"./Timeline-d4W7Ujgi.js";import{G as Ue}from"./Gauge-BTTwFWAB.js";import{c as ee}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-C8zJ6B4O.js";import"./index-DZJXjDW5.js";import"./index-DwFH2nUp.js";import"./tone-B_C-zL0B.js";const be={Metric:$e,Sparkline:Ee,List:De,Table:qe,Status:Be,Rating:_e,Timeline:Ge,Gauge:Ue},we=(e,t)=>`${e},${t}`;function fe(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function Ve(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function Te(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:a=0}){const s=e.length,u=(d,v)=>d>=0&&d<s&&v>=0&&v<e[d].length&&!!e[d][v],f=Math.max(0,Math.min(a,t-2))/2,h=new Map,g=(d,v)=>{const I=we(d[0],d[1]),P=h.get(I);P?P.push(v):h.set(I,[v])};for(let d=0;d<s;d++)for(let v=0;v<e[d].length;v++){if(!e[d][v])continue;const I=[v,d],P=[v+1,d],L=[v+1,d+1],T=[v,d+1];u(d-1,v)||g(I,P),u(d,v+1)||g(P,L),u(d+1,v)||g(L,T),u(d,v-1)||g(T,I)}const j=new Set,$=[],D=(d,v)=>`${d}>${v[0]},${v[1]}`;for(const[d,v]of h){const[I,P]=d.split(",").map(Number);for(const L of v){if(j.has(D(d,L)))continue;const T=[];let S=[I,P],l=d,i=L,k=[0,0];for(;i;){const N=D(l,i);if(j.has(N))break;j.add(N),T.push(S),k=[i[0]-S[0],i[1]-S[1]],S=i,l=we(i[0],i[1]);const b=h.get(l)??[];let p=null,B=Number.POSITIVE_INFINITY;for(const q of b){if(j.has(D(l,q)))continue;const U=q[0]-S[0],V=q[1]-S[1],W=k[0]*V-k[1]*U;W<B&&(B=W,p=q)}i=p}const R=Oe(T).map(([N,b])=>[N*t,b*t]);if(R.length>=3){const N=f>0?We(R,f):R;$.push(Fe(N,n,r))}}}return $.join(" ")}function Oe(e){const t=e.length,n=[];for(let r=0;r<t;r++){const a=e[(r-1+t)%t],s=e[r],u=e[(r+1)%t],f=s[0]-a[0],h=s[1]-a[1],g=u[0]-s[0],j=u[1]-s[1];f*j-h*g!==0&&n.push(s)}return n}function We(e,t){const n=e.length,r=e.map((s,u)=>{const f=e[(u+1)%n],h=Math.sign(f[0]-s[0]),g=Math.sign(f[1]-s[1]);return g===0?{axis:"y",value:s[1]+h*t}:{axis:"x",value:s[0]+-g*t}}),a=[];for(let s=0;s<n;s++){const u=r[(s-1+n)%n],f=r[s],h=u.axis==="x"?u.value:f.value,g=u.axis==="y"?u.value:f.value;a.push([h,g])}return a}function Fe(e,t,n){const r=e.length,a=[];for(let s=0;s<r;s++){const u=e[(s-1+r)%r],f=e[s],h=e[(s+1)%r],g=ke(u,f),j=ke(f,h),$=xe(u,f),D=xe(f,h),v=$[0]*D[1]-$[1]*D[0]>0,I=Math.min(v?t:n,g/2,j/2),P=[f[0]-$[0]*I,f[1]-$[1]*I],L=[f[0]+D[0]*I,f[1]+D[1]*I];a.push(`${s===0?"M":"L"} ${Ce(P)}`),I>0&&a.push(`A ${le(I)} ${le(I)} 0 0 ${v?1:0} ${Ce(L)}`)}return a.push("Z"),a.join(" ")}function ke(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function xe(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function le(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Ce(e){return`${le(e[0])},${le(e[1])}`}const Le=96;function he({shape:e,tier:t=1,block:n=Le,gap:r=0,radius:a=24,inverseRadius:s=32,fill:u="var(--color-surface-container-low)",stroke:f="var(--color-outline-variant)",strokeWidth:h=1,children:g,pad:j="16px 8px",noClip:$=!1,className:D,style:d}){const I=`block-shape-clip-${C.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,P=e.length,L=fe(e),T=C.useMemo(()=>Ve(e,t),[e,t]),S=L*n,l=P*n,i=C.useMemo(()=>Te(T,{cell:n,gap:r,radius:a,inverseRadius:s}),[T,n,r,a,s]),k=h/2;return M.jsxs("div",{className:ee("relative",D),style:{width:S,height:l,...d},children:[M.jsxs("svg",{width:S,height:l,viewBox:`${-k} ${-k} ${S+h} ${l+h}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!$&&M.jsx("defs",{children:M.jsx("clipPath",{id:I,clipPathUnits:"userSpaceOnUse",children:M.jsx("path",{d:i})})}),M.jsx("path",{d:i,fill:u,stroke:f,strokeWidth:h,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),M.jsx("div",{className:ee("absolute inset-0",!$&&"overflow-hidden"),style:{padding:j,clipPath:$?void 0:`url(#${I})`},children:g})]})}he.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Padding on the content layer. Default 16px top/bottom, 8px sides.",defaultValue:{value:'"16px 8px"',computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const ze=1e5;function Xe(e){let t=1,n=1;for(const a of e)t=Math.max(t,a.row+a.rows),n=Math.max(n,a.col+a.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const a of e)for(let s=0;s<a.rows;s++)for(let u=0;u<a.cols;u++)r[a.row+s][a.col+u]=!0;return r}const Ye={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function Pe(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Me(e){return Pe(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function He(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let a=0;a<e.length;a++)for(let s=0;s<n;s++){const u=[];for(let f=0;f<e[a].length;f++)for(let h=0;h<n;h++)u.push(e[a][f]);r.push(u)}return r}function je(e,t){const n={...Ye,...t},r=Math.max(1,Math.floor(e.cols)),a=[],s=l=>{for(;a.length<=l;)a.push(new Array(r).fill(!1))},u=(l,i,k)=>{for(let R=0;R<l.length;R++){const N=l[R];for(let b=0;b<N.length;b++){if(!N[b])continue;const p=i+b;if(p<0||p>=r)return!0;const B=k+R;if(s(B),a[B][p])return!0}}return!1},f=(l,i,k)=>{for(let R=0;R<l.length;R++){const N=l[R];for(let b=0;b<N.length;b++)N[b]&&(s(k+R),a[k+R][i+b]=!0)}},h=(l,i,k)=>n.W_pos*Number(l)+n.W_shape*Number(i)+n.W_scale*(k-1),g=l=>{const i=l.desire.position===void 0?[["0",void 0]]:Me(l.desire.position),k=Me(l.desire.shape),R=l.desire.scale?Array.from({length:n.maxScale},(b,p)=>p+1):[1],N=[];for(const[b,p]of i)for(const[B,q]of k)for(const U of R){const V=U===1?q:He(q,U);N.push({posKey:b,shapeKey:B,pos:p,mask:V,scale:U,cost:h(b,B,U)})}return N.sort((b,p)=>b.cost-p.cost),N},j=(l,i)=>{const k=fe(i.mask),R=i.mask.length;if(k>r)return null;const N=(b,p)=>(f(i.mask,b,p),{key:l.key,item:l.item,col:b,row:p,mask:i.mask,cols:k,rows:R,priorityUsed:{position:i.posKey,shape:i.shapeKey},scale:i.scale,cost:i.cost});if(i.pos){const[b,p]=i.pos;return b>=0&&b+k<=r&&p>=0&&!u(i.mask,b,p)?N(b,p):null}for(let b=0;b<ze;b++)for(let p=0;p+k<=r;p++)if(!u(i.mask,p,b))return N(p,b);return null},$=l=>{for(const i of g(l)){const k=j(l,i);if(k)return k}return null},D=l=>{const i=l.desire.position;return i!==void 0&&!Pe(i)},d=[],v=[],I=[];for(const l of e.items)if(D(l)){const i=$(l);i?d.push(i):I.push({...l,desire:{...l.desire,position:void 0}})}else I.push(l);for(const l of I){const i=$(l);i?d.push(i):v.push(l.key)}let P=0,L=0;for(const l of d){const i=g(e.items.find(k=>k.key===l.key));P+=l.cost,L+=i[i.length-1]?.cost??0}const T=L===0?1:1-P/L;let S=0;for(const l of d)S=Math.max(S,l.row+l.rows);return{placements:d,rowsUsed:S,unfit:v,satisfaction:T}}const Ze="neutral",Qe={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Je={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},se={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},et={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},tt={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function nt(e){const t=e.variant??"auto",n=t==="auto"?Ze:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function Ie(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function me(e){const t=e??{},{type:n,variant:r}=nt(t),a=t.gradient??0;switch(n){case"filled":{const s=Qe[r];return{fill:s,cssBackground:Ie(s,a),color:Je[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:se[r],stroke:et[r],strokeWidth:1,elevated:!1};case"elevated":{const s=r==="warn"||r==="error",u=tt[r];return{fill:u,cssBackground:Ie(u,a),color:se[r],stroke:"none",strokeWidth:0,...s?{accentBar:se[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:se[r],stroke:"none",strokeWidth:0,elevated:!1}}}const Se="16px 8px";function de(e,t){try{e.setPointerCapture(t)}catch{}}function Re(e,t){try{e.releasePointerCapture(t)}catch{}}const ye=(e,t)=>`${e}::${t}`;function ot(e){return e.map(t=>t.map(n=>n?1:0))}function rt(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function Ke(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function st(e){let t=1;for(const{sub:n}of e){const r=fe(Ke(n.desire.shape)),a=n.desire.position,s=Array.isArray(a)?a[0]:0;t=Math.max(t,s+r)}return t}function at(e,t,n){const r=[];return t.forEach((a,s)=>{n.has(ye(e,s))||r.push({sub:a,index:s})}),r}function it(e,t){return je({items:e.map(n=>({key:ye(t,n.index),desire:n.sub.desire,item:n})),cols:st(e)})}function lt(e){const t=[];for(let n=0;n<e.mask.length;n++){const r=e.mask[n];for(let a=0;a<r.length;a++)r[a]&&t.push([e.col+a,e.row+n])}return t}function ct(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(lt),n=new Array(e.length).fill(!1),r=(s,u)=>{for(const[f,h]of t[s])for(const[g,j]of t[u])if(Math.abs(f-g)<=1&&Math.abs(h-j)<=1)return!0;return!1},a=[];for(let s=0;s<e.length;s++){if(n[s])continue;n[s]=!0;const u=[s],f=[];for(;u.length;){const h=u.shift();f.push(e[h]);for(let g=0;g<e.length;g++)!n[g]&&r(h,g)&&(n[g]=!0,u.push(g))}a.push(f)}return a}function ut(e,t){const n=new Map;e.forEach((a,s)=>{const u=t.get(a.key),f=u!=null?`g:${u}`:`s:${s}`,h=n.get(f);h?h.push(a):n.set(f,[a])});const r=[];for(const a of n.values())for(const s of ct(a))r.push(s);return r}function Ae({items:e,cols:t="auto",blockMin:n=Le,gap:r=8,nest:a=!0,primitives:s,onItemError:u,draggable:f=!1,onItemMove:h,onSubItemPromote:g,className:j,style:$}){const D=C.useMemo(()=>s?{...be,...s}:be,[s]),d=C.useRef(null),[v,I]=C.useState(null);C.useLayoutEffect(()=>{const c=d.current;if(!c)return;const o=()=>I(c.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const y=new ResizeObserver(o);return y.observe(c),()=>y.disconnect()},[]);const P=C.useMemo(()=>rt(e),[e]),{resolvedCols:L,block:T}=C.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(v==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(v/n));return{resolvedCols:c,block:v/c}},[t,n,v]),[S,l]=C.useState(new Map),[i,k]=C.useState(null),R=C.useRef(null);R.current=i;const[N,b]=C.useState(new Map),[p,B]=C.useState(null),q=C.useRef(null);q.current=p;const U=C.useCallback((c,o)=>{o.button!=null&&o.button!==0||(de(o.currentTarget,o.pointerId),k({key:c.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:c.col,originRow:c.row,originCols:c.cols,dx:0,dy:0}))},[]),V=C.useCallback((c,o)=>{if(o.button!=null&&o.button!==0)return;de(o.currentTarget,o.pointerId);const y=c[0];k({key:y.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:y.col,originRow:y.row,originCols:y.cols,dx:0,dy:0,members:c.map(m=>({key:m.key,col:m.col,row:m.row,cols:m.cols,rows:m.rows}))})},[]),W=C.useCallback((c,o,y,m)=>{if(m.button!=null&&m.button!==0)return;de(m.currentTarget,m.pointerId);const K=me(c.item.theme??{});B({parentKey:c.key,subIndex:o.index,pointerId:m.pointerId,startX:m.clientX,startY:m.clientY,dx:0,dy:0,panelCol:c.col,panelRow:c.row,panelCols:c.cols,panelRows:c.rows,subCol:y.col,subRow:y.row,ghostShape:ot(y.mask),ghostFill:K.fill,ghostStroke:K.stroke,ghostStrokeWidth:K.strokeWidth,ghostUi:o.sub.ui,ghostColor:K.color})},[]),oe=C.useCallback(c=>{const o=R.current;if(!o||c.pointerId!==o.pointerId)return;const y=c.clientX-o.startX,m=c.clientY-o.startY;y===o.dx&&m===o.dy||k({...o,dx:y,dy:m})},[]),re=C.useCallback(c=>{const o=R.current;if(!o||c.pointerId!==o.pointerId)return;Re(c.currentTarget,c.pointerId),k(null);const y=T||n,m=L??1;if(o.members){const G=Math.min(...o.members.map(z=>z.col)),F=Math.min(...o.members.map(z=>z.row)),X=Math.max(...o.members.map(z=>z.col+z.cols)),J=Math.max(-G,Math.min(m-X,Math.round(o.dx/y))),ue=Math.max(-F,Math.round(o.dy/y));if(J===0&&ue===0)return;l(z=>{const ge=new Map(z);for(const pe of o.members)ge.set(pe.key,[pe.col+J,pe.row+ue]);return ge});for(const z of o.members)h?.(z.key,[z.col+J,z.row+ue]);return}const K=Math.max(0,m-o.originCols),_=Math.min(K,Math.max(0,o.originCol+Math.round(o.dx/y))),w=Math.max(0,o.originRow+Math.round(o.dy/y)),A=[_,w];l(G=>new Map(G).set(o.key,A)),h?.(o.key,A)},[T,n,L,h]),Y=C.useCallback(c=>{const o=q.current;if(!o||c.pointerId!==o.pointerId)return;const y=c.clientX-o.startX,m=c.clientY-o.startY;y===o.dx&&m===o.dy||B({...o,dx:y,dy:m})},[]),ce=C.useCallback(c=>{const o=q.current;if(!o||c.pointerId!==o.pointerId)return;Re(c.currentTarget,c.pointerId),B(null);const y=T||n,m=d.current?.getBoundingClientRect(),K=m?Math.max(0,Math.floor((c.clientX-m.left)/y)):o.panelCol+o.subCol,_=m?Math.max(0,Math.floor((c.clientY-m.top)/y)):o.panelRow+o.subRow,w=[K,_],A=ye(o.parentKey,o.subIndex),G=P.find(X=>X.key===o.parentKey),F=G?.subItems?.[o.subIndex];F&&b(X=>new Map(X).set(A,{parentKey:o.parentKey,item:{key:`promoted::${A}`,desire:{position:w,shape:Ke(F.desire.shape)},theme:{...G.theme,...F.theme},groupKey:G.groupKey??o.parentKey,ui:F.ui}})),l(X=>X.has(o.parentKey)?X:new Map(X).set(o.parentKey,[o.panelCol,o.panelRow])),g?.(o.parentKey,o.subIndex,w)},[T,n,P,g]),{layout:Q,panelSubLayouts:x,components:E}=C.useMemo(()=>{const c={layout:null,panelSubLayouts:new Map,components:[]};if(L==null)return c;const o=new Set(P.map(w=>w.key)),y=new Map,m=new Map,K=P.map(w=>{const A=S.get(w.key);let G=A?{...w.desire,position:A}:w.desire,F=w.groupKey;if(w.subItems&&w.subItems.length>0){const X=at(w.key,w.subItems,N),J=it(X,w.key);y.set(w.key,J),G={...G,shape:Xe(J.placements)},F=w.groupKey??w.key}return m.set(w.key,F),{key:w.key,desire:G,groupKey:F,item:w}});for(const{item:w,parentKey:A}of N.values()){if(!o.has(A))continue;const G=S.get(w.key),F=G?{...w.desire,position:G}:w.desire;m.set(w.key,w.groupKey),K.push({key:w.key,desire:F,groupKey:w.groupKey,item:w})}const _=je({items:K,cols:L});return{layout:_,panelSubLayouts:y,components:ut(_.placements,m)}},[P,L,a,S,N]),H=Q?.unfit.join(",")??"";C.useEffect(()=>{},[H,L,Q]);const Z=Q?.rowsUsed??0;return M.jsxs("div",{ref:d,className:ee("relative w-full",j),style:{minHeight:Z>0?Z*T:void 0,...$},children:[E.map(c=>{const o=c.map(A=>A.key).join("|"),y=i?c.find(A=>A.key===i.key):void 0,m=y&&i?[i.dx,i.dy]:void 0,K=p&&c.some(A=>A.key===p.parentKey)?{parentKey:p.parentKey,subIndex:p.subIndex}:null,_=c.some(A=>S.has(A.key)),w=i?.members!=null&&y!=null;return M.jsx(pt,{members:c,block:T,gap:r,primitives:D,onItemError:u,draggable:f,panelSubLayouts:x,dragKey:y?.key??null,dragOffset:m,wholeDrag:w,draggingSub:K,overridden:_,onItemDragStart:U,onComponentDragStart:V,onSubDragStart:W,onSubDragMove:Y,onSubDragEnd:ce,onDragMove:oe,onDragEnd:re},o)}),p&&(()=>{const c=D?.[p.ghostUi.type];return M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(p.panelCol+p.subCol)*T+p.dx,top:(p.panelRow+p.subRow)*T+p.dy,color:p.ghostColor},children:M.jsx(he,{shape:p.ghostShape,block:T,gap:r,fill:p.ghostFill,stroke:p.ghostStroke,strokeWidth:p.ghostStrokeWidth,children:c?M.jsx(c,{...p.ghostUi}):null})})})()]})}const pt=C.memo(function({members:t,block:n,gap:r,primitives:a,onItemError:s,draggable:u=!1,panelSubLayouts:f,dragKey:h,dragOffset:g,wholeDrag:j=!1,draggingSub:$,overridden:D=!1,onItemDragStart:d,onComponentDragStart:v,onSubDragStart:I,onSubDragMove:P,onSubDragEnd:L,onDragMove:T,onDragEnd:S}){let l=1/0,i=1/0,k=0,R=0;for(const x of t)l=Math.min(l,x.col),i=Math.min(i,x.row),k=Math.max(k,x.col+x.cols),R=Math.max(R,x.row+x.rows);const N=Math.max(1,k-l),b=Math.max(1,R-i),p=C.useMemo(()=>{const x=Array.from({length:b},()=>new Array(N).fill(0));for(const E of t)for(let H=0;H<E.mask.length;H++){const Z=E.mask[H];for(let c=0;c<Z.length;c++)Z[c]&&(x[E.row-i+H][E.col-l+c]=1)}return x},[t,N,b,l,i]),B=C.useMemo(()=>Te(p.map(x=>x.map(Boolean)),{cell:n,gap:r,radius:24,inverseRadius:32}),[p,n,r]),q=t[0],U=q.item,V=C.useMemo(()=>me(U.theme??{}),[U.theme?.type,U.theme?.variant,U.theme?.gradient]);C.useEffect(()=>{if(s)for(const x of t){const E=x.item;E.ui&&!a?.[E.ui.type]&&s(x.key,{kind:"unknown-primitive",type:E.ui.type})}},[t,a,s]);const W=t.length===1&&!f.has(q.key),oe=(W||j)&&h===q.key,re=h!=null&&!W&&!j,Y={position:"absolute",left:l*n,top:i*n,color:V.color};oe&&g?(Y.transform=`translate(${g[0]}px, ${g[1]}px)`,Y.zIndex=20):D&&(Y.zIndex=10),u&&(Y.cursor=oe?"grabbing":"grab",Y.touchAction="none"),re||(Y.clipPath=`path('${B}')`);const ce=u&&W&&d?{onPointerDown:x=>d(q,x),onPointerMove:T,onPointerUp:S,onPointerCancel:S}:u&&!W&&v?{onPointerDown:x=>v(t,x),onPointerMove:T,onPointerUp:S,onPointerCancel:S}:void 0,Q=[];for(const x of t){const E=x.item,H=x.col-l,Z=x.row-i,c=f.get(x.key);if(c)for(const o of c.placements){const y=o.item,m=$?.parentKey===x.key&&$.subIndex===y.index,K=y.sub,_=K.ui?a?.[K.ui.type]:void 0,w=u&&I?{onPointerDown:A=>{A.stopPropagation(),I(x,y,o,A)},onPointerMove:P,onPointerUp:L,onPointerCancel:L}:void 0;Q.push(M.jsx("div",{className:"absolute",style:{left:(H+o.col)*n,top:(Z+o.row)*n,width:o.cols*n,height:o.rows*n,padding:Se,opacity:m?0:void 0},children:M.jsx("div",{...w,className:ee("h-full w-full",u&&"cursor-grab touch-none"),children:_?M.jsx(_,{...K.ui}):M.jsx(Ne,{type:K.ui.type})})},`${x.key}/${y.index}`))}else{const o=E.ui?a?.[E.ui.type]:void 0,y=u&&!W&&d?{onPointerDown:_=>{_.stopPropagation(),d(x,_)},onPointerMove:T,onPointerUp:S,onPointerCancel:S}:void 0,m=!W&&!j&&h===x.key,K=me(E.theme??{});Q.push(M.jsx("div",{className:"absolute",style:{left:H*n,top:Z*n,width:x.cols*n,height:x.rows*n,padding:Se,transform:m&&g?`translate(${g[0]}px, ${g[1]}px)`:void 0,zIndex:m?30:void 0,background:m?K.cssBackground:void 0,color:m?K.color:void 0,borderRadius:m?24:void 0},children:M.jsx("div",{...y,className:ee("h-full w-full",u&&!W&&"cursor-grab touch-none"),children:o&&E.ui?M.jsx(o,{...E.ui}):E.ui?M.jsx(Ne,{type:E.ui.type}):null})},x.key))}}return M.jsx("div",{...ce,className:ee(u&&"select-none",V.elevated&&"drop-shadow-lg"),style:Y,children:M.jsxs(he,{shape:p,block:n,gap:r,fill:V.fill,stroke:V.stroke,strokeWidth:V.strokeWidth,pad:0,noClip:re,children:[V.accentBar&&M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:V.accentBar}}),Q]})})});function Ne({type:e}){return M.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",M.jsx("code",{className:"ml-1",children:e})]})}Ae.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Tt={title:"UI/Notch/NotchGrid",component:Ae,parameters:{layout:"fullscreen"}},dt=({label:e,value:t})=>M.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[M.jsx("div",{className:"text-xs opacity-75",children:e}),M.jsx("div",{className:"text-xl font-semibold",children:t})]}),mt=({label:e,children:t})=>M.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),ve={Label:dt,Center:mt},ae=(...e)=>e.map(t=>t.map(n=>n===1)),O=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),ie={args:{primitives:ve,items:[{key:"hero",desire:{shape:O(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:O(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:O(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:O(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},te={args:{primitives:ve,items:[{key:"panel",desire:{shape:O(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:O(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:O(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:O(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:O(1,1)},ui:{type:"Label",label:"B"}}]}]}},ne={args:{primitives:ve,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:ae([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:ae([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:ae([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:ae([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:O(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:O(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:O(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:O(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};ie.parameters={...ie.parameters,docs:{...ie.parameters?.docs,source:{originalSource:`{
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
}`,...ie.parameters?.docs?.source}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
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
}`,...te.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,...te.parameters?.docs?.description}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
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
}`,...ne.parameters?.docs?.source},description:{story:"Outer-grid drag over rich notched footprints:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...ne.parameters?.docs?.description}}};const Lt=["Basic","SubItems","Draggable"];export{ie as Basic,ne as Draggable,te as SubItems,Lt as __namedExportsOrder,Tt as default};
