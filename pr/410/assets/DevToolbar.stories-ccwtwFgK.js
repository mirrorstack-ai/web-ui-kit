import{j as e,r as c}from"./iframe-BgqVkdVW.js";import{c as h}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const d=!0;function m(n){const{showError:r,onToggleError:t}=n;if(!d)return null;const s=n.axes??[{items:n.items,value:n.value,onChange:n.onChange}];return e.jsx("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)] flex bg-surface-container border border-outline-variant rounded-2xl px-4 py-2 shadow-xl",children:e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("span",{className:"text-xs font-mono text-on-surface-variant shrink-0",children:"DEV:"}),s.map((a,i)=>e.jsxs("div",{className:"flex items-center gap-2",role:"group","aria-label":a.label,children:[a.label&&e.jsx("span",{className:"text-xs font-mono text-on-surface-variant shrink-0",children:a.label}),a.items.map(l=>e.jsx("button",{onClick:()=>a.onChange(l.value),"aria-pressed":a.value===l.value,className:h("px-2 py-1 text-xs rounded shrink-0 transition-colors",a.value===l.value?"bg-primary text-on-primary":"bg-surface-container-low text-on-surface-variant hover:bg-surface-container"),children:l.label},l.value)),i<s.length-1&&e.jsx("span",{className:"w-px h-4 bg-outline-variant shrink-0"})]},a.label??`axis-${i}`)),t&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"w-px h-4 bg-outline-variant shrink-0"}),e.jsx("button",{onClick:t,"aria-pressed":!!r,className:h("px-2 py-1 whitespace-nowrap text-xs rounded shrink-0 transition-colors",r?"bg-error text-on-error":"bg-surface-container-low text-on-surface-variant hover:bg-surface-container"),children:r?"Error ON":"Error OFF"})]})]})})}m.__docgenInfo={description:"",methods:[],displayName:"DevToolbar"};const f={title:"Ui/State/DevToolbar",component:m,parameters:{layout:"fullscreen"}},u={args:{items:[],value:"",onChange:()=>{}},render:()=>{const[n,r]=c.useState("a"),[t,s]=c.useState(!1);return e.jsxs("div",{className:"h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface",children:[e.jsx(m,{items:[{label:"State A",value:"a"},{label:"State B",value:"b"},{label:"State C",value:"c"}],value:n,onChange:r,showError:t,onToggleError:()=>s(a=>!a)}),e.jsxs("div",{className:"flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant",children:[e.jsx("h2",{className:"text-xl font-medium tracking-tight",children:"Main Content Area"}),e.jsxs("p",{className:"text-on-surface-variant",children:["Current selected state value: ",e.jsx("strong",{className:"text-primary",children:n})]}),e.jsxs("p",{className:"text-on-surface-variant",children:["Error mode: ",e.jsx("strong",{className:t?"text-error font-medium":"",children:t?"Active":"Inactive"})]})]})]})}},o={args:{items:[],value:"",onChange:()=>{}},render:()=>{const[n,r]=c.useState("empty"),[t,s]=c.useState("light"),[a,i]=c.useState("zh-TW");return e.jsxs("div",{className:"h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface",children:[e.jsx(m,{axes:[{label:"Scene",items:[{label:"Empty",value:"empty"},{label:"Loaded",value:"loaded"},{label:"Error",value:"error"}],value:n,onChange:r},{label:"Theme",items:[{label:"Light",value:"light"},{label:"Dark",value:"dark"}],value:t,onChange:s},{label:"Locale",items:[{label:"zh-TW",value:"zh-TW"},{label:"en",value:"en"}],value:a,onChange:i}]}),e.jsxs("div",{className:"flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant",children:[e.jsx("h2",{className:"text-xl font-medium tracking-tight",children:"Preview Target"}),e.jsxs("p",{className:"text-on-surface-variant",children:["scene ",e.jsx("strong",{className:"text-primary",children:n})," · theme"," ",e.jsx("strong",{className:"text-primary",children:t})," · locale"," ",e.jsx("strong",{className:"text-primary",children:a})]}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Narrow the viewport to 400px: the bar wraps instead of running off both edges."})]})]})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    value: "",
    onChange: () => {}
  },
  render: () => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [scene, setScene] = useState("empty");
    const [theme, setTheme] = useState("light");
    const [locale, setLocale] = useState("zh-TW");
    /* eslint-enable react-hooks/rules-of-hooks */

    return <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar axes={[{
        label: "Scene",
        items: [{
          label: "Empty",
          value: "empty"
        }, {
          label: "Loaded",
          value: "loaded"
        }, {
          label: "Error",
          value: "error"
        }],
        value: scene,
        onChange: setScene
      }, {
        label: "Theme",
        items: [{
          label: "Light",
          value: "light"
        }, {
          label: "Dark",
          value: "dark"
        }],
        value: theme,
        onChange: setTheme
      }, {
        label: "Locale",
        items: [{
          label: "zh-TW",
          value: "zh-TW"
        }, {
          label: "en",
          value: "en"
        }],
        value: locale,
        onChange: setLocale
      }]} />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">Preview Target</h2>
          <p className="text-on-surface-variant">
            scene <strong className="text-primary">{scene}</strong> · theme{" "}
            <strong className="text-primary">{theme}</strong> · locale{" "}
            <strong className="text-primary">{locale}</strong>
          </p>
          <p className="text-xs text-on-surface-variant">
            Narrow the viewport to 400px: the bar wraps instead of running off both edges.
          </p>
        </div>
      </div>;
  }
}`,...o.parameters?.docs?.source},description:{story:"Three axes in ONE bar — the shape a module preview needs.\n\nBefore `axes`, this took two DevToolbars (which overlap, both being `fixed`\nand centred) or folding theme and locale into the scene's own `items`, which\nis what quiz-core and ai-assistant each worked around differently.",...o.parameters?.docs?.description}}};const p=["Playground","MultiAxis"];export{o as MultiAxis,u as Playground,p as __namedExportsOrder,f as default};
