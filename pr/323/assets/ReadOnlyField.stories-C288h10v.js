import{j as i}from"./iframe-ChU1ZLBU.js";import{R as c}from"./ReadOnlyField-CHkHU8Z9.js";import{B as u}from"./Badge-CJcDER3t.js";import{I as p}from"./Icon-BT0-E82e.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-C7iAv4nc.js";import"./Progress-0Rs_19Q3.js";import"./button-styles-CZHSjrxJ.js";const I={title:"UI/Data/ReadOnlyField",component:c,args:{label:"Email",value:"user@example.com"},argTypes:{mono:{control:"boolean"},copyable:{control:"boolean"},layout:{control:"select",options:["stacked","inline"]}}},o={},n={args:{label:"API Key",value:"sk-1234567890abcdef",mono:!0,copyable:!0}},t={args:{label:"Status",value:"Deployed",suffix:i.jsx(u,{variant:"success",size:"sm",children:"Live"})}},l={args:{label:"Module ID",value:"oauth-core-v2",mono:!0}},e={args:{label:"Published by",value:"@i-am-nothing",mono:!0,layout:"inline"}},a={args:{label:"API key",value:"sk-live-1234567890abcdef",mono:!0,copyable:!0,layout:"inline"}},r={args:{label:"Status",value:"Connected",prefix:i.jsx("span",{className:"size-2 rounded-full bg-success"})}},s={args:{label:"Region",value:"us-east-1",mono:!0,layout:"inline",prefix:i.jsx(p,{name:"public",size:16,className:"text-on-surface-variant"})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "API Key",
    value: "sk-1234567890abcdef",
    mono: true,
    copyable: true
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Status",
    value: "Deployed",
    suffix: <Badge variant="success" size="sm">Live</Badge>
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Module ID",
    value: "oauth-core-v2",
    mono: true
  }
}`,...l.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Published by",
    value: "@i-am-nothing",
    mono: true,
    layout: "inline"
  }
}`,...e.parameters?.docs?.source},description:{story:'`layout="inline"` puts the label on the left and the value on the right\nof the same row — useful for footer-style label/value pairs where\nvertical space matters.',...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "API key",
    value: "sk-live-1234567890abcdef",
    mono: true,
    copyable: true,
    layout: "inline"
  }
}`,...a.parameters?.docs?.source},description:{story:"Inline + copyable + suffix all compose. The shared `valueRow` makes\nsure these work identically in both layouts.",...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Status",
    value: "Connected",
    prefix: <span className="size-2 rounded-full bg-success" />
  }
}`,...r.parameters?.docs?.source},description:{story:"`prefix` is rendered before the value — useful for a leading icon or\nstatus dot.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Region",
    value: "us-east-1",
    mono: true,
    layout: "inline",
    prefix: <Icon name="public" size={16} className="text-on-surface-variant" />
  }
}`,...s.parameters?.docs?.source},description:{story:"`prefix` also works in the inline layout.",...s.parameters?.docs?.description}}};const S=["Playground","Copyable","WithSuffix","Mono","Inline","InlineWithCopy","WithPrefix","InlineWithPrefix"];export{n as Copyable,e as Inline,a as InlineWithCopy,s as InlineWithPrefix,l as Mono,o as Playground,r as WithPrefix,t as WithSuffix,S as __namedExportsOrder,I as default};
