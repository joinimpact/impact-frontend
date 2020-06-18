import * as React from 'react';
import { block } from 'bem-cn';

import { Icon } from '..';

import './Preloader.scss';

interface IProps {
  isShow: boolean;
  type?: 'button' | 'default';
  size?: number;
  position?: 'absolute' | 'relative' | 'fixed';
  className?: string;
  children?: React.ReactNode;
}

const b = block('preloader');

const preloaderImg = {
  button: require('./img/button-loader-inline.svg'),
  default: require('./img/loader-inline.svg'),
};

/* tslint:disable:function-name */
function Preloader({ size = 14, type = 'default', isShow, children, position = 'absolute', className = '' }: IProps) {
  if (!isShow) {
    return children || null;
  }

  const image = preloaderImg[type];
  return (
    <div className={b({ position }).mix(className)}>
      <Icon src={image} style={{ width: `${size}rem`, height: `${size}rem`, }} />
    </div>
  );
}

export { IProps };
export default React.memo(Preloader as React.FunctionComponent<IProps>);
