import React from 'react';
import block from 'bem-cn';
import { ISideBarRoute } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { bind } from 'decko';
import { Icon } from 'shared/view/elements';

import './UserSidebar.scss';

interface IOwnProps {
  routes: ISideBarRoute[];
  selectedRoute: string;
  onSelectRoute(route: ISideBarRoute): void;
}

const b = block('user-sidebar');

type TProps = IOwnProps & ITranslateProps;

class UserSidebar extends React.PureComponent<TProps> {
  public render() {
    const { routes } = this.props;
    return (
      <div className={b()}>
        {routes.map(this.renderRoute)}
      </div>
    );
  }

  @bind
  private renderRoute(route: ISideBarRoute) {
    const { translate: t, selectedRoute } = this.props;
    return (
      <div
        className={b('route', { selected: route.route === selectedRoute })}
        onClick={this.handleSelectSidebarItem.bind(this, route)}
      >
        {route.icon && (
          <Icon
            className={b('route-icon')}
            src={require(`shared/view/images/sidebar/${route.icon}-inline.svg`)}
          />
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

export default i18nConnect<IOwnProps>(UserSidebar);
