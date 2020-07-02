import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Logo } from 'shared/view/elements';
import { TopBarSearchForm, TopUserMenu } from '../../components';
import * as NS from '../../../namespace';
import { selectors as userSelectors } from 'services/user';
import { IUser } from 'shared/types/models/user';

import './TopBarContainer.scss';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';

interface IStateProps {
  currentUser: IUser | null;
}

const b = block('top-bar-container');

type TProps = ITranslateProps & IStateProps;

class TopBarContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
    };
  }

  public render() {
    return (
      <div className={b()}>
        <div className={b('left-part')}>
          <div className={b('logo')}>
            <a className={b('logo-link')} href="/">
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
              user={this.props.currentUser!}
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

const withRedux = connect<IStateProps, null, ITranslateProps>(
  TopBarContainer.mapStateToProps,
)(TopBarContainer);
export default i18nConnect<{}>(withRedux);
