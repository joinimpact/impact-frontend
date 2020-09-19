import React from 'react';
import block from 'bem-cn';
import { ISideBarRoute } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { bind } from 'decko';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import './Sidebar.scss';

interface IOwnProps {
	routes: ISideBarRoute[];
	selectedRoute?: string | null;
	onSelectRoute(route: ISideBarRoute): void;
}

const b = block('sidebar');

type TProps = IOwnProps & ITranslateProps;

class Sidebar extends React.PureComponent<TProps> {
	public render() {
		const { routes } = this.props;
		return <div className={b()}>{routes.map(this.renderRoute)}</div>;
	}

	@bind
	private renderRoute(route: ISideBarRoute, index: number) {
		if (route.hashRoute) {
			return (
				<NavHashLink
					smooth
					to={route.hashRoute}
					className={b('route', {
						current: route.hashRoute === this.props.selectedRoute,
						disabled: route.disabled,
					}).toString()}
					onClick={this.handleHashLinkClick.bind(this, route)}
					key={`route-${index}`}
				>
					{this.renderRouteContent(route)}
				</NavHashLink>
			);
		}

		return (
			<NavLink
				to={route.route!}
				className={b('route', { disabled: route.disabled }).toString()}
				activeClassName={b('route', { current: true }).toString()}
				key={`route-${index}`}
			>
				{this.renderRouteContent(route)}
			</NavLink>
		);
	}

	@bind
	private handleHashLinkClick(route: ISideBarRoute, e: React.MouseEvent) {
		if (!route.disabled) {
			this.forceUpdate();
			this.props.onSelectRoute(route);
		}
	}

	@bind
	private renderRouteContent(route: ISideBarRoute) {
		const { translate: t } = this.props;
		return (
			<>
				{route.icon && <div className={b('route-icon')}>{route.icon}</div>}
				{t(route.title)}
			</>
		);
	}
}

export default i18nConnect<IOwnProps>(Sidebar);
