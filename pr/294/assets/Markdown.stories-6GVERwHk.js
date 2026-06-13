import{r as E,j as t}from"./iframe-D4kk0uny.js";import{c as k}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const H=/(\*\*[^*]+\*\*|`[^`]+`)/g,I=/\r\n?/g,b=/^(#{1,3}) (.*)$/,f=/^[-*] /,v={1:{Tag:"h3",cls:"text-xl font-medium text-on-surface mt-4 first:mt-0"},2:{Tag:"h4",cls:"text-base font-medium text-on-surface mt-4 first:mt-0"},3:{Tag:"h5",cls:"text-sm font-medium text-on-surface mt-3 first:mt-0"}};function N(i){return i.split(H).map((n,s)=>n?n.startsWith("**")&&n.endsWith("**")?t.jsx("strong",{className:"font-semibold text-on-surface",children:n.slice(2,-2)},s):n.startsWith("`")&&n.endsWith("`")?t.jsx("code",{className:"font-mono bg-surface-container text-on-surface px-1 py-0.5 rounded text-xs",children:n.slice(1,-1)},s):t.jsx("span",{children:n},s):null)}const y=E.memo(function({source:x,className:n}){const s=x.replace(I,`
`).split(`
`),r=[];let e=0;for(;e<s.length;){const c=s[e],h=c.match(b);if(h){const a=h[1].length,o=h[2],{Tag:g,cls:j}=v[a];r.push(t.jsx(g,{className:j,children:o},r.length)),e++;continue}if(c.startsWith("```")){const a=c.slice(3),o=[];for(e++;e<s.length&&!s[e].startsWith("```");)o.push(s[e]),e++;e++,r.push(t.jsxs("pre",{className:"text-xs font-mono bg-surface-container text-on-surface p-3 rounded-lg overflow-x-auto leading-relaxed",children:[a&&t.jsx("span",{className:"block text-on-surface-variant/60 mb-1",children:a}),t.jsx("code",{children:o.join(`
`)})]},r.length));continue}if(f.test(c)){const a=[];for(;e<s.length&&f.test(s[e]);)a.push(s[e].slice(2)),e++;r.push(t.jsx("ul",{className:"list-disc pl-5 space-y-0.5 text-sm text-on-surface leading-relaxed",children:a.map((o,g)=>t.jsx("li",{children:N(o)},g))},r.length));continue}if(c.trim()===""){e++;continue}const w=[];for(;e<s.length&&s[e].trim()!==""&&!b.test(s[e])&&!s[e].startsWith("```")&&!f.test(s[e]);)w.push(s[e]),e++;r.push(t.jsx("p",{className:"text-sm text-on-surface-variant leading-relaxed",children:N(w.join(" "))},r.length))}return t.jsx("div",{className:k("space-y-2",n),children:r})});y.__docgenInfo={description:"",methods:[],displayName:"Markdown",props:{source:{required:!0,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const W={title:"UI/Data/Markdown",component:y,decorators:[i=>t.jsx("div",{className:"w-full max-w-prose bg-surface p-6",children:t.jsx(i,{})})]},_=`## What you'll get

Install **My Module** and your app picks up a new set of pages, actions, and notifications — no setup screens to fight through.

## How it shows up

- A new section in your sidebar where you can pick up where you left off
- Quick actions surfaced on the relevant detail pages
- Notifications when something happens that needs your attention

## Quick start

Drop a handler into another module to call into this one:

\`\`\`ts
import ms from "@mirrorstack/sdk";

const result = await ms.Call("@me/my-module", "do.thing", { /* ... */ });
\`\`\`

## Notes

This module is **read-only** for other modules — writes go through registered \`handlers\`, not direct table writes.`,l={args:{source:_}},d={args:{source:`# Heading level 1

## Heading level 2

### Heading level 3

Body text follows the smallest heading.`}},u={args:{source:`Most lines render as paragraphs with **bold** and \`code\` inline.

- First bullet with a \`code\` ref
- **Bold bullet** with emphasis
- Plain bullet

A second paragraph follows the list.`}},m={args:{source:"Fenced code blocks render with a monospace surface and an optional language label.\n\n```ts\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n```"}},p={args:{source:""}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    source: KITCHEN_SINK
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    source: \`# Heading level 1

## Heading level 2

### Heading level 3

Body text follows the smallest heading.\`
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    source: \`Most lines render as paragraphs with **bold** and \\\`code\\\` inline.

- First bullet with a \\\`code\\\` ref
- **Bold bullet** with emphasis
- Plain bullet

A second paragraph follows the list.\`
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{\n  args: {\n    source: `Fenced code blocks render with a monospace surface and an optional language label.\n\n\\`\\`\\`ts\nfunction greet(name: string): string {\n  return \\`Hello, \\${name}!\\`;\n}\n\\`\\`\\``\n  }\n}",...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    source: ""
  }
}`,...p.parameters?.docs?.source}}};const A=["Playground","Headings","ListsAndInlines","FencedCode","Empty"];export{p as Empty,m as FencedCode,d as Headings,u as ListsAndInlines,l as Playground,A as __namedExportsOrder,W as default};
