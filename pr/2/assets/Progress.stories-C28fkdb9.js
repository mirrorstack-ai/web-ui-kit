import{j as e}from"./iframe-Buw1a9zo.js";import{P as a}from"./Progress-_y27UB8I.js";import"./preload-helper-PPVm8Dsz.js";const v={title:"UI/Feedback/Progress",component:a,args:{type:"linear",color:"primary",variant:"wave",size:"md"},argTypes:{type:{control:"select",options:["linear","circular"]},color:{control:"select",options:["primary","secondary","tertiary","error","warning","four-color","current"]},variant:{control:"select",options:["normal","wave"]},size:{control:"select",options:["sm","md","lg"]},value:{control:{type:"range",min:0,max:100,step:1}},progressive:{control:"boolean"},intermediate:{control:"boolean"}}},s={},t={render:r=>e.jsxs("div",{className:"flex flex-col gap-6 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-2",children:"Wave (default)"}),e.jsx(a,{...r,type:"linear",variant:"wave"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-2",children:"Normal"}),e.jsx(a,{...r,type:"linear",variant:"normal"})]})]})},n={render:r=>e.jsxs("div",{className:"flex flex-col gap-6 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-2",children:"Wave 60%"}),e.jsx(a,{...r,type:"linear",variant:"wave",value:60})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-2",children:"Normal 60%"}),e.jsx(a,{...r,type:"linear",variant:"normal",value:60})]})]})},i={render:r=>e.jsxs("div",{className:"flex gap-8 items-center",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(a,{...r,type:"circular",variant:"wave"}),e.jsx("p",{className:"text-xs text-on-surface-variant mt-2",children:"Wave"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(a,{...r,type:"circular",variant:"normal"}),e.jsx("p",{className:"text-xs text-on-surface-variant mt-2",children:"Normal"})]})]})},c={render:r=>e.jsxs("div",{className:"flex gap-8 items-center",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(a,{...r,type:"circular",variant:"wave",value:75}),e.jsx("p",{className:"text-xs text-on-surface-variant mt-2",children:"Wave 75%"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(a,{...r,type:"circular",variant:"normal",value:75}),e.jsx("p",{className:"text-xs text-on-surface-variant mt-2",children:"Normal 75%"})]})]})},o={render:r=>e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-2",children:"Linear"}),e.jsxs("div",{className:"flex flex-col gap-4 max-w-md",children:[e.jsx(a,{...r,type:"linear",size:"sm"}),e.jsx(a,{...r,type:"linear",size:"md"}),e.jsx(a,{...r,type:"linear",size:"lg"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-on-surface-variant mb-2",children:"Circular"}),e.jsxs("div",{className:"flex gap-6 items-center",children:[e.jsx(a,{...r,type:"circular",size:"sm"}),e.jsx(a,{...r,type:"circular",size:"md"}),e.jsx(a,{...r,type:"circular",size:"lg"})]})]})]})},l={render:r=>e.jsxs("div",{className:"flex flex-col gap-4 max-w-md",children:[e.jsx(a,{...r,type:"linear",color:"primary"}),e.jsx(a,{...r,type:"linear",color:"secondary"}),e.jsx(a,{...r,type:"linear",color:"tertiary"}),e.jsx(a,{...r,type:"linear",color:"error"}),e.jsx(a,{...r,type:"linear",color:"warning"}),e.jsx(a,{...r,type:"linear",color:"four-color"})]})},m={render:r=>e.jsxs("div",{className:"flex gap-8 items-center",children:[e.jsx(a,{...r,type:"circular",color:"four-color"}),e.jsx(a,{...r,type:"linear",color:"four-color",className:"max-w-md flex-1"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source},description:{story:"Interactive playground",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Wave (default)</p>
        <Progress {...args} type="linear" variant="wave" />
      </div>
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Normal</p>
        <Progress {...args} type="linear" variant="normal" />
      </div>
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Linear indeterminate — wave and normal",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Wave 60%</p>
        <Progress {...args} type="linear" variant="wave" value={60} />
      </div>
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Normal 60%</p>
        <Progress {...args} type="linear" variant="normal" value={60} />
      </div>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"Linear determinate — wave and normal at 60%",...n.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-8 items-center">
      <div className="text-center">
        <Progress {...args} type="circular" variant="wave" />
        <p className="text-xs text-on-surface-variant mt-2">Wave</p>
      </div>
      <div className="text-center">
        <Progress {...args} type="circular" variant="normal" />
        <p className="text-xs text-on-surface-variant mt-2">Normal</p>
      </div>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Circular indeterminate — wave and normal",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-8 items-center">
      <div className="text-center">
        <Progress {...args} type="circular" variant="wave" value={75} />
        <p className="text-xs text-on-surface-variant mt-2">Wave 75%</p>
      </div>
      <div className="text-center">
        <Progress {...args} type="circular" variant="normal" value={75} />
        <p className="text-xs text-on-surface-variant mt-2">Normal 75%</p>
      </div>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Circular determinate — wave and normal at 75%",...c.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Linear</p>
        <div className="flex flex-col gap-4 max-w-md">
          <Progress {...args} type="linear" size="sm" />
          <Progress {...args} type="linear" size="md" />
          <Progress {...args} type="linear" size="lg" />
        </div>
      </div>
      <div>
        <p className="text-sm text-on-surface-variant mb-2">Circular</p>
        <div className="flex gap-6 items-center">
          <Progress {...args} type="circular" size="sm" />
          <Progress {...args} type="circular" size="md" />
          <Progress {...args} type="circular" size="lg" />
        </div>
      </div>
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All sizes",...o.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4 max-w-md">
      <Progress {...args} type="linear" color="primary" />
      <Progress {...args} type="linear" color="secondary" />
      <Progress {...args} type="linear" color="tertiary" />
      <Progress {...args} type="linear" color="error" />
      <Progress {...args} type="linear" color="warning" />
      <Progress {...args} type="linear" color="four-color" />
    </div>
}`,...l.parameters?.docs?.source},description:{story:"All colors",...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-8 items-center">
      <Progress {...args} type="circular" color="four-color" />
      <Progress {...args} type="linear" color="four-color" className="max-w-md flex-1" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:"Four-color circular",...m.parameters?.docs?.description}}};const u=["Playground","LinearIndeterminate","LinearDeterminate","CircularIndeterminate","CircularDeterminate","Sizes","Colors","FourColor"];export{c as CircularDeterminate,i as CircularIndeterminate,l as Colors,m as FourColor,n as LinearDeterminate,t as LinearIndeterminate,s as Playground,o as Sizes,u as __namedExportsOrder,v as default};
