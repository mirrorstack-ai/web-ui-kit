import{j as e,r as c}from"./iframe-C-EZOfqR.js";import{c as v}from"./cn-IyxL_b2c.js";import{G as h}from"./GraphAction-B2t1EzPj.js";import{G as g}from"./GraphSide-DLX_dQ7A.js";import{G as f}from"./Graph-fR01l9P-.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-DmAd2Uzg.js";import"./Progress-BPhkf2PU.js";import"./Icon-1iu6iqSo.js";import"./button-styles-DvQkePbc.js";const N=6;function p({canvas:n,action:s,side:r,sideOpen:o,sideWidth:t=260,className:a}){return e.jsxs("div",{className:v("relative w-full h-full",a),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:o?t+N:0},children:n}),r]}),s&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:s})]})}p.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const I={title:"Layout/Graph",component:p,decorators:[n=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(n,{})})]},m={id:"settings",label:"Graph settings",tag:"configuration"},u=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],x=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],y={user:{summary:"The root identity. Pinned at the center of the graph."},account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},projectify:{summary:"Project tracking module."},crm:{summary:"Customer relationships and outreach."},daily:{summary:"Daily journal — notes, mood, reflections."},balance:{summary:"Finances, ledger, statements."},stripe:{summary:"Connected Stripe account.",lastSeen:"2026-05-12"},ledger:{summary:"Double-entry ledger powering Balance."},notes:{summary:"Free-form journal entries.",lastSeen:"2026-05-14"}},i={render:()=>{const n=c.useRef(null),[s,r]=c.useState(null),o=s?u.find(t=>t.id===s)??null:null;return e.jsx(p,{sideOpen:!!o,canvas:e.jsx(f,{ref:n,nodes:u,edges:x,selectedId:s??void 0,onNodeClick:t=>r(t),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(h,{onReplay:()=>n.current?.replay(),onFit:()=>n.current?.fit()}),side:e.jsx(g,{node:o,onClose:()=>r(null),renderDetails:t=>{const a=y[t.id];return a?e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"text-sm text-on-surface-variant",children:"No details for this node."})}})})}},l={render:()=>{const n=c.useRef(null),[s,r]=c.useState(null),o=s?.type==="node"?u.find(t=>t.id===s.id)??null:s?.type==="settings"?m:null;return e.jsx(p,{sideOpen:!!o,canvas:e.jsx(f,{ref:n,nodes:u,edges:x,selectedId:s?.type==="node"?s.id:void 0,onNodeClick:t=>r({type:"node",id:t}),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(h,{onReplay:()=>n.current?.replay(),onFit:()=>n.current?.fit(),onSettings:()=>r(t=>t?.type==="settings"?null:{type:"settings"})}),side:e.jsx(g,{node:o,onClose:()=>r(null),renderDetails:t=>{if(t.id===m.id)return e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"Graph-level settings live here."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Toggled via the settings toolbar button."})]});const a=y[t.id];return a?e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"text-sm text-on-surface-variant",children:"No details for this node."})}})})}},d={render:()=>{const[n,s]=c.useState(!1);return e.jsx(p,{sideOpen:n,action:e.jsx(h,{onReplay:()=>{},onFit:()=>{},onSettings:()=>s(r=>!r)}),side:e.jsx(g,{node:n?m:null,onClose:()=>s(!1),renderDetails:()=>e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"This panel is opened by the settings toolbar button."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Real consumers will plug their graph settings form in here."})]})})})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Latest interaction wins.`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <GraphLayout sideOpen={open} action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>This panel is opened by the settings toolbar button.</p>
                <p className="text-on-surface-variant text-xs">
                  Real consumers will plug their graph settings form in here.
                </p>
              </div>} />} />;
  }
}`,...d.parameters?.docs?.source},description:{story:"Click the settings (last) icon button to toggle the side panel open.",...d.parameters?.docs?.description}}};const A=["WithGraph","WithGraphAndSettings","SettingsTogglesSide"];export{d as SettingsTogglesSide,i as WithGraph,l as WithGraphAndSettings,A as __namedExportsOrder,I as default};
