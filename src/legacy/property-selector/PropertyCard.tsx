import React from 'react';
import {
  NumberTypeOutlined,
  ListTypeOutlined,
  StringTypeOutlined,
  DateTypeOutlined,
  BooleanTypeOutlined,
} from '@gio-design/icons';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { PropertyTypes, PropertyCardProps } from './interfaces';
import useAsync from '../hooks/useAsync';
import defaultLocale from './locales/zh-CN';
import Card from '../../legacy/card';
import Loading from '../../loading'; // new
import Tag from '../../tag'; // new

function PropertyCard(props: PropertyCardProps) {
  const locale = useLocale('PropertyPicker');

  const { stringText, intText, doubleText, dateText, booleanText, listText } = { ...defaultLocale, ...locale } as any;

  const ValueTypeMap: { [key: string]: [string, React.ReactElement] } = {
    string: [stringText, <StringTypeOutlined size="14px" />],
    int: [intText, <NumberTypeOutlined size="14px" />],
    double: [doubleText, <NumberTypeOutlined size="14px" />],
    date: [dateText, <DateTypeOutlined size="14px" />],
    boolean: [booleanText, <BooleanTypeOutlined size="14px" />],
    list: [listText, <ListTypeOutlined size="14px" />],
  };

  const { fetchData, nodeData } = props;
  const { loading, value: data } = useAsync(async () => {
    const res = await fetchData?.(nodeData);
    return res;
  }, [nodeData]);
  const prefixCls = usePrefixCls('property-picker-legacy');
  const propCardPrefixCls = `${prefixCls}-card`;
  const valueType = ValueTypeMap[data?.valueType ? data?.valueType?.toLowerCase() : ''] || null;
  return (
    <Card className={propCardPrefixCls}>
      <Loading size="small" title={false} loading={loading}>
        <Card.Meta style={{ minHeight: '40px' }}>
          <Card.Meta>
            <span className={`${propCardPrefixCls}-title`}>{data?.name}</span>
            {data?.type && (
              <Tag size="small" status="draft">
                {PropertyTypes[data?.subType ?? ''] || ''}
              </Tag>
            )}
            <div className={`${propCardPrefixCls}-key`}>{data?.key ?? data?.id}</div>
          </Card.Meta>
          {data?.description && <Card.Meta>{data?.description}</Card.Meta>}
          {data?.valueType && valueType && (
            <Card.Meta data-testid="value_type_meta">
              <div className={`${propCardPrefixCls}__divide`} />
              <div className={`${propCardPrefixCls}__footer`}>
                <span className={`${propCardPrefixCls}__footer__icon`}>{valueType[1]}</span>
                {valueType[0]}
              </div>
            </Card.Meta>
          )}
        </Card.Meta>
      </Loading>
    </Card>
  );
}
export default PropertyCard;
