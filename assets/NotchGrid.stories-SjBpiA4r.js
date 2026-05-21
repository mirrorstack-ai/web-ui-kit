import{r as M,j as L}from"./iframe-Dy4NMBTQ.js";import{c as ee}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const xe=(e,t)=>`${e},${t}`;function be(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function De(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function Te(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:a=0}){const s=e.length,p=(d,g)=>d>=0&&d<s&&g>=0&&g<e[d].length&&!!e[d][g],y=Math.max(0,Math.min(a,t-2))/2,f=new Map,b=(d,g)=>{const C=xe(d[0],d[1]),P=f.get(C);P?P.push(g):f.set(C,[g])};for(let d=0;d<s;d++)for(let g=0;g<e[d].length;g++){if(!e[d][g])continue;const C=[g,d],P=[g+1,d],I=[g+1,d+1],E=[g,d+1];p(d-1,g)||b(C,P),p(d,g+1)||b(P,I),p(d+1,g)||b(I,E),p(d,g-1)||b(E,C)}const j=new Set,A=[],D=(d,g)=>`${d}>${g[0]},${g[1]}`;for(const[d,g]of f){const[C,P]=d.split(",").map(Number);for(const I of g){if(j.has(D(d,I)))continue;const E=[];let N=[C,P],i=d,l=I,k=[0,0];for(;l;){const R=D(i,l);if(j.has(R))break;j.add(R),E.push(N),k=[l[0]-N[0],l[1]-N[1]],N=l,i=xe(l[0],l[1]);const u=f.get(i)??[];let x=null,U=Number.POSITIVE_INFINITY;for(const B of u){if(j.has(D(i,B)))continue;const O=B[0]-N[0],V=B[1]-N[1],F=k[0]*V-k[1]*O;F<U&&(U=F,x=B)}l=x}const S=Ge(E).map(([R,u])=>[R*t,u*t]);if(S.length>=3){const R=y>0?qe(S,y):S;A.push(_e(R,n,r))}}}return A.join(" ")}function Ge(e){const t=e.length,n=[];for(let r=0;r<t;r++){const a=e[(r-1+t)%t],s=e[r],p=e[(r+1)%t],y=s[0]-a[0],f=s[1]-a[1],b=p[0]-s[0],j=p[1]-s[1];y*j-f*b!==0&&n.push(s)}return n}function qe(e,t){const n=e.length,r=e.map((s,p)=>{const y=e[(p+1)%n],f=Math.sign(y[0]-s[0]),b=Math.sign(y[1]-s[1]);return b===0?{axis:"y",value:s[1]+f*t}:{axis:"x",value:s[0]+-b*t}}),a=[];for(let s=0;s<n;s++){const p=r[(s-1+n)%n],y=r[s],f=p.axis==="x"?p.value:y.value,b=p.axis==="y"?p.value:y.value;a.push([f,b])}return a}function _e(e,t,n){const r=e.length,a=[];for(let s=0;s<r;s++){const p=e[(s-1+r)%r],y=e[s],f=e[(s+1)%r],b=Ce(p,y),j=Ce(y,f),A=Le(p,y),D=Le(y,f),g=A[0]*D[1]-A[1]*D[0]>0,C=Math.min(g?t:n,b/2,j/2),P=[y[0]-A[0]*C,y[1]-A[1]*C],I=[y[0]+D[0]*C,y[1]+D[1]*C];a.push(`${s===0?"M":"L"} ${Me(P)}`),C>0&&a.push(`A ${he(C)} ${he(C)} 0 0 ${g?1:0} ${Me(I)}`)}return a.push("Z"),a.join(" ")}function Ce(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function Le(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function he(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Me(e){return`${he(e[0])},${he(e[1])}`}const je=96;function ge({shape:e,tier:t=1,block:n=je,gap:r=0,radius:a=24,inverseRadius:s=32,fill:p="var(--color-surface-container-low)",stroke:y="var(--color-outline-variant)",strokeWidth:f=1,children:b,pad:j=16,noClip:A=!1,className:D,style:d}){const C=`block-shape-clip-${M.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,P=e.length,I=be(e),E=M.useMemo(()=>De(e,t),[e,t]),N=I*n,i=P*n,l=M.useMemo(()=>Te(E,{cell:n,gap:r,radius:a,inverseRadius:s}),[E,n,r,a,s]),k=f/2;return L.jsxs("div",{className:ee("relative",D),style:{width:N,height:i,...d},children:[L.jsxs("svg",{width:N,height:i,viewBox:`${-k} ${-k} ${N+f} ${i+f}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!A&&L.jsx("defs",{children:L.jsx("clipPath",{id:C,clipPathUnits:"userSpaceOnUse",children:L.jsx("path",{d:l})})}),L.jsx("path",{d:l,fill:p,stroke:y,strokeWidth:f,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),L.jsx("div",{className:ee("absolute inset-0",!A&&"overflow-hidden"),style:{padding:j,clipPath:A?void 0:`url(#${C})`},children:b})]})}ge.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"number"},description:"Padding (px) on the content layer. Default 16.",defaultValue:{value:"16",computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ue=1e5;function Be(e){let t=1,n=1;for(const a of e)t=Math.max(t,a.row+a.rows),n=Math.max(n,a.col+a.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const a of e)for(let s=0;s<a.rows;s++)for(let p=0;p<a.cols;p++)r[a.row+s][a.col+p]=!0;return r}const Oe={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function $e(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Ie(e){return $e(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function Ve(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let a=0;a<e.length;a++)for(let s=0;s<n;s++){const p=[];for(let y=0;y<e[a].length;y++)for(let f=0;f<n;f++)p.push(e[a][y]);r.push(p)}return r}function Ke(e,t){const n={...Oe,...t},r=Math.max(1,Math.floor(e.cols)),a=[],s=i=>{for(;a.length<=i;)a.push(new Array(r).fill(!1))},p=(i,l,k)=>{for(let S=0;S<i.length;S++){const R=i[S];for(let u=0;u<R.length;u++){if(!R[u])continue;const x=l+u;if(x<0||x>=r)return!0;const U=k+S;if(s(U),a[U][x])return!0}}return!1},y=(i,l,k)=>{for(let S=0;S<i.length;S++){const R=i[S];for(let u=0;u<R.length;u++)R[u]&&(s(k+S),a[k+S][l+u]=!0)}},f=(i,l,k)=>n.W_pos*Number(i)+n.W_shape*Number(l)+n.W_scale*(k-1),b=i=>{const l=i.desire.position===void 0?[["0",void 0]]:Ie(i.desire.position),k=Ie(i.desire.shape),S=i.desire.scale?Array.from({length:n.maxScale},(u,x)=>x+1):[1],R=[];for(const[u,x]of l)for(const[U,B]of k)for(const O of S){const V=O===1?B:Ve(B,O);R.push({posKey:u,shapeKey:U,pos:x,mask:V,scale:O,cost:f(u,U,O)})}return R.sort((u,x)=>u.cost-x.cost),R},j=(i,l)=>{const k=be(l.mask),S=l.mask.length;if(k>r)return null;const R=(u,x)=>(y(l.mask,u,x),{key:i.key,item:i.item,col:u,row:x,mask:l.mask,cols:k,rows:S,priorityUsed:{position:l.posKey,shape:l.shapeKey},scale:l.scale,cost:l.cost});if(l.pos){const[u,x]=l.pos;return u>=0&&u+k<=r&&x>=0&&!p(l.mask,u,x)?R(u,x):null}for(let u=0;u<Ue;u++)for(let x=0;x+k<=r;x++)if(!p(l.mask,x,u))return R(x,u);return null},A=i=>{for(const l of b(i)){const k=j(i,l);if(k)return k}return null},D=i=>{const l=i.desire.position;return l!==void 0&&!$e(l)},d=[],g=[],C=[];for(const i of e.items)if(D(i)){const l=A(i);l?d.push(l):C.push({...i,desire:{...i.desire,position:void 0}})}else C.push(i);for(const i of C){const l=A(i);l?d.push(l):g.push(i.key)}let P=0,I=0;for(const i of d){const l=b(e.items.find(k=>k.key===i.key));P+=i.cost,I+=l[l.length-1]?.cost??0}const E=I===0?1:1-P/I;let N=0;for(const i of d)N=Math.max(N,i.row+i.rows);return{placements:d,rowsUsed:N,unfit:g,satisfaction:E}}const Fe="neutral",We={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},ze={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},pe={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Xe={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ye={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function He(e){const t=e.variant??"auto",n=t==="auto"?Fe:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function Se(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function ve(e){const t=e??{},{type:n,variant:r}=He(t),a=t.gradient??0;switch(n){case"filled":{const s=We[r];return{fill:s,cssBackground:Se(s,a),color:ze[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:pe[r],stroke:Xe[r],strokeWidth:1,elevated:!1};case"elevated":{const s=r==="warn"||r==="error",p=Ye[r];return{fill:p,cssBackground:Se(p,a),color:pe[r],stroke:"none",strokeWidth:0,...s?{accentBar:pe[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:pe[r],stroke:"none",strokeWidth:0,elevated:!1}}}const Ne=16;function fe(e,t){try{e.setPointerCapture(t)}catch{}}function Re(e,t){try{e.releasePointerCapture(t)}catch{}}const ke=(e,t)=>`${e}::${t}`;function Ze(e){return e.map(t=>t.map(n=>n?1:0))}function Qe(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function Ae(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function Je(e){let t=1;for(const{sub:n}of e){const r=be(Ae(n.desire.shape)),a=n.desire.position,s=Array.isArray(a)?a[0]:0;t=Math.max(t,s+r)}return t}function et(e,t,n){const r=[];return t.forEach((a,s)=>{n.has(ke(e,s))||r.push({sub:a,index:s})}),r}function tt(e,t){return Ke({items:e.map(n=>({key:ke(t,n.index),desire:n.sub.desire,item:n})),cols:Je(e)})}function nt(e){const t=[];for(let n=0;n<e.mask.length;n++){const r=e.mask[n];for(let a=0;a<r.length;a++)r[a]&&t.push([e.col+a,e.row+n])}return t}function ot(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(nt),n=new Array(e.length).fill(!1),r=(s,p)=>{for(const[y,f]of t[s])for(const[b,j]of t[p])if(Math.abs(y-b)<=1&&Math.abs(f-j)<=1)return!0;return!1},a=[];for(let s=0;s<e.length;s++){if(n[s])continue;n[s]=!0;const p=[s],y=[];for(;p.length;){const f=p.shift();y.push(e[f]);for(let b=0;b<e.length;b++)!n[b]&&r(f,b)&&(n[b]=!0,p.push(b))}a.push(y)}return a}function rt(e,t){const n=new Map;e.forEach((a,s)=>{const p=t.get(a.key),y=p!=null?`g:${p}`:`s:${s}`,f=n.get(y);f?f.push(a):n.set(y,[a])});const r=[];for(const a of n.values())for(const s of ot(a))r.push(s);return r}function Ee({items:e,cols:t="auto",blockMin:n=je,gap:r=8,nest:a=!0,primitives:s,onItemError:p,draggable:y=!1,onItemMove:f,onSubItemPromote:b,className:j,style:A}){const D=M.useRef(null),[d,g]=M.useState(null);M.useLayoutEffect(()=>{const c=D.current;if(!c)return;const o=()=>g(c.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const h=new ResizeObserver(o);return h.observe(c),()=>h.disconnect()},[]);const C=M.useMemo(()=>Qe(e),[e]),{resolvedCols:P,block:I}=M.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(d==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(d/n));return{resolvedCols:c,block:d/c}},[t,n,d]),[E,N]=M.useState(new Map),[i,l]=M.useState(null),k=M.useRef(null);k.current=i;const[S,R]=M.useState(new Map),[u,x]=M.useState(null),U=M.useRef(null);U.current=u;const B=M.useCallback((c,o)=>{o.button!=null&&o.button!==0||(fe(o.currentTarget,o.pointerId),l({key:c.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:c.col,originRow:c.row,originCols:c.cols,dx:0,dy:0}))},[]),O=M.useCallback((c,o)=>{if(o.button!=null&&o.button!==0)return;fe(o.currentTarget,o.pointerId);const h=c[0];l({key:h.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:h.col,originRow:h.row,originCols:h.cols,dx:0,dy:0,members:c.map(m=>({key:m.key,col:m.col,row:m.row,cols:m.cols,rows:m.rows}))})},[]),V=M.useCallback((c,o,h,m)=>{if(m.button!=null&&m.button!==0)return;fe(m.currentTarget,m.pointerId);const $=ve(c.item.theme??{});x({parentKey:c.key,subIndex:o.index,pointerId:m.pointerId,startX:m.clientX,startY:m.clientY,dx:0,dy:0,panelCol:c.col,panelRow:c.row,panelCols:c.cols,panelRows:c.rows,subCol:h.col,subRow:h.row,ghostShape:Ze(h.mask),ghostFill:$.fill,ghostStroke:$.stroke,ghostStrokeWidth:$.strokeWidth,ghostUi:o.sub.ui,ghostColor:$.color})},[]),F=M.useCallback(c=>{const o=k.current;if(!o||c.pointerId!==o.pointerId)return;const h=c.clientX-o.startX,m=c.clientY-o.startY;h===o.dx&&m===o.dy||l({...o,dx:h,dy:m})},[]),ce=M.useCallback(c=>{const o=k.current;if(!o||c.pointerId!==o.pointerId)return;Re(c.currentTarget,c.pointerId),l(null);const h=I||n,m=P??1;if(o.members){const q=Math.min(...o.members.map(z=>z.col)),W=Math.min(...o.members.map(z=>z.row)),X=Math.max(...o.members.map(z=>z.col+z.cols)),J=Math.max(-q,Math.min(m-X,Math.round(o.dx/h))),ye=Math.max(-W,Math.round(o.dy/h));if(J===0&&ye===0)return;N(z=>{const we=new Map(z);for(const me of o.members)we.set(me.key,[me.col+J,me.row+ye]);return we});for(const z of o.members)f?.(z.key,[z.col+J,z.row+ye]);return}const $=Math.max(0,m-o.originCols),_=Math.min($,Math.max(0,o.originCol+Math.round(o.dx/h))),v=Math.max(0,o.originRow+Math.round(o.dy/h)),K=[_,v];N(q=>new Map(q).set(o.key,K)),f?.(o.key,K)},[I,n,P,f]),ue=M.useCallback(c=>{const o=U.current;if(!o||c.pointerId!==o.pointerId)return;const h=c.clientX-o.startX,m=c.clientY-o.startY;h===o.dx&&m===o.dy||x({...o,dx:h,dy:m})},[]),H=M.useCallback(c=>{const o=U.current;if(!o||c.pointerId!==o.pointerId)return;Re(c.currentTarget,c.pointerId),x(null);const h=I||n,m=D.current?.getBoundingClientRect(),$=m?Math.max(0,Math.floor((c.clientX-m.left)/h)):o.panelCol+o.subCol,_=m?Math.max(0,Math.floor((c.clientY-m.top)/h)):o.panelRow+o.subRow,v=[$,_],K=ke(o.parentKey,o.subIndex),q=C.find(X=>X.key===o.parentKey),W=q?.subItems?.[o.subIndex];W&&R(X=>new Map(X).set(K,{parentKey:o.parentKey,item:{key:`promoted::${K}`,desire:{position:v,shape:Ae(W.desire.shape)},theme:{...q.theme,...W.theme},groupKey:q.groupKey??o.parentKey,ui:W.ui}})),N(X=>X.has(o.parentKey)?X:new Map(X).set(o.parentKey,[o.panelCol,o.panelRow])),b?.(o.parentKey,o.subIndex,v)},[I,n,C,b]),{layout:te,panelSubLayouts:ne,components:w}=M.useMemo(()=>{const c={layout:null,panelSubLayouts:new Map,components:[]};if(P==null)return c;const o=new Set(C.map(v=>v.key)),h=new Map,m=new Map,$=C.map(v=>{const K=E.get(v.key);let q=K?{...v.desire,position:K}:v.desire,W=v.groupKey;if(v.subItems&&v.subItems.length>0){const X=et(v.key,v.subItems,S),J=tt(X,v.key);h.set(v.key,J),q={...q,shape:Be(J.placements)},W=v.groupKey??v.key}return m.set(v.key,W),{key:v.key,desire:q,groupKey:W,item:v}});for(const{item:v,parentKey:K}of S.values()){if(!o.has(K))continue;const q=E.get(v.key),W=q?{...v.desire,position:q}:v.desire;m.set(v.key,v.groupKey),$.push({key:v.key,desire:W,groupKey:v.groupKey,item:v})}const _=Ke({items:$,cols:P});return{layout:_,panelSubLayouts:h,components:rt(_.placements,m)}},[C,P,a,E,S]),G=te?.unfit.join(",")??"";M.useEffect(()=>{},[G,P,te]);const Y=te?.rowsUsed??0;return L.jsxs("div",{ref:D,className:ee("relative w-full",j),style:{minHeight:Y>0?Y*I:void 0,...A},children:[w.map(c=>{const o=c.map(K=>K.key).join("|"),h=i?c.find(K=>K.key===i.key):void 0,m=h&&i?[i.dx,i.dy]:void 0,$=u&&c.some(K=>K.key===u.parentKey)?{parentKey:u.parentKey,subIndex:u.subIndex}:null,_=c.some(K=>E.has(K.key)),v=i?.members!=null&&h!=null;return L.jsx(st,{members:c,block:I,gap:r,primitives:s,onItemError:p,draggable:y,panelSubLayouts:ne,dragKey:h?.key??null,dragOffset:m,wholeDrag:v,draggingSub:$,overridden:_,onItemDragStart:B,onComponentDragStart:O,onSubDragStart:V,onSubDragMove:ue,onSubDragEnd:H,onDragMove:F,onDragEnd:ce},o)}),u&&(()=>{const c=s?.[u.ghostUi.type];return L.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(u.panelCol+u.subCol)*I+u.dx,top:(u.panelRow+u.subRow)*I+u.dy,color:u.ghostColor},children:L.jsx(ge,{shape:u.ghostShape,block:I,gap:r,fill:u.ghostFill,stroke:u.ghostStroke,strokeWidth:u.ghostStrokeWidth,children:c?L.jsx(c,{...u.ghostUi}):null})})})()]})}const st=M.memo(function({members:t,block:n,gap:r,primitives:a,onItemError:s,draggable:p=!1,panelSubLayouts:y,dragKey:f,dragOffset:b,wholeDrag:j=!1,draggingSub:A,overridden:D=!1,onItemDragStart:d,onComponentDragStart:g,onSubDragStart:C,onSubDragMove:P,onSubDragEnd:I,onDragMove:E,onDragEnd:N}){let i=1/0,l=1/0,k=0,S=0;for(const w of t)i=Math.min(i,w.col),l=Math.min(l,w.row),k=Math.max(k,w.col+w.cols),S=Math.max(S,w.row+w.rows);const R=Math.max(1,k-i),u=Math.max(1,S-l),x=M.useMemo(()=>{const w=Array.from({length:u},()=>new Array(R).fill(0));for(const G of t)for(let Y=0;Y<G.mask.length;Y++){const c=G.mask[Y];for(let o=0;o<c.length;o++)c[o]&&(w[G.row-l+Y][G.col-i+o]=1)}return w},[t,R,u,i,l]),U=M.useMemo(()=>Te(x.map(w=>w.map(Boolean)),{cell:n,gap:r,radius:24,inverseRadius:32}),[x,n,r]),B=t[0],O=B.item,V=M.useMemo(()=>ve(O.theme??{}),[O.theme?.type,O.theme?.variant,O.theme?.gradient]);M.useEffect(()=>{if(s)for(const w of t){const G=w.item;G.ui&&!a?.[G.ui.type]&&s(w.key,{kind:"unknown-primitive",type:G.ui.type})}},[t,a,s]);const F=t.length===1&&!y.has(B.key),ce=(F||j)&&f===B.key,ue=f!=null&&!F&&!j,H={position:"absolute",left:i*n,top:l*n,color:V.color};ce&&b?(H.transform=`translate(${b[0]}px, ${b[1]}px)`,H.zIndex=20):D&&(H.zIndex=10),p&&(H.cursor=ce?"grabbing":"grab",H.touchAction="none"),ue||(H.clipPath=`path('${U}')`);const te=p&&F&&d?{onPointerDown:w=>d(B,w),onPointerMove:E,onPointerUp:N,onPointerCancel:N}:p&&!F&&g?{onPointerDown:w=>g(t,w),onPointerMove:E,onPointerUp:N,onPointerCancel:N}:void 0,ne=[];for(const w of t){const G=w.item,Y=w.col-i,c=w.row-l,o=y.get(w.key);if(o)for(const h of o.placements){const m=h.item,$=A?.parentKey===w.key&&A.subIndex===m.index,_=m.sub,v=_.ui?a?.[_.ui.type]:void 0,K=p&&C?{onPointerDown:q=>{q.stopPropagation(),C(w,m,h,q)},onPointerMove:P,onPointerUp:I,onPointerCancel:I}:void 0;ne.push(L.jsx("div",{className:"absolute",style:{left:(Y+h.col)*n,top:(c+h.row)*n,width:h.cols*n,height:h.rows*n,padding:Ne,opacity:$?0:void 0},children:L.jsx("div",{...K,className:ee("h-full w-full",p&&"cursor-grab touch-none"),children:v?L.jsx(v,{..._.ui}):L.jsx(Pe,{type:_.ui.type})})},`${w.key}/${m.index}`))}else{const h=G.ui?a?.[G.ui.type]:void 0,m=p&&!F&&d?{onPointerDown:v=>{v.stopPropagation(),d(w,v)},onPointerMove:E,onPointerUp:N,onPointerCancel:N}:void 0,$=!F&&!j&&f===w.key,_=ve(G.theme??{});ne.push(L.jsx("div",{className:"absolute",style:{left:Y*n,top:c*n,width:w.cols*n,height:w.rows*n,padding:Ne,transform:$&&b?`translate(${b[0]}px, ${b[1]}px)`:void 0,zIndex:$?30:void 0,background:$?_.cssBackground:void 0,color:$?_.color:void 0,borderRadius:$?24:void 0},children:L.jsx("div",{...m,className:ee("h-full w-full",p&&!F&&"cursor-grab touch-none"),children:h&&G.ui?L.jsx(h,{...G.ui}):G.ui?L.jsx(Pe,{type:G.ui.type}):null})},w.key))}}return L.jsx("div",{...te,className:ee(p&&"select-none",V.elevated&&"drop-shadow-lg"),style:H,children:L.jsxs(ge,{shape:x,block:n,gap:r,fill:V.fill,stroke:V.stroke,strokeWidth:V.strokeWidth,pad:0,noClip:ue,children:[V.accentBar&&L.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:V.accentBar}}),ne]})})});function Pe({type:e}){return L.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",L.jsx("code",{className:"ml-1",children:e})]})}Ee.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:"Record<string, ComponentType<Record<string, unknown>>>"},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse."},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const pt={title:"UI/Notch/NotchGrid",component:Ee,parameters:{layout:"fullscreen"}},at=({label:e,value:t})=>L.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[L.jsx("div",{className:"text-xs opacity-75",children:e}),L.jsx("div",{className:"text-xl font-semibold",children:t})]}),it=({label:e,children:t})=>L.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),Q={Label:at,Center:it},Z=(...e)=>e.map(t=>t.map(n=>n===1)),T=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),de={args:{primitives:Q,items:[{key:"hero",desire:{shape:T(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:T(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:T(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:T(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},oe={args:{primitives:Q,items:Array.from({length:12},(e,t)=>({key:`t${t}`,desire:{shape:T(1,1)},theme:{type:"filled",variant:["primary","secondary","tertiary","neutral"][t%4]},ui:{type:"Label",label:`#${t+1}`,value:t+1}}))}},re={args:{primitives:Q,items:[{key:"panel",desire:{shape:T(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:T(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:T(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:T(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:T(1,1)},ui:{type:"Label",label:"B"}}]}]}},se={args:{primitives:Q,items:[{key:"first",desire:{position:[0,0],shape:T(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"First",value:"wins (0,0)"}},{key:"second",desire:{position:{0:[0,0],1:[2,0]},shape:T(2,2)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Second",value:"falls to (2,0)"}}]}},ae={args:{primitives:Q,cols:6,blockMin:120,items:["filled","outlined","elevated","ghost"].flatMap(e=>["primary","secondary","tertiary","neutral","warn","error"].map(t=>({key:`${e}-${t}`,desire:{shape:T(1,1)},theme:{type:e,variant:t},ui:{type:"Center",label:`${e} ${t}`}})))}},ie={args:{primitives:Q,cols:8,blockMin:96,items:[{key:"L",desire:{position:[0,0],shape:Z([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"3×3 − ⌐"}},{key:"L-notch-fill",desire:{position:[2,2],shape:T(1,1)},theme:{type:"outlined",variant:"primary"},ui:{type:"Label",label:"Nestled"}},{key:"plus",desire:{position:[3,0],shape:Z([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"p-tl",desire:{position:[3,0],shape:T(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↖"}},{key:"p-tr",desire:{position:[5,0],shape:T(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↗"}},{key:"p-bl",desire:{position:[3,2],shape:T(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↙"}},{key:"p-br",desire:{position:[5,2],shape:T(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"↘"}},{key:"T",desire:{position:[0,3],shape:Z([1,1,1],[0,1,0])},theme:{type:"outlined",variant:"neutral"},ui:{type:"Center",label:"T"}},{key:"chart",desire:{position:[4,3],shape:Z([1,1,1,0],[1,1,1,1])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"chart-notch",desire:{position:[7,3],shape:T(1,1)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Now"}},{key:"diagonal",desire:{position:[0,5],shape:Z([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}}]}},le={args:{primitives:Q,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:Z([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:Z([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:Z([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:Z([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:T(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:T(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:T(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:T(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};de.parameters={...de.parameters,docs:{...de.parameters?.docs,source:{originalSource:`{
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
}`,...le.parameters?.docs?.source},description:{story:"Outer-grid drag over the same rich notched footprints as `CustomShapes`:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...le.parameters?.docs?.description}}};const dt=["Basic","AutoSize","SubItems","PriorityFallback","ThemeGallery","CustomShapes","Draggable"];export{oe as AutoSize,de as Basic,ie as CustomShapes,le as Draggable,se as PriorityFallback,re as SubItems,ae as ThemeGallery,dt as __namedExportsOrder,pt as default};
