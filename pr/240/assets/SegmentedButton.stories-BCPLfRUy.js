import{r as d,j as l}from"./iframe-BELSMW0y.js";import{S as i}from"./SegmentedButton-CPkpvJna.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-DaR-u2x5.js";const p=[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}],S={title:"UI/Inputs/SegmentedButton",component:i,args:{options:p,value:"md","aria-label":"Select size",disabled:!1},argTypes:{value:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},e={},a={render:o=>{const[n,c]=d.useState(o.value??"md");return l.jsxs("div",{className:"flex flex-col gap-3",children:[l.jsx(i,{...o,value:n,onChange:c}),l.jsxs("p",{className:"text-sm text-on-surface-variant",children:["Selected: ",l.jsx("strong",{children:n})]})]})}},r={args:{options:[{value:"list",label:"List"},{value:"grid",label:"Grid"}],value:"list","aria-label":"Select view"}},s={args:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"quarter",label:"Quarter"},{value:"year",label:"Year"}],value:"month","aria-label":"Select time range"}},t={args:{disabled:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source},description:{story:"Two options",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source},description:{story:"Many options",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...t.parameters?.docs?.source},description:{story:"Disabled state",...t.parameters?.docs?.description}}};const x=["Playground","Controlled","TwoOptions","ManyOptions","Disabled"];export{a as Controlled,t as Disabled,s as ManyOptions,e as Playground,r as TwoOptions,x as __namedExportsOrder,S as default};
