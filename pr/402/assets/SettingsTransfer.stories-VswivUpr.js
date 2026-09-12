import{r as o,j as e}from"./iframe-DgoBR23R.js";import{S as A}from"./SettingsSection-DaVEzbyr.js";import{S as T}from"./SettingRow-De4VqrYB.js";import{S as N}from"./Switch-Cw76l1YP.js";import{c as O}from"./cn-IyxL_b2c.js";import{D as C}from"./Dialog-D_TXalfH.js";import{F as B}from"./FloatingLabelInput-CU68gBLP.js";import{I as D}from"./IconButton-D3pp9M6F.js";import"./preload-helper-PPVm8Dsz.js";import"./SectionLabel-AaGfHsPL.js";import"./Surface-q-rwWCyi.js";import"./tone-B_C-zL0B.js";import"./index-CUJmIAvS.js";import"./index-WXoTF4zy.js";import"./Button-CFURSFcQ.js";import"./Progress-0xkhWVVV.js";import"./Icon-MJZ65xO0.js";import"./button-styles-CZHSjrxJ.js";const R={export:"Copy settings",import:"Paste settings",cancel:"Cancel",load:"Load",help:"Paste a settings export below. It loads into the form — nothing is saved until you save.",inputLabel:"Settings JSON",malformed:"That text is not a valid settings export.",wrongModule:"That export belongs to a different module.",unsupported:"That export was made by a newer version of this module."};function p({value:t,parse:n,onImport:s,labels:r,className:E}){const a={...R,...r},L=o.useId(),[u,h]=o.useState(!1),[g,d]=o.useState(!1),[y,S]=o.useState(""),[x,b]=o.useState(null);o.useEffect(()=>{if(!u)return;const i=setTimeout(()=>h(!1),1500);return()=>clearTimeout(i)},[u]),o.useEffect(()=>{g||(S(""),b(null))},[g]);const k=t!==null,I=()=>{t!==null&&navigator.clipboard?.writeText(JSON.stringify(t,null,2)).then(()=>h(!0)).catch(()=>h(!1))},j=()=>{const i=n(y);if(!i.ok){b(i.error);return}s(i.value),d(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:O("flex items-center justify-end gap-1",E),children:[e.jsx(D,{icon:u?"check":"content_copy",variant:"text",size:"sm",type:"button",color:u?"primary":"secondary",disabled:!k,onClick:I,"aria-label":a.export}),e.jsx(D,{icon:"content_paste",variant:"text",size:"sm",type:"button",color:"secondary",disabled:!k,onClick:()=>d(!0),"aria-label":a.import})]}),e.jsx(C,{open:g,onClose:()=>d(!1),title:a.import,actions:[{label:a.cancel,variant:"text",onClick:()=>d(!1)},{label:a.load,disabled:y.trim()==="",onClick:j}],children:e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm text-on-surface-variant",children:a.help}),e.jsx(B,{id:L,multiline:!0,rows:8,label:a.inputLabel,value:y,onChange:i=>{S(i.target.value),b(null)}}),x!==null&&e.jsx("p",{className:"text-sm text-error",role:"alert",children:a[x]})]})})]})}p.__docgenInfo={description:`Copy a settings page's configuration out as JSON, and paste one back in.

The pair exists so a configuration can be moved between applications —
staging to production, or one tenant to the next — without an operator
re-entering every field and getting one of them subtly wrong. Clipboard
rather than a file download: the console runs in a sandbox where a
page-initiated download is inert, and a paste box is also the only form that
works when the two apps are open in two tabs.

🔴 IMPORT LOADS THE DRAFT; IT DOES NOT SAVE. Pasting is one keystroke and a
settings page is a live application's behaviour, so the paste lands where
every other edit on that page lands — in the draft, behind the save bar, next
to a Reset that throws it away. The operator sees what they are about to
apply before it applies. An "import" that wrote straight through would be the
only control here with no undo.`,methods:[],displayName:"SettingsTransfer",props:{value:{required:!0,tsType:{name:"union",raw:"TExport | null",elements:[{name:"TExport"},{name:"null"}]},description:`The envelope to copy. Null while the settings are still loading, which is
also what disables both controls.

🔴 Separate from TImport on purpose. What goes on the clipboard is the
WRAPPED form — module name and version included — and what comes back out
of \`parse\` is the bare settings the form takes. Tying them to one type
would force the caller to unwrap before exporting, and the wrapper is the
only thing that makes a paste into the wrong module's page nameable.`},parse:{required:!0,tsType:{name:"signature",type:"function",raw:"(raw: string) => { ok: true; value: TImport } | { ok: false; error: SettingsTransferError }",signature:{arguments:[{type:{name:"string"},name:"raw"}],return:{name:"union",raw:"{ ok: true; value: TImport } | { ok: false; error: SettingsTransferError }",elements:[{name:"signature",type:"object",raw:"{ ok: true; value: TImport }",signature:{properties:[{key:"ok",value:{name:"literal",value:"true",required:!0}},{key:"value",value:{name:"TImport",required:!0}}]}},{name:"signature",type:"object",raw:"{ ok: false; error: SettingsTransferError }",signature:{properties:[{key:"ok",value:{name:"literal",value:"false",required:!0}},{key:"error",value:{name:"union",raw:'"malformed" | "wrongModule" | "unsupported"',elements:[{name:"literal",value:'"malformed"'},{name:"literal",value:'"wrongModule"'},{name:"literal",value:'"unsupported"'}],required:!0}}]}}]}}},description:`Validate a pasted envelope and return the settings, or an error.

Owned by the caller because only it knows its own shape, and because this
MUST be validation rather than a cast: the text came from a clipboard and
is about to become an application's configuration.`},onImport:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: TImport) => void",signature:{arguments:[{type:{name:"TImport"},name:"value"}],return:{name:"void"}}},description:"Receives the validated settings. See the note on the component: DRAFT."},labels:{required:!1,tsType:{name:"SettingsTransferLabels"},description:""},className:{required:!1,tsType:{name:"string"},description:"Optional class on the row holding the two controls."}}};const ee={title:"UI/Surfaces/SettingsTransfer",component:p},v="demo-module",f=1;function w(t){let n;try{n=JSON.parse(t)}catch{return{ok:!1,error:"malformed"}}if(n===null||typeof n!="object"||Array.isArray(n))return{ok:!1,error:"malformed"};const s=n;if(s.module!==v)return{ok:!1,error:typeof s.module=="string"?"wrongModule":"malformed"};if(s.version!==f)return{ok:!1,error:typeof s.version=="number"&&s.version>f?"unsupported":"malformed"};const r=s.settings;return r===null||typeof r!="object"||typeof r.linkAccountsByEmail!="boolean"||typeof r.sessionLifetimeDays!="number"||!Number.isInteger(r.sessionLifetimeDays)||r.sessionLifetimeDays<1||r.sessionLifetimeDays>365?{ok:!1,error:"malformed"}:{ok:!0,value:{linkAccountsByEmail:r.linkAccountsByEmail,sessionLifetimeDays:r.sessionLifetimeDays}}}const l={render:()=>{const[t,n]=o.useState({linkAccountsByEmail:!0,sessionLifetimeDays:30});return e.jsxs("div",{className:"max-w-md space-y-3",children:[e.jsx(A,{title:"Sign-in",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(T,{title:"Link accounts by email",control:e.jsx(N,{checked:t.linkAccountsByEmail,onChange:s=>n({...t,linkAccountsByEmail:s})})}),e.jsx(T,{title:"Session lifetime (days)",control:e.jsx("span",{className:"text-sm text-on-surface-variant",children:t.sessionLifetimeDays})})]})}),e.jsx(p,{value:{module:v,version:f,settings:t},parse:w,onImport:n})]})}},c={render:()=>e.jsx(p,{value:null,parse:w,onImport:()=>{}})},m={render:()=>{const[t,n]=o.useState({linkAccountsByEmail:!0,sessionLifetimeDays:30});return e.jsx(p,{value:{module:v,version:f,settings:t},parse:w,onImport:n,labels:{export:"複製設定",import:"貼上設定",cancel:"取消",load:"載入",help:"貼上設定匯出內容。它只會載入表單，尚未儲存。",inputLabel:"設定 JSON",malformed:"這段文字不是有效的設定匯出。",wrongModule:"這份匯出屬於其他模組。",unsupported:"這份匯出來自較新版本的模組。"}})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [draft, setDraft] = useState<DemoSettings>({
      linkAccountsByEmail: true,
      sessionLifetimeDays: 30
    });
    return <div className="max-w-md space-y-3">
        <SettingsSection title="Sign-in">
          <div className="space-y-4">
            <SettingRow title="Link accounts by email" control={<Switch checked={draft.linkAccountsByEmail} onChange={checked => setDraft({
            ...draft,
            linkAccountsByEmail: checked
          })} />} />
            <SettingRow title="Session lifetime (days)" control={<span className="text-sm text-on-surface-variant">{draft.sessionLifetimeDays}</span>} />
          </div>
        </SettingsSection>
        <SettingsTransfer value={{
        module: MODULE,
        version: VERSION,
        settings: draft
      }} parse={parseDemo} onImport={setDraft} />
      </div>;
  }
}`,...l.parameters?.docs?.source},description:{story:`A settings page, with the transfer pair where consumers put it: bottom of the
form, right-aligned. Copy, then paste the clipboard back in and watch the
switch move — the paste lands in the DRAFT, which is the whole design.

