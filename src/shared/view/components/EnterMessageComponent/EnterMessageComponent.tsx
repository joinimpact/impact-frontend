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
}

const b = block('enter-message-component');

type TProps = IOwnProps;

class EnterMessageComponent extends React.PureComponent<TProps, IState> {
  public state: IState = {
    value: null,
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
            value={value}
            minHeight={'0'}
          />
        </div>
        <div className={b('right')}>
          <div className={b('send-btn')} tabIndex={2}>
            <i className="zi zi-send"/>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleEnterMessage(value: string | null) {
    console.log('[handleEnterMessage]', value);
    this.setState({ value }, () => {
      this.props.onSend(value);
    });
  }
}

export default EnterMessageComponent;
