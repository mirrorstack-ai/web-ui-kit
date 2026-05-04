import{j as e}from"./iframe-Bsint3RJ.js";import{R as a}from"./ReadOnlyField-CzCpT2js.js";import{t as g,S as l}from"./SettingRow-Dn5YX1Yq.js";import{B as c}from"./Button-dUa3YAa2.js";import{c as i}from"./cn-IyxL_b2c.js";import{S}from"./SectionLabel-Dcriv5Ov.js";import{S as f}from"./Surface-DZ_AMBz1.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-C_BnMdG0.js";import"./Progress-CPzL2Uts.js";import"./Icon-BRNATGYN.js";import"./button-styles-DvQkePbc.js";function r({title:d,tone:s,children:m,className:p,surfaceClassName:u}){return e.jsxs("section",{className:p,children:[e.jsx(S,{className:i("mb-2",s&&g[s]),children:d}),e.jsx(f,{className:i("p-6",u),children:m})]})}r.__docgenInfo={description:"",methods:[],displayName:"SettingsSection",props:{title:{required:!0,tsType:{name:"ReactNode"},description:"Section heading text. Rendered via <SectionLabel>."},tone:{required:!1,tsType:{name:"Tone"},description:'Theme color for the title (e.g. "error" for danger zones).'},children:{required:!0,tsType:{name:"ReactNode"},description:"Body of the section — usually a stack of fields."},className:{required:!1,tsType:{name:"string"},description:"Optional class on the outer wrapper."},surfaceClassName:{required:!1,tsType:{name:"string"},description:"Optional class on the inner Surface. Use to override padding for special cases."}}};const z={title:"UI/Surfaces/SettingsSection",component:r,args:{title:"Info"}},t={args:{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Module ID",value:"m_abc123",mono:!0,copyable:!0}),e.jsx(a,{label:"Created",value:"May 4, 2026"})]})}},n={render:()=>e.jsxs("div",{className:"space-y-4 max-w-md",children:[e.jsx(r,{title:"Info",children:e.jsx(a,{label:"Module ID",value:"m_abc",mono:!0})}),e.jsx(r,{title:"Advanced",tone:"warning",children:e.jsx(a,{label:"Beta program",value:"Enabled"})}),e.jsx(r,{title:"Danger zone",tone:"error",children:e.jsx(l,{tone:"error",title:"Delete module",description:"Permanently delete. Cannot be undone.",control:e.jsx(c,{color:"error",variant:"filled",size:"sm",children:"Delete"})})})]})},o={args:{title:"Danger zone",tone:"error",surfaceClassName:"px-6 py-4",children:e.jsx(l,{tone:"error",title:"Delete account",description:"Sign out and put your account in a suspended state.",control:e.jsx(c,{color:"error",variant:"filled",size:"sm",children:"Disable"})})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="space-y-4">
        <ReadOnlyField label="Module ID" value="m_abc123" mono copyable />
        <ReadOnlyField label="Created" value="May 4, 2026" />
      </div>
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 max-w-md">
      <SettingsSection title="Info">
        <ReadOnlyField label="Module ID" value="m_abc" mono />
      </SettingsSection>
      <SettingsSection title="Advanced" tone="warning">
        <ReadOnlyField label="Beta program" value="Enabled" />
      </SettingsSection>
      <SettingsSection title="Danger zone" tone="error">
        <SettingRow tone="error" title="Delete module" description="Permanently delete. Cannot be undone." control={<Button color="error" variant="filled" size="sm">
              Delete
            </Button>} />
      </SettingsSection>
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Danger zone",
    tone: "error",
    surfaceClassName: "px-6 py-4",
    children: <SettingRow tone="error" title="Delete account" description="Sign out and put your account in a suspended state." control={<Button color="error" variant="filled" size="sm">
            Disable
          </Button>} />
  }
}`,...o.parameters?.docs?.source}}};const B=["Playground","Tones","SurfaceClassNameOverride"];export{t as Playground,o as SurfaceClassNameOverride,n as Tones,B as __namedExportsOrder,z as default};
