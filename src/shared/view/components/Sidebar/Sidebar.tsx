import React from 'react';
import block from 'bem-cn';
import { ISideBarRoute } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { bind } from 'decko';

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
    return (
      <div className={b()}>
        {routes.map(this.renderRoute)}
      </div>
    );
  }

  @bind
  private renderRoute(route: ISideBarRoute, index: number) {
    const { translate: t, selectedRoute } = this.props;
    return (
      <div
        className={b('route', { selected: route.route === selectedRoute })}
        onClick={this.handleSelectSidebarItem.bind(this, route)}
        key={`route-${index}`}
      >
        {route.icon && (
          <div className={b('route-icon')}>{route.icon}</div>
        )}
        {t(route.title)}
      </div>
    );
  }

  @bind
  private handleSelectSidebarItem(route: ISideBarRoute) {
    this.props.onSelectRoute(route);
  }
}

export default i18nConnect<IOwnProps>(Sidebar);
