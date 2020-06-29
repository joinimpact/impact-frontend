import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { WrappedFieldProps } from 'redux-form';
import {
  default as DatePickerField,
  IDatePickerFieldProps,
} from 'shared/view/redux-form/DatePickerField/DatePickerField';

import './EditableLabeledDatePickerField.scss';

interface IState {
  isEditing: boolean;
}

const b = block('editable-labeled-date-picker');

type TProps = IDatePickerFieldProps & WrappedFieldProps;

class EditableLabeledDatePickerField extends React.PureComponent<TProps, IState> {
  public state: IState = {
    isEditing: false,
  };

  public render() {
    const { isEditing } = this.state;
    const { value } = this.props.input;
    const { placeholder } = this.props;

    return (
      <div className={b()}>
        {isEditing && <DatePickerField {...this.props} />}
        {!isEditing && value && (
          <div className={b('field')}>
            <div className={b('placeholder')}>{placeholder} :</div>
            <div className={b('value')}>{value}</div>
            <div className={b('button')} onClick={this.handleChangeEditMode}>
              <i className="zi zi-edit-pencil" />
            </div>
          </div>
        )}
      </div>
    );
  }

  @bind
  private handleChangeEditMode() {
    this.setState({ isEditing: !this.state.isEditing });
  }
}

export default EditableLabeledDatePickerField;
