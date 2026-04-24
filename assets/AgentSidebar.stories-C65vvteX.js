import{r as l,j as e}from"./iframe-D6lUda_s.js";import{A as a,a as t}from"./AgentSidebarInput-308AbW8E.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./IconButton-y763FNxX.js";import"./Progress-mIOiYwn1.js";import"./Icon-Bq9Gmmjq.js";import"./button-styles-DvQkePbc.js";import"./Notch-Fm-n_djO.js";const S={title:"UI/Surfaces/AgentSidebar",decorators:[o=>e.jsx("div",{className:"h-[500px] w-[400px] rounded-2xl overflow-hidden flex flex-col",children:e.jsx(o,{})})]},s={render:()=>{const[o,d]=l.useState(400);return e.jsx("div",{className:"bg-surface-container",children:e.jsx(a,{sidebarWidth:o,onToggleCollapse:()=>d(o<=350?600:350),onClose:()=>console.log("close")})})}},n={render:()=>e.jsx("div",{className:"mt-auto bg-on-background rounded-b-2xl",children:e.jsx(t,{onSend:o=>console.log("Send:",o),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})})},r={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(a,{sidebarWidth:400,onToggleCollapse:()=>{},onClose:()=>{}}),e.jsxs("div",{className:"flex-1 bg-on-background rounded-2xl flex flex-col",children:[e.jsx("div",{className:"flex-1 p-4 text-inverse-on-surface text-sm",children:"Chat messages would appear here..."}),e.jsx(t,{onSend:o=>console.log("Send:",o),onAttachFile:()=>console.log("attach"),onMic:()=>console.log("mic")})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState(400);
    return <div className="bg-surface-container">
        <AgentSidebarHeader sidebarWidth={width} onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)} onClose={() => console.log("close")} />
      </div>;
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
    </div>
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <AgentSidebarHeader sidebarWidth={400} onToggleCollapse={() => {}} onClose={() => {}} />
      <div className="flex-1 bg-on-background rounded-2xl flex flex-col">
        <div className="flex-1 p-4 text-inverse-on-surface text-sm">
          Chat messages would appear here...
        </div>
        <AgentSidebarInput onSend={msg => console.log("Send:", msg)} onAttachFile={() => console.log("attach")} onMic={() => console.log("mic")} />
      </div>
    </>
}`,...r.parameters?.docs?.source}}};const f=["Header","Input","Playground"];export{s as Header,n as Input,r as Playground,f as __namedExportsOrder,S as default};
