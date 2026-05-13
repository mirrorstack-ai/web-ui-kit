import{j as e,r as w}from"./iframe-DhXEUThj.js";import{I as $}from"./Icon-Df0jOJ6O.js";import{c as ce}from"./cn-IyxL_b2c.js";import{m as O,a as Ne,B as Ie,b as ze,c as Ee}from"./BlockShape-CZTzTifv.js";import"./preload-helper-PPVm8Dsz.js";const de={base:0,sm:640,md:768,lg:1024,xl:1280,"2xl":1536};function me(t){return t!=null&&typeof t=="object"&&!Array.isArray(t)}function _e(t){return me(t)}function Ke(t,s){if(t in s)return s[t];const n=Number(t);return Number.isFinite(n)?n:0}function De(t,s,n=de){if(!_e(t))return t;const l=Object.entries(t).map(([c,h])=>[Ke(c,n),h]).sort((c,h)=>c[0]-h[0]);if(l.length===0)return t;let i=l[0][1];for(const[c,h]of l)if(s>=c)i=h;else break;return i}function Oe(t){return me(t)&&Array.isArray(t.sizes)}function Be(t){return me(t)&&Array.isArray(t.prefer)}function $e(t,s){const n=Math.max(1,Math.floor(t)),l=Math.max(1,Math.floor(s));return Array.from({length:l},()=>Array(n).fill(1))}function ke(t,s){if(Be(t)){const n=t.prefer.filter(i=>i.length>0&&O(i)>0);return n.length===0?[[1]]:n.find(i=>O(i)<=s.columns)??n.reduce((i,c)=>O(c)<O(i)?c:i)}if(Oe(t)){const l=[...t.sizes.map(c=>[c[0]??1,c[1]??c[0]??1])].sort((c,h)=>c[0]-h[0]);let i=l[0]??[1,1];for(const c of l)c[0]<=s.columns&&(i=c);return $e(i[0],i[1])}return De(t,s.width,s.breakpoints)}const We=1e5;function ge(t){return{w:O(t),h:t.length}}function ve(t,s){const n=Math.max(1,Math.floor(t)),l=Math.max(1,Math.floor(s));return Array.from({length:l},()=>Array(n).fill(!0))}function Ve(t){let s=1,n=1;for(const i of t)s=Math.max(s,i.row+i.rows),n=Math.max(n,i.col+i.cols);const l=Array.from({length:s},()=>Array(n).fill(!1));for(const i of t)for(let c=0;c<i.rows;c++)for(let h=0;h<i.cols;h++)l[i.row+c][i.col+h]=!0;return l}function Z(t,s){const n=Math.max(1,Math.floor(s)),l=[],i=r=>{for(;l.length<=r;)l.push(new Array(n).fill(!1))},c=(r,d,g)=>{for(let x=0;x<r.length;x++){const y=r[x];for(let u=0;u<y.length;u++){if(!y[u])continue;const S=d+u;if(S<0||S>=n)return!0;const P=g+x;if(i(P),l[P][S])return!0}}return!1},h=(r,d,g)=>{for(let x=0;x<r.length;x++){const y=r[x];for(let u=0;u<y.length;u++)y[u]&&(i(g+x),l[g+x][d+u]=!0)}},I=[],R=[],E=r=>r.col!=null&&r.row!=null,C=[];for(const r of t){if(!E(r)){C.push(r);continue}const{w:d,h:g}=ge(r.mask);r.col>=0&&r.col+d<=n&&!c(r.mask,r.col,r.row)?(h(r.mask,r.col,r.row),I.push({item:r.item,col:r.col,row:r.row,cols:d,rows:g})):C.unshift(r)}const A=()=>{let r=0;for(let d=0;d<l.length;d++)l[d].some(Boolean)&&(r=d+1);return r};for(const r of C){const{w:d,h:g}=ge(r.mask);if(d>n){const y=A();for(let u=0;u<g;u++){i(y+u);for(let S=0;S<n;S++)l[y+u][S]=!0}I.push({item:r.item,col:0,row:y,cols:d,rows:g}),R.push(r.item);continue}let x=!1;for(let y=0;y<We&&!x;y++)for(let u=0;u+d<=n;u++)if(!c(r.mask,u,y)){h(r.mask,u,y),I.push({item:r.item,col:u,row:y,cols:d,rows:g}),x=!0;break}}let k=0,M=n;for(const r of I)k=Math.max(k,r.row+r.rows),M=Math.max(M,r.col+r.cols);return{placed:I,cols:M,rows:k,overflowed:R}}function X(t){let s=0;for(const n of t)for(const l of n)l&&s++;return s}function je(t){if(t.length<=1)return[[...t]];const s=[];for(let n=0;n<t.length;n++){const l=[...t.slice(0,n),...t.slice(n+1)];for(const i of je(l))s.push([t[n],...i])}return s}function Le(t,s){for(let n=0;n<t.length;n++){if(t[n]<s[n])return!0;if(t[n]>s[n])return!1}return!1}function Xe(t,{maxCols:s,minCols:n,targetAspect:l=1.6,exhaustiveUpTo:i=4}){const c=Math.max(1,Math.floor(s));if(t.length===0)return{placed:[],cols:c,rows:0,overflowed:[]};const h=Math.max(1,...t.map(d=>O(d.mask))),I=Math.max(1,Math.floor(n??h)),R=t.reduce((d,g)=>d+X(g.mask),0),E=Math.max(I,Math.min(c,Math.max(h,R)));if(t.some(d=>d.col!=null&&d.row!=null))return Z(t,c);const C=[...t].sort((d,g)=>X(g.mask)-X(d.mask)),A=[...t].sort((d,g)=>X(d.mask)-X(g.mask)),k=t.length<=i?je([...t]):[t,C,A];let M,r=[1/0,1/0,1/0];for(let d=I;d<=E;d++)for(const g of k){const x=Z(g,d),y=x.cols*x.rows,u=[y,Math.abs(x.cols/x.rows-l),y-R];Le(u,r)&&(M=x,r=u)}return M??Z(t,c)}function Ye(t){return Array.isArray(t)?{cost:t}:t}function p({shape:t,subItems:s,tier:n,block:l,radius:i,inverseRadius:c,fill:h,stroke:I,strokeWidth:R,pad:E,noClip:C,className:A,style:k,children:M}){if(s&&s.length>0)return e.jsx("div",{className:A,style:k,children:M});const r=ke(t??[[1]],{width:Number.POSITIVE_INFINITY,columns:Number.MAX_SAFE_INTEGER}),d=n??Ne(r);return e.jsx(Ie,{shape:r,tier:d,block:l,radius:i,inverseRadius:c,fill:h,stroke:I,strokeWidth:R,pad:E,noClip:C,className:A,style:k,children:M})}p.__docgenInfo={description:"Inside a {@link NotchGrid} this component is *not* rendered directly — the\ngrid reads these props, packs sub-items / resolves the responsive shape, and\nrenders the positioned `BlockShape`s itself.\n\nRendered standalone, it falls back to its largest defined shape variant (or,\nwith `subItems`, just renders its `children`) so it still shows something\nuseful in isolation / tests.",methods:[],displayName:"NotchGridItem",props:{key:{required:!1,tsType:{name:"Key"},description:"React key when supplied via the `items` prop array."},shape:{required:!1,tsType:{name:"union",raw:"Responsive<ShapeMatrix> | ShapeSizes | ShapePreferences",elements:[{name:"union",raw:"T | { [key: string]: T }",elements:[{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0},{name:"signature",type:"object",raw:"{ [key: string]: T }",signature:{properties:[{key:{name:"string"},value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}}]}}]},{name:"signature",type:"object",raw:"{ readonly sizes: ReadonlyArray<readonly number[]> }",signature:{properties:[{key:"sizes",value:{name:"ReadonlyArray",elements:[{name:"unknown"}],raw:"ReadonlyArray<readonly number[]>",required:!0}}]}},{name:"signature",type:"object",raw:"{ readonly prefer: ReadonlyArray<ShapeMatrix> }",signature:{properties:[{key:"prefer",value:{name:"ReadonlyArray",elements:[{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}],raw:"ReadonlyArray<ShapeMatrix>",required:!0}}]}}]},description:"The block footprint — one of:\n - a matrix `[[0,1],[1,1]]` (`0` notch/empty, `1` filled, `2+` tier-encoded);\n - a breakpoint map of matrices, `{ base: …, md: … }` or px keys `{ 0: …, 900: … }`;\n - candidate `[cols, rows]` block costs `{ sizes: [[1,1],[2,2]] }` — the grid\n   picks the largest that fits, so the component grows when there's room;\n - preferred matrices in priority order `{ prefer: [bigShape, smallerShape, …] }`\n   — the grid uses the first that fits the column count, else the narrowest.\n\nIgnored when {@link subItems} is given (the footprint is derived from those)."},subItems:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:"NotchSubItem | readonly [number, number]",elements:[{name:"NotchSubItem"},{name:"unknown"}]}],raw:"ReadonlyArray<NotchSubItemInput>"},description:"Build this item as a panel of sub-widgets, each with a `[cols, rows]` block\ncost — `[[1,1],[2,2]]` is a 1×1 sub-item beside a 2×2 one. The grid packs\nthem (into {@link subCols} columns) and the panel's notched footprint is the\nunion of their positions."},subCols:{required:!1,tsType:{name:"number"},description:`Pin the column count the sub-items pack into. Omit to let the grid search
 column counts × orderings for the most compact arrangement.`},subAspect:{required:!1,tsType:{name:"number"},description:"Preferred width ÷ height for the auto-arranged sub-item layout — the\n tie-breaker between equally-compact options. Default 1.6 (gently landscape).\n Ignored when `subCols` is set."},col:{required:!1,tsType:{name:"number"},description:"Explicit grid position in block units. Auto-flowed when omitted."},row:{required:!1,tsType:{name:"number"},description:""},tier:{required:!1,tsType:{name:"number"},description:"Tier selector for a tier-encoded matrix. Default: every tier (`maxTier`)."},block:{required:!1,tsType:{name:"number"},description:"Block edge in px (normally inherited from the parent `NotchGrid`)."},radius:{required:!1,tsType:{name:"number"},description:""},inverseRadius:{required:!1,tsType:{name:"number"},description:""},fill:{required:!1,tsType:{name:"string"},description:""},stroke:{required:!1,tsType:{name:"string"},description:""},strokeWidth:{required:!1,tsType:{name:"number"},description:""},pad:{required:!1,tsType:{name:"number"},description:""},noClip:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const we=t=>Math.max(1,Math.floor(t));function He(t){const[s,n]=w.useState(0);return w.useLayoutEffect(()=>{const l=t.current;if(!l)return;const i=()=>{const h=Math.round(l.getBoundingClientRect().width);n(I=>I===h?I:h)};if(i(),typeof ResizeObserver>"u")return;const c=new ResizeObserver(i);return c.observe(l),()=>c.disconnect()},[t]),s}function W({cols:t,block:s=ze,gap:n=8,breakpoints:l,radius:i,inverseRadius:c,fill:h,stroke:I,strokeWidth:R,pad:E,nest:C=!0,items:A,draggable:k=!1,onItemMove:M,onSubItemMove:r,children:d,className:g,style:x}){const y=w.useRef(null),u=He(y),S=w.useMemo(()=>l?{...de,...l}:de,[l]),P=t??Math.max(1,Math.floor(u/s)),[V,Te]=w.useState(new Map),[Q,re]=w.useState(null),ae=w.useRef(null);ae.current=Q;const Me=w.useCallback(b=>{const o=ae.current;!o||b.pointerId!==o.pointerId||re({...o,dx:b.clientX-o.startX,dy:b.clientY-o.startY})},[]),ue=w.useCallback(b=>{const o=ae.current;if(!o||b.pointerId!==o.pointerId)return;try{b.currentTarget.releasePointerCapture(b.pointerId)}catch{}const q=Math.max(0,P-o.originCols),_=Math.min(q,Math.max(0,o.originCol+Math.round(o.dx/s))),f=Math.max(0,o.originRow+Math.round(o.dy/s));re(null),Te(a=>new Map(a).set(o.key,{col:_,row:f})),M?.(o.key,_,f)},[s,P,M]),[pe,Ge]=w.useState(new Map),[L,oe]=w.useState(null),ie=w.useRef(null);ie.current=L;const[he,fe]=w.useState(null),Ce=w.useCallback(b=>{const o=ie.current;!o||b.pointerId!==o.pointerId||oe({...o,dx:b.clientX-o.startX,dy:b.clientY-o.startY})},[]),xe=w.useCallback(b=>{const o=ie.current;if(!o||b.pointerId!==o.pointerId)return;try{b.currentTarget.releasePointerCapture(b.pointerId)}catch{}const q=Math.max(0,o.parentSubCols-o.cost[0]),_=Math.max(0,o.parentSubRows-o.cost[1]),f=Math.min(q,Math.max(0,o.originCol+Math.round(o.dx/o.itemBlock))),a=Math.min(_,Math.max(0,o.originRow+Math.round(o.dy/o.itemBlock)));oe(null),Ge(j=>{const K=new Map(j),T=new Map(K.get(o.parentKey)??new Map);return T.set(o.subKey,{col:f,row:a}),K.set(o.parentKey,T),K}),r?.(o.parentKey,o.subKey,f,a)},[r]),{placed:Se,gridCols:Re,gridRows:Ae}=w.useMemo(()=>{const b=[];w.Children.forEach(d,(a,j)=>{w.isValidElement(a)&&a.type===p&&b.push({props:a.props,key:a.key??`c${j}`})}),(A??[]).forEach((a,j)=>b.push({props:a,key:a.key??`i${j}`}));const o=b.map(({props:a,key:j})=>{if(a.subItems&&a.subItems.length>0){const T=a.subItems.map((v,m)=>({...Ye(v),_i:m})),D=v=>Math.max(1,Math.floor(v.cost[0])),B=Math.max(1,...T.map(D)),J=pe.get(j),ee=T.map(v=>{const m=v.key??`s${v._i}`,z=J?.get(m);return{item:{sub:v,key:m},mask:ve(v.cost[0],v.cost[1]),col:z?.col??v.col,row:z?.row??v.row}}),te=(a.subCols!=null?Z(ee,a.subCols):Xe(ee,{maxCols:Math.max(B,P),minCols:B,targetAspect:a.subAspect})).placed,le=Ve(te).map(v=>v.map(m=>m?1:0));return{props:a,key:j,matrix:le,tier:1,subPlaced:te.map(v=>({sub:v.item.sub,key:v.item.key,col:v.col,row:v.row}))}}const K=ke(a.shape??[[1]],{width:u,columns:P,breakpoints:S});return{props:a,key:j,matrix:K,tier:a.tier??Ne(K)}}),q=a=>{const j=V.get(a.key);return{item:a,mask:C?Ee(a.matrix,a.tier):ve(Math.max(1,O(a.matrix)),Math.max(1,a.matrix.length)),col:j?.col??a.props.col,row:j?.row??a.props.row}},_=[...o.filter(a=>V.has(a.key)).map(q),...o.filter(a=>!V.has(a.key)).map(q)],f=Z(_,P);return{placed:f.placed,gridCols:f.cols,gridRows:f.rows}},[d,A,u,P,S,C,V,pe]);return e.jsx("div",{ref:y,className:ce("w-full",g),style:x,children:e.jsx("div",{className:"relative",style:{width:Re*s,height:Ae*s},children:Se.map(({item:b,col:o,row:q,cols:_})=>{const{props:f,key:a,matrix:j,tier:K,subPlaced:T}=b,D=f.block??s,B=Q?.key===a,J=!!T,ee=J?Math.max(1,...T.map(m=>m.col+Math.max(1,m.sub.cost[0]))):0,te=J?Math.max(1,...T.map(m=>m.row+Math.max(1,m.sub.cost[1]))):0,le=T?T.map(({sub:m,key:z,col:ye,row:be})=>{const ne=L?.parentKey===a&&L.subKey===z,Pe=he?.parentKey===a&&he.subKey===z,qe=k?{onPointerEnter:()=>fe({parentKey:a,subKey:z}),onPointerLeave:()=>fe(G=>G?.parentKey===a&&G.subKey===z?null:G),onPointerDown:G=>{G.button===0&&(G.stopPropagation(),G.currentTarget.setPointerCapture(G.pointerId),oe({parentKey:a,subKey:z,pointerId:G.pointerId,startX:G.clientX,startY:G.clientY,originCol:ye,originRow:be,cost:m.cost,parentSubCols:ee,parentSubRows:te,itemBlock:D,dx:0,dy:0}))},onPointerMove:Ce,onPointerUp:xe,onPointerCancel:xe}:void 0;return e.jsx("div",{...qe,className:ce("absolute overflow-hidden transition-colors",k&&"cursor-grab select-none touch-none",ne&&"cursor-grabbing",Pe&&!ne&&"bg-on-surface/10",m.className),style:{left:ye*D+n/2,top:be*D+n/2,width:we(m.cost[0])*D-n,height:we(m.cost[1])*D-n,padding:m.pad??f.pad??E??16,borderRadius:(m.radius??f.radius??i??24)*.75,background:m.fill&&m.fill!=="none"?m.fill:void 0,transform:ne?`translate(${L.dx}px, ${L.dy}px)`:void 0,zIndex:ne?30:void 0,...m.style},children:m.content},z)}):f.children,v=k?{onPointerDown:m=>{m.button===0&&(m.currentTarget.setPointerCapture(m.pointerId),re({key:a,pointerId:m.pointerId,startX:m.clientX,startY:m.clientY,originCol:o,originRow:q,originCols:_,dx:0,dy:0}))},onPointerMove:Me,onPointerUp:ue,onPointerCancel:ue}:void 0;return e.jsx("div",{...v,className:ce("absolute",k&&"select-none touch-none",k&&(B?"cursor-grabbing":"cursor-grab")),style:{left:o*s,top:q*s,transform:B?`translate(${Q.dx}px, ${Q.dy}px)`:void 0,zIndex:B?20:V.has(a)?10:void 0},children:e.jsx(Ie,{shape:j,tier:K,block:D,gap:n,radius:f.radius??i,inverseRadius:f.inverseRadius??c,fill:f.fill??h,stroke:f.stroke??I,strokeWidth:f.strokeWidth??R,pad:T?0:f.pad??E,noClip:T?void 0:f.noClip,className:f.className,style:f.style,children:le})},a)})})})}W.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{cols:{required:!1,tsType:{name:"number"},description:"Fixed column count. Omit to auto-fit `floor(width / block)`."},block:{required:!1,tsType:{name:"number"},description:"Block edge in px. Default {@link BLOCK_SIZE} (96).",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap (px) between items — each item's outline is eroded by `gap / 2`, so\n the spacing is the same whether items sit edge-to-edge or one nestles into\n another's notch. Default 8.",defaultValue:{value:"8",computed:!1}},breakpoints:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"number"}],raw:"Record<string, number>"},description:"Override / extend the Tailwind-style breakpoint thresholds (min container\n width in px) used to resolve each item's responsive `shape`."},radius:{required:!1,tsType:{name:"number"},description:"Default corner radius forwarded to every item."},inverseRadius:{required:!1,tsType:{name:"number"},description:"Default notch corner radius forwarded to every item."},fill:{required:!1,tsType:{name:"string"},description:""},stroke:{required:!1,tsType:{name:"string"},description:""},strokeWidth:{required:!1,tsType:{name:"number"},description:""},pad:{required:!1,tsType:{name:"number"},description:""},nest:{required:!1,tsType:{name:"boolean"},description:"When `true` (default), an item reserves only its *filled* cells, so a\n complementary shape can nestle into another's notch (interlocking layout).\n Set `false` to reserve each item's whole bounding box — boxes never\n overlap, at the cost of notches staying empty.",defaultValue:{value:"true",computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"NotchGridItemProps"}],raw:"NotchGridItemProps[]"},description:"Items as data (in addition to / instead of `<NotchGridItem>` children)."},draggable:{required:!1,tsType:{name:"boolean"},description:`Let the user drag items onto a different block cell. Dropped items become
 pinned and the rest re-flow around them.`,defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: Key, col: number, row: number) => void",signature:{arguments:[{type:{name:"Key"},name:"key"},{type:{name:"number"},name:"col"},{type:{name:"number"},name:"row"}],return:{name:"void"}}},description:"Called after a drag drops an item, with its new block position."},onSubItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(parentKey: Key, subKey: Key, col: number, row: number) => void",signature:{arguments:[{type:{name:"Key"},name:"parentKey"},{type:{name:"Key"},name:"subKey"},{type:{name:"number"},name:"col"},{type:{name:"number"},name:"row"}],return:{name:"void"}}},description:`Called after a sub-item drag drops on a new sub-grid cell. The panel
 re-packs around the new position; if the move would change the panel's
 notched footprint, neighbouring items in the outer grid re-flow too.`},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const et={title:"UI/Notch/NotchGrid",component:W,parameters:{layout:"fullscreen"},args:{block:96},argTypes:{cols:{control:{type:"number",min:1,max:12}},block:{control:{type:"range",min:56,max:140,step:4}}}};function N({icon:t,label:s,value:n}){return e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx($,{name:t,size:18,className:"text-primary"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-surface-variant",children:s}),e.jsx("p",{className:"text-lg font-medium text-on-surface",children:n})]})]})}function se({icon:t,label:s,value:n}){return e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx($,{name:t,size:16,className:"text-on-primary-container"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-primary-container/70",children:s}),e.jsx("p",{className:"text-base font-medium text-on-primary-container",children:n})]})]})}const Y={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(W,{cols:7,draggable:!0,children:[e.jsx(p,{col:0,row:0,shape:[[1,1,1],[1,1,1],[1,1,0]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx($,{name:"extension",size:22,className:"text-on-primary-container"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-primary-container/70",children:"Module"}),e.jsx("p",{className:"text-xl font-medium text-on-primary-container",children:"identity-federated"}),e.jsx("p",{className:"text-xs text-on-primary-container/70",children:"@me/identity-federated · v0.3.1"})]})]})}),e.jsx(p,{col:2,row:2,shape:[[1]],children:e.jsx(N,{icon:"apps",label:"Installs",value:"1,240"})}),e.jsx(p,{col:3,row:0,shape:[[0,1,0],[1,1,1],[0,1,0]],children:e.jsxs("div",{className:"flex h-full flex-col items-center justify-center text-center",children:[e.jsx($,{name:"bolt",size:18,className:"text-primary"}),e.jsx("p",{className:"mt-1 text-sm font-medium text-on-surface",children:"Status"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"live · healthy"})]})}),e.jsx(p,{col:3,row:0,shape:[[1]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(se,{icon:"payments",label:"Earned",value:"$84"})}),e.jsx(p,{col:5,row:0,shape:[[1]],children:e.jsx(N,{icon:"new_releases",label:"Version",value:"v0.3.1"})}),e.jsx(p,{col:3,row:2,shape:[[1]],children:e.jsx(N,{icon:"groups",label:"Tenants",value:"37"})}),e.jsx(p,{col:5,row:2,shape:[[1]],children:e.jsx(N,{icon:"schedule",label:"Pending",value:"1"})}),e.jsx(p,{col:6,row:0,shape:[[1],[1],[1]],children:e.jsxs("div",{className:"flex h-full flex-col gap-2",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),["v0.3.1 published","installed by @anna","deps reviewed","tunnel up 4h"].map(t=>e.jsx("p",{className:"text-xs text-on-surface-variant",children:t},t))]})}),e.jsx(p,{col:0,row:3,shape:[[1,1,1,0],[1,1,1,1]],children:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Usage — last 30 days"}),e.jsx("div",{className:"mt-2 flex flex-1 items-end gap-1",children:[40,65,50,80,55,70,90,60,75,95,85,100].map((t,s)=>e.jsx("div",{className:"flex-1 rounded-t bg-primary/60",style:{height:`${t}%`}},s))})]})}),e.jsx(p,{col:3,row:3,shape:[[1]],children:e.jsx(N,{icon:"build",label:"Builds",value:"312"})}),e.jsx(p,{col:4,row:3,fill:"var(--color-primary-container)",subItems:[{cost:[1,1],content:e.jsx(se,{icon:"schedule",label:"Cron",value:"6×"})},{cost:[2,2],content:e.jsx(se,{icon:"insights",label:"Calls / day",value:"128k"})}]})]})})},H={args:{cols:7},render:t=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(W,{...t,children:[e.jsx(p,{fill:"var(--color-primary-container)",stroke:"none",subItems:[{cost:[2,2],content:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("p",{className:"text-sm font-medium text-on-primary-container",children:"Usage"}),e.jsx("div",{className:"mt-2 flex flex-1 items-end gap-1",children:[40,70,55,85,60,95,75].map((s,n)=>e.jsx("div",{className:"flex-1 rounded-t bg-on-primary-container/35",style:{height:`${s}%`}},n))})]})},{cost:[1,1],content:e.jsx(se,{icon:"payments",label:"Earned",value:"$84"})}]}),e.jsx(p,{subItems:[{cost:[1,1],content:e.jsx(N,{icon:"apps",label:"Installs",value:"1,240"})},{cost:[1,1],content:e.jsx(N,{icon:"new_releases",label:"Version",value:"v0.3.1"})},{cost:[2,1],content:e.jsxs("div",{className:"flex h-full items-center gap-2",children:[e.jsx($,{name:"bolt",size:16,className:"text-primary"}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:"tunnel up · 2.1k req/min · p99 142ms"})]})}]}),e.jsx(p,{subItems:[{cost:[1,2],content:e.jsxs("div",{className:"flex h-full flex-col gap-1.5",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),["v0.3.1 published","installed by @anna","deps reviewed","tunnel up 4h"].map(s=>e.jsx("p",{className:"text-xs text-on-surface-variant",children:s},s))]})},{cost:[1,1],content:e.jsx(N,{icon:"groups",label:"Tenants",value:"37"})},{cost:[1,1],content:e.jsx(N,{icon:"schedule",label:"Pending",value:"1"})}],subCols:2})]})})},U={args:{cols:6,draggable:!0},render:t=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(W,{...t,children:[e.jsx(p,{shape:[[1,1,1],[1,1,0]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(N,{icon:"drag_indicator",label:"Drag me",value:"hero"})}),e.jsx(p,{shape:[[1]],children:e.jsx(N,{icon:"apps",label:"Installs",value:"1,240"})}),e.jsx(p,{shape:[[1]],children:e.jsx(N,{icon:"payments",label:"Earned",value:"$84"})}),e.jsx(p,{shape:[[1,1]],children:e.jsxs("div",{className:"flex h-full items-center gap-2",children:[e.jsx($,{name:"bolt",size:16,className:"text-primary"}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:"live · 2.1k req/min"})]})}),e.jsx(p,{shape:[[1],[1]],children:e.jsxs("div",{className:"flex h-full flex-col gap-1",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"v0.3.1 published"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"installed by @anna"})]})}),e.jsx(p,{shape:[[1]],children:e.jsx(N,{icon:"calendar_today",label:"Created",value:"May"})})]})})},F={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsx("div",{className:"resize-x overflow-auto rounded-2xl border border-dashed border-outline-variant p-2",style:{width:720,minWidth:220,maxWidth:"100%"},children:e.jsxs(W,{children:[e.jsx(p,{shape:{sizes:[[1,1],[2,2],[3,2]]},fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(N,{icon:"dashboard",label:"Hero",value:"1·1 → 2·2 → 3·2"})}),e.jsx(p,{shape:{sizes:[[1,1],[2,1]]},children:e.jsx(N,{icon:"apps",label:"Installs",value:"1·1 → 2·1"})}),e.jsx(p,{shape:{sizes:[[1,1]]},children:e.jsx(N,{icon:"payments",label:"Earned",value:"1·1"})}),e.jsx(p,{shape:{sizes:[[1,1],[1,2]]},children:e.jsx(N,{icon:"new_releases",label:"Version",value:"1·1 → 1·2"})}),e.jsx(p,{shape:{sizes:[[1,1],[2,1]]},children:e.jsx(N,{icon:"history",label:"Activity",value:"1·1 → 2·1"})})]})})})};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source},description:{story:"An overview page laid out by hand (explicit `col`/`row`) so the notched\npieces interlock cleanly: 1×1 tiles drop into the L-hero's notch and into all\nfour of the plus's corners and the chart's notch; the `subItems={[[1,1],[2,2]]}`\npanel is an L of its own. `nest` (default) keeps notches fillable — nothing\nreserves empty corners — and `draggable` lets you re-arrange it.",...Y.parameters?.docs?.description}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source},description:{story:"A component built from sub-items, each with a `[cols, rows]` block cost —\n the panel's notched footprint is the union of where the grid packs them.\n e.g. `subItems={[[1,1],[2,2]]}` → a 1×1 widget beside a 2×2 one.",...H.parameters?.docs?.description}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source},description:{story:"`draggable` — grab any tile and drop it onto a different block cell; it\n becomes pinned there and the rest re-flow around it (and into its notches).",...U.parameters?.docs?.description}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source},description:{story:"Items declare candidate `[cols, rows]` block costs — `{ sizes: [...] }` —\n and the grid auto-picks the largest that fits as you drag the width.",...F.parameters?.docs?.description}}};const tt=["OverviewPage","SubItemPanels","Draggable","BlockCostSizes"];export{F as BlockCostSizes,U as Draggable,Y as OverviewPage,H as SubItemPanels,tt as __namedExportsOrder,et as default};
