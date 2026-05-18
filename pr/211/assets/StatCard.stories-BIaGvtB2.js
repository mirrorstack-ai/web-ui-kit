import{j as e}from"./iframe-DfdTJrlk.js";import{c as m}from"./cn-IyxL_b2c.js";import{C as p}from"./Card-B8Dzm8Fs.js";import{I as u}from"./Icon-eMPNHyzD.js";import"./preload-helper-PPVm8Dsz.js";import"./Surface-mHnSymtJ.js";function a({icon:o,label:i,value:c,className:d}){return e.jsx(p,{className:d,children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(u,{name:o,size:20,className:"text-primary shrink-0"}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-xs text-on-surface-variant",children:i}),e.jsx("p",{className:m("text-sm font-medium text-on-surface",typeof c=="string"&&"truncate"),children:c})]})]})})}a.__docgenInfo={description:"",methods:[],displayName:"StatCard",props:{icon:{required:!0,tsType:{name:"string"},description:"Material symbol icon name."},label:{required:!0,tsType:{name:"string"},description:'Short label shown above the value (e.g. \\"Installs\\").'},value:{required:!0,tsType:{name:"ReactNode"},description:"The headline value."},className:{required:!1,tsType:{name:"string"},description:""}}};const h={title:"UI/Data/StatCard",component:a,decorators:[o=>e.jsx("div",{className:"w-full max-w-sm bg-background p-6",children:e.jsx(o,{})})],args:{icon:"apps",label:"Installs",value:"1,284"}},s={},r={args:{icon:"apps",label:"Installs",value:"12,840"}},t={args:{icon:"new_releases",label:"Latest version",value:"v0.4.0-beta.1"}},n={args:{icon:"calendar_today",label:"Created",value:"May 6, 2026"}},l={render:()=>e.jsxs("div",{className:"w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3",children:[e.jsx(a,{icon:"apps",label:"Installs",value:"1,284"}),e.jsx(a,{icon:"new_releases",label:"Latest version",value:"v0.4.0"}),e.jsx(a,{icon:"calendar_today",label:"Created",value:"May 6, 2026"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "apps",
    label: "Installs",
    value: "12,840"
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "new_releases",
    label: "Latest version",
    value: "v0.4.0-beta.1"
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "calendar_today",
    label: "Created",
    value: "May 6, 2026"
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
      <StatCard icon="apps" label="Installs" value="1,284" />
      <StatCard icon="new_releases" label="Latest version" value="v0.4.0" />
      <StatCard icon="calendar_today" label="Created" value="May 6, 2026" />
    </div>
}`,...l.parameters?.docs?.source}}};const j=["Playground","NumericValue","VersionLabel","DateValue","OverviewGrid"];export{n as DateValue,r as NumericValue,l as OverviewGrid,s as Playground,t as VersionLabel,j as __namedExportsOrder,h as default};
