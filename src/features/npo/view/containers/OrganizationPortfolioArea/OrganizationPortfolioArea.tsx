import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image } from 'shared/view/elements';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import * as actions from '../../../redux/actions';
import { bind } from 'decko';
import { RouteComponentProps, withRouter } from 'react-router';
// import routes from 'modules/routes';

import './OrganizationPortfolioArea.scss';

interface IActionProps {
  setCurrentEditableOrganization: typeof actions.setCurrentEditableOrganization;
  editCurrentOrganization: typeof actions.editCurrentOrganization;
}

interface IOwnProps {
  organization: IOrganizationsResponseItem;
}

const b = block('organization-portfolio-area');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IOwnProps & ITranslateProps & IActionProps & TRouteProps;

class OrganizationPortfolioArea extends React.PureComponent<TProps> {
  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      setCurrentEditableOrganization: actions.setCurrentEditableOrganization,
      editCurrentOrganization: actions.editCurrentOrganization,
    }, dispatch);
  }

  public render() {
    const { translate: t, organization } = this.props;
    return (
      <div className={b()}>
        <div className={b('avatar')}>
          {organization.profilePicture && (
            <Image className={b('avatar-image')} src={organization.profilePicture}/>
          )}
        </div>
        <div className={b('organization-name')}>
          {organization.name}
        </div>
        <div className={b('access-type-text')}>
          {t('ORGANIZATION-PORTFOLIO-AREA:STATIC:YOU-ARE-ADMIN')}
        </div>
        <div className={b('actions')}>
          <Button color="grey" onClick={this.handleGoToEditProfile}>
            {t('ORGANIZATION-PORTFOLIO-AREA:BUTTON:EDIT-PROFILE')}
          </Button>
        </div>
      </div>
    );
  }

  @bind
  private handleGoToEditProfile() {
    this.props.editCurrentOrganization();
    // this.props.setCurrentEditableOrganization(this.props.organization);
    // this.props.history.push(routes.dashboard.organization.edit.getPath());
  }
}

const withRedux = connect<null, IActionProps, ITranslateProps & IOwnProps & TRouteProps>(
  null,
  OrganizationPortfolioArea.mapDispatch,
)(OrganizationPortfolioArea);
export default i18nConnect<IOwnProps>(withRouter(withRedux));
