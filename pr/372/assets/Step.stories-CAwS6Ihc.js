import{j as e,r as h}from"./iframe-D14A38KW.js";import{c as d}from"./cn-IyxL_b2c.js";import{I as f}from"./Icon-gfrqWs4T.js";import{B as n}from"./Button-BEcRDMsn.js";import"./preload-helper-PPVm8Dsz.js";import"./Progress-dGzGrIEU.js";import"./button-styles-CZHSjrxJ.js";function a({n:t,title:s,status:i,isLast:u,onEdit:m,children:x,className:v}){return e.jsxs("section",{className:d("flex gap-4",v),children:[e.jsxs("div",{className:"flex flex-col items-center w-7 shrink-0",children:[e.jsx("div",{className:"h-10 flex items-center shrink-0",children:e.jsx("div",{className:d("size-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0",i==="pending"?"bg-surface-container text-on-surface-variant":"bg-primary text-on-primary"),children:i==="complete"?e.jsx(f,{name:"check",size:16}):t})}),!u&&e.jsx("div",{className:"w-px flex-1 bg-outline-variant/40"})]}),e.jsxs("div",{className:"flex-1 pb-6 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-3 h-10",children:[e.jsx("span",{className:d("text-base font-medium",i==="pending"?"text-on-surface-variant":"text-on-surface"),children:s}),i==="complete"&&m&&e.jsx(n,{variant:"text",size:"sm",leftIcon:"edit",onClick:m,children:"Edit"})]}),x]})]})}a.__docgenInfo={description:"",methods:[],displayName:"Step",props:{n:{required:!0,tsType:{name:"number"},description:"1-based step number rendered inside the circle."},title:{required:!0,tsType:{name:"string"},description:""},status:{required:!0,tsType:{name:"union",raw:'"active" | "complete" | "pending"',elements:[{name:"literal",value:'"active"'},{name:"literal",value:'"complete"'},{name:"literal",value:'"pending"'}]},description:""},isLast:{required:!1,tsType:{name:"boolean"},description:"Suppress the connecting spine line below this step (use on the last step)."},onEdit:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:'Surfaces an Edit button next to the title when status is "complete".'},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const b={title:"UI/Data/Step",component:a,decorators:[t=>e.jsx("div",{className:"w-full max-w-xl bg-background p-6",children:e.jsx(t,{})})],args:{n:1,title:"Details",status:"active",children:e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Step body lives here. Anything from a single line to a full form."})}},r={},c={args:{status:"complete"}},o={args:{status:"complete",onEdit:()=>console.log("Edit step 1"),children:void 0}},l={args:{status:"pending",n:3,title:"Review"}},p={render:()=>{const[t,s]=h.useState(1);return e.jsxs("div",{children:[e.jsx(a,{n:1,title:"Details",status:t===1?"active":"complete",onEdit:t>1?()=>s(1):void 0,children:t===1&&e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Fill in the basics. Name, slug, description."}),e.jsx(n,{onClick:()=>s(2),children:"Next"})]})}),e.jsx(a,{n:2,title:"Modules",status:t===2?"active":t>2?"complete":"pending",onEdit:t>2?()=>s(2):void 0,children:t===2&&e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Pick the modules you want installed on this app."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(n,{variant:"text",onClick:()=>s(1),children:"Back"}),e.jsx(n,{onClick:()=>s(3),children:"Next"})]})]})}),e.jsx(a,{n:3,title:"Review",status:t===3?"active":"pending",isLast:!0,children:t===3&&e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant",children:"Confirm and create the app."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(n,{variant:"text",onClick:()=>s(2),children:"Back"}),e.jsx(n,{children:"Create app"})]})]})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    status: "complete"
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: "complete",
    onEdit: () => console.log("Edit step 1"),
    children: undefined
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    status: "pending",
    n: 3,
    title: "Review"
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    return <div>
        <Step n={1} title="Details" status={step === 1 ? "active" : "complete"} onEdit={step > 1 ? () => setStep(1) : undefined}>
          {step === 1 && <div className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Fill in the basics. Name, slug, description.
              </p>
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>}
        </Step>
        <Step n={2} title="Modules" status={step === 2 ? "active" : step > 2 ? "complete" : "pending"} onEdit={step > 2 ? () => setStep(2) : undefined}>
          {step === 2 && <div className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Pick the modules you want installed on this app.
              </p>
              <div className="flex gap-2">
                <Button variant="text" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>}
        </Step>
        <Step n={3} title="Review" status={step === 3 ? "active" : "pending"} isLast>
          {step === 3 && <div className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Confirm and create the app.
              </p>
              <div className="flex gap-2">
                <Button variant="text" onClick={() => setStep(2)}>Back</Button>
                <Button>Create app</Button>
              </div>
            </div>}
        </Step>
      </div>;
  }
}`,...p.parameters?.docs?.source}}};const B=["Active","Complete","CompleteWithEdit","Pending","Wizard"];export{r as Active,c as Complete,o as CompleteWithEdit,l as Pending,p as Wizard,B as __namedExportsOrder,b as default};
