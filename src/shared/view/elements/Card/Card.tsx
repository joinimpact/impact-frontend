import React from 'react';
import block from 'bem-cn';

import './Card.scss';

interface IOwnProps {
  header?: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  showRequiredAsterisk?: boolean;
}

const b = block('card');

type TProps = IOwnProps;

class Card extends React.PureComponent<TProps> {
  public render() {
    const { header, footer, title, showRequiredAsterisk } = this.props;
    return (
      <div className={b()}>
        {showRequiredAsterisk && (
          <div className={b('top-right-corner')}>*</div>
        )}
        {header && (
          <div className={b('header')}>{header}</div>
        )}
        {title && (
          <div className={b('title')}>{title}</div>
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
