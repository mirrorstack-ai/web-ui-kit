import{j as e,r as i}from"./iframe-CH7za8Cj.js";import{c as T}from"./cn-IyxL_b2c.js";import{G as E}from"./GraphAction-BizlENNB.js";import{G as B}from"./GraphSideHeader-B2Nk-NV-.js";import{G as q}from"./Graph-j0Sywc0U.js";import{G as P}from"./GraphSideContent-dNEqivdC.js";import{G as z}from"./GraphSideSearch-Cie1QdMF.js";import{G as H}from"./GraphSideGroup-BDcSDaDj.js";import{G as F}from"./GraphSideSetting-HDhATDVO.js";import{G as M}from"./GraphSideNodeSummary-CeVvHoN6.js";import{G as V}from"./GraphSideNodeDetail-B2KQ8qOm.js";import{G as W}from"./GraphSideNodeReferences-C9W1TZu5.js";import{I as U}from"./IconButton-D4QiJZmw.js";import"./preload-helper-PPVm8Dsz.js";import"./Badge-Cq8uu_KA.js";import"./Icon-CkWXpKgH.js";import"./Surface-NKfNf0Uz.js";import"./FloatingLabelInput-BGHU1Vpl.js";import"./index-BOys07sK.js";import"./index-BYJ1hdr2.js";import"./useClickOutside-CE4A-2nA.js";import"./Button-CzS-ZNUs.js";import"./Progress-DuAXgA7_.js";import"./button-styles-CZHSjrxJ.js";import"./OptionList-Dt06dCwa.js";import"./Switch-DPNfjrTY.js";import"./Slider-REZEGB00.js";const K=6;function S({canvas:n,action:t,side:r,sideOpen:o,sideWidth:s=260,className:a}){return e.jsxs("div",{className:T("relative w-full h-full",a),children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden rounded-xl",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out",style:{right:o?s+K:0},children:n}),r]}),t&&e.jsx("div",{className:"absolute -top-1.5 -right-1.5 z-10",children:t})]})}S.__docgenInfo={description:"",methods:[],displayName:"GraphLayout",props:{canvas:{required:!1,tsType:{name:"ReactNode"},description:""},action:{required:!1,tsType:{name:"ReactNode"},description:"Rendered absolutely at the top-right corner, slightly bleeding outside the container."},side:{required:!1,tsType:{name:"ReactNode"},description:"Rendered as a direct child — the side component owns its own positioning."},sideOpen:{required:!1,tsType:{name:"boolean"},description:"When true, the canvas wrapper shrinks horizontally to leave room for the side panel."},sideWidth:{required:!1,tsType:{name:"number"},description:"Width reserved for the side panel when sideOpen is true. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};function v({node:n,open:t,onClose:r,renderDetails:o,width:s=260,className:a,headerClassName:p}){const y=i.useRef(n);n&&(y.current=n);const u=n??y.current,m=t??!!n;return e.jsxs("div",{className:T("absolute inset-y-1.5 right-1.5 flex flex-col gap-1.5 transition-transform duration-200 ease-out",m?"translate-x-0":"translate-x-[calc(100%+0.375rem)]",a),style:{width:s},"aria-hidden":!m,children:[e.jsx(B,{node:u,onClose:r,className:p}),e.jsx("div",{className:"flex-1 min-h-0 overflow-hidden",children:m&&u?o(u):null})]})}v.__docgenInfo={description:"",methods:[],displayName:"GraphSide",props:{node:{required:!0,tsType:{name:"union",raw:"T | null",elements:[{name:"T"},{name:"null"}]},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Force-control open state. Defaults to `node != null`."},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderDetails:{required:!0,tsType:{name:"signature",type:"function",raw:"(node: T) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"node"}],return:{name:"ReactNode"}}},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Panel width — number for pixels, string for any CSS value. Default 260.",defaultValue:{value:"260",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},headerClassName:{required:!1,tsType:{name:"string"},description:`Class passed straight to the auto-rendered GraphSideHeader.
      Useful for theming the header per node — e.g. swapping the
      surface to a success / warning / error tint while the details
      body keeps its default styling.`}}};const je={title:"Layout/GraphLayout",component:S,decorators:[n=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(n,{})})]},k={id:"settings",label:"Graph settings"},l=[{id:"user",label:"Nothing Chang",pin:{x:.5,y:.5},tag:"user"},{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"projectify",label:"Projectify",tag:"project"},{id:"crm",label:"CRM",tag:"crm"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"},{id:"stripe",label:"Stripe",tag:"commerce"},{id:"ledger",label:"Ledger",tag:"balance"},{id:"notes",label:"Notes",tag:"daily"}],N=[{source:"user",target:"account"},{source:"user",target:"apps"},{source:"user",target:"projectify"},{source:"user",target:"crm"},{source:"user",target:"daily"},{source:"user",target:"balance"},{source:"balance",target:"stripe"},{source:"balance",target:"ledger"},{source:"daily",target:"notes"}],J=n=>{let t=0;for(let r=0;r<n.length;r++)t=t*31+n.charCodeAt(r)>>>0;return t.toString(16).padStart(12,"0").slice(0,12)},$=n=>{const t=new Set,r=[];for(const o of N){const s=o.source===n?o.target:o.target===n?o.source:null;if(!s||t.has(s))continue;t.add(s);const a=l.find(p=>p.id===s);r.push({id:s,label:a?.label??s})}return r},w={user:{summary:"The root identity. Pinned at the center of the graph.",content:`# User

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
timeline by date.`}},g={render:()=>{const n=i.useRef(null),[t,r]=i.useState(null),o=t?l.find(s=>s.id===t)??null:null;return e.jsx(S,{sideOpen:!!o,canvas:e.jsx(q,{ref:n,nodes:l,edges:N,selectedId:t??void 0,onNodeClick:s=>r(s),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(E,{onReplay:()=>n.current?.replay(),onFit:()=>n.current?.fit()}),side:e.jsx(v,{node:o,onClose:()=>r(null),renderDetails:s=>{const a=w[s.id];return a?e.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"p-3 text-sm text-on-surface-variant",children:"No details for this node."})}})})}},Q={summary:"No description for this node."};function X({node:n,onSelect:t}){const r=w[n.id]??Q,o=$(n.id);return e.jsx(P,{prepend:e.jsx(M,{description:r.summary,source:n.tag??"—",id:J(n.id)}),items:[{id:"content",title:"Content",trailing:e.jsx(U,{icon:"pip_exit","aria-label":"Expand content",tooltip:"Expand",size:"sm",variant:"outline",onClick:()=>console.log(`Expand content for ${n.id}`)}),body:e.jsx(V,{children:r.content?e.jsx("div",{className:"whitespace-pre-wrap text-xs leading-snug",children:r.content}):e.jsx("p",{className:"text-on-surface-variant",children:"No content for this node yet."})})},{id:"references",title:"References",body:e.jsx(W,{items:o,onSelect:t,className:"-mt-1"})}]})}const f={render:()=>{const n=i.useRef(null),[t,r]=i.useState(null),[o,s]=i.useState([{id:"user",name:"User",query:"user",color:"#f5c14a"},{id:"core",name:"Core",query:"core",color:"#a8d8a8"},{id:"project",name:"Project",query:"project",color:"#cbb6e5"},{id:"crm",name:"CRM",query:"crm",color:"#f4a8a8"},{id:"daily",name:"Daily",query:"daily",color:"#fbb6ce"},{id:"balance",name:"Balance",query:"balance",color:"#8db8e8"},{id:"commerce",name:"Commerce",query:"commerce",color:"#6ee7b7"}]),[a,p]=i.useState({nodeSize:1,textSize:1,lineSize:1,showTags:!1,repulsion:1500,linkDistance:70}),[y,u]=i.useState(""),[m,b]=i.useState(!1),A=i.useMemo(()=>["apps","account","crm","daily","balance","projectify"],[]),I=i.useMemo(()=>{const d=c=>c.replace(/^(?:source|name|description|content):\s*/i,""),x=c=>{const h=w[c.id],_=[c.label,c.tag,h?.summary,h?.content];for(const R of _){if(!R)continue;const O=R.toLowerCase();for(const G of o){const L=G.query?.trim()||G.name,C=d(L).trim().toLowerCase();if(C&&O.includes(C))return G.color}}},D={};for(const c of l){const h=x(c);h&&(D[c.id]=h)}return D},[o]),j=t?.type==="node"?l.find(d=>d.id===t.id)??null:t?.type==="settings"?k:null;return e.jsx(S,{sideOpen:!!j,canvas:e.jsx(q,{ref:n,nodes:l,edges:N,selectedId:t?.type==="node"?t.id:void 0,onNodeClick:d=>r({type:"node",id:d}),nodeSize:a.nodeSize,lineSize:a.lineSize,showTags:a.showTags,repulsion:a.repulsion,linkDistance:a.linkDistance,colors:I,onPlaybackEnd:()=>b(!1),className:"border-0 bg-transparent rounded-none"}),action:e.jsx(E,{playing:m,onReplay:()=>{n.current?.replay(),b(!0)},onStop:()=>{n.current?.stop(),b(!1)},onFit:()=>n.current?.fit(),onSettings:()=>r(d=>d?.type==="settings"?null:{type:"settings"})}),side:e.jsx(v,{node:j,onClose:()=>r(null),renderDetails:d=>d.id===k.id?e.jsx(P,{prepend:e.jsx(z,{value:y,onChange:u}),items:[{id:"groups",title:"Groups",body:e.jsx(H,{groups:o,onChange:s,sources:A})},{id:"settings",title:"Settings",body:e.jsx(F,{value:a,onChange:p})}]}):e.jsx(X,{node:d,onSelect:x=>r({type:"node",id:x})})})})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
      query: "user",
      color: "#f5c14a"
    }, {
      id: "core",
      name: "Core",
      query: "core",
      color: "#a8d8a8"
    }, {
      id: "project",
      name: "Project",
      query: "project",
      color: "#cbb6e5"
    }, {
      id: "crm",
      name: "CRM",
      query: "crm",
      color: "#f4a8a8"
    }, {
      id: "daily",
      name: "Daily",
      query: "daily",
      color: "#fbb6ce"
    }, {
      id: "balance",
      name: "Balance",
      query: "balance",
      color: "#8db8e8"
    }, {
      id: "commerce",
      name: "Commerce",
      query: "commerce",
      color: "#6ee7b7"
    }]);
    const [setting, setSetting] = useState<GraphSideSettingValue>({
      nodeSize: 1,
      textSize: 1,
      lineSize: 1,
      showTags: false,
      repulsion: 1500,
      linkDistance: 70
    });
    const [search, setSearch] = useState("");
    const [playing, setPlaying] = useState(false);
    // Platform sources exposed to GraphSideGroup. Lowercase by convention
    // so they match the input casing as the user types.
    const nodeSources = useMemo(() => ["apps", "account", "crm", "daily", "balance", "projectify"], []);
    // Default group matching: substring-search the group's \`query\` (falling
    // back to \`name\` if empty) across each node's fields in priority order —
    // Title (label) > Tags > Description (summary) > Content (markdown). The
    // highest-priority field that any group matches wins, breaking ties by
    // group list order. Known operator prefixes (\`source:\`, \`name:\`,
    // \`description:\`, \`content:\`) are stripped before matching so picking a
    // value from the popover Just Works; the structured per-field parser
    // ships in a follow-up PR.
    const colors = useMemo(() => {
      const stripOperator = (q: string) => q.replace(/^(?:source|name|description|content):\\s*/i, "");
      const resolve = (n: GraphNode): string | undefined => {
        const d = NODE_DETAILS[n.id];
        const fieldsByPriority = [n.label, n.tag, d?.summary, d?.content];
        for (const field of fieldsByPriority) {
          if (!field) continue;
          const f = field.toLowerCase();
          for (const g of groups) {
            const raw = g.query?.trim() || g.name;
            const q = stripOperator(raw).trim().toLowerCase();
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
    })} nodeSize={setting.nodeSize} lineSize={setting.lineSize} showTags={setting.showTags} repulsion={setting.repulsion} linkDistance={setting.linkDistance} colors={colors} onPlaybackEnd={() => setPlaying(false)} className="border-0 bg-transparent rounded-none" />} action={<GraphAction playing={playing} onReplay={() => {
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
          body: <GraphSideGroup groups={groups} onChange={setGroups} sources={nodeSources} />
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
Latest interaction wins.`,...f.parameters?.docs?.description}}};const De=["WithGraph","WithGraphAndSettings"];export{g as WithGraph,f as WithGraphAndSettings,De as __namedExportsOrder,je as default};
