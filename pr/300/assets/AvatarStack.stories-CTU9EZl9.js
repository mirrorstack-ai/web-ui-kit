import{j as e}from"./iframe-C84YAg-v.js";import{c as k}from"./cn-IyxL_b2c.js";import{A}from"./Avatar-CAf233r9.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-NdozMjzx.js";const N={sm:"-ml-2",md:"-ml-3",lg:"-ml-5",xl:"-ml-6"};function p({items:a,max:y=4,size:d="sm",trailing:m,total:w,className:S}){const u=Math.max(y,2),v=Math.max(w??0,a.length),g=v>u,h=g?a.slice(0,u-1):a,f=v-h.length,q=N[d],b=[...h,...g?[{fallback:f>99?"99+":`+${f}`}]:[],...m?[m]:[]];return b.length===0?null:e.jsx("div",{className:k("flex items-center",S),children:b.map((o,x)=>e.jsx(A,{src:o.src,fallback:o.fallback,square:o.square,size:d,opaque:!0,className:k(x>0&&q)},o.id??x))})}p.__docgenInfo={description:"",methods:[],displayName:"AvatarStack",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"AvatarStackItem"}],raw:"AvatarStackItem[]"},description:""},max:{required:!1,tsType:{name:"number"},description:"Total visible slots including the overflow chip. When `items` exceeds\nthis, the first `max - 1` render and the rest collapse into a `+N` chip,\nso the stack never grows past `max` elements (plus `trailing`).",defaultValue:{value:"4",computed:!1}},size:{required:!1,tsType:{name:"AvatarSize"},description:"",defaultValue:{value:'"sm"',computed:!1}},trailing:{required:!1,tsType:{name:"AvatarStackItem"},description:`Always rendered last and never collapsed — for a distinguished principal
that must stay visible, e.g. the owning org (square) at the end of a
member stack.`},total:{required:!1,tsType:{name:"number"},description:"Total items the stack represents when `items` is a server-capped\npreview — the overflow chip then shows `total - visible` instead of\n`items.length - visible`. Defaults to `items.length`; values below it\nare clamped up."},className:{required:!1,tsType:{name:"string"},description:""}}};const r=[{src:"https://i.pravatar.cc/150?img=12",fallback:"AK"},{src:"https://i.pravatar.cc/150?img=32",fallback:"MB"},{fallback:"JL"},{src:"https://i.pravatar.cc/150?img=5",fallback:"RS"},{fallback:"TN"},{fallback:"CW"}],K={title:"UI/Media/AvatarStack",component:p,args:{items:r.slice(0,3),max:4,size:"sm"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},max:{control:"number"}}},l={},s={args:{items:r}},t={args:{items:r.slice(0,4),total:12}},i={args:{items:r,trailing:{fallback:"KP",square:!0}}},c={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:["sm","md","lg","xl"].map(a=>e.jsx(p,{size:a,items:r,trailing:{fallback:"KP",square:!0}},a))})},n={render:()=>e.jsx("div",{className:"relative aspect-video w-80 overflow-hidden rounded-2xl",style:{background:"linear-gradient(140deg, var(--color-primary) 0%, #04121a 100%)"},children:e.jsx("div",{className:"absolute inset-x-0 bottom-0 flex items-end justify-end p-4",children:e.jsx(p,{items:r,trailing:{fallback:"KP",square:!0}})})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: people
  }
}`,...s.parameters?.docs?.source},description:{story:"`max` is the total visible slots including the overflow chip. Six items\nwith `max={4}` render three avatars + a `+3` chip; the chip reuses the\nAvatar initials fallback so it inherits theme and size for free.",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    items: people.slice(0, 4),
    total: 12
  }
}`,...t.parameters?.docs?.source},description:{story:"When `items` is a server-capped preview, pass `total` and the chip reports\nthe real remainder — here a 4-item preview of a 12-member list renders\nthree avatars + `+9`.",...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: people,
    trailing: {
      fallback: "KP",
      square: true
    }
  }
}`,...i.parameters?.docs?.source},description:{story:"`trailing` always renders last and never collapses into the chip — here a\nsquare org avatar pinned after the member stack, the /apps tile layout\n(members + owning org).",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <AvatarStack key={size} size={size} items={people} trailing={{
      fallback: "KP",
      square: true
    }} />)}
    </div>
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source},description:{story:"Over a cover image (the /apps and /orgs tile context) the stack sits on\nthe scrim; each Avatar's built-in 2px primary border doubles as the\noverlap separator and picks up scoped `brandVars` accents.",...n.parameters?.docs?.description}}};const C=["Playground","Overflow","CappedPreview","TrailingOrg","Sizes","OverCover"];export{t as CappedPreview,n as OverCover,s as Overflow,l as Playground,c as Sizes,i as TrailingOrg,C as __namedExportsOrder,K as default};
