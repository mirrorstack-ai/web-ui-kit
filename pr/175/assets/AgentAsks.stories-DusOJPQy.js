import{r as i,j as a}from"./iframe-DlM-Fva2.js";import{A as r}from"./AgentSidebarMultiQuestion-hArdnEt8.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-BC-jpkEP.js";import"./Button-CbiW2GBp.js";import"./Progress-B-ZFsNFI.js";import"./button-styles-DvQkePbc.js";import"./Combobox-DYI19KGj.js";import"./SegmentedButton-C40rciO0.js";const y={title:"Agent/Asks",decorators:[e=>a.jsx("div",{className:"h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4 overflow-y-auto",children:a.jsx(e,{})})]},t={render:()=>{const[e,n]=i.useState("pending");return a.jsx(r,{title:"Scaffold a new service",description:"Pick the building blocks. The agent will generate the project skeleton from your choices.",status:e,onSubmit:o=>{console.log("submitted",o),n("submitted")},questions:[{id:"database",type:"choice",label:"Primary database",tabLabel:"Database",description:"Where the service stores its core records. You can add a cache or analytics store later.",options:[{value:"postgres",label:"PostgreSQL",description:"Battle-tested, ACID, JSON support, large extension ecosystem. Best general-purpose default."},{value:"mysql",label:"MySQL",description:"Wide hosting support, mature replication, ubiquitous tooling. Smaller feature surface than Postgres."},{value:"sqlite",label:"SQLite",description:"Zero-config, single-file. Great for embedded, local-first, or sub-1k QPS workloads."}]},{id:"auth",type:"choice",label:"Authentication strategy",tabLabel:"Auth",description:"How users prove who they are. Affects token storage, refresh flow, and which middleware ships.",options:[{value:"session",label:"Server sessions",description:"HTTP-only cookies, server-side store. Simplest model. Best for first-party web apps."},{value:"jwt",label:"Stateless JWT",description:"Self-contained signed tokens. No session table, but harder to revoke. Common for APIs and mobile."},{value:"oauth",label:"OAuth / OIDC",description:"Delegate to an identity provider (Google, Okta, Auth0). Best for enterprise SSO requirements."}]},{id:"hosting",type:"choice",label:"Deploy target",tabLabel:"Hosting",description:"Drives the Dockerfile, IaC scaffold, and CI workflow generated for you.",options:[{value:"aws-lambda",label:"AWS Lambda",description:"Pay-per-request, fast cold-starts on small services, great for spiky traffic."},{value:"aws-ecs",label:"AWS ECS Fargate",description:"Long-running containers, no cold starts, easier WebSockets. Higher idle cost than Lambda."},{value:"vercel",label:"Vercel",description:"Push-to-deploy with edge runtime. Best for frontends and lightweight Node APIs."}]}]})}},s={render:()=>{const[e,n]=i.useState("pending");return a.jsx(r,{layout:"list",title:"Customize your experience",description:"Pick a few defaults. You can change these any time from preferences.",status:e,onSubmit:o=>{console.log("submitted",o),n("submitted")},questions:[{id:"theme",type:"select",label:"Theme",options:[{value:"system",label:"Match system"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}],defaultValue:"system"},{id:"marketing",type:"toggle",label:"Send product update emails",defaultValue:!1},{id:"displayName",type:"text",label:"Display name",placeholder:"Alice",defaultValue:"Alice"}]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [status, setStatus] = useState<"pending" | "submitted">("pending");
    return <AgentSidebarMultiQuestion title="Scaffold a new service" description="Pick the building blocks. The agent will generate the project skeleton from your choices." status={status} onSubmit={answers => {
      console.log("submitted", answers);
      setStatus("submitted");
    }} questions={[{
      id: "database",
      type: "choice",
      label: "Primary database",
      tabLabel: "Database",
      description: "Where the service stores its core records. You can add a cache or analytics store later.",
      options: [{
        value: "postgres",
        label: "PostgreSQL",
        description: "Battle-tested, ACID, JSON support, large extension ecosystem. Best general-purpose default."
      }, {
        value: "mysql",
        label: "MySQL",
        description: "Wide hosting support, mature replication, ubiquitous tooling. Smaller feature surface than Postgres."
      }, {
        value: "sqlite",
        label: "SQLite",
        description: "Zero-config, single-file. Great for embedded, local-first, or sub-1k QPS workloads."
      }]
    }, {
      id: "auth",
      type: "choice",
      label: "Authentication strategy",
      tabLabel: "Auth",
      description: "How users prove who they are. Affects token storage, refresh flow, and which middleware ships.",
      options: [{
        value: "session",
        label: "Server sessions",
        description: "HTTP-only cookies, server-side store. Simplest model. Best for first-party web apps."
      }, {
        value: "jwt",
        label: "Stateless JWT",
        description: "Self-contained signed tokens. No session table, but harder to revoke. Common for APIs and mobile."
      }, {
        value: "oauth",
        label: "OAuth / OIDC",
        description: "Delegate to an identity provider (Google, Okta, Auth0). Best for enterprise SSO requirements."
      }]
    }, {
      id: "hosting",
      type: "choice",
      label: "Deploy target",
      tabLabel: "Hosting",
      description: "Drives the Dockerfile, IaC scaffold, and CI workflow generated for you.",
      options: [{
        value: "aws-lambda",
        label: "AWS Lambda",
        description: "Pay-per-request, fast cold-starts on small services, great for spiky traffic."
      }, {
        value: "aws-ecs",
        label: "AWS ECS Fargate",
        description: "Long-running containers, no cold starts, easier WebSockets. Higher idle cost than Lambda."
      }, {
        value: "vercel",
        label: "Vercel",
        description: "Push-to-deploy with edge runtime. Best for frontends and lightweight Node APIs."
      }]
    }]} />;
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [status, setStatus] = useState<"pending" | "submitted">("pending");
    return <AgentSidebarMultiQuestion layout="list" title="Customize your experience" description="Pick a few defaults. You can change these any time from preferences." status={status} onSubmit={answers => {
      console.log("submitted", answers);
      setStatus("submitted");
    }} questions={[{
      id: "theme",
      type: "select",
      label: "Theme",
      options: [{
        value: "system",
        label: "Match system"
      }, {
        value: "light",
        label: "Light"
      }, {
        value: "dark",
        label: "Dark"
      }],
      defaultValue: "system"
    }, {
      id: "marketing",
      type: "toggle",
      label: "Send product update emails",
      defaultValue: false
    }, {
      id: "displayName",
      type: "text",
      label: "Display name",
      placeholder: "Alice",
      defaultValue: "Alice"
    }]} />;
  }
}`,...s.parameters?.docs?.source}}};const S=["MultiQuestionTabs","MultiQuestionList"];export{s as MultiQuestionList,t as MultiQuestionTabs,S as __namedExportsOrder,y as default};
