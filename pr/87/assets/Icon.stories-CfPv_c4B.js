import{j as e}from"./iframe-CmtT_Rjn.js";import{c as l}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";function s({name:a,size:c=24,className:m,"aria-label":t}){return e.jsx("span",{className:l("material-symbols-rounded select-none shrink-0",m),style:{fontSize:c},"aria-hidden":t?void 0:!0,"aria-label":t,role:t?"img":void 0,children:a})}s.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{name:{required:!0,tsType:{name:"string"},description:'Material Symbols Rounded icon name (e.g. "edit", "delete", "settings")'},size:{required:!1,tsType:{name:"number"},description:"Icon size in pixels",defaultValue:{value:"24",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label. If omitted, icon is decorative (aria-hidden)."}}};const u={title:"UI/Media/Icon",component:s,args:{name:"edit",size:24},argTypes:{name:{control:"text"},size:{control:{type:"range",min:16,max:48,step:4}}}},n={},r={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{name:"home",size:16}),e.jsx(s,{name:"home",size:20}),e.jsx(s,{name:"home",size:24}),e.jsx(s,{name:"home",size:32}),e.jsx(s,{name:"home",size:40}),e.jsx(s,{name:"home",size:48})]})},i={render:()=>e.jsx("div",{className:"flex flex-wrap items-center gap-4",children:["home","settings","edit","delete","search","close","check","add","person","lock","visibility","dark_mode","light_mode","key","passkey","security"].map(a=>e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx(s,{name:a,size:24}),e.jsx("span",{className:"text-xs text-on-surface-variant",children:a})]},a))})},o={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{name:"check_circle",size:24,className:"text-success"}),e.jsx(s,{name:"error",size:24,className:"text-error"}),e.jsx(s,{name:"warning",size:24,className:"text-warning"}),e.jsx(s,{name:"info",size:24,className:"text-primary"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Icon name="home" size={16} />
      <Icon name="home" size={20} />
      <Icon name="home" size={24} />
      <Icon name="home" size={32} />
      <Icon name="home" size={40} />
      <Icon name="home" size={48} />
    </div>
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      {["home", "settings", "edit", "delete", "search", "close", "check", "add", "person", "lock", "visibility", "dark_mode", "light_mode", "key", "passkey", "security"].map(name => <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <span className="text-xs text-on-surface-variant">{name}</span>
        </div>)}
    </div>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Icon name="check_circle" size={24} className="text-success" />
      <Icon name="error" size={24} className="text-error" />
      <Icon name="warning" size={24} className="text-warning" />
      <Icon name="info" size={24} className="text-primary" />
    </div>
}`,...o.parameters?.docs?.source}}};const h=["Playground","Sizes","CommonIcons","WithColor"];export{i as CommonIcons,n as Playground,r as Sizes,o as WithColor,h as __namedExportsOrder,u as default};
