import{j as e,r as T}from"./iframe-CGW82T0d.js";import{I as B}from"./Icon-D_LUrdug.js";import{c as te}from"./cn-IyxL_b2c.js";import{m as _,a as le,B as ce,b as be,c as ve}from"./BlockShape-Bl7jTq2A.js";import"./preload-helper-PPVm8Dsz.js";const ne={base:0,sm:640,md:768,lg:1024,xl:1280,"2xl":1536};function se(t){return t!=null&&typeof t=="object"&&!Array.isArray(t)}function ge(t){return se(t)}function we(t,n){if(t in n)return n[t];const s=Number(t);return Number.isFinite(s)?s:0}function Ne(t,n,s=ne){if(!ge(t))return t;const o=Object.entries(t).map(([l,u])=>[we(l,s),u]).sort((l,u)=>l[0]-u[0]);if(o.length===0)return t;let a=o[0][1];for(const[l,u]of o)if(n>=l)a=u;else break;return a}function ke(t){return se(t)&&Array.isArray(t.sizes)}function je(t){return se(t)&&Array.isArray(t.prefer)}function Ie(t,n){const s=Math.max(1,Math.floor(t)),o=Math.max(1,Math.floor(n));return Array.from({length:o},()=>Array(s).fill(1))}function de(t,n){if(je(t)){const s=t.prefer.filter(a=>a.length>0&&_(a)>0);return s.length===0?[[1]]:s.find(a=>_(a)<=n.columns)??s.reduce((a,l)=>_(l)<_(a)?l:a)}if(ke(t)){const o=[...t.sizes.map(l=>[l[0]??1,l[1]??l[0]??1])].sort((l,u)=>l[0]-u[0]);let a=o[0]??[1,1];for(const l of o)l[0]<=n.columns&&(a=l);return Ie(a[0],a[1])}return Ne(t,n.width,n.breakpoints)}const Te=1e5;function ae(t){return{w:_(t),h:t.length}}function oe(t,n){const s=Math.max(1,Math.floor(t)),o=Math.max(1,Math.floor(n));return Array.from({length:o},()=>Array(s).fill(!0))}function Ge(t){let n=1,s=1;for(const a of t)n=Math.max(n,a.row+a.rows),s=Math.max(s,a.col+a.cols);const o=Array.from({length:n},()=>Array(s).fill(!1));for(const a of t)for(let l=0;l<a.rows;l++)for(let u=0;u<a.cols;u++)o[a.row+l][a.col+u]=!0;return o}function U(t,n){const s=Math.max(1,Math.floor(n)),o=[],a=r=>{for(;o.length<=r;)o.push(new Array(s).fill(!1))},l=(r,c,x)=>{for(let p=0;p<r.length;p++){const h=r[p];for(let m=0;m<h.length;m++){if(!h[m])continue;const N=c+m;if(N<0||N>=s)return!0;const R=x+p;if(a(R),o[R][N])return!0}}return!1},u=(r,c,x)=>{for(let p=0;p<r.length;p++){const h=r[p];for(let m=0;m<h.length;m++)h[m]&&(a(x+p),o[x+p][c+m]=!0)}},w=[],A=[],q=r=>r.col!=null&&r.row!=null,M=[];for(const r of t){if(!q(r)){M.push(r);continue}const{w:c,h:x}=ae(r.mask);r.col>=0&&r.col+c<=s&&!l(r.mask,r.col,r.row)?(u(r.mask,r.col,r.row),w.push({item:r.item,col:r.col,row:r.row,cols:c,rows:x})):M.unshift(r)}const C=()=>{let r=0;for(let c=0;c<o.length;c++)o[c].some(Boolean)&&(r=c+1);return r};for(const r of M){const{w:c,h:x}=ae(r.mask);if(c>s){const h=C();for(let m=0;m<x;m++){a(h+m);for(let N=0;N<s;N++)o[h+m][N]=!0}w.push({item:r.item,col:0,row:h,cols:c,rows:x}),A.push(r.item);continue}let p=!1;for(let h=0;h<Te&&!p;h++)for(let m=0;m+c<=s;m++)if(!l(r.mask,m,h)){u(r.mask,m,h),w.push({item:r.item,col:m,row:h,cols:c,rows:x}),p=!0;break}}let j=0,I=s;for(const r of w)j=Math.max(j,r.row+r.rows),I=Math.max(I,r.col+r.cols);return{placed:w,cols:I,rows:j,overflowed:A}}function W(t){let n=0;for(const s of t)for(const o of s)o&&n++;return n}function me(t){if(t.length<=1)return[[...t]];const n=[];for(let s=0;s<t.length;s++){const o=[...t.slice(0,s),...t.slice(s+1)];for(const a of me(o))n.push([t[s],...a])}return n}function Me(t,n){for(let s=0;s<t.length;s++){if(t[s]<n[s])return!0;if(t[s]>n[s])return!1}return!1}function Ae(t,{maxCols:n,minCols:s,targetAspect:o=1.6,exhaustiveUpTo:a=4}){const l=Math.max(1,Math.floor(n));if(t.length===0)return{placed:[],cols:l,rows:0,overflowed:[]};const u=Math.max(1,...t.map(c=>_(c.mask))),w=Math.max(1,Math.floor(s??u)),A=t.reduce((c,x)=>c+W(x.mask),0),q=Math.max(w,Math.min(l,Math.max(u,A)));if(t.some(c=>c.col!=null&&c.row!=null))return U(t,l);const M=[...t].sort((c,x)=>W(x.mask)-W(c.mask)),C=[...t].sort((c,x)=>W(c.mask)-W(x.mask)),j=t.length<=a?me([...t]):[t,M,C];let I,r=[1/0,1/0,1/0];for(let c=w;c<=q;c++)for(const x of j){const p=U(x,c),h=p.cols*p.rows,m=[h,Math.abs(p.cols/p.rows-o),h-A];Me(m,r)&&(I=p,r=m)}return I??U(t,l)}function Ce(t){return Array.isArray(t)?{cost:t}:t}function d({shape:t,subItems:n,tier:s,block:o,radius:a,inverseRadius:l,fill:u,stroke:w,strokeWidth:A,pad:q,noClip:M,className:C,style:j,children:I}){if(n&&n.length>0)return e.jsx("div",{className:C,style:j,children:I});const r=de(t??[[1]],{width:Number.POSITIVE_INFINITY,columns:Number.MAX_SAFE_INTEGER}),c=s??le(r);return e.jsx(ce,{shape:r,tier:c,block:o,radius:a,inverseRadius:l,fill:u,stroke:w,strokeWidth:A,pad:q,noClip:M,className:C,style:j,children:I})}d.__docgenInfo={description:"Inside a {@link NotchGrid} this component is *not* rendered directly — the\ngrid reads these props, packs sub-items / resolves the responsive shape, and\nrenders the positioned `BlockShape`s itself.\n\nRendered standalone, it falls back to its largest defined shape variant (or,\nwith `subItems`, just renders its `children`) so it still shows something\nuseful in isolation / tests.",methods:[],displayName:"NotchGridItem",props:{key:{required:!1,tsType:{name:"Key"},description:"React key when supplied via the `items` prop array."},shape:{required:!1,tsType:{name:"union",raw:"Responsive<ShapeMatrix> | ShapeSizes | ShapePreferences",elements:[{name:"union",raw:"T | { [key: string]: T }",elements:[{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0},{name:"signature",type:"object",raw:"{ [key: string]: T }",signature:{properties:[{key:{name:"string"},value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}}]}}]},{name:"signature",type:"object",raw:"{ readonly sizes: ReadonlyArray<readonly number[]> }",signature:{properties:[{key:"sizes",value:{name:"ReadonlyArray",elements:[{name:"unknown"}],raw:"ReadonlyArray<readonly number[]>",required:!0}}]}},{name:"signature",type:"object",raw:"{ readonly prefer: ReadonlyArray<ShapeMatrix> }",signature:{properties:[{key:"prefer",value:{name:"ReadonlyArray",elements:[{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}],raw:"ReadonlyArray<ShapeMatrix>",required:!0}}]}}]},description:"The block footprint — one of:\n - a matrix `[[0,1],[1,1]]` (`0` notch/empty, `1` filled, `2+` tier-encoded);\n - a breakpoint map of matrices, `{ base: …, md: … }` or px keys `{ 0: …, 900: … }`;\n - candidate `[cols, rows]` block costs `{ sizes: [[1,1],[2,2]] }` — the grid\n   picks the largest that fits, so the component grows when there's room;\n - preferred matrices in priority order `{ prefer: [bigShape, smallerShape, …] }`\n   — the grid uses the first that fits the column count, else the narrowest.\n\nIgnored when {@link subItems} is given (the footprint is derived from those)."},subItems:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:"NotchSubItem | readonly [number, number]",elements:[{name:"NotchSubItem"},{name:"unknown"}]}],raw:"ReadonlyArray<NotchSubItemInput>"},description:"Build this item as a panel of sub-widgets, each with a `[cols, rows]` block\ncost — `[[1,1],[2,2]]` is a 1×1 sub-item beside a 2×2 one. The grid packs\nthem (into {@link subCols} columns) and the panel's notched footprint is the\nunion of their positions."},subCols:{required:!1,tsType:{name:"number"},description:`Pin the column count the sub-items pack into. Omit to let the grid search
 column counts × orderings for the most compact arrangement.`},subAspect:{required:!1,tsType:{name:"number"},description:"Preferred width ÷ height for the auto-arranged sub-item layout — the\n tie-breaker between equally-compact options. Default 1.6 (gently landscape).\n Ignored when `subCols` is set."},col:{required:!1,tsType:{name:"number"},description:"Explicit grid position in block units. Auto-flowed when omitted."},row:{required:!1,tsType:{name:"number"},description:""},tier:{required:!1,tsType:{name:"number"},description:"Tier selector for a tier-encoded matrix. Default: every tier (`maxTier`)."},block:{required:!1,tsType:{name:"number"},description:"Block edge in px (normally inherited from the parent `NotchGrid`)."},radius:{required:!1,tsType:{name:"number"},description:""},inverseRadius:{required:!1,tsType:{name:"number"},description:""},fill:{required:!1,tsType:{name:"string"},description:""},stroke:{required:!1,tsType:{name:"string"},description:""},strokeWidth:{required:!1,tsType:{name:"number"},description:""},pad:{required:!1,tsType:{name:"number"},description:""},noClip:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const ie=t=>Math.max(1,Math.floor(t));function qe(t){const[n,s]=T.useState(0);return T.useLayoutEffect(()=>{const o=t.current;if(!o)return;const a=()=>{const u=Math.round(o.getBoundingClientRect().width);s(w=>w===u?w:u)};if(a(),typeof ResizeObserver>"u")return;const l=new ResizeObserver(a);return l.observe(o),()=>l.disconnect()},[t]),n}function D({cols:t,block:n=be,gap:s=8,breakpoints:o,radius:a,inverseRadius:l,fill:u,stroke:w,strokeWidth:A,pad:q,nest:M=!0,items:C,draggable:j=!1,onItemMove:I,children:r,className:c,style:x}){const p=T.useRef(null),h=qe(p),m=T.useMemo(()=>o?{...ne,...o}:ne,[o]),N=t??Math.max(1,Math.floor(h/n)),[R,ue]=T.useState(new Map),[X,J]=T.useState(null),ee=T.useRef(null);ee.current=X;const pe=T.useCallback(k=>{const f=ee.current;!f||k.pointerId!==f.pointerId||J({...f,dx:k.clientX-f.startX,dy:k.clientY-f.startY})},[]),re=T.useCallback(k=>{const f=ee.current;if(!f||k.pointerId!==f.pointerId)return;try{k.currentTarget.releasePointerCapture(k.pointerId)}catch{}const S=Math.max(0,N-f.originCols),E=Math.min(S,Math.max(0,f.originCol+Math.round(f.dx/n))),y=Math.max(0,f.originRow+Math.round(f.dy/n));J(null),ue(i=>new Map(i).set(f.key,{col:E,row:y})),I?.(f.key,E,y)},[n,N,I]),{placed:he,gridCols:fe,gridRows:xe}=T.useMemo(()=>{const k=[];T.Children.forEach(r,(i,G)=>{T.isValidElement(i)&&i.type===d&&k.push({props:i.props,key:i.key??`c${G}`})}),(C??[]).forEach((i,G)=>k.push({props:i,key:i.key??`i${G}`}));const f=k.map(({props:i,key:G})=>{if(i.subItems&&i.subItems.length>0){const P=i.subItems.map((b,$)=>({...Ce(b),_i:$})),z=b=>Math.max(1,Math.floor(b.cost[0])),O=Math.max(1,...P.map(z)),H=P.map(b=>({item:{sub:b,key:b.key??`s${b._i}`},mask:oe(b.cost[0],b.cost[1]),col:b.col,row:b.row})),Z=(i.subCols!=null?U(H,i.subCols):Ae(H,{maxCols:Math.max(O,N),minCols:O,targetAspect:i.subAspect})).placed,v=Ge(Z).map(b=>b.map($=>$?1:0));return{props:i,key:G,matrix:v,tier:1,subPlaced:Z.map(b=>({sub:b.item.sub,key:b.item.key,col:b.col,row:b.row}))}}const Y=de(i.shape??[[1]],{width:h,columns:N,breakpoints:m});return{props:i,key:G,matrix:Y,tier:i.tier??le(Y)}}),S=i=>{const G=R.get(i.key);return{item:i,mask:M?ve(i.matrix,i.tier):oe(Math.max(1,_(i.matrix)),Math.max(1,i.matrix.length)),col:G?.col??i.props.col,row:G?.row??i.props.row}},E=[...f.filter(i=>R.has(i.key)).map(S),...f.filter(i=>!R.has(i.key)).map(S)],y=U(E,N);return{placed:y.placed,gridCols:y.cols,gridRows:y.rows}},[r,C,h,N,m,M,R]);return e.jsx("div",{ref:p,className:te("w-full",c),style:x,children:e.jsx("div",{className:"relative",style:{width:fe*n,height:xe*n},children:he.map(({item:k,col:f,row:S,cols:E})=>{const{props:y,key:i,matrix:G,tier:Y,subPlaced:P}=k,z=y.block??n,O=X?.key===i,H=P?P.map(({sub:v,key:b,col:$,row:ye})=>e.jsx("div",{className:te("absolute overflow-hidden",v.className),style:{left:$*z,top:ye*z,width:ie(v.cost[0])*z,height:ie(v.cost[1])*z,padding:v.pad??y.pad??q??16,borderRadius:(v.radius??y.radius??a??24)*.75,background:v.fill&&v.fill!=="none"?v.fill:void 0,...v.style},children:v.content},b)):y.children,Z=j?{onPointerDown:v=>{v.button===0&&(v.currentTarget.setPointerCapture(v.pointerId),J({key:i,pointerId:v.pointerId,startX:v.clientX,startY:v.clientY,originCol:f,originRow:S,originCols:E,dx:0,dy:0}))},onPointerMove:pe,onPointerUp:re,onPointerCancel:re}:void 0;return e.jsx("div",{...Z,className:te("absolute",j&&"select-none touch-none"),style:{left:f*n,top:S*n,transform:O?`translate(${X.dx}px, ${X.dy}px)`:void 0,zIndex:O?20:R.has(i)?10:void 0,cursor:j?O?"grabbing":"grab":void 0},children:e.jsx(ce,{shape:G,tier:Y,block:z,gap:s,radius:y.radius??a,inverseRadius:y.inverseRadius??l,fill:y.fill??u,stroke:y.stroke??w,strokeWidth:y.strokeWidth??A,pad:P?0:y.pad??q,noClip:P?void 0:y.noClip,className:y.className,style:y.style,children:H})},i)})})})}D.__docgenInfo={description:"",methods:[],displayName:"NotchGrid",props:{cols:{required:!1,tsType:{name:"number"},description:"Fixed column count. Omit to auto-fit `floor(width / block)`."},block:{required:!1,tsType:{name:"number"},description:"Block edge in px. Default {@link BLOCK_SIZE} (96).",defaultValue:{value:"96",computed:!1}},gap:{required:!1,tsType:{name:"number"},description:"Gap (px) between items — each item's outline is eroded by `gap / 2`, so\n the spacing is the same whether items sit edge-to-edge or one nestles into\n another's notch. Default 8.",defaultValue:{value:"8",computed:!1}},breakpoints:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"number"}],raw:"Record<string, number>"},description:"Override / extend the Tailwind-style breakpoint thresholds (min container\n width in px) used to resolve each item's responsive `shape`."},radius:{required:!1,tsType:{name:"number"},description:"Default corner radius forwarded to every item."},inverseRadius:{required:!1,tsType:{name:"number"},description:"Default notch corner radius forwarded to every item."},fill:{required:!1,tsType:{name:"string"},description:""},stroke:{required:!1,tsType:{name:"string"},description:""},strokeWidth:{required:!1,tsType:{name:"number"},description:""},pad:{required:!1,tsType:{name:"number"},description:""},nest:{required:!1,tsType:{name:"boolean"},description:"When `true` (default), an item reserves only its *filled* cells, so a\n complementary shape can nestle into another's notch (interlocking layout).\n Set `false` to reserve each item's whole bounding box — boxes never\n overlap, at the cost of notches staying empty.",defaultValue:{value:"true",computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"NotchGridItemProps"}],raw:"NotchGridItemProps[]"},description:"Items as data (in addition to / instead of `<NotchGridItem>` children)."},draggable:{required:!1,tsType:{name:"boolean"},description:`Let the user drag items onto a different block cell. Dropped items become
 pinned and the rest re-flow around them.`,defaultValue:{value:"false",computed:!1}},onItemMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: Key, col: number, row: number) => void",signature:{arguments:[{type:{name:"Key"},name:"key"},{type:{name:"number"},name:"col"},{type:{name:"number"},name:"row"}],return:{name:"void"}}},description:"Called after a drag drops an item, with its new block position."},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const Ee={title:"UI/Notch/NotchGrid",component:D,parameters:{layout:"fullscreen"},args:{block:96},argTypes:{cols:{control:{type:"number",min:1,max:12}},block:{control:{type:"range",min:56,max:140,step:4}}}};function g({icon:t,label:n,value:s}){return e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx(B,{name:t,size:18,className:"text-primary"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-surface-variant",children:n}),e.jsx("p",{className:"text-lg font-medium text-on-surface",children:s})]})]})}function Q({icon:t,label:n,value:s}){return e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx(B,{name:t,size:16,className:"text-on-primary-container"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-primary-container/70",children:n}),e.jsx("p",{className:"text-base font-medium text-on-primary-container",children:s})]})]})}const V={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(D,{cols:7,draggable:!0,children:[e.jsx(d,{col:0,row:0,shape:[[1,1,1],[1,1,1],[1,1,0]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsxs("div",{className:"flex h-full flex-col justify-between",children:[e.jsx(B,{name:"extension",size:22,className:"text-on-primary-container"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-on-primary-container/70",children:"Module"}),e.jsx("p",{className:"text-xl font-medium text-on-primary-container",children:"identity-federated"}),e.jsx("p",{className:"text-xs text-on-primary-container/70",children:"@me/identity-federated · v0.3.1"})]})]})}),e.jsx(d,{col:2,row:2,shape:[[1]],children:e.jsx(g,{icon:"apps",label:"Installs",value:"1,240"})}),e.jsx(d,{col:3,row:0,shape:[[0,1,0],[1,1,1],[0,1,0]],children:e.jsxs("div",{className:"flex h-full flex-col items-center justify-center text-center",children:[e.jsx(B,{name:"bolt",size:18,className:"text-primary"}),e.jsx("p",{className:"mt-1 text-sm font-medium text-on-surface",children:"Status"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"live · healthy"})]})}),e.jsx(d,{col:3,row:0,shape:[[1]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(Q,{icon:"payments",label:"Earned",value:"$84"})}),e.jsx(d,{col:5,row:0,shape:[[1]],children:e.jsx(g,{icon:"new_releases",label:"Version",value:"v0.3.1"})}),e.jsx(d,{col:3,row:2,shape:[[1]],children:e.jsx(g,{icon:"groups",label:"Tenants",value:"37"})}),e.jsx(d,{col:5,row:2,shape:[[1]],children:e.jsx(g,{icon:"schedule",label:"Pending",value:"1"})}),e.jsx(d,{col:6,row:0,shape:[[1],[1],[1]],children:e.jsxs("div",{className:"flex h-full flex-col gap-2",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),["v0.3.1 published","installed by @anna","deps reviewed","tunnel up 4h"].map(t=>e.jsx("p",{className:"text-xs text-on-surface-variant",children:t},t))]})}),e.jsx(d,{col:0,row:3,shape:[[1,1,1,0],[1,1,1,1]],children:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Usage — last 30 days"}),e.jsx("div",{className:"mt-2 flex flex-1 items-end gap-1",children:[40,65,50,80,55,70,90,60,75,95,85,100].map((t,n)=>e.jsx("div",{className:"flex-1 rounded-t bg-primary/60",style:{height:`${t}%`}},n))})]})}),e.jsx(d,{col:3,row:3,shape:[[1]],children:e.jsx(g,{icon:"build",label:"Builds",value:"312"})}),e.jsx(d,{col:4,row:3,fill:"var(--color-primary-container)",subItems:[{cost:[1,1],content:e.jsx(Q,{icon:"schedule",label:"Cron",value:"6×"})},{cost:[2,2],content:e.jsx(Q,{icon:"insights",label:"Calls / day",value:"128k"})}]})]})})},L={args:{cols:7},render:t=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(D,{...t,children:[e.jsx(d,{fill:"var(--color-primary-container)",stroke:"none",subItems:[{cost:[2,2],content:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx("p",{className:"text-sm font-medium text-on-primary-container",children:"Usage"}),e.jsx("div",{className:"mt-2 flex flex-1 items-end gap-1",children:[40,70,55,85,60,95,75].map((n,s)=>e.jsx("div",{className:"flex-1 rounded-t bg-on-primary-container/35",style:{height:`${n}%`}},s))})]})},{cost:[1,1],content:e.jsx(Q,{icon:"payments",label:"Earned",value:"$84"})}]}),e.jsx(d,{subItems:[{cost:[1,1],content:e.jsx(g,{icon:"apps",label:"Installs",value:"1,240"})},{cost:[1,1],content:e.jsx(g,{icon:"new_releases",label:"Version",value:"v0.3.1"})},{cost:[2,1],content:e.jsxs("div",{className:"flex h-full items-center gap-2",children:[e.jsx(B,{name:"bolt",size:16,className:"text-primary"}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:"tunnel up · 2.1k req/min · p99 142ms"})]})}]}),e.jsx(d,{subItems:[{cost:[1,2],content:e.jsxs("div",{className:"flex h-full flex-col gap-1.5",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),["v0.3.1 published","installed by @anna","deps reviewed","tunnel up 4h"].map(n=>e.jsx("p",{className:"text-xs text-on-surface-variant",children:n},n))]})},{cost:[1,1],content:e.jsx(g,{icon:"groups",label:"Tenants",value:"37"})},{cost:[1,1],content:e.jsx(g,{icon:"schedule",label:"Pending",value:"1"})}],subCols:2})]})})},F={args:{cols:6,draggable:!0},render:t=>e.jsx("div",{className:"bg-background p-6",children:e.jsxs(D,{...t,children:[e.jsx(d,{shape:[[1,1,1],[1,1,0]],fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(g,{icon:"drag_indicator",label:"Drag me",value:"hero"})}),e.jsx(d,{shape:[[1]],children:e.jsx(g,{icon:"apps",label:"Installs",value:"1,240"})}),e.jsx(d,{shape:[[1]],children:e.jsx(g,{icon:"payments",label:"Earned",value:"$84"})}),e.jsx(d,{shape:[[1,1]],children:e.jsxs("div",{className:"flex h-full items-center gap-2",children:[e.jsx(B,{name:"bolt",size:16,className:"text-primary"}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:"live · 2.1k req/min"})]})}),e.jsx(d,{shape:[[1],[1]],children:e.jsxs("div",{className:"flex h-full flex-col gap-1",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Recent"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"v0.3.1 published"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"installed by @anna"})]})}),e.jsx(d,{shape:[[1]],children:e.jsx(g,{icon:"calendar_today",label:"Created",value:"May"})})]})})},K={render:()=>e.jsx("div",{className:"bg-background p-6",children:e.jsx("div",{className:"resize-x overflow-auto rounded-2xl border border-dashed border-outline-variant p-2",style:{width:720,minWidth:220,maxWidth:"100%"},children:e.jsxs(D,{children:[e.jsx(d,{shape:{sizes:[[1,1],[2,2],[3,2]]},fill:"var(--color-primary-container)",stroke:"none",children:e.jsx(g,{icon:"dashboard",label:"Hero",value:"1·1 → 2·2 → 3·2"})}),e.jsx(d,{shape:{sizes:[[1,1],[2,1]]},children:e.jsx(g,{icon:"apps",label:"Installs",value:"1·1 → 2·1"})}),e.jsx(d,{shape:{sizes:[[1,1]]},children:e.jsx(g,{icon:"payments",label:"Earned",value:"1·1"})}),e.jsx(d,{shape:{sizes:[[1,1],[1,2]]},children:e.jsx(g,{icon:"new_releases",label:"Version",value:"1·1 → 1·2"})}),e.jsx(d,{shape:{sizes:[[1,1],[2,1]]},children:e.jsx(g,{icon:"history",label:"Activity",value:"1·1 → 2·1"})})]})})})};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source},description:{story:"An overview page laid out by hand (explicit `col`/`row`) so the notched\npieces interlock cleanly: 1×1 tiles drop into the L-hero's notch and into all\nfour of the plus's corners and the chart's notch; the `subItems={[[1,1],[2,2]]}`\npanel is an L of its own. `nest` (default) keeps notches fillable — nothing\nreserves empty corners — and `draggable` lets you re-arrange it.",...V.parameters?.docs?.description}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source},description:{story:"A component built from sub-items, each with a `[cols, rows]` block cost —\n the panel's notched footprint is the union of where the grid packs them.\n e.g. `subItems={[[1,1],[2,2]]}` → a 1×1 widget beside a 2×2 one.",...L.parameters?.docs?.description}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source},description:{story:"`draggable` — grab any tile and drop it onto a different block cell; it\n becomes pinned there and the rest re-flow around it (and into its notches).",...F.parameters?.docs?.description}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source},description:{story:"Items declare candidate `[cols, rows]` block costs — `{ sizes: [...] }` —\n and the grid auto-picks the largest that fits as you drag the width.",...K.parameters?.docs?.description}}};const Oe=["OverviewPage","SubItemPanels","Draggable","BlockCostSizes"];export{K as BlockCostSizes,F as Draggable,V as OverviewPage,L as SubItemPanels,Oe as __namedExportsOrder,Ee as default};
