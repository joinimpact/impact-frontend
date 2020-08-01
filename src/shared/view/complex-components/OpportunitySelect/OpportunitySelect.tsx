import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import AsyncSelect from 'react-select/async';
import { apiConnect, IApiProps } from 'services/api/apiConnect';
import { SelectDropdownIndicator, SelectInput } from 'shared/view/elements';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { OptionsType, OptionTypeBase, SingleValueProps } from 'react-select';
import { Props } from 'react-select/src/Async';

import './OpportunitySelect.scss';

const b = block('opportunity-select');

interface IOwnProps<T> extends Omit<Props<OptionTypeBase>, 'loadOptions'> {
  orgId: string;
}

interface IState {
  defaultOptions: OptionsType<OptionTypeBase>;
}

type TProps<T> = IOwnProps<T> & IApiProps;

class OpportunitySelect extends React.PureComponent<TProps<string>, IState> {
  public state: IState = {
    defaultOptions: [],
  };

  public componentDidMount() {
    this.handleLoadOptions('', (options: OptionsType<OptionTypeBase>) =>
      this.setState({ defaultOptions: options })
    ).catch(error => console.error(error));
  }

  public render () {
    const { error, ...restSelectProps } = this.props;
    return (
      <div className={b()}>
        <AsyncSelect
          {...restSelectProps}
          cacheOptions
          className={b('select', { error })}
          classNamePrefix={b()}
          loadOptions={this.handleLoadOptions}
          defaultOptions={this.state.defaultOptions}
          styles={{
            control: () => ({}),
            container: () => ({}),
            singleValue: () => ({}),
            valueContainer: () => ({}),
            placeholder: () => ({}),
            input: () => ({ display: 'flex', flex: 1 }),
          }}
          components={{
            Input: SelectInput,
            DropdownIndicator: SelectDropdownIndicator,
            SingleValue: this.renderSingleValue,
            IndicatorSeparator: null,
          }}
        />
      </div>
    );
  }

  @bind
  private renderSingleValue(props: SingleValueProps<OptionTypeBase>) {
    const { children, className, cx, getStyles, isDisabled, innerProps } = props;
    return (
      <div
        style={getStyles('singleValue', props)}
        className={(cx as any)(
          {
            'single-value': true,
            'single-value--is-disabled': isDisabled,
          },
          className
        )}
        {...innerProps}
      >
        <div className={b('current-value')}>
          <div className={b('current-value-dot')}/>
          <div className={b('current-value-content')}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  @bind
  private async handleLoadOptions(value: string, callback: (options: OptionsType<OptionTypeBase>) => void) {
    const { orgId } = this.props;
    const res: IOpportunityResponse[] = await this.props.api.npo.loadOpportunities(orgId, {
      limit: 10,
      page: 0,
      query: value > '' ? value : undefined,
    });
    const options: OptionsType<OptionTypeBase> = res.map((opportunity: IOpportunityResponse) => {
      return { value: opportunity.id, label: opportunity.title };
    });
    callback(options);
  }
}

const withApi = apiConnect<IOwnProps<string>>(OpportunitySelect);
export { IOwnProps as IOpportunitySelectProps };
export default withApi;
