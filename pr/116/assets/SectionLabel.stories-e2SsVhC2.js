import{j as e}from"./iframe-C8EbmOom.js";import{S as r}from"./SectionLabel-CAbHFiiq.js";import{B as a}from"./Button-Djvkrarh.js";import"./preload-helper-PPVm8Dsz.js";import"./cn-IyxL_b2c.js";import"./Progress-Dxll7GS0.js";import"./Icon-CEcnXSas.js";import"./button-styles-DvQkePbc.js";const p={title:"UI/Data/SectionLabel",component:r,args:{children:"Section Title"},argTypes:{children:{control:"text"}}},s={decorators:[t=>e.jsxs("div",{className:"max-w-md rounded-xl bg-surface-container p-5",children:[e.jsx(t,{}),e.jsx("p",{className:"mt-2 text-sm text-on-surface",children:"Content below the section label goes here."})]})]},n={render:t=>e.jsxs("div",{className:"flex flex-col gap-6 max-w-lg",children:[e.jsxs("div",{className:"rounded-xl bg-surface-container p-5",children:[e.jsx(r,{...t,children:"Profile"}),e.jsxs("div",{className:"mt-3 flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Display name"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Jane Doe"})]}),e.jsx(a,{variant:"outline",size:"sm",children:"Edit"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Email"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"jane@example.com"})]}),e.jsx(a,{variant:"outline",size:"sm",children:"Edit"})]})]})]}),e.jsxs("div",{className:"rounded-xl bg-surface-container p-5",children:[e.jsx(r,{...t,children:"Security"}),e.jsxs("div",{className:"mt-3 flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Password"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Last changed 30 days ago"})]}),e.jsx(a,{variant:"outline",size:"sm",children:"Change"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-on-surface",children:"Two-factor auth"}),e.jsx("p",{className:"text-xs text-on-surface-variant",children:"Enabled via authenticator app"})]}),e.jsx(a,{variant:"tonal",size:"sm",color:"primary",children:"Manage"})]})]})]}),e.jsxs("div",{className:"rounded-xl border border-error/30 bg-error/5 p-5",children:[e.jsx(r,{...t,className:"text-error",children:"Danger Zone"}),e.jsx("p",{className:"mt-2 text-sm text-on-surface-variant",children:"Permanently delete your account and all associated data."}),e.jsx("div",{className:"mt-3",children:e.jsx(a,{variant:"filled",size:"sm",color:"error",children:"Delete account"})})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="max-w-md rounded-xl bg-surface-container p-5">
        <Story />
        <p className="mt-2 text-sm text-on-surface">
          Content below the section label goes here.
        </p>
      </div>]
}`,...s.parameters?.docs?.source},description:{story:"Interactive playground — all controls work here",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6 max-w-lg">
      {/* Profile section */}
      <div className="rounded-xl bg-surface-container p-5">
        <SectionLabel {...args}>Profile</SectionLabel>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Display name</p>
              <p className="text-xs text-on-surface-variant">Jane Doe</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Email</p>
              <p className="text-xs text-on-surface-variant">jane@example.com</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Security section */}
      <div className="rounded-xl bg-surface-container p-5">
        <SectionLabel {...args}>Security</SectionLabel>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Password</p>
              <p className="text-xs text-on-surface-variant">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">Two-factor auth</p>
              <p className="text-xs text-on-surface-variant">Enabled via authenticator app</p>
            </div>
            <Button variant="tonal" size="sm" color="primary">
              Manage
            </Button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-error/30 bg-error/5 p-5">
        <SectionLabel {...args} className="text-error">
          Danger Zone
        </SectionLabel>
        <p className="mt-2 text-sm text-on-surface-variant">
          Permanently delete your account and all associated data.
        </p>
        <div className="mt-3">
          <Button variant="filled" size="sm" color="error">
            Delete account
          </Button>
        </div>
      </div>
    </div>
}`,...n.parameters?.docs?.source},description:{story:"Settings page with labeled sections inside cards",...n.parameters?.docs?.description}}};const f=["Playground","SettingsPage"];export{s as Playground,n as SettingsPage,f as __namedExportsOrder,p as default};
