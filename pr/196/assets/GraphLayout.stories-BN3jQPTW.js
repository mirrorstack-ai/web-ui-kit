import{r as a,j as e}from"./iframe-CM0Anx7z.js";import{G as o,a as i}from"./GraphSide-BkgHoBOM.js";import{G as l}from"./GraphAction-C1c7aflW.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-BD2oXN35.js";import"./Progress-BfA-MwJ-.js";import"./Icon-C6YQzOq2.js";import"./button-styles-DvQkePbc.js";const G={title:"Layout/Graph",component:o,decorators:[s=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(s,{})})]},p={id:"settings",label:"Graph settings",tag:"configuration"},t={render:()=>{const[s,n]=a.useState(!1);return e.jsx(o,{action:e.jsx(l,{onReplay:()=>{},onFit:()=>{},onSettings:()=>n(r=>!r)}),side:e.jsx(i,{node:s?p:null,onClose:()=>n(!1),renderDetails:()=>e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"This panel is opened by the settings toolbar button."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Real consumers will plug their graph settings form in here."})]})})})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <GraphLayout action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>This panel is opened by the settings toolbar button.</p>
                <p className="text-on-surface-variant text-xs">
                  Real consumers will plug their graph settings form in here.
                </p>
              </div>} />} />;
  }
}`,...t.parameters?.docs?.source},description:{story:"Click the settings (last) icon button to toggle the side panel open.",...t.parameters?.docs?.description}}};const b=["SettingsTogglesSide"];export{t as SettingsTogglesSide,b as __namedExportsOrder,G as default};
