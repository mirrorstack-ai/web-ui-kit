import{j as e,r as c}from"./iframe-ByknMEHY.js";import{c as u}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const d=!0;function i({items:t,value:l,onChange:r,showError:a,onToggleError:n}){return d?e.jsx("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-50 flex bg-surface-container border border-outline-variant rounded-2xl px-4 py-2 shadow-xl",children:e.jsxs("div",{className:"flex items-center gap-2 whitespace-nowrap",children:[e.jsx("span",{className:"text-xs font-mono text-on-surface-variant shrink-0",children:"DEV:"}),t.map(s=>e.jsx("button",{onClick:()=>r(s.value),className:u("px-2 py-1 text-xs rounded shrink-0 transition-colors",l===s.value?"bg-primary text-on-primary":"bg-surface-container-low text-on-surface-variant hover:bg-surface-container"),children:s.label},s.value)),n&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"w-px h-4 bg-outline-variant shrink-0"}),e.jsx("button",{onClick:n,className:u("px-2 py-1 whitespace-nowrap text-xs rounded shrink-0 transition-colors",a?"bg-error text-on-error":"bg-surface-container-low text-on-surface-variant hover:bg-surface-container"),children:a?"Error ON":"Error OFF"})]})]})}):null}i.__docgenInfo={description:"",methods:[],displayName:"DevToolbar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"DevToolbarItem"}],raw:"DevToolbarItem[]"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},showError:{required:!1,tsType:{name:"boolean"},description:""},onToggleError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const v={title:"Ui/State/DevToolbar",component:i,parameters:{layout:"fullscreen"}},o={args:{items:[],value:"",onChange:()=>{}},render:()=>{const[t,l]=c.useState("a"),[r,a]=c.useState(!1);return e.jsxs("div",{className:"h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface",children:[e.jsx(i,{items:[{label:"State A",value:"a"},{label:"State B",value:"b"},{label:"State C",value:"c"}],value:t,onChange:l,showError:r,onToggleError:()=>a(n=>!n)}),e.jsxs("div",{className:"flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant",children:[e.jsx("h2",{className:"text-xl font-medium tracking-tight",children:"Main Content Area"}),e.jsxs("p",{className:"text-on-surface-variant",children:["Current selected state value: ",e.jsx("strong",{className:"text-primary",children:t})]}),e.jsxs("p",{className:"text-on-surface-variant",children:["Error mode: ",e.jsx("strong",{className:r?"text-error font-medium":"",children:r?"Active":"Inactive"})]})]})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    value: "",
    onChange: () => {}
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("a");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showError, setShowError] = useState(false);
    return <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar items={[{
        label: "State A",
        value: "a"
      }, {
        label: "State B",
        value: "b"
      }, {
        label: "State C",
        value: "c"
      }]} value={value} onChange={setValue} showError={showError} onToggleError={() => setShowError(prev => !prev)} />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">Main Content Area</h2>
          <p className="text-on-surface-variant">
            Current selected state value: <strong className="text-primary">{value}</strong>
          </p>
          <p className="text-on-surface-variant">
            Error mode: <strong className={showError ? "text-error font-medium" : ""}>{showError ? "Active" : "Inactive"}</strong>
          </p>
        </div>
      </div>;
  }
}`,...o.parameters?.docs?.source}}};const f=["Playground"];export{o as Playground,f as __namedExportsOrder,v as default};
