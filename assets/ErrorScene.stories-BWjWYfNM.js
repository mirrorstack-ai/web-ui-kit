import{j as o}from"./iframe-DrHNTaWe.js";import{F as y,D as b,N as h}from"./FireScene-CakJ4hTU.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Button-BZy2ODA2.js";import"./Progress-EMxJfjdF.js";import"./Icon-BILoz5x9.js";import"./button-styles-CZHSjrxJ.js";import"./Logo-D5a5tKyo.js";const T={...h,title:"Oops! Something Went Wrong!",blame:"One of our Development Team just broke production!"};function i({strings:e,homeHref:d="/",members:m=b,className:c,onRetry:u,retryLabel:l="Try Again",digest:s,digestLabel:p=f=>`Error ID: ${f}`,code:g="500"}){return o.jsx(y,{code:g,strings:{...T,...e},homeHref:d,members:m,className:c,onRetry:u,retryLabel:l,footer:s!==void 0&&o.jsx("p",{className:"mt-6 font-mono text-sm text-on-surface-variant",children:p(s)})})}i.__docgenInfo={description:"",methods:[],displayName:"ErrorScene",props:{strings:{required:!1,tsType:{name:"Partial",elements:[{name:"NotFoundSceneStrings"}],raw:"Partial<NotFoundSceneStrings>"},description:"Partial overrides merged over the English defaults."},homeHref:{required:!1,tsType:{name:"string"},description:'Destination of the home link. Defaults to "/".',defaultValue:{value:'"/"',computed:!1}},members:{required:!1,tsType:{name:"Array",elements:[{name:"FireSceneMember"}],raw:"FireSceneMember[]"},description:"The team roster. Defaults to the built-in AI roster.",defaultValue:{value:`[
  { name: "Claude", icon: <ClaudeMark />, iconBg: "#d97757" },
  { name: "Gemini", icon: <GeminiMark />, iconBg: "#ffffff" },
  { name: "GPT", icon: <OpenAIMark />, iconBg: "#10a37f" },
  { name: "Grok", icon: <GrokMark />, iconBg: "#17181c" },
]`,computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Renders a filled retry button; the home link demotes to a text button."},retryLabel:{required:!1,tsType:{name:"string"},description:'Retry button label. Defaults to "Try Again".',defaultValue:{value:'"Try Again"',computed:!1}},digest:{required:!1,tsType:{name:"string"},description:"Opaque error id (e.g. a Next.js error digest), shown in a muted mono footer."},digestLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(digest: string) => string",signature:{arguments:[{type:{name:"string"},name:"digest"}],return:{name:"string"}}},description:"Formats the digest footer line. Defaults to `Error ID: ${digest}`.",defaultValue:{value:"(d) => `Error ID: ${d}`",computed:!1}},code:{required:!1,tsType:{name:"string"},description:'Big status code. Defaults to "500".',defaultValue:{value:'"500"',computed:!1}}}};const F={title:"UI/Feedback/ErrorScene",component:i,parameters:{layout:"fullscreen"}},r={},t={args:{onRetry:()=>{},digest:"1234567890abcdef"}},a={args:{code:"503"}},n={args:{onRetry:()=>{},retryLabel:"再試一次",digest:"1234567890abcdef",digestLabel:e=>`錯誤代碼：${e}`,strings:{title:"哎呀！出了點問題！",blame:"我們的開發團隊剛剛把正式環境弄壞了！",pick:"選一位開除吧⋯⋯",chose:e=>`你選擇了工程師「${e}」，回到首頁時送出答案`,cruel:"還是你覺得這樣太殘忍了⋯⋯",cancel:"取消選擇",home:"回到首頁"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    onRetry: () => {},
    digest: "1234567890abcdef"
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    code: "503"
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    onRetry: () => {},
    retryLabel: "再試一次",
    digest: "1234567890abcdef",
    digestLabel: digest => \`錯誤代碼：\${digest}\`,
    strings: {
      title: "哎呀！出了點問題！",
      blame: "我們的開發團隊剛剛把正式環境弄壞了！",
      pick: "選一位開除吧⋯⋯",
      chose: name => \`你選擇了工程師「\${name}」，回到首頁時送出答案\`,
      cruel: "還是你覺得這樣太殘忍了⋯⋯",
      cancel: "取消選擇",
      home: "回到首頁"
    }
  }
}`,...n.parameters?.docs?.source}}};const A=["Playground","WithRetryAndDigest","CustomCode","ZhTW"];export{a as CustomCode,r as Playground,t as WithRetryAndDigest,n as ZhTW,A as __namedExportsOrder,F as default};
