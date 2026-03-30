# Release Strategy

## Versioning

This project follows [Semantic Versioning](https://semver.org/) with pre-release tags.

```
MAJOR.MINOR.PATCH-{stage}.{number}
```

## Release stages

| Stage | Format | Meaning |
|-------|--------|---------|
| Alpha | `0.x.0-alpha.N` | Active development. Breaking changes expected. |
| Beta | `0.x.0-beta.N` | Feature complete. Bug fixes and polish only. |
| RC | `0.x.0-rc.N` | Release candidate. Production ready, final testing. |
| Stable | `0.x.0` | Stable release. Safe for production use. |

## Current version

**0.1.0-alpha** — early development, porting components from reference.

## Release flow

```
alpha → beta → rc → stable
  ↑       ↑      ↑
  │       │      └─ Only critical fixes
  │       └──────── Bug fixes, no new features
  └──────────────── New features, breaking changes OK
```

## When to bump

- **alpha.N → alpha.N+1** — new component added, breaking API change
- **alpha → beta** — all planned components for the milestone are ported
- **beta.N → beta.N+1** — bug fix during beta
- **beta → rc** — all known bugs fixed, ready for production testing
- **rc → stable** — no issues found during rc period

## How to release

1. Update `version` in `package.json`
2. Create a git tag: `git tag v0.1.0-alpha.1`
3. Push the tag: `git push origin v0.1.0-alpha.1`
4. Create a GitHub Release from the tag with changelog

## Milestones

Each minor version has a GitHub milestone tracking which issues/PRs are included.
