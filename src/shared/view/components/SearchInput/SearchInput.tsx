import React from 'react';
import block from 'bem-cn';
import { IInputBaseProps, InputBase } from 'shared/view/elements';
import { bind } from 'decko';
import Timer = NodeJS.Timer;

import './SearchInput.scss';

interface IOwnProps extends IInputBaseProps {
  withSearchIcon?: boolean;
  onSearchRequested(value: string): void;
}

interface IState {
  currentFilterValue: string;
}

const b = block('search-input');

type TProps = IOwnProps;

class SearchInput extends React.PureComponent<TProps, IState> {
  public state: IState = {
    currentFilterValue: '',
  };

  private timer: Timer | null = null;

  public render() {
    const { withSearchIcon, onSearchRequested, ...restInputProps } = this.props;
    return (
      <div className={b({ 'with-search-icon': withSearchIcon })}>
        <InputBase
          {...restInputProps}
          size={30}
          onChange={this.handleChange}
        />
        {withSearchIcon && (
          <div className={b('search-icon')}>
            <i className="zi zi-search"/>
          </div>
        )}
      </div>
    );
  }

  @bind
  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.handleSearchTrigger(e.target.value);
  }

  @bind
  private handleSearchTrigger(value: string) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      if (value !== this.state.currentFilterValue) {
        this.setState({ currentFilterValue: value }, () => {
          this.props.onSearchRequested(this.state.currentFilterValue);
        });
      }
    }, 500);
  }
}

export default SearchInput;
