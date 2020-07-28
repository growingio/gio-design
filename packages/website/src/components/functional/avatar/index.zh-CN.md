---
title: Avatar 头像
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Avatar 头像

## 何时使用

用来代表用户，支持图片或字符展示。

## 代码演示

### 仅展示

<code src='./demo/base.tsx' title='Avatar 仅展示' desc='当用户未设置头像时，显示该用户名称的首个文字、数字或字母。' />

### 尺寸

<code src='./demo/size.tsx' title='Avatar 基本用法' desc='头像有以下几种尺寸：24px、32px、56px、80px。24px、32px 常用于列表&导航展示。56px、80px 常用于用户管理。默认为字符型头像，24px、32px 头像的文字字号为12px；56px 头像的文字字号为 16px；80px 头像的文字字号为 20px。' />

### 可展开操作

<code src='./demo/hover.tsx' title='Avatar 可展开操作' desc='hover头像显示icon，click头像展开下来菜单（等Dropdown设计与实现完成再添加该功能）' />

### 重叠展示

<code src='./demo/group.tsx' title='Avatar 重叠展示' desc='可设置组显示数量，默认为4。当用户未设置头像时，显示该用户名称的首个文字数字或字母。hover头像时头像前置，并显示tooltip。（tooltip设计与实现后完成再添加该功能）点击最后一项展开包含其余用户头像的Dropdown（Dropdown设计与实现后完成再添加该功能）' />

## 参数说明

### Avatar

| 参数     | 说明               | 类型                                  | 默认值    |
| -------- | ------------------ | ------------------------------------- | --------- |
| **size** | 设置头像的尺寸大小 | `'small', 'default', 'large', 'huge'` | `default` |
| **src**  | 设置头像的链接     | `string`                              | `''`      |
| **omit** | 是否省略用户名称   | `boolean`                             | `true`    |

### AvatarGroup

| 参数       | 说明                                                   | 类型               | 默认值 |
| ---------- | ------------------------------------------------------ | ------------------ | ------ |
| **number** | 设置显示出来的头像个数，包含最后一项显示剩余个数的头像 | `number`           | `5`    |
| **users**  | 用户头像数据数组                                       | `UserAvatarType[]` | `[]`   |

### Option

```ts
interface UserAvatarType {
  name: string;
  src?: string;
}
```
