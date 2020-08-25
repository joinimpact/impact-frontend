import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IOrganizationsResponseItem, IUserOrganizationsResponse } from 'shared/types/responses/npo';
import { Image, Menu } from 'shared/view/elements';
import { bind } from 'decko';

import './TopBarOrganizationsMenu.scss';

interface IOwnProps {
  userOrganizations: IUserOrganizationsResponse['organizations'];
  currentOrganization: IOrganizationsResponseItem;
  onSelectOrganization(organization: IOrganizationsResponseItem): void;
  onCreateNewOrganization(): void;
}

interface IState {
  menuIsOpen: boolean;
}

const b = block('top-bar-organizations-menu');

type TProps = IOwnProps & ITranslateProps;

class TopBarOrganizationsMenu extends React.PureComponent<TProps, IState> {
  public state: IState = {
    menuIsOpen: false,
  };

  public render() {
    const { currentOrganization, userOrganizations } = this.props;
    const { menuIsOpen } = this.state;

    return (
      <div className={b()}>
        <Menu
          btn={this.renderButton(currentOrganization)}
          placement="bottom-start"
          isOpen={menuIsOpen}
          onBtnClicked={this.handleMenuBtnClicked}
          onOutsideClicked={this.handleMenuOutsideClicked}
        >
          {() => (
            <div className={b('content')}>
              {userOrganizations.map(this.renderMenuItem)}
              {this.renderAddOrganizationMenuItem()}
            </div>
          )}
        </Menu>
      </div>
    );
  }

  @bind
  private renderMenuItem(item: IOrganizationsResponseItem, index: number) {
    return (
      <div className={b('menu-item')} onClick={this.handleMenuItemClicked.bind(this, item)} key={`item-${index}`}>
        <div className={b('menu-item-left-part')}>
          {item.profilePicture > '' ? (
            <Image className={b('menu-item-image')} src={item.profilePicture}/>
          ) : (
            <div className={b('menu-item-image')}>
              <i className="zi zi-photo"/>
            </div>
          )}
        </div>
        <div className={b('menu-item-org-name')}>
          {item.name}
        </div>
      </div>
    );
  }

  @bind
  private renderAddOrganizationMenuItem() {
    const { translate: t } = this.props;
    return (
      <div className={b('menu-item')} onClick={this.handleCreateOrganizationClicked}>
        <div className={b('menu-item-image', { filled: true })}>
          <i className="zi zi-add-outline"/>
        </div>
        <div className={b('menu-item-org-name')}>
          {t('TOP-BAR-ORGANIZATIONS-MENU:STATIC:CREATE-NEW-ORGANIZATION')}
        </div>
      </div>
    );
  }

  @bind
  private handleCreateOrganizationClicked() {
    this.props.onCreateNewOrganization();
  }

  @bind
  private handleMenuItemClicked(item: IOrganizationsResponseItem) {
    this.setState({ menuIsOpen: false }, () => {
      this.props.onSelectOrganization(item);
    });
  }

  @bind
  private renderButton(org: IOrganizationsResponseItem) {
    const { menuIsOpen } = this.state;

    return (
      <div className={b('btn', { 'is-open': menuIsOpen })}>
        {org.profilePicture && (
          <Image className={b('btn-image')} src={org.profilePicture}/>
        )}
        <div className={b('btn-org-name')}>
          <div className={b('btn-org-name-label')}>
            {org.name}
          </div>
          <i className="zi zi-cheveron-down"/>
        </div>
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

export default i18nConnect<IOwnProps>(TopBarOrganizationsMenu);
