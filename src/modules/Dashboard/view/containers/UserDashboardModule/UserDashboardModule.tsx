import React from 'react';
import block from 'bem-cn';
import { UserTopBar } from '../../../../shared/components';
import UserSidebar from '../../../../shared/components/UserSidebar/UserSidebar';
import { ISideBarRoute } from 'shared/types/app';

import './UserDashboardModule.scss';

const b = block('user-dashboard-module');

const sideBarRoutes: ISideBarRoute[] = [
  { title: 'USER-SIDEBAR:ROUTE-TITLE:HOME', icon: 'home', route: '/#', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:BROWSE', icon: 'browse', route: '/#', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:MESSAGES', icon: 'messages', route: '/#', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:ENROLLED-OPPORTUNITIES', icon: 'opportunities', route: '/#', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:CALENDAR', icon: 'calendar', route: '/#', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:SETTINGS', icon: 'settings', route: '/#', disabled: false },
];

class UserDashboardModule extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>
        <div className={b('top')}>
          <UserTopBar/>
        </div>
        <div className={b('content')}>
          <div className={b('content-left')}>
            <UserSidebar
              routes={sideBarRoutes}
            />
          </div>
          <div className={b('content-right')}>
            CONTENT
          </div>
        </div>
      </div>
    );
  }
}

export default UserDashboardModule;
