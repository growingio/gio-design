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
  <code src='./demo/info.tsx' title='提示' desc='一般对当前表头所属列的内容进行解释，便于用户理解。' >
  <code src='./demo/sorter.tsx' title='排序' desc='设置sorter函数开启排序功能，设置sortPriorityOrder支持多项排序。' >
  <code src='./demo/filter.tsx' title='过滤' desc='可以快速定位当前列的某个元素。设置filters 生成过滤选项， 设置onFilter自定义筛选规则，默认筛选规则为相等。(自定义筛选菜单功能还没做)' >
  <code src='./demo/multihelper.tsx' title='多辅助控件' desc='在一列中使用多种辅助控件。' >
  <code src='./demo/multiLine.tsx' title='多行表头' desc='可以通过onChange回调拿到最新的选中的数据项' >

### 分页

<code src='./demo/pagination.tsx' title='分页' desc='分页, pagination设置false 关闭' >

### 固定表头和列

<code src='./demo/fixed.tsx' title='固定' desc='设置列的fixed 可以固定列。' >
<code src='./demo/fixedheight.tsx' title='固定' desc='设定 scroll y开启固定表头。' >

## 参数说明

### Table

| 参数             | 说明                                                                                                               | 类型                     | 默认值               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------- |
| **title**        | 列表标题                                                                                                           | string                   |                      |
| **columns**      | 列表列的配置描述，具体项见下表                                                                                     | ColumnsType[]            | -                    |
| **dataSource**   | 数据数组                                                                                                           | object[]                 | -                    |
| **pagination**   | 设置分页 ，默认开启，设置为 false 时关闭分页。具体参数可见[pagination](/components/functional/pagination#参数说明) | PaginationProps \| false | {}                   |
| **rowSelection** | 设置行选择功能                                                                                                     | RowSelection             | -                    |
| **scroll**       | 设置 table 横向纵向滚动                                                                                            | { x: number, y:number}   | { x: false, y:false} |

### Column

列描述对象

| 参数                  | 说明                                         | 类型                                     | 默认值                  |
| --------------------- | -------------------------------------------- | ---------------------------------------- | ----------------------- |
| **key**               | 列唯一标识                                   | string                                   | 列序号                  |
| **dataIndex**         | 列数据在数据项中对应的路径                   | string                                   | -                       |
| **fixed**             | 固定列                                       | 'left' \| 'right' \|boolean              | -                       |
| **align**             | 对齐方式                                     | 'left' \| 'center' \| 'right'            | 'left'                  |
| **width**             | 列宽                                         | number                                   | -                       |
| **title**             | 列标题                                       | React.ReactNode                          | -                       |
| **info**              | 设置用于解释该列的文案                       | string                                   | -                       |
| **sorter**            | 排序函数，设置此属性才开启排序功能           | (a: RecordType, b: RecordType) => number |                         |
| **sortPriorityOrder** | 排序优先级                                   | React.ReactNode                          | -                       |
| **sortDirections**    | 支持的排序方式                               | ascend\|descend[]                        | [ascend, descend, none] |
| **defaultSortOrder**  | 默认排序顺序                                 | ascend\|descend                          | -                       |
| **filters**           | 表头的筛选菜单项                             | string[]                                 | []                      |
| **onFilter**          | 自定义筛选规则                               | (record: RecordType) => boolean          | -                       |
| **filterDropdown**    | 自定义筛选菜单，可以用来覆盖默认菜单(还未做) | React.ReactNode                          | -                       |

### RowSelection

| 参数         | 说明                       | 类型                                                            | 默认值 |
| ------------ | -------------------------- | --------------------------------------------------------------- | ------ |
| **onChange** | 选择项改变时触发的回调函数 | (selectedRowKeys: string[], selectedRows: RecordType[]) => void | -      |
