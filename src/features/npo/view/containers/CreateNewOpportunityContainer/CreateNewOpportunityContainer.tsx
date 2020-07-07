import React from 'react';
import block from 'bem-cn';
import { ISideBarRoute } from 'shared/types/app';
import { bind } from 'decko';
import { Sidebar } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './CreateNewOpportunityContainer.scss';

interface IState {
  selectedRoute: string | null;
}

const b = block('create-new-opportunity');

type TAnchor = 'title' | 'tags' | 'description' | 'requirements' | 'limits' | 'publish-settings';

type TProps = ITranslateProps;

class CreateNewOpportunityContainer extends React.PureComponent<TProps, IState> {
  public state: IState = {
    selectedRoute: null,
  };

  private sideBarItems: ISideBarRoute[] = [
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:TITLE',
      onClick: this.handleMenuItemClick.bind(this, 'title'),
      route: 'title',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:TAGS',
      onClick: this.handleMenuItemClick.bind(this, 'tags'),
      route: 'tags',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:DESCRIPTION',
      onClick: this.handleMenuItemClick.bind(this, 'description'),
      route: 'description',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:REQUIREMENTS',
      onClick: this.handleMenuItemClick.bind(this, 'requirements'),
      route: 'requirements',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:LIMITS',
      onClick: this.handleMenuItemClick.bind(this, 'limits'),
      route: 'limits',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:PUBLISHING-SETTINGS-OR-DELETE',
      onClick: this.handleMenuItemClick.bind(this, 'publish-settings'),
      route: 'publish-settings',
    },
  ];

  public componentDidMount() {
    this.setState({ selectedRoute: this.sideBarItems[0].route! });
  }

  public render() {
    return (
      <div className={b()}>
        {this.renderLeftSide()}
        {this.renderRightSide()}
      </div>
    );
  }

  @bind
  private renderLeftSide() {
    const { translate: t } = this.props;
    return (
      <div className={b('left-side')}>
        <div className={b('left-side-opportunity-name')}>
          Working with code to track the movements of birds.
        </div>
        <div className={b('left-side-menu-caption')}>
          {t('CREATE-NEW-OPPORTUNITY-CONTAINER:STATIC:LEFT-SIDE-CAPTION').toUpperCase()}
        </div>
        <Sidebar
          routes={this.sideBarItems}
          selectedRoute={this.state.selectedRoute}
          onSelectRoute={this.handleSelectRoute}
        />
      </div>
    );
  }

  @bind
  private renderRightSide() {
    return (
      <div className={b('content')}>
        CREATE NEW OPPORTUNITIES CONTAINER
      </div>
    );
  }

  @bind
  private handleMenuItemClick(anchor: TAnchor) {
    // console.log('anchor');
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.route! });
  }
}

export default i18nConnect<{}>(CreateNewOpportunityContainer);
