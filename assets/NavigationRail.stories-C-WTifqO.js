import{r as o,j as e}from"./iframe-CaEuFnh0.js";import{N as n,a as s}from"./NavigationButton-Bb7DSVNE.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-4ygUkr5v.js";const m={title:"UI/Navigation/NavigationRail",component:n,decorators:[a=>e.jsx("div",{className:"h-[600px] flex",children:e.jsx(a,{})})]},t={render:()=>{const[a,l]=o.useState("apps");return e.jsxs(n,{logo:e.jsx(s,{customIcon:e.jsx("div",{className:"w-full h-full bg-primary/20 flex items-center justify-center",children:e.jsx("span",{className:"text-primary font-semibold text-lg",children:"M"})}),label:"My App",variant:"secondary",disableHoverExpand:!0,className:"border border-primary"}),children:[e.jsxs("div",{className:"w-full gap-2 flex flex-col",children:[e.jsx(s,{icon:"space_dashboard",label:"Dashboard",variant:"primary",selected:a==="dashboard",onClick:()=>l("dashboard")}),e.jsx(s,{icon:"apps",label:"Your Apps",selected:a==="apps",onClick:()=>l("apps")})]}),e.jsx("div",{className:"h-px rounded-full w-full bg-outline"}),e.jsxs("div",{className:"w-full gap-2 flex flex-col",children:[e.jsx(s,{icon:"extension",label:"Add-ons",selected:a==="addons",onClick:()=>l("addons")}),e.jsx(s,{icon:"rocket_launch",label:"Deployment",selected:a==="deployment",onClick:()=>l("deployment")}),e.jsx(s,{icon:"settings",label:"Settings",selected:a==="settings",onClick:()=>l("settings")})]})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState("apps");
    return <NavigationRail logo={<NavigationButton customIcon={<div className="w-full h-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">M</span>
              </div>} label="My App" variant="secondary" disableHoverExpand className="border border-primary" />}>
        <div className="w-full gap-2 flex flex-col">
          <NavigationButton icon="space_dashboard" label="Dashboard" variant="primary" selected={selected === "dashboard"} onClick={() => setSelected("dashboard")} />
          <NavigationButton icon="apps" label="Your Apps" selected={selected === "apps"} onClick={() => setSelected("apps")} />
        </div>
        <div className="h-px rounded-full w-full bg-outline" />
        <div className="w-full gap-2 flex flex-col">
          <NavigationButton icon="extension" label="Add-ons" selected={selected === "addons"} onClick={() => setSelected("addons")} />
          <NavigationButton icon="rocket_launch" label="Deployment" selected={selected === "deployment"} onClick={() => setSelected("deployment")} />
          <NavigationButton icon="settings" label="Settings" selected={selected === "settings"} onClick={() => setSelected("settings")} />
        </div>
      </NavigationRail>;
  }
}`,...t.parameters?.docs?.source}}};const u=["Playground"];export{t as Playground,u as __namedExportsOrder,m as default};
