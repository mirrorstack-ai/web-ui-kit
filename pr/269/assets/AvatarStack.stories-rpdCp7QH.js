import{j as e}from"./iframe-sQLmcZwv.js";import{c as l}from"./cn-IyxL_b2c.js";import{A as x}from"./Avatar-BYnzJrch.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-CxlfvUP5.js";const S={sm:"-ml-2",md:"-ml-3",lg:"-ml-5",xl:"-ml-6"},N={sm:"rounded-lg",md:"rounded-xl",lg:"rounded-2xl",xl:"rounded-3xl"};function u({items:a,max:y=4,size:t="sm",trailing:r,className:q}){const b=Math.max(y,2),v=a.length>b,n=v?a.slice(0,b-1):a,h=a.length-n.length,g=S[t];if(n.length===0&&!r)return null;const f=s=>l("bg-surface",s?N[t]:"rounded-full");return e.jsxs("div",{className:l("flex items-center",q),children:[n.map((s,k)=>e.jsx(x,{src:s.src,fallback:s.fallback,square:s.square,size:t,className:l(f(s.square),k>0&&g)},k)),v&&e.jsx(x,{fallback:h>99?"99+":`+${h}`,size:t,className:l(f(),n.length>0&&g)}),r&&e.jsx(x,{src:r.src,fallback:r.fallback,square:r.square,size:t,className:l(f(r.square),(n.length>0||v)&&g)})]})}u.__docgenInfo={description:"",methods:[],displayName:"AvatarStack",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"AvatarStackItem"}],raw:"AvatarStackItem[]"},description:""},max:{required:!1,tsType:{name:"number"},description:"Total visible slots including the overflow chip. When `items` exceeds\nthis, the first `max - 1` render and the rest collapse into a `+N` chip,\nso the stack never grows past `max` elements (plus `trailing`).",defaultValue:{value:"4",computed:!1}},size:{required:!1,tsType:{name:"AvatarSize"},description:"",defaultValue:{value:'"sm"',computed:!1}},trailing:{required:!1,tsType:{name:"AvatarStackItem"},description:`Always rendered last and never collapsed — for a distinguished principal
that must stay visible, e.g. the owning org (square) at the end of a
member stack.`},className:{required:!1,tsType:{name:"string"},description:""}}};const m=[{src:"https://i.pravatar.cc/150?img=12",fallback:"AK"},{src:"https://i.pravatar.cc/150?img=32",fallback:"MB"},{fallback:"JL"},{src:"https://i.pravatar.cc/150?img=5",fallback:"RS"},{fallback:"TN"},{fallback:"CW"}],P={title:"UI/Media/AvatarStack",component:u,args:{items:m.slice(0,3),max:4,size:"sm"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},max:{control:"number"}}},d={},o={args:{items:m,max:4}},i={args:{items:m,max:4,trailing:{fallback:"KP",square:!0}}},p={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:["sm","md","lg","xl"].map(a=>e.jsx(u,{size:a,items:m,max:4,trailing:{fallback:"KP",square:!0}},a))})},c={render:()=>e.jsxs("div",{className:"relative aspect-video w-80 overflow-hidden rounded-2xl",children:[e.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(140deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 55%, #04121a) 100%)"}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"}),e.jsx("div",{className:"absolute inset-x-0 bottom-0 flex items-end justify-end p-4",children:e.jsx(u,{items:m,max:4,trailing:{fallback:"KP",square:!0}})})]})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: people,
    max: 4
  }
}`,...o.parameters?.docs?.source},description:{story:"`max` is the total visible slots including the overflow chip. Six items\nwith `max={4}` render three avatars + a `+3` chip; the chip reuses the\nAvatar initials fallback so it inherits theme and size for free.",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: people,
    max: 4,
    trailing: {
      fallback: "KP",
      square: true
    }
  }
}`,...i.parameters?.docs?.source},description:{story:"`trailing` always renders last and never collapses into the chip — here a\nsquare org avatar pinned after the member stack, the /apps tile layout\n(members + owning org).",...i.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map(size => <AvatarStack key={size} size={size} items={people} max={4} trailing={{
      fallback: "KP",
      square: true
    }} />)}
    </div>
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="relative aspect-video w-80 overflow-hidden rounded-2xl">
      <div className="absolute inset-0" style={{
      background: "linear-gradient(140deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 55%, #04121a) 100%)"
    }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4">
        <AvatarStack items={people} max={4} trailing={{
        fallback: "KP",
        square: true
      }} />
      </div>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Over a cover image (the /apps and /orgs tile context) the stack sits on\nthe scrim; each Avatar's built-in 2px primary border doubles as the\noverlap separator and picks up scoped `brandVars` accents.",...c.parameters?.docs?.description}}};const z=["Playground","Overflow","TrailingOrg","Sizes","OverCover"];export{c as OverCover,o as Overflow,d as Playground,p as Sizes,i as TrailingOrg,z as __namedExportsOrder,P as default};
