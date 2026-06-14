import{r as n,j as a}from"./iframe-BVKEvw_P.js";import{c}from"./cn-IyxL_b2c.js";import{I as B}from"./Icon-CBPY-Xak.js";import"./preload-helper-PPVm8Dsz.js";function Q(r){return typeof r=="string"?{value:r,label:r}:r}function i({label:r,value:t,onChange:b,options:L,freeform:$=!1,id:O,disabled:h=!1,error:x=!1,helperText:P,className:U,size:z="md",hideLabel:E=!1}){const g=n.useMemo(()=>L.map(Q),[L]),[v,d]=n.useState(!1),[y,m]=n.useState(""),[q,p]=n.useState(!1),[l,u]=n.useState(-1),I=n.useRef(null),D=n.useRef(null),k=n.useRef(null),_=n.useId(),R=O??_,f=`${R}-listbox`;n.useEffect(()=>{const e=s=>{I.current&&!I.current.contains(s.target)&&(d(!1),p(!1),m(""),u(-1))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);const W=q?y:g.find(e=>e.value===t)?.label??t,o=n.useMemo(()=>{if(!q||!y)return g;const e=y.toLowerCase();return g.filter(s=>s.label.toLowerCase().includes(e)||s.value.toLowerCase().includes(e))},[g,y,q]);n.useEffect(()=>{u(e=>e>=o.length?-1:e)},[o.length]),n.useEffect(()=>{if(l<0||!k.current||!o[l])return;const e=k.current.querySelector(`[id="${f}-opt-${o[l].value}"]`);typeof e?.scrollIntoView=="function"&&e.scrollIntoView({block:"nearest"})},[l,o,f]);const G=()=>{d(!0),p(!1),m("")},H=e=>{const s=e.target.value;m(s),p(!0),d(!0),$&&b(s)},F=e=>{b(e.value),m(""),p(!1),d(!1),u(-1)},J=e=>{if(e.key==="Escape"){d(!1),p(!1),m(""),u(-1),D.current?.blur();return}if(!v){(e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),d(!0));return}e.key==="ArrowDown"?(e.preventDefault(),u(s=>s<o.length-1?s+1:0)):e.key==="ArrowUp"?(e.preventDefault(),u(s=>s>0?s-1:o.length-1)):e.key==="Home"?(e.preventDefault(),u(0)):e.key==="End"?(e.preventDefault(),u(o.length-1)):e.key==="Enter"&&(e.preventDefault(),l>=0&&l<o.length&&F(o[l]))},K=l>=0&&o[l]?`${f}-opt-${o[l].value}`:void 0;return a.jsxs("div",{ref:I,className:c("relative",U),children:[a.jsxs("div",{className:c("relative flex items-center border rounded-lg transition-colors bg-surface-container-low",x?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",h&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),children:[a.jsx("input",{ref:D,id:R,type:"text",value:W,onChange:H,onFocus:G,onKeyDown:J,disabled:h,placeholder:E?r:" ","aria-label":E?r:void 0,className:c("peer w-full rounded-lg bg-transparent border-0 outline-none text-on-surface transition-colors disabled:cursor-not-allowed",z==="sm"?"px-3 py-2.5 text-sm":"px-4 py-4",x?"focus:text-error":"focus:text-primary"),autoComplete:"off",role:"combobox","aria-expanded":v,"aria-autocomplete":"list","aria-controls":f,"aria-activedescendant":K}),!E&&a.jsx("label",{htmlFor:R,className:c("absolute z-10 font-normal px-1 bg-surface-container-low rounded-md transition-all duration-200 ease-in-out origin-top-left pointer-events-none",z==="sm"?"text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5":"text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",x?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary"),children:r}),a.jsx("button",{type:"button",tabIndex:-1,"aria-label":"Toggle options",disabled:h,onClick:()=>{h||(v?(d(!1),p(!1),m(""),u(-1)):D.current?.focus())},className:c("absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 text-on-surface-variant transition-colors",h?"cursor-not-allowed":"hover:text-primary"),children:a.jsx(B,{name:"expand_more",size:16,className:c("transition-transform inline-block",v&&"rotate-180")})})]}),a.jsx("ul",{ref:k,id:f,role:"listbox",hidden:!v||o.length===0,className:"absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-outline-variant bg-surface-container-low shadow-lg",children:o.map((e,s)=>{const A=e.value===t,M=s===l;return a.jsxs("li",{id:`${f}-opt-${e.value}`,role:"option","aria-selected":A,onClick:()=>F(e),className:c("px-4 py-2.5 text-sm cursor-pointer transition-colors",M&&"bg-surface-container",A?"bg-primary/10 text-primary font-medium":"text-on-surface hover:bg-surface-container"),children:[a.jsx("span",{children:e.label}),e.value!==e.label&&a.jsx("span",{className:"ml-2 text-xs text-on-surface-variant",children:e.value})]},e.value)})}),P&&a.jsx("p",{className:c("text-xs mt-1 px-4",x?"text-error":"text-on-surface-variant"),children:P})]})}i.__docgenInfo={description:"",methods:[],displayName:"Combobox",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(string | ComboboxOption)[]"},description:""},freeform:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},id:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},hideLabel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const re={title:"UI/Inputs/Combobox",component:i,argTypes:{disabled:{control:"boolean"},error:{control:"boolean"},freeform:{control:"boolean"}}},X=["United States","United Kingdom","Canada","Australia","Germany","France","Japan"],w={render:r=>{const[t,b]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{...r,label:"Country",value:t,onChange:b,options:X})})}},C={render:()=>{const[r,t]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Language",value:r,onChange:t,options:[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"ja",label:"Japanese"}]})})}},S={render:()=>{const[r,t]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Tag",value:r,onChange:t,options:["bug","feature","docs","refactor"],freeform:!0,helperText:"Type a new tag or select an existing one"})})}},j={render:()=>{const[r,t]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Region",value:r,onChange:t,options:["us-east-1","us-west-2","eu-west-1"],error:!0,helperText:"Region is required"})})}},N={render:()=>a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Region",value:"us-east-1",onChange:()=>{},options:["us-east-1","us-west-2"],disabled:!0})})},V={render:()=>{const[r,t]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Pronouns",value:r,onChange:t,size:"sm",options:[{value:"",label:"Prefer not to say"},{value:"he/him",label:"he/him"},{value:"she/her",label:"she/her"},{value:"they/them",label:"they/them"}]})})}},T={render:()=>{const[r,t]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Pronouns",value:r,onChange:t,size:"sm",hideLabel:!0,options:[{value:"",label:"Prefer not to say"},{value:"he/him",label:"he/him"},{value:"she/her",label:"she/her"},{value:"they/them",label:"they/them"}]})})}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox {...args} label="Country" value={value} onChange={setValue} options={countries} />
      </div>;
  }
}`,...w.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Tag" value={value} onChange={setValue} options={["bug", "feature", "docs", "refactor"]} freeform helperText="Type a new tag or select an existing one" />
      </div>;
  }
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Region" value={value} onChange={setValue} options={["us-east-1", "us-west-2", "eu-west-1"]} error helperText="Region is required" />
      </div>;
  }
}`,...j.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-sm">
      <Combobox label="Region" value="us-east-1" onChange={() => {}} options={["us-east-1", "us-west-2"]} disabled />
    </div>
}`,...N.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Pronouns" value={value} onChange={setValue} size="sm" options={[{
        value: "",
        label: "Prefer not to say"
      }, {
        value: "he/him",
        label: "he/him"
      }, {
        value: "she/her",
        label: "she/her"
      }, {
        value: "they/them",
        label: "they/them"
      }]} />
      </div>;
  }
}`,...V.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Pronouns" value={value} onChange={setValue} size="sm" hideLabel options={[{
        value: "",
        label: "Prefer not to say"
      }, {
        value: "he/him",
        label: "he/him"
      }, {
        value: "she/her",
        label: "she/her"
      }, {
        value: "they/them",
        label: "they/them"
      }]} />
      </div>;
  }
}`,...T.parameters?.docs?.source}}};const ne=["Playground","WithObjects","Freeform","WithError","Disabled","Small","SmallHiddenLabel"];export{N as Disabled,S as Freeform,w as Playground,V as Small,T as SmallHiddenLabel,j as WithError,C as WithObjects,ne as __namedExportsOrder,re as default};
