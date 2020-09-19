import * as React from 'react';
import block from 'bem-cn';
import { NavLink } from 'react-router-dom';

import './Link.scss';

const b = block('link');

class Link extends React.PureComponent<React.HTMLProps<HTMLAnchorElement>> {
	public render() {
		const { children, className } = this.props;
		const mixClass = className ? ` ${className}` : '';
		return (
			<NavLink className={b() + mixClass} to={this.props.href!}>
				{children}
			</NavLink>
		);
	}
}

export default Link;
