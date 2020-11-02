---
title: '@gio-design/components'
group:
  title: Change Log
nav:
  order: 1
  title: Develop
---

# @gio-design/components Change Log

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
