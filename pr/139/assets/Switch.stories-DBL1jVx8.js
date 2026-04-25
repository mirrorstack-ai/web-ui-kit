import{j as r,r as u}from"./iframe-yzddxpzX.js";import{c as m}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const h={primary:"bg-primary",error:"bg-error",warning:"bg-warning"},y={primary:"bg-on-primary",error:"bg-on-error",warning:"bg-on-warning"};function p({checked:e,onChange:s,"aria-label":t,"aria-labelledby":a,disabled:l=!1,color:d="primary",className:g}){return r.jsx("button",{type:"button",role:"switch","aria-checked":e,"aria-label":t,"aria-labelledby":a,disabled:l,onClick:()=>s(!e),className:m("relative w-11 h-6 rounded-full transition-colors shrink-0",e?h[d]:"bg-outline-variant",l?"opacity-50 cursor-not-allowed":"cursor-pointer",g),children:r.jsx("span",{className:m("absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform",e?`translate-x-5 ${y[d]}`:"bg-surface")})})}p.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""},"aria-labelledby":{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},color:{required:!1,tsType:{name:"union",raw:'"primary" | "error" | "warning"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'}]},description:"",defaultValue:{value:'"primary"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const v={title:"UI/Inputs/Switch",component:p,args:{checked:!1,disabled:!1,color:"primary","aria-label":"Toggle switch"},argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},color:{control:"select",options:["primary","error","warning"]}}},n={},o={render:e=>{const[s,t]=u.useState(e.checked??!1);return r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx(p,{...e,checked:s,onChange:t}),r.jsx("span",{className:"text-sm text-on-surface-variant",children:s?"ON":"OFF"})]})}},i={render:e=>{const[s,t]=u.useState({primary:!0,error:!0,warning:!0});return r.jsx("div",{className:"flex flex-col gap-4",children:["primary","error","warning"].map(a=>r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx(p,{...e,color:a,checked:s[a],onChange:l=>t(d=>({...d,[a]:l})),"aria-label":`${a} switch`}),r.jsx("span",{className:"text-sm text-on-surface-variant capitalize",children:a})]},a))})}},c={args:{disabled:!0,checked:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...n.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <div className="flex items-center gap-3">
        <Switch {...args} checked={checked} onChange={setChecked} />
        <span className="text-sm text-on-surface-variant">
          {checked ? "ON" : "OFF"}
        </span>
      </div>;
  }
}`,...o.parameters?.docs?.source},description:{story:"Controlled example with live state",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [states, setStates] = useState({
      primary: true,
      error: true,
      warning: true
    });
    return <div className="flex flex-col gap-4">
        {(["primary", "error", "warning"] as const).map(color => <div key={color} className="flex items-center gap-3">
            <Switch {...args} color={color} checked={states[color]} onChange={checked => setStates(prev => ({
          ...prev,
          [color]: checked
        }))} aria-label={\`\${color} switch\`} />
            <span className="text-sm text-on-surface-variant capitalize">
              {color}
            </span>
          </div>)}
      </div>;
  }
}`,...i.parameters?.docs?.source},description:{story:"All color variants side by side",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    checked: true
  }
}`,...c.parameters?.docs?.source},description:{story:"Disabled state",...c.parameters?.docs?.description}}};const w=["Playground","Controlled","ColorVariants","Disabled"];export{i as ColorVariants,o as Controlled,c as Disabled,n as Playground,w as __namedExportsOrder,v as default};
