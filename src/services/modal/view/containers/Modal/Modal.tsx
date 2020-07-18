import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import modalManager, { IModalManager } from '../../ModalManager';
import { CustomScrollbar } from 'shared/view/components/index';
import { selectors as uiSelectors } from 'services/ui';
import { IAppReduxState, ILayoutType } from 'shared/types/app';

import './Modal.scss';

type TIcon = 'information-outline';

interface IOwnProps {
  isOpen: boolean;
  icon?: TIcon;
  disablePadding?: boolean;
  disableCard?: boolean;
  title?: React.ReactNode;
  disableCloseButton?: boolean;
  closeTimeout?: number;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose(): void;
}

interface IStateProps {
  layoutType: ILayoutType;
}

interface IState {
  isOpen: boolean;
  closing: boolean;
  allowedToShow: boolean;
}

const b = block('modal');
const defaultTimeoutMS = 150;

type TProps = IOwnProps & IStateProps;

class Modal extends React.Component<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      layoutType: uiSelectors.selectLayoutType(state),
    };
  }
  public state: IState = {
    isOpen: false,
    closing: false,
    allowedToShow: true,
  };
  private manager: IModalManager | null = null;

  public componentDidMount() {
    const { isOpen } = this.props;
    this.manager = modalManager.registerModal(this.handleExternalStateChange);
    this.setState({ isOpen, closing: false }, () => {
      this.manager!.onChangeState(isOpen);
    });
  }

  public componentWillUnmount() {
    this.manager!.unregister();
  }

  public componentDidUpdate({isOpen: prevIsOpen, layoutType: prevLayoutType}: TProps) {
    const { isOpen, closeTimeout = defaultTimeoutMS, layoutType } = this.props;
    const { closing } = this.state;

    if (prevIsOpen !== isOpen) {
      this.manager!.onChangeState(isOpen);
    }

    if (!closing) {
      // Skip all closing states
      if (isOpen !== this.state.isOpen) {
        // State changed.. Let's see why
        if (!isOpen) {
          // Closing modal
          this.setState({ closing: true }, () => {
            setTimeout(() => {
              this.setState({ closing: false, isOpen: false });
            }, closeTimeout);
          });
        } else {
          // Showing modal
          this.setState({ isOpen: true });
        }
      }
    }

    if (prevLayoutType !== layoutType) {
      this.forceUpdate();
    }
  }

  public render() {
    const { disableCloseButton = false, title, layoutType, actions, icon, disablePadding, disableCard } = this.props;
    const { isOpen, closing, allowedToShow } = this.state;
    const withHeader = Boolean(title);

    if (!allowedToShow) {
      return null;
    }

    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        onRequestClose={this.handleClose}
        className={b()}
        shouldCloseOnEsc={!disableCloseButton}
        overlayClassName={b('overlay').toString()}
        parentSelector={this.parentSelector}
        style={{
          // overlay: {position: 'absolute' },
        }}
        // closeTimeoutMS={closeTimeout}
        ariaHideApp={false}
      >
        <Draggable handle={`.${b('header').toString()}`} bounds={`.${b()}`}>
          <div className={b('content', { closing, 'as-card': !(disableCard) }).toString()}>
            <div
              className={b('content-top', {
                'with-padding': !Boolean(disablePadding),
              })}>
              {icon && (
                <div className={b('content-top-left')}>
                  {this.renderIcon()}
                </div>
              )}
              <div className={b('content-top-right')}>
                {withHeader && this.renderHeader()}
                <div className={b('body', { 'no-header': !withHeader, 'with-padding': !Boolean(disablePadding) })}>
                  {layoutType === ILayoutType.mobile ? (
                    <CustomScrollbar>
                      {this.props.children}
                    </CustomScrollbar>
                  ) : (
                    <>
                      {this.props.children}
                    </>
                  )}
                </div>
              </div>
            </div>
            {actions && (
              <div className={b('content-actions')}>
                {actions}
              </div>
            )}
          </div>
        </Draggable>
      </ReactModal>
    );
  }

  @bind
  private parentSelector(): HTMLElement {
    return document.getElementById('root')!;
  }

  @bind
  private renderIcon() {
    const { icon } = this.props;
    return (
      <div className={b('icon')}>
        <i className={`zi zi-${icon}`}/>
      </div>
    );
  }

  @bind
  private renderHeader() {
    const { title, icon } = this.props;
    return (
      <div className={b('header', { 'with-padding': true, 'with-left-padding': !Boolean(icon) })}>
        <div className={b('header-caption')}>{title}</div>
      </div>
    );
  }

  @bind
  private handleClose() {
    const { closeTimeout = defaultTimeoutMS } = this.props;
    this.setState({ closing: true },
      () => setTimeout(
        () => this.props.onClose(), closeTimeout
      ));
  }

  @bind
  private handleExternalStateChange(isOpen: boolean) {
    this.setState({ allowedToShow: isOpen });
  }
}

const withRedux = connect<IStateProps, {}, IOwnProps>(
  Modal.mapStateToProps
)(Modal);
export default withRedux;
