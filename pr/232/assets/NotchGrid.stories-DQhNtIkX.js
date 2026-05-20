import{r as I,j as M}from"./iframe-BLRqLn1F.js";import{c as ce}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const me=(e,t)=>`${e},${t}`;function pe(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function Pe(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function je(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:a=0}){const s=e.length,u=(d,v)=>d>=0&&d<s&&v>=0&&v<e[d].length&&!!e[d][v],y=Math.max(0,Math.min(a,t-2))/2,h=new Map,f=(d,v)=>{const k=me(d[0],d[1]),R=h.get(k);R?R.push(v):h.set(k,[v])};for(let d=0;d<s;d++)for(let v=0;v<e[d].length;v++){if(!e[d][v])continue;const k=[v,d],R=[v+1,d],w=[v+1,d+1],j=[v,d+1];u(d-1,v)||f(k,R),u(d,v+1)||f(R,w),u(d+1,v)||f(w,j),u(d,v-1)||f(j,k)}const $=new Set,D=[],K=(d,v)=>`${d}>${v[0]},${v[1]}`;for(const[d,v]of h){const[k,R]=d.split(",").map(Number);for(const w of v){if($.has(K(d,w)))continue;const j=[];let S=[k,R],i=d,c=w,g=[0,0];for(;c;){const T=K(i,c);if($.has(T))break;$.add(T),j.push(S),g=[c[0]-S[0],c[1]-S[1]],S=c,i=me(c[0],c[1]);const l=h.get(i)??[];let b=null,A=Number.POSITIVE_INFINITY;for(const q of l){if($.has(K(i,q)))continue;const O=q[0]-S[0],_=q[1]-S[1],J=g[0]*_-g[1]*O;J<A&&(A=J,b=q)}c=b}const N=$e(j).map(([T,l])=>[T*t,l*t]);if(N.length>=3){const T=y>0?Ke(N,y):N;D.push(Ae(T,n,r))}}}return D.join(" ")}function $e(e){const t=e.length,n=[];for(let r=0;r<t;r++){const a=e[(r-1+t)%t],s=e[r],u=e[(r+1)%t],y=s[0]-a[0],h=s[1]-a[1],f=u[0]-s[0],$=u[1]-s[1];y*$-h*f!==0&&n.push(s)}return n}function Ke(e,t){const n=e.length,r=e.map((s,u)=>{const y=e[(u+1)%n],h=Math.sign(y[0]-s[0]),f=Math.sign(y[1]-s[1]);return f===0?{axis:"y",value:s[1]+h*t}:{axis:"x",value:s[0]+-f*t}}),a=[];for(let s=0;s<n;s++){const u=r[(s-1+n)%n],y=r[s],h=u.axis==="x"?u.value:y.value,f=u.axis==="y"?u.value:y.value;a.push([h,f])}return a}function Ae(e,t,n){const r=e.length,a=[];for(let s=0;s<r;s++){const u=e[(s-1+r)%r],y=e[s],h=e[(s+1)%r],f=fe(u,y),$=fe(y,h),D=ve(u,y),K=ve(y,h),v=D[0]*K[1]-D[1]*K[0]>0,k=Math.min(v?t:n,f/2,$/2),R=[y[0]-D[0]*k,y[1]-D[1]*k],w=[y[0]+K[0]*k,y[1]+K[1]*k];a.push(`${s===0?"M":"L"} ${be(R)}`),k>0&&a.push(`A ${ue(k)} ${ue(k)} 0 0 ${v?1:0} ${be(w)}`)}return a.push("Z"),a.join(" ")}function fe(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function ve(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function ue(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function be(e){return`${ue(e[0])},${ue(e[1])}`}const Ie=96;function de({shape:e,tier:t=1,block:n=Ie,gap:r=0,radius:a=24,inverseRadius:s=32,fill:u="var(--color-surface-container-low)",stroke:y="var(--color-outline-variant)",strokeWidth:h=1,children:f,pad:$=16,noClip:D=!1,className:K,style:d}){const k=`block-shape-clip-${I.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,R=e.length,w=pe(e),j=I.useMemo(()=>Pe(e,t),[e,t]),S=w*n,i=R*n,c=I.useMemo(()=>je(j,{cell:n,gap:r,radius:a,inverseRadius:s}),[j,n,r,a,s]),g=h/2;return M.jsxs("div",{className:ce("relative",K),style:{width:S,height:i,...d},children:[M.jsxs("svg",{width:S,height:i,viewBox:`${-g} ${-g} ${S+h} ${i+h}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!D&&M.jsx("defs",{children:M.jsx("clipPath",{id:k,clipPathUnits:"userSpaceOnUse",children:M.jsx("path",{d:c})})}),M.jsx("path",{d:c,fill:u,stroke:y,strokeWidth:h,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),M.jsx("div",{className:ce("absolute inset-0",!D&&"overflow-hidden"),style:{padding:$,clipPath:D?void 0:`url(#${k})`},children:f})]})}de.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ee=1e5;function De(e){let t=1,n=1;for(const a of e)t=Math.max(t,a.row+a.rows),n=Math.max(n,a.col+a.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const a of e)for(let s=0;s<a.rows;s++)for(let u=0;u<a.cols;u++)r[a.row+s][a.col+u]=!0;return r}const qe={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function Me(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function ge(e){return Me(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function Ge(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let a=0;a<e.length;a++)for(let s=0;s<n;s++){const u=[];for(let y=0;y<e[a].length;y++)for(let h=0;h<n;h++)u.push(e[a][y]);r.push(u)}return r}function Se(e,t){const n={...qe,...t},r=Math.max(1,Math.floor(e.cols)),a=[],s=i=>{for(;a.length<=i;)a.push(new Array(r).fill(!1))},u=(i,c,g)=>{for(let N=0;N<i.length;N++){const T=i[N];for(let l=0;l<T.length;l++){if(!T[l])continue;const b=c+l;if(b<0||b>=r)return!0;const A=g+N;if(s(A),a[A][b])return!0}}return!1},y=(i,c,g)=>{for(let N=0;N<i.length;N++){const T=i[N];for(let l=0;l<T.length;l++)T[l]&&(s(g+N),a[g+N][c+l]=!0)}},h=(i,c,g)=>n.W_pos*Number(i)+n.W_shape*Number(c)+n.W_scale*(g-1),f=i=>{const c=i.desire.position===void 0?[["0",void 0]]:ge(i.desire.position),g=ge(i.desire.shape),N=i.desire.scale?Array.from({length:n.maxScale},(l,b)=>b+1):[1],T=[];for(const[l,b]of c)for(const[A,q]of g)for(const O of N){const _=O===1?q:Ge(q,O);T.push({posKey:l,shapeKey:A,pos:b,mask:_,scale:O,cost:h(l,A,O)})}return T.sort((l,b)=>l.cost-b.cost),T},$=(i,c)=>{const g=pe(c.mask),N=c.mask.length;if(g>r)return null;const T=(l,b)=>(y(c.mask,l,b),{key:i.key,item:i.item,col:l,row:b,mask:c.mask,cols:g,rows:N,priorityUsed:{position:c.posKey,shape:c.shapeKey},scale:c.scale,cost:c.cost});if(c.pos){const[l,b]=c.pos;return l>=0&&l+g<=r&&b>=0&&!u(c.mask,l,b)?T(l,b):null}for(let l=0;l<Ee;l++)for(let b=0;b+g<=r;b++)if(!u(c.mask,b,l))return T(b,l);return null},D=i=>{for(const c of f(i)){const g=$(i,c);if(g)return g}return null},K=i=>{const c=i.desire.position;return c!==void 0&&!Me(c)},d=[],v=[],k=[];for(const i of e.items)if(K(i)){const c=D(i);c?d.push(c):k.push({...i,desire:{...i.desire,position:void 0}})}else k.push(i);for(const i of k){const c=D(i);c?d.push(c):v.push(i.key)}let R=0,w=0;for(const i of d){const c=f(e.items.find(g=>g.key===i.key));R+=i.cost,w+=c[c.length-1]?.cost??0}const j=w===0?1:1-R/w;let S=0;for(const i of d)S=Math.max(S,i.row+i.rows);return{placements:d,rowsUsed:S,unfit:v,satisfaction:j}}const _e="neutral",Be={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Oe={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},ie={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ue={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ve={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Fe(e){const t=e.variant??"auto",n=t==="auto"?_e:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function ke(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function Ne(e){const t=e??{},{type:n,variant:r}=Fe(t),a=t.gradient??0;switch(n){case"filled":{const s=Be[r];return{fill:s,cssBackground:ke(s,a),color:Oe[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:ie[r],stroke:Ue[r],strokeWidth:1,elevated:!1};case"elevated":{const s=r==="warn"||r==="error",u=Ve[r];return{fill:u,cssBackground:ke(u,a),color:ie[r],stroke:"none",strokeWidth:0,...s?{accentBar:ie[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:ie[r],stroke:"none",strokeWidth:0,elevated:!1}}}const we=16;function xe(e,t){try{e.setPointerCapture(t)}catch{}}function Ce(e,t){try{e.releasePointerCapture(t)}catch{}}const ye=(e,t)=>`${e}::${t}`;function We(e){return e.map(t=>t.map(n=>n?1:0))}function ze(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function Re(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function Xe(e){let t=1;for(const{sub:n}of e){const r=pe(Re(n.desire.shape)),a=n.desire.position,s=Array.isArray(a)?a[0]:0;t=Math.max(t,s+r)}return t}function Ye(e,t,n){const r=[];return t.forEach((a,s)=>{n.has(ye(e,s))||r.push({sub:a,index:s})}),r}function He(e,t){return Se({items:e.map(n=>({key:ye(t,n.index),desire:n.sub.desire,item:n})),cols:Xe(e)})}function Ze(e){const t=[];for(let n=0;n<e.mask.length;n++){const r=e.mask[n];for(let a=0;a<r.length;a++)r[a]&&t.push([e.col+a,e.row+n])}return t}function Qe(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(Ze),n=new Array(e.length).fill(!1),r=(s,u)=>{for(const[y,h]of t[s])for(const[f,$]of t[u])if(Math.abs(y-f)<=1&&Math.abs(h-$)<=1)return!0;return!1},a=[];for(let s=0;s<e.length;s++){if(n[s])continue;n[s]=!0;const u=[s],y=[];for(;u.length;){const h=u.shift();y.push(e[h]);for(let f=0;f<e.length;f++)!n[f]&&r(h,f)&&(n[f]=!0,u.push(f))}a.push(y)}return a}function Je(e,t){const n=new Map;e.forEach((a,s)=>{const u=t.get(a.key),y=u!=null?`g:${u}`:`s:${s}`,h=n.get(y);h?h.push(a):n.set(y,[a])});const r=[];for(const a of n.values())for(const s of Qe(a))r.push(s);return r}function Te({items:e,cols:t="auto",blockMin:n=Ie,gap:r=8,nest:a=!0,primitives:s,onItemError:u,draggable:y=!1,onItemMove:h,onSubItemPromote:f,className:$,style:D}){const K=I.useRef(null),[d,v]=I.useState(null);I.useLayoutEffect(()=>{const p=K.current;if(!p)return;const o=()=>v(p.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const C=new ResizeObserver(o);return C.observe(p),()=>C.disconnect()},[]);const k=I.useMemo(()=>ze(e),[e]),{resolvedCols:R,block:w}=I.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(d==null)return{resolvedCols:null,block:n};const p=Math.max(1,Math.floor(d/n));return{resolvedCols:p,block:d/p}},[t,n,d]),[j,S]=I.useState(new Map),[i,c]=I.useState(null),g=I.useRef(null);g.current=i;const[N,T]=I.useState(new Map),[l,b]=I.useState(null),A=I.useRef(null);A.current=l;const q=I.useCallback((p,o)=>{o.button!=null&&o.button!==0||(xe(o.currentTarget,o.pointerId),c({key:p.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:p.col,originRow:p.row,originCols:p.cols,dx:0,dy:0}))},[]),O=I.useCallback((p,o,C,L)=>{if(L.button!=null&&L.button!==0)return;xe(L.currentTarget,L.pointerId);const G=Ne(p.item.theme??{});b({parentKey:p.key,subIndex:o.index,pointerId:L.pointerId,startX:L.clientX,startY:L.clientY,dx:0,dy:0,panelCol:p.col,panelRow:p.row,panelCols:p.cols,panelRows:p.rows,subCol:C.col,subRow:C.row,ghostShape:We(C.mask),ghostFill:G.fill,ghostStroke:G.stroke,ghostStrokeWidth:G.strokeWidth})},[]),_=I.useCallback(p=>{const o=g.current;if(!o||p.pointerId!==o.pointerId)return;const C=p.clientX-o.startX,L=p.clientY-o.startY;C===o.dx&&L===o.dy||c({...o,dx:C,dy:L})},[]),J=I.useCallback(p=>{const o=g.current;if(!o||p.pointerId!==o.pointerId)return;Ce(p.currentTarget,p.pointerId),c(null);const C=w||n,G=Math.max(0,(R??1)-o.originCols),Y=Math.min(G,Math.max(0,o.originCol+Math.round(o.dx/C))),m=Math.max(0,o.originRow+Math.round(o.dy/C)),U=[Y,m];S(W=>new Map(W).set(o.key,U)),h?.(o.key,U)},[w,n,R,h]),ee=I.useCallback(p=>{const o=A.current;if(!o||p.pointerId!==o.pointerId)return;const C=p.clientX-o.startX,L=p.clientY-o.startY;C===o.dx&&L===o.dy||b({...o,dx:C,dy:L})},[]),x=I.useCallback(p=>{const o=A.current;if(!o||p.pointerId!==o.pointerId)return;Ce(p.currentTarget,p.pointerId),b(null);const C=w||n,L=K.current?.getBoundingClientRect(),G=L?Math.max(0,Math.floor((p.clientX-L.left)/C)):o.panelCol+o.subCol,Y=L?Math.max(0,Math.floor((p.clientY-L.top)/C)):o.panelRow+o.subRow,m=[G,Y],U=ye(o.parentKey,o.subIndex),W=k.find(z=>z.key===o.parentKey),H=W?.subItems?.[o.subIndex];H&&T(z=>new Map(z).set(U,{parentKey:o.parentKey,item:{key:`promoted::${U}`,desire:{position:m,shape:Re(H.desire.shape)},theme:{...W.theme,...H.theme},groupKey:W.groupKey??o.parentKey,ui:H.ui}})),S(z=>z.has(o.parentKey)?z:new Map(z).set(o.parentKey,[o.panelCol,o.panelRow])),f?.(o.parentKey,o.subIndex,m)},[w,n,k,f]),{layout:E,panelSubLayouts:V,components:Z}=I.useMemo(()=>{const p={layout:null,panelSubLayouts:new Map,components:[]};if(R==null)return p;const o=new Set(k.map(m=>m.key)),C=new Map,L=new Map,G=k.map(m=>{const U=j.get(m.key);let W=U?{...m.desire,position:U}:m.desire,H=m.groupKey;if(m.subItems&&m.subItems.length>0){const z=Ye(m.key,m.subItems,N),he=He(z,m.key);C.set(m.key,he),W={...W,shape:De(he.placements)},H=m.groupKey??m.key}return L.set(m.key,H),{key:m.key,desire:W,groupKey:H,item:m}});for(const{item:m,parentKey:U}of N.values())o.has(U)&&(L.set(m.key,m.groupKey),G.push({key:m.key,desire:m.desire,groupKey:m.groupKey,item:m}));const Y=Se({items:G,cols:R});return{layout:Y,panelSubLayouts:C,components:Je(Y.placements,L)}},[k,R,a,j,N]),F=E?.unfit.join(",")??"";I.useEffect(()=>{},[F,R,E]);const B=E?.rowsUsed??0;return M.jsxs("div",{ref:K,className:ce("relative w-full",$),style:{minHeight:B>0?B*w:void 0,...D},children:[Z.map(p=>{const o=p.map(m=>m.key).join("|"),C=i?p.find(m=>m.key===i.key):void 0,L=C&&i?[i.dx,i.dy]:void 0,G=l&&p.some(m=>m.key===l.parentKey)?{parentKey:l.parentKey,subIndex:l.subIndex}:null,Y=p.some(m=>j.has(m.key));return M.jsx(et,{members:p,block:w,gap:r,primitives:s,onItemError:u,draggable:y,panelSubLayouts:V,dragKey:C?.key??null,dragOffset:L,draggingSub:G,overridden:Y,onItemDragStart:q,onSubDragStart:O,onSubDragMove:ee,onSubDragEnd:x,onDragMove:_,onDragEnd:J},o)}),l&&M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(l.panelCol+l.subCol)*w+l.dx,top:(l.panelRow+l.subRow)*w+l.dy},children:M.jsx(de,{shape:l.ghostShape,block:w,gap:r,fill:l.ghostFill,stroke:l.ghostStroke,strokeWidth:l.ghostStrokeWidth})})]})}const et=I.memo(function({members:t,block:n,gap:r,primitives:a,onItemError:s,draggable:u=!1,panelSubLayouts:y,dragKey:h,dragOffset:f,draggingSub:$,overridden:D=!1,onItemDragStart:K,onSubDragStart:d,onSubDragMove:v,onSubDragEnd:k,onDragMove:R,onDragEnd:w}){let j=1/0,S=1/0,i=0,c=0;for(const x of t)j=Math.min(j,x.col),S=Math.min(S,x.row),i=Math.max(i,x.col+x.cols),c=Math.max(c,x.row+x.rows);const g=Math.max(1,i-j),N=Math.max(1,c-S),T=I.useMemo(()=>{const x=Array.from({length:N},()=>new Array(g).fill(0));for(const E of t)for(let V=0;V<E.mask.length;V++){const Z=E.mask[V];for(let F=0;F<Z.length;F++)Z[F]&&(x[E.row-S+V][E.col-j+F]=1)}return x},[t,g,N,j,S]),l=t[0],b=l.item,A=I.useMemo(()=>Ne(b.theme??{}),[b.theme?.type,b.theme?.variant,b.theme?.gradient]);I.useEffect(()=>{if(s)for(const x of t){const E=x.item;E.ui&&!a?.[E.ui.type]&&s(x.key,{kind:"unknown-primitive",type:E.ui.type})}},[t,a,s]);const q=t.length===1&&!y.has(l.key),O=h!=null||$!=null,_={position:"absolute",left:j*n,top:S*n,color:A.color};q&&h===l.key&&f?(_.transform=`translate(${f[0]}px, ${f[1]}px)`,_.zIndex=20):D&&(_.zIndex=10),u&&q&&(_.cursor=h===l.key?"grabbing":"grab",_.touchAction="none");const J=u&&q&&K?{onPointerDown:x=>K(l,x),onPointerMove:R,onPointerUp:w,onPointerCancel:w}:void 0,ee=[];for(const x of t){const E=x.item,V=x.col-j,Z=x.row-S,F=y.get(x.key);if(F)for(const B of F.placements){const p=B.item;if($?.parentKey===x.key&&$.subIndex===p.index)continue;const o=p.sub,C=o.ui?a?.[o.ui.type]:void 0,L=u&&d?{onPointerDown:G=>{G.stopPropagation(),d(x,p,B,G)},onPointerMove:v,onPointerUp:k,onPointerCancel:k}:void 0;ee.push(M.jsx("div",{...L,className:u?"cursor-grab touch-none":void 0,style:{position:"absolute",left:(V+B.col)*n,top:(Z+B.row)*n,width:B.cols*n,height:B.rows*n,padding:we},children:C?M.jsx(C,{...o.ui}):M.jsx(Le,{type:o.ui.type})},`${x.key}/${p.index}`))}else{const B=E.ui?a?.[E.ui.type]:void 0,p=u&&!q&&K?{onPointerDown:o=>{o.stopPropagation(),K(x,o)},onPointerMove:R,onPointerUp:w,onPointerCancel:w}:void 0;ee.push(M.jsx("div",{...p,className:u&&!q?"cursor-grab touch-none":void 0,style:{position:"absolute",left:V*n,top:Z*n,width:x.cols*n,height:x.rows*n,padding:we},children:B&&E.ui?M.jsx(B,{...E.ui}):E.ui?M.jsx(Le,{type:E.ui.type}):null},x.key))}}return M.jsx("div",{...J,className:ce(u&&q&&"select-none",A.elevated&&"drop-shadow-lg"),style:_,children:M.jsxs(de,{shape:T,block:n,gap:r,fill:A.fill,stroke:A.stroke,strokeWidth:A.strokeWidth,pad:0,noClip:O,children:[A.accentBar&&M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:A.accentBar}}),ee]})})});function Le({type:e}){return M.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",M.jsx("code",{className:"ml-1",children:e})]})}Te.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const at={title:"UI/Notch/NotchGrid",component:Te,parameters:{layout:"fullscreen"}},tt=({label:e,value:t})=>M.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[M.jsx("div",{className:"text-xs opacity-75",children:e}),M.jsx("div",{className:"text-xl font-semibold",children:t})]}),nt=({label:e,children:t})=>M.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),Q={Label:tt,Center:nt},X=(...e)=>e.map(t=>t.map(n=>n===1)),P=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),le={args:{primitives:Q,items:[{key:"hero",desire:{shape:P(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:P(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:P(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},te={args:{primitives:Q,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:P(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},ne={args:{primitives:Q,items:[{key:"panel",desire:{shape:P(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:P(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:P(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:P(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:P(1,1)},ui:{type:"Label",label:"B"}}]}]}},oe={args:{primitives:Q,items:[{key:"first",desire:{position:[0,0],shape:P(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:P(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},re={args:{primitives:Q,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:P(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},se={args:{primitives:Q,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:X([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:P(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:X([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:P(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:X([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:X([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:P(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:X([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},ae={args:{primitives:Q,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:X([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:X([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:X([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:X([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:P(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:P(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:P(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:P(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};le.parameters={...le.parameters,docs:{...le.parameters?.docs,source:{originalSource:`{
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
