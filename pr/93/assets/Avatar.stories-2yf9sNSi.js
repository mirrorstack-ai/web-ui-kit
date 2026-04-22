import{r as q,j as e}from"./iframe-DMmrQ8-L.js";import{c as r}from"./cn-IyxL_b2c.js";import{I}from"./Icon-N2ORIbwl.js";import{P as T}from"./Progress-D8fX_64A.js";import"./preload-helper-PPVm8Dsz.js";const A={sm:{container:"w-8 h-8",text:"text-xs",badge:"w-5 h-5",badgeIcon:12},md:{container:"w-10 h-10",text:"text-sm",badge:"w-6 h-6",badgeIcon:12},lg:{container:"w-16 h-16",text:"text-xl",badge:"w-6 h-6",badgeIcon:14},xl:{container:"w-20 h-20",text:"text-2xl",badge:"w-7 h-7",badgeIcon:14}};function p({src:a,fallback:b="U",size:v="md",editable:u=!1,onFileSelect:h,accept:y="image/jpeg,image/png,image/gif,image/webp",square:z=!1,overlay:g,className:j}){const t=q.useRef(null),s=A[v],w=b.charAt(0).toUpperCase(),n=z?"rounded-2xl rounded-br-3xl":"rounded-full",S=()=>{u&&t.current?.click()},N=k=>{const x=k.target.files?.[0];x&&h?.(x),t.current&&(t.current.value="")},f=a?e.jsx("img",{src:a,alt:"",className:r(s.container,n,"object-cover border-2 border-primary")}):e.jsx("div",{className:r(s.container,n,"bg-primary/20 flex items-center justify-center border-2 border-primary"),children:e.jsx("span",{className:r("font-bold text-primary",s.text),children:w})});return e.jsxs("div",{className:r("relative inline-flex shrink-0",j),children:[u?e.jsxs("button",{type:"button",onClick:S,className:r("relative cursor-pointer p-1 -m-1 hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",n),children:[f,g?e.jsx("div",{className:r("absolute inset-1 bg-black/40 flex items-center justify-center",n),children:g}):e.jsx("div",{className:r(s.badge,"absolute bottom-0.5 right-0.5 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-surface-container-low"),children:e.jsx(I,{name:"edit",size:s.badgeIcon,className:"text-on-primary"})})]}):f,u&&e.jsx("input",{ref:t,type:"file",accept:y,onChange:N,className:"hidden"})]})}p.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},fallback:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"U"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onFileSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""},accept:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"image/jpeg,image/png,image/gif,image/webp"',computed:!1}},square:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},overlay:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const M={title:"UI/Media/Avatar",component:p,args:{fallback:"A",size:"lg"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},fallback:{control:"text"},src:{control:"text"},editable:{control:"boolean"},square:{control:"boolean"}}},l={},i={render:()=>e.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(a=>e.jsx(p,{size:a,fallback:"M"},a))})},o={args:{src:"https://i.pravatar.cc/150?img=12",size:"xl"}},c={args:{size:"xl",editable:!0,fallback:"J",onFileSelect:a=>console.log("Selected:",a.name)}},m={args:{square:!0,size:"xl",fallback:"S"}},d={args:{size:"xl",editable:!0,overlay:e.jsx(T,{type:"circular",variant:"wave",size:"sm",color:"current",className:"text-white"})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} fallback="M" />)}
    </div>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    size: "xl"
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    fallback: "J",
    onFileSelect: file => console.log("Selected:", file.name)
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    square: true,
    size: "xl",
    fallback: "S"
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    overlay: <Progress type="circular" variant="wave" size="sm" color="current" className="text-white" />
  }
}`,...d.parameters?.docs?.source}}};const R=["Playground","Sizes","WithImage","Editable","Square","WithOverlay"];export{c as Editable,l as Playground,i as Sizes,m as Square,o as WithImage,d as WithOverlay,R as __namedExportsOrder,M as default};
