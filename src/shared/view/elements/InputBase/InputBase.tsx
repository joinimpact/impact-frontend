import * as React from 'react';
import block from 'bem-cn';

import './InputBase.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  hasIcon?: boolean;
  search?: boolean;
  unit?: string;
  extent?: 'large' | 'middle' | 'small';
  refCallback?: any;
  fieldMixin?: string;
}

const b = block('input-base');

class InputBase extends React.PureComponent<IProps> {
  public render() {
    const {
      id,
      placeholder,
      value,
      type,
      disabled,
      onChange,
      readOnly,
      maxLength,
      error,
      autoFocus,
      onFocus,
      onBlur,
      onKeyDown,
      onClick,
      onDragStart,
      onDrop,
      hasIcon,
      search,
      unit,
      size,
      tabIndex,
      refCallback,
      fieldMixin,
      extent = '',
    } = this.props;
    const modificators = {
      extent,
      error: !!error,
      icon: !!hasIcon,
      search: !!search,
      'with-unit': !!unit,
      disabled: !!disabled,
    };

    return (
      <input
        className={b('field', modificators).mix(fieldMixin || '').toString()}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        autoComplete="off"
        type={type}
        maxLength={maxLength}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onDragStart={onDragStart}
        onDrop={onDrop}
        tabIndex={tabIndex}
        ref={refCallback}
        size={size || 30}
        autoFocus={autoFocus}
      />
    );
  }
}

export default InputBase;
export { IProps as IInputBaseProps };
