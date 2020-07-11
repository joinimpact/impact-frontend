import * as React from 'react';
import { block } from 'bem-cn';

import './Preloader.scss';

interface IProps {
  isShow?: boolean;
  type?: 'button' | 'default';
  size?: number;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  position?: React.CSSProperties['position'];
  className?: string;
  children?: React.ReactNode;
}

const b = block('preloader');

const preloaderImg = {
  button: require('shared/view/images/button-loader.svg'),
  default: require('shared/view/images/loader.svg'),
};

/* tslint:disable:function-name */
function Preloader({
  size,
  type = 'default',
  isShow = true,
  children,
  position = 'absolute',
  className = '',
  width,
  height,
}: IProps) {
  if (!isShow) {
    return children || null;
  }

  const image = preloaderImg[type];

  return (
    <div className={b({ position }).mix(className)}>
      <div
        className={b('spinner')}
        style={{
          width: width ? width : (size ? `${size}rem` : '100%'),
          height: height ? height : (size ? `${size}rem` : '100%'),
          backgroundImage: `url(${image})`
        }}
      />
    </div>
  );
}

export { IProps };
export default React.memo(Preloader as React.FunctionComponent<IProps>);
