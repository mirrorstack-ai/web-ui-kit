import{j as n,r as l}from"./iframe-CtFR0rbz.js";import{I as c}from"./IconButton-BZY3JhaX.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-Drw2E_7X.js";import"./Icon-YR_kJbKi.js";import"./button-styles-DvQkePbc.js";const d={auto:"brightness_auto",light:"light_mode",dark:"dark_mode"},h={auto:"light",light:"dark",dark:"auto"},g={auto:"Switch to light mode",light:"Switch to dark mode",dark:"Switch to auto mode"};function a({theme:e,onToggle:t,variant:s="tonal",color:m="secondary",size:i="md",...u}){return n.jsx(c,{icon:d[e],variant:s,color:m,size:i,onClick:t,"aria-label":g[e],...u})}a.next=e=>h[e];a.__docgenInfo={description:"",methods:[{name:"next",docblock:"Get the next theme in the cycle: auto -> light -> dark -> auto",modifiers:["static"],params:[{name:"current",optional:!1,type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}],alias:"Theme"}}],returns:{type:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]}},description:"Get the next theme in the cycle: auto -> light -> dark -> auto"}],displayName:"ThemeToggle",props:{theme:{required:!0,tsType:{name:"union",raw:'"auto" | "light" | "dark"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'}]},description:""},onToggle:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},variant:{defaultValue:{value:'"tonal"',computed:!1},required:!1},color:{defaultValue:{value:'"secondary"',computed:!1},required:!1},size:{defaultValue:{value:'"md"',computed:!1},required:!1}},composes:["Omit"]};const I={title:"UI/Actions/ThemeToggle",component:a,argTypes:{theme:{control:"select",options:["auto","light","dark"]}}},r={args:{theme:"auto",onToggle:()=>{}}};function p(e){const t=window.matchMedia("(prefers-color-scheme: dark)").matches,s=e==="dark"||e==="auto"&&t;document.documentElement.classList.toggle("dark",s)}const o={render:()=>{const[e,t]=l.useState("auto");return l.useEffect(()=>{p(e)},[e]),n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx(a,{theme:e,onToggle:()=>t(a.next(e))}),n.jsxs("span",{className:"text-sm text-on-surface-variant",children:["Current: ",e]})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    theme: "auto",
    onToggle: () => {}
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [theme, setTheme] = useState<Theme>("auto");
    useEffect(() => {
      applyTheme(theme);
    }, [theme]);
    return <div className="flex items-center gap-4">
        <ThemeToggle theme={theme} onToggle={() => setTheme(ThemeToggle.next(theme))} />
        <span className="text-sm text-on-surface-variant">
          Current: {theme}
        </span>
      </div>;
  }
}`,...o.parameters?.docs?.source}}};const E=["Playground","Interactive"];export{o as Interactive,r as Playground,E as __namedExportsOrder,I as default};
