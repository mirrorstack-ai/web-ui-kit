import{j as e,r as o}from"./iframe-DGbHXgXA.js";import{c as f}from"./cn-IyxL_b2c.js";import{I as S}from"./Icon-CEhHViOo.js";import{L as M}from"./Logo-DUI0LATo.js";import{I as x}from"./IconButton-kRHES2ek.js";import{A as N}from"./AgentSidebarMultiQuestion-BC2-VT4C.js";function A({content:t,className:s}){return e.jsx("div",{className:f("flex justify-end",s),children:e.jsx("div",{className:"max-w-[85%] rounded-2xl rounded-br-md bg-inverse-on-surface/12 px-3 py-2 text-sm text-inverse-on-surface whitespace-pre-wrap break-words",children:t})})}function j({content:t,streaming:s=!1,feedback:r=null,onCopy:l,onFeedback:a,onRerun:c,actionLabels:g,className:u}){const b=s&&t.length===0,d=!s&&!!(l||a||c);return e.jsxs("div",{className:f("flex flex-col items-start",u),children:[e.jsxs("div",{className:"max-w-full text-sm text-inverse-on-surface whitespace-pre-wrap break-words leading-relaxed",children:[b?e.jsx(R,{}):t,s&&t.length>0&&e.jsx("span",{className:"ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse","aria-hidden":!0})]}),d&&e.jsx(L,{feedback:r,onCopy:l,onFeedback:a,onRerun:c,labels:g})]})}const I=1500,q="text-inverse-on-surface/60 hover:text-inverse-on-surface";function L({feedback:t,onCopy:s,onFeedback:r,onRerun:l,labels:a}){const[c,g]=o.useState(!1),u=o.useRef(void 0);o.useEffect(()=>()=>clearTimeout(u.current),[]);const b=()=>{s?.(),g(!0),clearTimeout(u.current),u.current=setTimeout(()=>g(!1),I)},d=i=>r?.(t===i?null:i),p=(i,v,w)=>{const h=t===i;return e.jsx(x,{icon:v,fill:h,variant:"text",size:"sm",className:h?"text-inverse-on-surface":q,onClick:()=>d(i),"aria-label":w,"aria-pressed":h})};return e.jsxs("div",{className:"mt-1 -ml-1.5 flex items-center gap-0.5",children:[s&&e.jsx(x,{icon:c?"check":"content_copy",variant:"text",size:"sm",className:q,onClick:b,"aria-label":c?a?.copied??"Copied":a?.copy??"Copy"}),r&&e.jsxs(e.Fragment,{children:[p("up","thumb_up",a?.good??"Good response"),p("down","thumb_down",a?.bad??"Bad response")]}),l&&e.jsx(x,{icon:"refresh",variant:"text",size:"sm",className:q,onClick:l,"aria-label":a?.rerun??"Rerun"})]})}function R(){const t="inline-block w-1 h-1 rounded-full bg-inverse-on-surface";return e.jsxs("span",{className:"inline-flex items-center gap-0.5 py-0.5",role:"status","aria-label":"Agent is thinking",children:[e.jsx("span",{className:f(t,"animate-bounce [animation-delay:-0.3s]")}),e.jsx("span",{className:f(t,"animate-bounce [animation-delay:-0.15s]")}),e.jsx("span",{className:f(t,"animate-bounce")})]})}A.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarUserMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};j.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarAgentMessage",props:{content:{required:!0,tsType:{name:"string"},description:""},streaming:{required:!1,tsType:{name:"boolean"},description:"When true, renders typing indicator (if no content) or blinking cursor (if content).",defaultValue:{value:"false",computed:!1}},feedback:{required:!1,tsType:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},description:"Current feedback rating reflected on the thumbs.",defaultValue:{value:"null",computed:!1}},onCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Copy was clicked. The kit only flashes the icon to a check — the
 consumer performs the actual clipboard write.`},onFeedback:{required:!1,tsType:{name:"signature",type:"function",raw:"(rating: AgentMessageFeedback) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onRerun:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentMessageActionLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const _=80;function C(t){let s=t?.parentElement??null;for(;s;){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll")return s;s=s.parentElement}return null}function Q({messages:t,onSubmitMultiQuestion:s,onMessageCopy:r,onMessageFeedback:l,onMessageRerun:a,actionLabels:c,showLogo:g=!1,autoScroll:u=!0,className:b}){const d=o.useRef(null),p=o.useRef(!0),i=o.useRef(!0),[v,w]=o.useState(!0);o.useEffect(()=>{const n=C(d.current);if(!n)return;const m=()=>{const k=n.scrollHeight-n.scrollTop-n.clientHeight<=_;k!==i.current&&(i.current=k,w(k))};return m(),n.addEventListener("scroll",m,{passive:!0}),()=>n.removeEventListener("scroll",m)},[]),o.useEffect(()=>{u&&(!p.current&&!i.current||(d.current?.scrollIntoView({behavior:p.current?"auto":"smooth",block:"end"}),p.current=!1))},[t,u]);const h=()=>{d.current?.scrollIntoView({behavior:"smooth",block:"end"})},y=t[t.length-1],T=g&&!!y&&y.role==="agent"&&!("kind"in y)&&!y.streaming;return e.jsxs("div",{className:f("flex flex-col gap-4",b),children:[t.map(n=>n.role==="user"?e.jsx(A,{content:n.content},n.id):"kind"in n?e.jsx(N,{title:n.title,description:n.description,questions:n.questions,submitLabel:n.submitLabel,status:n.status,layout:n.layout,onSubmit:m=>s?.(n.id,m)},n.id):e.jsx(j,{content:n.content,streaming:n.streaming,feedback:n.feedback,onCopy:r&&(()=>r(n.id)),onFeedback:l&&(m=>l(n.id,m)),onRerun:a&&(()=>a(n.id)),actionLabels:c},n.id)),T&&e.jsx("div",{className:"-mt-2 flex justify-start",children:e.jsx(M,{className:"h-4 w-4 bg-inverse-on-surface/40"})}),e.jsx("div",{ref:d}),!v&&e.jsx("div",{className:"sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4",children:e.jsxs("button",{type:"button",onClick:h,className:"pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm",children:[e.jsx(S,{name:"arrow_downward",size:14}),"Back to bottom"]})})]})}Q.__docgenInfo={description:"",methods:[],displayName:"AgentSidebarMessages",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| {
    id: string;
    role: "user";
    content: string;
  }
| {
    id: string;
    role: "agent";
    content: string;
    streaming?: boolean;
    feedback?: AgentMessageFeedback;
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
  feedback?: AgentMessageFeedback;
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
) => void`,signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | boolean | string[]",elements:[{name:"string"},{name:"boolean"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]}],raw:"Record<string, AgentSidebarMultiQuestionAnswer>"},name:"answers"}],return:{name:"void"}}},description:""},onMessageCopy:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string) => void",signature:{arguments:[{type:{name:"string"},name:"messageId"}],return:{name:"void"}}},description:`Copy was clicked on a finished agent message. The kit only flashes the
 icon — the consumer performs the actual clipboard write.`},onMessageFeedback:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string, rating: AgentMessageFeedback) => void",signature:{arguments:[{type:{name:"string"},name:"messageId"},{type:{name:"union",raw:'"up" | "down" | null',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"null"}]},name:"rating"}],return:{name:"void"}}},description:`Fired with the next rating: clicking the selected thumb yields null,
 clicking the other thumb switches.`},onMessageRerun:{required:!1,tsType:{name:"signature",type:"function",raw:"(messageId: string) => void",signature:{arguments:[{type:{name:"string"},name:"messageId"}],return:{name:"void"}}},description:""},actionLabels:{required:!1,tsType:{name:"AgentMessageActionLabels"},description:"Localizable aria-labels for the action buttons (English defaults)."},showLogo:{required:!1,tsType:{name:"boolean"},description:`Render the brand logo once below the list when the last message is a
 finished agent message — a subdued platform signature, never per-message.`,defaultValue:{value:"false",computed:!1}},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Auto-scroll to the latest message. Default: true.",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{j as A,Q as a,A as b};
