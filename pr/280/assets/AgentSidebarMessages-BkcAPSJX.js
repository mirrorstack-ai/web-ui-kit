import{j as e,r as c}from"./iframe-DzF_lBmQ.js";import{c as m}from"./cn-IyxL_b2c.js";import{I as S}from"./Icon-D2GP_f1c.js";import{L as R}from"./Logo-Da8yRPZQ.js";import{I as A}from"./IconButton-B_Dpoyvv.js";import{A as I}from"./AgentSidebarMultiQuestion-CA8gEpSP.js";function T({content:n,className:t}){return e.jsx("div",{className:m("flex justify-end",t),children:e.jsx("div",{className:"max-w-[85%] rounded-2xl rounded-br-md bg-inverse-on-surface/12 px-3 py-2 text-sm text-inverse-on-surface whitespace-pre-wrap break-words",children:n})})}function N({content:n,streaming:t=!1,feedback:r=null,onCopy:a,onFeedback:i,onRerun:p,actionLabels:g,className:o}){const l=t&&n.length===0,f=!t&&!!(a||i||p);return e.jsxs("div",{className:m("flex flex-col items-start",o),children:[e.jsxs("div",{className:"max-w-full text-sm text-inverse-on-surface whitespace-pre-wrap break-words leading-relaxed",children:[l?e.jsx(B,{}):n,t&&n.length>0&&e.jsx("span",{className:"ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse","aria-hidden":!0})]}),f&&e.jsx(E,{feedback:r,onCopy:a,onFeedback:i,onRerun:p,labels:g})]})}const _=1500,j="text-inverse-on-surface/60 hover:text-inverse-on-surface";function E({feedback:n,onCopy:t,onFeedback:r,onRerun:a,labels:i}){const[p,g]=c.useState(!1),o=c.useRef(void 0),l=c.useRef(!1);c.useEffect(()=>()=>{l.current=!0,clearTimeout(o.current)},[]);const f=async()=>{try{if(await t?.()===!1)return}catch{return}l.current||(g(!0),clearTimeout(o.current),o.current=setTimeout(()=>g(!1),_))},u=(b,h,y)=>{const x=n===b;return e.jsx(A,{icon:h,fill:x,variant:"text",size:"sm",className:x?"text-inverse-on-surface":j,onClick:()=>r?.(x?null:b),"aria-label":y,"aria-pressed":x})};return e.jsxs("div",{className:"pt-2 -ml-1.5 flex items-center gap-0.5",children:[t&&e.jsx(A,{icon:p?"check":"content_copy",variant:"text",size:"sm",className:j,onClick:f,"aria-label":p?i?.copied??"Copied":i?.copy??"Copy"}),r&&e.jsxs(e.Fragment,{children:[u("up","thumb_up",i?.good??"Good response"),u("down","thumb_down",i?.bad??"Bad response")]}),a&&e.jsx(A,{icon:"refresh",variant:"text",size:"sm",className:j,onClick:a,"aria-label":i?.rerun??"Rerun"})]})}function B(){const n="inline-block w-1 h-1 rounded-full bg-inverse-on-surface";return e.jsxs("span",{className:"inline-flex items-center gap-0.5 py-0.5",role:"status","aria-label":"Agent is thinking",children:[e.jsx("span",{className:m(n,"animate-bounce [animation-delay:-0.3s]")}),e.jsx("span",{className:m(n,"animate-bounce [animation-delay:-0.15s]")}),e.jsx("span",{className:m(n,"animate-bounce")})]})}T.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarUserMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};N.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarAgentMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},streaming:{required:!1,tsType:{name:"boolean"},description:"When true, renders typing indicator (if no content) or blinking cursor (if content).",defaultValue:{value:"false",computed:!1}},feedback:{required:!1,tsType:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},description:"Current feedback rating reflected on the thumbs.",defaultValue:{value:"null",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | boolean | Promise<void | boolean>",signature:{arguments:[],return:{name:"union",raw:"void | boolean | Promise<void | boolean>",elements:[{name:"void"},{name:"boolean"},{name:"Promise",elements:[{name:"union",raw:"void | boolean",elements:[{name:"void"},{name:"boolean"}]}],raw:"Promise<void | boolean>"}]}}},description:"Copy was clicked. The kit only flashes the icon to a check — the\n consumer performs the actual clipboard write. Return `false` (sync or\n resolved), or reject, to suppress the success flash."},onFeedback:{required:!1,tsType:{name:"signature",type:"function",raw:"(rating: AgentSidebarMessageFeedback) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onRerun:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentSidebarMessageActionLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Q={running:"Running",done:"Done",failed:"Failed",showDetail:"Show detail",hideDetail:"Hide detail"};function F(n){return n<1e3?`${n}ms`:`${(n/1e3).toFixed(1)}s`}function L({tool:n,toolLabels:t,className:r}){const a={...Q,...t},[i,p]=c.useState(!1),g=n.args!==void 0||n.result!==void 0||n.error!==void 0,o=n.status==="error",l=n.status==="started",f=l?a.running:o?a.failed:a.done,u=[n.appSlug,n.moduleSlug,n.tool].filter(Boolean).join(" · "),b=l?e.jsx("span",{className:"inline-block w-[14px] h-[14px] rounded-full border-2 border-inverse-on-surface/30 border-t-inverse-on-surface animate-spin shrink-0","aria-hidden":!0}):e.jsx(S,{name:o?"error":"check_circle",size:14,className:m("shrink-0",o?"text-error":"text-inverse-on-surface/60")}),h=e.jsxs(e.Fragment,{children:[b,e.jsx("span",{className:m("font-mono text-[11px] leading-none min-w-0 truncate flex-1",o?"text-error":"text-inverse-on-surface/60"),children:u}),n.durationMs!==void 0&&!l&&e.jsx("span",{className:"font-mono text-[11px] leading-none text-inverse-on-surface/40 shrink-0 tabular-nums",children:F(n.durationMs)}),g&&e.jsx(S,{name:i?"expand_less":"expand_more",size:14,className:"text-inverse-on-surface/40 shrink-0"})]});return e.jsxs("div",{className:m("flex flex-col gap-1",r),children:[g?e.jsx("button",{type:"button",onClick:()=>p(y=>!y),"aria-expanded":i,"aria-label":`${f}: ${u}. ${i?a.hideDetail:a.showDetail}`,className:"flex items-center gap-1.5 min-h-[24px] w-full text-left",children:h}):e.jsx("div",{className:"flex items-center gap-1.5 min-h-[24px]",role:o?"alert":"status","aria-label":`${f}: ${u}`,children:h}),i&&g&&e.jsxs("div",{className:"rounded bg-inverse-on-surface/[0.08] max-h-40 overflow-y-auto p-2 space-y-2 font-mono text-[11px] leading-relaxed text-inverse-on-surface/70",children:[n.args!==void 0&&e.jsx(q,{label:"args",text:JSON.stringify(n.args,null,2)}),n.result!==void 0&&e.jsx(q,{label:"result",text:JSON.stringify(n.result,null,2)}),n.error!==void 0&&e.jsx(q,{label:"error",text:n.error,error:!0})]})]})}function q({label:n,text:t,error:r=!1}){return e.jsxs("section",{children:[e.jsx("p",{className:m("mb-0.5",r?"text-error/70":"text-inverse-on-surface/40"),children:n}),e.jsx("pre",{className:m("whitespace-pre-wrap break-all",r&&"text-error"),children:t})]})}L.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarToolCall",props:{tool:{required:!0,tsType:{name:"AgentToolCall"},description:""},toolLabels:{required:!1,tsType:{name:"AgentToolCallLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function D(n){const t=[];for(const r of n)if(r.role==="tool"){const a=t[t.length-1];Array.isArray(a)?a.push(r):t.push([r])}else t.push(r);return t}const P=80;function z(n){let t=n?.parentElement??null;for(;t;){const r=getComputedStyle(t).overflowY;if(r==="auto"||r==="scroll")return t;t=t.parentElement}return null}function V({messages:n,onSubmitMultiQuestion:t,onCopyMessage:r,onRateMessage:a,onRerunMessage:i,actionLabels:p,toolLabels:g,showLogo:o=!1,autoScroll:l=!0,className:f}){const u=c.useRef(null),b=c.useRef(!0),h=c.useRef(!0),[y,x]=c.useState(!0);c.useEffect(()=>{const d=z(u.current);if(!d)return;const s=()=>{const k=d.scrollHeight-d.scrollTop-d.clientHeight<=P;k!==h.current&&(h.current=k,x(k))};return s(),d.addEventListener("scroll",s,{passive:!0}),()=>d.removeEventListener("scroll",s)},[]),c.useEffect(()=>{l&&(!b.current&&!h.current||(u.current?.scrollIntoView({behavior:b.current?"auto":"smooth",block:"end"}),b.current=!1))},[n,l]);const M=()=>{u.current?.scrollIntoView({behavior:"smooth",block:"end"})},w=n[n.length-1],C=o&&!!w&&w.role==="agent"&&!("kind"in w)&&!w.streaming;return e.jsxs("div",{className:m("flex flex-col gap-4",f),children:[D(n).map(d=>{if(Array.isArray(d))return e.jsx("div",{className:"flex flex-col gap-1",children:d.map(v=>e.jsx(L,{tool:v.tool,toolLabels:g},v.id))},d[0].id);const s=d;return s.role==="user"?e.jsx(T,{content:s.content},s.id):"kind"in s?e.jsx(I,{title:s.title,description:s.description,questions:s.questions,submitLabel:s.submitLabel,status:s.status,layout:s.layout,onSubmit:v=>t?.(s.id,v)},s.id):e.jsx(N,{content:s.content,streaming:s.streaming,feedback:s.feedback,onCopy:r&&(()=>r(s.id)),onFeedback:a&&(v=>a(s.id,v)),onRerun:i&&(()=>i(s.id)),actionLabels:p},s.id)}),C&&e.jsx("div",{"aria-hidden":!0,className:"flex justify-start",children:e.jsx(R,{className:"h-10 w-10 bg-inverse-primary"})}),e.jsx("div",{ref:u}),!y&&e.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:e.jsxs("button",{type:"button",onClick:M,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[e.jsx(S,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}V.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
    id: string;
    role: "user";
    content: string;
  }
| {
    id: string;
    role: "agent";
    content: string;
    streaming?: boolean;
    feedback?: AgentSidebarMessageFeedback;
  }
| {
    id: string;
    role: "agent";
    kind: "multi-question";
    title: string;
    description?: string;
    questions: AgentSidebarQuestion[];
    submitLabel?: string;
    status?: AgentSidebarMultiQuestionStatus;
    layout?: AgentSidebarMultiQuestionLayout;
  }
| {
    id: string;
    role: "tool";
    tool: AgentToolCall;
  }`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  role: "user";
  content: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"user"',required:!0}},{key:"content",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  id: string;
  role: "agent";
  content: string;
  streaming?: boolean;
  feedback?: AgentSidebarMessageFeedback;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"agent"',required:!0}},{key:"content",value:{name:"string",required:!0}},{key:"streaming",value:{name:"boolean",required:!1}},{key:"feedback",value:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  id: string;
  role: "agent";
  kind: "multi-question";
  title: string;
  description?: string;
  questions: AgentSidebarQuestion[];
  submitLabel?: string;
  status?: AgentSidebarMultiQuestionStatus;
  layout?: AgentSidebarMultiQuestionLayout;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"agent"',required:!0}},{key:"kind",value:{name:"literal",value:'"multi-question"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"description",value:{name:"string",required:!1}},{key:"questions",value:{name:"Array",elements:[{name:"union",raw:`| (QuestionBase & {
    type: "text";
    /** When true, renders as a textarea. */
    multiline?: boolean;
    placeholder?: string;
    defaultValue?: string;
  })
| (QuestionBase & {
    type: "toggle";
    defaultValue?: boolean;
  })
| (QuestionBase & {
    type: "choice";
    /** "segmented" — all options visible inline as a pill row (use for short labels, no descriptions).
     *  "cards" — radio-card list with title + description per option (use for weighted decisions). */
    style: AgentSidebarChoiceStyle;
    /** When true the user can pick more than one option; the answer is an array of values.
     *  Renders square check indicators (cards) or independently-toggling chips (segmented). */
    multiple?: boolean;
    options: {
      value: string;
      label: string;
      description?: string;
    }[];
    defaultValue?: string | string[];
  })`,elements:[{name:"unknown"},{name:"unknown"},{name:"unknown"}]}],raw:"AgentSidebarQuestion[]",required:!0}},{key:"submitLabel",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:'"pending" | "submitted"',elements:[{name:"literal",value:'"pending"'},{name:"literal",value:'"submitted"'}],required:!1}},{key:"layout",value:{name:"union",raw:'"list" | "tabs"',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"tabs"'}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  id: string;
  role: "tool";
  tool: AgentToolCall;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"literal",value:'"tool"',required:!0}},{key:"tool",value:{name:"AgentToolCall",required:!0}}]}}]}],raw:"AgentSidebarMessage[]"},description:""},onSubmitMultiQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  answers: Record<string, AgentSidebarMultiQuestionAnswer>,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean | string[]",elements:[{name:"string"},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},onCopyMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string) => void | boolean | Promise<void | boolean>",signature:{arguments:[{type:{name:"string"},name:"messageId"}],return:{name:"union",raw:"void | boolean | Promise<void | boolean>",elements:[{name:"void"},{name:"boolean"},{name:"Promise",elements:[{name:"union",raw:"void | boolean",elements:[{name:"void"},{name:"boolean"}]}],raw:"Promise<void | boolean>"}]}}},description:"Copy was clicked on a finished agent message. The kit only flashes the\n icon — the consumer performs the actual clipboard write. Return `false`\n (sync or resolved), or reject, to suppress the success flash."},onRateMessage:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  rating: AgentSidebarMessageFeedback,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onRerunMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string) => void",signature:{arguments:[{type:{name:"string"},name:"messageId"}],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentSidebarMessageActionLabels"},description:"Localizable aria-labels for the action buttons (English defaults)."},toolLabels:{required:!1,tsType:{name:"AgentToolCallLabels"},description:"Localizable status/aria text for tool-call rows (English defaults)."},showLogo:{required:!1,tsType:{name:"boolean"},description:`Render the brand logo once below the list when the last message is a
 finished agent message — a clear platform signature, never per-message.`,defaultValue:{value:"false",computed:!1}},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{N as A,V as a,T as b,L as c};
