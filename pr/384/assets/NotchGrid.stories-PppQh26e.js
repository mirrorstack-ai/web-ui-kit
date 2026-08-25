import{r as S,j as I}from"./iframe-D6GnR5sj.js";import{c as te}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const Me=(e,n)=>`${e},${n}`;function ae(e){let n=0;for(const t of e)n=Math.max(n,t.length);return n}function Ue(e,n){return e.map(t=>t.map(a=>a>=1&&a<=n))}function Ke(e,{cell:n,radius:t=24,inverseRadius:a=32,gap:r=0,bleed:i=0}){const m=e.length,p=(g,h)=>g>=0&&g<m&&h>=0&&h<e[g].length&&!!e[g][h],w=Math.max(0,Math.min(r,n-2))/2-i,y=new Map,C=(g,h)=>{const K=Me(g[0],g[1]),E=y.get(K);E?E.push(h):y.set(K,[h])};for(let g=0;g<m;g++)for(let h=0;h<e[g].length;h++){if(!e[g][h])continue;const K=[h,g],E=[h+1,g],D=[h+1,g+1],L=[h,g+1];p(g-1,h)||C(K,E),p(g,h+1)||C(E,D),p(g+1,h)||C(D,L),p(g,h-1)||C(L,K)}const N=new Set,R=[],A=(g,h)=>`${g}>${h[0]},${h[1]}`;for(const[g,h]of y){const[K,E]=g.split(",").map(Number);for(const D of h){if(N.has(A(g,D)))continue;const L=[];let $=[K,E],q=g,s=D,u=[0,0];for(;s;){const x=A(q,s);if(N.has(x))break;N.add(x),L.push($),u=[s[0]-$[0],s[1]-$[1]],$=s,q=Me(s[0],s[1]);const k=y.get(q)??[];let c=null,P=Number.POSITIVE_INFINITY;for(const T of k){if(N.has(A(q,T)))continue;const _=T[0]-$[0],z=T[1]-$[1],H=u[0]*z-u[1]*_;H<P&&(P=H,c=T)}s=c}const f=Oe(L).map(([x,k])=>[x*n,k*n]);if(f.length>=3){const x=w!==0?Ve(f,w):f;R.push(Be(x,t,a))}}}return R.join(" ")}function Oe(e){const n=e.length,t=[];for(let a=0;a<n;a++){const r=e[(a-1+n)%n],i=e[a],m=e[(a+1)%n],p=i[0]-r[0],w=i[1]-r[1],y=m[0]-i[0],C=m[1]-i[1];p*C-w*y!==0&&t.push(i)}return t}function Ve(e,n){const t=e.length,a=e.map((i,m)=>{const p=e[(m+1)%t],w=Math.sign(p[0]-i[0]),y=Math.sign(p[1]-i[1]);return y===0?{axis:"y",value:i[1]+w*n}:{axis:"x",value:i[0]+-y*n}}),r=[];for(let i=0;i<t;i++){const m=a[(i-1+t)%t],p=a[i],w=m.axis==="x"?m.value:p.value,y=m.axis==="y"?m.value:p.value;r.push([w,y])}return r}function Be(e,n,t){const a=e.length,r=[];for(let i=0;i<a;i++){const m=e[(i-1+a)%a],p=e[i],w=e[(i+1)%a],y=Ie(m,p),C=Ie(p,w),N=Re(m,p),R=Re(p,w),g=N[0]*R[1]-N[1]*R[0]>0,h=Math.min(g?n:t,y/2,C/2),K=[p[0]-N[0]*h,p[1]-N[1]*h],E=[p[0]+R[0]*h,p[1]+R[1]*h];r.push(`${i===0?"M":"L"} ${Ne(K)}`),h>0&&r.push(`A ${me(h)} ${me(h)} 0 0 ${g?1:0} ${Ne(E)}`)}return r.push("Z"),r.join(" ")}function Ie(e,n){return Math.abs(n[0]-e[0])+Math.abs(n[1]-e[1])}function Re(e,n){return[Math.sign(n[0]-e[0]),Math.sign(n[1]-e[1])]}function me(e){return Number.isInteger(e)?String(e):e.toFixed(2)}function Ne(e){return`${me(e[0])},${me(e[1])}`}const De=96;function we({shape:e,tier:n=1,block:t=De,gap:a=0,bleed:r=0,radius:i=24,inverseRadius:m=32,fill:p="var(--color-surface-container-low)",stroke:w="var(--color-outline-variant)",strokeWidth:y=1,children:C,pad:N="16px 8px",noClip:R=!1,className:A,style:g}){const K=`block-shape-clip-${S.useId().replace(/[^a-zA-Z0-9_-]/g,"")}`,E=e.length,D=ae(e),L=S.useMemo(()=>Ue(e,n),[e,n]),$=D*t,q=E*t,s=S.useMemo(()=>Ke(L,{cell:t,gap:a,bleed:r,radius:i,inverseRadius:m}),[L,t,a,r,i,m]),u=y/2,f=r+u;return I.jsxs("div",{className:te("relative",A),style:{width:$,height:q,...g},children:[I.jsxs("svg",{width:$+2*r,height:q+2*r,viewBox:`${-f} ${-f} ${$+2*f} ${q+2*f}`,className:"pointer-events-none absolute",style:{left:-r,top:-r},"aria-hidden":"true",children:[!R&&I.jsx("defs",{children:I.jsx("clipPath",{id:K,clipPathUnits:"userSpaceOnUse",children:I.jsx("path",{d:s})})}),I.jsx("path",{d:s,fill:p,stroke:w,strokeWidth:y,vectorEffect:"non-scaling-stroke",fillRule:"evenodd"})]}),I.jsx("div",{className:te("absolute inset-0",!R&&"overflow-hidden"),style:{padding:N,clipPath:R?void 0:`url(#${K})`},children:C})]})}we.__docgenInfo={description:"",methods:[],displayName:"BlockShape",props:{shape:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>"},description:"Footprint matrix. Cell values:\n - `0`  — always empty (a notch / hole)\n - `1`  — part of the shape at every size tier\n - `2+` — joins the shape only once that tier is reached (responsive growth)\n\ne.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut."},tier:{required:!1,tsType:{name:"number"},description:"Active size tier (>= 1). Cells whose value exceeds `tier` render as empty.",defaultValue:{value:"1",computed:!1}},block:{required:!1,tsType:{name:"number"},description:"Block edge length in px. Default {@link BLOCK_SIZE}.",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Erode the outline by `gap / 2` px (outer edges in, notch holes out) so\n neighbours / nested items leave a `gap`-px space. Footprint size is\n unchanged. Normally set by the parent `NotchGrid`; default 0.",defaultValue:{value:"0",computed:!1}},bleed:{required:!1,tsType:{name:"number"},description:"Expand the outline OUTWARD by `bleed` px (inverse of `gap`) so the frame\n can sit beyond the cells. The SVG grows to avoid clipping; content stays\n in the cell box. Default 0.",defaultValue:{value:"0",computed:!1}},radius:{required:!1,tsType:{name:"number"},description:"Convex corner radius (px). Default 24.",defaultValue:{value:"24",computed:!1}},inverseRadius:{required:!1,tsType:{name:"number"},description:"Concave / notch corner radius (px). Default 32.",defaultValue:{value:"32",computed:!1}},fill:{required:!1,tsType:{name:"string"},description:'Outline fill — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-surface-container-low)"',computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:'Outline stroke — a CSS color, or `"none"` to disable.',defaultValue:{value:'"var(--color-outline-variant)"',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Content rendered on top of the shape (clipped to the shape's outline)."},pad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Padding on the content layer. Default 16px top/bottom, 8px sides.",defaultValue:{value:'"16px 8px"',computed:!1}},noClip:{required:!1,tsType:{name:"boolean"},description:"Skip clipping the content layer to the outline.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Se=1e5;function Ge(e){let n=1,t=1;for(const r of e)n=Math.max(n,r.row+r.rows),t=Math.max(t,r.col+r.cols);const a=Array.from({length:n},()=>Array(t).fill(!1));for(const r of e)for(let i=0;i<r.rows;i++)for(let m=0;m<r.cols;m++)a[r.row+i][r.col+m]=!0;return a}const We={W_pos:3,W_shape:2,W_scale:1,maxScale:3};function be(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const n=Object.keys(e);return n.length>0&&n.every(t=>/^\d+$/.test(t))}function Le(e){return be(e)?Object.keys(e).sort((n,t)=>Number(n)-Number(t)).map(n=>[n,e[n]]):[["0",e]]}function Fe(e,n){if(n<=1)return e;const t=Math.floor(n),a=[];for(let r=0;r<e.length;r++)for(let i=0;i<t;i++){const m=[];for(let p=0;p<e[r].length;p++)for(let w=0;w<t;w++)m.push(e[r][p]);a.push(m)}return a}function $e(e,n){const t={...We,...n},a=Math.max(1,Math.floor(e.cols)),r=[],i=s=>{for(;r.length<=s;)r.push(new Array(a).fill(!1))},m=(s,u,f)=>{for(let x=0;x<s.length;x++){const k=s[x];for(let c=0;c<k.length;c++){if(!k[c])continue;const P=u+c;if(P<0||P>=a)return!0;const T=f+x;if(i(T),r[T][P])return!0}}return!1},p=(s,u,f)=>{for(let x=0;x<s.length;x++){const k=s[x];for(let c=0;c<k.length;c++)k[c]&&(i(f+x),r[f+x][u+c]=!0)}},w=(s,u,f)=>t.W_pos*Number(s)+t.W_shape*Number(u)+t.W_scale*(f-1),y=s=>{const u=s.desire.position===void 0?[["0",void 0]]:Le(s.desire.position),f=Le(s.desire.shape),x=s.desire.scale?Array.from({length:t.maxScale},(c,P)=>P+1):[1],k=[];for(const[c,P]of u)for(const[T,_]of f)for(const z of x){const H=z===1?_:Fe(_,z);k.push({posKey:c,shapeKey:T,pos:P,mask:H,scale:z,cost:w(c,T,z)})}return k.sort((c,P)=>c.cost-P.cost),k},C=(s,u,f,x)=>(p(u.mask,f,x),{key:s.key,item:s.item,col:f,row:x,mask:u.mask,cols:ae(u.mask),rows:u.mask.length,priorityUsed:{position:u.posKey,shape:u.shapeKey},scale:u.scale,cost:u.cost}),N=(s,u)=>{const f=ae(u.mask);if(f>a)return null;const x=(k,c)=>C(s,u,k,c);if(u.pos){const[k,c]=u.pos;return k>=0&&k+f<=a&&c>=0&&!m(u.mask,k,c)?x(k,c):null}for(let k=0;k<Se;k++)for(let c=0;c+f<=a;c++)if(!m(u.mask,c,k))return x(c,k);return null},R=s=>{for(const u of y(s)){const f=N(s,u);if(f)return f}return null},A=s=>{const u=s.desire.position;if(u===void 0||be(u))return null;const[f,x]=u,k=y(s)[0];if(!k)return null;const c=ae(k.mask);if(c>a)return null;for(let P=0;P<Se;P++)for(let T=Math.max(0,x-P);T<=x+P;T++)for(let _=Math.max(0,f-P);_+c<=a;_++)if(Math.max(Math.abs(T-x),Math.abs(_-f))===P&&!m(k.mask,_,T))return C(s,k,_,T);return null},g=s=>{const u=s.desire.position;return u!==void 0&&!be(u)},h=[],K=[],E=[];for(const s of e.items)if(g(s)){const u=R(s);if(u)h.push(u);else{const f=A(s);f?h.push(f):E.push({...s,desire:{...s.desire,position:void 0}})}}else E.push(s);for(const s of E){const u=R(s);u?h.push(u):K.push(s.key)}let D=0,L=0;for(const s of h){const u=y(e.items.find(f=>f.key===s.key));D+=s.cost,L+=u[u.length-1]?.cost??0}const $=L===0?1:1-D/L;let q=0;for(const s of h)q=Math.max(q,s.row+s.rows);return{placements:h,rowsUsed:q,unfit:K,satisfaction:$}}const ze="neutral",Xe={primary:"var(--color-primary-container)",secondary:"var(--color-secondary-container)",tertiary:"var(--color-tertiary-container)",surface:"var(--color-surface-container)",neutral:"var(--color-surface-container-low)",warn:"var(--color-warning-container)",error:"var(--color-error-container)"},Ye={primary:"var(--color-on-primary-container)",secondary:"var(--color-on-secondary-container)",tertiary:"var(--color-on-tertiary-container)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-on-warning-container)",error:"var(--color-on-error-container)"},ce={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-on-surface)",neutral:"var(--color-on-surface-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},He={primary:"var(--color-primary)",secondary:"var(--color-secondary)",tertiary:"var(--color-tertiary)",surface:"var(--color-outline-variant)",neutral:"var(--color-outline-variant)",warn:"var(--color-warning)",error:"var(--color-error)"},Ze={primary:"var(--color-surface-container-low)",secondary:"var(--color-surface-container-low)",tertiary:"var(--color-surface-container-low)",surface:"var(--color-surface-container-low)",neutral:"var(--color-surface-container-lowest)",warn:"var(--color-surface-container-low)",error:"var(--color-surface-container-low)"};function Qe(e){const n=e.variant??"auto",t=n==="auto"?ze:n,a=e.type??"auto";return{type:a==="auto"?n==="auto"?"ghost":"filled":a,variant:t}}function Te(e,n){if(n<=0||e==="transparent")return e;const t=Math.min(1,n)*12;return`linear-gradient(180deg, color-mix(in oklab, ${e}, white ${t}%) 0%, ${e} 100%)`}function ie(e){const n=e??{},{type:t,variant:a}=Qe(n),r=n.gradient??0;switch(t){case"filled":{const i=Xe[a];return{fill:i,cssBackground:Te(i,r),color:Ye[a],stroke:"none",strokeWidth:0,elevated:!1,noChrome:!1}}case"outlined":return{fill:"transparent",cssBackground:"transparent",color:ce[a],stroke:He[a],strokeWidth:1,elevated:!1,noChrome:!1};case"elevated":{const i=a==="warn"||a==="error",m=Ze[a];return{fill:m,cssBackground:Te(m,r),color:ce[a],stroke:"none",strokeWidth:0,...i?{accentBar:ce[a]}:{},elevated:!0,noChrome:!1}}case"ghost":return{fill:"transparent",cssBackground:"transparent",color:ce[a],stroke:"none",strokeWidth:0,elevated:!1,noChrome:!0}}}const Je="16px 8px",en=.25;function ge(e,n){try{e.setPointerCapture(n)}catch{}}function je(e,n){try{e.releasePointerCapture(n)}catch{}}const ue=e=>e,xe=(e,n)=>`${e}::${n}`;function Pe(e,n){return[Math.max(0,Math.round(((e.panelCol+e.subCol)*n+e.dx)/n)),Math.max(0,Math.round(((e.panelRow+e.subRow)*n+e.dy)/n))]}function Ee({col:e,row:n,cols:t,rows:a,blockPx:r,contentPad:i,color:m}){return I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-20",style:{left:e*r,top:n*r,width:t*r,height:a*r,padding:i},children:I.jsx("div",{className:"h-full w-full rounded-[22px] border-2 border-dashed",style:{borderColor:m,opacity:.6}})})}function nn(e){return e.map(n=>n.map(t=>t?1:0))}function tn(e){return e.every(n=>n.key!=null)?e:e.map((n,t)=>n.key?n:{...n,key:`item-${t}`})}function qe(e){if(Array.isArray(e))return e;const n=Object.keys(e).sort((t,a)=>Number(t)-Number(a));return e[n[0]]}function on(e){let n=1;for(const{sub:t}of e){const a=ae(qe(t.desire.shape)),r=t.desire.position,i=Array.isArray(r)?r[0]:0;n=Math.max(n,i+a)}return n}function rn(e,n,t){const a=[];return n.forEach((r,i)=>{t.has(xe(e,i))||a.push({sub:r,index:i})}),a}function sn(e,n){return $e({items:e.map(t=>({key:xe(n,t.index),desire:t.sub.desire,item:t})),cols:on(e)})}function an(e){const n=[];for(let t=0;t<e.mask.length;t++){const a=e.mask[t];for(let r=0;r<a.length;r++)a[r]&&n.push([e.col+r,e.row+t])}return n}function ln(e){if(e.length<=1)return e.length?[[...e]]:[];const n=e.map(an),t=new Array(e.length).fill(!1),a=(i,m)=>{for(const[p,w]of n[i])for(const[y,C]of n[m])if(Math.abs(p-y)<=1&&Math.abs(w-C)<=1)return!0;return!1},r=[];for(let i=0;i<e.length;i++){if(t[i])continue;t[i]=!0;const m=[i],p=[];for(;m.length;){const w=m.shift();p.push(e[w]);for(let y=0;y<e.length;y++)!t[y]&&a(w,y)&&(t[y]=!0,m.push(y))}r.push(p)}return r}function cn(e){let n=1/0,t=1/0,a=0,r=0;for(const i of e)n=Math.min(n,i.col),t=Math.min(t,i.row),a=Math.max(a,i.col+i.cols),r=Math.max(r,i.row+i.rows);return{minCol:n,minRow:t,maxCol:a,maxRow:r}}function un(e,n,t,a){const r=e.map(cn),i=en*n,p=Math.max(0,a-Math.min(t,n-2)/2)+i/2,w=new Array(e.length).fill(0),y=new Array(e.length).fill(0);for(let C=0;C<r.length;C++)for(let N=C+1;N<r.length;N++){const R=r[C],A=r[N],g=R.minCol<A.maxCol&&A.minCol<R.maxCol,h=R.minRow<A.maxRow&&A.minRow<R.maxRow;g&&(R.maxRow===A.minRow?(y[C]-=p,y[N]+=p):A.maxRow===R.minRow&&(y[N]-=p,y[C]+=p)),h&&(R.maxCol===A.minCol?(w[C]-=p,w[N]+=p):A.maxCol===R.minCol&&(w[N]-=p,w[C]+=p))}return e.map((C,N)=>[w[N],y[N]])}function pn(e,n){const t=new Map;e.forEach((r,i)=>{const m=n.get(r.key),p=m!=null?`g:${m}`:`s:${i}`,w=t.get(p);w?w.push(r):t.set(p,[r])});const a=[];for(const r of t.values())for(const i of ln(r))a.push(i);return a}function _e({items:e,cols:n="auto",blockMin:t=De,gap:a=8,contentPad:r=Je,panelBleed:i=0,nest:m=!0,primitives:p={},onItemError:w,draggable:y=!1,onItemMove:C,onSubItemPromote:N,className:R,style:A}){const g=S.useRef(null),[h,K]=S.useState(null);S.useLayoutEffect(()=>{const l=g.current;if(!l)return;const o=()=>K(l.getBoundingClientRect().width);if(o(),typeof ResizeObserver>"u")return;const d=new ResizeObserver(o);return d.observe(l),()=>d.disconnect()},[]);const E=S.useMemo(()=>tn(e),[e]),{resolvedCols:D,block:L}=S.useMemo(()=>{if(n!=="auto")return{resolvedCols:n,block:t};if(h==null)return{resolvedCols:null,block:t};const l=Math.max(1,Math.floor(h/t));return{resolvedCols:l,block:h/l}},[n,t,h]),[$,q]=S.useState(new Map),[s,u]=S.useState(null),f=S.useRef(null);f.current=s;const[x,k]=S.useState(new Map),[c,P]=S.useState(null),T=S.useRef(null);T.current=c;const _=S.useCallback((l,o)=>{o.button!=null&&o.button!==0||(ge(o.currentTarget,o.pointerId),u({key:l.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:l.col,originRow:l.row,originCols:l.cols,originRows:l.rows,color:ie(l.item?.theme??{}).color,dx:0,dy:0}))},[]),z=S.useCallback((l,o)=>{if(o.button!=null&&o.button!==0)return;ge(o.currentTarget,o.pointerId);const d=l[0];u({key:d.key,pointerId:o.pointerId,startX:o.clientX,startY:o.clientY,originCol:d.col,originRow:d.row,originCols:d.cols,originRows:d.rows,color:ie(d.item?.theme??{}).color,dx:0,dy:0,members:l.map(b=>({key:b.key,col:b.col,row:b.row,cols:b.cols,rows:b.rows}))})},[]),H=S.useCallback((l,o,d,b)=>{if(b.button!=null&&b.button!==0)return;ge(b.currentTarget,b.pointerId);const j=ie(l.item.theme??{});P({parentKey:l.key,subIndex:o.index,pointerId:b.pointerId,startX:b.clientX,startY:b.clientY,dx:0,dy:0,panelCol:l.col,panelRow:l.row,panelCols:l.cols,panelRows:l.rows,subCol:d.col,subRow:d.row,ghostShape:nn(d.mask),ghostFill:j.fill,ghostStroke:j.stroke,ghostStrokeWidth:j.strokeWidth,ghostUi:o.sub.ui,ghostColor:j.color})},[]),Q=S.useCallback(l=>{const o=f.current;if(!o||l.pointerId!==o.pointerId)return;const d=l.clientX-o.startX,b=l.clientY-o.startY;d===o.dx&&b===o.dy||u({...o,dx:d,dy:b})},[]),W=S.useCallback(l=>{const o=f.current;if(!o||l.pointerId!==o.pointerId)return;f.current=null,je(l.currentTarget,l.pointerId),u(null);const d=L||t,b=D??1;if(o.members){const V=Math.min(...o.members.map(F=>F.col)),B=Math.min(...o.members.map(F=>F.row)),he=Math.max(...o.members.map(F=>F.col+F.cols)),ne=Math.max(-V,Math.min(b-he,Math.round(o.dx/d))),ye=Math.max(-B,Math.round(o.dy/d));if(ne===0&&ye===0)return;q(F=>{const Ce=new Map(F);for(const ve of o.members)Ce.set(ve.key,[ve.col+ne,ve.row+ye]);return Ce});for(const F of o.members)C?.(F.key,[F.col+ne,F.row+ye]);return}const j=Math.max(0,b-o.originCols),U=Math.min(j,Math.max(0,o.originCol+Math.round(o.dx/d))),v=Math.max(0,o.originRow+Math.round(o.dy/d)),Y=[U,v];q(V=>new Map(V).set(o.key,Y)),C?.(o.key,Y)},[L,t,D,C]),ee=S.useCallback(l=>{const o=T.current;if(!o||l.pointerId!==o.pointerId)return;const d=l.clientX-o.startX,b=l.clientY-o.startY;d===o.dx&&b===o.dy||P({...o,dx:d,dy:b})},[]),le=S.useCallback(l=>{const o=T.current;if(!o||l.pointerId!==o.pointerId)return;T.current=null,je(l.currentTarget,l.pointerId),P(null);const d=Pe(o,L||t),b=xe(o.parentKey,o.subIndex),j=E.find(v=>v.key===o.parentKey),U=j?.subItems?.[o.subIndex];U&&k(v=>new Map(v).set(b,{parentKey:o.parentKey,item:{key:`promoted::${b}`,desire:{position:d,shape:qe(U.desire.shape)},theme:{...j.theme,...U.theme},groupKey:j.groupKey??o.parentKey,ui:U.ui}})),q(v=>v.has(o.parentKey)?v:new Map(v).set(o.parentKey,[o.panelCol,o.panelRow])),N?.(o.parentKey,o.subIndex,d)},[L,t,E,N]),oe=s!==null||c!==null;S.useEffect(()=>{if(!oe)return;const l=d=>{T.current?ee(ue(d)):f.current&&Q(ue(d))},o=d=>{T.current?le(ue(d)):f.current&&W(ue(d))};return window.addEventListener("pointermove",l),window.addEventListener("pointerup",o),window.addEventListener("pointercancel",o),()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",o),window.removeEventListener("pointercancel",o)}},[oe,Q,W,ee,le]);const{layout:X,panelSubLayouts:fe,components:J}=S.useMemo(()=>{const l={layout:null,panelSubLayouts:new Map,components:[]};if(D==null)return l;const o=new Set(E.map(v=>v.key)),d=new Map,b=new Map,j=E.map(v=>{const Y=$.get(v.key);let V=Y?{...v.desire,position:Y}:v.desire,B=v.groupKey;if(v.subItems&&v.subItems.length>0){const he=rn(v.key,v.subItems,x),ne=sn(he,v.key);d.set(v.key,ne),V={...V,shape:Ge(ne.placements)},B=v.groupKey??v.key}return b.set(v.key,B),{key:v.key,desire:V,groupKey:B,item:v}});for(const{item:v,parentKey:Y}of x.values()){if(!o.has(Y))continue;const V=$.get(v.key),B=V?{...v.desire,position:V}:v.desire;b.set(v.key,v.groupKey),j.push({key:v.key,desire:B,groupKey:v.groupKey,item:v})}const U=$e({items:j,cols:D});return{layout:U,panelSubLayouts:d,components:pn(U.placements,b)}},[E,D,m,$,x]),M=S.useMemo(()=>un(J,L,a,i),[J,L,a,i]),O=X?.unfit.join(",")??"";S.useEffect(()=>{},[O,D,X]);const Z=X?.rowsUsed??0;return I.jsxs("div",{ref:g,className:te("relative w-full",R),style:{minHeight:Z>0?Z*L:void 0,...A},children:[J.map((l,o)=>{const d=l.map(B=>B.key).join("|"),b=M[o]??[0,0],j=s?l.find(B=>B.key===s.key):void 0,U=j&&s?[s.dx,s.dy]:void 0,v=c&&l.some(B=>B.key===c.parentKey)?{parentKey:c.parentKey,subIndex:c.subIndex}:null,Y=l.some(B=>$.has(B.key)),V=s?.members!=null&&j!=null;return I.jsx(dn,{members:l,block:L,gap:a,nudge:b,contentPad:r,panelBleed:i,primitives:p,onItemError:w,draggable:y,panelSubLayouts:fe,dragKey:j?.key??null,dragOffset:U,wholeDrag:V,draggingSub:v,overridden:Y,onItemDragStart:_,onComponentDragStart:z,onSubDragStart:H,onSubDragMove:ee,onSubDragEnd:le,onDragMove:Q,onDragEnd:W},d)}),c&&(()=>{const l=L||t,[o,d]=Pe(c,l);return I.jsx(Ee,{col:o,row:d,cols:c.ghostShape[0]?.length??1,rows:c.ghostShape.length,blockPx:l,contentPad:r,color:c.ghostColor})})(),s&&!s.members&&(()=>{const l=L||t,d=Math.max(0,(D??1)-s.originCols),b=Math.min(d,Math.max(0,s.originCol+Math.round(s.dx/l))),j=Math.max(0,s.originRow+Math.round(s.dy/l));return I.jsx(Ee,{col:b,row:j,cols:s.originCols,rows:s.originRows,blockPx:l,contentPad:r,color:s.color})})(),c&&(()=>{const l=p?.[c.ghostUi.type];return I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute z-30 opacity-90",style:{left:(c.panelCol+c.subCol)*L+c.dx,top:(c.panelRow+c.subRow)*L+c.dy,color:c.ghostColor},children:I.jsx(we,{shape:c.ghostShape,block:L,gap:a,bleed:i,pad:r,fill:c.ghostFill,stroke:c.ghostStroke,strokeWidth:c.ghostStrokeWidth,children:l?I.jsx(l,{...c.ghostUi}):null})})})()]})}const dn=S.memo(function({members:n,block:t,gap:a,nudge:r,contentPad:i,panelBleed:m,primitives:p,onItemError:w,draggable:y=!1,panelSubLayouts:C,dragKey:N,dragOffset:R,wholeDrag:A=!1,draggingSub:g,overridden:h=!1,onItemDragStart:K,onComponentDragStart:E,onSubDragStart:D,onSubDragMove:L,onSubDragEnd:$,onDragMove:q,onDragEnd:s}){let u=1/0,f=1/0,x=0,k=0;for(const M of n)u=Math.min(u,M.col),f=Math.min(f,M.row),x=Math.max(x,M.col+M.cols),k=Math.max(k,M.row+M.rows);const c=Math.max(1,x-u),P=Math.max(1,k-f),T=S.useMemo(()=>{const M=Array.from({length:P},()=>new Array(c).fill(0));for(const O of n)for(let Z=0;Z<O.mask.length;Z++){const l=O.mask[Z];for(let o=0;o<l.length;o++)l[o]&&(M[O.row-f+Z][O.col-u+o]=1)}return M},[n,c,P,u,f]),_=n.length===1&&!C.has(n[0].key),z=S.useMemo(()=>Ke(T.map(M=>M.map(Boolean)),{cell:t,gap:a,bleed:m,radius:24,inverseRadius:32}),[T,t,a,m]),H=n[0],Q=H.item,W=S.useMemo(()=>ie(Q.theme??{}),[Q.theme?.type,Q.theme?.variant,Q.theme?.gradient]);S.useEffect(()=>{if(w)for(const M of n){const O=M.item;O.ui&&!p?.[O.ui.type]&&w(M.key,{kind:"unknown-primitive",type:O.ui.type})}},[n,p,w]);const ee=(_||A)&&N===H.key,oe=N!=null&&!_&&!A||W.noChrome,X={position:"absolute",left:u*t+(r?.[0]??0),top:f*t+(r?.[1]??0),color:W.color};ee&&R?(X.transform=`translate(${R[0]}px, ${R[1]}px)`,X.zIndex=20):h&&(X.zIndex=10),y&&(X.cursor=ee?"grabbing":"grab",X.touchAction="none"),oe||(X.clipPath=`path('${z}')`);const fe=y&&_&&K?{onPointerDown:M=>K(H,M),onPointerMove:q,onPointerUp:s,onPointerCancel:s}:y&&!_&&E?{onPointerDown:M=>E(n,M),onPointerMove:q,onPointerUp:s,onPointerCancel:s}:void 0,J=[];for(const M of n){const O=M.item,Z=M.col-u,l=M.row-f,o=C.get(M.key);if(o)for(const d of o.placements){const b=d.item,j=g?.parentKey===M.key&&g.subIndex===b.index,U=b.sub,v=U.ui?p?.[U.ui.type]:void 0,Y=y&&D?{onPointerDown:V=>{V.stopPropagation(),D(M,b,d,V)},onPointerMove:L,onPointerUp:$,onPointerCancel:$}:void 0;J.push(I.jsx("div",{className:"absolute",style:{left:(Z+d.col)*t,top:(l+d.row)*t,width:d.cols*t,height:d.rows*t,padding:i,opacity:j?0:void 0},children:I.jsx("div",{...Y,className:te("h-full w-full",y&&"cursor-grab touch-none"),children:v?I.jsx(v,{...U.ui}):I.jsx(Ae,{type:U.ui.type})})},`${M.key}/${b.index}`))}else{const d=O.ui?p?.[O.ui.type]:void 0,b=y&&!_&&K?{onPointerDown:v=>{v.stopPropagation(),K(M,v)},onPointerMove:q,onPointerUp:s,onPointerCancel:s}:void 0,j=!_&&!A&&N===M.key,U=ie(O.theme??{});J.push(I.jsx("div",{className:"absolute",style:{left:Z*t,top:l*t,width:M.cols*t,height:M.rows*t,padding:i,transform:j&&R?`translate(${R[0]}px, ${R[1]}px)`:void 0,zIndex:j?30:void 0,background:j?U.cssBackground:void 0,color:j?U.color:void 0,borderRadius:j?24:void 0},children:I.jsx("div",{...b,className:te("h-full w-full",y&&!_&&"cursor-grab touch-none"),children:d&&O.ui?I.jsx(d,{...O.ui}):O.ui?I.jsx(Ae,{type:O.ui.type}):null})},M.key))}}return I.jsx("div",{...fe,className:te(y&&"select-none",W.elevated&&"drop-shadow-lg"),style:X,children:I.jsxs(we,{shape:T,block:t,gap:a,bleed:m,fill:W.fill,stroke:W.stroke,strokeWidth:W.strokeWidth,pad:0,noClip:oe,children:[W.accentBar&&I.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-y-0 left-0 w-1",style:{background:W.accentBar}}),J]})})});function Ae({type:e}){return I.jsxs("div",{className:"flex h-full w-full items-center justify-center text-xs",style:{color:"var(--color-on-error-container)"},children:["Unknown primitive: ",I.jsx("code",{className:"ml-1",children:e})]})}_e.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NotchGridItem"}],raw:"NotchGridItem[]"},description:""},cols:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:'Column count, or `"auto"` (default) to derive from container width via\n the gain-1-col rule.',defaultValue:{value:'"auto"',computed:!1}},blockMin:{required:!1,tsType:{name:"number"},description:'Minimum block size in px when `cols="auto"`. The grid gains a column\n each time the container can fit one more `blockMin`. Default 96.',defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap between blocks in px (notch erosion). Default 8.",defaultValue:{value:"8",computed:!1}},contentPad:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:'CSS padding inset on each tile / sub-cell\'s content. Default `"16px 8px"`.\n Lower it (or `0`) for fine-resolution grids where a tile may be only a\n fraction of a block tall — the default would over-pad short cells.',defaultValue:{value:'"16px 8px"',computed:!1}},panelBleed:{required:!1,tsType:{name:"number"},description:"Expand each panel's outline OUTWARD by `panelBleed` px so its frame can sit\n beyond the cells — lets the outer frame match the inter-tile gap instead of\n being half of it. Pair with a `contentPad` of the same value for uniform\n spacing. Default 0.",defaultValue:{value:"0",computed:!1}},nest:{required:!1,tsType:{name:"boolean"},description:"Reserved — already implied by the solver's cell-level collision.",defaultValue:{value:"true",computed:!1}},primitives:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}],raw:"ComponentType<Record<string, unknown>>"}],raw:`Record<
  string,
  ComponentType<Record<string, unknown>>
>`},description:"Map from `ui.type` → React component. Receives the full `ui` object as\n props. Unknown types fire `onItemError` and render a placeholder so the\n layout doesn't collapse.",defaultValue:{value:"{}",computed:!1}},onItemError:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, error: NotchGridError) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"NotchGridError"},name:"error"}],return:{name:"void"}}},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:"Enable outer-grid drag-to-place AND sub-item drag + promote.",defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: ItemKey, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:"Called after an outer tile drops, with its new block position."},onSubItemPromote:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: ItemKey, subIndex: number, pos: Pos) => void",signature:{arguments:[{type:{name:"string"},name:"parentKey"},{type:{name:"number"},name:"subIndex"},{type:{name:"unknown"},name:"pos"}],return:{name:"void"}}},description:`Called after a sub-item is dragged to a new cell (it becomes a top-level
 group member; auto-link re-unions it with adjacent same-group tiles).`},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const gn={title:"UI/Notch/NotchGrid",component:_e,parameters:{layout:"fullscreen"}},mn=({label:e,value:n})=>I.jsxs("div",{className:"flex h-full w-full flex-col justify-between p-1",children:[I.jsx("div",{className:"text-xs opacity-75",children:e}),I.jsx("div",{className:"text-xl font-semibold",children:n})]}),fn=({label:e,children:n})=>I.jsx("div",{className:"flex h-full w-full items-center justify-center text-sm font-medium",children:n??e}),ke={Label:mn,Center:fn},pe=(...e)=>e.map(n=>n.map(t=>t===1)),G=(e,n)=>Array.from({length:n},()=>Array(e).fill(!0)),de={args:{primitives:ke,items:[{key:"hero",desire:{shape:G(2,2)},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"Hero",value:"42"}},{key:"users",desire:{shape:G(1,1)},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Users",value:"1,204"}},{key:"events",desire:{shape:G(1,1)},theme:{type:"filled",variant:"tertiary"},ui:{type:"Label",label:"Events",value:"8.3k"}},{key:"uptime",desire:{shape:G(2,1)},theme:{type:"outlined",variant:"neutral"},ui:{type:"Label",label:"Uptime",value:"99.94%"}}]}},re={args:{primitives:ke,items:[{key:"panel",desire:{shape:G(3,3)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:G(2,2)},ui:{type:"Label",label:"Big",value:"★"}},{desire:{position:[2,0],shape:G(1,1)},ui:{type:"Label",label:"A"}},{desire:{position:[0,2],shape:G(2,1)},ui:{type:"Label",label:"Wide"}},{desire:{position:[2,2],shape:G(1,1)},ui:{type:"Label",label:"B"}}]}]}},se={args:{primitives:ke,cols:8,blockMin:96,draggable:!0,onItemMove:(e,n)=>{console.log("[NotchGrid story] drop:",e,n)},onSubItemPromote:(e,n,t)=>{console.log("[NotchGrid story] sub drop:",e,n,t)},items:[{key:"L",desire:{position:[0,0],shape:pe([1,1,1],[1,1,1],[1,1,0])},theme:{type:"filled",variant:"primary"},ui:{type:"Label",label:"L-hero",value:"drag me"}},{key:"plus",desire:{position:[3,0],shape:pe([0,1,0],[1,1,1],[0,1,0])},theme:{type:"filled",variant:"tertiary"},ui:{type:"Center",label:"✚"}},{key:"chart",desire:{position:[6,0],shape:pe([1,1,0],[1,1,1])},theme:{type:"elevated",variant:"secondary"},ui:{type:"Label",label:"Usage",value:"30d"}},{key:"diagonal",desire:{position:[0,3],shape:pe([1,1,0],[1,1,0],[0,0,1])},theme:{type:"filled",variant:"secondary"},ui:{type:"Label",label:"Diagonal",value:"junction"}},{key:"panel",desire:{position:[3,3],shape:G(3,2)},theme:{type:"filled",variant:"primary"},subItems:[{desire:{position:[0,0],shape:G(1,1)},ui:{type:"Label",label:"Cron",value:"8/d"}},{desire:{position:[1,0],shape:G(1,1)},ui:{type:"Label",label:"Calls",value:"1.2k"}},{desire:{position:[2,1],shape:G(1,1)},ui:{type:"Label",label:"Errs",value:"3"}}]}]}};de.parameters={...de.parameters,docs:{...de.parameters?.docs,source:{originalSource:`{
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
}`,...se.parameters?.docs?.source},description:{story:"Outer-grid drag over rich notched footprints:\n grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it\n on another cell — it pins and everything else re-flows. `onItemMove`\n reports the new `[col, row]`.\n\n Sub-items in the panel are draggable too: drag a sub-cell within the panel\n to reposition it, or drag it *out* past the panel to promote it to a\n standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging\n the whole panel chrome by its gaps + adjacency auto-link land in PR 6.",...se.parameters?.docs?.description}}};const bn=["Basic","SubItems","Draggable"];export{de as Basic,se as Draggable,re as SubItems,bn as __namedExportsOrder,gn as default};
