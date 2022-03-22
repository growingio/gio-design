import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/blocks';
import Upload from '../Upload';

export default function UploadPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Upload 上传组件' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '文件选择上传和拖拽上传控件。',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>{formatMessage({
        defaultMessage: '当需要上传一个或一些文件时;当需要展现上传的进度时;当需要使用拖拽交互时',
      })}</Description>
      <Subtitle>
        <FormattedMessage defaultMessage="设计稿" />
      </Subtitle>
      <Figma
        height="30%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A43562"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '默认-按钮上传' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '用户点击按钮弹出文件选择框。若上传的是图片，则在按钮区域显示图片的缩略图，及图片名称，名称显示不全时，hover Tooltip 展示全名。若上传的是文件，则显示文件名。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'URL 上传' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '在输入框内输入图片的 URL，回车即可上传图片。inputUploadType="file" 将远程文件上传到指定的服务器' })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--input-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'logo 上传' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '点击上传用 logo，上传后图片等比缩放，显示缩略图。并使用 beforeUpload 限制用户上传的图片格式和大小' })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--card-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '头像上传' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: ' 用于上传头像，点击后弹出文件选择框，上传后图片等比缩放，显示缩略图。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--avatar-upload" />
      </Canvas>


      <Subheading>{formatMessage({ defaultMessage: '文件夹上传' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '支持上传一个文件夹里的所有文件。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--upload-directory" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '拖拽上传' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '把文件拖入指定区域，完成上传，也可以点击上传。单文件上传时，若上传的是图片，上传后图片等比缩放填充满父容器。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--dragger-upload" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '批量上传' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过 directory 和 multiple 两个参数控制，directory 为文件夹上传，multiple 为多选文件上传 (仅支持 ie10+)。两者同时设置时，directory 的优先级更高。批量上传时可设置是否显示上传文件列表，并可设置最大上传数量限制',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--batch-upload" />
      </Canvas>


      <Subheading>{formatMessage({ defaultMessage: '受控文件' })}</Subheading>
      <Description>{formatMessage({ defaultMessage: '受控的上传文件。' })}</Description>
      <Canvas>
        <Story id="upgraded-upload--controlled-file" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义上传错误信息' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可在回调函数中通过改变file的status以及errorMessage来自定义要显示的错误信息。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--custom-error-message" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '完全控制的文件列表' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '使用 fileList 对列表进行完全控制，可以实现各种自定义功能。以下演示通过fileList控制上传列表数量限制' })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--controlled-file-list" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '已上传的文件列表' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '使用 defaultFileList 设置已上传的内容。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-upload--default-list-upload" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Upload} />
    </>
  );
}
