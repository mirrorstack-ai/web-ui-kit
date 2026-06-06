import{r as M,j as I}from"./iframe-ClOIDy2i.js";import{c as Q}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const ge=(e,t)=>`${e},${t}`;function me(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function Ke(e,t){return e.map(n=>n.map(r=>r>=1&&r<=t))}function Se(e,{cell:t,radius:n=24,inverseRadius:r=32,gap:a=0}){const s=e.length,p=(d,b)=>d>=0&&d<s&&b>=0&&b<e[d].length&&!!e[d][b],f=Math.max(0,Math.min(a,t-2))/2,y=new Map,g=(d,b)=>{const C=ge(d[0],d[1]),L=y.get(C);L?L.push(b):y.set(C,[b])};for(let d=0;d<s;d++)for(let b=0;b<e[d].length;b++){if(!e[d][b])continue;const C=[b,d],L=[b+1,d],R=[b+1,d+1],$=[b,d+1];p(d-1,b)||g(C,L),p(d,b+1)||g(L,R),p(d+1,b)||g(R,$),p(d,b-1)||g($,C)}const T=new Set,A=[],E=(d,b)=>`${d}>${b[0]},${b[1]}`;for(const[d,b]of y){const[C,L]=d.split(",").map(Number);for(const R of b){if(T.has(E(d,R)))continue;const $=[];let N=[C,L],i=d,l=R,w=[0,0];for(;l;){const P=E(i,l);if(T.has(P))break;T.add(P),$.push(N),w=[l[0]-N[0],l[1]-N[1]],N=l,i=ge(l[0],l[1]);const u=y.get(i)??[];let x=null,_=Number.POSITIVE_INFINITY;for(const U of u){if(T.has(E(i,U)))continue;const G=U[0]-N[0],V=U[1]-N[1],W=w[0]*V-w[1]*G;W<_&&(_=W,x=U)}l=x}const S=Ae($).map(([P,u])=>[P*t,u*t]);if(S.length>=3){const P=f>0?$e(S,f):S;A.push(Ee(P,n,r))}}}return A.join(" ")}function Ae(e){const t=e.length,n=[];for(let r=0;r<t;r++){const a=e[(r-1+t)%t],s=e[r],p=e[(r+1)%t],f=s[0]-a[0],y=s[1]-a[1],g=p[0]-s[0],T=p[1]-s[1];f*T-y*g!==0&&n.push(s)}return n}function $e(e,t){const n=e.length,r=e.map((s,p)=>{const f=e[(p+1)%n],y=Math.sign(f[0]-s[0]),g=Math.sign(f[1]-s[1]);return g===0?{axis:"y",value:s[1]+y*t}:{axis:"x",value:s[0]+-g*t}}),a=[];for(let s=0;s<n;s++){const p=r[(s-1+n)%n],f=r[s],y=p.axis==="x"?p.value:f.value,g=p.axis==="y"?p.value:f.value;a.push([y,g])}return a}function Ee(e,t,n){const r=e.length,a=[];for(let s=0;s<r;s++){const p=e[(s-1+r)%r],f=e[s],y=e[(s+1)%r],g=be(p,f),T=be(f,y),A=we(p,f),E=we(f,y),b=A[0]*E[1]-A[1]*E[0]>0,C=Math.min(b?t:n,g/2,T/2),L=[f[0]-A[0]*C,f[1]-A[1]*C],R=[f[0]+E[0]*C,f[1]+E[1]*C];a.push(`${s===0?"M":"L"} ${ke(L)}`),C>0&&a.push(`A ${le(C)} ${le(C)} 0 0 ${b?1:0} ${ke(R)}`)}return a.push("Z"),a.join(" ")}function be(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function we(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function le(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function ke(e){return`${le(e[0])},${le(e[1])}`}const Ne=96;function fe({shape:e,tier:t=1,block:n=Ne,gap:r=0,radius:a=24,inverseRadius:s=32,fill:p="var(--color-surface-container-low)",stroke:f="var(--color-outline-variant)",strokeWidth:y=1,children:g,pad:T="16px 8px",noClip:A=!1,className:E,style:d}){const C=`block-shape-clip-${M.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,L=e.length,R=me(e),$=M.useMemo(()=>Ke(e,t),[e,t]),N=R*n,i=L*n,l=M.useMemo(()=>Se($,{cell:n,gap:r,radius:a,inverseRadius:s}),[$,n,r,a,s]),w=y/2;return I.jsxs("div",{className:Q("relative",E),style:{width:N,height:i,...d},children:[I.jsxs("svg",{width:N,height:i,viewBox:`${-w} ${-w} ${N+y} ${i+y}`,className:"pointer-events-none absolute inset-0","aria-hidden":"true",children:[!A&&I.jsx("defs",{children:I.jsx("clipPath",{id:C,clipPathUnits:"userSpaceOnUse",children:I.jsx("path",{d:l})})}),I.jsx("path",{d:l,fill:p,stroke:f,strokeWidth:y,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),I.jsx("div",{className:Q("absolute inset-0",!A&&"overflow-hidden"),style:{padding:T,clipPath:A?void 0:`url(#${C})`},children:g})]})}fe.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Padding on the content layer. Default 16px top/bottom, 8px sides.",defaultValue:{value:'"16px 8px"',computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const qe=1e5;function De(e){let t=1,n=1;for(const a of e)t=Math.max(t,a.row+a.rows),n=Math.max(n,a.col+a.cols);const r=Array.from({length:t},()=>Array(n).fill(!1));for(const a of e)for(let s=0;s<a.rows;s++)for(let p=0;p<a.cols;p++)r[a.row+s][a.col+p]=!0;return r}const Be={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function Pe(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function xe(e){return Pe(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function _e(e,t){if(t<=1)return e;const n=Math.floor(t),r=[];for(let a=0;a<e.length;a++)for(let s=0;s<n;s++){const p=[];for(let f=0;f<e[a].length;f++)for(let y=0;y<n;y++)p.push(e[a][f]);r.push(p)}return r}function Le(e,t){const n={...Be,...t},r=Math.max(1,Math.floor(e.cols)),a=[],s=i=>{for(;a.length<=i;)a.push(new Array(r).fill(!1))},p=(i,l,w)=>{for(let S=0;S<i.length;S++){const P=i[S];for(let u=0;u<P.length;u++){if(!P[u])continue;const x=l+u;if(x<0||x>=r)return!0;const _=w+S;if(s(_),a[_][x])return!0}}return!1},f=(i,l,w)=>{for(let S=0;S<i.length;S++){const P=i[S];for(let u=0;u<P.length;u++)P[u]&&(s(w+S),a[w+S][l+u]=!0)}},y=(i,l,w)=>n.W_pos*Number(i)+n.W_shape*Number(l)+n.W_scale*(w-1),g=i=>{const l=i.desire.position===void 0?[["0",void 0]]:xe(i.desire.position),w=xe(i.desire.shape),S=i.desire.scale?Array.from({length:n.maxScale},(u,x)=>x+1):[1],P=[];for(const[u,x]of l)for(const[_,U]of w)for(const G of S){const V=G===1?U:_e(U,G);P.push({posKey:u,shapeKey:_,pos:x,mask:V,scale:G,cost:y(u,_,G)})}return P.sort((u,x)=>u.cost-x.cost),P},T=(i,l)=>{const w=me(l.mask),S=l.mask.length;if(w>r)return null;const P=(u,x)=>(f(l.mask,u,x),{key:i.key,item:i.item,col:u,row:x,mask:l.mask,cols:w,rows:S,priorityUsed:{position:l.posKey,shape:l.shapeKey},scale:l.scale,cost:l.cost});if(l.pos){const[u,x]=l.pos;return u>=0&&u+w<=r&&x>=0&&!p(l.mask,u,x)?P(u,x):null}for(let u=0;u<qe;u++)for(let x=0;x+w<=r;x++)if(!p(l.mask,x,u))return P(x,u);return null},A=i=>{for(const l of g(i)){const w=T(i,l);if(w)return w}return null},E=i=>{const l=i.desire.position;return l!==void 0&&!Pe(l)},d=[],b=[],C=[];for(const i of e.items)if(E(i)){const l=A(i);l?d.push(l):C.push({...i,desire:{...i.desire,position:void 0}})}else C.push(i);for(const i of C){const l=A(i);l?d.push(l):b.push(i.key)}let L=0,R=0;for(const i of d){const l=g(e.items.find(w=>w.key===i.key));L+=i.cost,R+=l[l.length-1]?.cost??0}const $=R===0?1:1-L/R;let N=0;for(const i of d)N=Math.max(N,i.row+i.rows);return{placements:d,rowsUsed:N,unfit:b,satisfaction:$}}const Ue="neutral",Ge={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Ve={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},se={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Oe={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},We={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Fe(e){const t=e.variant??"auto",n=t==="auto"?Ue:t,r=e.type??"auto";return{type:r==="auto"?t==="auto"?"ghost":"filled":r,variant:n}}function Ce(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function de(e){const t=e??{},{type:n,variant:r}=Fe(t),a=t.gradient??0;switch(n){case"filled":{const s=Ge[r];return{fill:s,cssBackground:Ce(s,a),color:Ve[r],stroke:"none",strokeWidth:0,elevated:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:se[r],stroke:Oe[r],strokeWidth:1,elevated:!1};case"elevated":{const s=r==="warn"||r==="error",p=We[r];return{fill:p,cssBackground:Ce(p,a),color:se[r],stroke:"none",strokeWidth:0,...s?{accentBar:se[r]}:{},elevated:!0}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:se[r],stroke:"none",strokeWidth:0,elevated:!1}}}const Ie="16px 8px";function pe(e,t){try{e.setPointerCapture(t)}catch{}}function Me(e,t){try{e.releasePointerCapture(t)}catch{}}const he=(e,t)=>`${e}::${t}`;function ze(e){return e.map(t=>t.map(n=>n?1:0))}function Xe(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function Te(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,r)=>Number(n)-Number(r));return e[t[0]]}function Ye(e){let t=1;for(const{sub:n}of e){const r=me(Te(n.desire.shape)),a=n.desire.position,s=Array.isArray(a)?a[0]:0;t=Math.max(t,s+r)}return t}function He(e,t,n){const r=[];return t.forEach((a,s)=>{n.has(he(e,s))||r.push({sub:a,index:s})}),r}function Ze(e,t){return Le({items:e.map(n=>({key:he(t,n.index),desire:n.sub.desire,item:n})),cols:Ye(e)})}function Qe(e){const t=[];for(let n=0;n<e.mask.length;n++){const r=e.mask[n];for(let a=0;a<r.length;a++)r[a]&&t.push([e.col+a,e.row+n])}return t}function Je(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(Qe),n=new Array(e.length).fill(!1),r=(s,p)=>{for(const[f,y]of t[s])for(const[g,T]of t[p])if(Math.abs(f-g)<=1&&Math.abs(y-T)<=1)return!0;return!1},a=[];for(let s=0;s<e.length;s++){if(n[s])continue;n[s]=!0;const p=[s],f=[];for(;p.length;){const y=p.shift();f.push(e[y]);for(let g=0;g<e.length;g++)!n[g]&&r(y,g)&&(n[g]=!0,p.push(g))}a.push(f)}return a}function et(e,t){const n=new Map;e.forEach((a,s)=>{const p=t.get(a.key),f=p!=null?`g:${p}`:`s:${s}`,y=n.get(f);y?y.push(a):n.set(f,[a])});const r=[];for(const a of n.values())for(const s of Je(a))r.push(s);return r}function je({items:e,cols:t="auto",blockMin:n=Ne,gap:r=8,nest:a=!0,primitives:s={},onItemError:p,draggable:f=!1,onItemMove:y,onSubItemPromote:g,className:T,style:A}){const E=M.useRef(null),[d,b]=M.useState(null);M.useLayoutEffect(()=>{const c=E.current;if(!c)return;const o=()=>b(c.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const m=new ResizeObserver(o);return m.observe(c),()=>m.disconnect()},[]);const C=M.useMemo(()=>Xe(e),[e]),{resolvedCols:L,block:R}=M.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(d==null)return{resolvedCols:null,block:n};const c=Math.max(1,Math.floor(d/n));return{resolvedCols:c,block:d/c}},[t,n,d]),[$,N]=M.useState(new Map),[i,l]=M.useState(null),w=M.useRef(null);w.current=i;const[S,P]=M.useState(new Map),[u,x]=M.useState(null),_=M.useRef(null);_.current=u;const U=M.useCallback((c,o)=>{o.button!=null&&o.button!==0||(pe(o.currentTarget,o.pointerId),l({key:c.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:c.col,originRow:c.row,originCols:c.cols,dx:0,dy:0}))},[]),G=M.useCallback((c,o)=>{if(o.button!=null&&o.button!==0)return;pe(o.currentTarget,o.pointerId);const m=c[0];l({key:m.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:m.col,originRow:m.row,originCols:m.cols,dx:0,dy:0,members:c.map(h=>({key:h.key,col:h.col,row:h.row,cols:h.cols,rows:h.rows}))})},[]),V=M.useCallback((c,o,m,h)=>{if(h.button!=null&&h.button!==0)return;pe(h.currentTarget,h.pointerId);const j=de(c.item.theme??{});x({parentKey:c.key,subIndex:o.index,pointerId:h.pointerId,startX:h.clientX,startY:h.clientY,dx:0,dy:0,panelCol:c.col,panelRow:c.row,panelCols:c.cols,panelRows:c.rows,subCol:m.col,subRow:m.row,ghostShape:ze(m.mask),ghostFill:j.fill,ghostStroke:j.stroke,ghostStrokeWidth:j.strokeWidth,ghostUi:o.sub.ui,ghostColor:j.color})},[]),W=M.useCallback(c=>{const o=w.current;if(!o||c.pointerId!==o.pointerId)return;const m=c.clientX-o.startX,h=c.clientY-o.startY;m===o.dx&&h===o.dy||l({...o,dx:m,dy:h})},[]),oe=M.useCallback(c=>{const o=w.current;if(!o||c.pointerId!==o.pointerId)return;Me(c.currentTarget,c.pointerId),l(null);const m=R||n,h=L??1;if(o.members){const D=Math.min(...o.members.map(z=>z.col)),F=Math.min(...o.members.map(z=>z.row)),X=Math.max(...o.members.map(z=>z.col+z.cols)),Z=Math.max(-D,Math.min(h-X,Math.round(o.dx/m))),ce=Math.max(-F,Math.round(o.dy/m));if(Z===0&&ce===0)return;N(z=>{const ve=new Map(z);for(const ue of o.members)ve.set(ue.key,[ue.col+Z,ue.row+ce]);return ve});for(const z of o.members)y?.(z.key,[z.col+Z,z.row+ce]);return}const j=Math.max(0,h-o.originCols),B=Math.min(j,Math.max(0,o.originCol+Math.round(o.dx/m))),v=Math.max(0,o.originRow+Math.round(o.dy/m)),K=[B,v];N(D=>new Map(D).set(o.key,K)),y?.(o.key,K)},[R,n,L,y]),re=M.useCallback(c=>{const o=_.current;if(!o||c.pointerId!==o.pointerId)return;const m=c.clientX-o.startX,h=c.clientY-o.startY;m===o.dx&&h===o.dy||x({...o,dx:m,dy:h})},[]),H=M.useCallback(c=>{const o=_.current;if(!o||c.pointerId!==o.pointerId)return;Me(c.currentTarget,c.pointerId),x(null);const m=R||n,h=E.current?.getBoundingClientRect(),j=h?Math.max(0,Math.floor((c.clientX-h.left)/m)):o.panelCol+o.subCol,B=h?Math.max(0,Math.floor((c.clientY-h.top)/m)):o.panelRow+o.subRow,v=[j,B],K=he(o.parentKey,o.subIndex),D=C.find(X=>X.key===o.parentKey),F=D?.subItems?.[o.subIndex];F&&P(X=>new Map(X).set(K,{parentKey:o.parentKey,item:{key:`promoted::${K}`,desire:{position:v,shape:Te(F.desire.shape)},theme:{...D.theme,...F.theme},groupKey:D.groupKey??o.parentKey,ui:F.ui}})),N(X=>X.has(o.parentKey)?X:new Map(X).set(o.parentKey,[o.panelCol,o.panelRow])),g?.(o.parentKey,o.subIndex,v)},[R,n,C,g]),{layout:J,panelSubLayouts:ee,components:k}=M.useMemo(()=>{const c={layout:null,panelSubLayouts:new Map,components:[]};if(L==null)return c;const o=new Set(C.map(v=>v.key)),m=new Map,h=new Map,j=C.map(v=>{const K=$.get(v.key);let D=K?{...v.desire,position:K}:v.desire,F=v.groupKey;if(v.subItems&&v.subItems.length>0){const X=He(v.key,v.subItems,S),Z=Ze(X,v.key);m.set(v.key,Z),D={...D,shape:De(Z.placements)},F=v.groupKey??v.key}return h.set(v.key,F),{key:v.key,desire:D,groupKey:F,item:v}});for(const{item:v,parentKey:K}of S.values()){if(!o.has(K))continue;const D=$.get(v.key),F=D?{...v.desire,position:D}:v.desire;h.set(v.key,v.groupKey),j.push({key:v.key,desire:F,groupKey:v.groupKey,item:v})}const B=Le({items:j,cols:L});return{layout:B,panelSubLayouts:m,components:et(B.placements,h)}},[C,L,a,$,S]),q=J?.unfit.join(",")??"";M.useEffect(()=>{},[q,L,J]);const Y=J?.rowsUsed??0;return I.jsxs("div",{ref:E,className:Q("relative w-full",T),style:{minHeight:Y>0?Y*R:void 0,...A},children:[k.map(c=>{const o=c.map(K=>K.key).join("|"),m=i?c.find(K=>K.key===i.key):void 0,h=m&&i?[i.dx,i.dy]:void 0,j=u&&c.some(K=>K.key===u.parentKey)?{parentKey:u.parentKey,subIndex:u.subIndex}:null,B=c.some(K=>$.has(K.key)),v=i?.members!=null&&m!=null;return I.jsx(tt,{members:c,block:R,gap:r,primitives:s,onItemError:p,draggable:f,panelSubLayouts:ee,dragKey:m?.key??null,dragOffset:h,wholeDrag:v,draggingSub:j,overridden:B,onItemDragStart:U,onComponentDragStart:G,onSubDragStart:V,onSubDragMove:re,onSubDragEnd:H,onDragMove:W,onDragEnd:oe},o)}),u&&(()=>{const c=s?.[u.ghostUi.type];return I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(u.panelCol+u.subCol)*R+u.dx,top:(u.panelRow+u.subRow)*R+u.dy,color:u.ghostColor},children:I.jsx(fe,{shape:u.ghostShape,block:R,gap:r,fill:u.ghostFill,stroke:u.ghostStroke,strokeWidth:u.ghostStrokeWidth,children:c?I.jsx(c,{...u.ghostUi}):null})})})()]})}const tt=M.memo(function({members:t,block:n,gap:r,primitives:a,onItemError:s,draggable:p=!1,panelSubLayouts:f,dragKey:y,dragOffset:g,wholeDrag:T=!1,draggingSub:A,overridden:E=!1,onItemDragStart:d,onComponentDragStart:b,onSubDragStart:C,onSubDragMove:L,onSubDragEnd:R,onDragMove:$,onDragEnd:N}){let i=1/0,l=1/0,w=0,S=0;for(const k of t)i=Math.min(i,k.col),l=Math.min(l,k.row),w=Math.max(w,k.col+k.cols),S=Math.max(S,k.row+k.rows);const P=Math.max(1,w-i),u=Math.max(1,S-l),x=M.useMemo(()=>{const k=Array.from({length:u},()=>new Array(P).fill(0));for(const q of t)for(let Y=0;Y<q.mask.length;Y++){const c=q.mask[Y];for(let o=0;o<c.length;o++)c[o]&&(k[q.row-l+Y][q.col-i+o]=1)}return k},[t,P,u,i,l]),_=M.useMemo(()=>Se(x.map(k=>k.map(Boolean)),{cell:n,gap:r,radius:24,inverseRadius:32}),[x,n,r]),U=t[0],G=U.item,V=M.useMemo(()=>de(G.theme??{}),[G.theme?.type,G.theme?.variant,G.theme?.gradient]);M.useEffect(()=>{if(s)for(const k of t){const q=k.item;q.ui&&!a?.[q.ui.type]&&s(k.key,{kind:"unknown-primitive",type:q.ui.type})}},[t,a,s]);const W=t.length===1&&!f.has(U.key),oe=(W||T)&&y===U.key,re=y!=null&&!W&&!T,H={position:"absolute",left:i*n,top:l*n,color:V.color};oe&&g?(H.transform=`translate(${g[0]}px, ${g[1]}px)`,H.zIndex=20):E&&(H.zIndex=10),p&&(H.cursor=oe?"grabbing":"grab",H.touchAction="none"),re||(H.clipPath=`path('${_}')`);const J=p&&W&&d?{onPointerDown:k=>d(U,k),onPointerMove:$,onPointerUp:N,onPointerCancel:N}:p&&!W&&b?{onPointerDown:k=>b(t,k),onPointerMove:$,onPointerUp:N,onPointerCancel:N}:void 0,ee=[];for(const k of t){const q=k.item,Y=k.col-i,c=k.row-l,o=f.get(k.key);if(o)for(const m of o.placements){const h=m.item,j=A?.parentKey===k.key&&A.subIndex===h.index,B=h.sub,v=B.ui?a?.[B.ui.type]:void 0,K=p&&C?{onPointerDown:D=>{D.stopPropagation(),C(k,h,m,D)},onPointerMove:L,onPointerUp:R,onPointerCancel:R}:void 0;ee.push(I.jsx("div",{className:"absolute",style:{left:(Y+m.col)*n,top:(c+m.row)*n,width:m.cols*n,height:m.rows*n,padding:Ie,opacity:j?0:void 0},children:I.jsx("div",{...K,className:Q("h-full w-full",p&&"cursor-grab touch-none"),children:v?I.jsx(v,{...B.ui}):I.jsx(Re,{type:B.ui.type})})},`${k.key}/${h.index}`))}else{const m=q.ui?a?.[q.ui.type]:void 0,h=p&&!W&&d?{onPointerDown:v=>{v.stopPropagation(),d(k,v)},onPointerMove:$,onPointerUp:N,onPointerCancel:N}:void 0,j=!W&&!T&&y===k.key,B=de(q.theme??{});ee.push(I.jsx("div",{className:"absolute",style:{left:Y*n,top:c*n,width:k.cols*n,height:k.rows*n,padding:Ie,transform:j&&g?`translate(${g[0]}px, ${g[1]}px)`:void 0,zIndex:j?30:void 0,background:j?B.cssBackground:void 0,color:j?B.color:void 0,borderRadius:j?24:void 0},children:I.jsx("div",{...h,className:Q("h-full w-full",p&&!W&&"cursor-grab touch-none"),children:m&&q.ui?I.jsx(m,{...q.ui}):q.ui?I.jsx(Re,{type:q.ui.type}):null})},k.key))}}return I.jsx("div",{...J,className:Q(p&&"select-none",V.elevated&&"drop-shadow-lg"),style:H,children:I.jsxs(fe,{shape:x,block:n,gap:r,fill:V.fill,stroke:V.stroke,strokeWidth:V.strokeWidth,pad:0,noClip:re,children:[V.accentBar&&I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:V.accentBar}}),ee]})})});function Re({type:e}){return I.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",I.jsx("code",{className:"ml-1",children:e})]})}je.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:`Record<
  string,
  ComponentType<Record<string, unknown>>
>`},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse.",defaultValue:{value:"{}",computed:!1}},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const it={title:"UI/Notch/NotchGrid",component:je,parameters:{layout:"fullscreen"}},nt=({label:e,value:t})=>I.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[I.jsx("div",{className:"text-xs opacity-75",children:e}),I.jsx("div",{className:"text-xl font-semibold",children:t})]}),ot=({label:e,children:t})=>I.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),ye={Label:nt,Center:ot},ae=(...e)=>e.map(t=>t.map(n=>n===1)),O=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),ie={args:{primitives:ye,items:[{key:"hero",desire:{shape:O(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:O(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:O(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:O(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},te={args:{primitives:ye,items:[{key:"panel",desire:{shape:O(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:O(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:O(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:O(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:O(1,1)},ui:{type:"Label",label:"B"}}]}]}},ne={args:{primitives:ye,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:ae([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:ae([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:ae([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:ae([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:O(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:O(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:O(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:O(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};ie.parameters={...ie.parameters,docs:{...ie.parameters?.docs,source:{originalSource:`{
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
}`,...ne.parameters?.docs?.source},description:{story:"Outer-grid drag over rich notched footprints:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...ne.parameters?.docs?.description}}};const lt=["Basic","SubItems","Draggable"];export{ie as Basic,ne as Draggable,te as SubItems,lt as __namedExportsOrder,it as default};
