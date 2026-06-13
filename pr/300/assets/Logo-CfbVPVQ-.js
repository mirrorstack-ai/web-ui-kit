import{j as o}from"./iframe-C84YAg-v.js";import{c}from"./cn-IyxL_b2c.js";const t="M32 32 L31 15 L41 20 Z",m=[0,120,240],f=[60,180,300],i="#006973",a="#28bdce",g="#ffffff",d=`
.ms-logo__tri { transform-box: view-box; transform-origin: 50% 50%; }
.ms-logo--loading .ms-logo__tri--cw {
  animation: ms-logo-spin 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
.ms-logo--loading .ms-logo__tri--ccw {
  animation: ms-logo-spin-reverse 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
@keyframes ms-logo-spin { from { transform: rotate(0); } to { transform: rotate(120deg); } }
@keyframes ms-logo-spin-reverse { from { transform: rotate(0); } to { transform: rotate(-120deg); } }
@media (prefers-reduced-motion: reduce) {
  .ms-logo--loading .ms-logo__tri--cw,
  .ms-logo--loading .ms-logo__tri--ccw { animation: none; }
}
`;function p({loading:s=!1,title:r="MirrorStack Logo",className:l,style:n}){return o.jsxs("svg",{viewBox:"0 0 64 64",role:"img","aria-label":r,"aria-busy":s||void 0,style:n,className:c("ms-logo h-full w-full",s&&"ms-logo--loading",l),children:[o.jsx("title",{children:r}),o.jsx("style",{children:d}),o.jsxs("g",{strokeWidth:6,strokeLinejoin:"round",strokeLinecap:"round",children:[o.jsx("g",{className:"ms-logo__tri ms-logo__tri--cw",children:m.map(e=>o.jsx("path",{d:t,transform:`rotate(${e} 32 32)`,fill:i,stroke:i},e))}),o.jsx("g",{className:"ms-logo__tri ms-logo__tri--ccw",children:f.map(e=>o.jsx("path",{d:t,transform:`rotate(${e} 32 32)`,fill:a,stroke:a},e))})]}),o.jsx("circle",{cx:"32",cy:"32",r:"3",fill:g})]})}p.__docgenInfo={description:"",methods:[],displayName:"Logo",props:{loading:{required:!1,tsType:{name:"boolean"},description:"Counter-rotate the two blade triangles as a loading / busy indicator.",defaultValue:{value:"false",computed:!1}},title:{required:!1,tsType:{name:"string"},description:'Accessible label for the mark. Defaults to "MirrorStack Logo".',defaultValue:{value:'"MirrorStack Logo"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Sizing / layout classes. Defaults to filling its container."},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};export{p as L};
