import{r as c,j as e}from"./iframe-Duj_hu89.js";import{a as l,G as d}from"./GraphSide-kmstCgHY.js";import{B as u}from"./Button-kHPb3oft.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-qKZikU9_.js";import"./Progress-Djl6nLdw.js";import"./Icon-s0UxCqu3.js";import"./button-styles-DvQkePbc.js";const m={account:{summary:"Workspace settings, identity, security."},apps:{summary:"Installed modules in this workspace."},daily:{summary:"Daily journal — notes, mood, reflections.",lastSeen:"2026-05-14"},balance:{summary:"Finances, ledger, statements."}},o=r=>{const a=m[r.id];return a?e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("p",{className:"text-sm text-on-surface",children:a.summary}),a.lastSeen&&e.jsxs("div",{className:"text-xs text-on-surface-variant",children:["Last activity: ",a.lastSeen]})]}):e.jsx("p",{className:"text-sm text-on-surface-variant",children:"No details."})},w={title:"UI/Graph/GraphSide",component:l},p={id:"account",label:"Account",tag:"core"},n={args:{node:p,onClose:()=>{},renderDetails:o},decorators:[r=>e.jsx("div",{className:"w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl",children:e.jsx(r,{})})]},x=[{id:"account",label:"Account",tag:"core"},{id:"apps",label:"Apps",tag:"core"},{id:"daily",label:"Daily",tag:"daily"},{id:"balance",label:"Balance",tag:"balance"}],s={render:()=>{const[r,a]=c.useState(null);return e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(d,{canvas:e.jsx("div",{className:"absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6",children:x.map(t=>e.jsx(u,{variant:"outline",onClick:()=>a(i=>i?.id===t.id?null:t),children:t.label},t.id))}),side:e.jsx(l,{node:r,onClose:()=>a(null),renderDetails:o})})})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    node: SAMPLE,
    onClose: () => {},
    renderDetails
  },
  decorators: [Story => <div className="w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl">
        <Story />
      </div>]
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<GraphSideNode | null>(null);
    return <div className="w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant">
        <GraphLayout canvas={<div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6">
              {PICKABLE.map(n => <Button key={n.id} variant="outline" onClick={() => setSelected(cur => cur?.id === n.id ? null : n)}>
                  {n.label}
                </Button>)}
            </div>} side={<GraphSide node={selected} onClose={() => setSelected(null)} renderDetails={renderDetails} />} />
      </div>;
  }
}`,...s.parameters?.docs?.source}}};const G=["Standalone","InGraphLayout"];export{s as InGraphLayout,n as Standalone,G as __namedExportsOrder,w as default};
