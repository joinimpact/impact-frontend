import React from 'react';
import block from 'bem-cn';
import { ISideBarRoute } from 'shared/types/app';
import { Sidebar } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './NpoCreateOrganizationSidebar.scss';

interface IOwnProps {
  selectedRoute: string | null;
  onSelectRoute(route: ISideBarRoute): void;
}

const b = block('npo-create-organization-sidebar');

type TProps = IOwnProps & ITranslateProps;

class NpoCreateOrganizationSidebar extends React.PureComponent<TProps> {
  private sideBarItems: ISideBarRoute[] = [
    {
      title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:DETAILS',
      hashRoute: '#details',
    },
    {
      title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:TAGS',
      hashRoute: '#tags',
    },
    {
      title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:TEAM',
      hashRoute: '#team',
    }
  ];

  public componentDidMount() {
    this.props.onSelectRoute(this.sideBarItems[0]);
  }

  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('bar')}>
          <div className={b('bar-title')}>
            {t('NPO-CREATE-ORGANIZATION-SIDEBAR:SIDEBAR:TITLE')}
          </div>
          <Sidebar
            routes={this.sideBarItems}
            selectedRoute={this.props.selectedRoute}
            onSelectRoute={this.props.onSelectRoute}
          />
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(NpoCreateOrganizationSidebar);
