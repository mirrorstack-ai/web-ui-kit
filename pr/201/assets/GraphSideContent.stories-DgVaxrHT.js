import{j as e}from"./iframe-C7iRhLca.js";import{G as s}from"./GraphSideContent-CpdR0XmE.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-BgVWcDFo.js";import"./styles-B5wKabRy.js";const m={title:"UI/Graph/GraphSide/GraphSideContent",component:s,decorators:[i=>e.jsx("div",{style:{width:260},children:e.jsx(i,{})})]},t={args:{items:[{id:"summary",title:"Summary",body:e.jsx("p",{children:"The root identity. Owns workspace settings, identity, and security configuration for everything below."})},{id:"activity",title:"Recent activity",body:e.jsxs("ul",{className:"list-disc pl-4 flex flex-col gap-1",children:[e.jsx("li",{children:"Updated profile photo"}),e.jsx("li",{children:"Connected Stripe account"}),e.jsx("li",{children:"Joined Projectify"})]})},{id:"metadata",title:"Metadata",body:e.jsxs("dl",{className:"flex flex-col gap-1",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("dt",{children:"Created"}),e.jsx("dd",{children:"2025-08-14"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("dt",{children:"Owner"}),e.jsx("dd",{children:"you"})]})]})}]}},n={args:{items:[{id:"only",title:"Summary",body:e.jsx("p",{children:"Only one section — always open, no toggle."})}]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "summary",
      title: "Summary",
      body: <p>
            The root identity. Owns workspace settings, identity, and
            security configuration for everything below.
          </p>
    }, {
      id: "activity",
      title: "Recent activity",
      body: <ul className="list-disc pl-4 flex flex-col gap-1">
            <li>Updated profile photo</li>
            <li>Connected Stripe account</li>
            <li>Joined Projectify</li>
          </ul>
    }, {
      id: "metadata",
      title: "Metadata",
      body: <dl className="flex flex-col gap-1">
            <div className="flex justify-between">
              <dt>Created</dt>
              <dd>2025-08-14</dd>
            </div>
            <div className="flex justify-between">
              <dt>Owner</dt>
              <dd>you</dd>
            </div>
          </dl>
    }]
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: "only",
      title: "Summary",
      body: <p>Only one section — always open, no toggle.</p>
    }]
  }
}`,...n.parameters?.docs?.source}}};const p=["Default","SingleItemAlwaysOpen"];export{t as Default,n as SingleItemAlwaysOpen,p as __namedExportsOrder,m as default};
