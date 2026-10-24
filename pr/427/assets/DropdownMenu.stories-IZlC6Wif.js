import{r as a,j as t}from"./iframe-CHUVniAO.js";import{c as d}from"./cn-IyxL_b2c.js";import{I as F}from"./Icon-BNJcZv-Q.js";import{S as oe}from"./Switch-DdJ5jErD.js";import{N as re}from"./Notch-C_SyxSVV.js";import{u as ae}from"./useMenuKeyNav-LZas-PM7.js";import{I as g}from"./IconButton-Dl-aNZKM.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BOd2vzKc.js";import"./button-styles-CZHSjrxJ.js";const ie=52,se=46,ce=12,le=10,de=1.5,ue=150,me={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function G(e){return"type"in e&&e.type==="separator"}function M(e){return!G(e)&&!e.disabled}function H({items:e,onSelect:s,trigger:u,offset:i=0,notchWidth:p=ie,notchHeight:f=se,notchRadius:b=ce,notchHeadRadius:v,notchInverseRadius:Y=le,notchStrokeWidth:$=de,useNotch:w=!0,placement:U="bottom",size:K="md",openOnHover:j=!1,menuClassName:X,className:Z}){const q=i<0||Object.is(i,-0),_=U==="top",y=me[K],[c,z]=a.useState(!1),A=a.useRef(null),V=a.useRef(null),N=a.useRef(null),x=a.useRef(null),[W,J]=a.useState(0),[L,Q]=a.useState(0),B=a.useId(),l=a.useCallback(()=>{x.current!=null&&(clearTimeout(x.current),x.current=null)},[]),C=e.map((o,r)=>M(o)?r:-1).filter(o=>o!==-1),{activeIndex:ee,setActiveIndex:S,handleKeyDown:te}=ae({itemCount:e.length,traversableIndices:C,canActivate:o=>{const r=e[o];return!!r&&M(r)},onActivate:o=>{const r=e[o];r&&M(r)&&(s(r),r.checked===void 0&&m())},onClose:()=>m()}),P=a.useCallback(()=>{l(),z(!0),S(C[0]??-1)},[C,S,l]),m=a.useCallback(()=>{l(),z(!1),S(-1)},[S,l]);return a.useEffect(()=>{if(!c)return;const o=requestAnimationFrame(()=>{V.current?.focus()}),r=n=>{A.current?.contains(n.target)||m()};return document.addEventListener("mousedown",r),()=>{cancelAnimationFrame(o),document.removeEventListener("mousedown",r),l()}},[c,m,l]),a.useEffect(()=>l,[l]),a.useLayoutEffect(()=>{!c||!N.current||(J(N.current.offsetHeight),Q(N.current.offsetWidth))},[c,e.length]),t.jsxs("div",{ref:A,className:d("relative inline-block",Z),onPointerEnter:j?o=>{o.pointerType==="mouse"&&(l(),c||P())}:void 0,onPointerLeave:j?o=>{o.pointerType==="mouse"&&(l(),x.current=window.setTimeout(()=>{x.current=null,m()},ue))}:void 0,children:[t.jsx("div",{className:d("relative",c&&"z-[51]"),"aria-haspopup":"menu","aria-expanded":c,"aria-controls":c?B:void 0,onClick:()=>{c?m():P()},children:u}),c&&t.jsxs("div",{ref:V,id:B,role:"menu",tabIndex:-1,onKeyDown:te,className:d("absolute z-50 overflow-visible outline-none",X),style:{[_?"bottom":"top"]:w?-7:"calc(100% + 8px)",[q?"right":"left"]:w?(q?-6:-7)-Math.abs(i):-Math.abs(i),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[w&&W>0&&L>0&&t.jsx(re,{width:L,height:W,notchWidth:p,notchHeight:f,notchSide:_?"top":"bottom",notchOffset:i,radius:b,headRadius:v,inverseRadius:Y,stroke:"var(--color-primary)",strokeWidth:$,className:d("absolute left-0",_?"bottom-0":"top-0")}),t.jsx("div",{ref:N,className:d("relative z-10 flex flex-col gap-1 p-2",y.minW,!w&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[_?"marginBottom":"marginTop"]:w?f:0},children:e.map((o,r)=>{if(G(o))return t.jsx("div",{role:"separator",className:d("my-1 h-px bg-outline-variant",y.sep)},`sep-${r}`);const n=o,ne=r===ee,E=n.variant==="error"||n.variant==="danger",h=n.checked!==void 0;return t.jsxs("div",{role:h?"menuitemcheckbox":"menuitem","aria-checked":h?n.checked:void 0,"aria-disabled":n.disabled||void 0,className:d("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",y.item,n.disabled&&"pointer-events-none opacity-50",E?"text-error":"text-on-surface",ne&&(E?"bg-error/8":"bg-on-surface/8")),onClick:()=>{n.disabled||(s(n),h||m())},onMouseEnter:()=>{n.disabled||S(r)},children:[!h&&n.icon!=null&&(typeof n.icon=="string"?t.jsx(F,{name:n.icon,size:y.icon,className:d("shrink-0",E?"text-error":"text-on-surface-variant")}):t.jsx("span",{className:d("flex shrink-0 items-center",E?"text-error":"text-on-surface-variant"),children:n.icon})),n.label,h&&t.jsx("span",{"aria-hidden":"true",className:"pointer-events-none ml-auto flex shrink-0 items-center pl-3",children:t.jsx(oe,{size:"sm",checked:n.checked===!0,onChange:()=>{},"aria-label":n.label})}),!h&&n.external&&t.jsx(F,{name:"open_in_new",size:y.icon-3,className:"ml-auto shrink-0 text-on-surface-variant/60"})]},n.id)})})]})]})}H.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `12`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"12",computed:!1}},notchHeadRadius:{required:!1,tsType:{name:"number"},description:"Corner radius for ONLY the notch tab's outer corners (the tip), so the tab\n can be rounder than the menu body. Default = `notchRadius`."},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},notchStrokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke (border) width of the notch outline, in px. Default `1.5`.",defaultValue:{value:"1.5",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},openOnHover:{required:!1,tsType:{name:"boolean"},description:`Open the menu on mouse hover of the trigger, in addition to click.
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
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const ke={title:"UI/Navigation/DropdownMenu",component:H,decorators:[e=>t.jsx("div",{className:"p-8 min-h-[300px]",children:t.jsx(e,{})})]},O={args:{trigger:t.jsx(g,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},R={args:{trigger:t.jsx(g,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchRadius:8,notchInverseRadius:6,items:[{id:"repo",label:"Repository",external:!0,icon:t.jsx("svg",{viewBox:"0 0 16 16",width:16,height:16,fill:"currentColor",children:t.jsx("path",{d:"M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z"})})},{id:"docs",label:"Docs",icon:"menu_book",external:!0},{type:"separator"},{id:"settings",label:"Settings",icon:"settings"}],onSelect:e=>console.log("Selected:",e.id)}},k={args:{openOnHover:!0,trigger:t.jsx(g,{icon:"more_horiz","aria-label":"More",variant:"text"}),items:[{id:"rename",label:"Rename",icon:"edit"},{id:"move",label:"Move to…",icon:"drive_file_move"},{type:"separator"},{id:"archive",label:"Archive",icon:"archive"},{id:"delete",label:"Delete",icon:"delete",variant:"error"}],onSelect:e=>console.log("Selected:",e.id)}},D={args:{trigger:t.jsx(g,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}},T={args:{trigger:t.jsx(g,{icon:"account_circle","aria-label":"Account menu",variant:"text",size:"sm"}),notchWidth:44,notchHeight:44,notchRadius:12,notchHeadRadius:20,items:[{id:"profile",label:"Profile",icon:"person"},{id:"settings",label:"Settings",icon:"settings"},{type:"separator"},{id:"signout",label:"Sign out",icon:"logout"}],onSelect:e=>console.log("Selected:",e.id)}};async function pe(e){for(let s=0;s<50;s++){const u=e.querySelector('[role="menuitemcheckbox"]');if(u)return u;await new Promise(i=>setTimeout(i,20))}throw new Error("toggle row never rendered")}const I={play:async({canvasElement:e})=>{e.querySelector("button")?.click();const s=await pe(e);await document.fonts.ready,await new Promise(v=>requestAnimationFrame(()=>v(null)));const u=Array.from(s.childNodes).find(v=>v.nodeType===Node.TEXT_NODE),i=document.createRange();i.selectNodeContents(u);const p=i.getBoundingClientRect(),f=s.querySelector('[role="switch"]').getBoundingClientRect(),b=Math.abs(f.top+f.height/2-(p.top+p.height/2));if(console.log(`[ToggleItem] switch centreY - label centreY = ${b.toFixed(2)}px`),b>.5)throw new Error(`Switch is ${b.toFixed(2)}px off the label's centre`)},render:e=>{const[s,u]=a.useState(!1);return t.jsx(H,{...e,items:[{id:"docs",label:"Docs",icon:"menu_book"},{type:"separator"},{id:"reduce-motion",label:"Reduce animation",checked:s}],onSelect:i=>{i.id==="reduce-motion"&&u(p=>!p)}})},args:{trigger:t.jsx(g,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),items:[],onSelect:()=>{}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source},description:{story:"An item's `icon` can be a custom node (e.g. a brand-logo SVG that Material\nSymbols doesn't ship) instead of an icon name &mdash; size it to ~the item\nicon size and use `currentColor`. `external: true` adds a trailing\nopen-in-new glyph for items that open in a new tab.",...R.parameters?.docs?.description}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source},description:{story:`\`openOnHover\` opens the menu on mouse hover of the trigger, layered on top of
click. The menu stays open while the pointer is over the trigger or the menu,
and closes after a short grace on leave so trigger&rarr;menu travel does not
dismiss it. Mouse-only &mdash; touch/pen keep tap-to-toggle. Reach for it on a
desktop toolbar overflow menu, never a mobile bottom-nav menu. Hover over the
button below to open it.`,...k.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...D.parameters?.docs?.description}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source},description:{story:"`notchHeadRadius` rounds ONLY the notch tab's outer corners, so an avatar\ntrigger gets a rounder tab (20) than the menu body (`notchRadius` 12).",...T.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  // Layout proof: the Switch box must sit on the label's vertical centre.
  play: async ({
    canvasElement
  }) => {
    canvasElement.querySelector("button")?.click();
    const row = await waitForRow(canvasElement);
    await document.fonts.ready; // the icon font changes row height once loaded
    await new Promise(r => requestAnimationFrame(() => r(null)));
    const label = Array.from(row.childNodes).find(n => n.nodeType === Node.TEXT_NODE)!;
    const range = document.createRange();
    range.selectNodeContents(label);
    const labelRect = range.getBoundingClientRect();
    const sw = row.querySelector('[role="switch"]')!.getBoundingClientRect();
    const diff = Math.abs(sw.top + sw.height / 2 - (labelRect.top + labelRect.height / 2));
    console.log(\`[ToggleItem] switch centreY - label centreY = \${diff.toFixed(2)}px\`);
    if (diff > 0.5) throw new Error(\`Switch is \${diff.toFixed(2)}px off the label's centre\`);
  },
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
}`,...I.parameters?.docs?.source},description:{story:"An item with `checked` becomes a toggle row (`menuitemcheckbox`): no leading\nicon, a trailing Switch, and selecting it (click / Enter / Space) does NOT\nclose the menu — the caller flips its own state.",...I.parameters?.docs?.description}}};const De=["Playground","CustomIconAndExternal","OpenOnHover","TightHead","RoundedHead","ToggleItem"];export{R as CustomIconAndExternal,k as OpenOnHover,O as Playground,T as RoundedHead,D as TightHead,I as ToggleItem,De as __namedExportsOrder,ke as default};
