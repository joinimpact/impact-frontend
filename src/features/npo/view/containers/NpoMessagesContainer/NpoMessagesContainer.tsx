import React from 'react';
import block from 'bem-cn';

import './NpoMessagesContainer.scss';

const b = block('npo-messages-container');

class NpoMessagesContainer extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>CHAT UNDER CONSTRUCTION</div>
    );
  }
}

export default NpoMessagesContainer;
