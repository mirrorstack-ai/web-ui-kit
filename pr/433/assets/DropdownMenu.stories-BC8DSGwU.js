import{r as a,j as n}from"./iframe-IXwm4NdI.js";import{c as d}from"./cn-IyxL_b2c.js";import{I as U}from"./Icon-Q81O5HSd.js";import{S as ae}from"./Switch-BoWgkDGG.js";import{N as ie}from"./Notch-Fvmff67j.js";import{u as se}from"./useMenuKeyNav-Nsew1IU_.js";import{I as p}from"./IconButton-Bph3mgsp.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-BhhClMPQ.js";import"./button-styles-CZHSjrxJ.js";const ce=52,le=46,de=12,ue=10,me=1.5,pe=150,he={md:{item:"gap-2 px-2 py-1.5",icon:16,minW:"min-w-[180px]",sep:"mx-1.5"},lg:{item:"gap-2.5 px-3 py-2.5",icon:18,minW:"min-w-[200px]",sep:"mx-2"}};function Y(e){return"type"in e&&e.type==="separator"}function j(e){return!Y(e)&&!e.disabled}function z({items:e,onSelect:s,trigger:u,offset:i=0,notchWidth:h=ce,notchHeight:b=le,notchRadius:v=de,notchHeadRadius:w,notchInverseRadius:$=ue,notchStrokeWidth:K=me,useNotch:y=!0,placement:X="bottom",size:Z="md",openOnHover:q=!1,menuClassName:J,className:Q}){const A=i<0||Object.is(i,-0),H=X==="top",x=he[Z],[c,V]=a.useState(!1),W=a.useRef(null),B=a.useRef(null),N=a.useRef(null),S=a.useRef(null),[L,ee]=a.useState(0),[P,ne]=a.useState(0),F=a.useId(),l=a.useCallback(()=>{S.current!=null&&(clearTimeout(S.current),S.current=null)},[]),M=e.map((o,r)=>j(o)?r:-1).filter(o=>o!==-1),{activeIndex:te,setActiveIndex:R,handleKeyDown:oe}=se({itemCount:e.length,traversableIndices:M,canActivate:o=>{const r=e[o];return!!r&&j(r)},onActivate:o=>{const r=e[o];r&&j(r)&&(s(r),r.checked===void 0&&m())},onClose:()=>m()}),G=a.useCallback(()=>{l(),V(!0),R(M[0]??-1)},[M,R,l]),m=a.useCallback(()=>{l(),V(!1),R(-1)},[R,l]);return a.useEffect(()=>{if(!c)return;const o=requestAnimationFrame(()=>{B.current?.focus()}),r=t=>{W.current?.contains(t.target)||m()};return document.addEventListener("mousedown",r),()=>{cancelAnimationFrame(o),document.removeEventListener("mousedown",r),l()}},[c,m,l]),a.useEffect(()=>l,[l]),a.useLayoutEffect(()=>{!c||!N.current||(ee(N.current.offsetHeight),ne(N.current.offsetWidth))},[c,e.length]),n.jsxs("div",{ref:W,className:d("relative inline-block",Q),onPointerEnter:q?o=>{o.pointerType==="mouse"&&(l(),c||G())}:void 0,onPointerLeave:q?o=>{o.pointerType==="mouse"&&(l(),S.current=window.setTimeout(()=>{S.current=null,m()},pe))}:void 0,children:[n.jsx("div",{className:d("relative",c&&"z-[51]"),"aria-haspopup":"menu","aria-expanded":c,"aria-controls":c?F:void 0,onClick:()=>{c?m():G()},children:u}),c&&n.jsxs("div",{ref:B,id:F,role:"menu",tabIndex:-1,onKeyDown:oe,className:d("absolute z-50 overflow-visible outline-none",J),style:{[H?"bottom":"top"]:y?-7:"calc(100% + 8px)",[A?"right":"left"]:y?(A?-6:-7)-Math.abs(i):-Math.abs(i),filter:"drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))"},children:[y&&L>0&&P>0&&n.jsx(ie,{width:P,height:L,notchWidth:h,notchHeight:b,notchSide:H?"top":"bottom",notchOffset:i,radius:v,headRadius:w,inverseRadius:$,stroke:"var(--color-primary)",strokeWidth:K,className:d("absolute left-0",H?"bottom-0":"top-0")}),n.jsx("div",{ref:N,className:d("pointer-events-auto relative z-10 flex flex-col gap-1 p-2",x.minW,!y&&"rounded-lg border border-outline-variant bg-surface-container-low"),style:{[H?"marginBottom":"marginTop"]:y?b:0},children:e.map((o,r)=>{if(Y(o))return n.jsx("div",{role:"separator",className:d("my-0.5 h-px bg-outline-variant",x.sep)},`sep-${r}`);const t=o,re=r===te,E=t.variant==="error"||t.variant==="danger",g=t.checked!==void 0;return n.jsxs("div",{role:g?"menuitemcheckbox":"menuitem","aria-checked":g?t.checked:void 0,"aria-disabled":t.disabled||void 0,className:d("flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",x.item,t.disabled&&"pointer-events-none opacity-50",E?"text-error":"text-on-surface",re&&(E?"bg-error/8":"bg-on-surface/8")),onClick:()=>{t.disabled||(s(t),g||m())},onMouseEnter:()=>{t.disabled||R(r)},children:[!g&&t.icon!=null&&(typeof t.icon=="string"?n.jsx(U,{name:t.icon,size:x.icon,className:d("shrink-0",E?"text-error":"text-on-surface-variant")}):n.jsx("span",{className:d("flex shrink-0 items-center",E?"text-error":"text-on-surface-variant"),children:t.icon})),t.label,g&&n.jsx("span",{"aria-hidden":"true",className:"pointer-events-none ml-auto flex shrink-0 items-center pl-3",children:n.jsx(ae,{size:"sm",checked:t.checked===!0,onChange:()=>{},"aria-label":t.label})}),!g&&t.external&&n.jsx(U,{name:"open_in_new",size:x.icon-3,className:"ml-auto shrink-0 text-on-surface-variant/60"})]},t.id)})})]})]})}z.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"DropdownMenuItem | DropdownMenuSeparator",elements:[{name:"DropdownMenuItem"},{name:"DropdownMenuSeparator"}]}],raw:"DropdownMenuEntry[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: DropdownMenuItem) => void",signature:{arguments:[{type:{name:"DropdownMenuItem"},name:"item"}],return:{name:"void"}}},description:""},trigger:{required:!0,tsType:{name:"ReactNode"},description:""},offset:{required:!1,tsType:{name:"number"},description:"Horizontal offset from trigger. Positive = from start (left), negative = from end (right)",defaultValue:{value:"0",computed:!1}},notchWidth:{required:!1,tsType:{name:"number"},description:"Width of the notch tab (SVG units). Default `52`.",defaultValue:{value:"52",computed:!1}},notchHeight:{required:!1,tsType:{name:"number"},description:"Height of the notch tab (SVG units). Default `46`.",defaultValue:{value:"46",computed:!1}},notchRadius:{required:!1,tsType:{name:"number"},description:"Corner radius of the notch outline (SVG units). Default `12`. Lower it to\n match a small trigger's own radius for a less-rounded head (e.g. an icon\n button with an 8px radius).",defaultValue:{value:"12",computed:!1}},notchHeadRadius:{required:!1,tsType:{name:"number"},description:"Corner radius for ONLY the notch tab's outer corners (the tip), so the tab\n can be rounder than the menu body. Default = `notchRadius`."},notchInverseRadius:{required:!1,tsType:{name:"number"},description:"Radius of the notch's inverse (concave) corners, where the tab curves back\n into the card (SVG units). Default `10`. Usually scaled down alongside\n `notchRadius` for a tighter head.",defaultValue:{value:"10",computed:!1}},notchStrokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke (border) width of the notch outline, in px. Default `1.5`.",defaultValue:{value:"1.5",computed:!1}},useNotch:{required:!1,tsType:{name:"boolean"},description:"Render the kit's signature notch wrapping the trigger. Default `true`. Set\n to `false` for a plain floating menu (e.g. selects, period pickers).",defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:'Which side of the trigger the menu opens toward. `"top"` opens upward —\n use it for triggers anchored to the bottom of the viewport (e.g. a mobile\n bottom nav), where a downward menu would fall off-screen. Default `"bottom"`.',defaultValue:{value:'"bottom"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"md" | "lg"',elements:[{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:'Item density. `"lg"` enlarges padding, text, and icons to comfortable\n touch targets — use it for menus opened on touch surfaces (e.g. a mobile\n bottom nav). `"md"` is the default desktop density.',defaultValue:{value:'"md"',computed:!1}},openOnHover:{required:!1,tsType:{name:"boolean"},description:`Open the menu on mouse hover of the trigger, in addition to click.
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
 to nudge the whole notched card off the auto-aligned anchor.`},className:{required:!1,tsType:{name:"string"},description:""}}};const Oe={title:"UI/Navigation/DropdownMenu",component:z,decorators:[e=>n.jsx("div",{className:"p-8 min-h-[300px]",children:n.jsx(e,{})})]},C={args:{trigger:n.jsx(p,{icon:"more_vert","aria-label":"Open menu",variant:"filled"}),items:[{id:"edit",label:"Edit",icon:"edit"},{id:"duplicate",label:"Duplicate",icon:"content_copy"},{type:"separator"},{id:"delete",label:"Delete",icon:"delete",variant:"danger"}],onSelect:e=>console.log("Selected:",e.id)}},k={args:{trigger:n.jsx(p,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchRadius:8,notchInverseRadius:6,items:[{id:"repo",label:"Repository",external:!0,icon:n.jsx("svg",{viewBox:"0 0 16 16",width:16,height:16,fill:"currentColor",children:n.jsx("path",{d:"M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z"})})},{id:"docs",label:"Docs",icon:"menu_book",external:!0},{type:"separator"},{id:"settings",label:"Settings",icon:"settings"}],onSelect:e=>console.log("Selected:",e.id)}},D={args:{openOnHover:!0,trigger:n.jsx(p,{icon:"more_horiz","aria-label":"More",variant:"text"}),items:[{id:"rename",label:"Rename",icon:"edit"},{id:"move",label:"Move to…",icon:"drive_file_move"},{type:"separator"},{id:"archive",label:"Archive",icon:"archive"},{id:"delete",label:"Delete",icon:"delete",variant:"error"}],onSelect:e=>console.log("Selected:",e.id)}},f={args:{openOnHover:!0,trigger:n.jsx(p,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),items:[{id:"docs",label:"Docs",icon:"menu_book"},{type:"separator"},{id:"reduce-motion",label:"Reduce animation",checked:!1}],onSelect:e=>console.log("Selected:",e.id)}},O={...f,decorators:[e=>n.jsx("div",{className:"inline-block [&_[role=menu]]:pointer-events-none [&_[role=menuitem]]:pointer-events-auto",children:n.jsx(e,{})})]},T={args:{trigger:n.jsx(p,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),notchWidth:34,notchHeight:38,notchRadius:8,notchInverseRadius:6,items:[{id:"how",label:"How it works",icon:"play_circle"},{id:"source",label:"View source",icon:"code"},{type:"separator"},{id:"subscribe",label:"Get early access",icon:"mail"}],onSelect:e=>console.log("Selected:",e.id)}},I={args:{trigger:n.jsx(p,{icon:"account_circle","aria-label":"Account menu",variant:"text",size:"sm"}),notchWidth:44,notchHeight:44,notchRadius:12,notchHeadRadius:20,items:[{id:"profile",label:"Profile",icon:"person"},{id:"settings",label:"Settings",icon:"settings"},{type:"separator"},{id:"signout",label:"Sign out",icon:"logout"}],onSelect:e=>console.log("Selected:",e.id)}};async function ge(e){for(let s=0;s<50;s++){const u=e.querySelector('[role="menuitemcheckbox"]');if(u)return u;await new Promise(i=>setTimeout(i,20))}throw new Error("toggle row never rendered")}const _={play:async({canvasElement:e})=>{e.querySelector("button")?.click();const s=await ge(e);await document.fonts.ready,await new Promise(w=>requestAnimationFrame(()=>w(null)));const u=Array.from(s.childNodes).find(w=>w.nodeType===Node.TEXT_NODE),i=document.createRange();i.selectNodeContents(u);const h=i.getBoundingClientRect(),b=s.querySelector('[role="switch"]').getBoundingClientRect(),v=Math.abs(b.top+b.height/2-(h.top+h.height/2));if(console.log(`[ToggleItem] switch centreY - label centreY = ${v.toFixed(2)}px`),v>.5)throw new Error(`Switch is ${v.toFixed(2)}px off the label's centre`)},render:e=>{const[s,u]=a.useState(!1);return n.jsx(z,{...e,items:[{id:"docs",label:"Docs",icon:"menu_book"},{type:"separator"},{id:"reduce-motion",label:"Reduce animation",checked:s}],onSelect:i=>{i.id==="reduce-motion"&&u(h=>!h)}})},args:{trigger:n.jsx(p,{icon:"menu","aria-label":"Open menu",variant:"text",size:"sm"}),items:[],onSelect:()=>{}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source},description:{story:"An item's `icon` can be a custom node (e.g. a brand-logo SVG that Material\nSymbols doesn't ship) instead of an icon name &mdash; size it to ~the item\nicon size and use `currentColor`. `external: true` adds a trailing\nopen-in-new glyph for items that open in a new tab.",...k.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source},description:{story:`\`openOnHover\` opens the menu on mouse hover of the trigger, layered on top of
click. The menu stays open while the pointer is over the trigger or the menu,
and closes after a short grace on leave so trigger&rarr;menu travel does not
dismiss it. Mouse-only &mdash; touch/pen keep tap-to-toggle. Reach for it on a
desktop toolbar overflow menu, never a mobile bottom-nav menu. Hover over the
button below to open it.`,...D.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    openOnHover: true,
    trigger: <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />,
    items: [{
      id: "docs",
      label: "Docs",
      icon: "menu_book"
    }, {
      type: "separator" as const
    }, {
      id: "reduce-motion",
      label: "Reduce animation",
      checked: false
    }],
    onSelect: item => console.log("Selected:", item.id)
  }
}`,...f.parameters?.docs?.source},description:{story:"Hover menu with a separator above a toggle row (the mirrorstack.ai ≡ menu\nshape): the menu stays open over the whole card, separator included, and the\ndivider's block margin is `my-0.5` (a 6px gap each side with the 4px flex gap).",...f.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...OpenOnHoverSeparator,
  decorators: [Story =>
  // The menu wrapper is click-through and only item rows opt back in —
  // the shape of the mirrorstack.ai header's global CSS.
  <div className="inline-block [&_[role=menu]]:pointer-events-none [&_[role=menuitem]]:pointer-events-auto">
        <Story />
      </div>]
}`,...O.parameters?.docs?.source},description:{story:`Regression for a click-through header: the menu sits under a
click-through wrapper (\`pointer-events: none\` on the menu), yet the whole card (separator, padding, gaps)
stays hoverable, so a hover-open menu does not close while the pointer
crosses the divider.`,...O.parameters?.docs?.description}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source},description:{story:"The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the\ntab to the icon button, and `notchRadius`/`notchInverseRadius` round the head\ndown to the button's own corner radius instead of the default bulbous 16.",...T.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source},description:{story:"`notchHeadRadius` rounds ONLY the notch tab's outer corners, so an avatar\ntrigger gets a rounder tab (20) than the menu body (`notchRadius` 12).",...I.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source},description:{story:"An item with `checked` becomes a toggle row (`menuitemcheckbox`): no leading\nicon, a trailing Switch, and selecting it (click / Enter / Space) does NOT\nclose the menu — the caller flips its own state.",..._.parameters?.docs?.description}}};const Te=["Playground","CustomIconAndExternal","OpenOnHover","OpenOnHoverSeparator","OpenOnHoverUnderPointerNone","TightHead","RoundedHead","ToggleItem"];export{k as CustomIconAndExternal,D as OpenOnHover,f as OpenOnHoverSeparator,O as OpenOnHoverUnderPointerNone,C as Playground,I as RoundedHead,T as TightHead,_ as ToggleItem,Te as __namedExportsOrder,Oe as default};
