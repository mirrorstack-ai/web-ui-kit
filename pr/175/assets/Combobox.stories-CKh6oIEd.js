import{j as e,r}from"./iframe-CZB9kqkk.js";import{C as n}from"./Combobox-mbYSg-HS.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-3ZgFvDk7.js";const C={title:"UI/Inputs/Combobox",component:n,argTypes:{disabled:{control:"boolean"},error:{control:"boolean"},freeform:{control:"boolean"}}},h=["United States","United Kingdom","Canada","Australia","Germany","France","Japan"],l={render:a=>{const[s,d]=r.useState("");return e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{...a,label:"Country",value:s,onChange:d,options:h})})}},o={render:()=>{const[a,s]=r.useState("");return e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{label:"Language",value:a,onChange:s,options:[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"ja",label:"Japanese"}]})})}},t={render:()=>{const[a,s]=r.useState("");return e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{label:"Tag",value:a,onChange:s,options:["bug","feature","docs","refactor"],freeform:!0,helperText:"Type a new tag or select an existing one"})})}},u={render:()=>{const[a,s]=r.useState("");return e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{label:"Region",value:a,onChange:s,options:["us-east-1","us-west-2","eu-west-1"],error:!0,helperText:"Region is required"})})}},m={render:()=>e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{label:"Region",value:"us-east-1",onChange:()=>{},options:["us-east-1","us-west-2"],disabled:!0})})},i={render:()=>{const[a,s]=r.useState("");return e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{label:"Pronouns",value:a,onChange:s,size:"sm",options:[{value:"",label:"Prefer not to say"},{value:"he/him",label:"he/him"},{value:"she/her",label:"she/her"},{value:"they/them",label:"they/them"}]})})}},c={render:()=>{const[a,s]=r.useState("");return e.jsx("div",{className:"max-w-sm",children:e.jsx(n,{label:"Pronouns",value:a,onChange:s,size:"sm",hideLabel:!0,options:[{value:"",label:"Prefer not to say"},{value:"he/him",label:"he/him"},{value:"she/her",label:"she/her"},{value:"they/them",label:"they/them"}]})})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox {...args} label="Country" value={value} onChange={setValue} options={countries} />
      </div>;
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Language" value={value} onChange={setValue} options={[{
        value: "en",
        label: "English"
      }, {
        value: "es",
        label: "Spanish"
      }, {
        value: "fr",
        label: "French"
      }, {
        value: "de",
        label: "German"
      }, {
        value: "ja",
        label: "Japanese"
      }]} />
      </div>;
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Tag" value={value} onChange={setValue} options={["bug", "feature", "docs", "refactor"]} freeform helperText="Type a new tag or select an existing one" />
      </div>;
  }
}`,...t.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Region" value={value} onChange={setValue} options={["us-east-1", "us-west-2", "eu-west-1"]} error helperText="Region is required" />
      </div>;
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-sm">
      <Combobox label="Region" value="us-east-1" onChange={() => {}} options={["us-east-1", "us-west-2"]} disabled />
    </div>
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Pronouns" value={value} onChange={setValue} size="sm" options={[{
        value: "",
        label: "Prefer not to say"
      }, {
        value: "he/him",
        label: "he/him"
      }, {
        value: "she/her",
        label: "she/her"
      }, {
        value: "they/them",
        label: "they/them"
      }]} />
      </div>;
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Pronouns" value={value} onChange={setValue} size="sm" hideLabel options={[{
        value: "",
        label: "Prefer not to say"
      }, {
        value: "he/him",
        label: "he/him"
      }, {
        value: "she/her",
        label: "she/her"
      }, {
        value: "they/them",
        label: "they/them"
      }]} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};const S=["Playground","WithObjects","Freeform","WithError","Disabled","Small","SmallHiddenLabel"];export{m as Disabled,t as Freeform,l as Playground,i as Small,c as SmallHiddenLabel,u as WithError,o as WithObjects,S as __namedExportsOrder,C as default};
