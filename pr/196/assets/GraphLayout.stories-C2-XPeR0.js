import{j as e,r as p}from"./iframe-DsRsOowR.js";import{G as r,a as l}from"./GraphSide-BqPBXc6m.js";import{G as a}from"./GraphAction-BOpofeUq.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-CWU9j2Oq.js";import"./Progress-DJOoPUJa.js";import"./Icon-DeyidJ_P.js";import"./button-styles-DvQkePbc.js";const y={title:"Layout/Graph",component:r,decorators:[n=>e.jsx("div",{className:"w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant",children:e.jsx(n,{})})]},s={args:{action:e.jsx(a,{onReplay:()=>{},onFit:()=>{},onSettings:()=>{}})}},c={id:"settings",label:"Graph settings",tag:"configuration"},t={render:()=>{const[n,o]=p.useState(!1);return e.jsx(r,{action:e.jsx(a,{onReplay:()=>{},onFit:()=>{},onSettings:()=>o(i=>!i)}),side:e.jsx(l,{node:n?c:null,onClose:()=>o(!1),renderDetails:()=>e.jsxs("div",{className:"flex flex-col gap-3 text-sm text-on-surface",children:[e.jsx("p",{children:"This panel is opened by the settings toolbar button."}),e.jsx("p",{className:"text-on-surface-variant text-xs",children:"Real consumers will plug their graph settings form in here."})]})})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    action: <GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => {}} />
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <GraphLayout action={<GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => setOpen(v => !v)} />} side={<GraphSide node={open ? SETTINGS_NODE : null} onClose={() => setOpen(false)} renderDetails={() => <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>This panel is opened by the settings toolbar button.</p>
                <p className="text-on-surface-variant text-xs">
                  Real consumers will plug their graph settings form in here.
                </p>
              </div>} />} />;
  }
}`,...t.parameters?.docs?.source},description:{story:"Click the settings (last) icon button to toggle the side panel open.",...t.parameters?.docs?.description}}};const b=["ActionOnly","SettingsTogglesSide"];export{s as ActionOnly,t as SettingsTogglesSide,b as __namedExportsOrder,y as default};
