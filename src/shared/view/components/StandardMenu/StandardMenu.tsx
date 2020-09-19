import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Menu } from 'shared/view/elements/index';
import { IMenuContentProps, IMenuProps } from 'shared/view/elements/Menu/Menu';

import './StandardMenu.scss';

interface IOwnProps {
	items: IMenuItem[];
	btn: React.ReactNode;
	placement?: IMenuProps['placement'];
	strategy?: IMenuProps['strategy'];
	className?: string;
	onClick(code: string): void;
}

export interface IMenuItem {
	label: string;
	code: string;
}

interface IState {
	menuIsOpen: boolean;
}

const b = block('standard-menu');

type TProps = IOwnProps;

class StandardMenu extends React.PureComponent<TProps, IState> {
	public render() {
		const { btn } = this.props;
		return (
			<Menu btn={btn} placement="bottom-end" dontCloseOnClick>
				{this.renderMenuItems}
			</Menu>
		);
	}

	@bind
	private renderMenuItems(props: IMenuContentProps) {
		const { items } = this.props;

		return (
			<div className={b()}>
				{items.map((item: IMenuItem, index: number) => {
					return (
						<div key={`item-${index}`} className={b('item')} onClick={this.handleClickMenuItem.bind(this, item, props)}>
							{item.label}
						</div>
					);
				})}
			</div>
		);
	}

	@bind
	private handleClickMenuItem(item: IMenuItem, props: IMenuContentProps) {
		this.props.onClick(item.code);
		props.close();
	}
}

export default StandardMenu;
