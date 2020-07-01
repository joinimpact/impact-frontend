import React from 'react';
import block from 'bem-cn';
import { ISideBarRoute } from 'shared/types/app';
import { bind } from 'decko';
import { Sidebar } from 'shared/view/components';
import { ITranslateProps } from 'services/i18n';

interface IState {
  selectedRoute: string;
}

const b = block('create-new-opportunity');

type TAnchor = 'title' | 'tags' | 'description' | 'requirements' | 'limits' | 'publish-settings';

type TProps = ITranslateProps;

class CreateNewOpportunityContainer extends React.PureComponent<TProps, IState> {
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

  public render() {
    return (
      <div className={b()}>
        <div className={b('left-side')}>
          <Sidebar
            routes={this.sideBarItems}
            selectedRoute={this.state.selectedRoute}
            onSelectRoute={this.handleSelectRoute}
          />
        </div>
        <div className={b('content')}>
          CREATE NEW OPPORTUNITIES CONTAINER
        </div>
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

export default CreateNewOpportunityContainer;
