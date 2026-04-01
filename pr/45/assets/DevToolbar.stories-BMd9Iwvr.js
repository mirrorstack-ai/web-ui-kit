import{r as i,j as e}from"./iframe-SjGVCvAS.js";import"./preload-helper-PPVm8Dsz.js";function n({items:a,value:s,onChange:r,showError:o,onToggleError:l}){return null}n.__docgenInfo={description:"",methods:[],displayName:"DevToolbar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"DevToolbarItem"}],raw:"DevToolbarItem[]"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},showError:{required:!1,tsType:{name:"boolean"},description:""},onToggleError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const m={title:"Ui/State/DevToolbar",component:n,parameters:{layout:"fullscreen"}},t={args:{items:[],value:"",onChange:()=>{}},render:()=>{const[a,s]=i.useState("a"),[r,o]=i.useState(!1);return e.jsxs("div",{className:"h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface",children:[e.jsx(n,{items:[{label:"State A",value:"a"},{label:"State B",value:"b"},{label:"State C",value:"c"}],value:a,onChange:s,showError:r,onToggleError:()=>o(l=>!l)}),e.jsxs("div",{className:"flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant",children:[e.jsx("h2",{className:"text-xl font-medium tracking-tight",children:"Main Content Area"}),e.jsxs("p",{className:"text-on-surface-variant",children:["Current selected state value: ",e.jsx("strong",{className:"text-primary",children:a})]}),e.jsxs("p",{className:"text-on-surface-variant",children:["Error mode: ",e.jsx("strong",{className:r?"text-error font-medium":"",children:r?"Active":"Inactive"})]})]})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const d=["Playground"];export{t as Playground,d as __namedExportsOrder,m as default};