Paste these to see each refusal:
- \`not json\` → malformed
- \`{"module":"other","version":1,"settings":{}}\` → wrongModule
- \`{"module":"demo-module","version":9,"settings":{}}\` → unsupported`,...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <SettingsTransfer value={null} parse={parseDemo} onImport={() => {}} />
}`,...c.parameters?.docs?.source},description:{story:`Settings still loading: both controls are inert rather than absent, so the
 row does not reflow the moment the fetch lands.`,...c.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [draft, setDraft] = useState<DemoSettings>({
      linkAccountsByEmail: true,
      sessionLifetimeDays: 30
    });
    return <SettingsTransfer value={{
      module: MODULE,
      version: VERSION,
      settings: draft
    }} parse={parseDemo} onImport={setDraft} labels={{
      export: "複製設定",
      import: "貼上設定",
      cancel: "取消",
      load: "載入",
      help: "貼上設定匯出內容。它只會載入表單，尚未儲存。",
      inputLabel: "設定 JSON",
      malformed: "這段文字不是有效的設定匯出。",
      wrongModule: "這份匯出屬於其他模組。",
      unsupported: "這份匯出來自較新版本的模組。"
    }} />;
  }
}`,...m.parameters?.docs?.source},description:{story:`The kit holds no catalog. A consumer with one passes its own strings, and
 may translate only the keys it cares about.`,...m.parameters?.docs?.description}}};const te=["OnASettingsPage","Loading","TranslatedByTheConsumer"];export{c as Loading,l as OnASettingsPage,m as TranslatedByTheConsumer,te as __namedExportsOrder,ee as default};
