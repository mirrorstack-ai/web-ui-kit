# Release Strategy

## Versioning

This project follows [Semantic Versioning](https://semver.org/) with pre-release tags.

```
MAJOR.MINOR.PATCH-{stage}.{number}
```

## Release stages

| Stage | Format | Meaning |
|-------|--------|---------|
| Alpha | `0.x.y-alpha.N` | Active development. Breaking changes expected. |
| Beta | `0.x.y-beta.N` | Feature complete. Bug fixes and polish only. |
| RC | `0.x.y-rc.N` | Release candidate. Production ready, final testing. |
| Stable | `0.x.y` | Stable release. Safe for production use. |

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

## Version bumps

| Change | Version example |
|--------|-----------------|
| New component added | `0.1.0-alpha.1` → `0.1.0-alpha.2` |
| Bug fix during alpha | `0.1.0-alpha.2` → `0.1.0-alpha.3` |
| All core components done | `0.1.0-alpha.N` → `0.1.0-beta.1` |
| Bug fix during beta | `0.1.0-beta.1` → `0.1.0-beta.2` |
| Ready for production testing | `0.1.0-beta.N` → `0.1.0-rc.1` |
| First stable release | `0.1.0-rc.N` → `0.1.0` |
| Bug fix after stable | `0.1.0` → `0.1.1` |
| New component batch | `0.1.1` → `0.2.0` |
| Public API stable | `0.x.y` → `1.0.0` |

## How to release

Releases are **label-triggered**. Add the `release` label to a PR before merging.

On merge, CI will automatically:
1. Create a git tag (e.g. `v0.1.0-alpha.2`)
2. Create a GitHub Release with auto-generated changelog
3. Alpha/beta/rc versions are marked as prerelease

PRs without the `release` label do not trigger a release.

The PR author should bump `version` in `package.json` before adding the `release` label.

### npm publishing

Not published to npm during pre-release stages (alpha/beta/rc). Apps install directly from git:

```bash
pnpm add github:mirrorstack-ai/web-ui-kit
```

npm publishing will be enabled at stable `1.0.0`.

## Milestones

Each minor version has a GitHub milestone tracking which issues/PRs are included.
