import{r as x,j as C}from"./iframe-CmKlM9w8.js";import{c as te}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const ie=(e,t)=>`${e},${t}`;function re(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function Pe(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function je(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:i=0}){const a=e.length,u=(p,m)=>p>=0&&p<a&&m>=0&&m<e[p].length&&!!e[p][m],d=Math.max(0,Math.min(i,t-2))/2,f=new Map,N=(p,m)=>{const k=ie(p[0],p[1]),P=f.get(k);P?P.push(m):f.set(k,[m])};for(let p=0;p<a;p++)for(let m=0;m<e[p].length;m++){if(!e[p][m])continue;const k=[m,p],P=[m+1,p],T=[m+1,p+1],S=[m,p+1];u(p-1,m)||N(k,P),u(p,m+1)||N(P,T),u(p+1,m)||N(T,S),u(p,m-1)||N(S,k)}const j=new Set,D=[],A=(p,m)=>`${p}>${m[0]},${m[1]}`;for(const[p,m]of f){const[k,P]=p.split(",").map(Number);for(const T of m){if(j.has(A(p,T)))continue;const S=[];let I=[k,P],l=p,o=T,v=[0,0];for(;o;){const g=A(l,o);if(j.has(g))break;j.add(g),S.push(I),v=[o[0]-I[0],o[1]-I[1]],I=o,l=ie(o[0],o[1]);const h=f.get(l)??[];let b=null,$=Number.POSITIVE_INFINITY;for(const w of h){if(j.has(A(l,w)))continue;const E=w[0]-I[0],G=w[1]-I[1],U=v[0]*G-v[1]*E;U<$&&($=U,b=w)}o=b}const M=$e(S).map(([g,h])=>[g*t,h*t]);if(M.length>=3){const g=d>0?De(M,d):M;D.push(Ae(g,n,r))}}}return D.join(" ")}function $e(e){const t=e.length,n=[];for(let r=0;r<t;r++){const i=e[(r-1+t)%t],a=e[r],u=e[(r+1)%t],d=a[0]-i[0],f=a[1]-i[1],N=u[0]-a[0],j=u[1]-a[1];d*j-f*N!==0&&n.push(a)}return n}function De(e,t){const n=e.length,r=e.map((a,u)=>{const d=e[(u+1)%n],f=Math.sign(d[0]-a[0]),N=Math.sign(d[1]-a[1]);return N===0?{axis:"y",value:a[1]+f*t}:{axis:"x",value:a[0]+-N*t}}),i=[];for(let a=0;a<n;a++){const u=r[(a-1+n)%n],d=r[a],f=u.axis==="x"?u.value:d.value,N=u.axis==="y"?u.value:d.value;i.push([f,N])}return i}function Ae(e,t,n){const r=e.length,i=[];for(let a=0;a<r;a++){const u=e[(a-1+r)%r],d=e[a],f=e[(a+1)%r],N=le(u,d),j=le(d,f),D=ce(u,d),A=ce(d,f),m=D[0]*A[1]-D[1]*A[0]>0,k=Math.min(m?t:n,N/2,j/2),P=[d[0]-D[0]*k,d[1]-D[1]*k],T=[d[0]+A[0]*k,d[1]+A[1]*k];i.push(`${a===0?"M":"L"} ${ue(P)}`),k>0&&i.push(`A ${ne(k)} ${ne(k)} 0 0 ${m?1:0} ${ue(T)}`)}return i.push("Z"),i.join(" ")}function le(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function ce(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function ne(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function ue(e){return`${ne(e[0])},${ne(e[1])}`}const ve=96;function oe({shape:e,tier:t=1,block:n=ve,gap:r=0,radius:i=24,inverseRadius:a=32,fill:u="var(--color-surface-container-low)",stroke:d="var(--color-outline-variant)",strokeWidth:f=1,children:N,pad:j=16,noClip:D=!1,className:A,style:p}){const k=`block-shape-clip-${x.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,P=e.length,T=re(e),S=x.useMemo(()=>Pe(e,t),[e,t]),I=T*n,l=P*n,o=x.useMemo(()=>je(S,{cell:n,gap:r,radius:i,inverseRadius:a}),[S,n,r,i,a]),v=f/2;return C.jsxs("div",{className:te("relative",A),style:{width:I,height:l,...p},children:[C.jsxs("svg",{width:I,height:l,viewBox:`${-v} ${-v} ${I+f} ${l+f}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!D&&C.jsx("defs",{children:C.jsx("clipPath",{id:k,clipPathUnits:"userSpaceOnUse",children:C.jsx("path",{d:o})})}),C.jsx("path",{d:o,fill:u,stroke:d,strokeWidth:f,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),C.jsx("div",{className:te("absolute inset-0",!D&&"overflow-hidden"),style:{padding:j,clipPath:D?void 0:`url(#${k})`},children:N})]})}oe.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ee=1e5;function Ke(e){let t=1,n=1;for(const i of e)t=Math.max(t,i.row+i.rows),n=Math.max(n,i.col+i.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const i of e)for(let a=0;a<i.rows;a++)for(let u=0;u<i.cols;u++)r[i.row+a][i.col+u]=!0;return r}const Ge={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function be(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function pe(e){return be(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function qe(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let i=0;i<e.length;i++)for(let a=0;a<n;a++){const u=[];for(let d=0;d<e[i].length;d++)for(let f=0;f<n;f++)u.push(e[i][d]);r.push(u)}return r}function ge(e,t){const n={...Ge,...t},r=Math.max(1,Math.floor(e.cols)),i=[],a=l=>{for(;i.length<=l;)i.push(new Array(r).fill(!1))},u=(l,o,v)=>{for(let M=0;M<l.length;M++){const g=l[M];for(let h=0;h<g.length;h++){if(!g[h])continue;const b=o+h;if(b<0||b>=r)return!0;const $=v+M;if(a($),i[$][b])return!0}}return!1},d=(l,o,v)=>{for(let M=0;M<l.length;M++){const g=l[M];for(let h=0;h<g.length;h++)g[h]&&(a(v+M),i[v+M][o+h]=!0)}},f=(l,o,v)=>n.W_pos*Number(l)+n.W_shape*Number(o)+n.W_scale*(v-1),N=l=>{const o=l.desire.position===void 0?[["0",void 0]]:pe(l.desire.position),v=pe(l.desire.shape),M=l.desire.scale?Array.from({length:n.maxScale},(h,b)=>b+1):[1],g=[];for(const[h,b]of o)for(const[$,w]of v)for(const E of M){const G=E===1?w:qe(w,E);g.push({posKey:h,shapeKey:$,pos:b,mask:G,scale:E,cost:f(h,$,E)})}return g.sort((h,b)=>h.cost-b.cost),g},j=(l,o)=>{const v=re(o.mask),M=o.mask.length;if(v>r)return null;const g=(h,b)=>(d(o.mask,h,b),{key:l.key,item:l.item,col:h,row:b,mask:o.mask,cols:v,rows:M,priorityUsed:{position:o.posKey,shape:o.shapeKey},scale:o.scale,cost:o.cost});if(o.pos){const[h,b]=o.pos;return h>=0&&h+v<=r&&b>=0&&!u(o.mask,h,b)?g(h,b):null}for(let h=0;h<Ee;h++)for(let b=0;b+v<=r;b++)if(!u(o.mask,b,h))return g(b,h);return null},D=l=>{for(const o of N(l)){const v=j(l,o);if(v)return v}return null},A=l=>{const o=l.desire.position;return o!==void 0&&!be(o)},p=[],m=[],k=[];for(const l of e.items)if(A(l)){const o=D(l);o?p.push(o):k.push({...l,desire:{...l.desire,position:void 0}})}else k.push(l);for(const l of k){const o=D(l);o?p.push(o):m.push(l.key)}let P=0,T=0;for(const l of p){const o=N(e.items.find(v=>v.key===l.key));P+=l.cost,T+=o[o.length-1]?.cost??0}const S=T===0?1:1-P/T;let I=0;for(const l of p)I=Math.max(I,l.row+l.rows);return{placements:p,rowsUsed:I,unfit:m,satisfaction:S}}const _e="neutral",Oe={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Be={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},J={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ue={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ve={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Fe(e){const t=e.variant??"auto",n=t==="auto"?_e:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function de(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function ke(e){const t=e??{},{type:n,variant:r}=Fe(t),i=t.gradient??0;switch(n){case"filled":{const a=Oe[r];return{fill:a,cssBackground:de(a,i),color:Be[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:J[r],stroke:Ue[r],strokeWidth:1,elevated:!1};case"elevated":{const a=r==="warn"||r==="error",u=Ve[r];return{fill:u,cssBackground:de(u,i),color:J[r],stroke:"none",strokeWidth:0,...a?{accentBar:J[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:J[r],stroke:"none",strokeWidth:0,elevated:!1}}}const ye=16;function me(e,t){try{e.setPointerCapture(t)}catch{}}function he(e,t){try{e.releasePointerCapture(t)}catch{}}const se=(e,t)=>`${e}::${t}`;function we(e){return e.map(t=>t.map(n=>n?1:0))}function We(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function xe(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function ze(e){let t=1;for(const{sub:n}of e){const r=re(xe(n.desire.shape)),i=n.desire.position,a=Array.isArray(i)?i[0]:0;t=Math.max(t,a+r)}return t}function Xe(e,t,n,r){const i=[];return t.forEach((a,u)=>{const d=se(e,u);if(r.has(d))return;const f=n.get(d);i.push({sub:f?{...a,desire:{...a.desire,position:f}}:a,index:u})}),i}function Ye(e,t){return ge({items:e.map(n=>({key:se(t,n.index),desire:n.sub.desire,item:n})),cols:ze(e)})}function He(e,t){const n=Math.max(0,e.panelCol+e.subCol+Math.round(e.dx/t)),r=Math.max(0,e.panelRow+e.subRow+Math.round(e.dy/t));return n>=e.panelCol&&n<e.panelCol+e.panelCols&&r>=e.panelRow&&r<e.panelRow+e.panelRows?{kind:"reposition",pos:[n-e.panelCol,r-e.panelRow]}:{kind:"promote",pos:[n,r]}}function Ie({items:e,cols:t="auto",blockMin:n=ve,gap:r=8,nest:i=!0,primitives:a,onItemError:u,draggable:d=!1,onItemMove:f,onSubItemMove:N,onSubItemPromote:j,className:D,style:A}){const p=x.useRef(null),[m,k]=x.useState(null);x.useLayoutEffect(()=>{const c=p.current;if(!c)return;const s=()=>k(c.getBoundingClientRect().width);if(s(),typeof ResizeObserver>"u")return;const L=new ResizeObserver(s);return L.observe(c),()=>L.disconnect()},[]);const P=x.useMemo(()=>We(e),[e]),{resolvedCols:T,block:S}=x.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(m==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(m/n));return{resolvedCols:c,block:m/c}},[t,n,m]),[I,l]=x.useState(new Map),[o,v]=x.useState(null),M=x.useRef(null);M.current=o;const[g,h]=x.useState(new Map),[b,$]=x.useState(new Map),[w,E]=x.useState(null),G=x.useRef(null);G.current=w;const U=x.useCallback((c,s)=>{s.button!=null&&s.button!==0||(me(s.currentTarget,s.pointerId),v({key:c.key,pointerId:s.pointerId,startX:s.clientX,startY:s.clientY,originCol:c.col,originRow:c.row,originCols:c.cols,dx:0,dy:0}))},[]),Z=x.useCallback((c,s,L,y)=>{if(y.button!=null&&y.button!==0)return;me(y.currentTarget,y.pointerId);const K=ke(c.item.theme??{});E({parentKey:c.key,subIndex:s.index,pointerId:y.pointerId,startX:y.clientX,startY:y.clientY,dx:0,dy:0,panelCol:c.col,panelRow:c.row,panelCols:c.cols,panelRows:c.rows,subCol:L.col,subRow:L.row,ghostShape:we(L.mask),ghostFill:K.fill,ghostStroke:K.stroke,ghostStrokeWidth:K.strokeWidth})},[]),Le=x.useCallback(c=>{const s=M.current;if(!s||c.pointerId!==s.pointerId)return;const L=c.clientX-s.startX,y=c.clientY-s.startY;L===s.dx&&y===s.dy||v({...s,dx:L,dy:y})},[]),Ce=x.useCallback(c=>{const s=M.current;if(!s||c.pointerId!==s.pointerId)return;he(c.currentTarget,c.pointerId),v(null);const L=S||n,K=Math.max(0,(T??1)-s.originCols),q=Math.min(K,Math.max(0,s.originCol+Math.round(s.dx/L))),_=Math.max(0,s.originRow+Math.round(s.dy/L)),V=[q,_];l(Re=>new Map(Re).set(s.key,V)),f?.(s.key,V)},[S,n,T,f]),Se=x.useCallback(c=>{const s=G.current;if(!s||c.pointerId!==s.pointerId)return;const L=c.clientX-s.startX,y=c.clientY-s.startY;L===s.dx&&y===s.dy||E({...s,dx:L,dy:y})},[]),Me=x.useCallback(c=>{const s=G.current;if(!s||c.pointerId!==s.pointerId)return;he(c.currentTarget,c.pointerId),E(null);const L=He(s,S||n),y=se(s.parentKey,s.subIndex);if(L.kind==="reposition"){h(_=>new Map(_).set(y,L.pos)),N?.(s.parentKey,s.subIndex,L.pos);return}const K=P.find(_=>_.key===s.parentKey),q=K?.subItems?.[s.subIndex];q&&$(_=>new Map(_).set(y,{parentKey:s.parentKey,item:{key:`promoted::${y}`,desire:{position:L.pos,shape:xe(q.desire.shape)},theme:{...K.theme,...q.theme},ui:q.ui}})),j?.(s.parentKey,s.subIndex,L.pos)},[S,n,P,N,j]),{layout:Q,panelSubLayouts:Ne}=x.useMemo(()=>{if(T==null)return{layout:null,panelSubLayouts:new Map};const c=new Set(P.map(y=>y.key)),s=new Map,L=P.map(y=>{const K=I.get(y.key);let q=K?{...y.desire,position:K}:y.desire;if(y.subItems&&y.subItems.length>0){const _=Xe(y.key,y.subItems,g,b),V=Ye(_,y.key);s.set(y.key,V),q={...q,shape:Ke(V.placements)}}return{key:y.key,desire:q,groupKey:y.groupKey,item:y}});for(const{item:y,parentKey:K}of b.values())c.has(K)&&L.push({key:y.key,desire:y.desire,groupKey:y.groupKey,item:y});return{layout:ge({items:L,cols:T}),panelSubLayouts:s}},[P,T,i,I,g,b]),Te=Q?.unfit.join(",")??"";x.useEffect(()=>{},[Te,T,Q]);const ae=Q?.rowsUsed??0;return C.jsxs("div",{ref:p,className:te("relative w-full",D),style:{minHeight:ae>0?ae*S:void 0,...A},children:[Q?.placements.map(c=>{const L=o?.key===c.key&&o?[o.dx,o.dy]:void 0;return C.jsx(Ze,{placement:c,item:c.item,block:S,gap:r,primitives:a,onItemError:u,draggable:d,dragOffset:L,hasOverride:I.has(c.key),subLayout:Ne.get(c.key)??null,draggingSubIndex:w&&w.parentKey===c.key?w.subIndex:null,onItemDragStart:U,onSubDragStart:Z,onSubDragMove:Se,onSubDragEnd:Me,onDragMove:Le,onDragEnd:Ce},c.key)}),w&&C.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(w.panelCol+w.subCol)*S+w.dx,top:(w.panelRow+w.subRow)*S+w.dy},children:C.jsx(oe,{shape:w.ghostShape,block:S,gap:r,fill:w.ghostFill,stroke:w.ghostStroke,strokeWidth:w.ghostStrokeWidth})})]})}const Ze=x.memo(function({placement:t,item:n,block:r,gap:i,primitives:a,onItemError:u,draggable:d=!1,dragOffset:f,hasOverride:N=!1,subLayout:j,draggingSubIndex:D,onItemDragStart:A,onSubDragStart:p,onSubDragMove:m,onSubDragEnd:k,onDragMove:P,onDragEnd:T}){const S=n.theme??{},I=x.useMemo(()=>ke(S),[S.type,S.variant,S.gradient]),l=x.useMemo(()=>we(t.mask),[t.mask]),o=n.ui?a?.[n.ui.type]:void 0,v=n.ui!=null&&!o;x.useEffect(()=>{v&&u&&n.ui&&u(t.key,{kind:"unknown-primitive",type:n.ui.type})},[v,u,t.key,n.ui]);const M=f!==void 0,g={position:"absolute",left:t.col*r,top:t.row*r,color:I.color};M?(g.transform=`translate(${f[0]}px, ${f[1]}px)`,g.zIndex=20):N&&(g.zIndex=10),d&&(g.cursor=M?"grabbing":"grab",g.touchAction="none");const h=d&&A?{onPointerDown:$=>A(t,$),onPointerMove:P,onPointerUp:T,onPointerCancel:T}:void 0;let b=null;return j?b=C.jsx("div",{className:"relative h-full w-full",children:j.placements.map($=>{const w=$.item;if(D===w.index)return null;const E=w.sub,G=E.ui?a?.[E.ui.type]:void 0,U=d&&p?{onPointerDown:Z=>{Z.stopPropagation(),p(t,w,$,Z)},onPointerMove:m,onPointerUp:k,onPointerCancel:k}:void 0;return C.jsx("div",{...U,className:d?"cursor-grab touch-none":void 0,style:{position:"absolute",left:$.col*r,top:$.row*r,width:$.cols*r,height:$.rows*r,padding:ye},children:G?C.jsx(G,{...E.ui}):C.jsx(fe,{type:E.ui.type})},$.key)})}):o&&n.ui?b=C.jsx(o,{...n.ui}):v&&n.ui&&(b=C.jsx(fe,{type:n.ui.type})),C.jsx("div",{...h,className:te(d&&"select-none",I.elevated&&"drop-shadow-lg"),style:g,children:C.jsxs(oe,{shape:l,block:r,gap:i,fill:I.fill,stroke:I.stroke,strokeWidth:I.strokeWidth,pad:j?0:ye,children:[I.accentBar&&C.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:I.accentBar}}),b]})})});function fe({type:e}){return C.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",C.jsx("code",{className:"ml-1",children:e})]})}Ie.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after a sub-item is repositioned within its panel."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged out of its panel (promoted to a
 top-level tile), with its new outer block position.`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const rt={title:"UI/Notch/NotchGrid",component:Ie,parameters:{layout:"fullscreen"}},Qe=({label:e,value:t})=>C.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[C.jsx("div",{className:"text-xs opacity-75",children:e}),C.jsx("div",{className:"text-xl font-semibold",children:t})]}),Je=({label:e,children:t})=>C.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),B={Label:Qe,Center:Je},O=(...e)=>e.map(t=>t.map(n=>n===1)),R=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),ee={args:{primitives:B,items:[{key:"hero",desire:{shape:R(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:R(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:R(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},F={args:{primitives:B,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:R(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},W={args:{primitives:B,items:[{key:"panel",desire:{shape:R(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:R(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:R(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:R(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:R(1,1)},ui:{type:"Label",label:"B"}}]}]}},z={args:{primitives:B,items:[{key:"first",desire:{position:[0,0],shape:R(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:R(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},X={args:{primitives:B,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:R(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},Y={args:{primitives:B,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:O([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:R(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:O([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:R(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:O([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:O([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:R(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:O([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},H={args:{primitives:B,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemMove:(e,t,n)=>{console.log("[NotchGrid story] sub reposition:",e,t,n)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub promote:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:O([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:O([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:O([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:O([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:R(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:R(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:R(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:R(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};ee.parameters={...ee.parameters,docs:{...ee.parameters?.docs,source:{originalSource:`{
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
}`,...ee.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source},description:{story:`Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 container regardless of width. Resize the Storybook canvas to see the
 column count jump (96px granularity) and the block size stretch between
 jumps.`,...F.parameters?.docs?.description}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,...W.parameters?.docs?.description}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source},description:{story:`Priority-mapped position: each tile prefers (0,0), but only the first to
 claim it lands there. Others fall back to their secondary positions.`,...z.parameters?.docs?.description}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source},description:{story:"Gallery of `type × variant` combinations. `cols: 6` keeps each chrome\n `type` on its own row (6 variants across) so the rows read as\n filled / outlined / elevated / ghost top-to-bottom. Elevated tiles\n carry the variant accent on their text so they don't all look alike.",...X.parameters?.docs?.description}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source},description:{story:`Custom notched shapes — exercises the outline tracer (PR #188) under
 non-rectangular footprints. Demonstrates the four canonical patterns the
 closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 notched top-right corner. Small accessory tiles drop into the notches.`,...Y.parameters?.docs?.description}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source},description:{story:"Outer-grid drag over the same rich notched footprints as `CustomShapes`:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...H.parameters?.docs?.description}}};const ot=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{F as AutoSize,ee as Basic,Y as CustomShapes,H as Draggable,z as PriorityFallback,W as SubItems,X as ThemeGallery,ot as __namedExportsOrder,rt as default};
