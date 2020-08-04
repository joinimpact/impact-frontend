import React from 'react';
import ReactDOM from 'react-dom';
import block from 'bem-cn';
import { bind } from 'decko';
import OutsideClickHandler from 'react-outside-click-handler';
import { Manager, Reference, Popper } from 'react-popper';
import * as PopperJS from '@popperjs/core';

import './Menu.scss';

export interface IMenuContentProps {
  close(): void;
}

interface IOwnProps {
  btn: React.ReactNode;
  isOpen?: boolean;
  strategy?: PopperJS.PositioningStrategy;
  placement?: PopperJS.Placement;
  className?: string;
  dontCloseOnClick?: boolean;
  children(props: IMenuContentProps): React.ReactNode;
  onBtnClicked?(): void;
  onOutsideClicked?(): void;
}

interface IState {
  isOpen: boolean;
}

const b = block('menu');

type TProps = IOwnProps;

class Menu extends React.PureComponent<TProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  public  componentDidMount() {
    if (this.props.onBtnClicked && !this.props.onOutsideClicked) {
      throw new Error('onOutsideClicked prop must be defined if you using controlling component');
    }
  }

  public render() {
    const { btn, strategy, placement = 'bottom-start', className, isOpen } = this.props;
    return (
      <Manager>
        <div className={b.mix(className)}>
          <Reference>
            {({ ref }) => (
              <div className={b('button')} onClick={this.handleMenuBtnClicked} ref={ref}>
                {btn}
              </div>
            )}
          </Reference>
          {ReactDOM.createPortal(
            <Popper placement={placement} strategy={strategy}>
              {({ placement: popperPlacement, ref, style }) => {

                if (isOpen || this.state.isOpen) {
                  return (
                    <OutsideClickHandler onOutsideClick={this.handleOutsideMenuClicked}>
                      <div
                        ref={ref}
                        style={style}
                        data-placement={popperPlacement}
                        className={b('container')}
                        onClick={this.handleContentClick}
                      >
                        {this.props.children({
                          close: this.handleClose,
                        })}
                      </div>
                    </OutsideClickHandler>
                  );
                }

                return null;
              }}
            </Popper>,
            document.body,
          )}
        </div>
      </Manager>
    );
  }

  @bind
  private handleClose() {
    this.setState({ isOpen: false });
  }

  @bind
  private handleOutsideMenuClicked() {
    if (this.props.onBtnClicked) {
      this.props.onOutsideClicked!();
    } else {
      this.setState({ isOpen: false });
    }
  }

  @bind
  private handleMenuBtnClicked(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onBtnClicked) {
      this.props.onBtnClicked();
    } else {
      this.setState({ isOpen: true });
    }
  }

  @bind
  private handleContentClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!this.props.onBtnClicked && !this.props.dontCloseOnClick) {
      this.setState({ isOpen: false });
    }
  }
}

export default Menu;
