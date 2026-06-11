import{j as e,r as d}from"./iframe-BAoboyr4.js";import{c}from"./cn-IyxL_b2c.js";import{I as q}from"./Icon-DIRBCrGV.js";import{L as C}from"./Logo-Br7mKiLz.js";import{I as k}from"./IconButton-D28qyzKW.js";import{A as R}from"./AgentSidebarMultiQuestion-GGtMkZ1N.js";function S({content:n,className:s}){return e.jsx("div",{className:c("flex justify-end",s),children:e.jsx("div",{className:"max-w-[85%] rounded-2xl rounded-br-md bg-inverse-on-surface/12 px-3 py-2 text-sm text-inverse-on-surface whitespace-pre-wrap break-words",children:n})})}function T({content:n,streaming:s=!1,feedback:a=null,onCopy:i,onFeedback:r,onRerun:g,actionLabels:m,className:o}){const l=s&&n.length===0,p=!s&&!!(i||r||g);return e.jsxs("div",{className:c("flex flex-col items-start",o),children:[e.jsxs("div",{className:"max-w-full text-sm text-inverse-on-surface whitespace-pre-wrap break-words leading-relaxed",children:[l?e.jsx(E,{}):n,s&&n.length>0&&e.jsx("span",{className:"ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse","aria-hidden":!0})]}),p&&e.jsx(_,{feedback:a,onCopy:i,onFeedback:r,onRerun:g,labels:m})]})}const I=1500,j="text-inverse-on-surface/60 hover:text-inverse-on-surface";function _({feedback:n,onCopy:s,onFeedback:a,onRerun:i,labels:r}){const[g,m]=d.useState(!1),o=d.useRef(void 0),l=d.useRef(!1);d.useEffect(()=>()=>{l.current=!0,clearTimeout(o.current)},[]);const p=async()=>{try{if(await s?.()===!1)return}catch{return}l.current||(m(!0),clearTimeout(o.current),o.current=setTimeout(()=>m(!1),I))},u=(f,b,x)=>{const v=n===f;return e.jsx(k,{icon:b,fill:v,variant:"text",size:"sm",className:v?"text-inverse-on-surface":j,onClick:()=>a?.(v?null:f),"aria-label":x,"aria-pressed":v})};return e.jsxs("div",{className:"pt-2 -ml-1.5 flex items-center gap-0.5",children:[s&&e.jsx(k,{icon:g?"check":"content_copy",variant:"text",size:"sm",className:j,onClick:p,"aria-label":g?r?.copied??"Copied":r?.copy??"Copy"}),a&&e.jsxs(e.Fragment,{children:[u("up","thumb_up",r?.good??"Good response"),u("down","thumb_down",r?.bad??"Bad response")]}),i&&e.jsx(k,{icon:"refresh",variant:"text",size:"sm",className:j,onClick:i,"aria-label":r?.rerun??"Rerun"})]})}function E(){const n="inline-block w-1 h-1 rounded-full bg-inverse-on-surface";return e.jsxs("span",{className:"inline-flex items-center gap-0.5 py-0.5",role:"status","aria-label":"Agent is thinking",children:[e.jsx("span",{className:c(n,"animate-bounce [animation-delay:-0.3s]")}),e.jsx("span",{className:c(n,"animate-bounce [animation-delay:-0.15s]")}),e.jsx("span",{className:c(n,"animate-bounce")})]})}S.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarUserMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};T.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarAgentMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},streaming:{required:!1,tsType:{name:"boolean"},description:"When true, renders typing indicator (if no content) or blinking cursor (if content).",defaultValue:{value:"false",computed:!1}},feedback:{required:!1,tsType:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},description:"Current feedback rating reflected on the thumbs.",defaultValue:{value:"null",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | boolean | Promise<void | boolean>",signature:{arguments:[],return:{name:"union",raw:"void | boolean | Promise<void | boolean>",elements:[{name:"void"},{name:"boolean"},{name:"Promise",elements:[{name:"union",raw:"void | boolean",elements:[{name:"void"},{name:"boolean"}]}],raw:"Promise<void | boolean>"}]}}},description:"Copy was clicked. The kit only flashes the icon to a check — the\n consumer performs the actual clipboard write. Return `false` (sync or\n resolved), or reject, to suppress the success flash."},onFeedback:{required:!1,tsType:{name:"signature",type:"function",raw:"(rating: AgentSidebarMessageFeedback) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onRerun:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentSidebarMessageActionLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const B={running:"Running",done:"Done",failed:"Failed",showDetail:"Show detail",hideDetail:"Hide detail"};function Q(n){return n<1e3?`${n}ms`:`${(n/1e3).toFixed(1)}s`}function N({tool:n,toolLabels:s,className:a}){const i={...B,...s},[r,g]=d.useState(!1),m=n.args!==void 0||n.result!==void 0||n.error!==void 0,o=n.status==="error",l=n.status==="started",p=l?i.running:o?i.failed:i.done,u=[n.appSlug,n.moduleSlug,n.tool].filter(Boolean).join(" · "),f=l?e.jsx("span",{className:"inline-block w-[14px] h-[14px] rounded-full border-2 border-inverse-on-surface/30 border-t-inverse-on-surface animate-spin shrink-0","aria-hidden":!0}):e.jsx(q,{name:o?"error":"check_circle",size:14,className:c("shrink-0",o?"text-error":"text-inverse-on-surface/60")}),b=e.jsxs(e.Fragment,{children:[f,e.jsx("span",{className:c("font-mono text-[11px] leading-none min-w-0 truncate flex-1",o?"text-error":"text-inverse-on-surface/60"),children:u}),n.durationMs!==void 0&&!l&&e.jsx("span",{className:"font-mono text-[11px] leading-none text-inverse-on-surface/40 shrink-0 tabular-nums",children:Q(n.durationMs)}),m&&e.jsx(q,{name:r?"expand_less":"expand_more",size:14,className:"text-inverse-on-surface/40 shrink-0"})]});return e.jsxs("div",{className:c("flex flex-col gap-1",a),children:[m?e.jsx("button",{type:"button",onClick:()=>g(x=>!x),"aria-expanded":r,"aria-label":`${p}: ${u}. ${r?i.hideDetail:i.showDetail}`,className:"flex items-center gap-1.5 min-h-[24px] w-full text-left",children:b}):e.jsx("div",{className:"flex items-center gap-1.5 min-h-[24px]",role:"status","aria-label":`${p}: ${u}`,children:b}),r&&m&&e.jsxs("div",{className:"rounded bg-inverse-on-surface/[0.08] max-h-40 overflow-y-auto p-2 space-y-2 font-mono text-[11px] leading-relaxed text-inverse-on-surface/70",children:[n.args!==void 0&&e.jsx(A,{label:"args",text:JSON.stringify(n.args,null,2)}),n.result!==void 0&&e.jsx(A,{label:"result",text:JSON.stringify(n.result,null,2)}),n.error!==void 0&&e.jsx(A,{label:"error",text:n.error,error:!0})]})]})}function A({label:n,text:s,error:a=!1}){return e.jsxs("section",{children:[e.jsx("p",{className:c("mb-0.5",a?"text-error/70":"text-inverse-on-surface/40"),children:n}),e.jsx("pre",{className:c("whitespace-pre-wrap break-all",a&&"text-error"),children:s})]})}N.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarToolCall",props:{tool:{required:!0,tsType:{name:"AgentToolCall"},description:""},toolLabels:{required:!1,tsType:{name:"AgentToolCallLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const F=80;function D(n){let s=n?.parentElement??null;for(;s;){const a=getComputedStyle(s).overflowY;if(a==="auto"||a==="scroll")return s;s=s.parentElement}return null}function P({messages:n,onSubmitMultiQuestion:s,onCopyMessage:a,onRateMessage:i,onRerunMessage:r,actionLabels:g,toolLabels:m,showLogo:o=!1,autoScroll:l=!0,className:p}){const u=d.useRef(null),f=d.useRef(!0),b=d.useRef(!0),[x,v]=d.useState(!0);d.useEffect(()=>{const t=D(u.current);if(!t)return;const h=()=>{const w=t.scrollHeight-t.scrollTop-t.clientHeight<=F;w!==b.current&&(b.current=w,v(w))};return h(),t.addEventListener("scroll",h,{passive:!0}),()=>t.removeEventListener("scroll",h)},[]),d.useEffect(()=>{l&&(!f.current&&!b.current||(u.current?.scrollIntoView({behavior:f.current?"auto":"smooth",block:"end"}),f.current=!1))},[n,l]);const L=()=>{u.current?.scrollIntoView({behavior:"smooth",block:"end"})},y=n[n.length-1],M=o&&!!y&&y.role==="agent"&&!("kind"in y)&&!y.streaming;return e.jsxs("div",{className:c("flex flex-col gap-4",p),children:[n.map(t=>t.role==="user"?e.jsx(S,{content:t.content},t.id):t.role==="tool"?e.jsx(N,{tool:t.tool,toolLabels:m},t.id):"kind"in t?e.jsx(R,{title:t.title,description:t.description,questions:t.questions,submitLabel:t.submitLabel,status:t.status,layout:t.layout,onSubmit:h=>s?.(t.id,h)},t.id):e.jsx(T,{content:t.content,streaming:t.streaming,feedback:t.feedback,onCopy:a&&(()=>a(t.id)),onFeedback:i&&(h=>i(t.id,h)),onRerun:r&&(()=>r(t.id)),actionLabels:g},t.id)),M&&e.jsx("div",{"aria-hidden":!0,className:"flex justify-start",children:e.jsx(C,{className:"h-10 w-10 bg-inverse-primary"})}),e.jsx("div",{ref:u}),!x&&e.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:e.jsxs("button",{type:"button",onClick:L,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[e.jsx(q,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}P.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
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
 finished agent message — a clear platform signature, never per-message.`,defaultValue:{value:"false",computed:!1}},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{T as A,P as a,S as b,N as c};
