import{r as l,j as o}from"./iframe-CH7za8Cj.js";import{c as n}from"./cn-IyxL_b2c.js";const c="M32 32 L30.8 11.6 L42.8 17.6 Z",m=[0,120,240],d=[60,180,300],g="#006973",f="#28bdce",u=`
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
`;function a({angles:s,color:e,dir:i}){return o.jsx("g",{className:`ms-logo__tri ms-logo__tri--${i}`,children:s.map(r=>o.jsx("path",{d:c,transform:`rotate(${r} 32 32)`,fill:e,stroke:e},r))})}function p({loading:s=!1,title:e="MirrorStack Logo",className:i,style:r}){const t=`ms-logo-hole-${l.useId().replace(/:/g,"")}`;return o.jsxs("svg",{viewBox:"0 0 64 64",role:"img","aria-label":e,"aria-busy":s||void 0,style:r,className:n("ms-logo h-full w-full",s&&"ms-logo--loading",i),children:[o.jsx("title",{children:e}),o.jsx("style",{children:u}),o.jsxs("mask",{id:t,children:[o.jsx("rect",{x:"0",y:"0",width:"64",height:"64",fill:"white"}),o.jsx("circle",{cx:"32",cy:"32",r:"3",fill:"black"})]}),o.jsxs("g",{mask:`url(#${t})`,strokeWidth:7.2,strokeLinejoin:"round",strokeLinecap:"round",children:[o.jsx(a,{angles:m,color:g,dir:"cw"}),o.jsx(a,{angles:d,color:f,dir:"ccw"})]})]})}p.__docgenInfo={description:"",methods:[],displayName:"Logo",props:{loading:{required:!1,tsType:{name:"boolean"},description:"Counter-rotate the two blade triangles as a loading / busy indicator.",defaultValue:{value:"false",computed:!1}},title:{required:!1,tsType:{name:"string"},description:'Accessible label for the mark. Defaults to "MirrorStack Logo".',defaultValue:{value:'"MirrorStack Logo"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Sizing / layout classes. Defaults to filling its container."},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};export{p as L};
