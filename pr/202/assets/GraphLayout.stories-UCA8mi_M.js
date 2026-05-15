import{j as e,r as d}from"./iframe-ClBJBPCk.js";import{c as G}from"./cn-IyxL_b2c.js";import{G as N}from"./GraphAction-EKnrJFVO.js";import{G as j}from"./GraphSideHeader-D37X-tkU.js";import{G as R}from"./GraphSideContent-CXzF3Ion.js";import{G as D}from"./GraphSideSetting-CHo1qWj9.js";import{G as E}from"./GraphSideGroup-Dhiv2RGz.js";import{G as T}from"./GraphSideSearch-CBvN-Wm-.js";import{G as b}from"./Graph-BA78EThg.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-B551AoFr.js";import"./Progress-CdvQc8oG.js";import"./Icon-Dh5MlzHH.js";import"./button-styles-BPC6xbbG.js";import"./Badge-D6RRCWxQ.js";import"./styles-B5wKabRy.js";import"./Switch-WhHMq3HV.js";import"./Slider-CYheoCFN.js";import"./Button-BLBBC4xp.js";import"./FloatingLabelInput-DanBti9M.js";const I=6;function f({canvas:t,action:s,side:r,sideOpen:i,sideWidth:a=260,className:n}){return e.jsxs("div",{className:G("relative w-full h-full",n),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:i?a+I:0},children:t}),r]}),s&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:s})]})}f.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function y({node:t,open:s,onClose:r,renderDetails:i,width:a=260,className:n}){const m=d.useRef(t);t&&(m.current=t);const l=t??m.current,c=s??!!t;return e.jsxs("div",{className:G("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",c?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",n),style:{width:a},"aria-hidden":!c,children:[e.jsx(j,{node:l,onClose:r}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:c&&l?i(l):null})]})}y.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Y={title:"Layout/Graph",component:f,decorators:[t=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(t,{})})]},x={id:"settings",label:"Graph settings"},g=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],v=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],w={user:{summary:"The root identity. Pinned at the center of the graph."},account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},projectify:{summary:"Project tracking module."},crm:{summary:"Customer relationships and outreach."},daily:{summary:"Daily journal — notes, mood, reflections."},balance:{summary:"Finances, ledger, statements."},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12"},ledger:{summary:"Double-entry ledger powering Balance."},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14"}},p={render:()=>{const t=d.useRef(null),[s,r]=d.useState(null),i=s?g.find(a=>a.id===s)??null:null;return e.jsx(f,{sideOpen:!!i,canvas:e.jsx(b,{ref:t,nodes:g,edges:v,selectedId:s??void 0,onNodeClick:a=>r(a),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(N,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit()}),side:e.jsx(y,{node:i,onClose:()=>r(null),renderDetails:a=>{const n=w[a.id];return n?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:n.summary}),n.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",n.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},u={render:()=>{const t=d.useRef(null),[s,r]=d.useState(null),[i,a]=d.useState([{id:"core",name:"openclaude",color:"#f4a8a8"},{id:"memory",name:"memory system brain",color:"#a8d8a8"},{id:"wss",name:"wss tunnel",color:"#cbb6e5"},{id:"mcp",name:"mcp",color:"#f5c14a"},{id:"stripe",name:"stripe",color:"#8db8e8"}]),[n,m]=d.useState({nodeSize:1,lineSize:1,showLabels:!0,repulsion:1500,linkDistance:70}),[l,c]=d.useState(""),S=s?.type==="node"?g.find(o=>o.id===s.id)??null:s?.type==="settings"?x:null;return e.jsx(f,{sideOpen:!!S,canvas:e.jsx(b,{ref:t,nodes:g,edges:v,selectedId:s?.type==="node"?s.id:void 0,onNodeClick:o=>r({type:"node",id:o}),nodeSize:n.nodeSize,lineSize:n.lineSize,showLabels:n.showLabels,repulsion:n.repulsion,linkDistance:n.linkDistance,className:"border-0 bg-transparent rounded-none"}),action:e.jsx(N,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit(),onSettings:()=>r(o=>o?.type==="settings"?null:{type:"settings"})}),side:e.jsx(y,{node:S,onClose:()=>r(null),renderDetails:o=>{if(o.id===x.id)return e.jsx(R,{prepend:e.jsx(T,{value:l,onChange:c}),items:[{id:"groups",title:"Groups",body:e.jsx(E,{groups:i,onChange:a})},{id:"settings",title:"Settings",body:e.jsx(D,{value:n,onChange:m})}]});const h=w[o.id];return h?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:h.summary}),h.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",h.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...p.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
    const [search, setSearch] = useState("");
    const sideNode: GraphSideNode | null = view?.type === "node" ? GRAPH_NODES.find(n => n.id === view.id) ?? null : view?.type === "settings" ? SETTINGS_NODE : null;
    return <GraphLayout sideOpen={Boolean(sideNode)} canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={view?.type === "node" ? view.id : undefined} onNodeClick={id => setView({
      type: "node",
      id
    })} nodeSize={setting.nodeSize} lineSize={setting.lineSize} showLabels={setting.showLabels} repulsion={setting.repulsion} linkDistance={setting.linkDistance} className="border-0 bg-transparent rounded-none" />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} onSettings={() => setView(v => v?.type === "settings" ? null : {
      type: "settings"
    })} />} side={<GraphSide node={sideNode} onClose={() => setView(null)} renderDetails={n => {
      if (n.id === SETTINGS_NODE.id) {
        return <GraphSideContent prepend={<GraphSideSearch value={search} onChange={setSearch} />} items={[{
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
}`,...u.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Node clicks show details; settings opens a
GraphSideContent panel composing GraphSideGroup + GraphSideSetting.
Latest interaction wins.`,...u.parameters?.docs?.description}}};const Z=["WithGraph","WithGraphAndSettings"];export{p as WithGraph,u as WithGraphAndSettings,Z as __namedExportsOrder,Y as default};
