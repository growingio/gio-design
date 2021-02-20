## [21.2.1](https://github.com/growingio/gio-design/compare/v21.2.0...v21.2.1) (2021-02-20)


### Bug Fixes

* **button:** 互换 Button 在 Dropdown 中 hover 和 active 状态 ([#779](https://github.com/growingio/gio-design/issues/779)) ([a01b868](https://github.com/growingio/gio-design/commit/a01b8682c788faff4486be7cf032cc7f15ccbf74))
* **select:** fix select autoWidth invalid ([#775](https://github.com/growingio/gio-design/issues/775)) ([9711f8b](https://github.com/growingio/gio-design/commit/9711f8b438c2dcaba570968d0ad5c4e8f0e2fe95))


### Features

* **breadcrumb:** update the size of font and  separator ([#794](https://github.com/growingio/gio-design/issues/794)) ([b415a80](https://github.com/growingio/gio-design/commit/b415a80599150ad2f070ceb0b45f1512c5b9db38))
* **layout:** add fixed prop ([#790](https://github.com/growingio/gio-design/issues/790)) ([5ab8417](https://github.com/growingio/gio-design/commit/5ab8417324dfd5ccb5814e14a23eeb049bd49abf))
* **menu:** change menu design ([#763](https://github.com/growingio/gio-design/issues/763)) ([5f9e399](https://github.com/growingio/gio-design/commit/5f9e399765952b992ad4daa779a67f187aab8574))


### BREAKING CHANGES

* **menu:** 移除了默认打开submenu, 需要手动设置openkeys



# [21.2.0](https://github.com/growingio/gio-design/compare/v21.1.3...v21.2.0) (2021-02-05)

### Bug Fixes

- **select:** option disabled style ([#762](https://github.com/growingio/gio-design/issues/762)) ([95cc0c0](https://github.com/growingio/gio-design/commit/95cc0c04d9edcb51756bf42f09c11ab6c1d2f1ed))
- **table:** fix both use ellipsis and onFilter error ([#770](https://github.com/growingio/gio-design/issues/770)) ([4722d54](https://github.com/growingio/gio-design/commit/4722d54736abf25b69aed25f9dc4fd4fd12af9b6))
- **tree-select:** exported from index

### Features

- **button, dropdown:** 触发 dropdown 组件下拉时，应该保持 active 状态 ([#771](https://github.com/growingio/gio-design/issues/771)) ([ec88ae4](https://github.com/growingio/gio-design/commit/ec88ae4c6ed5e4051456502d54d0be33981ee34f))
- **steps:** add steps component ([#766](https://github.com/growingio/gio-design/issues/766)) ([e46c67e](https://github.com/growingio/gio-design/commit/e46c67e9254a89566ea2dbf5d66fc4ff2d036b9d))
- **toggles, link, tag:** add stories

## [21.1.3](https://github.com/growingio/gio-design/compare/v21.1.2...v21.1.3) (2021-01-25)

### Bug Fixes

- **card:** support tooltip parameter pass-through ([#730](https://github.com/growingio/gio-design/issues/730)) ([f919fef](https://github.com/growingio/gio-design/commit/f919fefc43a206fc3f084d0e816c0d4d7d79272e))

### Features

- **grid:** add Row and Col components ([#734](https://github.com/growingio/gio-design/issues/734)) ([57d63a1](https://github.com/growingio/gio-design/commit/57d63a10c562ae062bea02f879427bcf0d60cef7))
- **layout:** add layout component ([#722](https://github.com/growingio/gio-design/issues/722)) ([31e4517](https://github.com/growingio/gio-design/commit/31e451739f980866308e8910c18725c7005fde00))
- **modal:** modify step modal, replace back login with cancel ([#736](https://github.com/growingio/gio-design/issues/736)) ([5b0469f](https://github.com/growingio/gio-design/commit/5b0469f26ddcbfc882e0ce5f7b27a3ad1d458ca1))
- **select:** independent select ([#735](https://github.com/growingio/gio-design/issues/735)) ([4f0928f](https://github.com/growingio/gio-design/commit/4f0928fd4ce0587cc45a3c622f57d78e990d306e)), closes [#677](https://github.com/growingio/gio-design/issues/677)

### BREAKING CHANGES

- **modal:** replace back login with cancal

## [21.1.2](https://github.com/growingio/gio-design/compare/v21.1.1...v21.1.2) (2021-01-14)

### Features

- **space:** add space component ([#716](https://github.com/growingio/gio-design/issues/716)) ([8482636](https://github.com/growingio/gio-design/commit/8482636ef109205b89c1d3f49b6c56cac1d337ea))
- 新增通过 ref 获取实例的接口 ([#717](https://github.com/growingio/gio-design/issues/717)) ([5e2a6a3](https://github.com/growingio/gio-design/commit/5e2a6a3abb2d6e10846fb970a87dab428146c4a5))

## [21.1.1](https://github.com/growingio/gio-design/compare/v21.1.0...v21.1.1) (2021-01-08)

### Bug Fixes

- **input:** 修复 input.number 输入框能输入字符串的问题 ([#701](https://github.com/growingio/gio-design/issues/701)) ([1fb6a64](https://github.com/growingio/gio-design/commit/1fb6a643d766c8497dcab10d9dce0dd8879b1233))
- 修正没有搜索结果的判断逻辑 ([#699](https://github.com/growingio/gio-design/issues/699)) ([3cc7fd1](https://github.com/growingio/gio-design/commit/3cc7fd133565f09217443f6cb26b08e91c80b7cc))
- **modal:** set correct max-height ([#691](https://github.com/growingio/gio-design/issues/691)) ([1cb5421](https://github.com/growingio/gio-design/commit/1cb5421de09439f371384ac6df642382da5fee9e))
- **toggles:** 修复 toggles 组件 checked 不可控 ([#689](https://github.com/growingio/gio-design/issues/689)) ([e5feb76](https://github.com/growingio/gio-design/commit/e5feb76ee3649cc7c94d4f9f950a6b3ce58b9348))
- **tree-select:** fix the tree-select style problems ([#690](https://github.com/growingio/gio-design/issues/690)) ([d8b3cd1](https://github.com/growingio/gio-design/commit/d8b3cd19bf827011c0574aa00fc2ebef6cfee1dc))

### Features

- **avatar:** use the default avatar when src and children do not exist ([#697](https://github.com/growingio/gio-design/issues/697)) ([2aa3f49](https://github.com/growingio/gio-design/commit/2aa3f4915453a9308ef8dfb6883e170a2dc98cf7))
- **card:** add card component ([#692](https://github.com/growingio/gio-design/issues/692)) ([0726725](https://github.com/growingio/gio-design/commit/0726725aebae0f5db59803c6486438b5e9d26148))
- **list:** add allowDeselect prop ([#695](https://github.com/growingio/gio-design/issues/695)) ([9c4138e](https://github.com/growingio/gio-design/commit/9c4138ee5e80aae924e83c01f1f56de421bb94c5))

# [21.1.0](https://github.com/growingio/gio-design/compare/v20.12.6...v21.1.0) (2021-01-05)

### Bug Fixes

- **button:** fix the button left and right padding ([#682](https://github.com/growingio/gio-design/issues/682)) ([b456b5e](https://github.com/growingio/gio-design/commit/b456b5e8fd65f7a574114b1dd12849084d72c939))
- **checkbox:** 修复 checkbox 组件在账号申请中的 bug ([#679](https://github.com/growingio/gio-design/issues/679)) ([19a9fee](https://github.com/growingio/gio-design/commit/19a9fee7931fb96a0799cc98e1f3cf7b4a2cdff4))
- **radio:** add font-weight to radio label and prevent be covered ([#683](https://github.com/growingio/gio-design/issues/683)) ([d961f62](https://github.com/growingio/gio-design/commit/d961f62e7baf696bbdb1994d759d84e8e7ab1171))

### Features

- 自动初始化 selected-parents ([#678](https://github.com/growingio/gio-design/issues/678)) ([b7b60e7](https://github.com/growingio/gio-design/commit/b7b60e7075fa8e335af475dd03b6443186a591ae))
