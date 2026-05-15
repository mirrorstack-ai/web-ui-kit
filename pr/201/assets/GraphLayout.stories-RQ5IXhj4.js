import{j as e,r as d}from"./iframe-C2CSOxki.js";import{c as S}from"./cn-IyxL_b2c.js";import{G as x}from"./GraphAction-CP7qNVnk.js";import{G as v}from"./GraphSideHeader-6EPdRH37.js";import{G as w}from"./GraphSideContent-D9huTwCi.js";import{G as j}from"./GraphSideSetting-QczdPPM0.js";import{G as R}from"./GraphSideGroup-DepK_aSL.js";import{G}from"./Graph-DmtT4bJ-.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-BoOmYr94.js";import"./Progress-DcbOgXt5.js";import"./Icon-_fPL9PB8.js";import"./button-styles-BPC6xbbG.js";import"./Badge-DaogZho2.js";import"./styles-B5wKabRy.js";import"./Switch-DDZyWsiw.js";import"./Slider-WQ4wqPby.js";import"./Button-BnY7N__v.js";const D=6;function g({canvas:n,action:s,side:i,sideOpen:o,sideWidth:r=260,className:t}){return e.jsxs("div",{className:S("relative w-full h-full",t),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:o?r+D:0},children:n}),i]}),s&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:s})]})}g.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function f({node:n,open:s,onClose:i,renderDetails:o,width:r=260,className:t}){const u=d.useRef(n);n&&(u.current=n);const l=n??u.current,a=s??!!n;return e.jsxs("div",{className:S("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",a?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",t),style:{width:r},"aria-hidden":!a,children:[e.jsx(v,{node:l,onClose:i}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:a&&l?o(l):null})]})}f.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const J={title:"Layout/Graph",component:g,decorators:[n=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(n,{})})]},y={id:"settings",label:"Graph settings"},h=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],N=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],b={user:{summary:"The root identity. Pinned at the center of the graph."},account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},projectify:{summary:"Project tracking module."},crm:{summary:"Customer relationships and outreach."},daily:{summary:"Daily journal — notes, mood, reflections."},balance:{summary:"Finances, ledger, statements."},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12"},ledger:{summary:"Double-entry ledger powering Balance."},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14"}},c={render:()=>{const n=d.useRef(null),[s,i]=d.useState(null),o=s?h.find(r=>r.id===s)??null:null;return e.jsx(g,{sideOpen:!!o,canvas:e.jsx(G,{ref:n,nodes:h,edges:N,selectedId:s??void 0,onNodeClick:r=>i(r),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(x,{onReplay:()=>n.current?.replay(),onFit:()=>n.current?.fit()}),side:e.jsx(f,{node:o,onClose:()=>i(null),renderDetails:r=>{const t=b[r.id];return t?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:t.summary}),t.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",t.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},p={render:()=>{const n=d.useRef(null),[s,i]=d.useState(null),[o,r]=d.useState([{id:"core",name:"openclaude",color:"#f4a8a8"},{id:"memory",name:"memory system brain",color:"#a8d8a8"},{id:"wss",name:"wss tunnel",color:"#cbb6e5"},{id:"mcp",name:"mcp",color:"#f5c14a"},{id:"stripe",name:"stripe",color:"#8db8e8"}]),[t,u]=d.useState({nodeSize:1,lineSize:1,showLabels:!0,repulsion:1500,linkDistance:70}),l=s?.type==="node"?h.find(a=>a.id===s.id)??null:s?.type==="settings"?y:null;return e.jsx(g,{sideOpen:!!l,canvas:e.jsx(G,{ref:n,nodes:h,edges:N,selectedId:s?.type==="node"?s.id:void 0,onNodeClick:a=>i({type:"node",id:a}),nodeSize:t.nodeSize,lineSize:t.lineSize,showLabels:t.showLabels,repulsion:t.repulsion,linkDistance:t.linkDistance,className:"border-0 bg-transparent rounded-none"}),action:e.jsx(x,{onReplay:()=>n.current?.replay(),onFit:()=>n.current?.fit(),onSettings:()=>i(a=>a?.type==="settings"?null:{type:"settings"})}),side:e.jsx(f,{node:l,onClose:()=>i(null),renderDetails:a=>{if(a.id===y.id)return e.jsx(w,{items:[{id:"groups",title:"Groups",body:e.jsx(R,{groups:o,onChange:r})},{id:"settings",title:"Settings",body:e.jsx(j,{value:t,onChange:u})}]});const m=b[a.id];return m?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:m.summary}),m.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",m.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [view, setView] = useState<SideView>(null);
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
      nodeSize: 1,
      lineSize: 1,
      showLabels: true,
      repulsion: 1500,
      linkDistance: 70
    });
    const sideNode: GraphSideNode | null = view?.type === "node" ? GRAPH_NODES.find(n => n.id === view.id) ?? null : view?.type === "settings" ? SETTINGS_NODE : null;
    return <GraphLayout sideOpen={Boolean(sideNode)} canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={view?.type === "node" ? view.id : undefined} onNodeClick={id => setView({
      type: "node",
      id
    })} nodeSize={setting.nodeSize} lineSize={setting.lineSize} showLabels={setting.showLabels} repulsion={setting.repulsion} linkDistance={setting.linkDistance} className="border-0 bg-transparent rounded-none" />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} onSettings={() => setView(v => v?.type === "settings" ? null : {
      type: "settings"
    })} />} side={<GraphSide node={sideNode} onClose={() => setView(null)} renderDetails={n => {
      if (n.id === SETTINGS_NODE.id) {
        return <GraphSideContent items={[{
          id: "groups",
          title: "Groups",
          body: <GraphSideGroup groups={groups} onChange={setGroups} />
        }, {
          id: "settings",
          title: "Settings",
          body: <GraphSideSetting value={setting} onChange={setSetting} />
        }]} />;
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
}`,...p.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Node clicks show details; settings opens a
GraphSideContent panel composing GraphSideGroup + GraphSideSetting.
Latest interaction wins.`,...p.parameters?.docs?.description}}};const K=["WithGraph","WithGraphAndSettings"];export{c as WithGraph,p as WithGraphAndSettings,K as __namedExportsOrder,J as default};
