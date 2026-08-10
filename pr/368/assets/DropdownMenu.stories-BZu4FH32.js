import{r as a,j as t}from"./iframe-BNdBgePx.js";import{c as l}from"./cn-IyxL_b2c.js";import{I as z}from"./Icon-Iii9D35i.js";import{N as Y}from"./Notch-CkJV_oy3.js";import{u as ee}from"./useMenuKeyNav-Dau5W-U_.js";import{I as S}from"./IconButton-DoW29_P1.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-B1T9wGAh.js";import"./button-styles-CZHSjrxJ.js";const te=52,ne=46,oe=12,re=10,ae=1.5,ie=150,se={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function V(e){return"type"in e&&e.type==="separator"}function I(e){return!V(e)&&!e.disabled}function q({items:e,onSelect:R,trigger:W,offset:d=0,notchWidth:A=te,notchHeight:k=ne,notchRadius:L=oe,notchInverseRadius:G=re,notchStrokeWidth:B=ae,useNotch:u=!0,placement:P="bottom",size:U="md",openOnHover:T=!1,menuClassName:K,className:F}){const _=d<0||Object.is(d,-0),b=P==="top",m=se[U],[i,M]=a.useState(!1),O=a.useRef(null),C=a.useRef(null),y=a.useRef(null),p=a.useRef(null),[E,Z]=a.useState(0),[H,$]=a.useState(0),N=a.useId(),s=a.useCallback(()=>{p.current!=null&&(clearTimeout(p.current),p.current=null)},[]),D=e.map((n,r)=>I(n)?r:-1).filter(n=>n!==-1),{activeIndex:J,setActiveIndex:h,handleKeyDown:Q}=ee({itemCount:e.length,traversableIndices:D,canActivate:n=>{const r=e[n];return!!r&&I(r)},onActivate:n=>{const r=e[n];r&&I(r)&&(R(r),c())},onClose:()=>c()}),j=a.useCallback(()=>{s(),M(!0),h(D[0]??-1)},[D,h,s]),c=a.useCallback(()=>{s(),M(!1),h(-1)},[h,s]);return a.useEffect(()=>{if(!i)return;const n=requestAnimationFrame(()=>{C.current?.focus()}),r=o=>{O.current?.contains(o.target)||c()};return document.addEventListener("mousedown",r),()=>{cancelAnimationFrame(n),document.removeEventListener("mousedown",r),s()}},[i,c,s]),a.useEffect(()=>s,[s]),a.useLayoutEffect(()=>{!i||!y.current||(Z(y.current.offsetHeight),$(y.current.offsetWidth))},[i,e.length]),t.jsxs("div",{ref:O,className:l("relative inline-block",F),onPointerEnter:T?n=>{n.pointerType==="mouse"&&(s(),i||j())}:void 0,onPointerLeave:T?n=>{n.pointerType==="mouse"&&(s(),p.current=window.setTimeout(()=>{p.current=null,c()},ie))}:void 0,children:[t.jsx("div",{className:l("relative",i&&"z-[51]"),"aria-haspopup":"menu","aria-expanded":i,"aria-controls":i?N:void 0,onClick:()=>{i?c():j()},children:W}),i&&t.jsxs("div",{ref:C,id:N,role:"menu",tabIndex:-1,onKeyDown:Q,className:l("absolute z-50 overflow-visible outline-none",K),style:{[b?"bottom":"top"]:u?-7:"calc(100% + 8px)",[_?"right":"left"]:u?(_?-6:-7)-Math.abs(d):-Math.abs(d),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[u&&E>0&&H>0&&t.jsx(Y,{width:H,height:E,notchWidth:A,notchHeight:k,notchSide:b?"top":"bottom",notchOffset:d,radius:L,inverseRadius:G,stroke:"var(--color-primary)",strokeWidth:B,className:l("absolute left-0",b?"bottom-0":"top-0")}),t.jsx("div",{ref:y,className:l("relative z-10 flex flex-col gap-1 p-2",m.minW,!u&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[b?"marginBottom":"marginTop"]:u?k:0},children:e.map((n,r)=>{if(V(n))return t.jsx("div",{role:"separator",className:l("my-1 h-px bg-outline-variant",m.sep)},`sep-${r}`);const o=n,X=r===J,w=o.variant==="error"||o.variant==="danger";return t.jsxs("div",{role:"menuitem","aria-disabled":o.disabled||void 0,className:l("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",m.item,o.disabled&&"pointer-events-none opacity-50",w?"text-error":"text-on-surface",X&&(w?"bg-error/8":"bg-on-surface/8")),onClick:()=>{o.disabled||(R(o),c())},onMouseEnter:()=>{o.disabled||h(r)},children:[o.icon!=null&&(typeof o.icon=="string"?t.jsx(z,{name:o.icon,size:m.icon,className:l("shrink-0",w?"text-error":"text-on-surface-variant")}):t.jsx("span",{className:l("flex shrink-0 items-center",w?"text-error":"text-on-surface-variant"),children:o.icon})),o.label,o.external&&t.jsx(z,{name:"open_in_new",size:m.icon-3,className:"ml-auto shrink-0 text-on-surface-variant/60"})]},o.id)})})]})]})}q.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `12`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"12",computed:!1}},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},notchStrokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke (border) width of the notch outline, in px. Default `1.5`.",defaultValue:{value:"1.5",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},openOnHover:{required:!1,tsType:{name:"boolean"},description:`Open the menu on mouse hover of the trigger, in addition to click.
 The menu stays open while the pointer is over the trigger OR the floating
 menu, and closes after a short grace on leave so trigger->menu travel does
 not dismiss it. Mouse-only: no-op on touch/pen (which keep tap-to-toggle)
 and for keyboard. Default \`false\` — hover menus hurt touch and keyboard
 discoverability, so opt in deliberately (e.g. a desktop toolbar overflow
 menu, not a mobile bottom-nav menu).

 COUPLING NOTE: relies on the menu rendering INLINE inside \`containerRef\`
 (no portal). If DropdownMenu ever moves to a portal, hover-leave detection
 must be reworked (the menu would no longer be a container descendant).`,defaultValue:{value:"false",computed:!1}},menuClassName:{required:!1,tsType:{name:"string"},description:`Class applied to the floating menu element (the notched card) — use it to
 fine-tune the menu's position relative to the trigger, e.g. a translate
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const ve={title:"UI/Navigation/DropdownMenu",component:q,decorators:[e=>t.jsx("div",{className:"p-8 min-h-[300px]",children:t.jsx(e,{})})]},x={args:{trigger:t.jsx(S,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},f={args:{trigger:t.jsx(S,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchRadius:8,notchInverseRadius:6,items:[{id:"repo",label:"Repository",external:!0,icon:t.jsx("svg",{viewBox:"0 0 16 16",width:16,height:16,fill:"currentColor",children:t.jsx("path",{d:"M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z"})})},{id:"docs",label:"Docs",icon:"menu_book",external:!0},{type:"separator"},{id:"settings",label:"Settings",icon:"settings"}],onSelect:e=>console.log("Selected:",e.id)}},g={args:{openOnHover:!0,trigger:t.jsx(S,{icon:"more_horiz","aria-label":"More",variant:"text"}),items:[{id:"rename",label:"Rename",icon:"edit"},{id:"move",label:"Move to…",icon:"drive_file_move"},{type:"separator"},{id:"archive",label:"Archive",icon:"archive"},{id:"delete",label:"Delete",icon:"delete",variant:"error"}],onSelect:e=>console.log("Selected:",e.id)}},v={args:{trigger:t.jsx(S,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source},description:{story:"An item's `icon` can be a custom node (e.g. a brand-logo SVG that Material\nSymbols doesn't ship) instead of an icon name &mdash; size it to ~the item\nicon size and use `currentColor`. `external: true` adds a trailing\nopen-in-new glyph for items that open in a new tab.",...f.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    openOnHover: true,
    trigger: <IconButton icon="more_horiz" aria-label="More" variant="text" />,
    items: [{
      id: "rename",
      label: "Rename",
      icon: "edit"
    }, {
      id: "move",
      label: "Move to…",
      icon: "drive_file_move"
    }, {
      type: "separator" as const
    }, {
      id: "archive",
      label: "Archive",
      icon: "archive"
    }, {
      id: "delete",
      label: "Delete",
      icon: "delete",
      variant: "error" as const
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...g.parameters?.docs?.source},description:{story:`\`openOnHover\` opens the menu on mouse hover of the trigger, layered on top of
click. The menu stays open while the pointer is over the trigger or the menu,
and closes after a short grace on leave so trigger&rarr;menu travel does not
dismiss it. Mouse-only &mdash; touch/pen keep tap-to-toggle. Reach for it on a
desktop toolbar overflow menu, never a mobile bottom-nav menu. Hover over the
button below to open it.`,...g.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...v.parameters?.docs?.description}}};const be=["Playground","CustomIconAndExternal","OpenOnHover","TightHead"];export{f as CustomIconAndExternal,g as OpenOnHover,x as Playground,v as TightHead,be as __namedExportsOrder,ve as default};
