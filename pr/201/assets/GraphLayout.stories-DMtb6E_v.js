import{j as e,r as i}from"./iframe-Cak_jk81.js";import{c as S}from"./cn-IyxL_b2c.js";import{G as x}from"./GraphAction-BG_Ze9wK.js";import{G as b}from"./GraphSideHeader-BUb4fY_8.js";import{G as j}from"./GraphSideContent-C4wQJtTk.js";import{G as w}from"./GraphSideSetting-Cp8D6JdA.js";import{G as R}from"./GraphSideGroup-BE1ThVGg.js";import{G as v}from"./Graph-BHKyHDat.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-D745WDKM.js";import"./Progress-Cr11j1cr.js";import"./Icon-DwuL-RTI.js";import"./button-styles-BPC6xbbG.js";import"./Badge-COY3abA7.js";import"./styles-B5wKabRy.js";import"./Switch-CAf8uo2D.js";import"./Button-BC_Vk1t8.js";const T=6;function p({canvas:t,action:s,side:r,sideOpen:o,sideWidth:n=260,className:a}){return e.jsxs("div",{className:S("relative w-full h-full",a),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:o?n+T:0},children:t}),r]}),s&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:s})]})}p.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function g({node:t,open:s,onClose:r,renderDetails:o,width:n=260,className:a}){const u=i.useRef(t);t&&(u.current=t);const h=t??u.current,f=s??!!t;return e.jsxs("div",{className:S("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",f?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",a),style:{width:n},"aria-hidden":!f,children:[e.jsx(b,{node:h,onClose:r}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:f&&h?o(h):null})]})}g.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const M={title:"Layout/Graph",component:p,decorators:[t=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(t,{})})]},y={id:"settings",label:"Graph settings"},m=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],G=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],N={user:{summary:"The root identity. Pinned at the center of the graph."},account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},projectify:{summary:"Project tracking module."},crm:{summary:"Customer relationships and outreach."},daily:{summary:"Daily journal — notes, mood, reflections."},balance:{summary:"Finances, ledger, statements."},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12"},ledger:{summary:"Double-entry ledger powering Balance."},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14"}},d={render:()=>{const t=i.useRef(null),[s,r]=i.useState(null),o=s?m.find(n=>n.id===s)??null:null;return e.jsx(p,{sideOpen:!!o,canvas:e.jsx(v,{ref:t,nodes:m,edges:G,selectedId:s??void 0,onNodeClick:n=>r(n),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(x,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit()}),side:e.jsx(g,{node:o,onClose:()=>r(null),renderDetails:n=>{const a=N[n.id];return a?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},l={render:()=>{const t=i.useRef(null),[s,r]=i.useState(null),o=s?.type==="node"?m.find(n=>n.id===s.id)??null:s?.type==="settings"?y:null;return e.jsx(p,{sideOpen:!!o,canvas:e.jsx(v,{ref:t,nodes:m,edges:G,selectedId:s?.type==="node"?s.id:void 0,onNodeClick:n=>r({type:"node",id:n}),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(x,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit(),onSettings:()=>r(n=>n?.type==="settings"?null:{type:"settings"})}),side:e.jsx(g,{node:o,onClose:()=>r(null),renderDetails:n=>{if(n.id===y.id)return e.jsxs("div",{className:"flex flex-col gap-3 p-3 text-sm text-on-surface",children:[e.jsx("p",{children:"Graph-level settings live here."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Toggled via the settings toolbar button."})]});const a=N[n.id];return a?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},c={render:()=>{const[t,s]=i.useState(!1),[r,o]=i.useState([{id:"core",name:"openclaude",color:"#f4a8a8"},{id:"memory",name:"memory system brain",color:"#a8d8a8"},{id:"wss",name:"wss tunnel",color:"#cbb6e5"},{id:"mcp",name:"mcp",color:"#f5c14a"},{id:"stripe",name:"stripe",color:"#8db8e8"}]),[n,a]=i.useState({nodeSize:8,lineSize:1,showTags:!0});return e.jsx(p,{sideOpen:t,action:e.jsx(x,{onReplay:()=>{},onFit:()=>{},onSettings:()=>s(u=>!u)}),side:e.jsx(g,{node:t?y:null,onClose:()=>s(!1),renderDetails:()=>e.jsx(j,{items:[{id:"groups",title:"Groups",body:e.jsx(R,{groups:r,onChange:o})},{id:"settings",title:"Settings",body:e.jsx(w,{value:n,onChange:a})}]})})})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = selectedId ? GRAPH_NODES.find(n => n.id === selectedId) ?? null : null;
    return <GraphLayout sideOpen={Boolean(selected)} canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={selectedId ?? undefined} onNodeClick={id => setSelectedId(id)} className="border-0 bg-transparent rounded-none" />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} />} side={<GraphSide node={selected} onClose={() => setSelectedId(null)} renderDetails={n => {
      const d = NODE_DETAILS[n.id];
      return d ? <div className="flex flex-col gap-3 p-3">
                  <p className="text-sm text-on-surface">{d.summary}</p>
                  {d.lastSeen && <div className="text-xs text-on-surface-variant">
                      Last activity: {d.lastSeen}
                    </div>}
                </div> : <p className="p-3 text-sm text-on-surface-variant">
                  No details for this node.
                </p>;
    }} />} />;
  }
}`,...d.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [view, setView] = useState<SideView>(null);
    const sideNode: GraphSideNode | null = view?.type === "node" ? GRAPH_NODES.find(n => n.id === view.id) ?? null : view?.type === "settings" ? SETTINGS_NODE : null;
    return <GraphLayout sideOpen={Boolean(sideNode)} canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={view?.type === "node" ? view.id : undefined} onNodeClick={id => setView({
      type: "node",
      id
    })} className="border-0 bg-transparent rounded-none" />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} onSettings={() => setView(v => v?.type === "settings" ? null : {
      type: "settings"
    })} />} side={<GraphSide node={sideNode} onClose={() => setView(null)} renderDetails={n => {
      if (n.id === SETTINGS_NODE.id) {
        return <div className="flex flex-col gap-3 p-3 text-sm text-on-surface">
                    <p>Graph-level settings live here.</p>
                    <p className="text-on-surface-variant text-xs">
                      Toggled via the settings toolbar button.
                    </p>
                  </div>;
      }
      const d = NODE_DETAILS[n.id];
      return d ? <div className="flex flex-col gap-3 p-3">
                  <p className="text-sm text-on-surface">{d.summary}</p>
                  {d.lastSeen && <div className="text-xs text-on-surface-variant">
                      Last activity: {d.lastSeen}
                    </div>}
                </div> : <p className="p-3 text-sm text-on-surface-variant">
                  No details for this node.
                </p>;
    }} />} />;
  }
}`,...l.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Latest interaction wins.`,...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    return <GraphLayout sideOpen={open} action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <GraphSideContent items={[{
      id: "groups",
      title: "Groups",
      body: <GraphSideGroup groups={groups} onChange={setGroups} />
    }, {
      id: "settings",
      title: "Settings",
      body: <GraphSideSetting value={setting} onChange={setSetting} />
    }]} />} />} />;
  }
}`,...c.parameters?.docs?.source},description:{story:`Click the settings (last) icon button to toggle the side panel open.
The panel body composes GraphSideContent → GraphSideGroup +
GraphSideSetting so consumers see the real configuration UX.`,...c.parameters?.docs?.description}}};const U=["WithGraph","WithGraphAndSettings","SettingsTogglesSide"];export{c as SettingsTogglesSide,d as WithGraph,l as WithGraphAndSettings,U as __namedExportsOrder,M as default};
