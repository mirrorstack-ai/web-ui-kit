import{j as e}from"./iframe-CWXMZWR8.js";import{c as m}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function a({children:s,className:d,...i}){return e.jsx("div",{className:m("bg-surface-container-low rounded-2xl border border-outline-variant",d),...i,children:s})}a.__docgenInfo={description:"",methods:[],displayName:"Surface",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["HTMLAttributes"]};const x={title:"UI/Surfaces/Surface",component:a,args:{children:"Content inside surface"},argTypes:{children:{control:"text"}}},r={},c={render:s=>e.jsx(a,{...s,className:"p-6 max-w-md",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Card Title"}),e.jsx("p",{className:"text-on-surface-variant",children:"This is a surface component with custom content inside. It provides a subtle background and rounded corners."})]})})},n={render:s=>e.jsxs(a,{...s,className:"p-6 space-y-4",children:[e.jsx(a,{className:"p-4",children:e.jsx("p",{children:"Nested surface 1"})}),e.jsx(a,{className:"p-4",children:e.jsx("p",{children:"Nested surface 2"})})]})},t={render:s=>e.jsxs("div",{className:"flex gap-4 items-end",children:[e.jsx(a,{...s,className:"p-3 w-24 h-24",children:e.jsx("p",{className:"text-sm",children:"Small"})}),e.jsx(a,{...s,className:"p-4 w-32 h-32",children:e.jsx("p",{children:"Medium"})}),e.jsx(a,{...s,className:"p-6 w-40 h-40",children:e.jsx("p",{className:"text-lg",children:"Large"})})]})},o={render:s=>e.jsx(a,{...s,className:"p-6 max-w-sm",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("div",{className:"h-32 bg-surface-container-highest rounded-lg"}),e.jsx("h4",{className:"font-semibold",children:"Card Title"}),e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Card description goes here. The surface provides a clean container."}),e.jsxs("div",{className:"flex gap-2 mt-2",children:[e.jsx("button",{className:"px-4 py-2 bg-primary text-on-primary rounded-lg text-sm",children:"Primary Action"}),e.jsx("button",{className:"px-4 py-2 text-primary text-sm",children:"Secondary"})]})]})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...r.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <Surface {...args} className="p-6 max-w-md">
            <div>
                <h3 className="text-lg font-semibold mb-2">Card Title</h3>
                <p className="text-on-surface-variant">
                    This is a surface component with custom content inside. It provides a
                    subtle background and rounded corners.
                </p>
            </div>
        </Surface>
}`,...c.parameters?.docs?.source},description:{story:"Surface with custom padding and content",...c.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <Surface {...args} className="p-6 space-y-4">
            <Surface className="p-4">
                <p>Nested surface 1</p>
            </Surface>
            <Surface className="p-4">
                <p>Nested surface 2</p>
            </Surface>
        </Surface>
}`,...n.parameters?.docs?.source},description:{story:"Nested surfaces showing layering",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex gap-4 items-end">
            <Surface {...args} className="p-3 w-24 h-24">
                <p className="text-sm">Small</p>
            </Surface>
            <Surface {...args} className="p-4 w-32 h-32">
                <p>Medium</p>
            </Surface>
            <Surface {...args} className="p-6 w-40 h-40">
                <p className="text-lg">Large</p>
            </Surface>
        </div>
}`,...t.parameters?.docs?.source},description:{story:"Different sizes",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <Surface {...args} className="p-6 max-w-sm">
            <div className="flex flex-col gap-3">
                <div className="h-32 bg-surface-container-highest rounded-lg" />
                <h4 className="font-semibold">Card Title</h4>
                <p className="text-sm text-on-surface-variant">
                    Card description goes here. The surface provides a clean container.
                </p>
                <div className="flex gap-2 mt-2">
                    <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm">
                        Primary Action
                    </button>
                    <button className="px-4 py-2 text-primary text-sm">
                        Secondary
                    </button>
                </div>
            </div>
        </Surface>
}`,...o.parameters?.docs?.source},description:{story:"Surface as a card wrapper",...o.parameters?.docs?.description}}};const f=["Playground","WithCustomContent","NestedSurfaces","Sizes","AsCard"];export{o as AsCard,n as NestedSurfaces,r as Playground,t as Sizes,c as WithCustomContent,f as __namedExportsOrder,x as default};
