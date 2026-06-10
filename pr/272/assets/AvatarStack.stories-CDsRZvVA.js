import{j as a}from"./iframe-DFqMsVVo.js";import{c as x}from"./cn-IyxL_b2c.js";import{A as S}from"./Avatar-usdK6QuG.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-Bm3E_2A1.js";const A={sm:"-ml-2",md:"-ml-3",lg:"-ml-5",xl:"-ml-6"};function c({items:e,max:b=4,size:d="sm",trailing:m,className:k}){const p=Math.max(b,2),u=e.length>p,g=u?e.slice(0,p-1):e,v=e.length-g.length,y=A[d],f=[...g,...u?[{fallback:v>99?"99+":`+${v}`}]:[],...m?[m]:[]];return f.length===0?null:a.jsx("div",{className:x("flex items-center",k),children:f.map((n,h)=>a.jsx(S,{src:n.src,fallback:n.fallback,square:n.square,size:d,opaque:!0,className:x(h>0&&y)},n.id??h))})}c.__docgenInfo={description:"",methods:[],displayName:"AvatarStack",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"AvatarStackItem"}],raw:"AvatarStackItem[]"},description:""},max:{required:!1,tsType:{name:"number"},description:"Total visible slots including the overflow chip. When `items` exceeds\nthis, the first `max - 1` render and the rest collapse into a `+N` chip,\nso the stack never grows past `max` elements (plus `trailing`).",defaultValue:{value:"4",computed:!1}},size:{required:!1,tsType:{name:"AvatarSize"},description:"",defaultValue:{value:'"sm"',computed:!1}},trailing:{required:!1,tsType:{name:"AvatarStackItem"},description:`Always rendered last and never collapsed — for a distinguished principal
that must stay visible, e.g. the owning org (square) at the end of a
member stack.`},className:{required:!1,tsType:{name:"string"},description:""}}};const i=[{src:"https://i.pravatar.cc/150?img=12",fallback:"AK"},{src:"https://i.pravatar.cc/150?img=32",fallback:"MB"},{fallback:"JL"},{src:"https://i.pravatar.cc/150?img=5",fallback:"RS"},{fallback:"TN"},{fallback:"CW"}],T={title:"UI/Media/AvatarStack",component:c,args:{items:i.slice(0,3),max:4,size:"sm"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},max:{control:"number"}}},l={},r={args:{items:i}},s={args:{items:i,trailing:{fallback:"KP",square:!0}}},o={render:()=>a.jsx("div",{className:"flex flex-col gap-4",children:["sm","md","lg","xl"].map(e=>a.jsx(c,{size:e,items:i,trailing:{fallback:"KP",square:!0}},e))})},t={render:()=>a.jsx("div",{className:"relative aspect-video w-80 overflow-hidden rounded-2xl",style:{background:"linear-gradient(140deg, var(--color-primary) 0%, #04121a 100%)"},children:a.jsx("div",{className:"absolute inset-x-0 bottom-0 flex items-end justify-end p-4",children:a.jsx(c,{items:i,trailing:{fallback:"KP",square:!0}})})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: people
  }
}`,...r.parameters?.docs?.source},description:{story:"`max` is the total visible slots including the overflow chip. Six items\nwith `max={4}` render three avatars + a `+3` chip; the chip reuses the\nAvatar initials fallback so it inherits theme and size for free.",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: people,
    trailing: {
      fallback: "KP",
      square: true
    }
  }
}`,...s.parameters?.docs?.source},description:{story:"`trailing` always renders last and never collapses into the chip — here a\nsquare org avatar pinned after the member stack, the /apps tile layout\n(members + owning org).",...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <AvatarStack key={size} size={size} items={people} trailing={{
      fallback: "KP",
      square: true
    }} />)}
    </div>
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="relative aspect-video w-80 overflow-hidden rounded-2xl" style={{
    background: "linear-gradient(140deg, var(--color-primary) 0%, #04121a 100%)"
  }}>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4">
        <AvatarStack items={people} trailing={{
        fallback: "KP",
        square: true
      }} />
      </div>
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Over a cover image (the /apps and /orgs tile context) the stack sits on\nthe scrim; each Avatar's built-in 2px primary border doubles as the\noverlap separator and picks up scoped `brandVars` accents.",...t.parameters?.docs?.description}}};const O=["Playground","Overflow","TrailingOrg","Sizes","OverCover"];export{t as OverCover,r as Overflow,l as Playground,o as Sizes,s as TrailingOrg,O as __namedExportsOrder,T as default};
