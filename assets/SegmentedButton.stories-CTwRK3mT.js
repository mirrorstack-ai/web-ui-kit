import{r as p,j as o}from"./iframe-BxEbITXk.js";import{S as u}from"./SegmentedButton-b8x-qkV0.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-CH40SGWV.js";const m=[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}],x={title:"UI/Inputs/SegmentedButton",component:u,args:{options:m,value:"md","aria-label":"Select size",disabled:!1},argTypes:{value:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},e={},a={render:i=>{const[c,d]=p.useState(i.value??"md");return o.jsxs("div",{className:"flex flex-col gap-3",children:[o.jsx(u,{...i,value:c,onChange:d}),o.jsxs("p",{className:"text-sm text-on-surface-variant",children:["Selected: ",o.jsx("strong",{children:c})]})]})}},s={args:{options:[{value:"list",label:"List"},{value:"grid",label:"Grid"}],value:"list","aria-label":"Select view"}},r={args:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"quarter",label:"Quarter"},{value:"year",label:"Year"}],value:"month","aria-label":"Select time range"}},t={args:{disabled:!0}},l={args:{options:[{value:"list",label:"List"},{value:"issues",label:"Issues",badge:4}],value:"list","aria-label":"Select view"}},n={render:i=>{const[c,d]=p.useState("daily");return o.jsx(u,{...i,variant:"boxed",options:[{value:"hourly",label:"Hourly"},{value:"daily",label:"Daily"}],value:c,onChange:d,"aria-label":"Granularity"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState(args.value ?? "md");
    return <div className="flex flex-col gap-3">
        <SegmentedButton {...args} value={selected} onChange={setSelected} />
        <p className="text-sm text-on-surface-variant">
          Selected: <strong>{selected}</strong>
        </p>
      </div>;
  }
}`,...a.parameters?.docs?.source},description:{story:"Controlled example with live state",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source},description:{story:"Two options",...s.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source},description:{story:"Many options",...r.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...t.parameters?.docs?.source},description:{story:"Disabled state",...t.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    options: [{
      value: "list",
      label: "List"
    }, {
      value: "issues",
      label: "Issues",
      badge: 4
    }],
    value: "list",
    "aria-label": "Select view"
  }
}`,...l.parameters?.docs?.source},description:{story:"A small red count badge anchored to an option's corner (e.g. an open-items count)",...l.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source},description:{story:"Boxed/connected track with an inset selected pill",...n.parameters?.docs?.description}}};const h=["Playground","Controlled","TwoOptions","ManyOptions","Disabled","WithBadge","Boxed"];export{n as Boxed,a as Controlled,t as Disabled,r as ManyOptions,e as Playground,s as TwoOptions,l as WithBadge,h as __namedExportsOrder,x as default};
