import{j as e,r as o}from"./iframe-AT5oXUh7.js";import{c as g}from"./cn-IyxL_b2c.js";import{G as y}from"./GraphAction-CdzJMvMg.js";import{G,S as j}from"./GraphSideHeader-U8qGuqkf.js";import{G as N}from"./Graph-BvKyzs4u.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-DngDFLEf.js";import"./Progress-C8Dtw91q.js";import"./Icon-C3L7kKcW.js";import"./button-styles-DvQkePbc.js";import"./Badge-CTnHLBck.js";const R=6;function p({canvas:t,action:s,side:r,sideOpen:i,sideWidth:n=260,className:a}){return e.jsxs("div",{className:g("relative w-full h-full",a),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:i?n+R:0},children:t}),r]}),s&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:s})]})}p.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function m({node:t,open:s,onClose:r,renderDetails:i,width:n=260,className:a}){const v=o.useRef(t);t&&(v.current=t);const f=t??v.current,h=s??!!t;return e.jsxs("div",{className:g("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",h?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",a),style:{width:n},"aria-hidden":!h,children:[e.jsx(G,{node:f,onClose:r}),e.jsx("div",{className:g(j,"flex-1 min-h-0 overflow-y-auto p-3"),children:h&&f?i(f):null})]})}m.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const q={title:"Layout/Graph",component:p,decorators:[t=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(t,{})})]},x={id:"settings",label:"Graph settings",tag:"configuration"},u=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],S=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],b={user:{summary:"The root identity. Pinned at the center of the graph."},account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},projectify:{summary:"Project tracking module."},crm:{summary:"Customer relationships and outreach."},daily:{summary:"Daily journal — notes, mood, reflections."},balance:{summary:"Finances, ledger, statements."},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12"},ledger:{summary:"Double-entry ledger powering Balance."},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14"}},l={render:()=>{const t=o.useRef(null),[s,r]=o.useState(null),i=s?u.find(n=>n.id===s)??null:null;return e.jsx(p,{sideOpen:!!i,canvas:e.jsx(N,{ref:t,nodes:u,edges:S,selectedId:s??void 0,onNodeClick:n=>r(n),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(y,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit()}),side:e.jsx(m,{node:i,onClose:()=>r(null),renderDetails:n=>{const a=b[n.id];return a?e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"text-sm text-on-surface-variant",children:"No details for this node."})}})})}},d={render:()=>{const t=o.useRef(null),[s,r]=o.useState(null),i=s?.type==="node"?u.find(n=>n.id===s.id)??null:s?.type==="settings"?x:null;return e.jsx(p,{sideOpen:!!i,canvas:e.jsx(N,{ref:t,nodes:u,edges:S,selectedId:s?.type==="node"?s.id:void 0,onNodeClick:n=>r({type:"node",id:n}),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(y,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit(),onSettings:()=>r(n=>n?.type==="settings"?null:{type:"settings"})}),side:e.jsx(m,{node:i,onClose:()=>r(null),renderDetails:n=>{if(n.id===x.id)return e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"Graph-level settings live here."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Toggled via the settings toolbar button."})]});const a=b[n.id];return a?e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"text-sm text-on-surface-variant",children:"No details for this node."})}})})}},c={render:()=>{const[t,s]=o.useState(!1);return e.jsx(p,{sideOpen:t,action:e.jsx(y,{onReplay:()=>{},onFit:()=>{},onSettings:()=>s(r=>!r)}),side:e.jsx(m,{node:t?x:null,onClose:()=>s(!1),renderDetails:()=>e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"This panel is opened by the settings toolbar button."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Real consumers will plug their graph settings form in here."})]})})})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = selectedId ? GRAPH_NODES.find(n => n.id === selectedId) ?? null : null;
    return <GraphLayout sideOpen={Boolean(selected)} canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={selectedId ?? undefined} onNodeClick={id => setSelectedId(id)} className="border-0 bg-transparent rounded-none" />} action={<GraphAction onReplay={() => graphRef.current?.replay()} onFit={() => graphRef.current?.fit()} />} side={<GraphSide node={selected} onClose={() => setSelectedId(null)} renderDetails={n => {
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
}`,...l.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
        return <div className="flex flex-col gap-3 text-sm text-on-surface">
                    <p>Graph-level settings live here.</p>
                    <p className="text-on-surface-variant text-xs">
                      Toggled via the settings toolbar button.
                    </p>
                  </div>;
      }
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
}`,...d.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Latest interaction wins.`,...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <GraphLayout sideOpen={open} action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>This panel is opened by the settings toolbar button.</p>
                <p className="text-on-surface-variant text-xs">
                  Real consumers will plug their graph settings form in here.
                </p>
              </div>} />} />;
  }
}`,...c.parameters?.docs?.source},description:{story:"Click the settings (last) icon button to toggle the side panel open.",...c.parameters?.docs?.description}}};const k=["WithGraph","WithGraphAndSettings","SettingsTogglesSide"];export{c as SettingsTogglesSide,l as WithGraph,d as WithGraphAndSettings,k as __namedExportsOrder,q as default};
