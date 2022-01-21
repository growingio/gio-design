/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  toPairs,
  uniq,
  cloneDeep,
  groupBy,
  keys,
  orderBy,
  Dictionary,
  isEqualWith,
  isEmpty,
  replace,
  has,
} from 'lodash';
import * as pinyin from 'pinyin-match';
import classNames from 'classnames';
import { useLocale, useLocalStorage, usePrefixCls } from '@gio-design/utils';
import { dimensionToPropertyItem, getShortPinyin, promisify } from './util';
import { useDebounceFn } from '../hooks';
import BasePicker from '../base-picker';
import { PropertyPickerProps, PropertyTypes, PropertyItem, PropertyValue, PropertyInfo } from './interfaces';
import List from './components/list';
import { ListItemProps } from './components/list/interfaces';
import Page from '../../page'; // new
import { renderExpandableItems } from './components/list/utils';
import PropertyCard from './PropertyCard';
import './style';
import { Dimension } from './types';
import IconRender from './PropertyValueIconRender';
import defaultLocale from './locales/zh-CN';
import defaultLocaleFromList from '../../list/locales/zh-CN';

export const ExpandableGroupOrSubGroup = (props: {
  title?: string;
  type: 'group' | 'subgroup';
  items: ListItemProps[];
  groupKey?: string;
}) => {
  const { items = [], type = 'subgroup', title, groupKey: key } = props;
  const localesText: typeof defaultLocaleFromList = useLocale('List') || defaultLocaleFromList;
  const [expanded, setExpand] = useState(false);
  const onExpand = () => {
    setExpand(true);
  };
  const content = renderExpandableItems(expanded, items, onExpand, localesText);
  return (
    <>
      {type === 'group' && (
        <List.ItemGroup key={`group-${key}`} title={title}>
          {content}
        </List.ItemGroup>
      )}
      {type === 'subgroup' && (
        <List.ItemSubgroup key={`subgroup-${key}`} title={title}>
          {content}
        </List.ItemSubgroup>
      )}
    </>
  );
};

const pinyinMatch = pinyin.default;

