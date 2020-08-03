import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { WrappedFieldProps } from 'redux-form';
import { OpportunitySelect } from 'shared/view/complex-components';
import { IOpportunitySelectProps } from 'shared/view/complex-components/OpportunitySelect/OpportunitySelect';
import { Error } from 'shared/view/elements';
import { OptionTypeBase } from 'react-select';

import './OpportunitySelectField.scss';

interface IOwnProps<T> extends Omit<IOpportunitySelectProps<T>, 'onSelect'> {
  orgId: string;
  onSelect?(option: T): Promise<any> | void;
}

const b = block('opportunity-select-field');

type TProps<T> = IOwnProps<T>;

class OpportunitySelectField extends React.PureComponent<TProps<string> & WrappedFieldProps> {
  public render() {
    const {
      input,
      meta: { error, submitFailed },
    } = this.props;
    const hasError = submitFailed && !!error;
    const modificators = {
      'with-error': hasError
    };

    return (
      <div className={b(modificators)}>
        <OpportunitySelect
          error={hasError}
          orgId={this.props.orgId}
          selectedValue={input.value}
          onChange={this.handleChange}
        />
        {hasError && <Error>{error}</Error>}
      </div>
    );
  }

  @bind
  private async handleChange(option: OptionTypeBase) {
    const { onSelect, input } = this.props;

    if (onSelect) {
      const res = await onSelect(option.value);
      input.onChange(res);
      return res;
    }

    input.onChange(option.value);
  }
}

export { IOwnProps as IOpportunitySelectFieldProps };
export default OpportunitySelectField;
