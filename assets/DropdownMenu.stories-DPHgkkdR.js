import{r as a,j as n}from"./iframe-ByfIKwez.js";import{c}from"./cn-IyxL_b2c.js";import{I as B}from"./Icon-xFI4yXV6.js";import{S as oe}from"./Switch-BKuwwILY.js";import{N as re}from"./Notch-B5kS_oqz.js";import{u as ae}from"./useMenuKeyNav-AnYVY8U7.js";import{I as m}from"./IconButton-BW0FGSTX.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BqwVzdnT.js";import"./button-styles-CZHSjrxJ.js";const ie=52,se=46,ce=12,le=10,de=1.5,ue=150,me={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function G(e){return"type"in e&&e.type==="separator"}function H(e){return!G(e)&&!e.disabled}function M({items:e,onSelect:S,trigger:T,offset:l=0,notchWidth:_=ie,notchHeight:j=se,notchRadius:P=ce,notchHeadRadius:U,notchInverseRadius:K=le,notchStrokeWidth:F=de,useNotch:p=!0,placement:Y="bottom",size:Z="md",openOnHover:N=!1,menuClassName:$,className:J}){const C=l<0||Object.is(l,-0),R=Y==="top",h=me[Z],[i,z]=a.useState(!1),E=a.useRef(null),V=a.useRef(null),k=a.useRef(null),g=a.useRef(null),[W,Q]=a.useState(0),[q,X]=a.useState(0),A=a.useId(),s=a.useCallback(()=>{g.current!=null&&(clearTimeout(g.current),g.current=null)},[]),O=e.map((o,r)=>H(o)?r:-1).filter(o=>o!==-1),{activeIndex:ee,setActiveIndex:f,handleKeyDown:ne}=ae({itemCount:e.length,traversableIndices:O,canActivate:o=>{const r=e[o];return!!r&&H(r)},onActivate:o=>{const r=e[o];r&&H(r)&&(S(r),r.checked===void 0&&d())},onClose:()=>d()}),L=a.useCallback(()=>{s(),z(!0),f(O[0]??-1)},[O,f,s]),d=a.useCallback(()=>{s(),z(!1),f(-1)},[f,s]);return a.useEffect(()=>{if(!i)return;const o=requestAnimationFrame(()=>{V.current?.focus()}),r=t=>{E.current?.contains(t.target)||d()};return document.addEventListener("mousedown",r),()=>{cancelAnimationFrame(o),document.removeEventListener("mousedown",r),s()}},[i,d,s]),a.useEffect(()=>s,[s]),a.useLayoutEffect(()=>{!i||!k.current||(Q(k.current.offsetHeight),X(k.current.offsetWidth))},[i,e.length]),n.jsxs("div",{ref:E,className:c("relative inline-block",J),onPointerEnter:N?o=>{o.pointerType==="mouse"&&(s(),i||L())}:void 0,onPointerLeave:N?o=>{o.pointerType==="mouse"&&(s(),g.current=window.setTimeout(()=>{g.current=null,d()},ue))}:void 0,children:[n.jsx("div",{className:c("relative",i&&"z-[51]"),"aria-haspopup":"menu","aria-expanded":i,"aria-controls":i?A:void 0,onClick:()=>{i?d():L()},children:T}),i&&n.jsxs("div",{ref:V,id:A,role:"menu",tabIndex:-1,onKeyDown:ne,className:c("absolute z-50 overflow-visible outline-none",$),style:{[R?"bottom":"top"]:p?-7:"calc(100% + 8px)",[C?"right":"left"]:p?(C?-6:-7)-Math.abs(l):-Math.abs(l),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[p&&W>0&&q>0&&n.jsx(re,{width:q,height:W,notchWidth:_,notchHeight:j,notchSide:R?"top":"bottom",notchOffset:l,radius:P,headRadius:U,inverseRadius:K,stroke:"var(--color-primary)",strokeWidth:F,className:c("absolute left-0",R?"bottom-0":"top-0")}),n.jsx("div",{ref:k,className:c("relative z-10 flex flex-col gap-1 p-2",h.minW,!p&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[R?"marginBottom":"marginTop"]:p?j:0},children:e.map((o,r)=>{if(G(o))return n.jsx("div",{role:"separator",className:c("my-1 h-px bg-outline-variant",h.sep)},`sep-${r}`);const t=o,te=r===ee,D=t.variant==="error"||t.variant==="danger",u=t.checked!==void 0;return n.jsxs("div",{role:u?"menuitemcheckbox":"menuitem","aria-checked":u?t.checked:void 0,"aria-disabled":t.disabled||void 0,className:c("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",h.item,t.disabled&&"pointer-events-none opacity-50",D?"text-error":"text-on-surface",te&&(D?"bg-error/8":"bg-on-surface/8")),onClick:()=>{t.disabled||(S(t),u||d())},onMouseEnter:()=>{t.disabled||f(r)},children:[!u&&t.icon!=null&&(typeof t.icon=="string"?n.jsx(B,{name:t.icon,size:h.icon,className:c("shrink-0",D?"text-error":"text-on-surface-variant")}):n.jsx("span",{className:c("flex shrink-0 items-center",D?"text-error":"text-on-surface-variant"),children:t.icon})),t.label,u&&n.jsx("span",{"aria-hidden":"true",className:"pointer-events-none ml-auto pl-3",children:n.jsx(oe,{size:"sm",checked:t.checked===!0,onChange:()=>{},"aria-label":t.label})}),!u&&t.external&&n.jsx(B,{name:"open_in_new",size:h.icon-3,className:"ml-auto shrink-0 text-on-surface-variant/60"})]},t.id)})})]})]})}M.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `12`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"12",computed:!1}},notchHeadRadius:{required:!1,tsType:{name:"number"},description:"Corner radius for ONLY the notch tab's outer corners (the tip), so the tab\n can be rounder than the menu body. Default = `notchRadius`."},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},notchStrokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke (border) width of the notch outline, in px. Default `1.5`.",defaultValue:{value:"1.5",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},openOnHover:{required:!1,tsType:{name:"boolean"},description:`Open the menu on mouse hover of the trigger, in addition to click.
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
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const Re={title:"UI/Navigation/DropdownMenu",component:M,decorators:[e=>n.jsx("div",{className:"p-8 min-h-[300px]",children:n.jsx(e,{})})]},I={args:{trigger:n.jsx(m,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},b={args:{trigger:n.jsx(m,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchRadius:8,notchInverseRadius:6,items:[{id:"repo",label:"Repository",external:!0,icon:n.jsx("svg",{viewBox:"0 0 16 16",width:16,height:16,fill:"currentColor",children:n.jsx("path",{d:"M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z"})})},{id:"docs",label:"Docs",icon:"menu_book",external:!0},{type:"separator"},{id:"settings",label:"Settings",icon:"settings"}],onSelect:e=>console.log("Selected:",e.id)}},v={args:{openOnHover:!0,trigger:n.jsx(m,{icon:"more_horiz","aria-label":"More",variant:"text"}),items:[{id:"rename",label:"Rename",icon:"edit"},{id:"move",label:"Move to…",icon:"drive_file_move"},{type:"separator"},{id:"archive",label:"Archive",icon:"archive"},{id:"delete",label:"Delete",icon:"delete",variant:"error"}],onSelect:e=>console.log("Selected:",e.id)}},x={args:{trigger:n.jsx(m,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}},y={args:{trigger:n.jsx(m,{icon:"account_circle","aria-label":"Account menu",variant:"text",size:"sm"}),notchWidth:44,notchHeight:44,notchRadius:12,notchHeadRadius:20,items:[{id:"profile",label:"Profile",icon:"person"},{id:"settings",label:"Settings",icon:"settings"},{type:"separator"},{id:"signout",label:"Sign out",icon:"logout"}],onSelect:e=>console.log("Selected:",e.id)}},w={render:e=>{const[S,T]=a.useState(!1);return n.jsx(M,{...e,items:[{id:"docs",label:"Docs",icon:"menu_book"},{type:"separator"},{id:"reduce-motion",label:"Reduce animation",checked:S}],onSelect:l=>{l.id==="reduce-motion"&&T(_=>!_)}})},args:{trigger:n.jsx(m,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),items:[],onSelect:()=>{}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source},description:{story:"An item's `icon` can be a custom node (e.g. a brand-logo SVG that Material\nSymbols doesn't ship) instead of an icon name &mdash; size it to ~the item\nicon size and use `currentColor`. `external: true` adds a trailing\nopen-in-new glyph for items that open in a new tab.",...b.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source},description:{story:`\`openOnHover\` opens the menu on mouse hover of the trigger, layered on top of
click. The menu stays open while the pointer is over the trigger or the menu,
and closes after a short grace on leave so trigger&rarr;menu travel does not
dismiss it. Mouse-only &mdash; touch/pen keep tap-to-toggle. Reach for it on a
desktop toolbar overflow menu, never a mobile bottom-nav menu. Hover over the
button below to open it.`,...v.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...x.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <IconButton icon="account_circle" aria-label="Account menu" variant="text" size="sm" />,
    notchWidth: 44,
    notchHeight: 44,
    notchRadius: 12,
    notchHeadRadius: 20,
    items: [{
      id: "profile",
      label: "Profile",
      icon: "person"
    }, {
      id: "settings",
      label: "Settings",
      icon: "settings"
    }, {
      type: "separator" as const
    }, {
      id: "signout",
      label: "Sign out",
      icon: "logout"
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...y.parameters?.docs?.source},description:{story:"`notchHeadRadius` rounds ONLY the notch tab's outer corners, so an avatar\ntrigger gets a rounder tab (20) than the menu body (`notchRadius` 12).",...y.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [reduce, setReduce] = useState(false);
    return <DropdownMenu {...args} items={[{
      id: "docs",
      label: "Docs",
      icon: "menu_book"
    }, {
      type: "separator" as const
    }, {
      id: "reduce-motion",
      label: "Reduce animation",
      checked: reduce
    }]} onSelect={item => {
      if (item.id === "reduce-motion") setReduce(v => !v);
    }} />;
  },
  args: {
    trigger: <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />,
    items: [],
    onSelect: () => {}
  }
}`,...w.parameters?.docs?.source},description:{story:"An item with `checked` becomes a toggle row (`menuitemcheckbox`): no leading\nicon, a trailing Switch, and selecting it (click / Enter / Space) does NOT\nclose the menu — the caller flips its own state.",...w.parameters?.docs?.description}}};const ke=["Playground","CustomIconAndExternal","OpenOnHover","TightHead","RoundedHead","ToggleItem"];export{b as CustomIconAndExternal,v as OpenOnHover,I as Playground,y as RoundedHead,x as TightHead,w as ToggleItem,ke as __namedExportsOrder,Re as default};