const PropertyPicker: React.FC<PropertyPickerProps> = (props: PropertyPickerProps) => {
  const {
    value: initialValue,
    searchBar,
    loading = false,
    dataSource: originDataSource,
    recentlyStorePrefix = '_gio',
    onChange,
    onSelect,
    onClick,
    detailVisibleDelay = 600,
    fetchDetailData = (data: PropertyItem): Promise<PropertyInfo> => Promise.resolve({ ...data }),
    disabledValues = [],
    shouldUpdateRecentlyUsed = true,
    className,
    ...rest
  } = props;
  const locale = useLocale('PropertyPicker');
  const localeText = { ...defaultLocale, ...locale } as typeof defaultLocale;
  const Tabs = toPairs(PropertyTypes(localeText)).map((v) => ({ key: v[0], children: v[1] }));
  const [scope, setScope] = useState('all');
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [recentlyUsedInMemo, setRecentlyUsedInMemo] = useState<{
    [key: string]: any[];
  }>();
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage<{
    [key: string]: any[];
  }>(`${recentlyStorePrefix}_propertyPicker`, {
    all: [],
  });

  useEffect(() => {
    if (shouldUpdateRecentlyUsed) {
      setRecentlyUsedInMemo(recentlyUsed);
    }
  }, [recentlyUsed, shouldUpdateRecentlyUsed]);

  const [currentValue, setCurrentValue] = useState<PropertyValue | undefined>(initialValue);

  const prefixCls = usePrefixCls('property-picker-legacy');

  const [detailVisible, setDetailVisible] = useState(false);
  const debounceSetDetailVisible = useDebounceFn((visible: boolean) => {
    setDetailVisible(visible);
  }, detailVisibleDelay);
  const [dataList, setDataList] = useState<PropertyItem[]>([]);
  const navRef = useRef([{ key: 'all', children: localeText.allText }]);
  useEffect(() => {
    // 如果是Dimension类型 需要做一个数据转换
    let propertiItemList: PropertyItem[] = [];
    if (originDataSource && originDataSource.length) {
      if (!('value' in originDataSource[0])) {
        propertiItemList = originDataSource.map((v) => {
          const item = dimensionToPropertyItem(v as Dimension, localeText);
          item.itemIcon = () => <IconRender group={item.iconId} />;
          return item;
        });
      } else {
        propertiItemList = originDataSource.map((v) => {
          const item = v as PropertyItem;
          item.itemIcon = () => <IconRender group={item.iconId} />;
          return item;
        });
      }
    }
    const list = propertiItemList.map((v) => {
      const disabled = !!disabledValues && disabledValues.includes(v.id);

      return {
        ...v,
        disabled,
        pinyinName: getShortPinyin(v.label ?? ''),
      };
    });

    setDataList(list);
    /**
     * 设置属性类型tab，如果传入的列表没有对应的类型 不显示该tab
     */
    const types = uniq(propertiItemList.map((p) => p.type));
    const tabs = Tabs.filter((t) => types.indexOf(t.key) > -1);
    navRef.current = [{ key: 'all', children: localeText.allText }].concat(tabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localeText.allText, originDataSource]);

  /**
   * 搜索关键字的方法，支持拼音匹配
   * @param input 带匹配的项
   * @param key 匹配的关键字
   */
  const keywordFilter = (input = '', key = '') => {
    if (!input || !key) return true;
    return !!pinyinMatch?.match(input, key);
  };

  /**
   * 属性列表数据源
   */
  const dataSource = useMemo(() => {
    const filteredData = dataList.filter((item) => {
      const { label, type, groupId, valueType } = item;
      if (groupId === 'virtual' && valueType !== 'string') {
        return false;
      }
      if (scope === 'all') {
        return keywordFilter(label, keyword);
      }
      return type === scope && keywordFilter(label, keyword);
    });

    // 按照分组排序
    const sortedData = orderBy(filteredData, ['typeOrder', 'groupOrder', 'pinyinName']);

    // mixin 最近使用
    const rids: string[] = recentlyUsedInMemo ? recentlyUsedInMemo[scope] : [];
    const recent: PropertyItem[] = [];
    rids?.forEach((v: string) => {
      const r = filteredData.find((d) => d.value === v);
      if (r) {
        recent.push({
          ...r,
          itemIcon: () => <IconRender group={r.iconId} />,
          _groupKey: 'recently',
        });
      }
    });
    return [recent, sortedData];
  }, [dataList, keyword, recentlyUsedInMemo, scope]);

  function onTabNavChange(key: string) {
    setScope(key);
  }

  /**
   * 点选时 设置最近使用
   * @param item
   */
  function _saveRecentlyByScope(item: PropertyItem) {
    const { value: v, type } = item;
    const recent = cloneDeep(recentlyUsed);
    // save by type/scope
    const realScope = type || 'all';
    let scopedRecent = recent[realScope];
    if (!scopedRecent) {
      scopedRecent = [];
    }
    let newScopedRecent = uniq([v, ...scopedRecent]);
    if (newScopedRecent.length > 5) {
      newScopedRecent = newScopedRecent.slice(0, 5);
    }
    const allScopedRecent = recent.all || [];

    let newAllScopedRecent = uniq([v, ...allScopedRecent]);
    if (newAllScopedRecent.length > 5) {
      newAllScopedRecent = newAllScopedRecent.slice(0, 5);
    }
    recent[realScope] = newScopedRecent;
    recent.all = newAllScopedRecent;
    setRecentlyUsed(recent);
  }
  function handleSelect(node: PropertyItem) {
    setCurrentValue(node as PropertyValue);

    _saveRecentlyByScope(node);
    if (isEmpty(currentValue) || !isEqualWith(currentValue, node, (a, b) => a.value === b.value)) {
      onChange?.(node);
    }
    onSelect?.(node);
  }
  const handleSearch = (query: string) => {
    setKeyword(query);
  };
  const handleItemClick = (e: React.MouseEvent<HTMLElement>, node: PropertyItem) => {
    handleSelect(node);
    onClick?.(e);
  };
  const [recentlyPropertyItems, propertyItems] = dataSource;
  const groupDatasource = useMemo(
    () => groupBy([...propertyItems], (o) => replace(o.type, /^recently¥/, '')),
    [propertyItems]
  );

  function labelRender(item: PropertyItem) {
    const isShowIndent = Boolean(item.associatedKey && item._groupKey !== 'recently');
    return (
      <>
        <span className={classNames('item-icon', { indent: isShowIndent })}>{item.itemIcon?.()}</span>
        <span>{item.label}</span>
      </>
    );
  }
  const [hoverdNodeValue, setHoveredNodeValue] = useState<PropertyItem | undefined>();
  function getListItems(items: PropertyItem[], keyPrefix = '') {
    const handleItemMouseEnter = (data: PropertyItem) => {
      setHoveredNodeValue(data);
      debounceSetDetailVisible(true);
    };
    const handleItemMouseLeave = () => {
      setHoveredNodeValue(undefined);
      debounceSetDetailVisible.cancel();
      setDetailVisible(false);
    };
    const listItems = items.map((data: PropertyItem) => {
      const select =
        !isEmpty(currentValue) &&
        isEqualWith(currentValue, data, (a, b) => a?.value === b?.value) &&
        data._groupKey !== 'recently';
      const itemProp: ListItemProps = {
        disabled: data.disabled,
        ellipsis: true,
        key: ['item', keyPrefix, data.type, data.groupId, data.id].join('-'),
        className: classNames({ selected: select }),
        children: labelRender(data),
        onClick: (e) => handleItemClick(e, data),
        onMouseEnter: () => {
          handleItemMouseEnter(data);
        },
        onMouseLeave: () => {
          handleItemMouseLeave();
        },
      };
      return itemProp;
    });
    return listItems;
  }
  function subGroupRender(groupData: Dictionary<PropertyItem[]>) {
    const dom = keys(groupData).map((gkey) => {
      const { groupName, type } = groupData[gkey][0];
      const listItems = getListItems(groupData[gkey]);
      return (
        <ExpandableGroupOrSubGroup
          key={['exp', type, gkey].join('-')}
          groupKey={[type, gkey].join('-')}
          title={groupName}
          type="subgroup"
          items={listItems}
        />
      );
    });
    return dom as React.ReactNode;
  }
  const renderItems = () => {
    if (propertyItems?.length === 0) {
      return <Page type="noData" size="small" />;
    }
    const recentlyNodes = recentlyPropertyItems?.length > 0 && (
      <React.Fragment key="recentlyNodes">
        <ExpandableGroupOrSubGroup
          groupKey="recently"
          key="exp-group-recently"
          title={localeText.recent}
          type="group"
          items={getListItems(recentlyPropertyItems, 'recently')}
        />
        <List.Divider key="divider-group-recently" />
      </React.Fragment>
    );

    const groupFn = (item: PropertyItem, existIsSystem: boolean) => {
      if (existIsSystem) {
        if (item.groupId === 'tag') {
          return 'tag';
        }
        if (item.groupId === 'virtual') {
          return 'virtual';
        }
        return item.isSystem;
      }
      return item.groupId;
    };

    const groupDataNodes = keys(groupDatasource).map((key, index) => {
      const groupData = groupDatasource[key];
      const existIsSystem = has(groupData, '[0].isSystem');

      let subGroupDic;
      if (key === 'event' && 'associatedKey' in groupData[0] && groupData.length > 1) {
        subGroupDic = groupBy(
          groupData
            .filter((ele) => !ele.associatedKey)
            .map((ele) => [ele])
            ?.reduce((acc, cur) => {
              cur.push(
                ...groupData
                  .filter((e) => {
                    if (e.associatedKey === cur[0].id) {
                      if (existIsSystem) {
                        e.isSystem = cur[0].isSystem;
                      }
                      return true;
                    }
                    return false;
                  })
                  .map((item) => {
                    const { groupId, groupName } = [...cur].shift() || {};
                    return { ...item, groupId, groupName };
                  })
              );
              acc.push(...cur);
              return acc;
            }, []),
          (item) => groupFn(item, existIsSystem)
        );
      } else {
        subGroupDic = groupBy(groupData, (item) => groupFn(item, existIsSystem));
      }

      const { typeName } = groupData[0];
      // 此处的处理是 如果2级分组只有一组 提升为一级分组；如果没有这个需求删除该if分支 ；
      if (keys(subGroupDic).length === 1) {
        const items = getListItems(subGroupDic[keys(subGroupDic)[0]]);
        return (
          <React.Fragment key={`groupDataNodes-${index}`}>
            {index > 0 && <List.Divider key={`divider-group-${key}-${index}`} />}
            <ExpandableGroupOrSubGroup
              key={`exp-group-${key}`}
              groupKey={`${key}`}
              title={typeName}
              type="group"
              items={items}
            />
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={`groupDataNodes-${index}`}>
          {index > 0 && <List.Divider key={`divider-group-${key}-${index}`} />}
          <List.ItemGroup key={`group-${key}`} title={typeName} expandable={false}>
            {subGroupRender(subGroupDic)}
          </List.ItemGroup>
        </React.Fragment>
      );
    });
    const childrens = [recentlyNodes, groupDataNodes];
    return childrens as React.ReactNode;
  };
  const renderDetail = () =>
    hoverdNodeValue && <PropertyCard nodeData={hoverdNodeValue} fetchData={promisify(fetchDetailData)} />;
  return (
    <>
      <BasePicker
        {...rest}
        className={classNames(prefixCls, className)}
        renderItems={renderItems}
        detailVisible={detailVisible && !!hoverdNodeValue}
        renderDetail={renderDetail}
        loading={loading}
        searchBar={{
          placeholder: searchBar?.placeholder || localeText.searchPlaceholder,
          onSearch: handleSearch,
        }}
        tabNav={{
          items: navRef.current,
          onChange: onTabNavChange,
        }}
      />
    </>
  );
};

export default PropertyPicker;
