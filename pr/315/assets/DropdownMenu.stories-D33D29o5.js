import{r,j as t}from"./iframe-CUvxw3Tt.js";import{c as i}from"./cn-IyxL_b2c.js";import{I as T}from"./Icon-BoqzwCQh.js";import{N as $}from"./Notch-CT3Mxc0g.js";import{u as J}from"./useMenuKeyNav-DPaVzYw_.js";import{I as y}from"./IconButton-Cf0wgwN3.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BX41_ovR.js";import"./button-styles-CZHSjrxJ.js";const Q=52,X=46,Y=16,ee=10,te=1.5,ne={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function C(e){return"type"in e&&e.type==="separator"}function w(e){return!C(e)&&!e.disabled}function N({items:e,onSelect:S,trigger:z,offset:c=0,notchWidth:E=Q,notchHeight:D=X,notchRadius:V=Y,notchInverseRadius:W=ee,notchStrokeWidth:q=te,useNotch:d=!0,placement:H="bottom",size:O="md",menuClassName:A,className:L}){const I=c<0||Object.is(c,-0),f=H==="top",u=ne[O],[s,R]=r.useState(!1),k=r.useRef(null),_=r.useRef(null),g=r.useRef(null),[j,B]=r.useState(0),[M,G]=r.useState(0),K=r.useId(),x=e.map((a,o)=>w(a)?o:-1).filter(a=>a!==-1),{activeIndex:P,setActiveIndex:m,handleKeyDown:U}=J({itemCount:e.length,traversableIndices:x,canActivate:a=>{const o=e[a];return!!o&&w(o)},onActivate:a=>{const o=e[a];o&&w(o)&&(S(o),l())},onClose:()=>l()}),F=r.useCallback(()=>{R(!0),m(x[0]??-1)},[x,m]),l=r.useCallback(()=>{R(!1),m(-1)},[m]);return r.useEffect(()=>{if(!s)return;const a=requestAnimationFrame(()=>{_.current?.focus()}),o=n=>{k.current?.contains(n.target)||l()};return document.addEventListener("mousedown",o),()=>{cancelAnimationFrame(a),document.removeEventListener("mousedown",o)}},[s,l]),r.useLayoutEffect(()=>{!s||!g.current||(B(g.current.offsetHeight),G(g.current.offsetWidth))},[s,e.length]),t.jsxs("div",{ref:k,className:i("relative inline-block",L),children:[t.jsx("div",{className:i("relative",s&&"z-[51]"),onClick:()=>{s?l():F()},children:z}),s&&t.jsxs("div",{ref:_,id:K,role:"menu",tabIndex:-1,onKeyDown:U,className:i("absolute z-50 overflow-visible outline-none",A),style:{[f?"bottom":"top"]:d?-7:"calc(100% + 8px)",[I?"right":"left"]:d?(I?-5:-7)-Math.abs(c):-Math.abs(c),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[d&&j>0&&M>0&&t.jsx($,{width:M,height:j,notchWidth:E,notchHeight:D,notchSide:f?"top":"bottom",notchOffset:c,radius:V,inverseRadius:W,stroke:"var(--color-primary)",strokeWidth:q,className:i("absolute left-0",f?"bottom-0":"top-0")}),t.jsx("div",{ref:g,className:i("relative z-10 flex flex-col gap-1 p-2",u.minW,!d&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[f?"marginBottom":"marginTop"]:d?D:0},children:e.map((a,o)=>{if(C(a))return t.jsx("div",{role:"separator",className:i("my-1 h-px bg-outline-variant",u.sep)},`sep-${o}`);const n=a,Z=o===P,b=n.variant==="error"||n.variant==="danger";return t.jsxs("div",{role:"menuitem","aria-disabled":n.disabled||void 0,className:i("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",u.item,n.disabled&&"pointer-events-none opacity-50",b?"text-error":"text-on-surface",Z&&(b?"bg-error/8":"bg-on-surface/8")),onClick:()=>{n.disabled||(S(n),l())},onMouseEnter:()=>{n.disabled||m(o)},children:[n.icon!=null&&(typeof n.icon=="string"?t.jsx(T,{name:n.icon,size:u.icon,className:i("shrink-0",b?"text-error":"text-on-surface-variant")}):t.jsx("span",{className:i("flex shrink-0 items-center",b?"text-error":"text-on-surface-variant"),children:n.icon})),n.label,n.external&&t.jsx(T,{name:"open_in_new",size:u.icon-3,className:"ml-auto shrink-0 text-on-surface-variant/60"})]},n.id)})})]})]})}N.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `16`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"16",computed:!1}},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},notchStrokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke (border) width of the notch outline, in px. Default `1.5`.",defaultValue:{value:"1.5",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},menuClassName:{required:!1,tsType:{name:"string"},description:`Class applied to the floating menu element (the notched card) — use it to
 fine-tune the menu's position relative to the trigger, e.g. a translate
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const me={title:"UI/Navigation/DropdownMenu",component:N,decorators:[e=>t.jsx("div",{className:"p-8 min-h-[300px]",children:t.jsx(e,{})})]},v={args:{trigger:t.jsx(y,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},p={args:{trigger:t.jsx(y,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchRadius:8,notchInverseRadius:6,items:[{id:"repo",label:"Repository",external:!0,icon:t.jsx("svg",{viewBox:"0 0 16 16",width:16,height:16,fill:"currentColor",children:t.jsx("path",{d:"M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z"})})},{id:"docs",label:"Docs",icon:"menu_book",external:!0},{type:"separator"},{id:"settings",label:"Settings",icon:"settings"}],onSelect:e=>console.log("Selected:",e.id)}},h={args:{trigger:t.jsx(y,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />,
    notchRadius: 8,
    notchInverseRadius: 6,
    items: [{
      id: "repo",
      label: "Repository",
      external: true,
      icon: <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
            <path d="M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z" />
          </svg>
    }, {
      id: "docs",
      label: "Docs",
      icon: "menu_book",
      external: true
    }, {
      type: "separator" as const
    }, {
      id: "settings",
      label: "Settings",
      icon: "settings"
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...p.parameters?.docs?.source},description:{story:"An item's `icon` can be a custom node (e.g. a brand-logo SVG that Material\nSymbols doesn't ship) instead of an icon name &mdash; size it to ~the item\nicon size and use `currentColor`. `external: true` adds a trailing\nopen-in-new glyph for items that open in a new tab.",...p.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...h.parameters?.docs?.description}}};const pe=["Playground","CustomIconAndExternal","TightHead"];export{p as CustomIconAndExternal,v as Playground,h as TightHead,pe as __namedExportsOrder,me as default};
