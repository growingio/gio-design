import React from 'react';
import { ClockOutlined, ErrorFilled } from '@gio-design/icons';
import { format } from 'date-fns';
import { usePrefixCls } from '@gio-design/utils';
import Input from '../input';
import { IconButton } from '../button';
import Popover from '../popover';
import StaticTimePicker from '../static-time-picker/StaticTimePicker';
import { isValidTimeText } from './absoluteTime';

interface AbsoluteTimePickerProps {
  id: string;
  label: string;
  panelLabel: string;
  clearLabel: string;
  value: string;
  placeholder: string;
  invalid: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
}

function AbsoluteTimePicker({
  id,
  label,
  panelLabel,
  clearLabel,
  value,
  placeholder,
  invalid,
  describedBy,
  onChange,
}: AbsoluteTimePickerProps) {
  const [visible, setVisible] = React.useState(false);
  const inputCls = usePrefixCls('input');
  const timeText = value && isValidTimeText(value) ? value : placeholder;
  const [hour, minute, second] = timeText.split(':').map(Number);
  // This Date carries only wall-clock fields; the range applies its configured timezone.
  const panelValue = new Date(2000, 0, 1, hour, minute, second);

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div role="dialog" aria-label={`${label} - ${panelLabel}`}>
          <StaticTimePicker showSecond value={panelValue} onSelect={(date) => onChange(format(date, 'HH:mm:ss'))} />
        </div>
      }
    >
      <Input
        id={id}
        aria-label={label}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-haspopup="dialog"
        aria-expanded={visible}
        className={invalid ? `${inputCls}__error` : undefined}
        size="small"
        prefix={<ClockOutlined />}
        suffix={
          value ? (
            <IconButton
              type="text"
              size="small"
              aria-label={clearLabel}
              title={clearLabel}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.stopPropagation();
                onChange('');
              }}
            >
              <ErrorFilled />
            </IconButton>
          ) : undefined
        }
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setVisible(true);
          } else if (event.key === 'Escape') {
            event.stopPropagation();
            setVisible(false);
          }
        }}
      />
    </Popover>
  );
}

export default AbsoluteTimePicker;
