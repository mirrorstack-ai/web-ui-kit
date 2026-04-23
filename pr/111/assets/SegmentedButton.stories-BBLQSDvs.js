import{j as e,r as v}from"./iframe-X_kMIR8X.js";import{c as p}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function d({options:i,value:a,onChange:c,"aria-label":m,disabled:u=!1,className:g}){return e.jsx("div",{role:"group","aria-label":m,className:p("flex gap-2",g),children:i.map(r=>e.jsx("button",{type:"button",onClick:()=>c(r.value),disabled:u,"aria-pressed":a===r.value,className:p("px-4 py-2 rounded-xl text-sm font-medium transition-colors",a===r.value?"bg-primary text-on-primary":"bg-surface-container text-on-surface-variant hover:bg-surface-container-high",u?"opacity-50 cursor-not-allowed":"cursor-pointer"),children:r.label},r.value))})}d.__docgenInfo={description:"",methods:[],displayName:"SegmentedButton",props:{options:{required:!0,tsType:{name:"unknown"},description:""},value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const b=[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}],S={title:"UI/Inputs/SegmentedButton",component:d,args:{options:b,value:"md","aria-label":"Select size",disabled:!1},argTypes:{value:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},s={},t={render:i=>{const[a,c]=v.useState(i.value??"md");return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(d,{...i,value:a,onChange:c}),e.jsxs("p",{className:"text-sm text-on-surface-variant",children:["Selected: ",e.jsx("strong",{children:a})]})]})}},n={args:{options:[{value:"list",label:"List"},{value:"grid",label:"Grid"}],value:"list","aria-label":"Select view"}},l={args:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"quarter",label:"Quarter"},{value:"year",label:"Year"}],value:"month","aria-label":"Select time range"}},o={args:{disabled:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState(args.value ?? "md");
    return <div className="flex flex-col gap-3">
        <SegmentedButton {...args} value={selected} onChange={setSelected} />
        <p className="text-sm text-on-surface-variant">
          Selected: <strong>{selected}</strong>
        </p>
      </div>;
  }
}`,...t.parameters?.docs?.source},description:{story:"Controlled example with live state",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source},description:{story:"Two options",...n.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source},description:{story:"Many options",...l.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...o.parameters?.docs?.source},description:{story:"Disabled state",...o.parameters?.docs?.description}}};const h=["Playground","Controlled","TwoOptions","ManyOptions","Disabled"];export{t as Controlled,o as Disabled,l as ManyOptions,s as Playground,n as TwoOptions,h as __namedExportsOrder,S as default};
