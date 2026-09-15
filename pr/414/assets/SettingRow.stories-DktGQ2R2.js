import{j as i}from"./iframe-CZGGZTq5.js";import{S as c}from"./SettingRow-BnxqfQ6B.js";import{S as l}from"./Switch-B368tzuq.js";import{B as d}from"./Button-CNIsGsgA.js";import{F as p}from"./FloatingLabelInput-pdriVIS1.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./tone-B_C-zL0B.js";import"./Progress-Cqh_YKkW.js";import"./Icon-C-yoFhmU.js";import"./button-styles-CZHSjrxJ.js";import"./IconButton-C9bjaHZV.js";const D={title:"UI/Data/SettingRow",component:c,args:{title:"Developer mode",description:"Show the developer rail with module scaffolding, dev tunnel, and federation overrides.",control:i.jsx(l,{checked:!1,onChange:()=>{},"aria-label":"Developer mode"})},argTypes:{tone:{control:"select",options:[void 0,"primary","secondary","tertiary","error","warning","success","info"]}}},t={},o={args:{tone:"warning"}},n={args:{title:"Disable account",description:"Sign out and put your account in a suspended state. Use the email link to restore later.",tone:"error",control:i.jsx(d,{variant:"filled",color:"error",size:"sm",onClick:()=>{},children:"Disable"})}},a={args:{tone:"success",title:"Two-factor authentication",description:"Enabled with an authenticator app."}},s={args:{description:void 0}},e={args:{title:"Token ceiling",description:"The largest number of tokens one assistant reply may spend. Replies that would exceed it are cut at the boundary rather than refused.",control:i.jsx("div",{className:"w-32",children:i.jsx(p,{label:"Tokens",size:"sm",inputMode:"numeric",value:"4096",onChange:()=>{}})})}},r={args:{title:"Show the answer key",description:"Reveal correct answers after a learner submits, instead of keeping them hidden until the exam closes."}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "warning"
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Disable account",
    description: "Sign out and put your account in a suspended state. Use the email link to restore later.",
    tone: "error",
    control: <Button variant="filled" color="error" size="sm" onClick={() => {}}>
        Disable
      </Button>
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tone: "success",
    title: "Two-factor authentication",
    description: "Enabled with an authenticator app."
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    description: undefined
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Token ceiling",
    description: "The largest number of tokens one assistant reply may spend. Replies that would exceed it are cut at the boundary rather than refused.",
    control: <div className="w-32">
        <FloatingLabelInput label="Tokens" size="sm" inputMode="numeric" value="4096" onChange={() => {}} />
      </div>
  }
}`,...e.parameters?.docs?.source},description:{story:`🔴 THE CASE THE ROW USED TO SQUEEZE, kept as a story so it is renderable at
400px instead of being rediscovered on a module's PR.

A long description AND a control wider than a Switch. \`control\` is
\`shrink-0\`, so before the row could wrap, the text column was the only thing
able to give: it collapsed to a ribbon and broke this description across four
or five lines. Reported on ai-assistant's Model and Token-ceiling rows and
quiz-core's "Show the answer key" (f5, 2026-09-14).

Review it at 400px, not at the default viewport — at a comfortable width
there was never anything wrong with this row.`,...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Show the answer key",
    description: "Reveal correct answers after a learner submits, instead of keeping them hidden until the exam closes."
  }
}`,...r.parameters?.docs?.source},description:{story:`The same row with a Switch: narrow enough that it never reaches the wrap
 point, so this is the check that the fix left the already-fitting rows
 exactly where they were.`,...r.parameters?.docs?.description}}};const T=["Playground","Warning","Error","Success","NoDescription","LongDescriptionWithWideControl","NarrowControlDoesNotWrap"];export{n as Error,e as LongDescriptionWithWideControl,r as NarrowControlDoesNotWrap,s as NoDescription,t as Playground,a as Success,o as Warning,T as __namedExportsOrder,D as default};
