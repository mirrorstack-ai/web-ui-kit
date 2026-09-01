import{j as e}from"./iframe-BUbUdHYw.js";import{c as d}from"./cn-IyxL_b2c.js";import{t as c}from"./tone-B_C-zL0B.js";function l({title:i,description:t,leading:r,control:s,tone:n,className:a}){const o=n?c[n]:"border-outline-variant";return e.jsxs("div",{className:d("flex items-center gap-4 px-4 py-3 rounded-xl border bg-surface-container",o,a),children:[r&&e.jsx("div",{className:"shrink-0 flex items-center",children:r}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1.5",children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:i}),t&&e.jsx("p",{className:"text-xs text-on-surface-variant",children:t})]}),e.jsx("div",{className:"shrink-0 flex items-center",children:s})]})}l.__docgenInfo={description:"",methods:[],displayName:"SettingRow",props:{title:{required:!0,tsType:{name:"string"},description:"Primary heading for the row."},description:{required:!1,tsType:{name:"string"},description:"Optional supporting copy, rendered below the title."},leading:{required:!1,tsType:{name:"ReactNode"},description:`Optional mark, icon or badge rendered IN FRONT of the text.

For a row whose subject is a thing rather than a setting — the recipient of
a pending transfer, the member a permission belongs to — where the mark
identifies what the row is about. \`title\` and \`description\` are plain
strings, so without this slot a caller has no way to put one there and ends
up either attaching it to \`control\` (where it reads as decoration on the
action) or rebuilding the row by hand and drifting out of step with this
one.

Decorative by default: give it \`aria-hidden\` unless it carries meaning the
title does not already say in words.`},control:{required:!0,tsType:{name:"ReactNode"},description:"Right-aligned control — typically a Switch, Button, or status pill."},tone:{required:!1,tsType:{name:"Tone"},description:`When set, applies a colored border accent matching the tone. Default
(omitted) renders with the neutral outline-variant border.`},className:{required:!1,tsType:{name:"string"},description:""}}};export{l as S};
