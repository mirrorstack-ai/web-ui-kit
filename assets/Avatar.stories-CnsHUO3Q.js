import{r as I,j as e}from"./iframe-BaZbWL6_.js";import{c as r}from"./cn-IyxL_b2c.js";import{I as T}from"./Icon-ChQrgOs5.js";import{P as A}from"./Progress-pc1HZXYD.js";import"./preload-helper-PPVm8Dsz.js";const C={sm:{container:"w-8 h-8",text:"text-xs",badge:"w-5 h-5",badgeIcon:12},md:{container:"w-10 h-10",text:"text-sm",badge:"w-6 h-6",badgeIcon:12},lg:{container:"w-16 h-16",text:"text-xl",badge:"w-6 h-6",badgeIcon:14},xl:{container:"w-20 h-20",text:"text-2xl",badge:"w-7 h-7",badgeIcon:14}};function g({src:a,fallback:b="U",size:v="md",editable:t=!1,onFileSelect:y,accept:h="image/jpeg,image/png,image/gif,image/webp",square:z=!1,overlay:p,className:j}){const n=I.useRef(null),s=C[v],w=b.charAt(0).toUpperCase(),i=z?t?"rounded-2xl rounded-br-3xl":"rounded-2xl":"rounded-full",S=()=>{t&&n.current?.click()},q=N=>{const x=N.target.files?.[0];x&&y?.(x),n.current&&(n.current.value="")},k=!p,f=a?e.jsx("img",{src:a,alt:"",className:r(s.container,i,"object-cover border-2 border-primary")}):e.jsx("div",{className:r(s.container,i,"bg-primary/20 flex items-center justify-center border-2 border-primary"),children:k&&e.jsx("span",{className:r("font-bold text-primary",s.text),children:w})});return e.jsxs("div",{className:r("relative inline-flex shrink-0",j),children:[t?e.jsxs("button",{type:"button",onClick:S,className:r("relative cursor-pointer p-1 -m-1 hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",i),children:[f,p?e.jsx("div",{className:r("absolute inset-1 flex items-center justify-center",i),children:p}):e.jsx("div",{className:r(s.badge,"absolute bottom-0.5 right-0.5 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-surface-container-low"),children:e.jsx(T,{name:"edit",size:s.badgeIcon,className:"text-on-primary"})})]}):f,t&&e.jsx("input",{ref:n,type:"file",accept:h,onChange:q,className:"hidden"})]})}g.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},fallback:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"U"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onFileSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""},accept:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"image/jpeg,image/png,image/gif,image/webp"',computed:!1}},square:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},overlay:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const R={title:"UI/Media/Avatar",component:g,args:{fallback:"A",size:"lg"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},fallback:{control:"text"},src:{control:"text"},editable:{control:"boolean"},square:{control:"boolean"}}},l={},o={render:()=>e.jsx("div",{className:"flex items-center gap-4",children:["sm","md","lg","xl"].map(a=>e.jsx(g,{size:a,fallback:"M"},a))})},c={args:{src:"https://i.pravatar.cc/150?img=12",size:"xl"}},m={args:{size:"xl",editable:!0,fallback:"J",onFileSelect:a=>console.log("Selected:",a.name)}},d={args:{square:!0,size:"xl",fallback:"S"}},u={args:{size:"xl",editable:!0,overlay:e.jsx(A,{type:"circular",variant:"wave",size:"sm",color:"primary"})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <Avatar key={size} size={size} fallback="M" />)}
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    size: "xl"
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    fallback: "J",
    onFileSelect: file => console.log("Selected:", file.name)
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    square: true,
    size: "xl",
    fallback: "S"
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: "xl",
    editable: true,
    overlay: <Progress type="circular" variant="wave" size="sm" color="primary" />
  }
}`,...u.parameters?.docs?.source}}};const U=["Playground","Sizes","WithImage","Editable","Square","WithOverlay"];export{m as Editable,l as Playground,o as Sizes,d as Square,c as WithImage,u as WithOverlay,U as __namedExportsOrder,R as default};
