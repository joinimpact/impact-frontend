import React from 'react';
import block from 'bem-cn';
import { IStandardMessage } from 'shared/types/responses/chat';

import './StandardMessage.scss';

interface IOwnProps {
  message: IStandardMessage;
}

const b = block('standard-message');

type TProps = IOwnProps;

class StandardMessage extends React.PureComponent<TProps> {
  public render() {
    const { message } = this.props;
    return (
      <div className={b()}>
        {message.text}
      </div>
    );
  }
}

export default StandardMessage;
