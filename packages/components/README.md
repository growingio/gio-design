# GrowingIO Design Components

## Theme

目前可在 webpack.config.js 中配置 less 的 modifyVars 进行覆盖，变量名可参考 src/styleSheet 目录下的 less 文件
```
  loader: 'less-loader',
  options: {
    modifyVars: {
      '@color-primary': '#f48267'
    }
  }
```

## Development

### Scripts

- **npm start**
使用 webpack-dev-server 启动本地开发服务器，地址为 localhost:9000
默认展示的组件是 Playground，可以利用这个组件对其他组件进行测试。如果需要在本地开发时同步调试其他项目，可使用 [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/)

- **npm run build** 使用 gio-rewire 进行 打包

#### publish

为避免产生额外的 commit 和 tag，请不要使用 lerna publish，可以使用以下命令代替
```
lerna version --amend --no-git-tag-version
git commit -a --amend --no-edit // gcan!
lerna publish from-package
```
