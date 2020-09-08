---
title: Table 列表
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Table 列表

通用列表。

## 代码演示

### 基础

合适的数据展示方式可以帮助用户快速地定位和浏览数据/信息，以及更高效得协同工作。列表常和排序、搜索、筛选、分页等其他界面元素一起协同，适用于信息的收集和展示、归纳整理、以及操作结构化数据/信息。它结构简单，分隔归纳明确，使信息之间更易于阅读，大大提升了用户对信息的接收效率和理解程度。

- 列表标题：标题是对列表信息内容的整体概括，以便用户对列表内通有整体认知。
- 表头：一般指列标签，这里也指首列行标签，是对所属列/行的信息描述。
- 表体：列表主体内容，具体信息内容的填充区域。
  <code src='./demo/base.tsx' title='基础' desc='简单的列表' >

### 表头多样式

在使用列表的过程中，表头常常与其他辅助性控件，如提示、排序、过滤等对快速获取/阅读列表数据/信息提供帮助的辅助性控件配合使用。
【常用辅助控件】：一般对当前表头所属列的内容进行解释，便于用户理解。

- 提示：一般对当前表头所属列的内容进行解释，便于用户理解。
- 排序：可以对当前列进行升序/降序排序。
- 过滤：可以快速定位当前列的某个元素。

【组合规则】：我们常常会遇到同一个表头使用多个辅助性控件的情况，使用/排列规则如下：

- 提示：始终跟随表头文案，居其右侧排列。
- 排序：始终在表头所属表格居右显示；当过滤等其他操作设置也居右显示时，排序控件位置不变，其他操作设置随其左侧显示。
- 过滤：正常情况下，在所属表格居右显示；当「排序」也居右显示时，过滤居其左。
- 不建议一个表头中超过 2 个以上的辅助性控件。多控件的出现，反而会影响用户阅读信息的效率。
  <code src='./demo/headerStyle/info.tsx' title='提示' desc='一般对当前表头所属列的内容进行解释，便于用户理解。' >
  <code src='./demo/headerStyle/sorter.tsx' title='排序' desc='设置sorter函数开启排序功能，设置sortPriorityOrder支持多项排序。' >
  <code src='./demo/headerStyle/filter.tsx' title='过滤' desc='可以快速定位当前列的某个元素。设置filters 生成过滤选项， 设置onFilter自定义筛选规则，默认筛选规则为相等。(自定义筛选菜单功能还没做)' >
  <code src='./demo/headerStyle/multihelper.tsx' title='多辅助控件' desc='在一列中使用多种辅助控件。' >
  <code src='./demo/headerStyle/multiLine.tsx' title='多行表头' desc='可以通过onChange回调拿到最新的选中的数据项' >

### 表体多样式

在使用列表的过程中，列表内常常与其他辅助性信息协同展示，如状态、头像、标签等，辅助性信息更加简练/明显的概括信息，让阅读者更加快速/高效的获取信息。
【对齐规则】：合适的对齐方式能够提升数据的浏览效率。列表内信息的纵向列对齐能够很好的行程视觉引导线。

- 表头全部左对齐
  - 按照可视化的规则，表头应该跟随表体的对齐方式。在 GIO 的实际场景运用中，表头有大量的操作设置，且我们要以内容的重要程度来排序，表体内容也没法按照
    常规的对齐规律来排列：左对齐——中对齐——右对齐，没法在数据/信息呈现的时候，阅读规律是可循的。所以表头整体都是左对齐。
- 左对齐
  - 可变长度字符串
  - 非比较型数字。例如链接
  - 类别型。例如标签、平台、头像、状态切换等
- 右对齐
  - 可比较字符串，数字型字符。例如数字、金额、环比等
- 居中对齐
  - 固定长度字符串。例如日期 2018/12/12
  - 布尔型数据。例如男/女、是/否
  - 状态类型。例如成功/失败、转化/留存/拉新、优先级
  - 操作项。收藏/下载/分享/删除/编辑等
- 其他特殊规则

  - 表头与数据对齐，表头应当跟随数据的对齐方式
  - 需要关联对比的数据列，例如：数字和环比同属一个单元格内，数字居左，环比居右

  <code src='./demo/align/base-leftAlign.tsx' >
  <code src='./demo/align/uncompare-leftAlign.tsx' >
  <code src='./demo/align/type-leftAlign.tsx' >
  <code src='./demo/align/compareable-rightAlign.tsx' >
  <code src='./demo/align/constantLength-centerAlign.tsx' >
  <code src='./demo/align/stateType-centerAlign.tsx' >
  <code src='./demo/align/operate-centerAlign.tsx' >

