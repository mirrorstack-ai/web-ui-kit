import{j as o,r as u}from"./iframe-C3ckz4qB.js";import{I as c}from"./IconButton-CWXGE3Bu.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-DedlOdHA.js";import"./Icon-CA-kwr8B.js";import"./button-styles-DvQkePbc.js";const d={auto:"brightness_auto",light:"light_mode",dark:"dark_mode"},g={auto:"light",light:"dark",dark:"auto"},h={auto:"Switch to light mode",light:"Switch to dark mode",dark:"Switch to auto mode"};function t({theme:e,onToggle:n,variant:s="tonal",color:l="secondary",size:i="md",...m}){return o.jsx(c,{icon:d[e],variant:s,color:l,size:i,onClick:n,"aria-label":h[e],...m})}t.next=e=>g[e];t.__docgenInfo={description:"",methods:[{name:"next",docblock:"Get the next theme in the cycle: auto -> light -> dark -> auto",modifiers:["static"],params:[{name:"current",optional:!1,type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}],alias:"Theme"}}],returns:{type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]}},description:"Get the next theme in the cycle: auto -> light -> dark -> auto"}],displayName:"ThemeToggle",props:{theme:{required:!0,tsType:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]},description:""},onToggle:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},variant:{defaultValue:{value:'"tonal"',computed:!1},required:!1},color:{defaultValue:{value:'"secondary"',computed:!1},required:!1},size:{defaultValue:{value:'"md"',computed:!1},required:!1}},composes:["Omit"]};const I={title:"UI/Actions/ThemeToggle",component:t,argTypes:{theme:{control:"select",options:["auto","light","dark"]}}},a={args:{theme:"auto",onToggle:()=>{}}},r={render:()=>{const[e,n]=u.useState("auto");return o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx(t,{theme:e,onToggle:()=>n(t.next(e))}),o.jsxs("span",{className:"text-sm text-on-surface-variant",children:["Current: ",e]})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    theme: "auto",
    onToggle: () => {}
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [theme, setTheme] = useState<Theme>("auto");
    return <div className="flex items-center gap-4">
        <ThemeToggle theme={theme} onToggle={() => setTheme(ThemeToggle.next(theme))} />
        <span className="text-sm text-on-surface-variant">
          Current: {theme}
        </span>
      </div>;
  }
}`,...r.parameters?.docs?.source}}};const w=["Playground","Interactive"];export{r as Interactive,a as Playground,w as __namedExportsOrder,I as default};
