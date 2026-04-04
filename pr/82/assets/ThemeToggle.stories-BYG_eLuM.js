import{j as e,r as p}from"./iframe-DmroQZ6i.js";import{c as f}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const b={auto:"brightness_auto",light:"light_mode",dark:"dark_mode"},y={auto:"Auto theme",light:"Light theme",dark:"Dark theme"},x=["auto","light","dark"];function h(a){const s=x.indexOf(a);return x[(s+1)%x.length]}const N={filled:{primary:"bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",secondary:"bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",tertiary:"bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container",error:"bg-error text-on-error hover:bg-error-container hover:text-on-error-container",warning:"bg-warning text-on-warning hover:bg-warning-container hover:text-on-warning-container"},tonal:{primary:"bg-primary-container text-on-primary-container hover:bg-primary/20",secondary:"bg-secondary-container text-on-secondary-container hover:bg-secondary/20",tertiary:"bg-tertiary-container text-on-tertiary-container hover:bg-tertiary/20",error:"bg-error-container text-on-error-container hover:bg-error/20",warning:"bg-warning-container text-on-warning-container hover:bg-warning/20"},outline:{primary:"border border-outline-variant text-primary hover:bg-primary/8",secondary:"border border-outline-variant text-secondary hover:bg-secondary/8",tertiary:"border border-outline-variant text-tertiary hover:bg-tertiary/8",error:"border border-error/50 text-error hover:bg-error/8",warning:"border border-warning/50 text-warning hover:bg-warning/8"},text:{primary:"text-primary hover:bg-primary/8",secondary:"text-secondary hover:bg-secondary/8",tertiary:"text-tertiary hover:bg-tertiary/8",error:"text-error hover:bg-error/8",warning:"text-warning hover:bg-warning/8"}},w={sm:{button:"h-8 w-8",icon:18},md:{button:"h-10 w-10",icon:22},lg:{button:"h-12 w-12",icon:26}};function i({theme:a,onChangeTheme:s,variant:r="tonal",color:o="secondary",size:n="md",className:t,...u}){const m=h(a),{button:g,icon:v}=w[n];return e.jsx("button",{type:"button","aria-label":`${y[a]} — click to switch to ${m}`,onClick:()=>s(m),className:f("inline-flex cursor-pointer items-center justify-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50",N[r][o],g,t),...u,children:e.jsx("span",{className:"material-symbols-rounded","aria-hidden":"true",style:{fontSize:v},children:b[a]})})}i.next=h;i.__docgenInfo={description:"",methods:[{name:"next",docblock:"Static helper: returns the next theme in the auto → light → dark cycle",modifiers:["static"],params:[{name:"current",optional:!1,type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}],alias:"ThemeMode"}}],returns:{type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]}},description:"Static helper: returns the next theme in the auto → light → dark cycle"}],displayName:"ThemeToggle",props:{theme:{required:!0,tsType:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]},description:"Current theme mode"},onChangeTheme:{required:!0,tsType:{name:"signature",type:"function",raw:"(next: ThemeMode) => void",signature:{arguments:[{type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]},name:"next"}],return:{name:"void"}}},description:"Callback when the toggle is clicked"},variant:{required:!1,tsType:{name:"union",raw:'"filled" | "tonal" | "outline" | "text"',elements:[{name:"literal",value:'"filled"'},{name:"literal",value:'"tonal"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"text"'}]},description:"Button variant",defaultValue:{value:'"tonal"',computed:!1}},color:{required:!1,tsType:{name:"union",raw:`| "primary"
| "secondary"
| "tertiary"
| "error"
| "warning"`,elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"tertiary"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'}]},description:"Button color",defaultValue:{value:'"secondary"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"Button size",defaultValue:{value:'"md"',computed:!1}}},composes:["Omit"]};const S={title:"UI/Actions/ThemeToggle",component:i,args:{theme:"auto",variant:"tonal",color:"secondary",size:"md"},argTypes:{theme:{control:"select",options:["auto","light","dark"]},variant:{control:"select",options:["filled","tonal","outline","text"]},color:{control:"select",options:["primary","secondary","tertiary"]},size:{control:"select",options:["sm","md","lg"]}}},l={render:a=>{function s(){const[r,o]=p.useState("auto");return e.jsxs("div",{className:"w-80 rounded-2xl bg-surface-container shadow-lg",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-outline-variant/30 px-5 py-4",children:[e.jsx("p",{className:"text-sm font-semibold text-on-surface",children:"Theme"}),e.jsx(i,{...a,theme:r,onChangeTheme:o})]}),e.jsx("div",{className:"flex gap-2 p-4",children:["auto","light","dark"].map(n=>e.jsxs("button",{type:"button",onClick:()=>o(n),className:`flex flex-1 cursor-pointer flex-col items-center gap-2.5 rounded-xl py-4 transition-all ${r===n?"bg-primary/10 ring-2 ring-primary":"bg-surface ring-1 ring-outline-variant/40 hover:ring-outline-variant"}`,children:[e.jsx("span",{className:`material-symbols-rounded ${r===n?"text-primary":"text-on-surface-variant"}`,"aria-hidden":"true",style:{fontSize:24},children:n==="auto"?"brightness_auto":n==="light"?"light_mode":"dark_mode"}),e.jsx("span",{className:`text-xs font-semibold ${r===n?"text-primary":"text-on-surface-variant"}`,children:n==="auto"?"Auto":n==="light"?"Light":"Dark"})]},n))}),e.jsx("div",{className:"border-t border-outline-variant/30 px-5 py-3",children:e.jsxs("p",{className:"text-xs text-on-surface-variant",children:["Currently:"," ",e.jsx("span",{className:"font-medium capitalize text-on-surface",children:r})]})})]})}return e.jsx(s,{})}},d={render:a=>{function s(){const[r,o]=p.useState("auto"),n=[{mode:"light",label:"Light",preview:e.jsxs("div",{className:"flex h-24 flex-col overflow-hidden rounded-lg border border-outline-variant/60 bg-white",children:[e.jsx("div",{className:"h-5 bg-[#e8e8e8]"}),e.jsxs("div",{className:"flex flex-1 gap-1.5 p-2",children:[e.jsx("div",{className:"w-6 rounded bg-[#e0e0e0]"}),e.jsxs("div",{className:"flex flex-1 flex-col gap-1",children:[e.jsx("div",{className:"h-2 w-3/4 rounded-sm bg-[#d0d0d0]"}),e.jsx("div",{className:"h-2 w-1/2 rounded-sm bg-[#e0e0e0]"})]})]})]})},{mode:"dark",label:"Dark",preview:e.jsxs("div",{className:"flex h-24 flex-col overflow-hidden rounded-lg border border-outline-variant/60 bg-[#1e1e1e]",children:[e.jsx("div",{className:"h-5 bg-[#2d2d2d]"}),e.jsxs("div",{className:"flex flex-1 gap-1.5 p-2",children:[e.jsx("div",{className:"w-6 rounded bg-[#383838]"}),e.jsxs("div",{className:"flex flex-1 flex-col gap-1",children:[e.jsx("div",{className:"h-2 w-3/4 rounded-sm bg-[#484848]"}),e.jsx("div",{className:"h-2 w-1/2 rounded-sm bg-[#383838]"})]})]})]})},{mode:"auto",label:"System",preview:e.jsxs("div",{className:"flex h-24 overflow-hidden rounded-lg border border-outline-variant/60",children:[e.jsxs("div",{className:"flex flex-1 flex-col bg-white",children:[e.jsx("div",{className:"h-5 bg-[#e8e8e8]"}),e.jsxs("div",{className:"flex flex-1 gap-1 p-1.5",children:[e.jsx("div",{className:"w-4 rounded-sm bg-[#e0e0e0]"}),e.jsxs("div",{className:"flex flex-1 flex-col gap-1",children:[e.jsx("div",{className:"h-1.5 w-3/4 rounded-sm bg-[#d0d0d0]"}),e.jsx("div",{className:"h-1.5 w-1/2 rounded-sm bg-[#e0e0e0]"})]})]})]}),e.jsxs("div",{className:"flex flex-1 flex-col bg-[#1e1e1e]",children:[e.jsx("div",{className:"h-5 bg-[#2d2d2d]"}),e.jsxs("div",{className:"flex flex-1 gap-1 p-1.5",children:[e.jsx("div",{className:"w-4 rounded-sm bg-[#383838]"}),e.jsxs("div",{className:"flex flex-1 flex-col gap-1",children:[e.jsx("div",{className:"h-1.5 w-3/4 rounded-sm bg-[#484848]"}),e.jsx("div",{className:"h-1.5 w-1/2 rounded-sm bg-[#383838]"})]})]})]})]})}];return e.jsxs("div",{className:"w-[480px] rounded-2xl bg-surface-container p-6 shadow-lg",children:[e.jsx("h3",{className:"text-base font-semibold text-on-surface",children:"Appearance"}),e.jsx("p",{className:"mt-1 text-xs text-on-surface-variant",children:"Choose how the interface looks to you"}),e.jsx("div",{className:"mt-5 grid grid-cols-3 gap-3",children:n.map(({mode:t,label:u,preview:m})=>e.jsxs("button",{type:"button",onClick:()=>o(t),className:`group cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${r===t?"border-primary shadow-md":"border-transparent hover:border-outline-variant"}`,children:[e.jsx("div",{className:"p-2 pb-0",children:m}),e.jsxs("div",{className:"flex items-center justify-center gap-2 py-3",children:[e.jsx(i,{...a,theme:t,onChangeTheme:()=>o(t),variant:"text",size:"sm"}),e.jsx("span",{className:`text-sm font-medium ${r===t?"text-primary":"text-on-surface"}`,children:u})]})]},t))})]})}return e.jsx(s,{})}},c={render:a=>{function s(){const[r,o]=p.useState("auto");return e.jsxs("div",{className:"w-[280px] overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-outline-variant/20",children:[e.jsx("div",{className:"bg-gradient-to-br from-primary/10 via-surface-container to-tertiary/5 p-5",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-md",children:"JD"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-sm font-semibold text-on-surface",children:"Jane Doe"}),e.jsx("p",{className:"truncate text-xs text-on-surface-variant",children:"jane@mirrorstack.io"})]})]})}),e.jsxs("div",{className:"flex flex-col px-2 py-1.5",children:[[{icon:"person",label:"Profile"},{icon:"settings",label:"Settings"},{icon:"notifications",label:"Notifications"}].map(({icon:n,label:t})=>e.jsxs("div",{className:"flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-on-surface/5",children:[e.jsx("span",{className:"material-symbols-rounded text-on-surface-variant","aria-hidden":"true",style:{fontSize:20},children:n}),e.jsx("span",{className:"text-sm text-on-surface",children:t})]},t)),e.jsxs("div",{className:"flex items-center justify-between rounded-xl px-3 py-2.5",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"material-symbols-rounded text-on-surface-variant","aria-hidden":"true",style:{fontSize:20},children:"contrast"}),e.jsx("span",{className:"text-sm text-on-surface",children:"Theme"})]}),e.jsx(i,{...a,theme:r,onChangeTheme:o,variant:"outline",size:"sm"})]})]}),e.jsx("div",{className:"border-t border-outline-variant/30 px-2 py-1.5",children:e.jsxs("div",{className:"flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-error transition-colors hover:bg-error/5",children:[e.jsx("span",{className:"material-symbols-rounded","aria-hidden":"true",style:{fontSize:20},children:"logout"}),e.jsx("span",{className:"text-sm font-medium",children:"Sign out"})]})})]})}return e.jsx(s,{})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => {
    function PlaygroundDemo() {
      const [theme, setTheme] = useState<ThemeMode>("auto");
      return <div className="w-80 rounded-2xl bg-surface-container shadow-lg">
          <div className="flex items-center justify-between border-b border-outline-variant/30 px-5 py-4">
            <p className="text-sm font-semibold text-on-surface">Theme</p>
            <ThemeToggle {...args} theme={theme} onChangeTheme={setTheme} />
          </div>

          <div className="flex gap-2 p-4">
            {(["auto", "light", "dark"] as const).map(t => <button key={t} type="button" onClick={() => setTheme(t)} className={\`flex flex-1 cursor-pointer flex-col items-center gap-2.5 rounded-xl py-4 transition-all \${theme === t ? "bg-primary/10 ring-2 ring-primary" : "bg-surface ring-1 ring-outline-variant/40 hover:ring-outline-variant"}\`}>
                <span className={\`material-symbols-rounded \${theme === t ? "text-primary" : "text-on-surface-variant"}\`} aria-hidden="true" style={{
              fontSize: 24
            }}>
                  {t === "auto" ? "brightness_auto" : t === "light" ? "light_mode" : "dark_mode"}
                </span>
                <span className={\`text-xs font-semibold \${theme === t ? "text-primary" : "text-on-surface-variant"}\`}>
                  {t === "auto" ? "Auto" : t === "light" ? "Light" : "Dark"}
                </span>
              </button>)}
          </div>

          <div className="border-t border-outline-variant/30 px-5 py-3">
            <p className="text-xs text-on-surface-variant">
              Currently:{" "}
              <span className="font-medium capitalize text-on-surface">
                {theme}
              </span>
            </p>
          </div>
        </div>;
    }
    return <PlaygroundDemo />;
  }
}`,...l.parameters?.docs?.source},description:{story:"Interactive playground — click to cycle through auto → light → dark",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    function PreferenceDemo() {
      const [theme, setTheme] = useState<ThemeMode>("auto");
      const options = [{
        mode: "light" as const,
        label: "Light",
        preview: <div className="flex h-24 flex-col overflow-hidden rounded-lg border border-outline-variant/60 bg-white">
              <div className="h-5 bg-[#e8e8e8]" />
              <div className="flex flex-1 gap-1.5 p-2">
                <div className="w-6 rounded bg-[#e0e0e0]" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-2 w-3/4 rounded-sm bg-[#d0d0d0]" />
                  <div className="h-2 w-1/2 rounded-sm bg-[#e0e0e0]" />
                </div>
              </div>
            </div>
      }, {
        mode: "dark" as const,
        label: "Dark",
        preview: <div className="flex h-24 flex-col overflow-hidden rounded-lg border border-outline-variant/60 bg-[#1e1e1e]">
              <div className="h-5 bg-[#2d2d2d]" />
              <div className="flex flex-1 gap-1.5 p-2">
                <div className="w-6 rounded bg-[#383838]" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-2 w-3/4 rounded-sm bg-[#484848]" />
                  <div className="h-2 w-1/2 rounded-sm bg-[#383838]" />
                </div>
              </div>
            </div>
      }, {
        mode: "auto" as const,
        label: "System",
        preview: <div className="flex h-24 overflow-hidden rounded-lg border border-outline-variant/60">
              <div className="flex flex-1 flex-col bg-white">
                <div className="h-5 bg-[#e8e8e8]" />
                <div className="flex flex-1 gap-1 p-1.5">
                  <div className="w-4 rounded-sm bg-[#e0e0e0]" />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="h-1.5 w-3/4 rounded-sm bg-[#d0d0d0]" />
                    <div className="h-1.5 w-1/2 rounded-sm bg-[#e0e0e0]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col bg-[#1e1e1e]">
                <div className="h-5 bg-[#2d2d2d]" />
                <div className="flex flex-1 gap-1 p-1.5">
                  <div className="w-4 rounded-sm bg-[#383838]" />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="h-1.5 w-3/4 rounded-sm bg-[#484848]" />
                    <div className="h-1.5 w-1/2 rounded-sm bg-[#383838]" />
                  </div>
                </div>
              </div>
            </div>
      }];
      return <div className="w-[480px] rounded-2xl bg-surface-container p-6 shadow-lg">
          <h3 className="text-base font-semibold text-on-surface">
            Appearance
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant">
            Choose how the interface looks to you
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {options.map(({
            mode,
            label,
            preview
          }) => <button key={mode} type="button" onClick={() => setTheme(mode)} className={\`group cursor-pointer overflow-hidden rounded-xl border-2 transition-all \${theme === mode ? "border-primary shadow-md" : "border-transparent hover:border-outline-variant"}\`}>
                <div className="p-2 pb-0">{preview}</div>
                <div className="flex items-center justify-center gap-2 py-3">
                  <ThemeToggle {...args} theme={mode} onChangeTheme={() => setTheme(mode)} variant="text" size="sm" />
                  <span className={\`text-sm font-medium \${theme === mode ? "text-primary" : "text-on-surface"}\`}>
                    {label}
                  </span>
                </div>
              </button>)}
          </div>
        </div>;
    }
    return <PreferenceDemo />;
  }
}`,...d.parameters?.docs?.source},description:{story:"Theme preference cards — select your preferred appearance",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => {
    function DropdownDemo() {
      const [theme, setTheme] = useState<ThemeMode>("auto");
      return <div className="w-[280px] overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-outline-variant/20">
          {/* User header with gradient */}
          <div className="bg-gradient-to-br from-primary/10 via-surface-container to-tertiary/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-md">
                JD
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-on-surface">
                  Jane Doe
                </p>
                <p className="truncate text-xs text-on-surface-variant">
                  jane@mirrorstack.io
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col px-2 py-1.5">
            {[{
            icon: "person",
            label: "Profile"
          }, {
            icon: "settings",
            label: "Settings"
          }, {
            icon: "notifications",
            label: "Notifications"
          }].map(({
            icon,
            label
          }) => <div key={label} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-on-surface/5">
                <span className="material-symbols-rounded text-on-surface-variant" aria-hidden="true" style={{
              fontSize: 20
            }}>
                  {icon}
                </span>
                <span className="text-sm text-on-surface">{label}</span>
              </div>)}

            {/* Theme row */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded text-on-surface-variant" aria-hidden="true" style={{
                fontSize: 20
              }}>
                  contrast
                </span>
                <span className="text-sm text-on-surface">Theme</span>
              </div>
              <ThemeToggle {...args} theme={theme} onChangeTheme={setTheme} variant="outline" size="sm" />
            </div>
          </div>

          {/* Sign out */}
          <div className="border-t border-outline-variant/30 px-2 py-1.5">
            <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-error transition-colors hover:bg-error/5">
              <span className="material-symbols-rounded" aria-hidden="true" style={{
              fontSize: 20
            }}>
                logout
              </span>
              <span className="text-sm font-medium">Sign out</span>
            </div>
          </div>
        </div>;
    }
    return <DropdownDemo />;
  }
}`,...c.parameters?.docs?.source},description:{story:"User profile dropdown with theme toggle",...c.parameters?.docs?.description}}};const D=["Playground","ThemePreference","ProfileDropdown"];export{l as Playground,c as ProfileDropdown,d as ThemePreference,D as __namedExportsOrder,S as default};
