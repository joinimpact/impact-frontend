import React from 'react';
import block from 'bem-cn';
import * as NS from '../../../namespace';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './NotifyTypeMessage.scss';

interface IOwnProps {
  icon: NS.TMessageType;
  text: string;
}

const b = block('notify-type-message');

type TProps = IOwnProps & ITranslateProps;

class NotifyTypeMessage extends React.PureComponent<TProps> {
  public render() {
    const { icon, text } = this.props;
    return (
      <div className={b()}>
        <div className={b('icon', { [icon]: true})}>
          {this.renderIcon()}
        </div>
        <div className={b('content')}>
          <div className={b('content-header')}>
            {this.renderHeader()}
          </div>
          <div className={b('content-body')}>
            {text}
          </div>
        </div>
      </div>
    );
  }

  @bind
  private renderHeader() {
    const { translate: t } = this.props;
    switch (this.props.icon) {
      case 'error':
        return t('NOTIFY-TYPE-MESSAGE:HEADER:ERROR');
      case 'warn':
        return t('NOTIFY-TYPE-MESSAGE:HEADER:WARN');
      case 'info':
        return t('NOTIFY-TYPE-MESSAGE:HEADER:INFO');
    }

    return t('NOTIFY-TYPE-MESSAGE:HEADER:MESSAGE');
  }

  @bind
  private renderIcon() {
    switch (this.props.icon) {
      case 'error':
        return <i className="zi zi-exclamation-solid"/>;
      case 'warn':
        return <i className="zi zi-bolt"/>;
      case 'info':
        return <i className="zi zi-question"/>
    }

    return null;
  }
}

export default i18nConnect<IOwnProps>(NotifyTypeMessage);
