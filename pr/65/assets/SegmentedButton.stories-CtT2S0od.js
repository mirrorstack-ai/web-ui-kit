import{j as e,r as y}from"./iframe-CygT6kFu.js";import{c as m}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function u({options:o,value:l,onChange:c,"aria-label":v,disabled:p=!1,className:g}){return e.jsx("div",{role:"group","aria-label":v,className:m("inline-flex rounded-lg border border-outline-variant overflow-hidden",p&&"opacity-50 cursor-not-allowed",g),children:o.map((i,b)=>{const d=i.value===l;return e.jsx("button",{type:"button","aria-pressed":d,disabled:p,onClick:()=>{d||c(i.value)},className:m("px-4 py-2 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary","disabled:cursor-not-allowed",b>0&&"border-l border-outline-variant",d?"bg-secondary-container text-on-secondary-container":"bg-surface text-on-surface hover:bg-surface-container-highest"),children:i.label},i.value)})})}u.__docgenInfo={description:"",methods:[],displayName:"SegmentedButton",props:{options:{required:!0,tsType:{name:"unknown"},description:""},value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},"aria-label":{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const f=[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}],w={title:"UI/Inputs/SegmentedButton",component:u,args:{options:f,value:"md","aria-label":"Select size",disabled:!1},argTypes:{value:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}}},a={},r={render:o=>{const[l,c]=y.useState(o.value??"md");return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(u,{...o,value:l,onChange:c}),e.jsxs("p",{className:"text-sm text-on-surface-variant",children:["Selected: ",e.jsx("strong",{children:l})]})]})}},s={args:{options:[{value:"list",label:"List"},{value:"grid",label:"Grid"}],value:"list","aria-label":"Select view"}},t={args:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"quarter",label:"Quarter"},{value:"year",label:"Year"}],value:"month","aria-label":"Select time range"}},n={args:{disabled:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState(args.value ?? "md");
    return <div className="flex flex-col gap-3">
        <SegmentedButton {...args} value={selected} onChange={setSelected} />
        <p className="text-sm text-on-surface-variant">
          Selected: <strong>{selected}</strong>
        </p>
      </div>;
  }
}`,...r.parameters?.docs?.source},description:{story:"Controlled example with live state",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source},description:{story:"Two options",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source},description:{story:"Many options",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...n.parameters?.docs?.source},description:{story:"Disabled state",...n.parameters?.docs?.description}}};const T=["Playground","Controlled","TwoOptions","ManyOptions","Disabled"];export{r as Controlled,n as Disabled,t as ManyOptions,a as Playground,s as TwoOptions,T as __namedExportsOrder,w as default};
