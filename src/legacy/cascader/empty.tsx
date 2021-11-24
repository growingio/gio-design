import React from 'react';
import { Empty as IconEmpty } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';

type Props = {
  tip?: string;
};

const Empty: React.FC<Props> = (props: Props) => {
  const locale = useLocale('Cascader-legacy');
  const { noData }: { noData: string } = {
    ...defaultLocale,
    ...locale,
  };

  const { tip = noData } = props;

  return (
    <div className="cascader-menu-empty">
      <IconEmpty size="60" className="icon-empty" />
      <p className="cascader-menu-empty-tip">{tip}</p>
    </div>
  );
};

export default Empty;
