import{r as R,j as M}from"./iframe-DdwDFtby.js";import{c as ne}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const Ce=(e,n)=>`${e},${n}`;function ae(e){let n=0;for(const t of e)n=Math.max(n,t.length);return n}function Ue(e,n){return e.map(t=>t.map(a=>a>=1&&a<=n))}function Ke(e,{cell:n,radius:t=24,inverseRadius:a=32,gap:s=0,bleed:i=0}){const d=e.length,h=(g,m)=>g>=0&&g<d&&m>=0&&m<e[g].length&&!!e[g][m],b=Math.max(0,Math.min(s,n-2))/2-i,k=new Map,T=(g,m)=>{const $=Ce(g[0],g[1]),j=k.get($);j?j.push(m):k.set($,[m])};for(let g=0;g<d;g++)for(let m=0;m<e[g].length;m++){if(!e[g][m])continue;const $=[m,g],j=[m+1,g],D=[m+1,g+1],S=[m,g+1];h(g-1,m)||T($,j),h(g,m+1)||T(j,D),h(g+1,m)||T(D,S),h(g,m-1)||T(S,$)}const P=new Set,A=[],B=(g,m)=>`${g}>${m[0]},${m[1]}`;for(const[g,m]of k){const[$,j]=g.split(",").map(Number);for(const D of m){if(P.has(B(g,D)))continue;const S=[];let K=[$,j],E=g,r=D,u=[0,0];for(;r;){const w=B(E,r);if(P.has(w))break;P.add(w),S.push(K),u=[r[0]-K[0],r[1]-K[1]],K=r,E=Ce(r[0],r[1]);const x=k.get(E)??[];let c=null,N=Number.POSITIVE_INFINITY;for(const I of x){if(P.has(B(E,I)))continue;const V=I[0]-K[0],G=I[1]-K[1],X=u[0]*G-u[1]*V;X<N&&(N=X,c=I)}r=c}const f=_e(S).map(([w,x])=>[w*n,x*n]);if(f.length>=3){const w=b!==0?Ve(f,b):f;A.push(Be(w,t,a))}}}return A.join(" ")}function _e(e){const n=e.length,t=[];for(let a=0;a<n;a++){const s=e[(a-1+n)%n],i=e[a],d=e[(a+1)%n],h=i[0]-s[0],b=i[1]-s[1],k=d[0]-i[0],T=d[1]-i[1];h*T-b*k!==0&&t.push(i)}return t}function Ve(e,n){const t=e.length,a=e.map((i,d)=>{const h=e[(d+1)%t],b=Math.sign(h[0]-i[0]),k=Math.sign(h[1]-i[1]);return k===0?{axis:"y",value:i[1]+b*n}:{axis:"x",value:i[0]+-k*n}}),s=[];for(let i=0;i<t;i++){const d=a[(i-1+t)%t],h=a[i],b=d.axis==="x"?d.value:h.value,k=d.axis==="y"?d.value:h.value;s.push([b,k])}return s}function Be(e,n,t){const a=e.length,s=[];for(let i=0;i<a;i++){const d=e[(i-1+a)%a],h=e[i],b=e[(i+1)%a],k=Me(d,h),T=Me(h,b),P=Ie(d,h),A=Ie(h,b),g=P[0]*A[1]-P[1]*A[0]>0,m=Math.min(g?n:t,k/2,T/2),$=[h[0]-P[0]*m,h[1]-P[1]*m],j=[h[0]+A[0]*m,h[1]+A[1]*m];s.push(`${i===0?"M":"L"} ${Re($)}`),m>0&&s.push(`A ${me(m)} ${me(m)} 0 0 ${g?1:0} ${Re(j)}`)}return s.push("Z"),s.join(" ")}function Me(e,n){return Math.abs(n[0]-e[0])+Math.abs(n[1]-e[1])}function Ie(e,n){return[Math.sign(n[0]-e[0]),Math.sign(n[1]-e[1])]}function me(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Re(e){return`${me(e[0])},${me(e[1])}`}const Ae=96;function be({shape:e,tier:n=1,block:t=Ae,gap:a=0,bleed:s=0,radius:i=24,inverseRadius:d=32,fill:h="var(--color-surface-container-low)",stroke:b="var(--color-outline-variant)",strokeWidth:k=1,children:T,pad:P="16px 8px",noClip:A=!1,className:B,style:g}){const $=`block-shape-clip-${R.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,j=e.length,D=ae(e),S=R.useMemo(()=>Ue(e,n),[e,n]),K=D*t,E=j*t,r=R.useMemo(()=>Ke(S,{cell:t,gap:a,bleed:s,radius:i,inverseRadius:d}),[S,t,a,s,i,d]),u=k/2,f=s+u;return M.jsxs("div",{className:ne("relative",B),style:{width:K,height:E,...g},children:[M.jsxs("svg",{width:K+2*s,height:E+2*s,viewBox:`${-f} ${-f} ${K+2*f} ${E+2*f}`,className:"pointer-events-none absolute",style:{left:-s,top:-s},"aria-hidden":"true",children:[!A&&M.jsx("defs",{children:M.jsx("clipPath",{id:$,clipPathUnits:"userSpaceOnUse",children:M.jsx("path",{d:r})})}),M.jsx("path",{d:r,fill:h,stroke:b,strokeWidth:k,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),M.jsx("div",{className:ne("absolute inset-0",!A&&"overflow-hidden"),style:{padding:P,clipPath:A?void 0:`url(#${$})`},children:T})]})}be.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},bleed:{required:!1,tsType:{name:"number"},description:"Expand the outline OUTWARD by `bleed` px (inverse of `gap`) so the frame\n can sit beyond the cells. The SVG grows to avoid clipping; content stays\n in the cell box. Default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Padding on the content layer. Default 16px top/bottom, 8px sides.",defaultValue:{value:'"16px 8px"',computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Se=1e5;function Ge(e){let n=1,t=1;for(const s of e)n=Math.max(n,s.row+s.rows),t=Math.max(t,s.col+s.cols);const a=Array.from({length:n},()=>Array(t).fill(!1));for(const s of e)for(let i=0;i<s.rows;i++)for(let d=0;d<s.cols;d++)a[s.row+i][s.col+d]=!0;return a}const We={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function ge(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const n=Object.keys(e);return n.length>0&&n.every(t=>/^\d+$/.test(t))}function Ne(e){return ge(e)?Object.keys(e).sort((n,t)=>Number(n)-Number(t)).map(n=>[n,e[n]]):[["0",e]]}function Oe(e,n){if(n<=1)return e;const t=Math.floor(n),a=[];for(let s=0;s<e.length;s++)for(let i=0;i<t;i++){const d=[];for(let h=0;h<e[s].length;h++)for(let b=0;b<t;b++)d.push(e[s][h]);a.push(d)}return a}function $e(e,n){const t={...We,...n},a=Math.max(1,Math.floor(e.cols)),s=[],i=r=>{for(;s.length<=r;)s.push(new Array(a).fill(!1))},d=(r,u,f)=>{for(let w=0;w<r.length;w++){const x=r[w];for(let c=0;c<x.length;c++){if(!x[c])continue;const N=u+c;if(N<0||N>=a)return!0;const I=f+w;if(i(I),s[I][N])return!0}}return!1},h=(r,u,f)=>{for(let w=0;w<r.length;w++){const x=r[w];for(let c=0;c<x.length;c++)x[c]&&(i(f+w),s[f+w][u+c]=!0)}},b=(r,u,f)=>t.W_pos*Number(r)+t.W_shape*Number(u)+t.W_scale*(f-1),k=r=>{const u=r.desire.position===void 0?[["0",void 0]]:Ne(r.desire.position),f=Ne(r.desire.shape),w=r.desire.scale?Array.from({length:t.maxScale},(c,N)=>N+1):[1],x=[];for(const[c,N]of u)for(const[I,V]of f)for(const G of w){const X=G===1?V:Oe(V,G);x.push({posKey:c,shapeKey:I,pos:N,mask:X,scale:G,cost:b(c,I,G)})}return x.sort((c,N)=>c.cost-N.cost),x},T=(r,u,f,w)=>(h(u.mask,f,w),{key:r.key,item:r.item,col:f,row:w,mask:u.mask,cols:ae(u.mask),rows:u.mask.length,priorityUsed:{position:u.posKey,shape:u.shapeKey},scale:u.scale,cost:u.cost}),P=(r,u)=>{const f=ae(u.mask);if(f>a)return null;const w=(x,c)=>T(r,u,x,c);if(u.pos){const[x,c]=u.pos;return x>=0&&x+f<=a&&c>=0&&!d(u.mask,x,c)?w(x,c):null}for(let x=0;x<Se;x++)for(let c=0;c+f<=a;c++)if(!d(u.mask,c,x))return w(c,x);return null},A=r=>{for(const u of k(r)){const f=P(r,u);if(f)return f}return null},B=r=>{const u=r.desire.position;if(u===void 0||ge(u))return null;const[f,w]=u,x=k(r)[0];if(!x)return null;const c=ae(x.mask);if(c>a)return null;for(let N=0;N<Se;N++)for(let I=Math.max(0,w-N);I<=w+N;I++)for(let V=Math.max(0,f-N);V+c<=a;V++)if(Math.max(Math.abs(I-w),Math.abs(V-f))===N&&!d(x.mask,V,I))return T(r,x,V,I);return null},g=r=>{const u=r.desire.position;return u!==void 0&&!ge(u)},m=[],$=[],j=[];for(const r of e.items)if(g(r)){const u=A(r);if(u)m.push(u);else{const f=B(r);f?m.push(f):j.push({...r,desire:{...r.desire,position:void 0}})}}else j.push(r);for(const r of j){const u=A(r);u?m.push(u):$.push(r.key)}let D=0,S=0;for(const r of m){const u=k(e.items.find(f=>f.key===r.key));D+=r.cost,S+=u[u.length-1]?.cost??0}const K=S===0?1:1-D/S;let E=0;for(const r of m)E=Math.max(E,r.row+r.rows);return{placements:m,rowsUsed:E,unfit:$,satisfaction:K}}const Fe="neutral",ze={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Xe={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},ce={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ye={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},He={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Ze(e){const n=e.variant??"auto",t=n==="auto"?Fe:n,a=e.type??"auto";return{type:a==="auto"?n==="auto"?"ghost":"filled":a,variant:t}}function Le(e,n){if(n<=0||e==="transparent")return e;const t=Math.min(1,n)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${t}%) 0%, ${e} 100%)`}function ie(e){const n=e??{},{type:t,variant:a}=Ze(n),s=n.gradient??0;switch(t){case"filled":{const i=ze[a];return{fill:i,cssBackground:Le(i,s),color:Xe[a],stroke:"none",strokeWidth:0,elevated:!1,noChrome:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:ce[a],stroke:Ye[a],strokeWidth:1,elevated:!1,noChrome:!1};case"elevated":{const i=a==="warn"||a==="error",d=He[a];return{fill:d,cssBackground:Le(d,s),color:ce[a],stroke:"none",strokeWidth:0,...i?{accentBar:ce[a]}:{},elevated:!0,noChrome:!1}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:ce[a],stroke:"none",strokeWidth:0,elevated:!1,noChrome:!0}}}const Qe="16px 8px";function ve(e,n){try{e.setPointerCapture(n)}catch{}}function Te(e,n){try{e.releasePointerCapture(n)}catch{}}const ue=e=>e,we=(e,n)=>`${e}::${n}`;function je(e,n){return[Math.max(0,Math.round(((e.panelCol+e.subCol)*n+e.dx)/n)),Math.max(0,Math.round(((e.panelRow+e.subRow)*n+e.dy)/n))]}function Pe({col:e,row:n,cols:t,rows:a,blockPx:s,contentPad:i,color:d}){return M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-20",style:{left:e*s,top:n*s,width:t*s,height:a*s,padding:i},children:M.jsx("div",{className:"h-full w-full rounded-[22px] border-2 border-dashed",style:{borderColor:d,opacity:.6}})})}function Je(e){return e.map(n=>n.map(t=>t?1:0))}function en(e){return e.every(n=>n.key!=null)?e:e.map((n,t)=>n.key?n:{...n,key:`item-${t}`})}function De(e){if(Array.isArray(e))return e;const n=Object.keys(e).sort((t,a)=>Number(t)-Number(a));return e[n[0]]}function nn(e){let n=1;for(const{sub:t}of e){const a=ae(De(t.desire.shape)),s=t.desire.position,i=Array.isArray(s)?s[0]:0;n=Math.max(n,i+a)}return n}function tn(e,n,t){const a=[];return n.forEach((s,i)=>{t.has(we(e,i))||a.push({sub:s,index:i})}),a}function on(e,n){return $e({items:e.map(t=>({key:we(n,t.index),desire:t.sub.desire,item:t})),cols:nn(e)})}function rn(e){const n=[];for(let t=0;t<e.mask.length;t++){const a=e.mask[t];for(let s=0;s<a.length;s++)a[s]&&n.push([e.col+s,e.row+t])}return n}function sn(e){if(e.length<=1)return e.length?[[...e]]:[];const n=e.map(rn),t=new Array(e.length).fill(!1),a=(i,d)=>{for(const[h,b]of n[i])for(const[k,T]of n[d])if(Math.abs(h-k)<=1&&Math.abs(b-T)<=1)return!0;return!1},s=[];for(let i=0;i<e.length;i++){if(t[i])continue;t[i]=!0;const d=[i],h=[];for(;d.length;){const b=d.shift();h.push(e[b]);for(let k=0;k<e.length;k++)!t[k]&&a(b,k)&&(t[k]=!0,d.push(k))}s.push(h)}return s}function an(e,n){const t=new Map;e.forEach((s,i)=>{const d=n.get(s.key),h=d!=null?`g:${d}`:`s:${i}`,b=t.get(h);b?b.push(s):t.set(h,[s])});const a=[];for(const s of t.values())for(const i of sn(s))a.push(i);return a}function qe({items:e,cols:n="auto",blockMin:t=Ae,gap:a=8,contentPad:s=Qe,panelBleed:i=0,nest:d=!0,primitives:h={},onItemError:b,draggable:k=!1,onItemMove:T,onSubItemPromote:P,className:A,style:B}){const g=R.useRef(null),[m,$]=R.useState(null);R.useLayoutEffect(()=>{const l=g.current;if(!l)return;const o=()=>$(l.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const p=new ResizeObserver(o);return p.observe(l),()=>p.disconnect()},[]);const j=R.useMemo(()=>en(e),[e]),{resolvedCols:D,block:S}=R.useMemo(()=>{if(n!=="auto")return{resolvedCols:n,block:t};if(m==null)return{resolvedCols:null,block:t};const l=Math.max(1,Math.floor(m/t));return{resolvedCols:l,block:m/l}},[n,t,m]),[K,E]=R.useState(new Map),[r,u]=R.useState(null),f=R.useRef(null);f.current=r;const[w,x]=R.useState(new Map),[c,N]=R.useState(null),I=R.useRef(null);I.current=c;const V=R.useCallback((l,o)=>{o.button!=null&&o.button!==0||(ve(o.currentTarget,o.pointerId),u({key:l.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:l.col,originRow:l.row,originCols:l.cols,originRows:l.rows,color:ie(l.item?.theme??{}).color,dx:0,dy:0}))},[]),G=R.useCallback((l,o)=>{if(o.button!=null&&o.button!==0)return;ve(o.currentTarget,o.pointerId);const p=l[0];u({key:p.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:p.col,originRow:p.row,originCols:p.cols,originRows:p.rows,color:ie(p.item?.theme??{}).color,dx:0,dy:0,members:l.map(v=>({key:v.key,col:v.col,row:v.row,cols:v.cols,rows:v.rows}))})},[]),X=R.useCallback((l,o,p,v)=>{if(v.button!=null&&v.button!==0)return;ve(v.currentTarget,v.pointerId);const L=ie(l.item.theme??{});N({parentKey:l.key,subIndex:o.index,pointerId:v.pointerId,startX:v.clientX,startY:v.clientY,dx:0,dy:0,panelCol:l.col,panelRow:l.row,panelCols:l.cols,panelRows:l.rows,subCol:p.col,subRow:p.row,ghostShape:Je(p.mask),ghostFill:L.fill,ghostStroke:L.stroke,ghostStrokeWidth:L.strokeWidth,ghostUi:o.sub.ui,ghostColor:L.color})},[]),F=R.useCallback(l=>{const o=f.current;if(!o||l.pointerId!==o.pointerId)return;const p=l.clientX-o.startX,v=l.clientY-o.startY;p===o.dx&&v===o.dy||u({...o,dx:p,dy:v})},[]),Q=R.useCallback(l=>{const o=f.current;if(!o||l.pointerId!==o.pointerId)return;f.current=null,Te(l.currentTarget,l.pointerId),u(null);const p=S||t,v=D??1;if(o.members){const W=Math.min(...o.members.map(z=>z.col)),Z=Math.min(...o.members.map(z=>z.row)),fe=Math.max(...o.members.map(z=>z.col+z.cols)),ee=Math.max(-W,Math.min(v-fe,Math.round(o.dx/p))),he=Math.max(-Z,Math.round(o.dy/p));if(ee===0&&he===0)return;E(z=>{const ke=new Map(z);for(const ye of o.members)ke.set(ye.key,[ye.col+ee,ye.row+he]);return ke});for(const z of o.members)T?.(z.key,[z.col+ee,z.row+he]);return}const L=Math.max(0,v-o.originCols),q=Math.min(L,Math.max(0,o.originCol+Math.round(o.dx/p))),y=Math.max(0,o.originRow+Math.round(o.dy/p)),_=[q,y];E(W=>new Map(W).set(o.key,_)),T?.(o.key,_)},[S,t,D,T]),le=R.useCallback(l=>{const o=I.current;if(!o||l.pointerId!==o.pointerId)return;const p=l.clientX-o.startX,v=l.clientY-o.startY;p===o.dx&&v===o.dy||N({...o,dx:p,dy:v})},[]),J=R.useCallback(l=>{const o=I.current;if(!o||l.pointerId!==o.pointerId)return;I.current=null,Te(l.currentTarget,l.pointerId),N(null);const p=je(o,S||t),v=we(o.parentKey,o.subIndex),L=j.find(y=>y.key===o.parentKey),q=L?.subItems?.[o.subIndex];q&&x(y=>new Map(y).set(v,{parentKey:o.parentKey,item:{key:`promoted::${v}`,desire:{position:p,shape:De(q.desire.shape)},theme:{...L.theme,...q.theme},groupKey:L.groupKey??o.parentKey,ui:q.ui}})),E(y=>y.has(o.parentKey)?y:new Map(y).set(o.parentKey,[o.panelCol,o.panelRow])),P?.(o.parentKey,o.subIndex,p)},[S,t,j,P]),Y=r!==null||c!==null;R.useEffect(()=>{if(!Y)return;const l=p=>{I.current?le(ue(p)):f.current&&F(ue(p))},o=p=>{I.current?J(ue(p)):f.current&&Q(ue(p))};return window.addEventListener("pointermove",l),window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",o),window.removeEventListener("pointercancel",o)}},[Y,F,Q,le,J]);const{layout:te,panelSubLayouts:oe,components:C}=R.useMemo(()=>{const l={layout:null,panelSubLayouts:new Map,components:[]};if(D==null)return l;const o=new Set(j.map(y=>y.key)),p=new Map,v=new Map,L=j.map(y=>{const _=K.get(y.key);let W=_?{...y.desire,position:_}:y.desire,Z=y.groupKey;if(y.subItems&&y.subItems.length>0){const fe=tn(y.key,y.subItems,w),ee=on(fe,y.key);p.set(y.key,ee),W={...W,shape:Ge(ee.placements)},Z=y.groupKey??y.key}return v.set(y.key,Z),{key:y.key,desire:W,groupKey:Z,item:y}});for(const{item:y,parentKey:_}of w.values()){if(!o.has(_))continue;const W=K.get(y.key),Z=W?{...y.desire,position:W}:y.desire;v.set(y.key,y.groupKey),L.push({key:y.key,desire:Z,groupKey:y.groupKey,item:y})}const q=$e({items:L,cols:D});return{layout:q,panelSubLayouts:p,components:an(q.placements,v)}},[j,D,d,K,w]),U=te?.unfit.join(",")??"";R.useEffect(()=>{},[U,D,te]);const H=te?.rowsUsed??0;return M.jsxs("div",{ref:g,className:ne("relative w-full",A),style:{minHeight:H>0?H*S:void 0,...B},children:[C.map(l=>{const o=l.map(_=>_.key).join("|"),p=r?l.find(_=>_.key===r.key):void 0,v=p&&r?[r.dx,r.dy]:void 0,L=c&&l.some(_=>_.key===c.parentKey)?{parentKey:c.parentKey,subIndex:c.subIndex}:null,q=l.some(_=>K.has(_.key)),y=r?.members!=null&&p!=null;return M.jsx(ln,{members:l,block:S,gap:a,contentPad:s,panelBleed:i,primitives:h,onItemError:b,draggable:k,panelSubLayouts:oe,dragKey:p?.key??null,dragOffset:v,wholeDrag:y,draggingSub:L,overridden:q,onItemDragStart:V,onComponentDragStart:G,onSubDragStart:X,onSubDragMove:le,onSubDragEnd:J,onDragMove:F,onDragEnd:Q},o)}),c&&(()=>{const l=S||t,[o,p]=je(c,l);return M.jsx(Pe,{col:o,row:p,cols:c.ghostShape[0]?.length??1,rows:c.ghostShape.length,blockPx:l,contentPad:s,color:c.ghostColor})})(),r&&!r.members&&(()=>{const l=S||t,p=Math.max(0,(D??1)-r.originCols),v=Math.min(p,Math.max(0,r.originCol+Math.round(r.dx/l))),L=Math.max(0,r.originRow+Math.round(r.dy/l));return M.jsx(Pe,{col:v,row:L,cols:r.originCols,rows:r.originRows,blockPx:l,contentPad:s,color:r.color})})(),c&&(()=>{const l=h?.[c.ghostUi.type];return M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(c.panelCol+c.subCol)*S+c.dx,top:(c.panelRow+c.subRow)*S+c.dy,color:c.ghostColor},children:M.jsx(be,{shape:c.ghostShape,block:S,gap:a,bleed:i,pad:s,fill:c.ghostFill,stroke:c.ghostStroke,strokeWidth:c.ghostStrokeWidth,children:l?M.jsx(l,{...c.ghostUi}):null})})})()]})}const ln=R.memo(function({members:n,block:t,gap:a,contentPad:s,panelBleed:i,primitives:d,onItemError:h,draggable:b=!1,panelSubLayouts:k,dragKey:T,dragOffset:P,wholeDrag:A=!1,draggingSub:B,overridden:g=!1,onItemDragStart:m,onComponentDragStart:$,onSubDragStart:j,onSubDragMove:D,onSubDragEnd:S,onDragMove:K,onDragEnd:E}){let r=1/0,u=1/0,f=0,w=0;for(const C of n)r=Math.min(r,C.col),u=Math.min(u,C.row),f=Math.max(f,C.col+C.cols),w=Math.max(w,C.row+C.rows);const x=Math.max(1,f-r),c=Math.max(1,w-u),N=R.useMemo(()=>{const C=Array.from({length:c},()=>new Array(x).fill(0));for(const U of n)for(let H=0;H<U.mask.length;H++){const l=U.mask[H];for(let o=0;o<l.length;o++)l[o]&&(C[U.row-u+H][U.col-r+o]=1)}return C},[n,x,c,r,u]),I=n.length===1&&!k.has(n[0].key),V=R.useMemo(()=>Ke(N.map(C=>C.map(Boolean)),{cell:t,gap:a,bleed:i,radius:24,inverseRadius:32}),[N,t,a,i]),G=n[0],X=G.item,F=R.useMemo(()=>ie(X.theme??{}),[X.theme?.type,X.theme?.variant,X.theme?.gradient]);R.useEffect(()=>{if(h)for(const C of n){const U=C.item;U.ui&&!d?.[U.ui.type]&&h(C.key,{kind:"unknown-primitive",type:U.ui.type})}},[n,d,h]);const Q=(I||A)&&T===G.key,J=T!=null&&!I&&!A||F.noChrome,Y={position:"absolute",left:r*t,top:u*t,color:F.color};Q&&P?(Y.transform=`translate(${P[0]}px, ${P[1]}px)`,Y.zIndex=20):g&&(Y.zIndex=10),b&&(Y.cursor=Q?"grabbing":"grab",Y.touchAction="none"),J||(Y.clipPath=`path('${V}')`);const te=b&&I&&m?{onPointerDown:C=>m(G,C),onPointerMove:K,onPointerUp:E,onPointerCancel:E}:b&&!I&&$?{onPointerDown:C=>$(n,C),onPointerMove:K,onPointerUp:E,onPointerCancel:E}:void 0,oe=[];for(const C of n){const U=C.item,H=C.col-r,l=C.row-u,o=k.get(C.key);if(o)for(const p of o.placements){const v=p.item,L=B?.parentKey===C.key&&B.subIndex===v.index,q=v.sub,y=q.ui?d?.[q.ui.type]:void 0,_=b&&j?{onPointerDown:W=>{W.stopPropagation(),j(C,v,p,W)},onPointerMove:D,onPointerUp:S,onPointerCancel:S}:void 0;oe.push(M.jsx("div",{className:"absolute",style:{left:(H+p.col)*t,top:(l+p.row)*t,width:p.cols*t,height:p.rows*t,padding:s,opacity:L?0:void 0},children:M.jsx("div",{..._,className:ne("h-full w-full",b&&"cursor-grab touch-none"),children:y?M.jsx(y,{...q.ui}):M.jsx(Ee,{type:q.ui.type})})},`${C.key}/${v.index}`))}else{const p=U.ui?d?.[U.ui.type]:void 0,v=b&&!I&&m?{onPointerDown:y=>{y.stopPropagation(),m(C,y)},onPointerMove:K,onPointerUp:E,onPointerCancel:E}:void 0,L=!I&&!A&&T===C.key,q=ie(U.theme??{});oe.push(M.jsx("div",{className:"absolute",style:{left:H*t,top:l*t,width:C.cols*t,height:C.rows*t,padding:s,transform:L&&P?`translate(${P[0]}px, ${P[1]}px)`:void 0,zIndex:L?30:void 0,background:L?q.cssBackground:void 0,color:L?q.color:void 0,borderRadius:L?24:void 0},children:M.jsx("div",{...v,className:ne("h-full w-full",b&&!I&&"cursor-grab touch-none"),children:p&&U.ui?M.jsx(p,{...U.ui}):U.ui?M.jsx(Ee,{type:U.ui.type}):null})},C.key))}}return M.jsx("div",{...te,className:ne(b&&"select-none",F.elevated&&"drop-shadow-lg"),style:Y,children:M.jsxs(be,{shape:N,block:t,gap:a,bleed:i,fill:F.fill,stroke:F.stroke,strokeWidth:F.strokeWidth,pad:0,noClip:J,children:[F.accentBar&&M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:F.accentBar}}),oe]})})});function Ee({type:e}){return M.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",M.jsx("code",{className:"ml-1",children:e})]})}qe.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},contentPad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:'CSS padding inset on each tile / sub-cell\'s content. Default `"16px 8px"`.\n Lower it (or `0`) for fine-resolution grids where a tile may be only a\n fraction of a block tall — the default would over-pad short cells.',defaultValue:{value:'"16px 8px"',computed:!1}},panelBleed:{required:!1,tsType:{name:"number"},description:"Expand each panel's outline OUTWARD by `panelBleed` px so its frame can sit\n beyond the cells — lets the outer frame match the inter-tile gap instead of\n being half of it. Pair with a `contentPad` of the same value for uniform\n spacing. Default 0.",defaultValue:{value:"0",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:`Record<
  string,
  ComponentType<Record<string, unknown>>
>`},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse.",defaultValue:{value:"{}",computed:!1}},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const fn={title:"UI/Notch/NotchGrid",component:qe,parameters:{layout:"fullscreen"}},cn=({label:e,value:n})=>M.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[M.jsx("div",{className:"text-xs opacity-75",children:e}),M.jsx("div",{className:"text-xl font-semibold",children:n})]}),un=({label:e,children:n})=>M.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:n??e}),xe={Label:cn,Center:un},pe=(...e)=>e.map(n=>n.map(t=>t===1)),O=(e,n)=>Array.from({length:n},()=>Array(e).fill(!0)),de={args:{primitives:xe,items:[{key:"hero",desire:{shape:O(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:O(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:O(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:O(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},re={args:{primitives:xe,items:[{key:"panel",desire:{shape:O(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:O(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:O(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:O(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:O(1,1)},ui:{type:"Label",label:"B"}}]}]}},se={args:{primitives:xe,cols:8,blockMin:96,draggable:!0,onItemMove:(e,n)=>{console.log("[NotchGrid story] drop:",e,n)},onSubItemPromote:(e,n,t)=>{console.log("[NotchGrid story] sub drop:",e,n,t)},items:[{key:"L",desire:{position:[0,0],shape:pe([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:pe([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:pe([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:pe([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:O(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:O(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:O(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:O(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};de.parameters={...de.parameters,docs:{...de.parameters?.docs,source:{originalSource:`{
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
}`,...de.parameters?.docs?.source}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
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
}`,...se.parameters?.docs?.source},description:{story:"Outer-grid drag over rich notched footprints:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...se.parameters?.docs?.description}}};const hn=["Basic","SubItems","Draggable"];export{de as Basic,se as Draggable,re as SubItems,hn as __namedExportsOrder,fn as default};
