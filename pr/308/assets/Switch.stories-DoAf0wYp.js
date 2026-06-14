import{r as l,j as e}from"./iframe-Dp3SSu5y.js";import{S as d}from"./Switch-Dn14i-Ma.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const k={title:"UI/Inputs/Switch",component:d,args:{checked:!1,disabled:!1,color:"primary","aria-label":"Toggle switch"},argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},color:{control:"select",options:["primary","error","warning"]}}},s={},a={render:n=>{const[o,i]=l.useState(n.checked??!1);return e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(d,{...n,checked:o,onChange:i}),e.jsx("span",{className:"text-sm text-on-surface-variant",children:o?"ON":"OFF"})]})}},t={render:n=>{const[o,i]=l.useState({primary:!0,error:!0,warning:!0});return e.jsx("div",{className:"flex flex-col gap-4",children:["primary","error","warning"].map(r=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(d,{...n,color:r,checked:o[r],onChange:p=>i(m=>({...m,[r]:p})),"aria-label":`${r} switch`}),e.jsx("span",{className:"text-sm text-on-surface-variant capitalize",children:r})]},r))})}},c={args:{disabled:!0,checked:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <div className="flex items-center gap-3">
        <Switch {...args} checked={checked} onChange={setChecked} />
        <span className="text-sm text-on-surface-variant">
          {checked ? "ON" : "OFF"}
        </span>
      </div>;
  }
}`,...a.parameters?.docs?.source},description:{story:"Controlled example with live state",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source},description:{story:"All color variants side by side",...t.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    checked: true
  }
}`,...c.parameters?.docs?.source},description:{story:"Disabled state",...c.parameters?.docs?.description}}};const f=["Playground","Controlled","ColorVariants","Disabled"];export{t as ColorVariants,a as Controlled,c as Disabled,s as Playground,f as __namedExportsOrder,k as default};
