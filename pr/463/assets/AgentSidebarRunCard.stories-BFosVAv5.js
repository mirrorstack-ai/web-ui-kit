import{j as e}from"./iframe-TV8EYqpb.js";import{a as t,A as o}from"./AgentSidebarRunCard-BJw1gC_A.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Icon-_oQo-S-6.js";import"./Button-BioCAvz_.js";import"./Progress-DhIsKYAC.js";import"./button-styles-CZHSjrxJ.js";const S={title:"UI/Agent/RunCard",component:t,parameters:{layout:"padded"},decorators:[a=>e.jsx("div",{className:"w-full max-w-[400px] bg-on-background p-4",children:e.jsx(a,{})})]},l="https://apps.mirrorstack.ai/org/o-1/candidates/c-1",c={run:"建置",lastEvent:"最後事件",openCandidate:"開啟候選版本",runStates:{queued:"排隊中",running:"建置中",done:"已完成",failed:"失敗",cancelled:"已取消"}},u=[{state:"queued",status:"Waiting for a build slot",lastEvent:"run_queued"},{state:"running",status:"Building the quiz module",lastEvent:"sandbox_started"},{state:"done",status:"The candidate is ready",lastEvent:"candidate_ready",candidateId:"c-1",candidateHref:l},{state:"failed",status:"The build stopped",lastEvent:"build_failed"},{state:"done",status:"Done, but no candidate id yet",lastEvent:"candidate_pending",candidateHref:l},{state:"running",status:"A very long status line https://learn.example.com/a/very/long/path/that/never/breaks/the/card",lastEvent:"an_event_name_that_is_extremely_long_and_has_no_break_points_at_all_so_it_must_wrap"}],p=[{state:"queued",status:"等待建置名額",lastEvent:"run_queued"},{state:"running",status:"正在建置測驗模組",lastEvent:"sandbox_started"},{state:"done",status:"候選版本已就緒",lastEvent:"candidate_ready",candidateId:"c-1",candidateHref:l},{state:"failed",status:"建置已停止",lastEvent:"build_failed"},{state:"done",status:"已完成，但尚無候選版本編號",lastEvent:"candidate_pending",candidateHref:l},{state:"running",status:"超級長的狀態說明文字用來檢查在窄版面是否會溢出，並且包含一個很長的網址 https://learn.example.com/a/very/long/path",lastEvent:"an_event_name_that_is_extremely_long_and_has_no_break_points_at_all_so_it_must_wrap"}],s={render:()=>e.jsx("div",{className:"flex flex-col gap-3",children:u.map((a,i)=>e.jsx(t,{...a},i))})},n={render:()=>e.jsx("div",{className:"flex flex-col gap-3",children:p.map((a,i)=>e.jsx(t,{...a,labels:c},i))})},m=a=>[{id:"s1",title:a,category:"module",state:"running"}],r={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(o,{planId:"p-1",state:"executing",steps:m("Author the quiz module")}),e.jsx(t,{...u[2]})]})},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(o,{planId:"p-1",state:"executing",steps:m("撰寫測驗模組"),labels:{plan:"計畫",planStates:{executing:"執行中"},stepStates:{running:"執行中"}}}),e.jsx(t,{...p[2],labels:c})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">{EN_RUNS.map((r, i) => <AgentSidebarRunCard key={i} {...r} />)}</div>
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">{ZH_RUNS.map((r, i) => <AgentSidebarRunCard key={i} {...r} labels={ZH} />)}</div>
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <AgentSidebarPlanCard planId="p-1" state="executing" steps={PLAN_STEP("Author the quiz module")} />
      <AgentSidebarRunCard {...EN_RUNS[2]} />
    </div>
}`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <AgentSidebarPlanCard planId="p-1" state="executing" steps={PLAN_STEP("撰寫測驗模組")} labels={{
      plan: "計畫",
      planStates: {
        executing: "執行中"
      },
      stepStates: {
        running: "執行中"
      }
    }} />
      <AgentSidebarRunCard {...ZH_RUNS[2]} labels={ZH} />
    </div>
}`,...d.parameters?.docs?.source}}};const N=["English","ZhTW","BesidePlanCardEnglish","BesidePlanCardZhTW"];export{r as BesidePlanCardEnglish,d as BesidePlanCardZhTW,s as English,n as ZhTW,N as __namedExportsOrder,S as default};
