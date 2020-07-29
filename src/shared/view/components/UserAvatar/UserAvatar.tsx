import React from 'react';
import block from 'bem-cn';

import './UserAvatar.scss';

interface IOwnProps {
  className?: string;
  firstName: string | null;
  lastName: string | null;
}

const b = block('user-avatar');

type TProps = IOwnProps;

class UserAvatar extends React.PureComponent<TProps> {
  public render() {
    return (
      <div className={b.mix(this.props.className)}>
        {this.capitalLetters}
      </div>
    );
  }

  private get capitalLetters() {
    const { firstName, lastName } = this.props;
    const res = [];
    if (firstName) {
      res.push(firstName.split('')[0].toUpperCase());
    }

    if (lastName) {
      res.push(lastName.split('')[0].toUpperCase());
    }

    return res.join('');
  }
}

export default UserAvatar;
