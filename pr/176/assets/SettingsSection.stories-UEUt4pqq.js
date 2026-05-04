import{j as e}from"./iframe-Cr7GgOG9.js";import{R as a}from"./ReadOnlyField-Cb48e4SB.js";import{S as n}from"./SectionLabel-CEJNKIRu.js";import{S as t}from"./SettingRow-tY1kX4rP.js";import{S as m}from"./Switch-Cr0I0tXG.js";import{B as p}from"./Button-BUDQIcnv.js";import{c as u}from"./cn-IyxL_b2c.js";import{S}from"./Surface-CZ_AiVvY.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-DIyBtbDC.js";import"./Progress-D5lDgJbj.js";import"./Icon-RC_xIkTo.js";import"./button-styles-DvQkePbc.js";function s({title:i,children:c,className:l,surfaceClassName:d}){return e.jsxs("section",{className:l,children:[e.jsx(n,{className:"mb-2",children:i}),e.jsx(S,{className:u("p-6",d),children:c})]})}s.__docgenInfo={description:"",methods:[],displayName:"SettingsSection",props:{title:{required:!0,tsType:{name:"ReactNode"},description:"Section heading text. Rendered via <SectionLabel>."},children:{required:!0,tsType:{name:"ReactNode"},description:"Body of the section — usually a stack of fields."},className:{required:!1,tsType:{name:"string"},description:"Optional class on the outer wrapper."},surfaceClassName:{required:!1,tsType:{name:"string"},description:"Optional class on the inner Surface (e.g. override padding)."}}};const T={title:"UI/Surfaces/SettingsSection",component:s,args:{title:"Info"}},o={args:{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Module ID",value:"m_abc123",mono:!0,copyable:!0}),e.jsx(a,{label:"Created",value:"May 4, 2026"})]})}},r={render:()=>e.jsxs("div",{className:"space-y-6 max-w-md",children:[e.jsxs("div",{children:[e.jsx(n,{className:"mb-2 text-warning",children:"Advanced"}),e.jsx("div",{className:"space-y-2",children:e.jsx(t,{tone:"warning",title:"Developer mode",description:"Show the developer rail.",className:"px-6 py-4",control:e.jsx(m,{checked:!0,onChange:()=>{},color:"warning","aria-label":"developer"})})})]}),e.jsxs("div",{children:[e.jsx(n,{className:"mb-2 text-error",children:"Danger zone"}),e.jsx("div",{className:"space-y-2",children:e.jsx(t,{tone:"error",title:"Delete module",description:"Permanently delete. Cannot be undone.",className:"px-6 py-4",control:e.jsx(p,{color:"error",variant:"filled",size:"sm",children:"Delete"})})})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="space-y-4">
        <ReadOnlyField label="Module ID" value="m_abc123" mono copyable />
        <ReadOnlyField label="Created" value="May 4, 2026" />
      </div>
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
Surface. Shown here for contrast with the boxed sections above.`,...r.parameters?.docs?.description}}};const L=["Playground","ToneColouredGroupsAreNotSettingsSection"];export{o as Playground,r as ToneColouredGroupsAreNotSettingsSection,L as __namedExportsOrder,T as default};
