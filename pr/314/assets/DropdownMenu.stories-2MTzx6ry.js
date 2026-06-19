import{r,j as a}from"./iframe-Ci78qqgU.js";import{c as i}from"./cn-IyxL_b2c.js";import{I as F}from"./Icon-xsa3YTAe.js";import{N as Z}from"./Notch-CKe6JdxD.js";import{u as $}from"./useMenuKeyNav-CPBqOvyM.js";import{I as M}from"./IconButton-DRSfV7Us.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BpV-5EtV.js";import"./button-styles-CZHSjrxJ.js";const J=52,Q=46,X=16,Y=10,ee=1.5,te={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function _(e){return"type"in e&&e.type==="separator"}function w(e){return!_(e)&&!e.disabled}function N({items:e,onSelect:y,trigger:W,offset:c=0,notchWidth:j=J,notchHeight:x=Q,notchRadius:q=X,notchInverseRadius:H=Y,notchStrokeWidth:V=ee,useNotch:d=!0,placement:E="bottom",size:C="md",menuClassName:O,className:z}){const D=c<0||Object.is(c,-0),p=E==="top",f=te[C],[s,S]=r.useState(!1),I=r.useRef(null),R=r.useRef(null),h=r.useRef(null),[T,A]=r.useState(0),[k,G]=r.useState(0),B=r.useId(),b=e.map((o,t)=>w(o)?t:-1).filter(o=>o!==-1),{activeIndex:L,setActiveIndex:u,handleKeyDown:K}=$({itemCount:e.length,traversableIndices:b,canActivate:o=>{const t=e[o];return!!t&&w(t)},onActivate:o=>{const t=e[o];t&&w(t)&&(y(t),l())},onClose:()=>l()}),P=r.useCallback(()=>{S(!0),u(b[0]??-1)},[b,u]),l=r.useCallback(()=>{S(!1),u(-1)},[u]);return r.useEffect(()=>{if(!s)return;const o=requestAnimationFrame(()=>{R.current?.focus()}),t=n=>{I.current?.contains(n.target)||l()};return document.addEventListener("mousedown",t),()=>{cancelAnimationFrame(o),document.removeEventListener("mousedown",t)}},[s,l]),r.useLayoutEffect(()=>{!s||!h.current||(A(h.current.offsetHeight),G(h.current.offsetWidth))},[s,e.length]),a.jsxs("div",{ref:I,className:i("relative inline-block",z),children:[a.jsx("div",{className:i("relative",s&&"z-[51]"),onClick:()=>{s?l():P()},children:W}),s&&a.jsxs("div",{ref:R,id:B,role:"menu",tabIndex:-1,onKeyDown:K,className:i("absolute z-50 overflow-visible outline-none",O),style:{[p?"bottom":"top"]:d?-7:"calc(100% + 8px)",[D?"right":"left"]:d?(D?-5:-7)-Math.abs(c):-Math.abs(c),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[d&&T>0&&k>0&&a.jsx(Z,{width:k,height:T,notchWidth:j,notchHeight:x,notchSide:p?"top":"bottom",notchOffset:c,radius:q,inverseRadius:H,stroke:"var(--color-primary)",strokeWidth:V,className:i("absolute left-0",p?"bottom-0":"top-0")}),a.jsx("div",{ref:h,className:i("relative z-10 flex flex-col gap-1 p-2",f.minW,!d&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[p?"marginBottom":"marginTop"]:d?x:0},children:e.map((o,t)=>{if(_(o))return a.jsx("div",{role:"separator",className:i("my-1 h-px bg-outline-variant",f.sep)},`sep-${t}`);const n=o,U=t===L,v=n.variant==="error"||n.variant==="danger";return a.jsxs("div",{role:"menuitem","aria-disabled":n.disabled||void 0,className:i("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",f.item,n.disabled&&"pointer-events-none opacity-50",v?"text-error":"text-on-surface",U&&(v?"bg-error/8":"bg-on-surface/8")),onClick:()=>{n.disabled||(y(n),l())},onMouseEnter:()=>{n.disabled||u(t)},children:[n.icon&&a.jsx(F,{name:n.icon,size:f.icon,className:i("shrink-0",v?"text-error":"text-on-surface-variant")}),n.label]},n.id)})})]})]})}N.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `16`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"16",computed:!1}},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},notchStrokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke (border) width of the notch outline, in px. Default `1.5`.",defaultValue:{value:"1.5",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},menuClassName:{required:!1,tsType:{name:"string"},description:`Class applied to the floating menu element (the notched card) — use it to
 fine-tune the menu's position relative to the trigger, e.g. a translate
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const ue={title:"UI/Navigation/DropdownMenu",component:N,decorators:[e=>a.jsx("div",{className:"p-8 min-h-[300px]",children:a.jsx(e,{})})]},g={args:{trigger:a.jsx(M,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},m={args:{trigger:a.jsx(M,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...m.parameters?.docs?.description}}};const me=["Playground","TightHead"];export{g as Playground,m as TightHead,me as __namedExportsOrder,ue as default};
