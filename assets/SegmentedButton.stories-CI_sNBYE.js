import{r as u,j as n}from"./iframe-Brs60jez.js";import{S as d}from"./SegmentedButton-CN2C1fI2.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DsiPvA29.js";const p=[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}],S={title:"UI/Inputs/SegmentedButton",component:d,args:{options:p,value:"md","aria-label":"Select size",disabled:!1},argTypes:{value:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},e={},a={render:o=>{const[i,c]=u.useState(o.value??"md");return n.jsxs("div",{className:"flex flex-col gap-3",children:[n.jsx(d,{...o,value:i,onChange:c}),n.jsxs("p",{className:"text-sm text-on-surface-variant",children:["Selected: ",n.jsx("strong",{children:i})]})]})}},r={args:{options:[{value:"list",label:"List"},{value:"grid",label:"Grid"}],value:"list","aria-label":"Select view"}},t={args:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"quarter",label:"Quarter"},{value:"year",label:"Year"}],value:"month","aria-label":"Select time range"}},s={args:{disabled:!0}},l={render:o=>{const[i,c]=u.useState("daily");return n.jsx(d,{...o,variant:"boxed",options:[{value:"hourly",label:"Hourly"},{value:"daily",label:"Daily"}],value:i,onChange:c,"aria-label":"Granularity"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState(args.value ?? "md");
    return <div className="flex flex-col gap-3">
        <SegmentedButton {...args} value={selected} onChange={setSelected} />
        <p className="text-sm text-on-surface-variant">
          Selected: <strong>{selected}</strong>
        </p>
      </div>;
  }
}`,...a.parameters?.docs?.source},description:{story:"Controlled example with live state",...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    options: [{
      value: "list",
      label: "List"
    }, {
      value: "grid",
      label: "Grid"
    }],
    value: "list",
    "aria-label": "Select view"
  }
}`,...r.parameters?.docs?.source},description:{story:"Two options",...r.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    options: [{
      value: "day",
      label: "Day"
    }, {
      value: "week",
      label: "Week"
    }, {
      value: "month",
      label: "Month"
    }, {
      value: "quarter",
      label: "Quarter"
    }, {
      value: "year",
      label: "Year"
    }],
    value: "month",
    "aria-label": "Select time range"
  }
}`,...t.parameters?.docs?.source},description:{story:"Many options",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...s.parameters?.docs?.source},description:{story:"Disabled state",...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState("daily");
    return <SegmentedButton {...args} variant="boxed" options={[{
      value: "hourly",
      label: "Hourly"
    }, {
      value: "daily",
      label: "Daily"
    }]} value={selected} onChange={setSelected} aria-label="Granularity" />;
  }
}`,...l.parameters?.docs?.source},description:{story:"Boxed/connected track with an inset selected pill",...l.parameters?.docs?.description}}};const x=["Playground","Controlled","TwoOptions","ManyOptions","Disabled","Boxed"];export{l as Boxed,a as Controlled,s as Disabled,t as ManyOptions,e as Playground,r as TwoOptions,x as __namedExportsOrder,S as default};
