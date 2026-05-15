import{j as e,r as a}from"./iframe-sbBRX25q.js";import{c as m}from"./cn-IyxL_b2c.js";import{G as h}from"./GraphAction-Oea8USpj.js";import{G as f}from"./GraphSideHeader-CxmyltzE.js";import{G as S}from"./GraphSideContent-DClIBgb_.js";import{G as y}from"./GraphSideSetting-CIm_AgaU.js";import{G}from"./GraphSideGroup-CjBdxzQr.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-C_NlOucf.js";import"./Progress-E7b9bIwO.js";import"./Icon-BdxoKY3d.js";import"./button-styles-DvQkePbc.js";import"./Badge-C2UVSWrv.js";import"./styles-B5wKabRy.js";import"./Switch-DUKm32Hg.js";import"./Button-CaMQjxiu.js";function u({canvas:n,action:t,side:s,className:r}){return e.jsxs("div",{className:m("relative w-full h-full",r),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[n,s]}),t&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:t})]})}u.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},className:{required:!1,tsType:{name:"string"},description:""}}};function g({node:n,open:t,onClose:s,renderDetails:r,width:d=260,className:p}){const i=a.useRef(n);n&&(i.current=n);const l=n??i.current,c=t??!!n;return e.jsxs("div",{className:m("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",c?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",p),style:{width:d},"aria-hidden":!c,children:[e.jsx(f,{node:l,onClose:s}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:c&&l?r(l):null})]})}g.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const F={title:"Layout/Graph",component:u,decorators:[n=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(n,{})})]},x={id:"settings",label:"Graph settings"},o={render:()=>{const[n,t]=a.useState(!1),[s,r]=a.useState([{id:"core",name:"openclaude",color:"#f4a8a8"},{id:"memory",name:"memory system brain",color:"#a8d8a8"},{id:"wss",name:"wss tunnel",color:"#cbb6e5"},{id:"mcp",name:"mcp",color:"#f5c14a"},{id:"stripe",name:"stripe",color:"#8db8e8"}]),[d,p]=a.useState({nodeSize:8,lineSize:1,showTags:!0});return e.jsx(u,{action:e.jsx(h,{onReplay:()=>{},onFit:()=>{},onSettings:()=>t(i=>!i)}),side:e.jsx(g,{node:n?x:null,onClose:()=>t(!1),renderDetails:()=>e.jsx(S,{items:[{id:"groups",title:"Groups",body:e.jsx(G,{groups:s,onChange:r})},{id:"settings",title:"Settings",body:e.jsx(y,{value:d,onChange:p})}]})})})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState<GraphSideGroupItem[]>([{
      id: "core",
      name: "openclaude",
      color: "#f4a8a8"
    }, {
      id: "memory",
      name: "memory system brain",
      color: "#a8d8a8"
    }, {
      id: "wss",
      name: "wss tunnel",
      color: "#cbb6e5"
    }, {
      id: "mcp",
      name: "mcp",
      color: "#f5c14a"
    }, {
      id: "stripe",
      name: "stripe",
      color: "#8db8e8"
    }]);
    const [setting, setSetting] = useState<GraphSideSettingValue>({
      nodeSize: 8,
      lineSize: 1,
      showTags: true
    });
    return <GraphLayout action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <GraphSideContent items={[{
      id: "groups",
      title: "Groups",
      body: <GraphSideGroup groups={groups} onChange={setGroups} />
    }, {
      id: "settings",
      title: "Settings",
      body: <GraphSideSetting value={setting} onChange={setSetting} />
    }]} />} />} />;
  }
}`,...o.parameters?.docs?.source},description:{story:`Click the settings (last) icon button to toggle the side panel open.
The panel body composes GraphSideContent → GraphSideGroup +
GraphSideSetting so consumers see the real configuration UX.`,...o.parameters?.docs?.description}}};const A=["SettingsTogglesSide"];export{o as SettingsTogglesSide,A as __namedExportsOrder,F as default};
