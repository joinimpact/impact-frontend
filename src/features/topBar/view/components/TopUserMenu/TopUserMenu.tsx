import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Icon, Menu } from 'shared/view/elements';
import { bind } from 'decko';
import { IUser } from 'shared/types/models/user';

import './TopBarMenu.scss';

interface IOwnState {
  user: IUser;
}

interface IState {
  menuIsOpen: boolean;
}

const b = block('top-user-menu');

type TProps = IOwnState & ITranslateProps;

class TopUserMenu extends React.PureComponent<TProps> {
  public state: IState = {
    menuIsOpen: false,
  };

  public render() {
    return (
      <div className={b()}>
        <Menu
          btn={this.renderButton()}
          isOpen={this.state.menuIsOpen}
          onBtnClicked={this.handleMenuBtnClicked}
          onOutsideClicked={this.handleMenuOutsideClicked}
        >
          <div className={b('content')}>
            USER MENU CONTENT
          </div>
        </Menu>
      </div>
    );
  }

  @bind
  private renderButton() {
    const { user } = this.props;
    return (
      <div className={b('btn')}>
        <img className={b('btn-image')} src={'/static/demo-avatar.png'}/>
        <div className={b('btn-user-name')}>
          {user.firstName} {user.lastName}
        </div>
        <Icon className={b('btn-angle')} src={require('shared/view/images/angle-down-inline.svg')}/>
      </div>
    );
  }

  @bind
  private handleMenuBtnClicked() {
    this.setState({ menuIsOpen: true });
  }

  @bind
  private handleMenuOutsideClicked() {
    this.setState({ menuIsOpen: false });
  }
}

export default i18nConnect<IOwnState>(TopUserMenu);
