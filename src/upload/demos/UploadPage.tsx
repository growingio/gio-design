import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Upload from '../Upload';

export default function UploadPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>
        {formatMessage({
          defaultMessage: 'Upload 上传组件',
        })}
      </Title>
      <p>
        {formatMessage({
          defaultMessage: '文件选择上传和拖拽上传控件。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '默认-按钮上传' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage:
            '用户点击按钮弹出文件选择框。若上传的是图片，则在按钮区域显示图片的缩略图，及图片名称，名称显示不全时，hover Tooltip 展示全名。若上传的是文件，则显示文件名。',
        })}
      </p>
      <Canvas>
        <Story id="data-input-upload--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'URL 上传' })}</Subheading>
      <p>
        {formatMessage({ defaultMessage: '1. 在输入框内输入图片的 URL，回车即可上传图片。' })}
        <br />
        {formatMessage({ defaultMessage: '2. 若上传失败，使用 input 的错误提示方式，说明上传失败的原因。' })}
      </p>
      <Canvas>
        <Story id="data-input-upload--url-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'logo 上传' })}</Subheading>
      <p>
        {formatMessage({ defaultMessage: '1. 用于上传 logo，点击后弹出文件选择框，上传后图片等比缩放，显示缩略图。' })}
        <br />
        {formatMessage({ defaultMessage: '2. 图片上传中套用 Loading 组件。' })}
      </p>
      <Canvas>
        <Story id="data-input-upload--card-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '头像上传' })}</Subheading>
      <p>
        {formatMessage({ defaultMessage: '1. 用于上传头像，点击后弹出文件选择框，上传后图片等比缩放，显示缩略图。' })}
        <br />
        {formatMessage({ defaultMessage: '2. 图片上传中套用 Loading 组件。' })}
      </p>
      <Canvas>
        <Story id="data-input-upload--avatar-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '上传区域' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage:
            '1. 可以将文件或图片等拖拽到制定区域上传，也可以点击上传。若上传的是图片，上传后图片等比缩放填充满父容器。',
        })}
        <br />
        {formatMessage({ defaultMessage: '2. 图片上传中套用 Loading 组件。' })}
        <br />
        {formatMessage({ defaultMessage: '3. 文件上传中套用 Loading 组件。上传成功/上传失败都在界面上显示。' })}
        <br />
        {formatMessage({
          defaultMessage:
            '4. 可批量上传，通过 directory 和 multiple 两个参数控制，directory 为文件夹上传，multiple 为多选文件上传，两者同时设置时，directory 的优先级更高。',
        })}
        <br />
        {formatMessage({
          defaultMessage:
            '5. 批量上传时，已上传的文件列表会展示在上传区域下方，列表项的内容主要有文件名、上传成功或失败原因、移除按钮。',
        })}
        <br />
        {formatMessage({ defaultMessage: '6. 批量上传时可设置是否显示上传文件列表，并可设置最大上传数量限制。' })}
      </p>
      <Canvas>
        <Story id="data-input-upload--area-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '受控文件' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '受控的上传文件。' })}</p>
      <Canvas>
        <Story id="data-input-upload--controlled-file" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义上传错误信息' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '可在回调函数中通过改变file的status以及errorMessage来自定义要显示的错误信息。',
        })}
      </p>
      <Canvas>
        <Story id="data-input-upload--custom-error-message-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '默认上传文件列表' })}</Subheading>
      <Canvas>
        <Story id="data-input-upload--default-list-upload" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Upload} />
    </>
  );
}
