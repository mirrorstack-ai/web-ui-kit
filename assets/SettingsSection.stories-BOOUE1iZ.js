import{j as e}from"./iframe-CztiUFow.js";import{R as n}from"./ReadOnlyField-Du1l1Zs-.js";import{S as a}from"./SectionLabel-Bbuns3R-.js";import{S as t}from"./SettingRow-Bqkz2xWi.js";import{S as s}from"./Switch-BD2cH_81.js";import{B as i}from"./Button-CNuL4ieD.js";import{S as l}from"./SettingsSection-06Xyq5NR.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-CYbK8OlM.js";import"./Progress-B7fSGhhC.js";import"./Icon-C3UaR-4f.js";import"./button-styles-CZHSjrxJ.js";import"./tone-B_C-zL0B.js";import"./Surface-lXP3eSDP.js";const f={title:"UI/Surfaces/SettingsSection",component:l,args:{title:"Info"}},r={args:{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(n,{label:"Module ID",value:"m_abc123",mono:!0,copyable:!0}),e.jsx(n,{label:"Created",value:"May 4, 2026"})]})}},o={render:()=>e.jsxs("div",{className:"space-y-6 max-w-md",children:[e.jsxs("div",{children:[e.jsx(a,{className:"mb-2 text-warning",children:"Advanced"}),e.jsx("div",{className:"space-y-2",children:e.jsx(t,{tone:"warning",title:"Developer mode",description:"Show the developer rail.",className:"px-6 py-4",control:e.jsx(s,{checked:!0,onChange:()=>{},color:"warning","aria-label":"developer"})})})]}),e.jsxs("div",{children:[e.jsx(a,{className:"mb-2 text-error",children:"Danger zone"}),e.jsx("div",{className:"space-y-2",children:e.jsx(t,{tone:"error",title:"Delete module",description:"Permanently delete. Cannot be undone.",className:"px-6 py-4",control:e.jsx(i,{color:"error",variant:"filled",size:"sm",children:"Delete"})})})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="space-y-4">
        <ReadOnlyField label="Module ID" value="m_abc123" mono copyable />
        <ReadOnlyField label="Created" value="May 4, 2026" />
      </div>
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-6 max-w-md">
      <div>
        <SectionLabel className="mb-2 text-warning">Advanced</SectionLabel>
        <div className="space-y-2">
          <SettingRow tone="warning" title="Developer mode" description="Show the developer rail." className="px-6 py-4" control={<Switch checked onChange={() => {}} color="warning" aria-label="developer" />} />
        </div>
      </div>
      <div>
        <SectionLabel className="mb-2 text-error">Danger zone</SectionLabel>
        <div className="space-y-2">
          <SettingRow tone="error" title="Delete module" description="Permanently delete. Cannot be undone." className="px-6 py-4" control={<Button color="error" variant="filled" size="sm">
                Delete
              </Button>} />
        </div>
      </div>
    </div>
}`,...o.parameters?.docs?.source},description:{story:`Tone-coloured groups (Advanced=warning, Danger zone=error) do NOT use
SettingsSection. They render SectionLabel above a naked stack of
SettingRow rows (each row carries its own border) with no enclosing
Surface. Shown here for contrast with the boxed sections above.`,...o.parameters?.docs?.description}}};const D=["Playground","ToneColouredGroupsAreNotSettingsSection"];export{r as Playground,o as ToneColouredGroupsAreNotSettingsSection,D as __namedExportsOrder,f as default};
