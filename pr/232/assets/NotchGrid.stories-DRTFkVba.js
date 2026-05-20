import{r as x,j as L}from"./iframe-vrNly7JJ.js";import{c as oe}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const pe=(e,t)=>`${e},${t}`;function ae(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function $e(e,t){return e.map(n=>n.map(o=>o>=1&&o<=t))}function De(e,{cell:t,radius:n=24,inverseRadius:o=32,gap:l=0}){const a=e.length,p=(u,m)=>u>=0&&u<a&&m>=0&&m<e[u].length&&!!e[u][m],y=Math.max(0,Math.min(l,t-2))/2,f=new Map,N=(u,m)=>{const k=pe(u[0],u[1]),P=f.get(k);P?P.push(m):f.set(k,[m])};for(let u=0;u<a;u++)for(let m=0;m<e[u].length;m++){if(!e[u][m])continue;const k=[m,u],P=[m+1,u],T=[m+1,u+1],C=[m,u+1];p(u-1,m)||N(k,P),p(u,m+1)||N(P,T),p(u+1,m)||N(T,C),p(u,m-1)||N(C,k)}const j=new Set,$=[],D=(u,m)=>`${u}>${m[0]},${m[1]}`;for(const[u,m]of f){const[k,P]=u.split(",").map(Number);for(const T of m){if(j.has(D(u,T)))continue;const C=[];let I=[k,P],i=u,s=T,b=[0,0];for(;s;){const g=D(i,s);if(j.has(g))break;j.add(g),C.push(I),b=[s[0]-I[0],s[1]-I[1]],I=s,i=pe(s[0],s[1]);const h=f.get(i)??[];let v=null,K=Number.POSITIVE_INFINITY;for(const w of h){if(j.has(D(i,w)))continue;const A=w[0]-I[0],q=w[1]-I[1],V=b[0]*q-b[1]*A;V<K&&(K=V,v=w)}s=v}const S=Ae(C).map(([g,h])=>[g*t,h*t]);if(S.length>=3){const g=y>0?Ee(S,y):S;$.push(Ge(g,n,o))}}}return $.join(" ")}function Ae(e){const t=e.length,n=[];for(let o=0;o<t;o++){const l=e[(o-1+t)%t],a=e[o],p=e[(o+1)%t],y=a[0]-l[0],f=a[1]-l[1],N=p[0]-a[0],j=p[1]-a[1];y*j-f*N!==0&&n.push(a)}return n}function Ee(e,t){const n=e.length,o=e.map((a,p)=>{const y=e[(p+1)%n],f=Math.sign(y[0]-a[0]),N=Math.sign(y[1]-a[1]);return N===0?{axis:"y",value:a[1]+f*t}:{axis:"x",value:a[0]+-N*t}}),l=[];for(let a=0;a<n;a++){const p=o[(a-1+n)%n],y=o[a],f=p.axis==="x"?p.value:y.value,N=p.axis==="y"?p.value:y.value;l.push([f,N])}return l}function Ge(e,t,n){const o=e.length,l=[];for(let a=0;a<o;a++){const p=e[(a-1+o)%o],y=e[a],f=e[(a+1)%o],N=de(p,y),j=de(y,f),$=ye(p,y),D=ye(y,f),m=$[0]*D[1]-$[1]*D[0]>0,k=Math.min(m?t:n,N/2,j/2),P=[y[0]-$[0]*k,y[1]-$[1]*k],T=[y[0]+D[0]*k,y[1]+D[1]*k];l.push(`${a===0?"M":"L"} ${me(P)}`),k>0&&l.push(`A ${se(k)} ${se(k)} 0 0 ${m?1:0} ${me(T)}`)}return l.push("Z"),l.join(" ")}function de(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function ye(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function se(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function me(e){return`${se(e[0])},${se(e[1])}`}const we=96;function ie({shape:e,tier:t=1,block:n=we,gap:o=0,radius:l=24,inverseRadius:a=32,fill:p="var(--color-surface-container-low)",stroke:y="var(--color-outline-variant)",strokeWidth:f=1,children:N,pad:j=16,noClip:$=!1,className:D,style:u}){const k=`block-shape-clip-${x.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,P=e.length,T=ae(e),C=x.useMemo(()=>$e(e,t),[e,t]),I=T*n,i=P*n,s=x.useMemo(()=>De(C,{cell:n,gap:o,radius:l,inverseRadius:a}),[C,n,o,l,a]),b=f/2;return L.jsxs("div",{className:oe("relative",D),style:{width:I,height:i,...u},children:[L.jsxs("svg",{width:I,height:i,viewBox:`${-b} ${-b} ${I+f} ${i+f}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!$&&L.jsx("defs",{children:L.jsx("clipPath",{id:k,clipPathUnits:"userSpaceOnUse",children:L.jsx("path",{d:s})})}),L.jsx("path",{d:s,fill:p,stroke:y,strokeWidth:f,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),L.jsx("div",{className:oe("absolute inset-0",!$&&"overflow-hidden"),style:{padding:j,clipPath:$?void 0:`url(#${k})`},children:N})]})}ie.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const qe=1e5;function _e(e){let t=1,n=1;for(const l of e)t=Math.max(t,l.row+l.rows),n=Math.max(n,l.col+l.cols);const o=Array.from({length:t},()=>Array(n).fill(!1));for(const l of e)for(let a=0;a<l.rows;a++)for(let p=0;p<l.cols;p++)o[l.row+a][l.col+p]=!0;return o}const Oe={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function xe(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function he(e){return xe(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function Be(e,t){if(t<=1)return e;const n=Math.floor(t),o=[];for(let l=0;l<e.length;l++)for(let a=0;a<n;a++){const p=[];for(let y=0;y<e[l].length;y++)for(let f=0;f<n;f++)p.push(e[l][y]);o.push(p)}return o}function Ie(e,t){const n={...Oe,...t},o=Math.max(1,Math.floor(e.cols)),l=[],a=i=>{for(;l.length<=i;)l.push(new Array(o).fill(!1))},p=(i,s,b)=>{for(let S=0;S<i.length;S++){const g=i[S];for(let h=0;h<g.length;h++){if(!g[h])continue;const v=s+h;if(v<0||v>=o)return!0;const K=b+S;if(a(K),l[K][v])return!0}}return!1},y=(i,s,b)=>{for(let S=0;S<i.length;S++){const g=i[S];for(let h=0;h<g.length;h++)g[h]&&(a(b+S),l[b+S][s+h]=!0)}},f=(i,s,b)=>n.W_pos*Number(i)+n.W_shape*Number(s)+n.W_scale*(b-1),N=i=>{const s=i.desire.position===void 0?[["0",void 0]]:he(i.desire.position),b=he(i.desire.shape),S=i.desire.scale?Array.from({length:n.maxScale},(h,v)=>v+1):[1],g=[];for(const[h,v]of s)for(const[K,w]of b)for(const A of S){const q=A===1?w:Be(w,A);g.push({posKey:h,shapeKey:K,pos:v,mask:q,scale:A,cost:f(h,K,A)})}return g.sort((h,v)=>h.cost-v.cost),g},j=(i,s)=>{const b=ae(s.mask),S=s.mask.length;if(b>o)return null;const g=(h,v)=>(y(s.mask,h,v),{key:i.key,item:i.item,col:h,row:v,mask:s.mask,cols:b,rows:S,priorityUsed:{position:s.posKey,shape:s.shapeKey},scale:s.scale,cost:s.cost});if(s.pos){const[h,v]=s.pos;return h>=0&&h+b<=o&&v>=0&&!p(s.mask,h,v)?g(h,v):null}for(let h=0;h<qe;h++)for(let v=0;v+b<=o;v++)if(!p(s.mask,v,h))return g(v,h);return null},$=i=>{for(const s of N(i)){const b=j(i,s);if(b)return b}return null},D=i=>{const s=i.desire.position;return s!==void 0&&!xe(s)},u=[],m=[],k=[];for(const i of e.items)if(D(i)){const s=$(i);s?u.push(s):k.push({...i,desire:{...i.desire,position:void 0}})}else k.push(i);for(const i of k){const s=$(i);s?u.push(s):m.push(i.key)}let P=0,T=0;for(const i of u){const s=N(e.items.find(b=>b.key===i.key));P+=i.cost,T+=s[s.length-1]?.cost??0}const C=T===0?1:1-P/T;let I=0;for(const i of u)I=Math.max(I,i.row+i.rows);return{placements:u,rowsUsed:I,unfit:m,satisfaction:C}}const Ue="neutral",Ve={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Fe={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},ne={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},We={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},ze={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Xe(e){const t=e.variant??"auto",n=t==="auto"?Ue:t,o=e.type??"auto";return{type:o==="auto"?t==="auto"?"ghost":"filled":o,variant:n}}function fe(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function Le(e){const t=e??{},{type:n,variant:o}=Xe(t),l=t.gradient??0;switch(n){case"filled":{const a=Ve[o];return{fill:a,cssBackground:fe(a,l),color:Fe[o],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:ne[o],stroke:We[o],strokeWidth:1,elevated:!1};case"elevated":{const a=o==="warn"||o==="error",p=ze[o];return{fill:p,cssBackground:fe(p,l),color:ne[o],stroke:"none",strokeWidth:0,...a?{accentBar:ne[o]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:ne[o],stroke:"none",strokeWidth:0,elevated:!1}}}const be=16;function ve(e,t){try{e.setPointerCapture(t)}catch{}}function ge(e,t){try{e.releasePointerCapture(t)}catch{}}const le=(e,t)=>`${e}::${t}`;function Ce(e){return e.map(t=>t.map(n=>n?1:0))}function Ye(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function Se(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,o)=>Number(n)-Number(o));return e[t[0]]}function He(e){let t=1;for(const{sub:n}of e){const o=ae(Se(n.desire.shape)),l=n.desire.position,a=Array.isArray(l)?l[0]:0;t=Math.max(t,a+o)}return t}function Ze(e,t,n,o){const l=[];return t.forEach((a,p)=>{const y=le(e,p);if(o.has(y))return;const f=n.get(y);l.push({sub:f?{...a,desire:{...a.desire,position:f}}:a,index:p})}),l}function Qe(e,t){return Ie({items:e.map(n=>({key:le(t,n.index),desire:n.sub.desire,item:n})),cols:He(e)})}function Je(e,t,n,o){return t>=e.col&&t<e.col+e.cols&&n>=e.row&&n<e.row+e.rows?{kind:"reposition",pos:o}:{kind:"promote",pos:[t,n]}}function Me({items:e,cols:t="auto",blockMin:n=we,gap:o=8,nest:l=!0,primitives:a,onItemError:p,draggable:y=!1,onItemMove:f,onSubItemMove:N,onSubItemPromote:j,className:$,style:D}){const u=x.useRef(null),[m,k]=x.useState(null);x.useLayoutEffect(()=>{const c=u.current;if(!c)return;const r=()=>k(c.getBoundingClientRect().width);if(r(),typeof ResizeObserver>"u")return;const M=new ResizeObserver(r);return M.observe(c),()=>M.disconnect()},[]);const P=x.useMemo(()=>Ye(e),[e]),{resolvedCols:T,block:C}=x.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(m==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(m/n));return{resolvedCols:c,block:m/c}},[t,n,m]),[I,i]=x.useState(new Map),[s,b]=x.useState(null),S=x.useRef(null);S.current=s;const[g,h]=x.useState(new Map),[v,K]=x.useState(new Map),[w,A]=x.useState(null),q=x.useRef(null);q.current=w;const V=x.useCallback((c,r)=>{r.button!=null&&r.button!==0||(ve(r.currentTarget,r.pointerId),b({key:c.key,pointerId:r.pointerId,startX:r.clientX,startY:r.clientY,originCol:c.col,originRow:c.row,originCols:c.cols,dx:0,dy:0}))},[]),J=x.useCallback((c,r,M,d)=>{if(d.button!=null&&d.button!==0)return;ve(d.currentTarget,d.pointerId);const E=Le(c.item.theme??{});A({parentKey:c.key,subIndex:r.index,pointerId:d.pointerId,startX:d.clientX,startY:d.clientY,dx:0,dy:0,panelCol:c.col,panelRow:c.row,panelCols:c.cols,panelRows:c.rows,subCol:M.col,subRow:M.row,ghostShape:Ce(M.mask),ghostFill:E.fill,ghostStroke:E.stroke,ghostStrokeWidth:E.strokeWidth})},[]),Ne=x.useCallback(c=>{const r=S.current;if(!r||c.pointerId!==r.pointerId)return;const M=c.clientX-r.startX,d=c.clientY-r.startY;M===r.dx&&d===r.dy||b({...r,dx:M,dy:d})},[]),Te=x.useCallback(c=>{const r=S.current;if(!r||c.pointerId!==r.pointerId)return;ge(c.currentTarget,c.pointerId),b(null);const M=C||n,E=Math.max(0,(T??1)-r.originCols),B=Math.min(E,Math.max(0,r.originCol+Math.round(r.dx/M))),F=Math.max(0,r.originRow+Math.round(r.dy/M)),G=[B,F];i(W=>new Map(W).set(r.key,G)),f?.(r.key,G)},[C,n,T,f]),Re=x.useCallback(c=>{const r=q.current;if(!r||c.pointerId!==r.pointerId)return;const M=c.clientX-r.startX,d=c.clientY-r.startY;M===r.dx&&d===r.dy||A({...r,dx:M,dy:d})},[]),Pe=x.useCallback(c=>{const r=q.current;if(!r||c.pointerId!==r.pointerId)return;ge(c.currentTarget,c.pointerId),A(null);const M=C||n,d=u.current?.getBoundingClientRect(),E=d?Math.max(0,Math.floor((c.clientX-d.left)/M)):r.panelCol+r.subCol,B=d?Math.max(0,Math.floor((c.clientY-d.top)/M)):r.panelRow+r.subRow,F=[Math.max(0,r.subCol+Math.round(r.dx/M)),Math.max(0,r.subRow+Math.round(r.dy/M))],G=Je({col:r.panelCol,row:r.panelRow,cols:r.panelCols,rows:r.panelRows},E,B,F),W=le(r.parentKey,r.subIndex);if(G.kind==="reposition"){h(_=>new Map(_).set(W,G.pos)),N?.(r.parentKey,r.subIndex,G.pos);return}const ue=P.find(_=>_.key===r.parentKey),te=ue?.subItems?.[r.subIndex];te&&K(_=>new Map(_).set(W,{parentKey:r.parentKey,item:{key:`promoted::${W}`,desire:{position:G.pos,shape:Se(te.desire.shape)},theme:{...ue.theme,...te.theme},ui:te.ui}})),i(_=>_.has(r.parentKey)?_:new Map(_).set(r.parentKey,[r.panelCol,r.panelRow])),j?.(r.parentKey,r.subIndex,G.pos)},[C,n,P,N,j]),{layout:ee,panelSubLayouts:je}=x.useMemo(()=>{if(T==null)return{layout:null,panelSubLayouts:new Map};const c=new Set(P.map(d=>d.key)),r=new Map,M=P.map(d=>{const E=I.get(d.key);let B=E?{...d.desire,position:E}:d.desire;if(d.subItems&&d.subItems.length>0){const F=Ze(d.key,d.subItems,g,v),G=Qe(F,d.key);r.set(d.key,G),B={...B,shape:_e(G.placements)}}return{key:d.key,desire:B,groupKey:d.groupKey,item:d}});for(const{item:d,parentKey:E}of v.values())c.has(E)&&M.push({key:d.key,desire:d.desire,groupKey:d.groupKey,item:d});return{layout:Ie({items:M,cols:T}),panelSubLayouts:r}},[P,T,l,I,g,v]),Ke=ee?.unfit.join(",")??"";x.useEffect(()=>{},[Ke,T,ee]);const ce=ee?.rowsUsed??0;return L.jsxs("div",{ref:u,className:oe("relative w-full",$),style:{minHeight:ce>0?ce*C:void 0,...D},children:[ee?.placements.map(c=>{const M=s?.key===c.key&&s?[s.dx,s.dy]:void 0;return L.jsx(et,{placement:c,item:c.item,block:C,gap:o,primitives:a,onItemError:p,draggable:y,dragOffset:M,hasOverride:I.has(c.key),subLayout:je.get(c.key)??null,draggingSubIndex:w&&w.parentKey===c.key?w.subIndex:null,onItemDragStart:V,onSubDragStart:J,onSubDragMove:Re,onSubDragEnd:Pe,onDragMove:Ne,onDragEnd:Te},c.key)}),w&&L.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(w.panelCol+w.subCol)*C+w.dx,top:(w.panelRow+w.subRow)*C+w.dy},children:L.jsx(ie,{shape:w.ghostShape,block:C,gap:o,fill:w.ghostFill,stroke:w.ghostStroke,strokeWidth:w.ghostStrokeWidth})})]})}const et=x.memo(function({placement:t,item:n,block:o,gap:l,primitives:a,onItemError:p,draggable:y=!1,dragOffset:f,hasOverride:N=!1,subLayout:j,draggingSubIndex:$,onItemDragStart:D,onSubDragStart:u,onSubDragMove:m,onSubDragEnd:k,onDragMove:P,onDragEnd:T}){const C=n.theme??{},I=x.useMemo(()=>Le(C),[C.type,C.variant,C.gradient]),i=x.useMemo(()=>Ce(t.mask),[t.mask]),s=n.ui?a?.[n.ui.type]:void 0,b=n.ui!=null&&!s;x.useEffect(()=>{b&&p&&n.ui&&p(t.key,{kind:"unknown-primitive",type:n.ui.type})},[b,p,t.key,n.ui]);const S=f!==void 0,g={position:"absolute",left:t.col*o,top:t.row*o,color:I.color};S?(g.transform=`translate(${f[0]}px, ${f[1]}px)`,g.zIndex=20):N&&(g.zIndex=10),y&&(g.cursor=S?"grabbing":"grab",g.touchAction="none");const h=y&&D?{onPointerDown:K=>D(t,K),onPointerMove:P,onPointerUp:T,onPointerCancel:T}:void 0;let v=null;return j?v=L.jsx("div",{className:"relative h-full w-full",children:j.placements.map(K=>{const w=K.item;if($===w.index)return null;const A=w.sub,q=A.ui?a?.[A.ui.type]:void 0,V=y&&u?{onPointerDown:J=>{J.stopPropagation(),u(t,w,K,J)},onPointerMove:m,onPointerUp:k,onPointerCancel:k}:void 0;return L.jsx("div",{...V,className:y?"cursor-grab touch-none":void 0,style:{position:"absolute",left:K.col*o,top:K.row*o,width:K.cols*o,height:K.rows*o,padding:be},children:q?L.jsx(q,{...A.ui}):L.jsx(ke,{type:A.ui.type})},K.key)})}):s&&n.ui?v=L.jsx(s,{...n.ui}):b&&n.ui&&(v=L.jsx(ke,{type:n.ui.type})),L.jsx("div",{...h,className:oe(y&&"select-none",I.elevated&&"drop-shadow-lg"),style:g,children:L.jsxs(ie,{shape:i,block:o,gap:l,fill:I.fill,stroke:I.stroke,strokeWidth:I.strokeWidth,pad:j?0:be,children:[I.accentBar&&L.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:I.accentBar}}),v]})})});function ke({type:e}){return L.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",L.jsx("code",{className:"ml-1",children:e})]})}Me.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after a sub-item is repositioned within its panel."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged out of its panel (promoted to a
 top-level tile), with its new outer block position.`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const at={title:"UI/Notch/NotchGrid",component:Me,parameters:{layout:"fullscreen"}},tt=({label:e,value:t})=>L.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[L.jsx("div",{className:"text-xs opacity-75",children:e}),L.jsx("div",{className:"text-xl font-semibold",children:t})]}),nt=({label:e,children:t})=>L.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),U={Label:tt,Center:nt},O=(...e)=>e.map(t=>t.map(n=>n===1)),R=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),re={args:{primitives:U,items:[{key:"hero",desire:{shape:R(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:R(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:R(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},z={args:{primitives:U,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:R(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},X={args:{primitives:U,items:[{key:"panel",desire:{shape:R(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:R(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:R(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:R(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:R(1,1)},ui:{type:"Label",label:"B"}}]}]}},Y={args:{primitives:U,items:[{key:"first",desire:{position:[0,0],shape:R(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:R(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},H={args:{primitives:U,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:R(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},Z={args:{primitives:U,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:O([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:R(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:O([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:O([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:O([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:R(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:O([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},Q={args:{primitives:U,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemMove:(e,t,n)=>{console.log("[NotchGrid story] sub reposition:",e,t,n)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub promote:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:O([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:O([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:O([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:O([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:R(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:R(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:R(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:R(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
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
}`,...re.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...z.parameters?.docs?.description}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,...X.parameters?.docs?.description}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source},description:{story:`Priority-mapped position: each tile prefers (0,0), but only the first to
 claim it lands there. Others fall back to their secondary positions.`,...Y.parameters?.docs?.description}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations. `cols: 6` keeps each chrome\n `type` on its own row (6 variants across) so the rows read as\n filled / outlined / elevated / ghost top-to-bottom. Elevated tiles\n carry the variant accent on their text so they don't all look alike.",...H.parameters?.docs?.description}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...Z.parameters?.docs?.description}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    primitives,
    cols: 8,
    blockMin: 96,
    draggable: true,
    onItemMove: (key, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] drop:", key, pos);
    },
    onSubItemMove: (parentKey, subIndex, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] sub reposition:", parentKey, subIndex, pos);
    },
    onSubItemPromote: (parentKey, subIndex, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] sub promote:", parentKey, subIndex, pos);
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
}`,...Q.parameters?.docs?.source},description:{story:"Outer-grid drag over the same rich notched footprints as `CustomShapes`:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...Q.parameters?.docs?.description}}};const it=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{z as AutoSize,re as Basic,Z as CustomShapes,Q as Draggable,Y as PriorityFallback,X as SubItems,H as ThemeGallery,it as __namedExportsOrder,at as default};
