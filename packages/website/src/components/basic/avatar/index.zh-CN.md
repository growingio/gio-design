---
title: Avatar 头像
nav: 
  order: 1
  title: 组件
group:
  title: 基础组件
---

# Avatar 头像

## 何时使用
用来代表用户，支持图片或字符展示。

## 代码演示

### 仅展示
<code src='./demo/base.tsx' />

### 尺寸
<code src='./demo/size.tsx' />

### 可展开操作
<code src='./demo/hover.tsx' />

### 重叠展示
<code src='./demo/group.tsx' />


## 参数说明
### Avatar
| 参数       | 说明       | 类型      | 默认值     |
| ----------| ----------| ----------| ----------|
| **size**  | 设置头像的尺寸大小  | `'small', 'default', 'large', 'huge'`  | `default` |
| **src**   | 设置头像的链接 | `string` | `''` |
| **omit**  | 是否省略用户名称 | `boolean` | `true` |

### AvatarGroup 
| 参数       | 说明       | 类型      | 默认值     |
| ---------- | ----------| ----------| ----------|
| **number** | 设置显示出来的头像个数，包含最后一项显示剩余个数的头像 | `number` | `5` |
| **users**  | 用户头像数据数组 |  `UserAvatarType[]` | `[]` |

### Option
```ts
interface UserAvatarType {
  name: string;
  src?: string;
}
```

