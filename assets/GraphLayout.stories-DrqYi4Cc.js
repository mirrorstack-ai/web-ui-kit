import{j as e,r as d}from"./iframe-Dvqej4ow.js";import{c as x}from"./cn-IyxL_b2c.js";import{G}from"./GraphAction-Bl4V34dI.js";import{G as R}from"./GraphSideHeader-2PiyT1PQ.js";import{G as N}from"./GraphSideContent-ft0Xl5NF.js";import{G as D}from"./GraphSideSetting-DYpNCwA5.js";import{G as k}from"./GraphSideGroup-x-gyFld2.js";import{G as E}from"./GraphSideSearch-Dz7Hg_o3.js";import{G as C}from"./GraphSideNodeSummary-D8x5BiSJ.js";import{G as A}from"./GraphSideNodeDetail-Bq-s9Xn-.js";import{G as T}from"./GraphSideNodeReferences-Z8RXKyJw.js";import{G as v}from"./Graph-5VTUoxP2.js";import{I}from"./IconButton-0aPC0fG3.js";import"./preload-helper-PPVm8Dsz.js";import"./Badge-DwHf6XaZ.js";import"./Icon-slQIkwOk.js";import"./styles-B5wKabRy.js";import"./Switch-C4308IPd.js";import"./Slider-Cmyc-j-4.js";import"./Button-QhbJqOxn.js";import"./Progress-Cb-EtYZG.js";import"./button-styles-BPC6xbbG.js";import"./FloatingLabelInput-BAp3kDpq.js";const _=6;function g({canvas:t,action:n,side:s,sideOpen:o,sideWidth:r=260,className:a}){return e.jsxs("div",{className:x("relative w-full h-full",a),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:o?r+_:0},children:t}),s]}),n&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:n})]})}g.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function f({node:t,open:n,onClose:s,renderDetails:o,width:r=260,className:a}){const l=d.useRef(t);t&&(l.current=t);const c=t??l.current,p=n??!!t;return e.jsxs("div",{className:x("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",p?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",a),style:{width:r},"aria-hidden":!p,children:[e.jsx(R,{node:c,onClose:s}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:p&&c?o(c):null})]})}f.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const de={title:"Layout/Graph",component:g,decorators:[t=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(t,{})})]},b={id:"settings",label:"Graph settings"},h=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],y=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],L=t=>{let n=0;for(let s=0;s<t.length;s++)n=n*31+t.charCodeAt(s)>>>0;return n.toString(16).padStart(12,"0").slice(0,12)},P=t=>{const n=new Set,s=[];for(const o of y){const r=o.source===t?o.target:o.target===t?o.source:null;if(!r||n.has(r))continue;n.add(r);const a=h.find(l=>l.id===r);s.push({id:r,label:a?.label??r})}return s},w={user:{summary:"The root identity. Pinned at the center of the graph.",content:`# User

The **user** is the root of every workspace. All modules attach as
children of the user node, and permissions cascade from this anchor.

## Pinning

The user node stays pinned at the center of the canvas so the graph
always orients around identity.`},account:{summary:"Workspace settings, identity, security.",content:`# Account

Workspace-level identity and configuration. Holds:

- Display name & avatar
- Authentication providers
- Member roles
- Billing contact

Account is the only module that can mutate other modules' visibility.`},apps:{summary:"Installed modules in this workspace.",content:`# Apps

The catalog of modules installed in this workspace. Each entry tracks:

- Module id (\`apps.<slug>\`)
- Installed version
- Permission scopes granted at install

Removing an app cascades to all of its data.`},projectify:{summary:"Project tracking module.",content:`# Projectify

Project tracking — tasks, sprints, milestones. Stores entries under
\`projectify.task.<id>\` and references the **user** for assignment.`},crm:{summary:"Customer relationships and outreach.",content:`# CRM

Customer relationships module. Manages contacts, deals, and outreach
threads, all keyed by external email address.`},daily:{summary:"Daily journal — notes, mood, reflections.",content:`# Daily

A lightweight daily journal that aggregates notes, mood entries, and
reflections into a single timeline. Pairs with **Notes** for free-form
content.`},balance:{summary:"Finances, ledger, statements.",content:`# Balance

Finance hub — wires together the ledger, statements, and any external
payment processors. Money never leaves Balance.

References **Ledger** for double-entry bookkeeping and **Stripe** for
processing.`},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12",content:`# Stripe

Connected Stripe account used by **Balance** for processing customer
payments. Synced webhooks land in the ledger as immutable entries.`},ledger:{summary:"Double-entry ledger powering Balance.",content:`# Ledger

Append-only double-entry ledger. Every monetary mutation in the workspace
ends up here as paired debit/credit entries with a deterministic id.`},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14",content:`# Notes

Free-form journal entries. Stored as markdown, attached to the **Daily**
timeline by date.`}},u={render:()=>{const t=d.useRef(null),[n,s]=d.useState(null),o=n?h.find(r=>r.id===n)??null:null;return e.jsx(g,{sideOpen:!!o,canvas:e.jsx(v,{ref:t,nodes:h,edges:y,selectedId:n??void 0,onNodeClick:r=>s(r),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(G,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit()}),side:e.jsx(f,{node:o,onClose:()=>s(null),renderDetails:r=>{const a=w[r.id];return a?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},O={summary:"No description for this node."};function z({node:t,onSelect:n}){const s=w[t.id]??O,o=P(t.id);return e.jsx(N,{prepend:e.jsx(C,{description:s.summary,source:t.tag??"—",id:L(t.id)}),items:[{id:"content",title:"Content",trailing:e.jsx(I,{icon:"pip_exit","aria-label":"Expand content",tooltip:"Expand",size:"sm",variant:"outline",onClick:()=>console.log(`Expand content for ${t.id}`)}),body:e.jsx(A,{children:s.content?e.jsx("div",{className:"whitespace-pre-wrap text-xs leading-snug",children:s.content}):e.jsx("p",{className:"text-on-surface-variant",children:"No content for this node yet."})})},{id:"references",title:"References",body:e.jsx(T,{items:o,onSelect:n,className:"-mt-1"})}]})}const m={render:()=>{const t=d.useRef(null),[n,s]=d.useState(null),[o,r]=d.useState([{id:"core",name:"openclaude",color:"#f4a8a8"},{id:"memory",name:"memory system brain",color:"#a8d8a8"},{id:"wss",name:"wss tunnel",color:"#cbb6e5"},{id:"mcp",name:"mcp",color:"#f5c14a"},{id:"stripe",name:"stripe",color:"#8db8e8"}]),[a,l]=d.useState({nodeSize:1,lineSize:1,showLabels:!0,repulsion:1500,linkDistance:70}),[c,p]=d.useState(""),S=n?.type==="node"?h.find(i=>i.id===n.id)??null:n?.type==="settings"?b:null;return e.jsx(g,{sideOpen:!!S,canvas:e.jsx(v,{ref:t,nodes:h,edges:y,selectedId:n?.type==="node"?n.id:void 0,onNodeClick:i=>s({type:"node",id:i}),nodeSize:a.nodeSize,lineSize:a.lineSize,showLabels:a.showLabels,repulsion:a.repulsion,linkDistance:a.linkDistance,className:"border-0 bg-transparent rounded-none"}),action:e.jsx(G,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit(),onSettings:()=>s(i=>i?.type==="settings"?null:{type:"settings"})}),side:e.jsx(f,{node:S,onClose:()=>s(null),renderDetails:i=>i.id===b.id?e.jsx(N,{prepend:e.jsx(E,{value:c,onChange:p}),items:[{id:"groups",title:"Groups",body:e.jsx(k,{groups:o,onChange:r})},{id:"settings",title:"Settings",body:e.jsx(D,{value:a,onChange:l})}]}):e.jsx(z,{node:i,onSelect:j=>s({type:"node",id:j})})})})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...u.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
      return <NodeDetailsPanel node={n} onSelect={id => setView({
        type: "node",
        id
      })} />;
    }} />} />;
  }
}`,...m.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Node clicks show details; settings opens a
GraphSideContent panel composing GraphSideGroup + GraphSideSetting.
Latest interaction wins.`,...m.parameters?.docs?.description}}};const le=["WithGraph","WithGraphAndSettings"];export{u as WithGraph,m as WithGraphAndSettings,le as __namedExportsOrder,de as default};
