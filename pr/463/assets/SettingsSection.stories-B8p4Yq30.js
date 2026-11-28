import{j as e}from"./iframe-TV8EYqpb.js";import{R as n}from"./ReadOnlyField-CWDwQVFo.js";import{S as t}from"./SectionLabel-BKzbVJLM.js";import{S as a}from"./SettingRow-WwZYvJFz.js";import{S as s}from"./Switch-CmlH-7zd.js";import{B as i}from"./Button-BioCAvz_.js";import{S as c}from"./SettingsSection-BEWXtFMV.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-xnvhuiiN.js";import"./Progress-DhIsKYAC.js";import"./Icon-_oQo-S-6.js";import"./button-styles-CZHSjrxJ.js";import"./tone-B_C-zL0B.js";import"./Surface-Dtw_YBlB.js";const j={title:"UI/Surfaces/SettingsSection",component:c,args:{title:"Info"}},o={args:{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(n,{label:"Module ID",value:"m_abc123",mono:!0,copyable:!0}),e.jsx(n,{label:"Created",value:"May 4, 2026"})]})}},r={render:()=>e.jsxs("div",{className:"space-y-6 max-w-md",children:[e.jsxs("div",{children:[e.jsx(t,{className:"mb-2 text-warning",children:"Advanced"}),e.jsx("div",{className:"space-y-2",children:e.jsx(a,{tone:"warning",title:"Developer mode",description:"Show the developer rail.",className:"px-6 py-4",control:e.jsx(s,{checked:!0,onChange:()=>{},color:"warning","aria-label":"developer"})})})]}),e.jsxs("div",{children:[e.jsx(t,{className:"mb-2 text-error",children:"Danger zone"}),e.jsx("div",{className:"space-y-2",children:e.jsx(a,{tone:"error",title:"Delete module",description:"Permanently delete. Cannot be undone.",className:"px-6 py-4",control:e.jsx(i,{color:"error",variant:"filled",size:"sm",children:"Delete"})})})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="space-y-4">
        <ReadOnlyField label="Module ID" value="m_abc123" mono copyable />
        <ReadOnlyField label="Created" value="May 4, 2026" />
      </div>
  }
}`,...o.parameters?.docs?.source},description:{story:`CONTENT RULE (owner 09-14): one coherent policy = one SettingsSection
block with dividers; independent fields = per-field SettingRow cards.
Section-title typography (SectionLabel) must match the deployed
references exactly.`,...o.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source},description:{story:`Tone-coloured groups (Advanced=warning, Danger zone=error) do NOT use
SettingsSection. They render SectionLabel above a naked stack of
SettingRow rows (each row carries its own border) with no enclosing
Surface. Shown here for contrast with the boxed sections above.`,...r.parameters?.docs?.description}}};const D=["Playground","ToneColouredGroupsAreNotSettingsSection"];export{o as Playground,r as ToneColouredGroupsAreNotSettingsSection,D as __namedExportsOrder,j as default};
