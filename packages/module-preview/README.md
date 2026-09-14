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

The React shell (`ModulePreview`) lands next, in the follow-up to this change.
What this release already carries is the part a harness cannot get right by
itself: the console's own frame widths and header copy, and the locale
resolution that makes a `/ui-preflight` sheet mean something.

```ts
import { SURFACE_FRAME, hostSettingsCopy, resolveLocale } from "@mirrorstack-ai/module-preview";

const locale = resolveLocale(["zh-TW", "en-US"]);   // ?locale=, else the browser
const copy = hostSettingsCopy(locale);              // { title: "設定", manage: "管理 {name}" }
const frame = SURFACE_FRAME.settings;               // "mx-auto max-w-5xl space-y-6"
```

### `PreviewSurface`

| value | frame | chrome the console draws |
|---|---|---|
| `settings` | `max-w-5xl` | breadcrumb + `設定` / `管理 <module>` |
| `nav` | `max-w-5xl` (provisional) | none |

`nav` is provisional: what the console frames a nav-item page in is being
decided in web-applications#390, and it must be read off that route when it
lands rather than guessed here.

### The module name to pass the header

Pass what the **console** would resolve — `module.name` from your
`i18n/<locale>.json`, falling back to the non-localized `ms.Config.Name`. If
your module declares no `module.name`, pass the Latin config name: a zh-TW
console really will read `管理 AI Assistant`, and a preview must show that
rather than hide it.

## Caveat

The host's strings (`設定`, `管理 {name}`) are **copied** from
web-applications' catalog. Reword them there and this goes stale, in the
direction of showing a nicer page than production. That is the price of
previewing without a console, and it is the argument for eventually serving the
host's own messages.
