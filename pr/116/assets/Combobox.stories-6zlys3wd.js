import{r as a,j as r}from"./iframe-BUbif1Fd.js";import{c}from"./cn-IyxL_b2c.js";import{I as K}from"./Icon-BKC1ARcg.js";import"./preload-helper-PPVm8Dsz.js";function M(n){return typeof n=="string"?{value:n,label:n}:n}function d({label:n,value:o,onChange:v,options:D,freeform:A=!1,id:L,disabled:k=!1,error:g=!1,helperText:q,className:$}){const x=a.useMemo(()=>D.map(M),[D]),[b,u]=a.useState(!1),[h,m]=a.useState(""),[N,p]=a.useState(!1),[l,i]=a.useState(-1),T=a.useRef(null),V=a.useRef(null),E=a.useRef(null),O=a.useId(),I=L??O,f=`${I}-listbox`;a.useEffect(()=>{const e=t=>{T.current&&!T.current.contains(t.target)&&(u(!1),p(!1),m(""),i(-1))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);const U=N?h:x.find(e=>e.value===o)?.label??o,s=a.useMemo(()=>{if(!N||!h)return x;const e=h.toLowerCase();return x.filter(t=>t.label.toLowerCase().includes(e)||t.value.toLowerCase().includes(e))},[x,h,N]);a.useEffect(()=>{i(e=>e>=s.length?-1:e)},[s.length]),a.useEffect(()=>{if(l<0||!E.current||!s[l])return;const e=E.current.querySelector(`[id="${f}-opt-${s[l].value}"]`);typeof e?.scrollIntoView=="function"&&e.scrollIntoView({block:"nearest"})},[l,s,f]);const _=()=>{u(!0),p(!1),m("")},z=e=>{const t=e.target.value;m(t),p(!0),u(!0),A&&v(t)},R=e=>{v(e.value),m(""),p(!1),u(!1),i(-1)},W=e=>{if(e.key==="Escape"){u(!1),p(!1),m(""),i(-1),V.current?.blur();return}if(!b){(e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),u(!0));return}e.key==="ArrowDown"?(e.preventDefault(),i(t=>t<s.length-1?t+1:0)):e.key==="ArrowUp"?(e.preventDefault(),i(t=>t>0?t-1:s.length-1)):e.key==="Home"?(e.preventDefault(),i(0)):e.key==="End"?(e.preventDefault(),i(s.length-1)):e.key==="Enter"&&(e.preventDefault(),l>=0&&l<s.length&&R(s[l]))},G=l>=0&&s[l]?`${f}-opt-${s[l].value}`:void 0;return r.jsxs("div",{ref:T,className:c("relative",$),children:[r.jsxs("div",{className:c("relative flex items-center border rounded-lg transition-colors bg-surface-container-low",g?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",k&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),children:[r.jsx("input",{ref:V,id:I,type:"text",value:U,onChange:z,onFocus:_,onKeyDown:W,disabled:k,placeholder:" ",className:c("peer w-full rounded-lg px-4 py-4 bg-transparent border-0 outline-none text-on-surface transition-colors disabled:cursor-not-allowed",g?"focus:text-error":"focus:text-primary"),autoComplete:"off",role:"combobox","aria-expanded":b,"aria-autocomplete":"list","aria-controls":f,"aria-activedescendant":G}),r.jsx("label",{htmlFor:I,className:c("absolute text-base z-10 font-normal left-4 top-4 px-1 bg-surface-container-low rounded-md transition-all duration-200 ease-in-out origin-top-left pointer-events-none","peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3","peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",g?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary"),children:n}),r.jsx("button",{type:"button",tabIndex:-1,"aria-label":"Toggle options",onClick:()=>{b?(u(!1),p(!1),m(""),i(-1)):V.current?.focus()},className:"absolute right-3 p-1 text-on-surface-variant hover:text-primary transition-colors",children:r.jsx(K,{name:"expand_more",size:16,className:c("transition-transform inline-block",b&&"rotate-180")})})]}),r.jsx("ul",{ref:E,id:f,role:"listbox",hidden:!b||s.length===0,className:"absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-outline-variant bg-surface-container-low shadow-lg",children:s.map((e,t)=>{const F=e.value===o,J=t===l;return r.jsxs("li",{id:`${f}-opt-${e.value}`,role:"option","aria-selected":F,onClick:()=>R(e),className:c("px-4 py-2.5 text-sm cursor-pointer transition-colors",J&&"bg-surface-container",F?"bg-primary/10 text-primary font-medium":"text-on-surface hover:bg-surface-container"),children:[r.jsx("span",{children:e.label}),e.value!==e.label&&r.jsx("span",{className:"ml-2 text-xs text-on-surface-variant",children:e.value})]},e.value)})}),q&&r.jsx("p",{className:c("text-xs mt-1 px-4",g?"text-error":"text-on-surface-variant"),children:q})]})}d.__docgenInfo={description:"",methods:[],displayName:"Combobox",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(string | ComboboxOption)[]"},description:""},freeform:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},id:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Y={title:"UI/Inputs/Combobox",component:d,argTypes:{disabled:{control:"boolean"},error:{control:"boolean"},freeform:{control:"boolean"}}},P=["United States","United Kingdom","Canada","Australia","Germany","France","Japan"],w={render:n=>{const[o,v]=a.useState("");return r.jsx("div",{className:"max-w-sm",children:r.jsx(d,{...n,label:"Country",value:o,onChange:v,options:P})})}},y={render:()=>{const[n,o]=a.useState("");return r.jsx("div",{className:"max-w-sm",children:r.jsx(d,{label:"Language",value:n,onChange:o,options:[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"ja",label:"Japanese"}]})})}},C={render:()=>{const[n,o]=a.useState("");return r.jsx("div",{className:"max-w-sm",children:r.jsx(d,{label:"Tag",value:n,onChange:o,options:["bug","feature","docs","refactor"],freeform:!0,helperText:"Type a new tag or select an existing one"})})}},j={render:()=>{const[n,o]=a.useState("");return r.jsx("div",{className:"max-w-sm",children:r.jsx(d,{label:"Region",value:n,onChange:o,options:["us-east-1","us-west-2","eu-west-1"],error:!0,helperText:"Region is required"})})}},S={render:()=>r.jsx("div",{className:"max-w-sm",children:r.jsx(d,{label:"Region",value:"us-east-1",onChange:()=>{},options:["us-east-1","us-west-2"],disabled:!0})})};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox {...args} label="Country" value={value} onChange={setValue} options={countries} />
      </div>;
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Language" value={value} onChange={setValue} options={[{
        value: "en",
        label: "English"
      }, {
        value: "es",
        label: "Spanish"
      }, {
        value: "fr",
        label: "French"
      }, {
        value: "de",
        label: "German"
      }, {
        value: "ja",
        label: "Japanese"
      }]} />
      </div>;
  }
}`,...y.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Tag" value={value} onChange={setValue} options={["bug", "feature", "docs", "refactor"]} freeform helperText="Type a new tag or select an existing one" />
      </div>;
  }
}`,...C.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Region" value={value} onChange={setValue} options={["us-east-1", "us-west-2", "eu-west-1"]} error helperText="Region is required" />
      </div>;
  }
}`,...j.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-sm">
      <Combobox label="Region" value="us-east-1" onChange={() => {}} options={["us-east-1", "us-west-2"]} disabled />
    </div>
}`,...S.parameters?.docs?.source}}};const Z=["Playground","WithObjects","Freeform","WithError","Disabled"];export{S as Disabled,C as Freeform,w as Playground,j as WithError,y as WithObjects,Z as __namedExportsOrder,Y as default};
