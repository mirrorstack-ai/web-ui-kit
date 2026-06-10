import{r as c,j as e}from"./iframe-JHqcGjer.js";import{B as o}from"./BottomNavItem-BMcaDgNv.js";import{N as m}from"./NavigationRail-XvBu3ihG.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-ByHUCXjJ.js";const b={title:"UI/Navigation/BottomNavItem",component:o},s={args:{icon:"dashboard",label:"Overview",selected:!0}},n={decorators:[i=>e.jsx("div",{className:"h-40 w-[420px] flex items-end justify-center",children:e.jsx(i,{})})],render:()=>{const[i,r]=c.useState("overview"),l=[{id:"overview",icon:"dashboard",label:"Overview"},{id:"users",icon:"group",label:"Users"},{id:"billing",icon:"payments",label:"Billing"},{id:"settings",icon:"settings",label:"Settings"}];return e.jsxs(m,{orientation:"horizontal",containerClassName:"gap-0 px-3 py-2",children:[e.jsx(o,{customIcon:e.jsx("div",{className:"w-full h-full bg-primary/20 flex items-center justify-center",children:e.jsx("span",{className:"text-primary font-semibold text-lg",children:"M"})}),label:"My App",showTitle:!1,onClick:()=>r("overview")}),l.map(t=>e.jsx(o,{icon:t.icon,label:t.label,selected:i===t.id,onClick:()=>r(t.id)},t.id))]})}},a={args:{customIcon:e.jsx("div",{className:"w-full h-full bg-tertiary/30 flex items-center justify-center",children:e.jsx("span",{className:"text-on-surface font-semibold",children:"U"})}),iconShape:"circle",label:"Account",selected:!0,showTitle:!1}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "dashboard",
    label: "Overview",
    selected: true
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="h-40 w-[420px] flex items-end justify-center">
        <Story />
      </div>],
  render: () => {
    const [selected, setSelected] = useState("overview");
    const items = [{
      id: "overview",
      icon: "dashboard",
      label: "Overview"
    }, {
      id: "users",
      icon: "group",
      label: "Users"
    }, {
      id: "billing",
      icon: "payments",
      label: "Billing"
    }, {
      id: "settings",
      icon: "settings",
      label: "Settings"
    }];
    return <NavigationRail orientation="horizontal" containerClassName="gap-0 px-3 py-2">
        <BottomNavItem customIcon={<div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">M</span>
            </div>} label="My App" showTitle={false} onClick={() => setSelected("overview")} />
        {items.map(item => <BottomNavItem key={item.id} icon={item.icon} label={item.label} selected={selected === item.id} onClick={() => setSelected(item.id)} />)}
      </NavigationRail>;
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    customIcon: <div className="w-full h-full bg-tertiary/30 flex items-center justify-center">
        <span className="text-on-surface font-semibold">U</span>
      </div>,
    iconShape: "circle",
    label: "Account",
    selected: true,
    showTitle: false
  }
}`,...a.parameters?.docs?.source}}};const x=["Playground","BottomNavPill","CircleCustomIcon"];export{n as BottomNavPill,a as CircleCustomIcon,s as Playground,x as __namedExportsOrder,b as default};
