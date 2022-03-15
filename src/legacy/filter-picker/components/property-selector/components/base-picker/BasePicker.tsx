import React from 'react';
import classnames from 'classnames';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import List from '../list';
import { BasePickerProps } from './interfaces';
import SearchBar from '../../../../../../search-bar';
import Alert from '../../../../../../alert';
import TabNav from '../../../../../../tabs';
import defaultLocaleText from './locales/zh-CN';

function BasePicker({
  className,
  style,
  searchBar,
  tabNav,
  items,
  renderItems,
  renderContent,
  footer,
  detailVisible = false,
  renderDetail,
}: BasePickerProps) {
  const localeText: typeof defaultLocaleText = useLocale('BasePicker') || defaultLocaleText;
  const prefixCls = usePrefixCls('base-picker-legacy');
  const [query, setQuery] = React.useState<string>('');

  function handleQueryChange(current: string) {
    setQuery(current);
    searchBar?.onSearch(current.slice(0, 200).toLocaleLowerCase());
  }

  const tabs = React.useMemo(
    () => tabNav?.items?.map((i) => <TabNav.Tab label={i.children} value={i.key} key={i.key} />),
    [tabNav]
  );

  const cls = classnames(prefixCls, className);
  let content;
  if (renderContent) {
    content = renderContent();
  } else if (renderItems) {
    content = <List>{renderItems()}</List>;
  } else {
    content = <List items={items} />;
  }

  return (
    <div className={cls} style={style}>
      {searchBar && (
        <div className={`${prefixCls}__header`}>
          <SearchBar
            placeholder={searchBar.placeholder}
            value={query}
            style={{ width: '100%' }}
            onSearch={handleQueryChange}
          />
          {query.length > 200 && <Alert type="warning" message={localeText.longTip} showIcon closeable />}
        </div>
      )}
      {tabNav && (
        <div style={{ margin: 8 }}>
          <TabNav onChange={tabNav.onChange} defaultValue="all">
            {tabs}
          </TabNav>
        </div>
      )}
      <div className={`${prefixCls}__content`}>{content}</div>
      {footer && <div className={`${prefixCls}__footer`}>{footer}</div>}
      {detailVisible && <div className={`${prefixCls}__detail`}>{renderDetail?.()}</div>}
    </div>
  );
}

export default BasePicker;
