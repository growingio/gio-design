# GrowingIO Design

## Getting Started

```
yarn install
```

GIO-Design

```
yarn start
```

Documentation

```
yarn start:website
```

文档目录 `packages/website/src`

Clean

```
# node_modules
npx lerna clean
```

Add dependency

```
# all packages
yarn workspaces add [dependency]
# package
yarn workspaces add [package] [dependency]
# local dependency
yarn workspaces add [package] [local-dependency@version]
# root
yarn add -W [dependency]
```

Commit Changes

```
yarn cm
```

根据命令行提示选择以及填写 commit 信息，禁止直接使用 `git commit` 命令

## Packages

- @gio-design/tokens
- @gio-design/components

## Repositories

- playground

- website

## Create

lerna create [package-name]

## Build

```
yarn install
yarn build
```

gst

## Publish component

```
cd packages/components
yarn build
(npx) lerna publish
```

## Publish icon/token/theme

```
yarn build
(npx) lerna publish
```

## References

[Lerna](https://lerna.js.org/)
[Yarn Workspace](https://yarnpkg.com/lang/en/docs/workspaces/)
[nohoist in Workspaces](https://yarnpkg.com/blog/2018/02/15/nohoist/)
[GrowingIO Design](https://growingio.design)
