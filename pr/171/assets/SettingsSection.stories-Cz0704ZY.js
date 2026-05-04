import{j as e}from"./iframe-ohWrc7X2.js";import{R as a}from"./ReadOnlyField-sQr-LzrE.js";import{S as l}from"./SectionLabel-2594FLU2.js";import{t as g,S as c}from"./SettingRow-uxjeeiwY.js";import{S}from"./Switch-BXIPUVca.js";import{B as h}from"./Button-Ds9TefSv.js";import{c as i}from"./cn-IyxL_b2c.js";import{S as v}from"./Surface-C5Wv9Sy-.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-CJtoAGyN.js";import"./Progress-COBKZHR2.js";import"./Icon-DdVA76pq.js";import"./button-styles-DvQkePbc.js";function t({title:d,tone:s,children:m,className:p,surfaceClassName:u}){return e.jsxs("section",{className:p,children:[e.jsx(l,{className:i("mb-2",s&&g[s]),children:d}),e.jsx(v,{className:i("p-6",u),children:m})]})}t.__docgenInfo={description:"",methods:[],displayName:"SettingsSection",props:{title:{required:!0,tsType:{name:"ReactNode"},description:"Section heading text. Rendered via <SectionLabel>."},tone:{required:!1,tsType:{name:"Tone"},description:'Theme color for the title (e.g. "warning" for advanced groupings).'},children:{required:!0,tsType:{name:"ReactNode"},description:"Body of the section — usually a stack of fields."},className:{required:!1,tsType:{name:"string"},description:"Optional class on the outer wrapper."},surfaceClassName:{required:!1,tsType:{name:"string"},description:"Optional class on the inner Surface (e.g. override padding)."}}};const _={title:"UI/Surfaces/SettingsSection",component:t,args:{title:"Info"}},r={args:{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Module ID",value:"m_abc123",mono:!0,copyable:!0}),e.jsx(a,{label:"Created",value:"May 4, 2026"})]})}},o={render:()=>e.jsxs("div",{className:"space-y-4 max-w-md",children:[e.jsx(t,{title:"Info",children:e.jsx(a,{label:"Module ID",value:"m_abc",mono:!0})}),e.jsx(t,{title:"Advanced",tone:"warning",children:e.jsx(c,{tone:"warning",title:"Developer mode",description:"Show the developer rail.",control:e.jsx(S,{checked:!0,onChange:()=>{},color:"warning","aria-label":"developer"})})})]})},n={render:()=>e.jsxs("div",{className:"max-w-md",children:[e.jsx(l,{className:"mb-2 text-error",children:"Danger zone"}),e.jsx("div",{className:"space-y-2",children:e.jsx(c,{tone:"error",title:"Delete module",description:"Permanently delete. Cannot be undone.",className:"px-6 py-4",control:e.jsx(h,{color:"error",variant:"filled",size:"sm",children:"Delete"})})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="space-y-4">
        <ReadOnlyField label="Module ID" value="m_abc123" mono copyable />
        <ReadOnlyField label="Created" value="May 4, 2026" />
      </div>
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-md">
      <SettingsSection title="Info">
        <ReadOnlyField label="Module ID" value="m_abc" mono />
      </SettingsSection>
      <SettingsSection title="Advanced" tone="warning">
        <SettingRow tone="warning" title="Developer mode" description="Show the developer rail." control={<Switch checked onChange={() => {}} color="warning" aria-label="developer" />} />
      </SettingsSection>
    </div>
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-md">
      <SectionLabel className="mb-2 text-error">Danger zone</SectionLabel>
      <div className="space-y-2">
        <SettingRow tone="error" title="Delete module" description="Permanently delete. Cannot be undone." className="px-6 py-4" control={<Button color="error" variant="filled" size="sm">
              Delete
            </Button>} />
      </div>
    </div>
}`,...n.parameters?.docs?.source},description:{story:`Danger zones intentionally do NOT use SettingsSection. They render
the label as a tone-error SectionLabel followed by a naked stack of
SettingRow tone="error" rows (each row carries its own border).
Shown here for contrast with the boxed sections above.`,...n.parameters?.docs?.description}}};const M=["Playground","Tones","DangerZoneIsNotSettingsSection"];export{n as DangerZoneIsNotSettingsSection,r as Playground,o as Tones,M as __namedExportsOrder,_ as default};
