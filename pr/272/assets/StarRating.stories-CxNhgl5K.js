import{j as e}from"./iframe-DFqMsVVo.js";import{c as p}from"./cn-IyxL_b2c.js";import{I as c}from"./Icon-Bm3E_2A1.js";import"./preload-helper-PPVm8Dsz.js";function m(r){const s=Math.min(5,Math.max(0,r));return Math.round(s*2)/2}function u({value:r}){return e.jsx("span",{"aria-hidden":!0,className:"flex items-center gap-0.5",children:Array.from({length:5},(s,a)=>{const t=a+1;return r>=t?e.jsx(c,{name:"star",size:16,fill:!0,className:"text-warning"},a):r>=t-.5?e.jsx(c,{name:"star_half",size:16,fill:!0,className:"text-warning"},a):e.jsx(c,{name:"star",size:16,className:"opacity-20"},a)})})}function l({value:r,count:s,label:a,className:t}){const o=m(r);return e.jsxs("div",{className:p("flex h-full w-full flex-col justify-between p-1",t),role:"img","aria-label":`${o} out of 5 stars`,children:[a!=null&&e.jsx("span",{className:"truncate text-xs opacity-60",children:a}),e.jsx(u,{value:o}),e.jsxs("span",{className:"flex items-baseline gap-1",children:[e.jsx("span",{className:"text-sm font-semibold",children:o.toFixed(1)}),s!=null&&e.jsxs("span",{className:"text-[10px] opacity-40",children:["(",s.toLocaleString()," ",s===1?"review":"reviews",")"]})]})]})}l.__docgenInfo={description:"",methods:[],displayName:"StarRating",props:{value:{required:!0,tsType:{name:"number"},description:"Rating value from 0 to 5, supports 0.5 steps."},count:{required:!1,tsType:{name:"number"},description:"Number of reviews / ratings."},label:{required:!1,tsType:{name:"string"},description:"Small label shown above the stars."},className:{required:!1,tsType:{name:"string"},description:""}}};const v={title:"UI/Blocks/Rating",component:l,parameters:{layout:"centered"}},d=({children:r})=>e.jsx("div",{className:"border-outline-variant text-on-surface rounded-xl border px-2 py-4",children:r}),n={render:()=>e.jsx(d,{children:e.jsx("div",{style:{width:220,height:110},children:e.jsx(l,{value:4.5,count:128,label:"Rating"})})})},i={render:()=>e.jsx(d,{children:e.jsx("div",{style:{width:220,height:110},children:e.jsx(l,{value:0,count:0,label:"Rating"})})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 220,
      height: 110
    }}>
        <StarRating value={4.5} count={128} label="Rating" />
      </div>
    </Wrapper>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 220,
      height: 110
    }}>
        <StarRating value={0} count={0} label="Rating" />
      </div>
    </Wrapper>
}`,...i.parameters?.docs?.source}}};const j=["HighRating","NoReviews"];export{n as HighRating,i as NoReviews,j as __namedExportsOrder,v as default};
