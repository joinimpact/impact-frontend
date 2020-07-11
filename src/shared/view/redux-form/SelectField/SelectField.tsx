import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { WrappedFieldProps, Omit } from 'redux-form';

import { Select, ISelectProps, Error } from 'shared/view/elements';

import './SelectField.scss';

interface IOwnProps<T> {
  onSelect?(option: T): Promise<any> | void;
}

type IProps<T> = Omit<ISelectProps<T>, 'onSelect' | 'selectedValue'> & IOwnProps<T>;

const b = block('input-field');

class SelectField<T> extends React.PureComponent<IProps<T> & WrappedFieldProps> {
  public render() {
    const { input,
      meta: { error, submitFailed },
      ...restTextInputProps } = this.props;
    const hasError = submitFailed && !!error;
    return (
      <div className={b()}>
        <Select
          {...input}
          {...restTextInputProps}
          error={hasError}
          selectedValue={input.value}
          onSelect={this.handleOnSelect}
        />
        {hasError && <Error>{error}</Error>}
      </div>
    );
  }

  @bind
  private handleOnSelect(option: T) {
    const { onSelect, input } = this.props;

    if (onSelect) {
      return new Promise((resolve, reject) => {
        const promise = onSelect(option);
        if (promise) {
          promise.then(() => {
            input.onChange(option);
            resolve();
          }).catch(reject);
        } else {
          input.onChange(option);
        }
      });
    }

    input.onChange(option);
  }
}

export { IProps as ISelectFieldProps };
export default SelectField;
