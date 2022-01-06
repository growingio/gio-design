import React from 'react';
import { useLocale } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';
import EmptyIcon from './svg/EmptyImageSVG';

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
    <div className="cascader-legacy-menu-empty">
      <EmptyIcon className="icon-empty" />
      <p className="cascader-legacy-menu-empty-tip">{tip}</p>
    </div>
  );
};

export default Empty;
