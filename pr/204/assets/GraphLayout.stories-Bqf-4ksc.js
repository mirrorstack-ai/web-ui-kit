import{j as e,r as d}from"./iframe-2oMKCSvZ.js";import{c as C}from"./cn-IyxL_b2c.js";import{G as E}from"./GraphAction-rfuChNfO.js";import{G as _}from"./GraphSideHeader-DGk2RSpY.js";import{G as k}from"./GraphSideContent-Car_ndve.js";import{G as O}from"./GraphSideSetting-C2ycDsqN.js";import{G as B}from"./GraphSideGroup-CzoFGsR6.js";import{G as q}from"./GraphSideSearch-C8bi2ybq.js";import{G as z}from"./GraphSideNodeSummary-CDRgIoxX.js";import{G as H}from"./GraphSideNodeDetail-BGLJddL0.js";import{G as F}from"./GraphSideNodeReferences-aT8YtnGH.js";import{G as P}from"./Graph-BGihB9t-.js";import{I as M}from"./IconButton-7Hyt7SgV.js";import"./preload-helper-PPVm8Dsz.js";import"./Badge-zjbbQ_Kk.js";import"./Icon-B_tVFlA4.js";import"./styles-B5wKabRy.js";import"./Switch-B92YI0aV.js";import"./Slider-CVQKndGs.js";import"./Button-BOMLB81l.js";import"./Progress-kqAjo-iD.js";import"./button-styles-BPC6xbbG.js";import"./FloatingLabelInput-CmwY_xs7.js";const V=6;function S({canvas:t,action:n,side:s,sideOpen:o,sideWidth:r=260,className:a}){return e.jsxs("div",{className:C("relative w-full h-full",a),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:o?r+V:0},children:t}),s]}),n&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:n})]})}S.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function G({node:t,open:n,onClose:s,renderDetails:o,width:r=260,className:a}){const l=d.useRef(t);t&&(l.current=t);const u=t??l.current,m=n??!!t;return e.jsxs("div",{className:C("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",m?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",a),style:{width:r},"aria-hidden":!m,children:[e.jsx(_,{node:u,onClose:s}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:m&&u?o(u):null})]})}G.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Se={title:"Layout/Graph",component:S,decorators:[t=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(t,{})})]},R={id:"settings",label:"Graph settings"},p=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],x=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],W=t=>{let n=0;for(let s=0;s<t.length;s++)n=n*31+t.charCodeAt(s)>>>0;return n.toString(16).padStart(12,"0").slice(0,12)},U=t=>{const n=new Set,s=[];for(const o of x){const r=o.source===t?o.target:o.target===t?o.source:null;if(!r||n.has(r))continue;n.add(r);const a=p.find(l=>l.id===r);s.push({id:r,label:a?.label??r})}return s},v={user:{summary:"The root identity. Pinned at the center of the graph.",content:`# User

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
timeline by date.`}},g={render:()=>{const t=d.useRef(null),[n,s]=d.useState(null),o=n?p.find(r=>r.id===n)??null:null;return e.jsx(S,{sideOpen:!!o,canvas:e.jsx(P,{ref:t,nodes:p,edges:x,selectedId:n??void 0,onNodeClick:r=>s(r),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(E,{onReplay:()=>t.current?.replay(),onFit:()=>t.current?.fit()}),side:e.jsx(G,{node:o,onClose:()=>s(null),renderDetails:r=>{const a=v[r.id];return a?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},K={summary:"No description for this node."};function $({node:t,onSelect:n}){const s=v[t.id]??K,o=U(t.id);return e.jsx(k,{prepend:e.jsx(z,{description:s.summary,source:t.tag??"—",id:W(t.id)}),items:[{id:"content",title:"Content",trailing:e.jsx(M,{icon:"pip_exit","aria-label":"Expand content",tooltip:"Expand",size:"sm",variant:"outline",onClick:()=>console.log(`Expand content for ${t.id}`)}),body:e.jsx(H,{children:s.content?e.jsx("div",{className:"whitespace-pre-wrap text-xs leading-snug",children:s.content}):e.jsx("p",{className:"text-on-surface-variant",children:"No content for this node yet."})})},{id:"references",title:"References",body:e.jsx(F,{items:o,onSelect:n,className:"-mt-1"})}]})}const f={render:()=>{const t=d.useRef(null),[n,s]=d.useState(null),[o,r]=d.useState([{id:"user",name:"User",color:"#f5c14a"},{id:"core",name:"Core",color:"#a8d8a8"},{id:"project",name:"Project",color:"#cbb6e5"},{id:"crm",name:"CRM",color:"#f4a8a8"},{id:"daily",name:"Daily",color:"#fbb6ce"},{id:"balance",name:"Balance",color:"#8db8e8"},{id:"commerce",name:"Commerce",color:"#6ee7b7"}]),[a,l]=d.useState({nodeSize:1,lineSize:1,showLabels:!0,repulsion:1500,linkDistance:70}),[u,m]=d.useState(""),[T,b]=d.useState(!1),A=d.useMemo(()=>{const i=c=>{const h=v[c.id],I=[c.label,c.tag,h?.summary,h?.content];for(const w of I){if(!w)continue;const L=w.toLowerCase();for(const j of o){const D=j.name.trim().toLowerCase();if(D&&L.includes(D))return j.color}}},y={};for(const c of p){const h=i(c);h&&(y[c.id]=h)}return y},[o]),N=n?.type==="node"?p.find(i=>i.id===n.id)??null:n?.type==="settings"?R:null;return e.jsx(S,{sideOpen:!!N,canvas:e.jsx(P,{ref:t,nodes:p,edges:x,selectedId:n?.type==="node"?n.id:void 0,onNodeClick:i=>s({type:"node",id:i}),nodeSize:a.nodeSize,lineSize:a.lineSize,showLabels:a.showLabels,repulsion:a.repulsion,linkDistance:a.linkDistance,colors:A,onPlaybackEnd:()=>b(!1),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(E,{playing:T,onReplay:()=>{t.current?.replay(),b(!0)},onStop:()=>{t.current?.stop(),b(!1)},onFit:()=>t.current?.fit(),onSettings:()=>s(i=>i?.type==="settings"?null:{type:"settings"})}),side:e.jsx(G,{node:N,onClose:()=>s(null),renderDetails:i=>i.id===R.id?e.jsx(k,{prepend:e.jsx(q,{value:u,onChange:m}),items:[{id:"groups",title:"Groups",body:e.jsx(B,{groups:o,onChange:r})},{id:"settings",title:"Settings",body:e.jsx(O,{value:a,onChange:l})}]}):e.jsx($,{node:i,onSelect:y=>s({type:"node",id:y})})})})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source},description:{story:`Full integration: Graph canvas wired through the toolbar's replay/fit and
a side panel that opens on node click.`,...g.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [view, setView] = useState<SideView>(null);
    const [groups, setGroups] = useState<GraphSideGroupItem[]>([{
      id: "user",
      name: "User",
      color: "#f5c14a"
    }, {
      id: "core",
      name: "Core",
      color: "#a8d8a8"
    }, {
      id: "project",
      name: "Project",
      color: "#cbb6e5"
    }, {
      id: "crm",
      name: "CRM",
      color: "#f4a8a8"
    }, {
      id: "daily",
      name: "Daily",
      color: "#fbb6ce"
    }, {
      id: "balance",
      name: "Balance",
      color: "#8db8e8"
    }, {
      id: "commerce",
      name: "Commerce",
      color: "#6ee7b7"
    }]);
    const [setting, setSetting] = useState<GraphSideSettingValue>({
      nodeSize: 1,
      lineSize: 1,
      showLabels: true,
      repulsion: 1500,
      linkDistance: 70
    });
    const [search, setSearch] = useState("");
    const [playing, setPlaying] = useState(false);
    // Default group matching: substring-search the group's name across each
    // node's fields in priority order — Title (label) > Tags > Description
    // (summary) > Content (markdown body). The highest-priority field that
    // any group matches wins, breaking ties by group list order. The
    // structured-query version (path:, tag:, [property:]) ships in a
    // follow-up PR.
    const colors = useMemo(() => {
      const resolve = (n: GraphNode): string | undefined => {
        const d = NODE_DETAILS[n.id];
        const fieldsByPriority = [n.label, n.tag, d?.summary, d?.content];
        for (const field of fieldsByPriority) {
          if (!field) continue;
          const f = field.toLowerCase();
          for (const g of groups) {
            const q = g.name.trim().toLowerCase();
            if (q && f.includes(q)) return g.color;
          }
        }
        return undefined;
      };
      const out: Record<string, string> = {};
      for (const n of GRAPH_NODES) {
        const c = resolve(n);
        if (c) out[n.id] = c;
      }
      return out;
    }, [groups]);
    const sideNode: GraphSideNode | null = view?.type === "node" ? GRAPH_NODES.find(n => n.id === view.id) ?? null : view?.type === "settings" ? SETTINGS_NODE : null;
    return <GraphLayout sideOpen={Boolean(sideNode)} canvas={<Graph ref={graphRef} nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={view?.type === "node" ? view.id : undefined} onNodeClick={id => setView({
      type: "node",
      id
    })} nodeSize={setting.nodeSize} lineSize={setting.lineSize} showLabels={setting.showLabels} repulsion={setting.repulsion} linkDistance={setting.linkDistance} colors={colors} onPlaybackEnd={() => setPlaying(false)} className="border-0 bg-transparent rounded-none" />} action={<GraphAction playing={playing} onReplay={() => {
      graphRef.current?.replay();
      setPlaying(true);
    }} onStop={() => {
      graphRef.current?.stop();
      setPlaying(false);
    }} onFit={() => graphRef.current?.fit()} onSettings={() => setView(v => v?.type === "settings" ? null : {
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
}`,...f.parameters?.docs?.source},description:{story:`Graph canvas where both node clicks and the settings toolbar button
open the side panel. Node clicks show details; settings opens a
GraphSideContent panel composing GraphSideGroup + GraphSideSetting.
Latest interaction wins.`,...f.parameters?.docs?.description}}};const be=["WithGraph","WithGraphAndSettings"];export{g as WithGraph,f as WithGraphAndSettings,be as __namedExportsOrder,Se as default};
