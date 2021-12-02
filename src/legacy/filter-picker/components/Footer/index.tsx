import React, { useContext } from 'react';
import Button from '../../../../button'; // new
import { FilterPickerContext } from '../../FilterPicker';
import './index.less';

interface FilterFooterProps {
  onSubmit: () => void;
  onCancel: () => void;
  comfirmStatus?: boolean;
}

function FilterFooter(props: FilterFooterProps) {
  const { onCancel, onSubmit, comfirmStatus = false } = props;
  const { textObject } = useContext(FilterPickerContext);
  return (
    <div className="filter-contidion-footer">
      <Button type="secondary" onClick={onCancel} size="small">
        {textObject.cancel}
      </Button>
      <div style={{ width: '12px' }} />
      <Button type="primary" onClick={onSubmit} size="small" disabled={comfirmStatus}>
        {textObject.submit}
      </Button>
    </div>
  );
}
export default FilterFooter;
