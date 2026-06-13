import{j as o}from"./iframe-B4m0w5V3.js";import{c as a}from"./cn-IyxL_b2c.js";const n="M32 32 L31 15 L41 20 Z",l=[0,120,240],c=[60,180,300],m="#006973",d="#28bdce",f="#ffffff",g=`
.ms-logo__tri { transform-box: view-box; transform-origin: 50% 50%; }
.ms-logo--loading .ms-logo__tri--cw {
  animation: ms-logo-spin 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
.ms-logo--loading .ms-logo__tri--ccw {
  animation: ms-logo-spin-reverse 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
@keyframes ms-logo-spin {
  from { transform: rotate(0); } to { transform: rotate(120deg); }
}
@keyframes ms-logo-spin-reverse {
  from { transform: rotate(0); } to { transform: rotate(-120deg); }
}
@media (prefers-reduced-motion: reduce) {
  .ms-logo--loading .ms-logo__tri--cw,
  .ms-logo--loading .ms-logo__tri--ccw { animation: none; }
}
`;function t({angles:s,color:e,dir:i}){return o.jsx("g",{className:`ms-logo__tri ms-logo__tri--${i}`,children:s.map(r=>o.jsx("path",{d:n,transform:`rotate(${r} 32 32)`,fill:e,stroke:e},r))})}function u({loading:s=!1,title:e="MirrorStack Logo",className:i,style:r}){return o.jsxs("svg",{viewBox:"0 0 64 64",role:"img","aria-label":e,"aria-busy":s?!0:void 0,style:r,className:a("ms-logo h-full w-full",s&&"ms-logo--loading",i),children:[o.jsx("title",{children:e}),o.jsx("style",{children:g}),o.jsxs("g",{strokeWidth:6,strokeLinejoin:"round",strokeLinecap:"round",children:[o.jsx(t,{angles:l,color:m,dir:"cw"}),o.jsx(t,{angles:c,color:d,dir:"ccw"})]}),o.jsx("circle",{cx:"32",cy:"32",r:"3",fill:f})]})}u.__docgenInfo={description:"",methods:[],displayName:"Logo",props:{loading:{required:!1,tsType:{name:"boolean"},description:"Counter-rotate the two blade triangles as a loading / busy indicator.",defaultValue:{value:"false",computed:!1}},title:{required:!1,tsType:{name:"string"},description:'Accessible label for the mark. Defaults to "MirrorStack Logo".',defaultValue:{value:'"MirrorStack Logo"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Sizing / layout classes. Defaults to filling its container."},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};export{u as L};
