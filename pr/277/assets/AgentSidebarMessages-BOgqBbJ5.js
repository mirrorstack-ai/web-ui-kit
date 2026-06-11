import{j as e,r as i}from"./iframe-DxL3nKuJ.js";import{c as v}from"./cn-IyxL_b2c.js";import{I as T}from"./Icon-BBuaAmW9.js";import{L as M}from"./Logo-CfBrbbiy.js";import{I as x}from"./IconButton-CGAbIRCp.js";import{A as N}from"./AgentSidebarMultiQuestion-UJsNGD28.js";function A({content:t,className:s}){return e.jsx("div",{className:v("flex justify-end",s),children:e.jsx("div",{className:"max-w-[85%] rounded-2xl rounded-br-md bg-inverse-on-surface/12 px-3 py-2 text-sm text-inverse-on-surface whitespace-pre-wrap break-words",children:t})})}function j({content:t,streaming:s=!1,feedback:r=null,onCopy:o,onFeedback:a,onRerun:d,actionLabels:m,className:l}){const g=s&&t.length===0,u=!s&&!!(o||a||d);return e.jsxs("div",{className:v("flex flex-col items-start",l),children:[e.jsxs("div",{className:"max-w-full text-sm text-inverse-on-surface whitespace-pre-wrap break-words leading-relaxed",children:[g?e.jsx(L,{}):t,s&&t.length>0&&e.jsx("span",{className:"ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse","aria-hidden":!0})]}),u&&e.jsx(I,{feedback:r,onCopy:o,onFeedback:a,onRerun:d,labels:m})]})}const R=1500,q="text-inverse-on-surface/60 hover:text-inverse-on-surface";function I({feedback:t,onCopy:s,onFeedback:r,onRerun:o,labels:a}){const[d,m]=i.useState(!1),l=i.useRef(void 0),g=i.useRef(!1);i.useEffect(()=>()=>{g.current=!0,clearTimeout(l.current)},[]);const u=async()=>{try{if(await s?.()===!1)return}catch{return}g.current||(m(!0),clearTimeout(l.current),l.current=setTimeout(()=>m(!1),R))},p=(f,y,w)=>{const b=t===f;return e.jsx(x,{icon:y,fill:b,variant:"text",size:"sm",className:b?"text-inverse-on-surface":q,onClick:()=>r?.(b?null:f),"aria-label":w,"aria-pressed":b})};return e.jsxs("div",{className:"pt-2 -ml-1.5 flex items-center gap-0.5",children:[s&&e.jsx(x,{icon:d?"check":"content_copy",variant:"text",size:"sm",className:q,onClick:u,"aria-label":d?a?.copied??"Copied":a?.copy??"Copy"}),r&&e.jsxs(e.Fragment,{children:[p("up","thumb_up",a?.good??"Good response"),p("down","thumb_down",a?.bad??"Bad response")]}),o&&e.jsx(x,{icon:"refresh",variant:"text",size:"sm",className:q,onClick:o,"aria-label":a?.rerun??"Rerun"})]})}function L(){const t="inline-block w-1 h-1 rounded-full bg-inverse-on-surface";return e.jsxs("span",{className:"inline-flex items-center gap-0.5 py-0.5",role:"status","aria-label":"Agent is thinking",children:[e.jsx("span",{className:v(t,"animate-bounce [animation-delay:-0.3s]")}),e.jsx("span",{className:v(t,"animate-bounce [animation-delay:-0.15s]")}),e.jsx("span",{className:v(t,"animate-bounce")})]})}A.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarUserMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};j.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarAgentMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},streaming:{required:!1,tsType:{name:"boolean"},description:"When true, renders typing indicator (if no content) or blinking cursor (if content).",defaultValue:{value:"false",computed:!1}},feedback:{required:!1,tsType:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},description:"Current feedback rating reflected on the thumbs.",defaultValue:{value:"null",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | boolean | Promise<void | boolean>",signature:{arguments:[],return:{name:"union",raw:"void | boolean | Promise<void | boolean>",elements:[{name:"void"},{name:"boolean"},{name:"Promise",elements:[{name:"union",raw:"void | boolean",elements:[{name:"void"},{name:"boolean"}]}],raw:"Promise<void | boolean>"}]}}},description:"Copy was clicked. The kit only flashes the icon to a check — the\n consumer performs the actual clipboard write. Return `false` (sync or\n resolved), or reject, to suppress the success flash."},onFeedback:{required:!1,tsType:{name:"signature",type:"function",raw:"(rating: AgentSidebarMessageFeedback) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onRerun:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentSidebarMessageActionLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const _=80;function C(t){let s=t?.parentElement??null;for(;s;){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll")return s;s=s.parentElement}return null}function Q({messages:t,onSubmitMultiQuestion:s,onCopyMessage:r,onRateMessage:o,onRerunMessage:a,actionLabels:d,showLogo:m=!1,autoScroll:l=!0,className:g}){const u=i.useRef(null),p=i.useRef(!0),f=i.useRef(!0),[y,w]=i.useState(!0);i.useEffect(()=>{const n=C(u.current);if(!n)return;const c=()=>{const k=n.scrollHeight-n.scrollTop-n.clientHeight<=_;k!==f.current&&(f.current=k,w(k))};return c(),n.addEventListener("scroll",c,{passive:!0}),()=>n.removeEventListener("scroll",c)},[]),i.useEffect(()=>{l&&(!p.current&&!f.current||(u.current?.scrollIntoView({behavior:p.current?"auto":"smooth",block:"end"}),p.current=!1))},[t,l]);const b=()=>{u.current?.scrollIntoView({behavior:"smooth",block:"end"})},h=t[t.length-1],S=m&&!!h&&h.role==="agent"&&!("kind"in h)&&!h.streaming;return e.jsxs("div",{className:v("flex flex-col gap-4",g),children:[t.map(n=>n.role==="user"?e.jsx(A,{content:n.content},n.id):"kind"in n?e.jsx(N,{title:n.title,description:n.description,questions:n.questions,submitLabel:n.submitLabel,status:n.status,layout:n.layout,onSubmit:c=>s?.(n.id,c)},n.id):e.jsx(j,{content:n.content,streaming:n.streaming,feedback:n.feedback,onCopy:r&&(()=>r(n.id)),onFeedback:o&&(c=>o(n.id,c)),onRerun:a&&(()=>a(n.id)),actionLabels:d},n.id)),S&&e.jsx("div",{"aria-hidden":!0,className:"flex justify-start",children:e.jsx(M,{className:"h-10 w-10 bg-inverse-primary"})}),e.jsx("div",{ref:u}),!y&&e.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:e.jsxs("button",{type:"button",onClick:b,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[e.jsx(T,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}Q.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
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
  })`,elements:[{name:"unknown"},{name:"unknown"},{name:"unknown"}]}],raw:"AgentSidebarQuestion[]",required:!0}},{key:"submitLabel",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:'"pending" | "submitted"',elements:[{name:"literal",value:'"pending"'},{name:"literal",value:'"submitted"'}],required:!1}},{key:"layout",value:{name:"union",raw:'"list" | "tabs"',elements:[{name:"literal",value:'"list"'},{name:"literal",value:'"tabs"'}],required:!1}}]}}]}],raw:"AgentSidebarMessage[]"},description:""},onSubmitMultiQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  answers: Record<string, AgentSidebarMultiQuestionAnswer>,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean | string[]",elements:[{name:"string"},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},onCopyMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string) => void | boolean | Promise<void | boolean>",signature:{arguments:[{type:{name:"string"},name:"messageId"}],return:{name:"union",raw:"void | boolean | Promise<void | boolean>",elements:[{name:"void"},{name:"boolean"},{name:"Promise",elements:[{name:"union",raw:"void | boolean",elements:[{name:"void"},{name:"boolean"}]}],raw:"Promise<void | boolean>"}]}}},description:"Copy was clicked on a finished agent message. The kit only flashes the\n icon — the consumer performs the actual clipboard write. Return `false`\n (sync or resolved), or reject, to suppress the success flash."},onRateMessage:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  messageId: string,
  rating: AgentSidebarMessageFeedback,
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onRerunMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string) => void",signature:{arguments:[{type:{name:"string"},name:"messageId"}],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentSidebarMessageActionLabels"},description:"Localizable aria-labels for the action buttons (English defaults)."},showLogo:{required:!1,tsType:{name:"boolean"},description:`Render the brand logo once below the list when the last message is a
 finished agent message — a clear platform signature, never per-message.`,defaultValue:{value:"false",computed:!1}},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{j as A,Q as a,A as b};
