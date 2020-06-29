import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Menu } from 'shared/view/elements';
import { bind } from 'decko';
import { IUser } from 'shared/types/models/user';
import * as NS from '../../../namespace';

import './TopBarMenu.scss';


interface IOwnState {
  user: IUser;
  items: NS.IMenuItem[];
  onMenuItemSelected(item: NS.IMenuItem): void;
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
    const { items } = this.props;
    return (
      <div className={b()}>
        <Menu
          btn={this.renderButton()}
          placement={'bottom-end'}
          isOpen={this.state.menuIsOpen}
          onBtnClicked={this.handleMenuBtnClicked}
          onOutsideClicked={this.handleMenuOutsideClicked}
        >
          <div className={b('content')}>
            {items.map(this.renderMenuItem)}
          </div>
        </Menu>
      </div>
    );
  }

  @bind
  private renderButton() {
    const { user } = this.props;
    const { menuIsOpen } = this.state;
    return (
      <div className={b('btn', { 'is-open': menuIsOpen })}>
        <img className={b('btn-image')} src={'/static/demo-avatar.png'}/>
        <div className={b('btn-user-name')}>
          <div className={b('btn-user-name-label')}>
            {user.firstName} {user.lastName}
          </div>
          <i className={'zi zi-cheveron-down'}/>
        </div>
      </div>
    );
  }

  @bind
  private renderMenuItem(item: NS.IMenuItem, index: number) {
    const { translate: t } = this.props;
    return (
      <div className={b('menu-item')} onClick={this.handleMenuItemClicked.bind(this, item)} key={`item-${index}`}>
        {t(item.titleKey)}
      </div>
    );
  }

  @bind
  private handleMenuItemClicked(item: NS.IMenuItem) {
    this.setState({ menuIsOpen: false }, () => {
      this.props.onMenuItemSelected(item);
    });
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
