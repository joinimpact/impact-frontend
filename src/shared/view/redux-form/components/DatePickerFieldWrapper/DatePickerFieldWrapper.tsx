import React from 'react';
import { DatePickerField } from 'shared/view/redux-form/index';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { BaseFieldProps } from 'redux-form';
import moment from 'services/moment';
import EditableLabeledDatePickerField
  from 'shared/view/redux-form/EditableLabeledDatePickerField/EditableLabeledDatePickerField';
import { IDatePickerFieldProps } from 'shared/view/redux-form/DatePickerField/DatePickerField';
import { bind } from 'decko';

type TDatePickerFieldProps = BaseFieldProps & IDatePickerFieldProps;

interface IOwnProps extends TDatePickerFieldProps {
  asEditableLabel?: boolean;
}

type TProps = IOwnProps;

const parseDatePicker = (value: Date | null) => {
  return value ? moment(value).utc().format() : value; // When getting form values using this format (for API)
};

class DatePickerFieldWrapper extends React.PureComponent<TProps> {
  public render() {
    const { asEditableLabel } = this.props;
    return (
      <InputBaseFieldWrapper
        {...this.props}
        component={asEditableLabel ? EditableLabeledDatePickerField : DatePickerField}
        parse={parseDatePicker}
        format={this.formatReduxValue}
      />
    );
  }

  @bind
  private formatReduxValue(value: Date | string | null) {
    // When getting defined value in input, trying to parse
    if (!value || value === '') {
      return null;
    }
    const res = moment(value);
    return res.isValid() ? res.toDate() : null;
  }
}

export default DatePickerFieldWrapper;
