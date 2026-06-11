import{j as e}from"./iframe-DVvTN3Cl.js";import{c as i}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function s({columns:c,rows:d,compact:u=!1,className:x}){return d.length===0?null:e.jsx("div",{className:i("h-full w-full overflow-y-auto [scrollbar-width:thin]",x),children:e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{className:"sticky top-0 z-10 bg-inherit",children:e.jsx("tr",{className:"border-b border-current/10",children:c.map(r=>e.jsx("th",{className:i("px-1.5 py-1 text-[10px] font-medium uppercase tracking-wider opacity-40",r.align==="right"&&"text-right"),style:r.width?{width:r.width}:void 0,children:r.label},r.key))})}),e.jsx("tbody",{children:d.map((r,l)=>e.jsx("tr",{className:i("text-xs",l<d.length-1&&"border-b border-current/5"),children:c.map(o=>e.jsx("td",{className:i("px-1.5",u?"py-0.5":"py-1",o.align==="right"&&"text-right",o.mono&&"font-mono text-[11px]"),children:e.jsx("div",{className:"truncate",children:r[o.key]})},o.key))},l))})]})})}s.__docgenInfo={description:"",methods:[],displayName:"DataTable",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"DataTableColumn"}],raw:"DataTableColumn[]"},description:""},rows:{required:!0,tsType:{name:"Array",elements:[{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}],raw:"Record<string, string | undefined>"}],raw:"Record<string, string | undefined>[]"},description:""},compact:{required:!1,tsType:{name:"boolean"},description:"Tighter vertical padding on data rows.",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const y={title:"UI/Blocks/Table",component:s,parameters:{layout:"centered"}},p=[{key:"method",label:"Method",width:"60px",mono:!0},{key:"path",label:"Path",mono:!0},{key:"scope",label:"Scope",width:"70px"}],m=[{method:"GET",path:"/platform/providers",scope:"public"},{method:"POST",path:"/internal/sessions",scope:"internal"},{method:"GET",path:"/account/orgs",scope:"account"},{method:"PUT",path:"/account/orgs/:id",scope:"account"},{method:"DELETE",path:"/internal/cache",scope:"internal"},{method:"POST",path:"/platform/modules",scope:"platform"}],a={render:()=>e.jsx("div",{className:"h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4",children:e.jsx(s,{columns:[...p],rows:m})})},n={render:()=>e.jsx("div",{className:"h-[200px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4",children:e.jsx(s,{columns:[{key:"name",label:"Name",mono:!0},{key:"description",label:"Description"}],rows:[{name:"read:modules",description:"List and inspect modules"},{name:"write:modules",description:"Create and update modules"},{name:"read:orgs",description:"View organisation details"},{name:"admin:billing",description:"Manage billing settings"}]})})},t={render:()=>e.jsx("div",{className:"h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4",children:e.jsx(s,{columns:[...p],rows:m,compact:!0})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[...ROUTE_COLUMNS]} rows={ROUTE_ROWS} />
    </div>
}`,...a.parameters?.docs?.source},description:{story:"Six API routes with method, path, and scope columns.",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source},description:{story:"Four permission rows — name (mono) and description.",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[300px] w-[400px] rounded-xl border border-outline-variant text-on-surface px-2 py-4">
      <DataTable columns={[...ROUTE_COLUMNS]} rows={ROUTE_ROWS} compact />
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Same as Routes but with `compact` enabled for tighter row padding.",...t.parameters?.docs?.description}}};const w=["Routes","Permissions","Compact"];export{t as Compact,n as Permissions,a as Routes,w as __namedExportsOrder,y as default};
