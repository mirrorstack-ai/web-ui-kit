import{r as i,j as e}from"./iframe-FTbIt3N-.js";import{N as r}from"./NavDrawer-DTF8TYsA.js";import{A as o}from"./Avatar-AqBPlQ_d.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-ByLXQD10.js";import"./Surface-9pgbFOc2.js";import"./SectionLabel-C0yLUyM3.js";const c=[{label:"Account",items:[{id:"profile",label:"Profile",icon:"person"},{id:"security",label:"Security",icon:"shield"},{id:"preferences",label:"Preferences",icon:"tune"}]},{items:[{id:"organizations",label:"Organizations",icon:"apartment"}]},{items:[{id:"sign-out",label:"Sign out",icon:"logout",variant:"danger"}]}],N={title:"UI/Navigation/NavDrawer",component:r,decorators:[a=>e.jsx("div",{className:"h-[500px] border border-outline-variant rounded-2xl overflow-hidden",children:e.jsx(a,{})})]},t={render:()=>{const[a,s]=i.useState("profile");return e.jsx(r,{contextSwitcher:e.jsxs("div",{className:"flex items-center gap-3 p-3 rounded-xl",children:[e.jsx(o,{size:"md",fallback:"J"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-0.5",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface truncate",children:"John Doe"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Personal Account"})]})]}),sections:c,activeItemId:a,onItemClick:n=>s(n.id)})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("profile");
    return <NavDrawer contextSwitcher={<div className="flex items-center gap-3 p-3 rounded-xl">
            <Avatar size="md" fallback="J" />
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-sm font-medium text-on-surface truncate">John Doe</p>
              <p className="text-xs text-on-surface-variant">Personal Account</p>
            </div>
          </div>} sections={sections} activeItemId={active} onItemClick={(item: NavDrawerItem) => setActive(item.id)} />;
  }
}`,...t.parameters?.docs?.source}}};const g=["Playground"];export{t as Playground,g as __namedExportsOrder,N as default};