【文本规则】

- 空白格内容
  - 小数点后位数、单位，都要与上下列表保持一致
  - 对于不存在的数据，列表不能空置，要用斜线「-」表示，表示该项数据不存在，给用户明确指示；对于数据为零的列表，要用「0」表示
- 展示不全文案
  - 当字符总长度大于表格宽度，多出的字符用...展示。鼠标 hover 该字段时，提示框显示全部文案。
- Disable 样式

  - 列表本身不存在 Disable 状态，列表中 Disable 样式继承各个组件的 Disable 样式。

  <code src='./demo/textRule/blank.tsx' >
  <code src='./demo/textRule/omit.tsx' desc='设定 ellipsis:true 且设定width时生效' >

### 列表-交互规则

【滚动】

- 表头固定。列表有上下/左右滚动两种交互样式。上下滚动时，表头固定，列表内容部分随鼠标上下滚动，滚动条出现在列表右侧边缘。
- 首列固定。左右滚动时，首列固定，其余列随鼠标左右滚动，滚动条出现在底部。

【排序】

- 排序的列和不排序的列应该有明显区分，排序有升序、降序、和默认排序三种规则，上下空心箭头表示默认，上箭头为升序，下箭头为降序。
- 常规状态下，排序呈默认规则；点击排序，视为升序，再次点击排序，视为降序，第三次点击，视为恢复默认状态。
- 默认（时间维度）选中时，其他指标也未有排序操作。则按时间最新至最旧进行排序。
- 默认（时间维度）选中时，其他指标有排序的操作。则按最后那个有排序操作的指标排序。
- 默认（时间维度）未勾选时，则按第一个目标用户的第一个指标进行排序。

【Hover】

- 鼠标 hover 某行列表时，此整行列表成 hover 交互状态。
- 当列表存在链接内容，鼠标 hover 到链接操作区域以外时，此整行列表成 hover 交互状态。

【过滤】

- 点击「过滤 icon」，弹出对应的 Dropdown。
- 选择/搜索需要过滤的条件。
- 选择/搜索过滤条件确定后，Dropdown 收起。过滤 icon 呈被选中状态。
- 取消/清除过滤条件，恢复 normal 状态。

【搜索】

- 激活搜索框。鼠标点击搜索框输入区域，搜索框交互状态改变，列表内容无变化。
- 输入过程。输入搜索条件，搜索列表显示可搜索条件。列表内容无变化。在输入过程中，删除输入内容，列表无内容无变化。
- 输入完成。选择搜索条件/回车，搜索框显示搜索条件。列表内容按搜索结果的匹配度从高到低的顺序显示。
- 删除搜索结果。删除搜索结果，列表内容恢复为默认列表内容。
- 搜索无结果。搜索内容无匹配结果，给出搜索无结果的状态图。

【查看详情】

- 列表内部侧边展开。
  - 当列表含有图片/图标等可视化信息，点击该行列表时，整行列表成点击交互状态，列表内部侧边展开相关详情。
  - 当列表标签过多，其余无法展示的标签用 … 表示，鼠标 Hover 到 … ，使用 Tooltip 显示所有标签。
- 提示 icon
  - 列表纵向/横向的表头有提示 icon，鼠标 hover 到提示 icon 时，使用 Tooltip 显示详情
- 展示不全的字段 - 当鼠标 Hover 到因字符过多而显示不全的该字段时，使用 Tooltip 显示该字段详情

【操作】

- 单行操作
  - 可操作。鼠标 hover 时，使用 Tooltip 显示 icon 含义；点击 icon，使用气泡确认卡片/弹窗显示该操作的确认信息
  - 不可操作。用户 Hover 时使用 Tooltip 显示原因，例如：您没有权限删除此内容。
- 批量操作 - 触发操作在列表内。 - 执行动作在表头-操作区域操作。常规状态下，呈不可操作状态。 - 鼠标点击列表内任意 Check Box，触发批量操作状态。操作区域成可操作状态，显示选中数量，删除 icon 出现。点击删除/表头的 Check Box，视为清空所
  选项。 - 选择批量操作的设置，如删除所选项，弹出删除确认框或对应的设置提示/确认组件。 - 批量操作成功后，给出对应的成功提示。 - 触发操作在列表外。 - 常规状态下，列表内 Check Box 呈不可操作状态，按钮变为 取消 & 保存 - 触发批量操作按钮，列表内 Check Box 呈可操作状态 - 批量选择需要设置的选项，点击保存，批量操作完成；点击取消，列表呈常规状态 - 批量操作成功后，给出对应的成功提示。

