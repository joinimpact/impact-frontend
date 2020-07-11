import React from 'react';
import block from 'bem-cn';
import { Button } from 'shared/view/elements';

import './ErrorScreen.scss';

interface IOwnProps {
  title: string;
  message: string;
  buttonValue?: React.ReactNode;
  onButtonClick?(): void;
}

const b = block('error-screen');

type TProps = IOwnProps;

class ErrorScreen extends React.PureComponent<TProps> {
  public render() {
    const { title, message, buttonValue, onButtonClick } = this.props;
    return (
      <div className={b()}>
        <div className={b('content')}>
          <div className={b('title')}>{title}</div>
          <div className={b('message')}>{message}</div>
          {onButtonClick && (
            <div className={b('actions')}>
              <Button color="blue">
                {buttonValue!}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorScreen;
