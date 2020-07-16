import React from 'react';
import block from 'bem-cn';

const b = block('view-user-opportunities-container');

class ViewUserOpportunitiesContainer extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>
        View USER OPPORTUNITIES
      </div>
    );
  }
}

export default ViewUserOpportunitiesContainer;
