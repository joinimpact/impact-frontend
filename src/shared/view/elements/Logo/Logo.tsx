import React from 'react';
import block from 'bem-cn';
import { Icon } from 'shared/view/elements';

import './Logo.scss';

interface IProps {
  className?: string;
  size?: number;
}

const b = block('logo');

const LogoIcon: React.FC<IProps> = ({ className, size }: IProps) => {
  const style: React.CSSProperties = {};
  if (size) {
    // style.width = `${size}px`;
    style.height = `${size}px`;
  }
  return (
    <div className={b()}>
      <Icon
        className={b('icon').mix(className)}
        src={require('shared/view/images/logo/impact-logo-inline.svg')}
        style={style}
      />
    </div>
  );
};

export default LogoIcon;
