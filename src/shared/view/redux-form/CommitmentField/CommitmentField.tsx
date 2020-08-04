import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { WrappedFieldProps } from 'redux-form';
import { InputBase, Menu } from 'shared/view/elements';
import { MultiSlider } from 'shared/view/components/index';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './CommitmentField.scss';

interface IOwnProps {
  from: number;
  to: number;
  step: number;
  tickerStep: number;
  currentValue: number[] | null;
  inputValue: string;
  onRangeChange(values: number[]): void;
}

interface IState {
  menuIsOpen: boolean;
  values: number[];
  changed: boolean;
}

const b = block('commitment-field');

type TProps = IOwnProps & ITranslateProps;

class CommitmentField extends React.PureComponent<TProps & WrappedFieldProps, IState> {
  public state: IState = {
    menuIsOpen: false,
    values: [],
    changed: false,
  };

  public render() {
    return (
      <Menu
        btn={this.renderContent()}
        placement="bottom-end"
        isOpen={this.state.menuIsOpen}
        onBtnClicked={this.handleMenuBtnClicked}
        onOutsideClicked={this.handleMenuOutsideClicked}
      >
        {() => this.renderRangeSelectorContent()}
      </Menu>
    );
  }

  @bind
  private renderContent() {
    const { inputValue } = this.props;
    return (
      <div className={b()}>
        <div className={b('field')}>
          <InputBase readOnly value={inputValue}/>
        </div>
        <div className={b('chevron', { 'is-open': this.state.menuIsOpen })}>
          <i className="zi zi-cheveron-down"/>
        </div>
      </div>
    );
  }

  @bind
  private renderRangeSelectorContent() {
    const { from, to, tickerStep, step, inputValue, currentValue, translate: t } = this.props;
    return (
      <div className={b('content')}>
        <MultiSlider
          from={from}
          to={to}
          tickerStep={tickerStep}
          step={step}
          value={currentValue}
          inputValue={inputValue}
          onUpdate={this.handleChange}
          onChange={this.handleChange}
        />
        <div className={b('hint')}>
          {t('COMMITMENT-FIELD:STATIC:HINT')}
        </div>
      </div>
    );
  }

  @bind
  private handleChange(values: number[]) {
    const { onRangeChange } = this.props;
    const [from, to] = values;
    const [cfrom, cto] = this.state.values;
    if (from !== cfrom || to !== cto) {
      this.setState({ changed: true }, () => {
        onRangeChange(values);
        // this.props.input.onChange(values);
      });
    }
  }

  @bind
  private handleMenuBtnClicked() {
    this.setState({ menuIsOpen: true });
  }

  @bind
  private handleMenuOutsideClicked() {
    const { changed } = this.state;
    this.setState({ menuIsOpen: false, changed: false }, () => {
      if (changed) {
        this.props.input.onChange(this.props.currentValue);
      }
    });
  }
}

export { IOwnProps as ICommitmentFieldProps };
export default i18nConnect<IOwnProps & WrappedFieldProps>(CommitmentField);
