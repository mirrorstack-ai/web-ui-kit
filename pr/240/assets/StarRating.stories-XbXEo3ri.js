import{j as e}from"./iframe-B4FMDjE5.js";import{S as r}from"./StarRating-DMhwjPpq.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const u={title:"UI/Notch/Blocks/Rating",component:r,parameters:{layout:"centered"}},n=({children:d})=>e.jsx("div",{className:"border-outline-variant text-on-surface rounded-xl border p-2",children:d}),t={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:150,height:150},children:e.jsx(r,{value:4.5,count:128,label:"Rating"})})})},a={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:150,height:150},children:e.jsx(r,{value:3,count:42})})})},s={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:150,height:150},children:e.jsx(r,{value:1.5,count:7,label:"Rating"})})})},i={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:150,height:150},children:e.jsx(r,{value:5,count:1024,label:"Rating"})})})},o={render:()=>e.jsx(n,{children:e.jsx("div",{style:{width:150,height:150},children:e.jsx(r,{value:0,count:0,label:"Rating"})})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 150,
      height: 150
    }}>
        <StarRating value={4.5} count={128} label="Rating" />
      </div>
    </Wrapper>
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 150,
      height: 150
    }}>
        <StarRating value={3.0} count={42} />
      </div>
    </Wrapper>
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 150,
      height: 150
    }}>
        <StarRating value={1.5} count={7} label="Rating" />
      </div>
    </Wrapper>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 150,
      height: 150
    }}>
        <StarRating value={5.0} count={1024} label="Rating" />
      </div>
    </Wrapper>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <div style={{
      width: 150,
      height: 150
    }}>
        <StarRating value={0} count={0} label="Rating" />
      </div>
    </Wrapper>
}`,...o.parameters?.docs?.source}}};const g=["HighRating","MidRating","LowRating","Perfect","NoReviews"];export{t as HighRating,s as LowRating,a as MidRating,o as NoReviews,i as Perfect,g as __namedExportsOrder,u as default};
