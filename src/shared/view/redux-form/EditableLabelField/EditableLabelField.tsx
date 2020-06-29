import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IInputBaseFieldProps } from 'shared/view/redux-form';
import { InputBaseField } from 'shared/view/redux-form/index';
import { WrappedFieldProps } from 'redux-form';

import './EditableLabelField.scss';

interface IState {
  isEditing: boolean;
}

const b = block('editable-label-field');

type TProps = IInputBaseFieldProps & WrappedFieldProps;

class EditableLabelField extends React.PureComponent<TProps, IState> {
  public state: IState = {
    isEditing: false,
  };

  public render() {
    const { isEditing } = this.state;
    const { value } = this.props.input;
    const { placeholder } = this.props;

    return (
      <div className={b()}>
        {isEditing && (
          <InputBaseField
            {...this.props}
          />
        )}
        {(!isEditing && value) && (
          <div className={b('field')}>
            <div className={b('placeholder')}>
              {placeholder} :
            </div>
            <div className={b('value')}>
              {value}
            </div>
            <div className={b('button')} onClick={this.handleChangeEditMode}>
              <i className="zi zi-edit-pencil"/>
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

export default EditableLabelField;
