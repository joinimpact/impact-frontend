import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { WrappedFieldProps } from 'redux-form';
import { Error, IInputBaseProps, InputBase } from 'shared/view/elements';
import { DatePicker } from 'shared/view/components';
import { fnsDefaultDateFormat, fnsDefaultDateTimeFormat } from 'shared/types/app';
// import moment, { clientLang } from 'services/moment';

import './DatePickerField.scss';

interface IOwnProps extends IInputBaseProps {
  validateOnChange?: boolean;
  noIcon?: boolean;
  withTime?: boolean;
  selectTimeOnly?: boolean;
}

const b = block('date-picker-field');

type TProps = IOwnProps;

class DatePickerField extends React.PureComponent<TProps & WrappedFieldProps> {
  public render() {
    const {
      input,
      name,
      meta: { error, submitFailed, touched },
      validateOnChange,
      placeholder,
      noIcon,
      withTime,
      selectTimeOnly,
      ...restTextInputProps
    } = this.props;

    const hasError = touched && (validateOnChange || submitFailed) && Boolean(error);
    // const localeData = moment.localeData(clientLang);

    return (
      <div className={b()}>
        <div className={b('input-container', { 'with-error': hasError }).toString()}>
          <DatePicker
            className={b('calendar').toString()}
            readOnly={restTextInputProps.readOnly}
            useWeekdaysShort
            showMonthDropdown
            showYearDropdown
            showTimeSelect={selectTimeOnly || withTime}
            showTimeSelectOnly={selectTimeOnly}
            disabledKeyboardNavigation
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            placeholderText={placeholder}
            selected={input.value} // Must to be Date format!
            name={name}
            // Warn! dateFormat in date-fns format! It differs from moment.js format
            // dateFormat={localeData.longDateFormat('L').replace('DD', 'dd').replace('YYYY', 'y')}
            // dateFormat={'dd-MM-y'}
            dateFormat={withTime ? fnsDefaultDateTimeFormat : fnsDefaultDateFormat}
            // locale={clientLang}
            disabled={restTextInputProps.disabled}
            customInput={
              <InputBase
                {...input}
                {...restTextInputProps}
                // size={30}
                error={hasError}
              />
            }
            onChange={this.handleCalendarChange}
          />
          {!noIcon && (
            <div className={b('icon')}>
              <i className="zi zi-calendar"/>
            </div>
          )}
        </div>
        {hasError && (
          <Error>{error}</Error>
        )}
      </div>
    );
  }

  @bind
  private handleCalendarChange(date: Date) {
    this.props.input.onChange(date);
  }
}

export { IOwnProps as IDatePickerFieldProps };
export default DatePickerField;
