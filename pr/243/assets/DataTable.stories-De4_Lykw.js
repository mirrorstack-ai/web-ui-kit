import{j as e}from"./iframe-BSYa_ilr.js";import{D as n}from"./DataTable-BlXS1RK4.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const m={title:"UI/Notch/Blocks/Table",component:n,parameters:{layout:"centered"}},s=[{key:"method",label:"Method",width:"60px",mono:!0},{key:"path",label:"Path",mono:!0},{key:"scope",label:"Scope",width:"70px"}],t=[{method:"GET",path:"/platform/providers",scope:"public"},{method:"POST",path:"/internal/sessions",scope:"internal"},{method:"GET",path:"/account/orgs",scope:"account"},{method:"PUT",path:"/account/orgs/:id",scope:"account"},{method:"DELETE",path:"/internal/cache",scope:"internal"},{method:"POST",path:"/platform/modules",scope:"platform"}],o={render:()=>e.jsx("div",{className:"h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4",children:e.jsx(n,{columns:[...s],rows:t})})},r={render:()=>e.jsx("div",{className:"h-[200px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4",children:e.jsx(n,{columns:[{key:"name",label:"Name",mono:!0},{key:"description",label:"Description"}],rows:[{name:"read:modules",description:"List and inspect modules"},{name:"write:modules",description:"Create and update modules"},{name:"read:orgs",description:"View organisation details"},{name:"admin:billing",description:"Manage billing settings"}]})})},a={render:()=>e.jsx("div",{className:"h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4",children:e.jsx(n,{columns:[...s],rows:t,compact:!0})})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[...ROUTE_COLUMNS]} rows={ROUTE_ROWS} />
    </div>
}`,...o.parameters?.docs?.source},description:{story:"Six API routes with method, path, and scope columns.",...o.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[200px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[{
      key: "name",
      label: "Name",
      mono: true
    }, {
      key: "description",
      label: "Description"
    }]} rows={[{
      name: "read:modules",
      description: "List and inspect modules"
    }, {
      name: "write:modules",
      description: "Create and update modules"
    }, {
      name: "read:orgs",
      description: "View organisation details"
    }, {
      name: "admin:billing",
      description: "Manage billing settings"
    }]} />
    </div>
}`,...r.parameters?.docs?.source},description:{story:"Four permission rows — name (mono) and description.",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[...ROUTE_COLUMNS]} rows={ROUTE_ROWS} compact />
    </div>
}`,...a.parameters?.docs?.source},description:{story:"Same as Routes but with `compact` enabled for tighter row padding.",...a.parameters?.docs?.description}}};const l=["Routes","Permissions","Compact"];export{a as Compact,r as Permissions,o as Routes,l as __namedExportsOrder,m as default};
