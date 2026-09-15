import{j as e}from"./iframe-CZGGZTq5.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Foundations/Native controls",parameters:{docs:{description:{component:"Controls the browser paints rather than the kit. They follow `color-scheme` in theme.css, not our tokens — check them in both themes."}}}},s="rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-sm text-on-surface",a={render:()=>e.jsxs("div",{className:"max-w-xl space-y-4 p-4",children:[e.jsx("p",{className:"text-sm text-on-surface-variant",children:"The glyphs and popups below are drawn by the browser. Toggle the theme: they should change with it."}),e.jsxs("label",{className:"block space-y-1",children:[e.jsx("span",{className:"text-xs text-on-surface-variant",children:"datetime-local — the control the owner reported"}),e.jsx("input",{type:"datetime-local",className:`w-full ${s}`})]}),e.jsxs("label",{className:"block space-y-1",children:[e.jsx("span",{className:"text-xs text-on-surface-variant",children:"date — same indicator, same picker popup"}),e.jsx("input",{type:"date",className:`w-full ${s}`})]}),e.jsxs("label",{className:"block space-y-1",children:[e.jsx("span",{className:"text-xs text-on-surface-variant",children:"select — the popup is drawn by the browser, not by us"}),e.jsxs("select",{className:`w-full ${s}`,children:[e.jsx("option",{children:"首頁主視覺"}),e.jsx("option",{children:"課程側欄"})]})]}),e.jsxs("label",{className:"block space-y-1",children:[e.jsx("span",{className:"text-xs text-on-surface-variant",children:"number — spin buttons"}),e.jsx("input",{type:"number",defaultValue:3,className:`w-full ${s}`})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("span",{className:"text-xs text-on-surface-variant",children:"scrollbar — this one is ours (`::-webkit-scrollbar-*` in theme.css), so it follows the tokens rather than color-scheme"}),e.jsx("div",{className:`h-24 overflow-y-scroll ${s}`,children:e.jsx("div",{className:"h-64"})})]})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-xl space-y-4 p-4">
      <p className="text-sm text-on-surface-variant">
        The glyphs and popups below are drawn by the browser. Toggle the theme:
        they should change with it.
      </p>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          datetime-local — the control the owner reported
        </span>
        <input type="datetime-local" className={\`w-full \${field}\`} />
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          date — same indicator, same picker popup
        </span>
        <input type="date" className={\`w-full \${field}\`} />
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          select — the popup is drawn by the browser, not by us
        </span>
        <select className={\`w-full \${field}\`}>
          <option>首頁主視覺</option>
          <option>課程側欄</option>
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          number — spin buttons
        </span>
        <input type="number" defaultValue={3} className={\`w-full \${field}\`} />
      </label>

      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">
          scrollbar — this one is ours (\`::-webkit-scrollbar-*\` in theme.css),
          so it follows the tokens rather than color-scheme
        </span>
        <div className={\`h-24 overflow-y-scroll \${field}\`}>
          <div className="h-64" />
        </div>
      </div>
    </div>
}`,...a.parameters?.docs?.source}}};const c=["Default"];export{a as Default,c as __namedExportsOrder,l as default};
