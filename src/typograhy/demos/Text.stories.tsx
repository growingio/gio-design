import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Typography from '../index';
import type { TextProps } from '../interfaces';
import TextPage from './TextPage';

import '../style';

const { Text } = Typography;

interface StoryProps extends TextProps {
  width?: number;
}

const Template: Story<StoryProps> = (args) => {
  const { width = 600 } = args;
  return (
    <div style={{ width }}>
      <Text {...args} />
    </div>
  );
};

export const SingleLine = Template.bind({});
SingleLine.args = {
  width: 200,
  lines: 1,
  children: 'Lorem Ipsum，也称乱数假文或者哑元文本',
};

export const MultiLines = Template.bind({});
MultiLines.args = {
  lines: 2,
  children:
    'Lorem Ipsum，也称乱数假文或者哑元文本，是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum 从西元 15 世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着 Lorem Ipsum 段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使 Lorem Ipsum 落入大众的视野。',
};

export const English = Template.bind({});
English.args = {
  lines: 2,
  children:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

export const Styles = () => (
  <>
    <Text>Normal Text Paragraph</Text>
    <Text color="gray">Gray Text Paragraph</Text>
    <Text size="small">Small Text Paragraph</Text>
    <Text size="small" color="gray">
      Small Gray Text Paragraph
    </Text>
  </>
);

export default {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    docs: {
      page: TextPage,
    },
  },
} as Meta;
