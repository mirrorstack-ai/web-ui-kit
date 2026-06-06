import{j as e}from"./iframe-DRHfpBh4.js";import{S as a}from"./StarRating-DfKFu7QI.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const l={title:"UI/Notch/Blocks/Rating",component:a,parameters:{layout:"centered"}},n=({children:s})=>e.jsx("div",{className:"border-outline-variant text-on-surface rounded-xl border px-2 py-4",children:s}),r={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:220,height:110},children:e.jsx(a,{value:4.5,count:128,label:"Rating"})})})},t={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:220,height:110},children:e.jsx(a,{value:0,count:0,label:"Rating"})})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 220,
      height: 110
    }}>
        <StarRating value={4.5} count={128} label="Rating" />
      </div>
    </Wrapper>
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 220,
      height: 110
    }}>
        <StarRating value={0} count={0} label="Rating" />
      </div>
    </Wrapper>
}`,...t.parameters?.docs?.source}}};const p=["HighRating","NoReviews"];export{r as HighRating,t as NoReviews,p as __namedExportsOrder,l as default};
