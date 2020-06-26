import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { WrappedFieldProps } from 'redux-form';
import { Error, Icon, IInputBaseProps, InputBase } from 'shared/view/elements';
import { DatePicker } from 'shared/view/components';
import moment, { clientLang } from 'services/moment';

import './DatePickerField.scss';

interface IOwnProps extends IInputBaseProps {
  validateOnChange?: boolean;
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
      ...restTextInputProps
    } = this.props;

    const hasError = touched && (validateOnChange || submitFailed) && Boolean(error);
    const localeData = moment.localeData(clientLang);

    return (
      <div className={b()}>
        <div className={b('input-container', { 'with-error': hasError }).toString()}>
          <DatePicker
            className={b('calendar').toString()}
            readOnly={restTextInputProps.readOnly}
            useWeekdaysShort
            showMonthDropdown
            showYearDropdown
            disabledKeyboardNavigation
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            placeholderText={placeholder}
            selected={input.value}
            name={name}
            // Warn! dateFormat in date-fns format! It differs from moment.js format
            dateFormat={localeData.longDateFormat('L').replace('DD', 'dd').replace('YYYY', 'y')}
            // dateFormat={'dd-MM-y'}
            // locale={clientLang}
            disabled={restTextInputProps.disabled}
            customInput={
              <InputBase
                {...input}
                {...restTextInputProps}
                error={hasError}
              />
            }
            onChange={this.handleCalendarChange}
          />
          <div className={b('icon')}>
            <Icon src={require('shared/view/images/calendar-inline.svg')}/>
          </div>
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

export default DatePickerField;
