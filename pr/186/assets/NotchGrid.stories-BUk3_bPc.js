import{j as e,r as w}from"./iframe-C-WJSXIg.js";import{I as W}from"./Icon-Ch_01iKT.js";import{c as fe}from"./cn-IyxL_b2c.js";import{m as B,a as Ge,B as Ce,b as Be,c as $e}from"./BlockShape-C3wtXV-c.js";import"./preload-helper-PPVm8Dsz.js";const xe={base:0,sm:640,md:768,lg:1024,xl:1280,"2xl":1536};function ye(t){return t!=null&&typeof t=="object"&&!Array.isArray(t)}function Le(t){return ye(t)}function We(t,r){if(t in r)return r[t];const n=Number(t);return Number.isFinite(n)?n:0}function Ve(t,r,n=xe){if(!Le(t))return t;const i=Object.entries(t).map(([l,f])=>[We(l,n),f]).sort((l,f)=>l[0]-f[0]);if(i.length===0)return t;let o=i[0][1];for(const[l,f]of i)if(r>=l)o=f;else break;return o}function Xe(t){return ye(t)&&Array.isArray(t.sizes)}function Ye(t){return ye(t)&&Array.isArray(t.prefer)}function He(t,r){const n=Math.max(1,Math.floor(t)),i=Math.max(1,Math.floor(r));return Array.from({length:i},()=>Array(n).fill(1))}function Se(t,r){if(Ye(t)){const n=t.prefer.filter(o=>o.length>0&&B(o)>0);return n.length===0?[[1]]:n.find(o=>B(o)<=r.columns)??n.reduce((o,l)=>B(l)<B(o)?l:o)}if(Xe(t)){const i=[...t.sizes.map(l=>[l[0]??1,l[1]??l[0]??1])].sort((l,f)=>l[0]-f[0]);let o=i[0]??[1,1];for(const l of i)l[0]<=r.columns&&(o=l);return He(o[0],o[1])}return Ve(t,r.width,r.breakpoints)}const Ue=1e5;function je(t){return{w:B(t),h:t.length}}function Te(t,r){const n=Math.max(1,Math.floor(t)),i=Math.max(1,Math.floor(r));return Array.from({length:i},()=>Array(n).fill(!0))}function Fe(t){let r=1,n=1;for(const o of t)r=Math.max(r,o.row+o.rows),n=Math.max(n,o.col+o.cols);const i=Array.from({length:r},()=>Array(n).fill(!1));for(const o of t)for(let l=0;l<o.rows;l++)for(let f=0;f<o.cols;f++)i[o.row+l][o.col+f]=!0;return i}function J(t,r){const n=Math.max(1,Math.floor(r)),i=[],o=s=>{for(;i.length<=s;)i.push(new Array(n).fill(!1))},l=(s,c,g)=>{for(let y=0;y<s.length;y++){const b=s[y];for(let p=0;p<b.length;p++){if(!b[p])continue;const R=c+p;if(R<0||R>=n)return!0;const K=g+y;if(o(K),i[K][R])return!0}}return!1},f=(s,c,g)=>{for(let y=0;y<s.length;y++){const b=s[y];for(let p=0;p<b.length;p++)b[p]&&(o(g+y),i[g+y][c+p]=!0)}},I=[],q=[],D=s=>s.col!=null&&s.row!=null,S=[];for(const s of t){if(!D(s)){S.push(s);continue}const{w:c,h:g}=je(s.mask);s.col>=0&&s.col+c<=n&&!l(s.mask,s.col,s.row)?(f(s.mask,s.col,s.row),I.push({item:s.item,col:s.col,row:s.row,cols:c,rows:g})):S.unshift(s)}const z=()=>{let s=0;for(let c=0;c<i.length;c++)i[c].some(Boolean)&&(s=c+1);return s};for(const s of S){const{w:c,h:g}=je(s.mask);if(c>n){const b=z();for(let p=0;p<g;p++){o(b+p);for(let R=0;R<n;R++)i[b+p][R]=!0}I.push({item:s.item,col:0,row:b,cols:c,rows:g}),q.push(s.item);continue}let y=!1;for(let b=0;b<Ue&&!y;b++)for(let p=0;p+c<=n;p++)if(!l(s.mask,p,b)){f(s.mask,p,b),I.push({item:s.item,col:p,row:b,cols:c,rows:g}),y=!0;break}}let j=0,T=n;for(const s of I)j=Math.max(j,s.row+s.rows),T=Math.max(T,s.col+s.cols);return{placed:I,cols:T,rows:j,overflowed:q}}function H(t){let r=0;for(const n of t)for(const i of n)i&&r++;return r}function Re(t){if(t.length<=1)return[[...t]];const r=[];for(let n=0;n<t.length;n++){const i=[...t.slice(0,n),...t.slice(n+1)];for(const o of Re(i))r.push([t[n],...o])}return r}function Ze(t,r){for(let n=0;n<t.length;n++){if(t[n]<r[n])return!0;if(t[n]>r[n])return!1}return!1}function Qe(t,{maxCols:r,minCols:n,targetAspect:i=1.6,exhaustiveUpTo:o=4}){const l=Math.max(1,Math.floor(r));if(t.length===0)return{placed:[],cols:l,rows:0,overflowed:[]};const f=Math.max(1,...t.map(c=>B(c.mask))),I=Math.max(1,Math.floor(n??f)),q=t.reduce((c,g)=>c+H(g.mask),0),D=Math.max(I,Math.min(l,Math.max(f,q)));if(t.some(c=>c.col!=null&&c.row!=null))return J(t,l);const S=[...t].sort((c,g)=>H(g.mask)-H(c.mask)),z=[...t].sort((c,g)=>H(c.mask)-H(g.mask)),j=t.length<=o?Re([...t]):[t,S,z];let T,s=[1/0,1/0,1/0];for(let c=I;c<=D;c++)for(const g of j){const y=J(g,c),b=y.cols*y.rows,p=[b,Math.abs(y.cols/y.rows-i),b-q];Ze(p,s)&&(T=y,s=p)}return T??J(t,l)}function Je(t){return Array.isArray(t)?{cost:t}:t}function h({shape:t,subItems:r,tier:n,block:i,radius:o,inverseRadius:l,fill:f,stroke:I,strokeWidth:q,pad:D,noClip:S,className:z,style:j,children:T}){if(r&&r.length>0)return e.jsx("div",{className:z,style:j,children:T});const s=Se(t??[[1]],{width:Number.POSITIVE_INFINITY,columns:Number.MAX_SAFE_INTEGER}),c=n??Ge(s);return e.jsx(Ce,{shape:s,tier:c,block:i,radius:o,inverseRadius:l,fill:f,stroke:I,strokeWidth:q,pad:D,noClip:S,className:z,style:j,children:T})}h.__docgenInfo={description:"Inside a {@link NotchGrid} this component is *not* rendered directly — the\ngrid reads these props, packs sub-items / resolves the responsive shape, and\nrenders the positioned `BlockShape`s itself.\n\nRendered standalone, it falls back to its largest defined shape variant (or,\nwith `subItems`, just renders its `children`) so it still shows something\nuseful in isolation / tests.",methods:[],displayName:"NotchGridItem",props:{key:{required:!1,tsType:{name:"Key"},description:"React key when supplied via the `items` prop array."},shape:{required:!1,tsType:{name:"union",raw:"Responsive<ShapeMatrix> | ShapeSizes | ShapePreferences",elements:[{name:"union",raw:"T | { [key: string]: T }",elements:[{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0},{name:"signature",type:"object",raw:"{ [key: string]: T }",signature:{properties:[{key:{name:"string"},value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}}]}}]},{name:"signature",type:"object",raw:"{ readonly sizes: ReadonlyArray<readonly number[]> }",signature:{properties:[{key:"sizes",value:{name:"ReadonlyArray",elements:[{name:"unknown"}],raw:"ReadonlyArray<readonly number[]>",required:!0}}]}},{name:"signature",type:"object",raw:"{ readonly prefer: ReadonlyArray<ShapeMatrix> }",signature:{properties:[{key:"prefer",value:{name:"ReadonlyArray",elements:[{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}],raw:"ReadonlyArray<ShapeMatrix>",required:!0}}]}}]},description:"The block footprint — one of:\n - a matrix `[[0,1],[1,1]]` (`0` notch/empty, `1` filled, `2+` tier-encoded);\n - a breakpoint map of matrices, `{ base: …, md: … }` or px keys `{ 0: …, 900: … }`;\n - candidate `[cols, rows]` block costs `{ sizes: [[1,1],[2,2]] }` — the grid\n   picks the largest that fits, so the component grows when there's room;\n - preferred matrices in priority order `{ prefer: [bigShape, smallerShape, …] }`\n   — the grid uses the first that fits the column count, else the narrowest.\n\nIgnored when {@link subItems} is given (the footprint is derived from those)."},subItems:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:"NotchSubItem | readonly [number, number]",elements:[{name:"NotchSubItem"},{name:"unknown"}]}],raw:"ReadonlyArray<NotchSubItemInput>"},description:"Build this item as a panel of sub-widgets, each with a `[cols, rows]` block\ncost — `[[1,1],[2,2]]` is a 1×1 sub-item beside a 2×2 one. The grid packs\nthem (into {@link subCols} columns) and the panel's notched footprint is the\nunion of their positions."},subCols:{required:!1,tsType:{name:"number"},description:`Pin the column count the sub-items pack into. Omit to let the grid search
 column counts × orderings for the most compact arrangement.`},subAspect:{required:!1,tsType:{name:"number"},description:"Preferred width ÷ height for the auto-arranged sub-item layout — the\n tie-breaker between equally-compact options. Default 1.6 (gently landscape).\n Ignored when `subCols` is set."},col:{required:!1,tsType:{name:"number"},description:"Explicit grid position in block units. Auto-flowed when omitted."},row:{required:!1,tsType:{name:"number"},description:""},tier:{required:!1,tsType:{name:"number"},description:"Tier selector for a tier-encoded matrix. Default: every tier (`maxTier`)."},block:{required:!1,tsType:{name:"number"},description:"Block edge in px (normally inherited from the parent `NotchGrid`)."},radius:{required:!1,tsType:{name:"number"},description:""},inverseRadius:{required:!1,tsType:{name:"number"},description:""},fill:{required:!1,tsType:{name:"string"},description:""},stroke:{required:!1,tsType:{name:"string"},description:""},strokeWidth:{required:!1,tsType:{name:"number"},description:""},pad:{required:!1,tsType:{name:"number"},description:""},noClip:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const Me=t=>Math.max(1,Math.floor(t));function et(t){const[r,n]=w.useState(0);return w.useLayoutEffect(()=>{const i=t.current;if(!i)return;const o=()=>{const f=Math.round(i.getBoundingClientRect().width);n(I=>I===f?I:f)};if(o(),typeof ResizeObserver>"u")return;const l=new ResizeObserver(o);return l.observe(i),()=>l.disconnect()},[t]),r}function V({cols:t,block:r=Be,gap:n=8,breakpoints:i,radius:o,inverseRadius:l,fill:f,stroke:I,strokeWidth:q,pad:D,nest:S=!0,items:z,draggable:j=!1,onItemMove:T,onSubItemMove:s,children:c,className:g,style:y}){const b=w.useRef(null),p=et(b),R=w.useMemo(()=>i?{...xe,...i}:xe,[i]),K=t??Math.max(1,Math.floor(p/r)),[X,Ae]=w.useState(new Map),[ee,ie]=w.useState(null),le=w.useRef(null);le.current=ee;const Pe=w.useCallback(u=>{const d=le.current;!d||u.pointerId!==d.pointerId||ie({...d,dx:u.clientX-d.startX,dy:u.clientY-d.startY})},[]),be=w.useCallback(u=>{const d=le.current;if(!d||u.pointerId!==d.pointerId)return;try{u.currentTarget.releasePointerCapture(u.pointerId)}catch{}const A=Math.max(0,K-d.originCols),_=Math.min(A,Math.max(0,d.originCol+Math.round(d.dx/r))),x=Math.max(0,d.originRow+Math.round(d.dy/r));ie(null),Ae(a=>new Map(a).set(d.key,{col:_,row:x})),T?.(d.key,_,x)},[r,K,T]),[ge,ve]=w.useState(new Map),[M,ce]=w.useState(null),de=w.useRef(null);de.current=M;const[we,Ne]=w.useState(null),ke=u=>({col:Math.min(Math.max(0,u.parentSubCols),Math.max(0,u.originCol+Math.round(u.dx/u.itemBlock))),row:Math.min(Math.max(0,u.parentSubRows),Math.max(0,u.originRow+Math.round(u.dy/u.itemBlock)))}),E=M?{parentKey:M.parentKey,subKey:M.subKey,...ke(M)}:null,qe=w.useCallback(u=>{const d=de.current;!d||u.pointerId!==d.pointerId||ce({...d,dx:u.clientX-d.startX,dy:u.clientY-d.startY})},[]),Ie=w.useCallback(u=>{const d=de.current;if(!d||u.pointerId!==d.pointerId)return;try{u.currentTarget.releasePointerCapture(u.pointerId)}catch{}const{col:A,row:_}=ke(d);ce(null),ve(x=>{const a=new Map(x),k=new Map(a.get(d.parentKey)??new Map);return k.set(d.subKey,{col:A,row:_}),a.set(d.parentKey,k),a}),s?.(d.parentKey,d.subKey,A,_)},[s]),{placed:ze,gridCols:Ke,gridRows:Ee}=w.useMemo(()=>{const u=[];w.Children.forEach(c,(a,k)=>{w.isValidElement(a)&&a.type===h&&u.push({props:a.props,key:a.key??`c${k}`})}),(z??[]).forEach((a,k)=>u.push({props:a,key:a.key??`i${k}`}));const d=u.map(({props:a,key:k})=>{if(a.subItems&&a.subItems.length>0){const G=a.subItems.map((v,m)=>({...Je(v),_i:m})),P=v=>Math.max(1,Math.floor(v.cost[0])),$=Math.max(1,...G.map(P)),ne=ge.get(k),re=G.map(v=>{const m=v.key??`s${v._i}`,L=E&&E.parentKey===k&&E.subKey===m?{col:E.col,row:E.row}:ne?.get(m);return{item:{sub:v,key:m},mask:Te(v.cost[0],v.cost[1]),col:L?.col??v.col,row:L?.row??v.row}}),se=(a.subCols!=null?J(re,a.subCols):Qe(re,{maxCols:Math.max($,K),minCols:$,targetAspect:a.subAspect})).placed,me=Fe(se).map(v=>v.map(m=>m?1:0));return{props:a,key:k,matrix:me,tier:1,subPlaced:se.map(v=>({sub:v.item.sub,key:v.item.key,col:v.col,row:v.row}))}}const te=Se(a.shape??[[1]],{width:p,columns:K,breakpoints:R});return{props:a,key:k,matrix:te,tier:a.tier??Ge(te)}}),A=a=>{const k=X.get(a.key);return{item:a,mask:S?$e(a.matrix,a.tier):Te(Math.max(1,B(a.matrix)),Math.max(1,a.matrix.length)),col:k?.col??a.props.col,row:k?.row??a.props.row}},_=[...d.filter(a=>X.has(a.key)).map(A),...d.filter(a=>!X.has(a.key)).map(A)],x=J(_,K);return{placed:x.placed,gridCols:x.cols,gridRows:x.rows}},[c,z,p,K,R,S,X,ge,E?.parentKey,E?.subKey,E?.col,E?.row]);return e.jsx("div",{ref:b,className:fe("w-full",g),style:y,children:e.jsx("div",{className:"relative",style:{width:Ke*r,height:Ee*r},children:ze.map(({item:u,col:d,row:A,cols:_})=>{const{props:x,key:a,matrix:k,tier:te,subPlaced:G}=u,P=x.block??r,$=ee?.key===a,ne=!!G,re=ne?Math.max(1,...G.map(m=>m.col+Math.max(1,m.sub.cost[0]))):0,se=ne?Math.max(1,...G.map(m=>m.row+Math.max(1,m.sub.cost[1]))):0,me=G?G.map(({sub:m,key:O,col:L,row:ue})=>{const ae=M?.parentKey===a&&M.subKey===O,_e=we?.parentKey===a&&we.subKey===O,De=j?{onPointerEnter:()=>Ne({parentKey:a,subKey:O}),onPointerLeave:()=>Ne(C=>C?.parentKey===a&&C.subKey===O?null:C),onPointerDown:C=>{C.button===0&&(C.stopPropagation(),C.currentTarget.setPointerCapture(C.pointerId),ve(Oe=>{const pe=new Map(Oe),he=new Map(pe.get(a)??new Map);for(const Y of G)Y.key!==O&&!he.has(Y.key)&&he.set(Y.key,{col:Y.col,row:Y.row});return pe.set(a,he),pe}),ce({parentKey:a,subKey:O,pointerId:C.pointerId,startX:C.clientX,startY:C.clientY,originCol:L,originRow:ue,cost:m.cost,parentSubCols:re,parentSubRows:se,itemBlock:P,dx:0,dy:0}))},onPointerMove:qe,onPointerUp:Ie,onPointerCancel:Ie}:void 0;return e.jsx("div",{...De,className:fe("absolute overflow-hidden transition-colors",j&&"cursor-grab select-none touch-none",ae&&"cursor-grabbing",_e&&!ae&&"bg-on-surface/10",m.className),style:{left:L*P+n/2,top:ue*P+n/2,width:Me(m.cost[0])*P-n,height:Me(m.cost[1])*P-n,padding:m.pad??x.pad??D??16,borderRadius:(m.radius??x.radius??o??24)*.75,background:m.fill&&m.fill!=="none"?m.fill:void 0,transform:ae?`translate(${M.dx-(L-M.originCol)*P}px, ${M.dy-(ue-M.originRow)*P}px)`:void 0,zIndex:ae?30:void 0,...m.style},children:m.content},O)}):x.children,v=j?{onPointerDown:m=>{m.button===0&&(m.currentTarget.setPointerCapture(m.pointerId),ie({key:a,pointerId:m.pointerId,startX:m.clientX,startY:m.clientY,originCol:d,originRow:A,originCols:_,dx:0,dy:0}))},onPointerMove:Pe,onPointerUp:be,onPointerCancel:be}:void 0;return e.jsx("div",{...v,className:fe("absolute",j&&"select-none touch-none",j&&($?"cursor-grabbing":"cursor-grab")),style:{left:d*r,top:A*r,transform:$?`translate(${ee.dx}px, ${ee.dy}px)`:void 0,zIndex:$?20:X.has(a)?10:void 0},children:e.jsx(Ce,{shape:k,tier:te,block:P,gap:n,radius:x.radius??o,inverseRadius:x.inverseRadius??l,fill:x.fill??f,stroke:x.stroke??I,strokeWidth:x.strokeWidth??q,pad:G?0:x.pad??D,noClip:G?void 0:x.noClip,className:x.className,style:x.style,children:me})},a)})})})}V.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{cols:{required:!1,tsType:{name:"number"},description:"Fixed column count. Omit to auto-fit `floor(width / block)`."},block:{required:!1,tsType:{name:"number"},description:"Block edge in px. Default {@link BLOCK_SIZE} (96).",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap (px) between items — each item's outline is eroded by `gap / 2`, so\n the spacing is the same whether items sit edge-to-edge or one nestles into\n another's notch. Default 8.",defaultValue:{value:"8",computed:!1}},breakpoints:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"number"}],raw:"Record<string, number>"},description:"Override / extend the Tailwind-style breakpoint thresholds (min container\n width in px) used to resolve each item's responsive `shape`."},radius:{required:!1,tsType:{name:"number"},description:"Default corner radius forwarded to every item."},inverseRadius:{required:!1,tsType:{name:"number"},description:"Default notch corner radius forwarded to every item."},fill:{required:!1,tsType:{name:"string"},description:""},stroke:{required:!1,tsType:{name:"string"},description:""},strokeWidth:{required:!1,tsType:{name:"number"},description:""},pad:{required:!1,tsType:{name:"number"},description:""},nest:{required:!1,tsType:{name:"boolean"},description:"When `true` (default), an item reserves only its *filled* cells, so a\n complementary shape can nestle into another's notch (interlocking layout).\n Set `false` to reserve each item's whole bounding box — boxes never\n overlap, at the cost of notches staying empty.",defaultValue:{value:"true",computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"NotchGridItemProps"}],raw:"NotchGridItemProps[]"},description:"Items as data (in addition to / instead of `<NotchGridItem>` children)."},draggable:{required:!1,tsType:{name:"boolean"},description:`Let the user drag items onto a different block cell. Dropped items become
 pinned and the rest re-flow around them.`,defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: Key, col: number, row: number) => void",signature:{arguments:[{type:{name:"Key"},name:"key"},{type:{name:"number"},name:"col"},{type:{name:"number"},name:"row"}],return:{name:"void"}}},description:"Called after a drag drops an item, with its new block position."},onSubItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: Key, subKey: Key, col: number, row: number) => void",signature:{arguments:[{type:{name:"Key"},name:"parentKey"},{type:{name:"Key"},name:"subKey"},{type:{name:"number"},name:"col"},{type:{name:"number"},name:"row"}],return:{name:"void"}}},description:`Called after a sub-item drag drops on a new sub-grid cell. The panel
 re-packs around the new position; if the move would change the panel's
 notched footprint, neighbouring items in the outer grid re-flow too.`},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const ot={title:"UI/Notch/NotchGrid",component:V,parameters:{layout:"fullscreen"},args:{block:96},argTypes:{cols:{control:{type:"number",min:1,max:12}},block:{control:{type:"range",min:56,max:140,step:4}}}};function N({icon:t,label:r,value:n}){return e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx(W,{name:t,size:18,className:"text-primary"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-surface-variant",children:r}),e.jsx("p",{className:"text-lg font-medium text-on-surface",children:n})]})]})}function oe({icon:t,label:r,value:n}){return e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx(W,{name:t,size:16,className:"text-on-primary-container"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-primary-container/70",children:r}),e.jsx("p",{className:"text-base font-medium text-on-primary-container",children:n})]})]})}const U={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(V,{cols:7,draggable:!0,children:[e.jsx(h,{col:0,row:0,shape:[[1,1,1],[1,1,1],[1,1,0]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx(W,{name:"extension",size:22,className:"text-on-primary-container"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-primary-container/70",children:"Module"}),e.jsx("p",{className:"text-xl font-medium text-on-primary-container",children:"identity-federated"}),e.jsx("p",{className:"text-xs text-on-primary-container/70",children:"@me/identity-federated · v0.3.1"})]})]})}),e.jsx(h,{col:2,row:2,shape:[[1]],children:e.jsx(N,{icon:"apps",label:"Installs",value:"1,240"})}),e.jsx(h,{col:3,row:0,shape:[[0,1,0],[1,1,1],[0,1,0]],children:e.jsxs("div",{className:"flex h-full flex-col items-center justify-center text-center",children:[e.jsx(W,{name:"bolt",size:18,className:"text-primary"}),e.jsx("p",{className:"mt-1 text-sm font-medium text-on-surface",children:"Status"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"live · healthy"})]})}),e.jsx(h,{col:3,row:0,shape:[[1]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(oe,{icon:"payments",label:"Earned",value:"$84"})}),e.jsx(h,{col:5,row:0,shape:[[1]],children:e.jsx(N,{icon:"new_releases",label:"Version",value:"v0.3.1"})}),e.jsx(h,{col:3,row:2,shape:[[1]],children:e.jsx(N,{icon:"groups",label:"Tenants",value:"37"})}),e.jsx(h,{col:5,row:2,shape:[[1]],children:e.jsx(N,{icon:"schedule",label:"Pending",value:"1"})}),e.jsx(h,{col:6,row:0,shape:[[1],[1],[1]],children:e.jsxs("div",{className:"flex h-full flex-col gap-2",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),["v0.3.1 published","installed by @anna","deps reviewed","tunnel up 4h"].map(t=>e.jsx("p",{className:"text-xs text-on-surface-variant",children:t},t))]})}),e.jsx(h,{col:0,row:3,shape:[[1,1,1,0],[1,1,1,1]],children:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Usage — last 30 days"}),e.jsx("div",{className:"mt-2 flex flex-1 items-end gap-1",children:[40,65,50,80,55,70,90,60,75,95,85,100].map((t,r)=>e.jsx("div",{className:"flex-1 rounded-t bg-primary/60",style:{height:`${t}%`}},r))})]})}),e.jsx(h,{col:3,row:3,shape:[[1]],children:e.jsx(N,{icon:"build",label:"Builds",value:"312"})}),e.jsx(h,{col:4,row:3,fill:"var(--color-primary-container)",subItems:[{cost:[1,1],content:e.jsx(oe,{icon:"schedule",label:"Cron",value:"6×"})},{cost:[2,2],content:e.jsx(oe,{icon:"insights",label:"Calls / day",value:"128k"})}]})]})})},F={args:{cols:7},render:t=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(V,{...t,children:[e.jsx(h,{fill:"var(--color-primary-container)",stroke:"none",subItems:[{cost:[2,2],content:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("p",{className:"text-sm font-medium text-on-primary-container",children:"Usage"}),e.jsx("div",{className:"mt-2 flex flex-1 items-end gap-1",children:[40,70,55,85,60,95,75].map((r,n)=>e.jsx("div",{className:"flex-1 rounded-t bg-on-primary-container/35",style:{height:`${r}%`}},n))})]})},{cost:[1,1],content:e.jsx(oe,{icon:"payments",label:"Earned",value:"$84"})}]}),e.jsx(h,{subItems:[{cost:[1,1],content:e.jsx(N,{icon:"apps",label:"Installs",value:"1,240"})},{cost:[1,1],content:e.jsx(N,{icon:"new_releases",label:"Version",value:"v0.3.1"})},{cost:[2,1],content:e.jsxs("div",{className:"flex h-full items-center gap-2",children:[e.jsx(W,{name:"bolt",size:16,className:"text-primary"}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:"tunnel up · 2.1k req/min · p99 142ms"})]})}]}),e.jsx(h,{subItems:[{cost:[1,2],content:e.jsxs("div",{className:"flex h-full flex-col gap-1.5",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),["v0.3.1 published","installed by @anna","deps reviewed","tunnel up 4h"].map(r=>e.jsx("p",{className:"text-xs text-on-surface-variant",children:r},r))]})},{cost:[1,1],content:e.jsx(N,{icon:"groups",label:"Tenants",value:"37"})},{cost:[1,1],content:e.jsx(N,{icon:"schedule",label:"Pending",value:"1"})}],subCols:2})]})})},Z={args:{cols:6,draggable:!0},render:t=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(V,{...t,children:[e.jsx(h,{shape:[[1,1,1],[1,1,0]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(N,{icon:"drag_indicator",label:"Drag me",value:"hero"})}),e.jsx(h,{shape:[[1]],children:e.jsx(N,{icon:"apps",label:"Installs",value:"1,240"})}),e.jsx(h,{shape:[[1]],children:e.jsx(N,{icon:"payments",label:"Earned",value:"$84"})}),e.jsx(h,{shape:[[1,1]],children:e.jsxs("div",{className:"flex h-full items-center gap-2",children:[e.jsx(W,{name:"bolt",size:16,className:"text-primary"}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:"live · 2.1k req/min"})]})}),e.jsx(h,{shape:[[1],[1]],children:e.jsxs("div",{className:"flex h-full flex-col gap-1",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"v0.3.1 published"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"installed by @anna"})]})}),e.jsx(h,{shape:[[1]],children:e.jsx(N,{icon:"calendar_today",label:"Created",value:"May"})})]})})},Q={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsx("div",{className:"resize-x overflow-auto rounded-2xl border border-dashed border-outline-variant p-2",style:{width:720,minWidth:220,maxWidth:"100%"},children:e.jsxs(V,{children:[e.jsx(h,{shape:{sizes:[[1,1],[2,2],[3,2]]},fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(N,{icon:"dashboard",label:"Hero",value:"1·1 → 2·2 → 3·2"})}),e.jsx(h,{shape:{sizes:[[1,1],[2,1]]},children:e.jsx(N,{icon:"apps",label:"Installs",value:"1·1 → 2·1"})}),e.jsx(h,{shape:{sizes:[[1,1]]},children:e.jsx(N,{icon:"payments",label:"Earned",value:"1·1"})}),e.jsx(h,{shape:{sizes:[[1,1],[1,2]]},children:e.jsx(N,{icon:"new_releases",label:"Version",value:"1·1 → 1·2"})}),e.jsx(h,{shape:{sizes:[[1,1],[2,1]]},children:e.jsx(N,{icon:"history",label:"Activity",value:"1·1 → 2·1"})})]})})})};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div className="bg-background p-6">
      <NotchGrid cols={7} draggable>
        {/* L-shaped ("knife") hero: 3×3 with the bottom-right block notched out. */}
        <NotchGridItem col={0} row={0} shape={[[1, 1, 1], [1, 1, 1], [1, 1, 0]]} fill="var(--color-primary-container)" stroke="none">
          <div className="flex h-full flex-col justify-between">
            <Icon name="extension" size={22} className="text-on-primary-container" />
            <div>
              <p className="text-xs text-on-primary-container/70">Module</p>
              <p className="text-xl font-medium text-on-primary-container">identity-federated</p>
              <p className="text-xs text-on-primary-container/70">@me/identity-federated · v0.3.1</p>
            </div>
          </div>
        </NotchGridItem>
        {/* drops into the hero's bottom-right notch */}
        <NotchGridItem col={2} row={2} shape={[[1]]}>
          <Tile icon="apps" label="Installs" value="1,240" />
        </NotchGridItem>

        {/* Plus — its four notch corners get filled by 1×1 tiles. */}
        <NotchGridItem col={3} row={0} shape={[[0, 1, 0], [1, 1, 1], [0, 1, 0]]}>
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Icon name="bolt" size={18} className="text-primary" />
            <p className="mt-1 text-sm font-medium text-on-surface">Status</p>
            <p className="text-xs text-on-surface-variant">live · healthy</p>
          </div>
        </NotchGridItem>
        <NotchGridItem col={3} row={0} shape={[[1]]} fill="var(--color-primary-container)" stroke="none">
          <PrimaryTile icon="payments" label="Earned" value="$84" />
        </NotchGridItem>
        <NotchGridItem col={5} row={0} shape={[[1]]}><Tile icon="new_releases" label="Version" value="v0.3.1" /></NotchGridItem>
        <NotchGridItem col={3} row={2} shape={[[1]]}><Tile icon="groups" label="Tenants" value="37" /></NotchGridItem>
        <NotchGridItem col={5} row={2} shape={[[1]]}><Tile icon="schedule" label="Pending" value="1" /></NotchGridItem>

        {/* Tall recent-activity list. */}
        <NotchGridItem col={6} row={0} shape={[[1], [1], [1]]}>
          <div className="flex h-full flex-col gap-2">
            <p className="text-sm font-medium text-on-surface">Recent</p>
            {["v0.3.1 published", "installed by @anna", "deps reviewed", "tunnel up 4h"].map(t => <p key={t} className="text-xs text-on-surface-variant">{t}</p>)}
          </div>
        </NotchGridItem>

        {/* 4×2 chart with a notch in its top-right corner. */}
        <NotchGridItem col={0} row={3} shape={[[1, 1, 1, 0], [1, 1, 1, 1]]}>
          <div className="flex h-full flex-col">
            <p className="text-sm font-medium text-on-surface">Usage — last 30 days</p>
            <div className="mt-2 flex flex-1 items-end gap-1">
              {[40, 65, 50, 80, 55, 70, 90, 60, 75, 95, 85, 100].map((h, i) => <div key={i} className="flex-1 rounded-t bg-primary/60" style={{
              height: \`\${h}%\`
            }} />)}
            </div>
          </div>
        </NotchGridItem>
        {/* drops into the chart's notch */}
        <NotchGridItem col={3} row={3} shape={[[1]]}><Tile icon="build" label="Builds" value="312" /></NotchGridItem>

        {/* A component made of a 1×1 + a 2×2 sub-item — \`subItems={[[1,1],[2,2]]}\`;
            the two pack into the panel's own L footprint. Theme set once on the panel. */}
        <NotchGridItem col={4} row={3} fill="var(--color-primary-container)" subItems={[{
        cost: [1, 1],
        content: <PrimaryTile icon="schedule" label="Cron" value="6×" />
      }, {
        cost: [2, 2],
        content: <PrimaryTile icon="insights" label="Calls / day" value="128k" />
      }]} />
      </NotchGrid>
    </div>
}`,...U.parameters?.docs?.source},description:{story:"An overview page laid out by hand (explicit `col`/`row`) so the notched\npieces interlock cleanly: 1×1 tiles drop into the L-hero's notch and into all\nfour of the plus's corners and the chart's notch; the `subItems={[[1,1],[2,2]]}`\npanel is an L of its own. `nest` (default) keeps notches fillable — nothing\nreserves empty corners — and `draggable` lets you re-arrange it.",...U.parameters?.docs?.description}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    cols: 7
  },
  render: args => <div className="bg-background p-6">
      <NotchGrid {...args}>
        {/* [[2,2],[1,1]] → a 2×2 chart with a 1×1 stat tucked under it (L-shape).
            Theme set once on the panel; both sub-items inherit it. */}
        <NotchGridItem fill="var(--color-primary-container)" stroke="none" subItems={[{
        cost: [2, 2],
        content: <div className="flex h-full flex-col">
                  <p className="text-sm font-medium text-on-primary-container">Usage</p>
                  <div className="mt-2 flex flex-1 items-end gap-1">
                    {[40, 70, 55, 85, 60, 95, 75].map((h, i) => <div key={i} className="flex-1 rounded-t bg-on-primary-container/35" style={{
              height: \`\${h}%\`
            }} />)}
                  </div>
                </div>
      }, {
        cost: [1, 1],
        content: <PrimaryTile icon="payments" label="Earned" value="$84" />
      }]} />
        {/* [[1,1],[1,1],[2,1]] → two stat tiles over a wide 2×1 footer. */}
        <NotchGridItem subItems={[{
        cost: [1, 1],
        content: <Tile icon="apps" label="Installs" value="1,240" />
      }, {
        cost: [1, 1],
        content: <Tile icon="new_releases" label="Version" value="v0.3.1" />
      }, {
        cost: [2, 1],
        content: <div className="flex h-full items-center gap-2">
                  <Icon name="bolt" size={16} className="text-primary" />
                  <span className="text-xs text-on-surface-variant">tunnel up · 2.1k req/min · p99 142ms</span>
                </div>
      }]} />
        {/* [[1,2],[1,1],[1,1]] → a tall list beside two stacked tiles. */}
        <NotchGridItem subItems={[{
        cost: [1, 2],
        content: <div className="flex h-full flex-col gap-1.5">
                  <p className="text-sm font-medium text-on-surface">Recent</p>
                  {["v0.3.1 published", "installed by @anna", "deps reviewed", "tunnel up 4h"].map(t => <p key={t} className="text-xs text-on-surface-variant">{t}</p>)}
                </div>
      }, {
        cost: [1, 1],
        content: <Tile icon="groups" label="Tenants" value="37" />
      }, {
        cost: [1, 1],
        content: <Tile icon="schedule" label="Pending" value="1" />
      }]} subCols={2} />
      </NotchGrid>
    </div>
}`,...F.parameters?.docs?.source},description:{story:"A component built from sub-items, each with a `[cols, rows]` block cost —\n the panel's notched footprint is the union of where the grid packs them.\n e.g. `subItems={[[1,1],[2,2]]}` → a 1×1 widget beside a 2×2 one.",...F.parameters?.docs?.description}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    cols: 6,
    draggable: true
  },
  render: args => <div className="bg-background p-6">
      <NotchGrid {...args}>
        <NotchGridItem shape={[[1, 1, 1], [1, 1, 0]]} fill="var(--color-primary-container)" stroke="none">
          <Tile icon="drag_indicator" label="Drag me" value="hero" />
        </NotchGridItem>
        <NotchGridItem shape={[[1]]}><Tile icon="apps" label="Installs" value="1,240" /></NotchGridItem>
        <NotchGridItem shape={[[1]]}><Tile icon="payments" label="Earned" value="$84" /></NotchGridItem>
        <NotchGridItem shape={[[1, 1]]}>
          <div className="flex h-full items-center gap-2">
            <Icon name="bolt" size={16} className="text-primary" />
            <span className="text-xs text-on-surface-variant">live · 2.1k req/min</span>
          </div>
        </NotchGridItem>
        <NotchGridItem shape={[[1], [1]]}>
          <div className="flex h-full flex-col gap-1">
            <p className="text-sm font-medium text-on-surface">Recent</p>
            <p className="text-xs text-on-surface-variant">v0.3.1 published</p>
            <p className="text-xs text-on-surface-variant">installed by @anna</p>
          </div>
        </NotchGridItem>
        <NotchGridItem shape={[[1]]}><Tile icon="calendar_today" label="Created" value="May" /></NotchGridItem>
      </NotchGrid>
    </div>
}`,...Z.parameters?.docs?.source},description:{story:"`draggable` — grab any tile and drop it onto a different block cell; it\n becomes pinned there and the rest re-flow around it (and into its notches).",...Z.parameters?.docs?.description}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <div className="bg-background p-6">
      <div className="resize-x overflow-auto rounded-2xl border border-dashed border-outline-variant p-2" style={{
      width: 720,
      minWidth: 220,
      maxWidth: "100%"
    }}>
        <NotchGrid>
          <NotchGridItem shape={{
          sizes: [[1, 1], [2, 2], [3, 2]]
        }} fill="var(--color-primary-container)" stroke="none">
            <Tile icon="dashboard" label="Hero" value="1·1 → 2·2 → 3·2" />
          </NotchGridItem>
          <NotchGridItem shape={{
          sizes: [[1, 1], [2, 1]]
        }}>
            <Tile icon="apps" label="Installs" value="1·1 → 2·1" />
          </NotchGridItem>
          <NotchGridItem shape={{
          sizes: [[1, 1]]
        }}>
            <Tile icon="payments" label="Earned" value="1·1" />
          </NotchGridItem>
          <NotchGridItem shape={{
          sizes: [[1, 1], [1, 2]]
        }}>
            <Tile icon="new_releases" label="Version" value="1·1 → 1·2" />
          </NotchGridItem>
          <NotchGridItem shape={{
          sizes: [[1, 1], [2, 1]]
        }}>
            <Tile icon="history" label="Activity" value="1·1 → 2·1" />
          </NotchGridItem>
        </NotchGrid>
      </div>
    </div>
}`,...Q.parameters?.docs?.source},description:{story:"Items declare candidate `[cols, rows]` block costs — `{ sizes: [...] }` —\n and the grid auto-picks the largest that fits as you drag the width.",...Q.parameters?.docs?.description}}};const it=["OverviewPage","SubItemPanels","Draggable","BlockCostSizes"];export{Q as BlockCostSizes,Z as Draggable,U as OverviewPage,F as SubItemPanels,it as __namedExportsOrder,ot as default};
