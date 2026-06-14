import{r,j as e}from"./iframe-6BfY-aQ5.js";import{N as i,B as d}from"./BottomNavItem-BEUSiitP.js";import{N as t}from"./NavigationButton-Qn9dG0n_.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-zDoNXaXF.js";const f={title:"UI/Navigation/NavigationRail",component:i,decorators:[s=>e.jsx("div",{className:"h-[600px] flex",children:e.jsx(s,{})})]},l={decorators:[s=>e.jsx("div",{className:"h-[600px] w-[500px] flex items-end justify-center",children:e.jsx(s,{})})],render:()=>{const[s,a]=r.useState("apps"),c=[{id:"dashboard",icon:"space_dashboard",label:"Dashboard"},{id:"apps",icon:"apps",label:"Your Apps"},{id:"addons",icon:"extension",label:"Add-ons"},{id:"settings",icon:"settings",label:"Settings"}];return e.jsxs(i,{orientation:"horizontal",containerClassName:"gap-0 px-3 py-2",children:[e.jsx(d,{customIcon:e.jsx("div",{className:"w-full h-full bg-primary/20 flex items-center justify-center",children:e.jsx("span",{className:"text-primary font-semibold text-lg",children:"M"})}),label:"My App",showTitle:!1,onClick:()=>a("dashboard")}),c.map(n=>e.jsx(d,{icon:n.icon,label:n.label,selected:s===n.id,onClick:()=>a(n.id)},n.id))]})}},o={render:()=>{const[s,a]=r.useState("apps");return e.jsxs(i,{logo:e.jsx(t,{customIcon:e.jsx("div",{className:"w-full h-full bg-primary/20 flex items-center justify-center",children:e.jsx("span",{className:"text-primary font-semibold text-lg",children:"M"})}),label:"My App",variant:"secondary",disableHoverExpand:!0,className:"border border-primary"}),children:[e.jsxs("div",{className:"w-full gap-2 flex flex-col",children:[e.jsx(t,{icon:"space_dashboard",label:"Dashboard",variant:"primary",selected:s==="dashboard",onClick:()=>a("dashboard")}),e.jsx(t,{icon:"apps",label:"Your Apps",selected:s==="apps",onClick:()=>a("apps")})]}),e.jsx("div",{className:"h-px rounded-full w-full bg-outline"}),e.jsxs("div",{className:"w-full gap-2 flex flex-col",children:[e.jsx(t,{icon:"extension",label:"Add-ons",selected:s==="addons",onClick:()=>a("addons")}),e.jsx(t,{icon:"rocket_launch",label:"Deployment",selected:s==="deployment",onClick:()=>a("deployment")}),e.jsx(t,{icon:"settings",label:"Settings",selected:s==="settings",onClick:()=>a("settings")})]})]})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="h-[600px] w-[500px] flex items-end justify-center">
        <Story />
      </div>],
  render: () => {
    const [selected, setSelected] = useState("apps");
    const items = [{
      id: "dashboard",
      icon: "space_dashboard",
      label: "Dashboard"
    }, {
      id: "apps",
      icon: "apps",
      label: "Your Apps"
    }, {
      id: "addons",
      icon: "extension",
      label: "Add-ons"
    }, {
      id: "settings",
      icon: "settings",
      label: "Settings"
    }];
    return <NavigationRail orientation="horizontal" containerClassName="gap-0 px-3 py-2">
        <BottomNavItem customIcon={<div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">M</span>
            </div>} label="My App" showTitle={false} onClick={() => setSelected("dashboard")} />
        {items.map(item => <BottomNavItem key={item.id} icon={item.icon} label={item.label} selected={selected === item.id} onClick={() => setSelected(item.id)} />)}
      </NavigationRail>;
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const h=["Horizontal","Playground"];export{l as Horizontal,o as Playground,h as __namedExportsOrder,f as default};
