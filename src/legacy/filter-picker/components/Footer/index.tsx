import React from 'react';
import Button from '../../../../button'; // new
import './index.less';

interface FilterFooterProps {
  onSubmit: () => void;
  onCancel: () => void;
  comfirmStatus?: boolean;
}

function FilterFooter(props: FilterFooterProps) {
  const { onCancel, onSubmit, comfirmStatus = false } = props;
  return (
    <div className="filter-contidion-footer">
      <Button type="secondary" onClick={onCancel} size="small">
        取消
      </Button>
      <div style={{ width: '12px' }} />
      <Button type="primary" onClick={onSubmit} size="small" disabled={comfirmStatus}>
        确认
      </Button>
    </div>
  );
}
export default FilterFooter;
