import{j as e,r as p}from"./iframe-CMY60SDf.js";import{c as m}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const g=!0;function u({items:c,value:i,onChange:d,showError:r,onToggleError:l}){return g?e.jsx("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-50 flex bg-surface-container border border-outline-variant rounded-2xl px-4 py-2 shadow-xl",children:e.jsxs("div",{className:"flex items-center gap-2 whitespace-nowrap",children:[e.jsx("span",{className:"text-xs font-mono text-on-surface-variant shrink-0",children:"DEV:"}),c.map(t=>e.jsx("button",{onClick:()=>d(t.value),className:m("px-2 py-1 text-xs rounded shrink-0 transition-colors cursor-pointer",i===t.value?"bg-primary text-on-primary":"bg-surface-container-low text-on-surface-variant hover:bg-surface-container"),children:t.label},t.value)),l&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"w-px h-4 bg-outline-variant shrink-0"}),e.jsx("button",{onClick:l,className:m("px-2 py-1 text-xs rounded shrink-0 transition-colors cursor-pointer",r?"bg-error text-on-error":"bg-surface-container-low text-on-surface-variant hover:bg-surface-container"),children:r?"Error ON":"Error OFF"})]})]})}):null}u.__docgenInfo={description:"",methods:[],displayName:"DevToolbar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"DevToolbarItem"}],raw:"DevToolbarItem[]"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},showError:{required:!1,tsType:{name:"boolean"},description:""},onToggleError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const h={title:"UI/State/DevToolbar",component:u,parameters:{layout:"fullscreen"},args:{items:[{label:"State A",value:"a"},{label:"State B",value:"b"},{label:"State C",value:"c"}],value:"a",showError:!1},argTypes:{value:{control:"select",options:["a","b","c"]},showError:{control:"boolean"}}},o={},s={render:c=>{const[i,d]=p.useState(c.value??"a"),[r,l]=p.useState(!1);return e.jsxs("div",{className:"h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface",children:[e.jsx(u,{...c,value:i,onChange:d,showError:r,onToggleError:()=>l(t=>!t)}),e.jsxs("div",{className:"flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant",children:[e.jsx("h2",{className:"text-xl font-medium tracking-tight",children:"Main Content Area"}),e.jsxs("p",{className:"text-on-surface-variant",children:["Selected: ",e.jsx("strong",{className:"text-primary",children:i})]}),e.jsxs("p",{className:"text-on-surface-variant",children:["Error:"," ",e.jsx("strong",{className:r?"text-error font-medium":"",children:r?"Active":"Inactive"})]})]})]})}},a={args:{onToggleError:void 0,showError:void 0}},n={args:{showError:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState(args.value ?? "a");
    const [showError, setShowError] = useState(false);
    return <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar {...args} value={selected} onChange={setSelected} showError={showError} onToggleError={() => setShowError(prev => !prev)} />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">
            Main Content Area
          </h2>
          <p className="text-on-surface-variant">
            Selected: <strong className="text-primary">{selected}</strong>
          </p>
          <p className="text-on-surface-variant">
            Error:{" "}
            <strong className={showError ? "text-error font-medium" : ""}>
              {showError ? "Active" : "Inactive"}
            </strong>
          </p>
        </div>
      </div>;
  }
}`,...s.parameters?.docs?.source},description:{story:"Controlled example with live state",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    onToggleError: undefined,
    showError: undefined
  }
}`,...a.parameters?.docs?.source},description:{story:"Without error toggle",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    showError: true
  }
}`,...n.parameters?.docs?.source},description:{story:"With error active",...n.parameters?.docs?.description}}};const b=["Playground","Controlled","WithoutErrorToggle","ErrorActive"];export{s as Controlled,n as ErrorActive,o as Playground,a as WithoutErrorToggle,b as __namedExportsOrder,h as default};
