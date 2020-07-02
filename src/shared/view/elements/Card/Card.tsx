import React from 'react';
import block from 'bem-cn';

import './Card.scss';

interface IOwnProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const b = block('card');

type TProps = IOwnProps;

class Card extends React.PureComponent<TProps> {
  public render() {
    const { header, footer } = this.props;
    return (
      <div className={b()}>
        {header && (
          <div className={b('header')}>{header}</div>
        )}
        <div className={b('content')}>
          {this.props.children}
        </div>
        {footer && (
          <div className={b('footer')}>{footer}</div>
        )}
      </div>
    );
  }
}

export default Card;
