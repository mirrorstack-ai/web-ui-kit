# @mirrorstack-ai/module-preview

The console's page shell, on localhost, around your module's real mount — so a
surface can be reviewed without a platform, a database or a tunnel.

It is published from `web-ui-kit` and takes the kit as a **peer dependency**, so
the preview's chrome is your module's chrome by construction. A shell built
anywhere else would drift from your kit on every kit release and render a
different `DevToolbar` than your own pages do.

## Why it exists

Every module that wrote its own preview got the same things wrong, and each one
was reviewed as a defect in the *page*:

| The harness did this | It was reported as | It actually was |
|---|---|---|
| drew no page header | "the module has no page header" | the **host** renders the breadcrumb, title and subtitle; a module that renders one ships two |
| framed the mount in `max-w-3xl` | "the page is cramped" | the console frames it in `max-w-5xl` |
| toasted "Saved" whenever a page went clean | "why did it say saved?" | the host arms that on the save **button** |
| blanked the page when the unsaved bar appeared | "the page is broken" | an unstable bridge identity remounted the module |
| read the locale from `?locale=` only | a green preflight sheet | all four "en" cells rendered Chinese; half the matrix asserted nothing |

All five are asserted in this package's tests, and each assertion was checked by
putting the bug back.

## Use

```tsx
import { createRoot } from "react-dom/client";
import { ModulePreview } from "@mirrorstack-ai/module-preview";
import { mountSettings } from "../src/index";        // your REAL entry point
import { fixtureFetch, SCENARIOS } from "./fixtures";

createRoot(document.getElementById("preview")!).render(
  <ModulePreview
    surface="settings"
    moduleName={{ "zh-TW": "AI 助理", "en-US": "AI Assistant" }}
    scenarios={SCENARIOS}
    locales={["zh-TW", "en-US"]}
    savedMessage={{ "zh-TW": "已儲存", "en-US": "Saved" }}
    mount={(target, { scenario, locale, unsaved }) =>
      mountSettings(target, {
        apiBase: "/api/modules/ai-assistant",
        fetch: fixtureFetch(scenario),
        appId: "00000000-0000-4000-8000-000000000001",
        locale,
        unsaved,
      })
    }
  />,
);
```

The seam is `mount`: the shell owns the chrome, the axes and the host services;
you own your fixtures and your own mount call. Mount your **real** entry point —
the one the console imports from `dist/index.js` — or the preview stops being
evidence about the thing that ships. Answer your fixtures at the host `fetch`
the mount context carries, not by stubbing your own API module, for the same
reason.

### `surface`

| value | frame | chrome the shell draws |
|---|---|---|
| `settings` (default) | `max-w-5xl` | breadcrumb + `設定` / `管理 <module>` |
| `nav` | `max-w-5xl` (provisional) | none |

`nav` is provisional: what the console frames a nav-item page in is being
decided in web-applications#390, and it must be read off that route when it
lands rather than guessed here.

### `moduleName`

Pass what the **console** would resolve — `module.name` from your
`i18n/<locale>.json`, falling back to the non-localized `ms.Config.Name`. If
your module declares no `module.name`, pass the Latin config name: a zh-TW
console really will read `管理 AI Assistant`, and the preview must show that
rather than hide it.

### Axes as links

`?scenario=`, `?locale=` and `?theme=` set the opening state, so a review is
handed over as a link to the exact page under discussion rather than as three
clicks to reproduce. With no `?locale=`, the locale follows the browser — which
is what `/ui-preflight` drives, and reading the query alone is how a preview
came to render Chinese in all four "en" cells of every sheet.

### What the shell will NOT do

Render your page's heading. The host renders the title and subtitle, and
web-applications' settings-module route says in its own source that a bundle
"should NOT render its own page-level heading to avoid duplication". If your
page renders an `<h1>`, the deployed page shows two.

## Caveat

The host's strings (`設定`, `管理 {name}`) are **copied** from
web-applications' catalog. Reword them there and this goes stale, in the
direction of showing a nicer page than production. That is the price of
previewing without a console, and it is the argument for eventually serving the
host's own messages.
