import{r,j as a}from"./iframe-DVc4GzdY.js";import{c as i}from"./cn-IyxL_b2c.js";import{I as U}from"./Icon-BHSs1tEE.js";import{N as F}from"./Notch-C-kPzYbt.js";import{u as Z}from"./useMenuKeyNav-C5ACwori.js";import{I as N}from"./IconButton-fQUOvre6.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-2r37a7kP.js";import"./button-styles-CZHSjrxJ.js";const $=52,J=46,Q=16,X=10,Y={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function _(e){return"type"in e&&e.type==="separator"}function w(e){return!_(e)&&!e.disabled}function j({items:e,onSelect:y,trigger:k,offset:c=0,notchWidth:H=$,notchHeight:x=J,notchRadius:q=Q,notchInverseRadius:E=X,useNotch:d=!0,placement:V="bottom",size:W="md",menuClassName:C,className:O}){const D=c<0||Object.is(c,-0),p=V==="top",f=Y[W],[s,I]=r.useState(!1),S=r.useRef(null),R=r.useRef(null),h=r.useRef(null),[T,z]=r.useState(0),[M,A]=r.useState(0),G=r.useId(),b=e.map((o,t)=>w(o)?t:-1).filter(o=>o!==-1),{activeIndex:B,setActiveIndex:u,handleKeyDown:L}=Z({itemCount:e.length,traversableIndices:b,canActivate:o=>{const t=e[o];return!!t&&w(t)},onActivate:o=>{const t=e[o];t&&w(t)&&(y(t),l())},onClose:()=>l()}),K=r.useCallback(()=>{I(!0),u(b[0]??-1)},[b,u]),l=r.useCallback(()=>{I(!1),u(-1)},[u]);return r.useEffect(()=>{if(!s)return;const o=requestAnimationFrame(()=>{R.current?.focus()}),t=n=>{S.current?.contains(n.target)||l()};return document.addEventListener("mousedown",t),()=>{cancelAnimationFrame(o),document.removeEventListener("mousedown",t)}},[s,l]),r.useLayoutEffect(()=>{!s||!h.current||(z(h.current.offsetHeight),A(h.current.offsetWidth))},[s,e.length]),a.jsxs("div",{ref:S,className:i("relative inline-block",O),children:[a.jsx("div",{className:i("relative",s&&"z-[51]"),onClick:()=>{s?l():K()},children:k}),s&&a.jsxs("div",{ref:R,id:G,role:"menu",tabIndex:-1,onKeyDown:L,className:i("absolute z-50 overflow-visible outline-none",C),style:{[p?"bottom":"top"]:d?-7:"calc(100% + 8px)",[D?"right":"left"]:d?(D?-5:-7)-Math.abs(c):-Math.abs(c),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[d&&T>0&&M>0&&a.jsx(F,{width:M,height:T,notchWidth:H,notchHeight:x,notchSide:p?"top":"bottom",notchOffset:c,radius:q,inverseRadius:E,stroke:"var(--color-primary)",strokeWidth:1.5,className:i("absolute left-0",p?"bottom-0":"top-0")}),a.jsx("div",{ref:h,className:i("relative z-10 flex flex-col gap-1 p-2",f.minW,!d&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[p?"marginBottom":"marginTop"]:d?x:0},children:e.map((o,t)=>{if(_(o))return a.jsx("div",{role:"separator",className:i("my-1 h-px bg-outline-variant",f.sep)},`sep-${t}`);const n=o,P=t===B,v=n.variant==="error"||n.variant==="danger";return a.jsxs("div",{role:"menuitem","aria-disabled":n.disabled||void 0,className:i("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",f.item,n.disabled&&"pointer-events-none opacity-50",v?"text-error":"text-on-surface",P&&(v?"bg-error/8":"bg-on-surface/8")),onClick:()=>{n.disabled||(y(n),l())},onMouseEnter:()=>{n.disabled||u(t)},children:[n.icon&&a.jsx(U,{name:n.icon,size:f.icon,className:i("shrink-0",v?"text-error":"text-on-surface-variant")}),n.label]},n.id)})})]})]})}j.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `16`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"16",computed:!1}},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},menuClassName:{required:!1,tsType:{name:"string"},description:`Class applied to the floating menu element (the notched card) — use it to
 fine-tune the menu's position relative to the trigger, e.g. a translate
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const ce={title:"UI/Navigation/DropdownMenu",component:j,decorators:[e=>a.jsx("div",{className:"p-8 min-h-[300px]",children:a.jsx(e,{})})]},g={args:{trigger:a.jsx(N,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},m={args:{trigger:a.jsx(N,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <IconButton icon="more_vert" aria-label="Open menu" variant="filled" />,
    items: [{
      id: "edit",
      label: "Edit",
      icon: "edit"
    }, {
      id: "duplicate",
      label: "Duplicate",
      icon: "content_copy"
    }, {
      type: "separator" as const
    }, {
      id: "delete",
      label: "Delete",
      icon: "delete",
      variant: "danger" as const
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />,
    notchWidth: 34,
    notchHeight: 38,
    notchRadius: 8,
    notchInverseRadius: 6,
    items: [{
      id: "how",
      label: "How it works",
      icon: "play_circle"
    }, {
      id: "source",
      label: "View source",
      icon: "code"
    }, {
      type: "separator" as const
    }, {
      id: "subscribe",
      label: "Get early access",
      icon: "mail"
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...m.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...m.parameters?.docs?.description}}};const de=["Playground","TightHead"];export{g as Playground,m as TightHead,de as __namedExportsOrder,ce as default};
