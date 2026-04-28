import{r as n,j as a}from"./iframe-DzV8dpyv.js";import{c as d}from"./cn-IyxL_b2c.js";import{I as B}from"./Icon-B6suG0Wa.js";import"./preload-helper-PPVm8Dsz.js";function Q(r){return typeof r=="string"?{value:r,label:r}:r}function i({label:r,value:s,onChange:v,options:R,freeform:$=!1,id:O,disabled:L=!1,error:b=!1,helperText:P,className:U,size:z="md",hideLabel:T=!1}){const x=n.useMemo(()=>R.map(Q),[R]),[h,c]=n.useState(!1),[g,m]=n.useState(""),[E,p]=n.useState(!1),[l,u]=n.useState(-1),q=n.useRef(null),I=n.useRef(null),D=n.useRef(null),_=n.useId(),k=O??_,f=`${k}-listbox`;n.useEffect(()=>{const e=t=>{q.current&&!q.current.contains(t.target)&&(c(!1),p(!1),m(""),u(-1))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);const W=E?g:x.find(e=>e.value===s)?.label??s,o=n.useMemo(()=>{if(!E||!g)return x;const e=g.toLowerCase();return x.filter(t=>t.label.toLowerCase().includes(e)||t.value.toLowerCase().includes(e))},[x,g,E]);n.useEffect(()=>{u(e=>e>=o.length?-1:e)},[o.length]),n.useEffect(()=>{if(l<0||!D.current||!o[l])return;const e=D.current.querySelector(`[id="${f}-opt-${o[l].value}"]`);typeof e?.scrollIntoView=="function"&&e.scrollIntoView({block:"nearest"})},[l,o,f]);const G=()=>{c(!0),p(!1),m("")},H=e=>{const t=e.target.value;m(t),p(!0),c(!0),$&&v(t)},F=e=>{v(e.value),m(""),p(!1),c(!1),u(-1)},J=e=>{if(e.key==="Escape"){c(!1),p(!1),m(""),u(-1),I.current?.blur();return}if(!h){(e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),c(!0));return}e.key==="ArrowDown"?(e.preventDefault(),u(t=>t<o.length-1?t+1:0)):e.key==="ArrowUp"?(e.preventDefault(),u(t=>t>0?t-1:o.length-1)):e.key==="Home"?(e.preventDefault(),u(0)):e.key==="End"?(e.preventDefault(),u(o.length-1)):e.key==="Enter"&&(e.preventDefault(),l>=0&&l<o.length&&F(o[l]))},K=l>=0&&o[l]?`${f}-opt-${o[l].value}`:void 0;return a.jsxs("div",{ref:q,className:d("relative",U),children:[a.jsxs("div",{className:d("relative flex items-center border rounded-lg transition-colors bg-surface-container-low",b?"border-error hover:border-error focus-within:ring-2 focus-within:ring-error focus-within:border-error":"border-outline-variant hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",L&&"opacity-50 cursor-not-allowed hover:border-outline-variant"),children:[a.jsx("input",{ref:I,id:k,type:"text",value:W,onChange:H,onFocus:G,onKeyDown:J,disabled:L,placeholder:T?r:" ","aria-label":T?r:void 0,className:d("peer w-full rounded-lg bg-transparent border-0 outline-none text-on-surface transition-colors disabled:cursor-not-allowed",z==="sm"?"px-3 py-2.5 text-sm":"px-4 py-4",b?"focus:text-error":"focus:text-primary"),autoComplete:"off",role:"combobox","aria-expanded":h,"aria-autocomplete":"list","aria-controls":f,"aria-activedescendant":K}),!T&&a.jsx("label",{htmlFor:k,className:d("absolute z-10 font-normal px-1 bg-surface-container-low rounded-md transition-all duration-200 ease-in-out origin-top-left pointer-events-none",z==="sm"?"text-sm left-3 top-2.5 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-2.5":"text-base left-4 top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:left-3",b?"text-error peer-focus:text-error":"text-on-surface-variant peer-focus:text-primary"),children:r}),a.jsx("button",{type:"button",tabIndex:-1,"aria-label":"Toggle options",onClick:()=>{h?(c(!1),p(!1),m(""),u(-1)):I.current?.focus()},className:"absolute right-3 p-1 text-on-surface-variant hover:text-primary transition-colors",children:a.jsx(B,{name:"expand_more",size:16,className:d("transition-transform inline-block",h&&"rotate-180")})})]}),a.jsx("ul",{ref:D,id:f,role:"listbox",hidden:!h||o.length===0,className:"absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-outline-variant bg-surface-container-low shadow-lg",children:o.map((e,t)=>{const A=e.value===s,M=t===l;return a.jsxs("li",{id:`${f}-opt-${e.value}`,role:"option","aria-selected":A,onClick:()=>F(e),className:d("px-4 py-2.5 text-sm cursor-pointer transition-colors",M&&"bg-surface-container",A?"bg-primary/10 text-primary font-medium":"text-on-surface hover:bg-surface-container"),children:[a.jsx("span",{children:e.label}),e.value!==e.label&&a.jsx("span",{className:"ml-2 text-xs text-on-surface-variant",children:e.value})]},e.value)})}),P&&a.jsx("p",{className:d("text-xs mt-1 px-4",b?"text-error":"text-on-surface-variant"),children:P})]})}i.__docgenInfo={description:"",methods:[],displayName:"Combobox",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(string | ComboboxOption)[]"},description:""},freeform:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},id:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},hideLabel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const re={title:"UI/Inputs/Combobox",component:i,argTypes:{disabled:{control:"boolean"},error:{control:"boolean"},freeform:{control:"boolean"}}},X=["United States","United Kingdom","Canada","Australia","Germany","France","Japan"],y={render:r=>{const[s,v]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{...r,label:"Country",value:s,onChange:v,options:X})})}},w={render:()=>{const[r,s]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Language",value:r,onChange:s,options:[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"ja",label:"Japanese"}]})})}},C={render:()=>{const[r,s]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Tag",value:r,onChange:s,options:["bug","feature","docs","refactor"],freeform:!0,helperText:"Type a new tag or select an existing one"})})}},S={render:()=>{const[r,s]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Region",value:r,onChange:s,options:["us-east-1","us-west-2","eu-west-1"],error:!0,helperText:"Region is required"})})}},j={render:()=>a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Region",value:"us-east-1",onChange:()=>{},options:["us-east-1","us-west-2"],disabled:!0})})},N={render:()=>{const[r,s]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Pronouns",value:r,onChange:s,size:"sm",options:[{value:"",label:"Prefer not to say"},{value:"he/him",label:"he/him"},{value:"she/her",label:"she/her"},{value:"they/them",label:"they/them"}]})})}},V={render:()=>{const[r,s]=n.useState("");return a.jsx("div",{className:"max-w-sm",children:a.jsx(i,{label:"Pronouns",value:r,onChange:s,size:"sm",hideLabel:!0,options:[{value:"",label:"Prefer not to say"},{value:"he/him",label:"he/him"},{value:"she/her",label:"she/her"},{value:"they/them",label:"they/them"}]})})}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox {...args} label="Country" value={value} onChange={setValue} options={countries} />
      </div>;
  }
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Tag" value={value} onChange={setValue} options={["bug", "feature", "docs", "refactor"]} freeform helperText="Type a new tag or select an existing one" />
      </div>;
  }
}`,...C.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="max-w-sm">
        <Combobox label="Region" value={value} onChange={setValue} options={["us-east-1", "us-west-2", "eu-west-1"]} error helperText="Region is required" />
      </div>;
  }
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-sm">
      <Combobox label="Region" value="us-east-1" onChange={() => {}} options={["us-east-1", "us-west-2"]} disabled />
    </div>
}`,...j.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}};const ne=["Playground","WithObjects","Freeform","WithError","Disabled","Small","SmallHiddenLabel"];export{j as Disabled,C as Freeform,y as Playground,N as Small,V as SmallHiddenLabel,S as WithError,w as WithObjects,ne as __namedExportsOrder,re as default};
