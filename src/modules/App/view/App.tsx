import React from 'react';
import block from 'bem-cn';

// Global styles import
import 'shared/view/styles/animation.scss';
import 'shared/view/styles/base.scss';

import './App.scss';

const b = block('root');

class App extends React.Component {
  public render() {
    return (
      <div className={b()}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
