import{j as e,r as c}from"./iframe-DuZmNpL4.js";import{V as s}from"./VerificationCodeInput-C_zXguss.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const v={title:"UI/Inputs/VerificationCodeInput",component:s,argTypes:{disabled:{control:"boolean"},error:{control:"boolean"}}},t={render:a=>{const[r,u]=c.useState("");return e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(s,{...a,value:r,onChange:u,onComplete:i=>console.log("Complete:",i)}),e.jsxs("span",{className:"text-sm text-on-surface-variant",children:["Value: ",r||"(empty)"]})]})}},n={render:()=>{const[a,r]=c.useState("12345");return e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{value:a,onChange:r,error:!0}),e.jsx("span",{className:"text-sm text-error",children:"Invalid code"})]})}},o={render:()=>e.jsx(s,{value:"123456",onChange:()=>{},disabled:!0})},l={render:()=>{const[a,r]=c.useState("123456");return e.jsx(s,{value:a,onChange:r})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div className="flex flex-col items-center gap-4">
        <VerificationCodeInput {...args} value={value} onChange={setValue} onComplete={code => console.log("Complete:", code)} />
        <span className="text-sm text-on-surface-variant">
          Value: {value || "(empty)"}
        </span>
      </div>;
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("12345");
    return <div className="flex flex-col items-center gap-2">
        <VerificationCodeInput value={value} onChange={setValue} error />
        <span className="text-sm text-error">Invalid code</span>
      </div>;
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <VerificationCodeInput value="123456" onChange={() => {}} disabled />
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("123456");
    return <VerificationCodeInput value={value} onChange={setValue} />;
  }
}`,...l.parameters?.docs?.source}}};const g=["Playground","WithError","Disabled","Prefilled"];export{o as Disabled,t as Playground,l as Prefilled,n as WithError,g as __namedExportsOrder,v as default};
