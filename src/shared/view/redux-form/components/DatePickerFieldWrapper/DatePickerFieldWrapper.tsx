import React from 'react';
import { DatePickerField, IInputBaseFieldProps } from 'shared/view/redux-form/index';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { BaseFieldProps } from 'redux-form';
import moment from 'services/moment';
import EditableLabeledDatePickerField
  from 'shared/view/redux-form/EditableLabeledDatePickerField/EditableLabeledDatePickerField';

type TDatePickerFieldProps = BaseFieldProps & IInputBaseFieldProps;

interface IOwnProps extends TDatePickerFieldProps {
  asEditableLabel?: boolean;
}

type TProps = IOwnProps;

const parseDatePicker = (value: Date | null) => {
  // TODO: Поменять на MM-DD-YYYY
  // const res = value == null ? null : moment(value).utc().format('MM-DD-YYYY');
  const res = value == null ? null : moment(value).utc().toDate();
  return res;
};

class DatePickerFieldWrapper extends React.PureComponent<TProps> {
  public render() {
    const { asEditableLabel } = this.props;
    return (
      <InputBaseFieldWrapper
        {...this.props}
        component={asEditableLabel ? EditableLabeledDatePickerField : DatePickerField}
        parse={parseDatePicker}
      />
    );
  }
}

export default DatePickerFieldWrapper;
