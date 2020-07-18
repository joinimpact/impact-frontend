import React from 'react';
import block from 'bem-cn';

import './NpoHomeViewContainer.scss';

const b = block('npo-home-view-container');

class NpoHomeViewContainer extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>
        NPO HOME VIEW CONTAINER
      </div>
    );
  }
}

export default NpoHomeViewContainer;
