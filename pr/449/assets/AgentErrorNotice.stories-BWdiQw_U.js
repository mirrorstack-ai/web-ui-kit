import{j as l}from"./iframe-BoZXItKW.js";import{c as p}from"./cn-IyxL_b2c.js";import"./preload-helper-PPVm8Dsz.js";const _=86400,m={messages:{send_failed:"Your message could not be sent. Please try again.",reply_failed:"The assistant could not finish its reply. Please try again.",persist_failed:"The reply could not be saved. Please try again.",stream_interrupted:"The reply was interrupted. Please try again.",load_failed:"This conversation could not be loaded. Please try again.",agent_turn_limit:"You have reached the message limit for now.",daily_ai_ceiling:"The daily AI usage limit has been reached.",rate_limited:"Too many requests right now.",prompt_too_long:"Your message is too long. Please shorten it and try again.",ai_unavailable:"The AI assistant is unavailable right now. Please try again later.",ai_credits_exhausted:"Your AI credits have run out."},fallback:"Something went wrong. Please try again.",wait:e=>`Try again in ${h(e)}.`,join:" "},f={messages:{send_failed:"訊息無法送出，請再試一次。",reply_failed:"助理未能完成回覆，請再試一次。",persist_failed:"回覆無法儲存，請再試一次。",stream_interrupted:"回覆被中斷，請再試一次。",load_failed:"無法載入這段對話，請再試一次。",agent_turn_limit:"你暫時已達訊息數量上限。",daily_ai_ceiling:"已達每日 AI 使用上限。",rate_limited:"目前請求過多。",prompt_too_long:"訊息太長，請縮短後再試一次。",ai_unavailable:"AI 助理目前無法使用，請稍後再試。",ai_credits_exhausted:"你的 AI 額度已用完。"},fallback:"發生錯誤，請再試一次。",wait:e=>`請於 ${y(e)}後再試。`,join:""};function h(e){if(e<60)return`${e} second${e===1?"":"s"}`;const r=Math.ceil(e/60);if(r<60)return`${r} minute${r===1?"":"s"}`;const n=Math.ceil(r/60);return`${n} hour${n===1?"":"s"}`}function y(e){if(e<60)return`${e} 秒`;const r=Math.ceil(e/60);return r<60?`${r} 分鐘`:`${Math.ceil(r/60)} 小時`}new Set(Object.keys(m.messages));const o={en:m,"zh-TW":f};function T(e){if(o[e])return o[e];const r=e.split("-")[0],n=Object.keys(o).find(t=>t.split("-")[0]===r);return o[n??"en"]}function w(e){if(!(typeof e!="number"||!Number.isFinite(e)||e<=0))return Math.min(Math.ceil(e),_)}function A(e,r,n){const t=T(r),d=t.messages[e]??t.fallback,u=w(n);return u===void 0?d:`${d}${t.join}${t.wait(u)}`}function g({errorInfo:e,locale:r,className:n}){return e?l.jsx("p",{role:"alert","data-error-code":e.code,className:p("text-sm text-error",n),children:A(e.code,r,e.retryAfterSeconds)}):null}g.__docgenInfo={description:"",methods:[],displayName:"AgentErrorNotice",props:{errorInfo:{required:!0,tsType:{name:"union",raw:"AgentChatErrorInfo | null",elements:[{name:"AgentChatErrorInfo"},{name:"null"}]},description:"`errorInfo` from useAgentChat / useAgentSession. Renders nothing when null."},locale:{required:!0,tsType:{name:"string"},description:`Reader's locale, e.g. "en" or "zh-TW". Unknown locales fall back to English.`},className:{required:!1,tsType:{name:"string"},description:""}}};const x={title:"UI/Agent/ErrorNotice",component:g,decorators:[e=>l.jsx("div",{className:"w-full max-w-[400px] bg-background px-4 py-6",children:l.jsx(e,{})})]},a={args:{locale:"en",errorInfo:{code:"agent_turn_limit",status:429,retryAfterSeconds:90}}},i={args:{locale:"zh-TW",errorInfo:{code:"agent_turn_limit",status:429,retryAfterSeconds:90}}},c={args:{locale:"en",errorInfo:{code:"daily_ai_ceiling",status:429}}},s={args:{locale:"zh-TW",errorInfo:{code:"brand_new_code"}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    locale: "en",
    errorInfo: {
      code: "agent_turn_limit",
      status: 429,
      retryAfterSeconds: 90
    }
  }
}`,...a.parameters?.docs?.source},description:{story:"The 61st turn: refused with agent_turn_limit and a wait time.",...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    locale: "zh-TW",
    errorInfo: {
      code: "agent_turn_limit",
      status: 429,
      retryAfterSeconds: 90
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    locale: "en",
    errorInfo: {
      code: "daily_ai_ceiling",
      status: 429
    }
  }
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    locale: "zh-TW",
    errorInfo: {
      code: "brand_new_code"
    }
  }
}`,...s.parameters?.docs?.source},description:{story:"An unknown code never shows server text — the generic line renders.",...s.parameters?.docs?.description}}};const S=["TurnLimitEnglish","TurnLimitZhTW","DailyCeiling","UnknownCode"];export{c as DailyCeiling,a as TurnLimitEnglish,i as TurnLimitZhTW,s as UnknownCode,S as __namedExportsOrder,x as default};
