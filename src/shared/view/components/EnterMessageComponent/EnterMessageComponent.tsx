import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { MarkdownEditor } from 'shared/view/components';

import './EnterMessageComponent.scss';

interface IOwnProps {
  onSend(value: string | null): void;
}

interface IState {
  value: string | null;
  canSend: boolean;
}

const b = block('enter-message-component');

type TProps = IOwnProps;

class EnterMessageComponent extends React.PureComponent<TProps, IState> {
  public state: IState = {
    value: null,
    canSend: false,
  };

  public render() {
    const { value } = this.state;
    return (
      <div className={b()}>
        <div className={b('left')}>
          <MarkdownEditor
            noToolbar
            changeOnEnter
            onEnter={this.handleEnterMessage}
            onChange={this.handleChangeMessage}
            value={value}
            minHeight={'0'}
          />
        </div>
        <div className={b('right', { visible: this.state.canSend })}>
          <div className={b('send-btn')} tabIndex={2} onClick={this.handleSendMessage}>
            <i className="zi zi-send"/>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleEnterMessage(value: string | null) {
    this.setState({ value }, () => {
      this.props.onSend(value);
    });
  }

  @bind
  private handleSendMessage() {
    this.props.onSend(this.state.value);
  }

  @bind
  private handleChangeMessage(value: string | null) {
    if (this.state.canSend && !value) {
      this.setState({ canSend: false });
    } else if (!this.state.canSend && value! > '') {
      this.setState({ canSend: true });
    }
  }
}

export default EnterMessageComponent;
