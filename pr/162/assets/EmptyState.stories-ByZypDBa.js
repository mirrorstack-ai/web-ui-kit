import{j as e}from"./iframe-FTbIt3N-.js";import{c as m}from"./cn-IyxL_b2c.js";import{I as l}from"./Icon-ByLXQD10.js";import{B as u}from"./Button-CRtv9Occ.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-DKr5bRev.js";import"./button-styles-DvQkePbc.js";function n({icon:a,title:c,description:i,action:p,className:d}){return e.jsxs("div",{className:m("flex flex-col items-center justify-center py-16 text-center",d),children:[e.jsx(l,{name:a,size:48,className:"text-on-surface-variant mb-4"}),e.jsx("h3",{className:"text-lg font-medium text-on-surface mb-1",children:c}),i&&e.jsx("p",{className:"text-sm text-on-surface-variant max-w-sm mb-4",children:i}),p]})}n.__docgenInfo={description:"",methods:[],displayName:"EmptyState",props:{icon:{required:!0,tsType:{name:"string"},description:'Material Symbols Rounded icon name (e.g. "folder_open", "search_off")'},title:{required:!0,tsType:{name:"string"},description:"Primary heading text"},description:{required:!1,tsType:{name:"string"},description:"Optional supporting text below the title"},action:{required:!1,tsType:{name:"ReactNode"},description:"Optional action slot (e.g. a Button)"},className:{required:!1,tsType:{name:"string"},description:""}}};const b={title:"UI/Feedback/EmptyState",component:n,args:{icon:"folder_open",title:"No items yet"},argTypes:{icon:{control:"text"},title:{control:"text"},description:{control:"text"}}},t={},r={args:{icon:"search_off",title:"No results found",description:"Try adjusting your search or filters to find what you need."}},o={args:{icon:"add_circle",title:"No projects yet",description:"Get started by creating your first project.",action:e.jsx(u,{variant:"filled",children:"Create project"})}},s={args:{icon:"inbox",title:"Your inbox is empty"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "search_off",
    title: "No results found",
    description: "Try adjusting your search or filters to find what you need."
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "add_circle",
    title: "No projects yet",
    description: "Get started by creating your first project.",
    action: <Button variant="filled">Create project</Button>
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    icon: "inbox",
    title: "Your inbox is empty"
  }
}`,...s.parameters?.docs?.source}}};const _=["Playground","WithDescription","WithAction","NoDescription"];export{s as NoDescription,t as Playground,o as WithAction,r as WithDescription,_ as __namedExportsOrder,b as default};
