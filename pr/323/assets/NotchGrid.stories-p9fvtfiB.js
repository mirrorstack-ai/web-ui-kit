import{r as R,j as M}from"./iframe-SqzSaPxr.js";import{c as ne}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const Me=(e,t)=>`${e},${t}`;function ie(e){let t=0;for(const n of e)t=Math.max(t,n.length);return t}function Oe(e,t){return e.map(n=>n.map(a=>a>=1&&a<=t))}function Ae(e,{cell:t,radius:n=24,inverseRadius:a=32,gap:s=0,bleed:i=0}){const p=e.length,d=(b,m)=>b>=0&&b<p&&m>=0&&m<e[b].length&&!!e[b][m],y=Math.max(0,Math.min(s,t-2))/2-i,x=new Map,N=(b,m)=>{const $=Me(b[0],b[1]),P=x.get($);P?P.push(m):x.set($,[m])};for(let b=0;b<p;b++)for(let m=0;m<e[b].length;m++){if(!e[b][m])continue;const $=[m,b],P=[m+1,b],D=[m+1,b+1],S=[m,b+1];d(b-1,m)||N($,P),d(b,m+1)||N(P,D),d(b+1,m)||N(D,S),d(b,m-1)||N(S,$)}const L=new Set,E=[],V=(b,m)=>`${b}>${m[0]},${m[1]}`;for(const[b,m]of x){const[$,P]=b.split(",").map(Number);for(const D of m){if(L.has(V(b,D)))continue;const S=[];let A=[$,P],K=b,r=D,u=[0,0];for(;r;){const w=V(K,r);if(L.has(w))break;L.add(w),S.push(A),u=[r[0]-A[0],r[1]-A[1]],A=r,K=Me(r[0],r[1]);const k=x.get(K)??[];let c=null,T=Number.POSITIVE_INFINITY;for(const I of k){if(L.has(V(K,I)))continue;const O=I[0]-A[0],G=I[1]-A[1],Y=u[0]*G-u[1]*O;Y<T&&(T=Y,c=I)}r=c}const h=Ve(S).map(([w,k])=>[w*t,k*t]);if(h.length>=3){const w=y!==0?Ge(h,y):h;E.push(We(w,n,a))}}}return E.join(" ")}function Ve(e){const t=e.length,n=[];for(let a=0;a<t;a++){const s=e[(a-1+t)%t],i=e[a],p=e[(a+1)%t],d=i[0]-s[0],y=i[1]-s[1],x=p[0]-i[0],N=p[1]-i[1];d*N-y*x!==0&&n.push(i)}return n}function Ge(e,t){const n=e.length,a=e.map((i,p)=>{const d=e[(p+1)%n],y=Math.sign(d[0]-i[0]),x=Math.sign(d[1]-i[1]);return x===0?{axis:"y",value:i[1]+y*t}:{axis:"x",value:i[0]+-x*t}}),s=[];for(let i=0;i<n;i++){const p=a[(i-1+n)%n],d=a[i],y=p.axis==="x"?p.value:d.value,x=p.axis==="y"?p.value:d.value;s.push([y,x])}return s}function We(e,t,n){const a=e.length,s=[];for(let i=0;i<a;i++){const p=e[(i-1+a)%a],d=e[i],y=e[(i+1)%a],x=Ie(p,d),N=Ie(d,y),L=Re(p,d),E=Re(d,y),b=L[0]*E[1]-L[1]*E[0]>0,m=Math.min(b?t:n,x/2,N/2),$=[d[0]-L[0]*m,d[1]-L[1]*m],P=[d[0]+E[0]*m,d[1]+E[1]*m];s.push(`${i===0?"M":"L"} ${Se($)}`),m>0&&s.push(`A ${fe(m)} ${fe(m)} 0 0 ${b?1:0} ${Se(P)}`)}return s.push("Z"),s.join(" ")}function Ie(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function Re(e,t){return[Math.sign(t[0]-e[0]),Math.sign(t[1]-e[1])]}function fe(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Se(e){return`${fe(e[0])},${fe(e[1])}`}const $e=96;function we({shape:e,tier:t=1,block:n=$e,gap:a=0,bleed:s=0,radius:i=24,inverseRadius:p=32,fill:d="var(--color-surface-container-low)",stroke:y="var(--color-outline-variant)",strokeWidth:x=1,children:N,pad:L="16px 8px",noClip:E=!1,className:V,style:b}){const $=`block-shape-clip-${R.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,P=e.length,D=ie(e),S=R.useMemo(()=>Oe(e,t),[e,t]),A=D*n,K=P*n,r=R.useMemo(()=>Ae(S,{cell:n,gap:a,bleed:s,radius:i,inverseRadius:p}),[S,n,a,s,i,p]),u=x/2,h=s+u;return M.jsxs("div",{className:ne("relative",V),style:{width:A,height:K,...b},children:[M.jsxs("svg",{width:A+2*s,height:K+2*s,viewBox:`${-h} ${-h} ${A+2*h} ${K+2*h}`,className:"pointer-events-none absolute",style:{left:-s,top:-s},"aria-hidden":"true",children:[!E&&M.jsx("defs",{children:M.jsx("clipPath",{id:$,clipPathUnits:"userSpaceOnUse",children:M.jsx("path",{d:r})})}),M.jsx("path",{d:r,fill:d,stroke:y,strokeWidth:x,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),M.jsx("div",{className:ne("absolute inset-0",!E&&"overflow-hidden"),style:{padding:L,clipPath:E?void 0:`url(#${$})`},children:N})]})}we.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},bleed:{required:!1,tsType:{name:"number"},description:"Expand the outline OUTWARD by `bleed` px (inverse of `gap`) so the frame\n can sit beyond the cells. The SVG grows to avoid clipping; content stays\n in the cell box. Default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Padding on the content layer. Default 16px top/bottom, 8px sides.",defaultValue:{value:'"16px 8px"',computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ne=1e5;function Be(e){let t=1,n=1;for(const s of e)t=Math.max(t,s.row+s.rows),n=Math.max(n,s.col+s.cols);const a=Array.from({length:t},()=>Array(n).fill(!1));for(const s of e)for(let i=0;i<s.rows;i++)for(let p=0;p<s.cols;p++)a[s.row+i][s.col+p]=!0;return a}const Fe={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function be(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.keys(e);return t.length>0&&t.every(n=>/^\d+$/.test(n))}function Le(e){return be(e)?Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>[t,e[t]]):[["0",e]]}function ze(e,t){if(t<=1)return e;const n=Math.floor(t),a=[];for(let s=0;s<e.length;s++)for(let i=0;i<n;i++){const p=[];for(let d=0;d<e[s].length;d++)for(let y=0;y<n;y++)p.push(e[s][d]);a.push(p)}return a}function De(e,t){const n={...Fe,...t},a=Math.max(1,Math.floor(e.cols)),s=[],i=r=>{for(;s.length<=r;)s.push(new Array(a).fill(!1))},p=(r,u,h)=>{for(let w=0;w<r.length;w++){const k=r[w];for(let c=0;c<k.length;c++){if(!k[c])continue;const T=u+c;if(T<0||T>=a)return!0;const I=h+w;if(i(I),s[I][T])return!0}}return!1},d=(r,u,h)=>{for(let w=0;w<r.length;w++){const k=r[w];for(let c=0;c<k.length;c++)k[c]&&(i(h+w),s[h+w][u+c]=!0)}},y=(r,u,h)=>n.W_pos*Number(r)+n.W_shape*Number(u)+n.W_scale*(h-1),x=r=>{const u=r.desire.position===void 0?[["0",void 0]]:Le(r.desire.position),h=Le(r.desire.shape),w=r.desire.scale?Array.from({length:n.maxScale},(c,T)=>T+1):[1],k=[];for(const[c,T]of u)for(const[I,O]of h)for(const G of w){const Y=G===1?O:ze(O,G);k.push({posKey:c,shapeKey:I,pos:T,mask:Y,scale:G,cost:y(c,I,G)})}return k.sort((c,T)=>c.cost-T.cost),k},N=(r,u,h,w)=>(d(u.mask,h,w),{key:r.key,item:r.item,col:h,row:w,mask:u.mask,cols:ie(u.mask),rows:u.mask.length,priorityUsed:{position:u.posKey,shape:u.shapeKey},scale:u.scale,cost:u.cost}),L=(r,u)=>{const h=ie(u.mask);if(h>a)return null;const w=(k,c)=>N(r,u,k,c);if(u.pos){const[k,c]=u.pos;return k>=0&&k+h<=a&&c>=0&&!p(u.mask,k,c)?w(k,c):null}for(let k=0;k<Ne;k++)for(let c=0;c+h<=a;c++)if(!p(u.mask,c,k))return w(c,k);return null},E=r=>{for(const u of x(r)){const h=L(r,u);if(h)return h}return null},V=r=>{const u=r.desire.position;if(u===void 0||be(u))return null;const[h,w]=u,k=x(r)[0];if(!k)return null;const c=ie(k.mask);if(c>a)return null;for(let T=0;T<Ne;T++)for(let I=Math.max(0,w-T);I<=w+T;I++)for(let O=Math.max(0,h-T);O+c<=a;O++)if(Math.max(Math.abs(I-w),Math.abs(O-h))===T&&!p(k.mask,O,I))return N(r,k,O,I);return null},b=r=>{const u=r.desire.position;return u!==void 0&&!be(u)},m=[],$=[],P=[];for(const r of e.items)if(b(r)){const u=E(r);if(u)m.push(u);else{const h=V(r);h?m.push(h):P.push({...r,desire:{...r.desire,position:void 0}})}}else P.push(r);for(const r of P){const u=E(r);u?m.push(u):$.push(r.key)}let D=0,S=0;for(const r of m){const u=x(e.items.find(h=>h.key===r.key));D+=r.cost,S+=u[u.length-1]?.cost??0}const A=S===0?1:1-D/S;let K=0;for(const r of m)K=Math.max(K,r.row+r.rows);return{placements:m,rowsUsed:K,unfit:$,satisfaction:A}}const Xe="neutral",Ye={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},He={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},ue={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ze={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Qe={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Je(e){const t=e.variant??"auto",n=t==="auto"?Xe:t,a=e.type??"auto";return{type:a==="auto"?t==="auto"?"ghost":"filled":a,variant:n}}function Te(e,t){if(t<=0||e==="transparent")return e;const n=Math.min(1,t)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${n}%) 0%, ${e} 100%)`}function le(e){const t=e??{},{type:n,variant:a}=Je(t),s=t.gradient??0;switch(n){case"filled":{const i=Ye[a];return{fill:i,cssBackground:Te(i,s),color:He[a],stroke:"none",strokeWidth:0,elevated:!1,noChrome:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:ue[a],stroke:Ze[a],strokeWidth:1,elevated:!1,noChrome:!1};case"elevated":{const i=a==="warn"||a==="error",p=Qe[a];return{fill:p,cssBackground:Te(p,s),color:ue[a],stroke:"none",strokeWidth:0,...i?{accentBar:ue[a]}:{},elevated:!0,noChrome:!1}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:ue[a],stroke:"none",strokeWidth:0,elevated:!1,noChrome:!0}}}const et="16px 8px",tt=.25;function ge(e,t){try{e.setPointerCapture(t)}catch{}}function je(e,t){try{e.releasePointerCapture(t)}catch{}}const pe=e=>e,xe=(e,t)=>`${e}::${t}`;function Pe(e,t){return[Math.max(0,Math.round(((e.panelCol+e.subCol)*t+e.dx)/t)),Math.max(0,Math.round(((e.panelRow+e.subRow)*t+e.dy)/t))]}function Ee({col:e,row:t,cols:n,rows:a,blockPx:s,contentPad:i,color:p}){return M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-20",style:{left:e*s,top:t*s,width:n*s,height:a*s,padding:i},children:M.jsx("div",{className:"h-full w-full rounded-[22px] border-2 border-dashed",style:{borderColor:p,opacity:.6}})})}function nt(e){return e.map(t=>t.map(n=>n?1:0))}function ot(e){return e.every(t=>t.key!=null)?e:e.map((t,n)=>t.key?t:{...t,key:`item-${n}`})}function qe(e){if(Array.isArray(e))return e;const t=Object.keys(e).sort((n,a)=>Number(n)-Number(a));return e[t[0]]}function rt(e){let t=1;for(const{sub:n}of e){const a=ie(qe(n.desire.shape)),s=n.desire.position,i=Array.isArray(s)?s[0]:0;t=Math.max(t,i+a)}return t}function st(e,t,n){const a=[];return t.forEach((s,i)=>{n.has(xe(e,i))||a.push({sub:s,index:i})}),a}function at(e,t){return De({items:e.map(n=>({key:xe(t,n.index),desire:n.sub.desire,item:n})),cols:rt(e)})}function _e(e){const t=[];for(let n=0;n<e.mask.length;n++){const a=e.mask[n];for(let s=0;s<a.length;s++)a[s]&&t.push([e.col+s,e.row+n])}return t}function it(e){if(e.length<=1)return e.length?[[...e]]:[];const t=e.map(_e),n=new Array(e.length).fill(!1),a=(i,p)=>{for(const[d,y]of t[i])for(const[x,N]of t[p])if(Math.abs(d-x)<=1&&Math.abs(y-N)<=1)return!0;return!1},s=[];for(let i=0;i<e.length;i++){if(n[i])continue;n[i]=!0;const p=[i],d=[];for(;p.length;){const y=p.shift();d.push(e[y]);for(let x=0;x<e.length;x++)!n[x]&&a(y,x)&&(n[x]=!0,p.push(x))}s.push(d)}return s}function lt(e,t){let n=1/0;for(const[a,s]of e)for(const[i,p]of t){const d=Math.max(Math.abs(a-i),Math.abs(s-p));if(d<n&&(n=d,n<=1))return n}return n}function ct(e,t,n,a){const s=e.map(p=>p.flatMap(d=>_e(d))),i=tt*t;return e.map((p,d)=>{let y=1/0;for(let L=0;L<e.length;L++){if(L===d)continue;const E=lt(s[d],s[L]);E<y&&(y=E)}if(y===1/0)return{gap:n,bleed:a};const x=Math.max(0,y-1)*t,N=Math.min(a,x/2-i/2);return N>=0?{gap:n,bleed:N}:{gap:Math.max(n,-2*N),bleed:0}})}function ut(e,t){const n=new Map;e.forEach((s,i)=>{const p=t.get(s.key),d=p!=null?`g:${p}`:`s:${i}`,y=n.get(d);y?y.push(s):n.set(d,[s])});const a=[];for(const s of n.values())for(const i of it(s))a.push(i);return a}function Ue({items:e,cols:t="auto",blockMin:n=$e,gap:a=8,contentPad:s=et,panelBleed:i=0,nest:p=!0,primitives:d={},onItemError:y,draggable:x=!1,onItemMove:N,onSubItemPromote:L,className:E,style:V}){const b=R.useRef(null),[m,$]=R.useState(null);R.useLayoutEffect(()=>{const l=b.current;if(!l)return;const o=()=>$(l.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const f=new ResizeObserver(o);return f.observe(l),()=>f.disconnect()},[]);const P=R.useMemo(()=>ot(e),[e]),{resolvedCols:D,block:S}=R.useMemo(()=>{if(t!=="auto")return{resolvedCols:t,block:n};if(m==null)return{resolvedCols:null,block:n};const l=Math.max(1,Math.floor(m/n));return{resolvedCols:l,block:m/l}},[t,n,m]),[A,K]=R.useState(new Map),[r,u]=R.useState(null),h=R.useRef(null);h.current=r;const[w,k]=R.useState(new Map),[c,T]=R.useState(null),I=R.useRef(null);I.current=c;const O=R.useCallback((l,o)=>{o.button!=null&&o.button!==0||(ge(o.currentTarget,o.pointerId),u({key:l.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:l.col,originRow:l.row,originCols:l.cols,originRows:l.rows,color:le(l.item?.theme??{}).color,dx:0,dy:0}))},[]),G=R.useCallback((l,o)=>{if(o.button!=null&&o.button!==0)return;ge(o.currentTarget,o.pointerId);const f=l[0];u({key:f.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:f.col,originRow:f.row,originCols:f.cols,originRows:f.rows,color:le(f.item?.theme??{}).color,dx:0,dy:0,members:l.map(v=>({key:v.key,col:v.col,row:v.row,cols:v.cols,rows:v.rows}))})},[]),Y=R.useCallback((l,o,f,v)=>{if(v.button!=null&&v.button!==0)return;ge(v.currentTarget,v.pointerId);const j=le(l.item.theme??{});T({parentKey:l.key,subIndex:o.index,pointerId:v.pointerId,startX:v.clientX,startY:v.clientY,dx:0,dy:0,panelCol:l.col,panelRow:l.row,panelCols:l.cols,panelRows:l.rows,subCol:f.col,subRow:f.row,ghostShape:nt(f.mask),ghostFill:j.fill,ghostStroke:j.stroke,ghostStrokeWidth:j.strokeWidth,ghostUi:o.sub.ui,ghostColor:j.color})},[]),B=R.useCallback(l=>{const o=h.current;if(!o||l.pointerId!==o.pointerId)return;const f=l.clientX-o.startX,v=l.clientY-o.startY;f===o.dx&&v===o.dy||u({...o,dx:f,dy:v})},[]),J=R.useCallback(l=>{const o=h.current;if(!o||l.pointerId!==o.pointerId)return;h.current=null,je(l.currentTarget,l.pointerId),u(null);const f=S||n,v=D??1;if(o.members){const z=Math.min(...o.members.map(X=>X.col)),U=Math.min(...o.members.map(X=>X.row)),he=Math.max(...o.members.map(X=>X.col+X.cols)),te=Math.max(-z,Math.min(v-he,Math.round(o.dx/f))),ye=Math.max(-U,Math.round(o.dy/f));if(te===0&&ye===0)return;K(X=>{const Ce=new Map(X);for(const ve of o.members)Ce.set(ve.key,[ve.col+te,ve.row+ye]);return Ce});for(const X of o.members)N?.(X.key,[X.col+te,X.row+ye]);return}const j=Math.max(0,v-o.originCols),_=Math.min(j,Math.max(0,o.originCol+Math.round(o.dx/f))),g=Math.max(0,o.originRow+Math.round(o.dy/f)),F=[_,g];K(z=>new Map(z).set(o.key,F)),N?.(o.key,F)},[S,n,D,N]),ce=R.useCallback(l=>{const o=I.current;if(!o||l.pointerId!==o.pointerId)return;const f=l.clientX-o.startX,v=l.clientY-o.startY;f===o.dx&&v===o.dy||T({...o,dx:f,dy:v})},[]),ee=R.useCallback(l=>{const o=I.current;if(!o||l.pointerId!==o.pointerId)return;I.current=null,je(l.currentTarget,l.pointerId),T(null);const f=Pe(o,S||n),v=xe(o.parentKey,o.subIndex),j=P.find(g=>g.key===o.parentKey),_=j?.subItems?.[o.subIndex];_&&k(g=>new Map(g).set(v,{parentKey:o.parentKey,item:{key:`promoted::${v}`,desire:{position:f,shape:qe(_.desire.shape)},theme:{...j.theme,..._.theme},groupKey:j.groupKey??o.parentKey,ui:_.ui}})),K(g=>g.has(o.parentKey)?g:new Map(g).set(o.parentKey,[o.panelCol,o.panelRow])),L?.(o.parentKey,o.subIndex,f)},[S,n,P,L]),H=r!==null||c!==null;R.useEffect(()=>{if(!H)return;const l=f=>{I.current?ce(pe(f)):h.current&&B(pe(f))},o=f=>{I.current?ee(pe(f)):h.current&&J(pe(f))};return window.addEventListener("pointermove",l),window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",o),window.removeEventListener("pointercancel",o)}},[H,B,J,ce,ee]);const{layout:oe,panelSubLayouts:re,components:C}=R.useMemo(()=>{const l={layout:null,panelSubLayouts:new Map,components:[]};if(D==null)return l;const o=new Set(P.map(g=>g.key)),f=new Map,v=new Map,j=P.map(g=>{const F=A.get(g.key);let z=F?{...g.desire,position:F}:g.desire,U=g.groupKey;if(g.subItems&&g.subItems.length>0){const he=st(g.key,g.subItems,w),te=at(he,g.key);f.set(g.key,te),z={...z,shape:Be(te.placements)},U=g.groupKey??g.key}return v.set(g.key,U),{key:g.key,desire:z,groupKey:U,item:g}});for(const{item:g,parentKey:F}of w.values()){if(!o.has(F))continue;const z=A.get(g.key),U=z?{...g.desire,position:z}:g.desire;v.set(g.key,g.groupKey),j.push({key:g.key,desire:U,groupKey:g.groupKey,item:g})}const _=De({items:j,cols:D});return{layout:_,panelSubLayouts:f,components:ut(_.placements,v)}},[P,D,p,A,w]),q=R.useMemo(()=>ct(C,S,a,i),[C,S,a,i]),Z=oe?.unfit.join(",")??"";R.useEffect(()=>{},[Z,D,oe]);const Q=oe?.rowsUsed??0;return M.jsxs("div",{ref:b,className:ne("relative w-full",E),style:{minHeight:Q>0?Q*S:void 0,...V},children:[C.map((l,o)=>{const f=l.map(U=>U.key).join("|"),v=q[o]??{gap:a,bleed:i},j=r?l.find(U=>U.key===r.key):void 0,_=j&&r?[r.dx,r.dy]:void 0,g=c&&l.some(U=>U.key===c.parentKey)?{parentKey:c.parentKey,subIndex:c.subIndex}:null,F=l.some(U=>A.has(U.key)),z=r?.members!=null&&j!=null;return M.jsx(pt,{members:l,block:S,gap:v.gap,contentPad:s,panelBleed:v.bleed,primitives:d,onItemError:y,draggable:x,panelSubLayouts:re,dragKey:j?.key??null,dragOffset:_,wholeDrag:z,draggingSub:g,overridden:F,onItemDragStart:O,onComponentDragStart:G,onSubDragStart:Y,onSubDragMove:ce,onSubDragEnd:ee,onDragMove:B,onDragEnd:J},f)}),c&&(()=>{const l=S||n,[o,f]=Pe(c,l);return M.jsx(Ee,{col:o,row:f,cols:c.ghostShape[0]?.length??1,rows:c.ghostShape.length,blockPx:l,contentPad:s,color:c.ghostColor})})(),r&&!r.members&&(()=>{const l=S||n,f=Math.max(0,(D??1)-r.originCols),v=Math.min(f,Math.max(0,r.originCol+Math.round(r.dx/l))),j=Math.max(0,r.originRow+Math.round(r.dy/l));return M.jsx(Ee,{col:v,row:j,cols:r.originCols,rows:r.originRows,blockPx:l,contentPad:s,color:r.color})})(),c&&(()=>{const l=d?.[c.ghostUi.type];return M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(c.panelCol+c.subCol)*S+c.dx,top:(c.panelRow+c.subRow)*S+c.dy,color:c.ghostColor},children:M.jsx(we,{shape:c.ghostShape,block:S,gap:a,bleed:i,pad:s,fill:c.ghostFill,stroke:c.ghostStroke,strokeWidth:c.ghostStrokeWidth,children:l?M.jsx(l,{...c.ghostUi}):null})})})()]})}const pt=R.memo(function({members:t,block:n,gap:a,contentPad:s,panelBleed:i,primitives:p,onItemError:d,draggable:y=!1,panelSubLayouts:x,dragKey:N,dragOffset:L,wholeDrag:E=!1,draggingSub:V,overridden:b=!1,onItemDragStart:m,onComponentDragStart:$,onSubDragStart:P,onSubDragMove:D,onSubDragEnd:S,onDragMove:A,onDragEnd:K}){let r=1/0,u=1/0,h=0,w=0;for(const C of t)r=Math.min(r,C.col),u=Math.min(u,C.row),h=Math.max(h,C.col+C.cols),w=Math.max(w,C.row+C.rows);const k=Math.max(1,h-r),c=Math.max(1,w-u),T=R.useMemo(()=>{const C=Array.from({length:c},()=>new Array(k).fill(0));for(const q of t)for(let Z=0;Z<q.mask.length;Z++){const Q=q.mask[Z];for(let l=0;l<Q.length;l++)Q[l]&&(C[q.row-u+Z][q.col-r+l]=1)}return C},[t,k,c,r,u]),I=t.length===1&&!x.has(t[0].key),O=R.useMemo(()=>Ae(T.map(C=>C.map(Boolean)),{cell:n,gap:a,bleed:i,radius:24,inverseRadius:32}),[T,n,a,i]),G=t[0],Y=G.item,B=R.useMemo(()=>le(Y.theme??{}),[Y.theme?.type,Y.theme?.variant,Y.theme?.gradient]);R.useEffect(()=>{if(d)for(const C of t){const q=C.item;q.ui&&!p?.[q.ui.type]&&d(C.key,{kind:"unknown-primitive",type:q.ui.type})}},[t,p,d]);const J=(I||E)&&N===G.key,ee=N!=null&&!I&&!E||B.noChrome,H={position:"absolute",left:r*n,top:u*n,color:B.color};J&&L?(H.transform=`translate(${L[0]}px, ${L[1]}px)`,H.zIndex=20):b&&(H.zIndex=10),y&&(H.cursor=J?"grabbing":"grab",H.touchAction="none"),ee||(H.clipPath=`path('${O}')`);const oe=y&&I&&m?{onPointerDown:C=>m(G,C),onPointerMove:A,onPointerUp:K,onPointerCancel:K}:y&&!I&&$?{onPointerDown:C=>$(t,C),onPointerMove:A,onPointerUp:K,onPointerCancel:K}:void 0,re=[];for(const C of t){const q=C.item,Z=C.col-r,Q=C.row-u,l=x.get(C.key);if(l)for(const o of l.placements){const f=o.item,v=V?.parentKey===C.key&&V.subIndex===f.index,j=f.sub,_=j.ui?p?.[j.ui.type]:void 0,g=y&&P?{onPointerDown:F=>{F.stopPropagation(),P(C,f,o,F)},onPointerMove:D,onPointerUp:S,onPointerCancel:S}:void 0;re.push(M.jsx("div",{className:"absolute",style:{left:(Z+o.col)*n,top:(Q+o.row)*n,width:o.cols*n,height:o.rows*n,padding:s,opacity:v?0:void 0},children:M.jsx("div",{...g,className:ne("h-full w-full",y&&"cursor-grab touch-none"),children:_?M.jsx(_,{...j.ui}):M.jsx(Ke,{type:j.ui.type})})},`${C.key}/${f.index}`))}else{const o=q.ui?p?.[q.ui.type]:void 0,f=y&&!I&&m?{onPointerDown:_=>{_.stopPropagation(),m(C,_)},onPointerMove:A,onPointerUp:K,onPointerCancel:K}:void 0,v=!I&&!E&&N===C.key,j=le(q.theme??{});re.push(M.jsx("div",{className:"absolute",style:{left:Z*n,top:Q*n,width:C.cols*n,height:C.rows*n,padding:s,transform:v&&L?`translate(${L[0]}px, ${L[1]}px)`:void 0,zIndex:v?30:void 0,background:v?j.cssBackground:void 0,color:v?j.color:void 0,borderRadius:v?24:void 0},children:M.jsx("div",{...f,className:ne("h-full w-full",y&&!I&&"cursor-grab touch-none"),children:o&&q.ui?M.jsx(o,{...q.ui}):q.ui?M.jsx(Ke,{type:q.ui.type}):null})},C.key))}}return M.jsx("div",{...oe,className:ne(y&&"select-none",B.elevated&&"drop-shadow-lg"),style:H,children:M.jsxs(we,{shape:T,block:n,gap:a,bleed:i,fill:B.fill,stroke:B.stroke,strokeWidth:B.strokeWidth,pad:0,noClip:ee,children:[B.accentBar&&M.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:B.accentBar}}),re]})})});function Ke({type:e}){return M.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",M.jsx("code",{className:"ml-1",children:e})]})}Ue.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},contentPad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:'CSS padding inset on each tile / sub-cell\'s content. Default `"16px 8px"`.\n Lower it (or `0`) for fine-resolution grids where a tile may be only a\n fraction of a block tall — the default would over-pad short cells.',defaultValue:{value:'"16px 8px"',computed:!1}},panelBleed:{required:!1,tsType:{name:"number"},description:"Expand each panel's outline OUTWARD by `panelBleed` px so its frame can sit\n beyond the cells — lets the outer frame match the inter-tile gap instead of\n being half of it. Pair with a `contentPad` of the same value for uniform\n spacing. Default 0.",defaultValue:{value:"0",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:`Record<
  string,
  ComponentType<Record<string, unknown>>
>`},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse.",defaultValue:{value:"{}",computed:!1}},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const vt={title:"UI/Notch/NotchGrid",component:Ue,parameters:{layout:"fullscreen"}},dt=({label:e,value:t})=>M.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[M.jsx("div",{className:"text-xs opacity-75",children:e}),M.jsx("div",{className:"text-xl font-semibold",children:t})]}),mt=({label:e,children:t})=>M.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:t??e}),ke={Label:dt,Center:mt},de=(...e)=>e.map(t=>t.map(n=>n===1)),W=(e,t)=>Array.from({length:t},()=>Array(e).fill(!0)),me={args:{primitives:ke,items:[{key:"hero",desire:{shape:W(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:W(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:W(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:W(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},se={args:{primitives:ke,items:[{key:"panel",desire:{shape:W(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:W(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:W(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:W(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:W(1,1)},ui:{type:"Label",label:"B"}}]}]}},ae={args:{primitives:ke,cols:8,blockMin:96,draggable:!0,onItemMove:(e,t)=>{console.log("[NotchGrid story] drop:",e,t)},onSubItemPromote:(e,t,n)=>{console.log("[NotchGrid story] sub drop:",e,t,n)},items:[{key:"L",desire:{position:[0,0],shape:de([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:de([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:de([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:de([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:W(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:W(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:W(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:W(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};me.parameters={...me.parameters,docs:{...me.parameters?.docs,source:{originalSource:`{
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
}`,...me.parameters?.docs?.source}}};se.parameters={...se.parameters,docs:{...se.parameters?.docs,source:{originalSource:`{
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
}`,...se.parameters?.docs?.source},description:{story:`Sub-items inside a single themed panel. The panel's footprint is the
 union of the sub-items' masks (so notches appear where no sub-cell sits).`,...se.parameters?.docs?.description}}};ae.parameters={...ae.parameters,docs:{...ae.parameters?.docs,source:{originalSource:`{
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
}`,...ae.parameters?.docs?.source},description:{story:"Outer-grid drag over rich notched footprints:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...ae.parameters?.docs?.description}}};const gt=["Basic","SubItems","Draggable"];export{me as Basic,ae as Draggable,se as SubItems,gt as __namedExportsOrder,vt as default};
