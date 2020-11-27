---
title: '@gio-design/components'
group:
  title: Change Log
nav:
  order: 1
  title: Develop
---

# @gio-design/components Change Log

- component

  - 🛎 Add change rem unit to PX.[#525](https://github.com/growingio/gio-design/pull/525)
  - 🛎 Fixed some component style issues.
  - SearchBar
    - 🐛 Solve the problem that the text Icon in searchBar is not centered vertically.[#534](https://github.com/growingio/gio-design/pull/534)
    - 🐛 Solve the problem of logic error in search box search list display.[#534](https://github.com/growingio/gio-design/pull/534)
    - 🐛 When the search list is empty, the search bar's focus should not display a drop-down box.[#534](https://github.com/growingio/gio-design/pull/534)
  - Select
    - 🐛 Fixed a bug in the middle of text.[#524](https://github.com/growingio/gio-design/pull/524)
  - Button
    - 🆕 Only the icon button is added to the Mini type.[#526](https://github.com/growingio/gio-design/pull/526)

## 20.11.3

- component
  - 🛎 add ConfigProvider readme[#494](https://github.com/growingio/gio-design/pull/494)
  - Checkbox
    - 🆕 add onclick prop.[#487](https://github.com/growingio/gio-design/pull/487)
    - 💄 update input hidden to transparent，other domelement pointer-events: none.[#487](https://github.com/growingio/gio-design/pull/487)
  - Table
    - 🐛 selection onClick stopPropagation.[#487](https://github.com/growingio/gio-design/pull/487)
  - Modal
    - 🆕 add useModal.[#494](https://github.com/growingio/gio-design/pull/494)
  - Toast
    - 🆕 add useToast.[#494](https://github.com/growingio/gio-design/pull/494)
  - Drawer
    - 🐛 fix drawer prefix error.[#494](https://github.com/growingio/gio-design/pull/494)
  - List
    - 🐛 fix List fixed height.[#510](https://github.com/growingio/gio-design/pull/510)
    - 🐛 datasource prop should always be controlled.[#493](https://github.com/growingio/gio-design/pull/493)
    - 🐛 resolve tooltip in list and add placement prop.[#512](https://github.com/growingio/gio-design/pull/512)
  - Input
    - 💄 set input default witdh 100%.[#509](https://github.com/growingio/gio-design/pull/509)
  - Cascader
    - 🛎 cascader support key mapping.[#486](https://github.com/growingio/gio-design/pull/486)
  - Button
    - 💄 change default size.[#513](https://github.com/growingio/gio-design/pull/513)

## 20.11.2

- component
  - 🛎 use usePrefix & withConfigConsumer to build prefixCls. [#485](https://github.com/growingio/gio-design/pull/485)
  - Avatar
    - 🐛 Avatar can't trigger dropdown.[#475](https://github.com/growingio/gio-design/pull/475)
- 📖 fix all eslint errors.[#491](https://github.com/growingio/gio-design/pull/491)
- 🛠 bump less-loader from 7.0.2 to 7.1.0.[#479](https://github.com/growingio/gio-design/pull/479)

## 20.11.1

- component
  - Cascader
    - 🆕 Add Cascader component.[#469](https://github.com/growingio/gio-design/pull/469)
  - Select
    - 🐛 fix Select style bug and placeholder not wokring [#466](https://github.com/growingio/gio-design/pull/466)
    - 🐛 fix input caused style error [#456](https://github.com/growingio/gio-design/pull/456)
  - List
    - 🆕 add stateless prop [#468](https://github.com/growingio/gio-design/pull/468)
    - 🆕 add padding style [#468](https://github.com/growingio/gio-design/pull/468)
  - Table
    - 🐛 import dependence components style [#470](https://github.com/growingio/gio-design/pull/470)
  - Tooltip
    - 🐛 fix should not update internal state when tooltip disabled [#465](https://github.com/growingio/gio-design/pull/465)
  - Button
    - 🐛 fix parent node mouseleave not work when button disabled[#464](https://github.com/growingio/gio-design/pull/464)
  - Input, Textarea
    - 🆕 add autosize prop for textarea component [#461](https://github.com/growingio/gio-design/pull/461)
    - 🐛 fix fix the problem that destructing the rest may overwrite value field [#458](https://github.com/growingio/gio-design/pull/458)
  - Dropdown
    - 🆕 define dropdown interaction, it will be close after click the overlay area without visible [#450](https://github.com/growingio/gio-design/pull/450)
  - DatePicker
    - 💄 rename global gio-input classname [#446](https://github.com/growingio/gio-design/pull/446)
- 📖 add or update sotries of alert, avatar and button [#467](https://github.com/growingio/gio-design/pull/467)

## 20.11.0

- component
  - Select #393
    - 🆕 add disabled feature
    - 🆕 add allowCustomOption prop
    - 🆕 add notFoundContent prop
    - 🆕 add dropdownClassName && dropdownStyle prop
    - 🆕 add borderd prop
    - 🆕 add arrowComponent prop
    - 🆕 add autoWidth prop
    - 🆕 add matchPredicate method
    - 🆕 add onSearch method
    - 🆕 add onSelect method
    - 🆕 add onDeSelect method
    - 🆕 add dropDownVisible prop
    - 🆕 add onDropdownVisibleChange method
    - 🛎 remove width prop
    - 🛎 options must follow the options of List Interface
    - 🛎 value && defaultValue now support string or string[] as single or mulit selection mode
    - 🛎 sign of onChange method has been change form (options: Option | Option[] ) to (value: string | string[], options: Option | Option[])
    - 🐛 fix auto width style issue #434
  - Dropdown #395
    - 🐛 fix onVisibleChange not be call after click
  - List #412
    - 🆕 support string type of width
  - SearchBar #408
    - 🐛 Let the display panel adapt to the width of input,and let the prompt text show '...' when the width is too short
  - Input #422
    - 🆕 add prefixWidth for prefix, suffixWidth for suffix, format prefix element style
  - Menu #417
    - 🆕 mount menuitem, submenu to menu
  - Button #425
    - 🆕 change assist button background to transparent
  - Table #427
    - 🆕 add getCheckboxProps prop
  - Avatar #420
    - 🆕 support custom tooltip title
    - 🆕 add style prop
  - Form #419
    - 🆕 add style prop to Form and Item

## 20.10.6

- component
  - 🆕 support placholderImg in avatar and card Upload [#379](https://github.com/growingio/gio-design/pull/379)
  - 🛎 support async function in StepModal's step change [#378](https://github.com/growingio/gio-design/pull/378)
- popconfirm
  - remove code associated with disabled [#377](https://github.com/growingio/gio-design/pull/377)
- tootip
  - 🆕 add disabled parameter [#367](https://github.com/growingio/gio-design/pull/367)
- input
  - change Input component is controlled component，and other website demo，unit test. and style parameter fix [#374](https://github.com/growingio/gio-design/pull/374)
- Table
  - Fix mouse hover will change color when the table content is empty. Define the relationship with the render method when ellipsis。[#334](https://github.com/growingio/gio-design/pull/334)

## 20.10.5

- Grid
  - 🆕add gio-grid component [#338](https://github.com/growingio/gio-design/pull/338)
- Form
  - 🐛fix colon not render issue [#340](https://github.com/growingio/gio-design/pull/340)
- Dropdown
  - 💄Fixed the placement direction problem in the Dropdown component. From 12 directions to 6 directions, the default direction is down [#333](https://github.com/growingio/gio-design/pull/333/)
- Upload
  - 🆕An optional parameter successBorder is added to the upload component to control whether the border is displayed after the image is uploaded successfully. The default value is false [#331](https://github.com/growingio/gio-design/pull/331)
- Select
  - 💄The text size in the input selection box of the select component is defined [#337](https://github.com/growingio/gio-design/pull/337)

## 20.10.4

- Select
  - fix overflow text not elipsised [#319](https://github.com/growingio/gio-design/pull/319)
  - add value, defaultValue to component's props，allow select fully controlled by passing value. [#317](https://github.com/growingio/gio-design/pull/317)
- Form
  - fix stylint [#318](https://github.com/growingio/gio-design/pull/318)
- DatePiker
  - add disalbedData to component's props [#314](https://github.com/growingio/gio-design/pull/314/)
- TimePicker
  - fix style [#307](https://github.com/growingio/gio-design/pull/307)

## 20.10.2

- TimePicker
  - 🆕 functional component TimePicker. [#292](https://github.com/growingio/gio-design/pull/292)
- DatePicker
  - 🆕 add renderExtraFooter to rangePicker's props[#296](https://github.com/growingio/gio-design/pull/296)
  - 🐛 fix rangePicker's onSelect. [#296](https://github.com/growingio/gio-design/pull/296)
  - 🐛 fix rangePicker data sync problem. [#296](https://github.com/growingio/gio-design/pull/296)
- Table
  - refactor pagnation related logic. [#295](https://github.com/growingio/gio-design/pull/295)
- Select
  - add getContainer to component's props. [#291](https://github.com/growingio/gio-design/pull/291)
- SearchBar
  - add placeholder to component's props. [#290](https://github.com/growingio/gio-design/pull/290)
- Menu
  - remove `span` wrapper of children element for MenuItem without icon. [#284](https://github.com/growingio/gio-design/pull/284)
- Checkbox
  - fix style realated error [#232](https://github.com/growingio/gio-design/pull/232)

## 20.9.7

- Table [#267](https://github.com/growingio/gio-design/pull/267)
  - 🐛 update table return type from ReactNode to ReactElement.
  - 🐛 fix rowKey not effect rowSelection.
  - 🐛 resetPagination should depend on source data.
  - 🐛 set table height.
- Loading
  - 🐛 fix loading mask style error. [#279](https://github.com/growingio/gio-design/pull/279)
- Form
  - 🆕 add gio-form functional component. [#254](https://github.com/growingio/gio-design/pull/254)
- DatePicker
  - 🛠 refactor icon & zIndex. [#276](https://github.com/growingio/gio-design/pull/276)
  - 🐛 When the time range is selected in the same month, the panels of the two months should not be synchronized. [#240](https://github.com/growingio/gio-design/pull/240)

## 20.9.6

- Link
  - 🐛 Fix the problem that the type file referenced by the Link component cannot be found during the packaging process. [#262](https://github.com/growingio/gio-design/pull/262)

## 20.9.5

- Table
  - 🐛 when table dataSource update, all state of pagination should be reset.[#251](https://github.com/growingio/gio-design/pull/251)
- Dropdown
  - 🐛 auto close after click overlay element. change overlay type from ReactNode to ReactElement. [#252](https://github.com/growingio/gio-design/pull/252)
  - 📖 continue perfecting Dropdown demo [#249](https://github.com/growingio/gio-design/pull/249)
- Checkbox
  - 💄 advance .gio-checkbox-icon-indeterminate style priority。[#232](https://github.com/growingio/gio-design/pull/232)
- Select
  - 🐛 fix onChange bug。[#231](https://github.com/growingio/gio-design/pull/231)

## 20.9.4

- 🐛 fix some components can't be loaded on demand bug. [#253](https://github.com/growingio/gio-design/pull/253)
- Input
  - 🐛 input and value and onChange not necessary [#255](https://github.com/growingio/gio-design/pull/255)
- 💄 Design z-index display.[#205](https://github.com/growingio/gio-design/pull/205)
- Modal
  - 🐛 Fix footer bug in Modal. Fix reset bug of StepModal. [#207](https://github.com/growingio/gio-design/pull/207)
  - 🐛 Fix StepModal footer logic error. Fix update steps props error. Add wayout prop to fix step path.[#226](https://github.com/growingio/gio-design/pull/226)
- Avatar
  - 🐛 Fix avatar can't trigger Dropdown.[#208](https://github.com/growingio/gio-design/pull/208)
- Dropdown
  - 📖 Add Dropdown demo.[#209](https://github.com/growingio/gio-design/pull/209)
- List
  - 🐛 Fix fire twice on checkbox click.[#219](https://github.com/growingio/gio-design/pull/219)
  - 🆕 Add onSelect and onDeselect props.[#223](https://github.com/growingio/gio-design/pull/223)
- Select
  - 🆕 Add Select Component.[#221](https://github.com/growingio/gio-design/pull/221)
- Tooltip
  - 🆕 Fix children style prop be covered.[#224](https://github.com/growingio/gio-design/pull/224)
- Checkbox
  - 💄 Advance .gio-checkbox-icon-indeterminate style priority.[#228](https://github.com/growingio/gio-design/pull/227)
- Input
  - 🆕 Change props `value` and `onChange` to optional.[#228](https://github.com/growingio/gio-design/pull/228)
- Table
  - 🆕 Update component's props.[#203](https://github.com/growingio/gio-design/pull/203)
- TreeSelect
  - 🆕 Add TreeSelect component.[#202](https://github.com/growingio/gio-design/pull/202)
- DatePicker
  - 🆕 Add DatePicker component.[#199](https://github.com/growingio/gio-design/pull/199)

## 20.9.1

- 🆕 Support branch step in `StepModal`. [#192](https://github.com/growingio/gio-design/pull/192)
- 🐛 Hide `Tooltip` when `title` shouldn't be display. [#193](https://github.com/growingio/gio-design/pull/193)
- 🐛 Add color on icon for alert. [#193](https://github.com/growingio/gio-design/pull/193)
- 🆕 Add `Dropdown` component. [#196](https://github.com/growingio/gio-design/pull/196)
- 🐛 Add forwardRef for `Input` and `Textarea`. [#197](https://github.com/growingio/gio-design/pull/197)
- 🐛 Align check icon when be used to `Table`. [#200](https://github.com/growingio/gio-design/pull/200)
