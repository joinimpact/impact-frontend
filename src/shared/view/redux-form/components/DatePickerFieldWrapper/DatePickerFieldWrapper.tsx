import React from 'react';
import { DatePickerField, IInputBaseFieldProps } from 'shared/view/redux-form/index';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { BaseFieldProps } from 'redux-form';
import moment from 'services/moment';

type TProps = BaseFieldProps & IInputBaseFieldProps;

const parseDatePicker = (value: Date | null) => {
  return value == null ? null : moment(value).utc().format();
};

class DatePickerFieldWrapper extends React.PureComponent<TProps> {
  public render() {
    return (
      <InputBaseFieldWrapper
        {...this.props}
        component={DatePickerField}
        parse={parseDatePicker}
      />
    );
  }
}

export default DatePickerFieldWrapper;
