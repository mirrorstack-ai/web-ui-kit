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
1. Bump the version in `package.json`
2. Create a git tag (e.g. `v0.1.0-alpha.2`)
3. Create a GitHub Release with auto-generated changelog

PRs without the `release` label do not trigger a version bump.

### Stage transitions (manual)

To move between stages (e.g. alpha → beta), a maintainer manually sets the version in `package.json` and creates the tag:

```bash
# in package.json: "version": "0.1.0-beta.1"
git tag v0.1.0-beta.1
git push origin v0.1.0-beta.1
```

## Milestones

Each minor version has a GitHub milestone tracking which issues/PRs are included.
