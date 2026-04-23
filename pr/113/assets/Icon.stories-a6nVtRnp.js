import{j as e}from"./iframe-dLmrhNHS.js";import{I as s}from"./Icon-DyK5obnT.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";const d={title:"UI/Media/Icon",component:s,args:{name:"edit",size:24},argTypes:{name:{control:"text"},size:{control:{type:"range",min:16,max:48,step:4}}}},a={},r={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{name:"home",size:16}),e.jsx(s,{name:"home",size:20}),e.jsx(s,{name:"home",size:24}),e.jsx(s,{name:"home",size:32}),e.jsx(s,{name:"home",size:40}),e.jsx(s,{name:"home",size:48})]})},n={render:()=>e.jsx("div",{className:"flex flex-wrap items-center gap-4",children:["home","settings","edit","delete","search","close","check","add","person","lock","visibility","dark_mode","light_mode","key","passkey","security"].map(c=>e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx(s,{name:c,size:24}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:c})]},c))})},o={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{name:"check_circle",size:24,className:"text-success"}),e.jsx(s,{name:"error",size:24,className:"text-error"}),e.jsx(s,{name:"warning",size:24,className:"text-warning"}),e.jsx(s,{name:"info",size:24,className:"text-primary"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Icon name="home" size={16} />
      <Icon name="home" size={20} />
      <Icon name="home" size={24} />
      <Icon name="home" size={32} />
      <Icon name="home" size={40} />
      <Icon name="home" size={48} />
    </div>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      {["home", "settings", "edit", "delete", "search", "close", "check", "add", "person", "lock", "visibility", "dark_mode", "light_mode", "key", "passkey", "security"].map(name => <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <span className="text-xs text-on-surface-variant">{name}</span>
        </div>)}
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Icon name="check_circle" size={24} className="text-success" />
      <Icon name="error" size={24} className="text-error" />
      <Icon name="warning" size={24} className="text-warning" />
      <Icon name="info" size={24} className="text-primary" />
    </div>
}`,...o.parameters?.docs?.source}}};const p=["Playground","Sizes","CommonIcons","WithColor"];export{n as CommonIcons,a as Playground,r as Sizes,o as WithColor,p as __namedExportsOrder,d as default};
