import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Logo } from 'shared/view/elements';
import { TopBarSearchForm, TopUserMenu } from '../../components';
import * as NS from '../../../namespace';

import './TopBarContainer.scss';

const b = block('top-bar-container');


type TProps = ITranslateProps;

class TopBarContainer extends React.PureComponent<TProps> {
  public render() {
    return (
      <div className={b()}>
        <div className={b('left-part')}>
          <div className={b('logo')}>
            <a href="/">
              <Logo/>
            </a>
          </div>
          <div className={b('search-field')}>
            <TopBarSearchForm/>
          </div>
        </div>
        <div className={b('right-part')}>
          <div className={b('top-menu')}>
            <TopUserMenu
              user={{
                firstName: 'Tayler',
                lastName: 'Lafayette',
                avatarUrl: '/static/demo-avatar.png',
              }}
              items={[
                { id: 'dashboard', titleKey: 'TOP-BAR-CONTAINER:MENU-ITEMS:DASHBOARD' },
                { id: 'create-org', titleKey: 'TOP-BAR-CONTAINER:MENU-ITEMS:CREATE-ORG' },
                { id: 'log-out', titleKey: 'TOP-BAR-CONTAINER:MENU-ITEMS:LOG-OUT' },
              ]}
              onMenuItemSelected={this.handleMenuItemSelected}
            />
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleMenuItemSelected(item: NS.IMenuItem) {
    console.log('[handleMenuItemSelected]', item);
  }
}

export default i18nConnect<{}>(TopBarContainer);
