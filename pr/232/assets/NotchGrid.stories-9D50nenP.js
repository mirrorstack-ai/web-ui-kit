import{r as M,j as I}from"./iframe-BJIwYDFU.js";import{c as ce}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const fe=(e,t)=>`${e},${t}`;function de(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function Pe(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function je(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:a=0}){const s=e.length,p=(d,v)=>d>=0&&d<s&&v>=0&&v<e[d].length&&!!e[d][v],y=Math.max(0,Math.min(a,t-2))/2,h=new Map,f=(d,v)=>{const w=fe(d[0],d[1]),R=h.get(w);R?R.push(v):h.set(w,[v])};for(let d=0;d<s;d++)for(let v=0;v<e[d].length;v++){if(!e[d][v])continue;const w=[v,d],R=[v+1,d],L=[v+1,d+1],T=[v,d+1];p(d-1,v)||f(w,R),p(d,v+1)||f(R,L),p(d+1,v)||f(L,T),p(d,v-1)||f(T,w)}const $=new Set,D=[],A=(d,v)=>`${d}>${v[0]},${v[1]}`;for(const[d,v]of h){const[w,R]=d.split(",").map(Number);for(const L of v){if($.has(A(d,L)))continue;const T=[];let S=[w,R],l=d,c=L,g=[0,0];for(;c;){const P=A(l,c);if($.has(P))break;$.add(P),T.push(S),g=[c[0]-S[0],c[1]-S[1]],S=c,l=fe(c[0],c[1]);const i=h.get(l)??[];let b=null,K=Number.POSITIVE_INFINITY;for(const G of i){if($.has(A(l,G)))continue;const V=G[0]-S[0],_=G[1]-S[1],J=g[0]*_-g[1]*V;J<K&&(K=J,b=G)}c=b}const N=$e(T).map(([P,i])=>[P*t,i*t]);if(N.length>=3){const P=y>0?Ae(N,y):N;D.push(Ke(P,n,r))}}}return D.join(" ")}function $e(e){const t=e.length,n=[];for(let r=0;r<t;r++){const a=e[(r-1+t)%t],s=e[r],p=e[(r+1)%t],y=s[0]-a[0],h=s[1]-a[1],f=p[0]-s[0],$=p[1]-s[1];y*$-h*f!==0&&n.push(s)}return n}function Ae(e,t){const n=e.length,r=e.map((s,p)=>{const y=e[(p+1)%n],h=Math.sign(y[0]-s[0]),f=Math.sign(y[1]-s[1]);return f===0?{axis:"y",value:s[1]+h*t}:{axis:"x",value:s[0]+-f*t}}),a=[];for(let s=0;s<n;s++){const p=r[(s-1+n)%n],y=r[s],h=p.axis==="x"?p.value:y.value,f=p.axis==="y"?p.value:y.value;a.push([h,f])}return a}function Ke(e,t,n){const r=e.length,a=[];for(let s=0;s<r;s++){const p=e[(s-1+r)%r],y=e[s],h=e[(s+1)%r],f=ve(p,y),$=ve(y,h),D=be(p,y),A=be(y,h),v=D[0]*A[1]-D[1]*A[0]>0,w=Math.min(v?t:n,f/2,$/2),R=[y[0]-D[0]*w,y[1]-D[1]*w],L=[y[0]+A[0]*w,y[1]+A[1]*w];a.push(`${s===0?"M":"L"} ${ge(R)}`),w>0&&a.push(`A ${ue(w)} ${ue(w)} 0 0 ${v?1:0} ${ge(L)}`)}return a.push("Z"),a.join(" ")}function ve(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function be(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function ue(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function ge(e){return`${ue(e[0])},${ue(e[1])}`}const Me=96;function ye({shape:e,tier:t=1,block:n=Me,gap:r=0,radius:a=24,inverseRadius:s=32,fill:p="var(--color-surface-container-low)",stroke:y="var(--color-outline-variant)",strokeWidth:h=1,children:f,pad:$=16,noClip:D=!1,className:A,style:d}){const w=`block-shape-clip-${M.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,R=e.length,L=de(e),T=M.useMemo(()=>Pe(e,t),[e,t]),S=L*n,l=R*n,c=M.useMemo(()=>je(T,{cell:n,gap:r,radius:a,inverseRadius:s}),[T,n,r,a,s]),g=h/2;return I.jsxs("div",{className:ce("relative",A),style:{width:S,height:l,...d},children:[I.jsxs("svg",{width:S,height:l,viewBox:`${-g} ${-g} ${S+h} ${l+h}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!D&&I.jsx("defs",{children:I.jsx("clipPath",{id:w,clipPathUnits:"userSpaceOnUse",children:I.jsx("path",{d:c})})}),I.jsx("path",{d:c,fill:p,stroke:y,strokeWidth:h,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),I.jsx("div",{className:ce("absolute inset-0",!D&&"overflow-hidden"),style:{padding:$,clipPath:D?void 0:`url(#${w})`},children:f})]})}ye.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ee=1e5;function De(e){let t=1,n=1;for(const a of e)t=Math.max(t,a.row+a.rows),n=Math.max(n,a.col+a.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const a of e)for(let s=0;s<a.rows;s++)for(let p=0;p<a.cols;p++)r[a.row+s][a.col+p]=!0;return r}const Ge={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function Se(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function ke(e){return Se(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function qe(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let a=0;a<e.length;a++)for(let s=0;s<n;s++){const p=[];for(let y=0;y<e[a].length;y++)for(let h=0;h<n;h++)p.push(e[a][y]);r.push(p)}return r}function Ne(e,t){const n={...Ge,...t},r=Math.max(1,Math.floor(e.cols)),a=[],s=l=>{for(;a.length<=l;)a.push(new Array(r).fill(!1))},p=(l,c,g)=>{for(let N=0;N<l.length;N++){const P=l[N];for(let i=0;i<P.length;i++){if(!P[i])continue;const b=c+i;if(b<0||b>=r)return!0;const K=g+N;if(s(K),a[K][b])return!0}}return!1},y=(l,c,g)=>{for(let N=0;N<l.length;N++){const P=l[N];for(let i=0;i<P.length;i++)P[i]&&(s(g+N),a[g+N][c+i]=!0)}},h=(l,c,g)=>n.W_pos*Number(l)+n.W_shape*Number(c)+n.W_scale*(g-1),f=l=>{const c=l.desire.position===void 0?[["0",void 0]]:ke(l.desire.position),g=ke(l.desire.shape),N=l.desire.scale?Array.from({length:n.maxScale},(i,b)=>b+1):[1],P=[];for(const[i,b]of c)for(const[K,G]of g)for(const V of N){const _=V===1?G:qe(G,V);P.push({posKey:i,shapeKey:K,pos:b,mask:_,scale:V,cost:h(i,K,V)})}return P.sort((i,b)=>i.cost-b.cost),P},$=(l,c)=>{const g=de(c.mask),N=c.mask.length;if(g>r)return null;const P=(i,b)=>(y(c.mask,i,b),{key:l.key,item:l.item,col:i,row:b,mask:c.mask,cols:g,rows:N,priorityUsed:{position:c.posKey,shape:c.shapeKey},scale:c.scale,cost:c.cost});if(c.pos){const[i,b]=c.pos;return i>=0&&i+g<=r&&b>=0&&!p(c.mask,i,b)?P(i,b):null}for(let i=0;i<Ee;i++)for(let b=0;b+g<=r;b++)if(!p(c.mask,b,i))return P(b,i);return null},D=l=>{for(const c of f(l)){const g=$(l,c);if(g)return g}return null},A=l=>{const c=l.desire.position;return c!==void 0&&!Se(c)},d=[],v=[],w=[];for(const l of e.items)if(A(l)){const c=D(l);c?d.push(c):w.push({...l,desire:{...l.desire,position:void 0}})}else w.push(l);for(const l of w){const c=D(l);c?d.push(c):v.push(l.key)}let R=0,L=0;for(const l of d){const c=f(e.items.find(g=>g.key===l.key));R+=l.cost,L+=c[c.length-1]?.cost??0}const T=L===0?1:1-R/L;let S=0;for(const l of d)S=Math.max(S,l.row+l.rows);return{placements:d,rowsUsed:S,unfit:v,satisfaction:T}}const _e="neutral",Ue={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Be={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},ie={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Oe={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ve={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Fe(e){const t=e.variant??"auto",n=t==="auto"?_e:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function we(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function pe(e){const t=e??{},{type:n,variant:r}=Fe(t),a=t.gradient??0;switch(n){case"filled":{const s=Ue[r];return{fill:s,cssBackground:we(s,a),color:Be[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:ie[r],stroke:Oe[r],strokeWidth:1,elevated:!1};case"elevated":{const s=r==="warn"||r==="error",p=Ve[r];return{fill:p,cssBackground:we(p,a),color:ie[r],stroke:"none",strokeWidth:0,...s?{accentBar:ie[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:ie[r],stroke:"none",strokeWidth:0,elevated:!1}}}const xe=16;function Ce(e,t){try{e.setPointerCapture(t)}catch{}}function Le(e,t){try{e.releasePointerCapture(t)}catch{}}const he=(e,t)=>`${e}::${t}`;function We(e){return e.map(t=>t.map(n=>n?1:0))}function ze(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function Re(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function Xe(e){let t=1;for(const{sub:n}of e){const r=de(Re(n.desire.shape)),a=n.desire.position,s=Array.isArray(a)?a[0]:0;t=Math.max(t,s+r)}return t}function Ye(e,t,n){const r=[];return t.forEach((a,s)=>{n.has(he(e,s))||r.push({sub:a,index:s})}),r}function He(e,t){return Ne({items:e.map(n=>({key:he(t,n.index),desire:n.sub.desire,item:n})),cols:Xe(e)})}function Ze(e){const t=[];for(let n=0;n<e.mask.length;n++){const r=e.mask[n];for(let a=0;a<r.length;a++)r[a]&&t.push([e.col+a,e.row+n])}return t}function Qe(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(Ze),n=new Array(e.length).fill(!1),r=(s,p)=>{for(const[y,h]of t[s])for(const[f,$]of t[p])if(Math.abs(y-f)<=1&&Math.abs(h-$)<=1)return!0;return!1},a=[];for(let s=0;s<e.length;s++){if(n[s])continue;n[s]=!0;const p=[s],y=[];for(;p.length;){const h=p.shift();y.push(e[h]);for(let f=0;f<e.length;f++)!n[f]&&r(h,f)&&(n[f]=!0,p.push(f))}a.push(y)}return a}function Je(e,t){const n=new Map;e.forEach((a,s)=>{const p=t.get(a.key),y=p!=null?`g:${p}`:`s:${s}`,h=n.get(y);h?h.push(a):n.set(y,[a])});const r=[];for(const a of n.values())for(const s of Qe(a))r.push(s);return r}function Te({items:e,cols:t="auto",blockMin:n=Me,gap:r=8,nest:a=!0,primitives:s,onItemError:p,draggable:y=!1,onItemMove:h,onSubItemPromote:f,className:$,style:D}){const A=M.useRef(null),[d,v]=M.useState(null);M.useLayoutEffect(()=>{const u=A.current;if(!u)return;const o=()=>v(u.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const k=new ResizeObserver(o);return k.observe(u),()=>k.disconnect()},[]);const w=M.useMemo(()=>ze(e),[e]),{resolvedCols:R,block:L}=M.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(d==null)return{resolvedCols:null,block:n};const u=Math.max(1,Math.floor(d/n));return{resolvedCols:u,block:d/u}},[t,n,d]),[T,S]=M.useState(new Map),[l,c]=M.useState(null),g=M.useRef(null);g.current=l;const[N,P]=M.useState(new Map),[i,b]=M.useState(null),K=M.useRef(null);K.current=i;const G=M.useCallback((u,o)=>{o.button!=null&&o.button!==0||(Ce(o.currentTarget,o.pointerId),c({key:u.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:u.col,originRow:u.row,originCols:u.cols,dx:0,dy:0}))},[]),V=M.useCallback((u,o,k,x)=>{if(x.button!=null&&x.button!==0)return;Ce(x.currentTarget,x.pointerId);const q=pe(u.item.theme??{});b({parentKey:u.key,subIndex:o.index,pointerId:x.pointerId,startX:x.clientX,startY:x.clientY,dx:0,dy:0,panelCol:u.col,panelRow:u.row,panelCols:u.cols,panelRows:u.rows,subCol:k.col,subRow:k.row,ghostShape:We(k.mask),ghostFill:q.fill,ghostStroke:q.stroke,ghostStrokeWidth:q.strokeWidth,ghostUi:o.sub.ui,ghostColor:q.color})},[]),_=M.useCallback(u=>{const o=g.current;if(!o||u.pointerId!==o.pointerId)return;const k=u.clientX-o.startX,x=u.clientY-o.startY;k===o.dx&&x===o.dy||c({...o,dx:k,dy:x})},[]),J=M.useCallback(u=>{const o=g.current;if(!o||u.pointerId!==o.pointerId)return;Le(u.currentTarget,u.pointerId),c(null);const k=L||n,q=Math.max(0,(R??1)-o.originCols),O=Math.min(q,Math.max(0,o.originCol+Math.round(o.dx/k))),m=Math.max(0,o.originRow+Math.round(o.dy/k)),F=[O,m];S(B=>new Map(B).set(o.key,F)),h?.(o.key,F)},[L,n,R,h]),ee=M.useCallback(u=>{const o=K.current;if(!o||u.pointerId!==o.pointerId)return;const k=u.clientX-o.startX,x=u.clientY-o.startY;k===o.dx&&x===o.dy||b({...o,dx:k,dy:x})},[]),C=M.useCallback(u=>{const o=K.current;if(!o||u.pointerId!==o.pointerId)return;Le(u.currentTarget,u.pointerId),b(null);const k=L||n,x=A.current?.getBoundingClientRect(),q=x?Math.max(0,Math.floor((u.clientX-x.left)/k)):o.panelCol+o.subCol,O=x?Math.max(0,Math.floor((u.clientY-x.top)/k)):o.panelRow+o.subRow,m=[q,O],F=he(o.parentKey,o.subIndex),B=w.find(Y=>Y.key===o.parentKey),W=B?.subItems?.[o.subIndex];W&&P(Y=>new Map(Y).set(F,{parentKey:o.parentKey,item:{key:`promoted::${F}`,desire:{position:m,shape:Re(W.desire.shape)},theme:{...B.theme,...W.theme},groupKey:B.groupKey??o.parentKey,ui:W.ui}})),S(Y=>Y.has(o.parentKey)?Y:new Map(Y).set(o.parentKey,[o.panelCol,o.panelRow])),f?.(o.parentKey,o.subIndex,m)},[L,n,w,f]),{layout:E,panelSubLayouts:z,components:Z}=M.useMemo(()=>{const u={layout:null,panelSubLayouts:new Map,components:[]};if(R==null)return u;const o=new Set(w.map(m=>m.key)),k=new Map,x=new Map,q=w.map(m=>{const F=T.get(m.key);let B=F?{...m.desire,position:F}:m.desire,W=m.groupKey;if(m.subItems&&m.subItems.length>0){const Y=Ye(m.key,m.subItems,N),me=He(Y,m.key);k.set(m.key,me),B={...B,shape:De(me.placements)},W=m.groupKey??m.key}return x.set(m.key,W),{key:m.key,desire:B,groupKey:W,item:m}});for(const{item:m,parentKey:F}of N.values()){if(!o.has(F))continue;const B=T.get(m.key),W=B?{...m.desire,position:B}:m.desire;x.set(m.key,m.groupKey),q.push({key:m.key,desire:W,groupKey:m.groupKey,item:m})}const O=Ne({items:q,cols:R});return{layout:O,panelSubLayouts:k,components:Je(O.placements,x)}},[w,R,a,T,N]),X=E?.unfit.join(",")??"";M.useEffect(()=>{},[X,R,E]);const U=E?.rowsUsed??0;return I.jsxs("div",{ref:A,className:ce("relative w-full",$),style:{minHeight:U>0?U*L:void 0,...D},children:[Z.map(u=>{const o=u.map(m=>m.key).join("|"),k=l?u.find(m=>m.key===l.key):void 0,x=k&&l?[l.dx,l.dy]:void 0,q=i&&u.some(m=>m.key===i.parentKey)?{parentKey:i.parentKey,subIndex:i.subIndex}:null,O=u.some(m=>T.has(m.key));return I.jsx(et,{members:u,block:L,gap:r,primitives:s,onItemError:p,draggable:y,panelSubLayouts:z,dragKey:k?.key??null,dragOffset:x,draggingSub:q,overridden:O,onItemDragStart:G,onSubDragStart:V,onSubDragMove:ee,onSubDragEnd:C,onDragMove:_,onDragEnd:J},o)}),i&&(()=>{const u=s?.[i.ghostUi.type];return I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(i.panelCol+i.subCol)*L+i.dx,top:(i.panelRow+i.subRow)*L+i.dy,color:i.ghostColor},children:I.jsx(ye,{shape:i.ghostShape,block:L,gap:r,fill:i.ghostFill,stroke:i.ghostStroke,strokeWidth:i.ghostStrokeWidth,children:u?I.jsx(u,{...i.ghostUi}):null})})})()]})}const et=M.memo(function({members:t,block:n,gap:r,primitives:a,onItemError:s,draggable:p=!1,panelSubLayouts:y,dragKey:h,dragOffset:f,draggingSub:$,overridden:D=!1,onItemDragStart:A,onSubDragStart:d,onSubDragMove:v,onSubDragEnd:w,onDragMove:R,onDragEnd:L}){let T=1/0,S=1/0,l=0,c=0;for(const C of t)T=Math.min(T,C.col),S=Math.min(S,C.row),l=Math.max(l,C.col+C.cols),c=Math.max(c,C.row+C.rows);const g=Math.max(1,l-T),N=Math.max(1,c-S),P=M.useMemo(()=>{const C=Array.from({length:N},()=>new Array(g).fill(0));for(const E of t)for(let z=0;z<E.mask.length;z++){const Z=E.mask[z];for(let X=0;X<Z.length;X++)Z[X]&&(C[E.row-S+z][E.col-T+X]=1)}return C},[t,g,N,T,S]),i=t[0],b=i.item,K=M.useMemo(()=>pe(b.theme??{}),[b.theme?.type,b.theme?.variant,b.theme?.gradient]);M.useEffect(()=>{if(s)for(const C of t){const E=C.item;E.ui&&!a?.[E.ui.type]&&s(C.key,{kind:"unknown-primitive",type:E.ui.type})}},[t,a,s]);const G=t.length===1&&!y.has(i.key),V=h!=null||$!=null,_={position:"absolute",left:T*n,top:S*n,color:K.color};G&&h===i.key&&f?(_.transform=`translate(${f[0]}px, ${f[1]}px)`,_.zIndex=20):D&&(_.zIndex=10),p&&G&&(_.cursor=h===i.key?"grabbing":"grab",_.touchAction="none");const J=p&&G&&A?{onPointerDown:C=>A(i,C),onPointerMove:R,onPointerUp:L,onPointerCancel:L}:void 0,ee=[];for(const C of t){const E=C.item,z=C.col-T,Z=C.row-S,X=y.get(C.key);if(X)for(const U of X.placements){const u=U.item,o=$?.parentKey===C.key&&$.subIndex===u.index,k=u.sub,x=k.ui?a?.[k.ui.type]:void 0,q=p&&d?{onPointerDown:O=>{O.stopPropagation(),d(C,u,U,O)},onPointerMove:v,onPointerUp:w,onPointerCancel:w}:void 0;ee.push(I.jsx("div",{...q,className:p?"cursor-grab touch-none":void 0,style:{position:"absolute",left:(z+U.col)*n,top:(Z+U.row)*n,width:U.cols*n,height:U.rows*n,padding:xe,opacity:o?0:void 0},children:x?I.jsx(x,{...k.ui}):I.jsx(Ie,{type:k.ui.type})},`${C.key}/${u.index}`))}else{const U=E.ui?a?.[E.ui.type]:void 0,u=p&&!G&&A?{onPointerDown:x=>{x.stopPropagation(),A(C,x)},onPointerMove:R,onPointerUp:L,onPointerCancel:L}:void 0,o=!G&&h===C.key,k=pe(E.theme??{});ee.push(I.jsx("div",{...u,className:p&&!G?"cursor-grab touch-none":void 0,style:{position:"absolute",left:z*n,top:Z*n,width:C.cols*n,height:C.rows*n,padding:xe,transform:o&&f?`translate(${f[0]}px, ${f[1]}px)`:void 0,zIndex:o?30:void 0,background:o?k.cssBackground:void 0,color:o?k.color:void 0,borderRadius:o?24:void 0},children:U&&E.ui?I.jsx(U,{...E.ui}):E.ui?I.jsx(Ie,{type:E.ui.type}):null},C.key))}}return I.jsx("div",{...J,className:ce(p&&G&&"select-none",K.elevated&&"drop-shadow-lg"),style:_,children:I.jsxs(ye,{shape:P,block:n,gap:r,fill:K.fill,stroke:K.stroke,strokeWidth:K.strokeWidth,pad:0,noClip:V,children:[K.accentBar&&I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:K.accentBar}}),ee]})})});function Ie({type:e}){return I.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",I.jsx("code",{className:"ml-1",children:e})]})}Te.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const at={title:"UI/Notch/NotchGrid",component:Te,parameters:{layout:"fullscreen"}},tt=({label:e,value:t})=>I.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[I.jsx("div",{className:"text-xs opacity-75",children:e}),I.jsx("div",{className:"text-xl font-semibold",children:t})]}),nt=({label:e,children:t})=>I.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),Q={Label:tt,Center:nt},H=(...e)=>e.map(t=>t.map(n=>n===1)),j=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),le={args:{primitives:Q,items:[{key:"hero",desire:{shape:j(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:j(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:j(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:j(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},te={args:{primitives:Q,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:j(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},ne={args:{primitives:Q,items:[{key:"panel",desire:{shape:j(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:j(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:j(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:j(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:j(1,1)},ui:{type:"Label",label:"B"}}]}]}},oe={args:{primitives:Q,items:[{key:"first",desire:{position:[0,0],shape:j(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:j(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},re={args:{primitives:Q,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:j(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},se={args:{primitives:Q,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:H([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:j(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:H([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:j(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:j(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:j(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:j(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:H([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:H([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:j(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:H([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},ae={args:{primitives:Q,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:H([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:H([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:H([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:H([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:j(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:j(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:j(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:j(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};le.parameters={...le.parameters,docs:{...le.parameters?.docs,source:{originalSource:`{
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
}`,...le.parameters?.docs?.source}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
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
}`,...te.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...te.parameters?.docs?.description}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
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
}`,...ne.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,...ne.parameters?.docs?.description}}};oe.parameters={...oe.parameters,docs:{...oe.parameters?.docs,source:{originalSource:`{
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
}`,...oe.parameters?.docs?.source},description:{story:`Priority-mapped position: each tile prefers (0,0), but only the first to
 claim it lands there. Others fall back to their secondary positions.`,...oe.parameters?.docs?.description}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
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
}`,...re.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations. `cols: 6` keeps each chrome\n `type` on its own row (6 variants across) so the rows read as\n filled / outlined / elevated / ghost top-to-bottom. Elevated tiles\n carry the variant accent on their text so they don't all look alike.",...re.parameters?.docs?.description}}};se.parameters={...se.parameters,docs:{...se.parameters?.docs,source:{originalSource:`{
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
}`,...se.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...se.parameters?.docs?.description}}};ae.parameters={...ae.parameters,docs:{...ae.parameters?.docs,source:{originalSource:`{
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
}`,...ae.parameters?.docs?.source},description:{story:"Outer-grid drag over the same rich notched footprints as `CustomShapes`:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...ae.parameters?.docs?.description}}};const it=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{te as AutoSize,le as Basic,se as CustomShapes,ae as Draggable,oe as PriorityFallback,ne as SubItems,re as ThemeGallery,it as __namedExportsOrder,at as default};
