import{j as e,r as d}from"./iframe-cEwbwGRk.js";import{c as y}from"./cn-IyxL_b2c.js";import{G as g}from"./GraphAction-DCG_XpoE.js";import{G as m}from"./GraphSide-BcRROnoi.js";import{G as h}from"./Graph-KUSqicqP.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-C6LtggAa.js";import"./Progress-B83L-R30.js";import"./Icon-WF1qqnBR.js";import"./button-styles-DvQkePbc.js";function p({canvas:t,action:s,side:n,className:o}){return e.jsxs("div",{className:y("relative w-full h-full",o),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[t,n]}),s&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:s})]})}p.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},className:{required:!1,tsType:{name:"string"},description:""}}};const I={title:"Layout/Graph",component:p,decorators:[t=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(t,{})})]},f={id:"settings",label:"Graph settings",tag:"configuration"},u=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],x=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],S={user:{summary:"The root identity. Pinned at the center of the graph."},account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},projectify:{summary:"Project tracking module."},crm:{summary:"Customer relationships and outreach."},daily:{summary:"Daily journal — notes, mood, reflections."},balance:{summary:"Finances, ledger, statements."},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12"},ledger:{summary:"Double-entry ledger powering Balance."},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14"}},i={render:()=>{const t=d.useRef(null),[s,n]=d.useState(null),o=s&&u.find(a=>a.id===s)||null;return e.jsx(p,{canvas:e.jsx(h,{ref:t,nodes:u,edges:x,selectedId:s??void 0,onNodeClick:a=>n(r=>r===a?null:a)}),action:e.jsx(g,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit()}),side:e.jsx(m,{node:o,onClose:()=>n(null),renderDetails:a=>{const r=S[a.id];return r?e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:r.summary}),r.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",r.lastSeen]})]}):e.jsx("p",{className:"text-sm text-on-surface-variant",children:"No details for this node."})}})})}},l={render:()=>{const t=d.useRef(null),[s,n]=d.useState(!1);return e.jsx(p,{canvas:e.jsx(h,{ref:t,nodes:u,edges:x}),action:e.jsx(g,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit(),onSettings:()=>n(o=>!o)}),side:e.jsx(m,{node:s?f:null,onClose:()=>n(!1),renderDetails:()=>e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"Graph-level settings live here."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Toggled via the settings toolbar button — independent of the node-click selection in the WithGraph story."})]})})})}},c={render:()=>{const[t,s]=d.useState(!1);return e.jsx(p,{action:e.jsx(g,{onReplay:()=>{},onFit:()=>{},onSettings:()=>s(n=>!n)}),side:e.jsx(m,{node:t?f:null,onClose:()=>s(!1),renderDetails:()=>e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"This panel is opened by the settings toolbar button."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Real consumers will plug their graph settings form in here."})]})})})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = selectedId && GRAPH_NODES.find(n => n.id === selectedId) || null;
    return <GraphLayout canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={selectedId ?? undefined} onNodeClick={id => setSelectedId(cur => cur === id ? null : id)} />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} />} side={<GraphSide node={selected} onClose={() => setSelectedId(null)} renderDetails={n => {
      const d = NODE_DETAILS[n.id];
      return d ? <div className="flex flex-col gap-3">
                  <p className="text-sm text-on-surface">{d.summary}</p>
                  {d.lastSeen && <div className="text-xs text-on-surface-variant">
                      Last activity: {d.lastSeen}
                    </div>}
                </div> : <p className="text-sm text-on-surface-variant">
                  No details for this node.
                </p>;
    }} />} />;
  }
}`,...i.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    return <GraphLayout canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} onSettings={() => setSettingsOpen(v => !v)} />} side={<GraphSide node={settingsOpen ? SETTINGS_NODE : null} onClose={() => setSettingsOpen(false)} renderDetails={() => <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>Graph-level settings live here.</p>
                <p className="text-on-surface-variant text-xs">
                  Toggled via the settings toolbar button — independent of
                  the node-click selection in the WithGraph story.
                </p>
              </div>} />} />;
  }
}`,...l.parameters?.docs?.source},description:{story:`Graph canvas with the settings (last) toolbar button toggling a side
panel for graph-level configuration — independent of node selection.`,...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <GraphLayout action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>This panel is opened by the settings toolbar button.</p>
                <p className="text-on-surface-variant text-xs">
                  Real consumers will plug their graph settings form in here.
                </p>
              </div>} />} />;
  }
}`,...c.parameters?.docs?.source},description:{story:"Click the settings (last) icon button to toggle the side panel open.",...c.parameters?.docs?.description}}};const A=["WithGraph","WithGraphAndSettings","SettingsTogglesSide"];export{c as SettingsTogglesSide,i as WithGraph,l as WithGraphAndSettings,A as __namedExportsOrder,I as default};