【自定义列】

- 鼠标 Hover 按钮-添加自定义列，Tooltip 显示 icon 含义（添加自定义列）
- 点击按钮。触发 Dropdown，显示可添加选项。
- 添加完成。添加项根据产品需求，添加在所有列表的最后一列或者是首列。不可在中间插入添加项，用户无法快速识别/定位到添加项的位置，影响用户体验。

<code src='./demo/interaction/scroll.tsx' title='滚动' desc='设置列的fixed 可以固定列。设定 scroll y开启固定表头。'>
<code src='./demo/interaction/sorter.tsx' >
<code src='./demo/interaction/hover.tsx' >
<code src='./demo/interaction/filter.tsx' >

### 搜索无结果

<code src='./demo/empty.tsx' >

### 分页

<code src='./demo/pagination.tsx' title='分页' desc='分页, pagination设置false 关闭' >

## 参数说明

### Table

| 参数             | 说明                                                                                                               | 类型                                   | 默认值               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | -------------------- |
| **title**        | 列表标题                                                                                                           | string                                 |                      |
| **columns**      | 列表列的配置描述，具体项见下表                                                                                     | ColumnsType[]                          | -                    |
| **dataSource**   | 数据数组                                                                                                           | object[]                               | -                    |
| **pagination**   | 设置分页 ，默认开启，设置为 false 时关闭分页。具体参数可见[pagination](/components/functional/pagination#参数说明) | PaginationProps \| false               | {}                   |
| **rowSelection** | 设置行选择功能                                                                                                     | RowSelection                           | -                    |
| **scroll**       | 设置 table 横向纵向滚动                                                                                            | { x: number, y:number}                 | { x: false, y:false} |
| **showIndex**    | 设置显示序号                                                                                                       | boolean                                | false                |
| **emptyText**    | 设置搜索无结果时的样式                                                                                             | React.ReactNode                        | -                    |
| **onChange**     | 触发分页、排序、过滤时的回调                                                                                       | (pagination, sorter, filters,) => void | -                    |

### Column

列描述对象

| 参数                  | 说明                                         | 类型                                     | 默认值                  |
| --------------------- | -------------------------------------------- | ---------------------------------------- | ----------------------- |
| **key**               | 列唯一标识                                   | string                                   | 列序号                  |
| **dataIndex**         | 列数据在数据项中对应的路径                   | string                                   | -                       |
| **fixed**             | 固定列                                       | 'left' \| 'right' \|boolean              | -                       |
| **align**             | 对齐方式                                     | 'left' \| 'center' \| 'right'            | 'left'                  |
| **width**             | 列宽                                         | number \| string                         | -                       |
| **title**             | 列标题                                       | React.ReactNode                          | -                       |
| **ellipsis**          | 开启超出省略                                 | boolean                                  | false                   |
| **info**              | 设置用于解释该列的文案                       | string                                   | -                       |
| **sorter**            | 排序函数，设置此属性才开启排序功能           | (a: RecordType, b: RecordType) => number |                         |
| **sortPriorityOrder** | 排序优先级                                   | React.ReactNode                          | -                       |
| **sortDirections**    | 支持的排序方式                               | ascend\|descend[]                        | [ascend, descend, none] |
| **defaultSortOrder**  | 默认排序顺序                                 | ascend\|descend                          | -                       |
| **filters**           | 表头的筛选菜单项                             | string[]                                 | []                      |
| **onFilter**          | 自定义筛选规则                               | (record: RecordType) => boolean          | -                       |
| **filterDropdown**    | 自定义筛选菜单，可以用来覆盖默认菜单(还未做) | React.ReactNode                          | -                       |
| **render**            | 每一列的渲染函数                             | function(text, record, index) {}         | -                       |

### RowSelection

| 参数                | 说明                               | 类型                                                            | 默认值 |
| ------------------- | ---------------------------------- | --------------------------------------------------------------- | ------ |
| **selectedRowKeys** | 设置选中的项，设置该项开启受控模式 | string[]                                                        | -      |
| **columnWidth**     | 设置选择列宽                       | number \| string                                                | 48     |
| **onChange**        | 选择项改变时触发的回调函数         | (selectedRowKeys: string[], selectedRows: RecordType[]) => void | -      |
| **fixed**           | 固定选择列                         | 'left' \| 'right' \|boolean                                     | -      |
