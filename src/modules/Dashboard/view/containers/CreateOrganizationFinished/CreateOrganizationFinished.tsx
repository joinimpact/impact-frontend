import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'shared/view/elements';
import routes from 'modules/routes';

import './CreateOrganizationFinished.scss';

const b = block('create-organization-finished');

type TProps = ITranslateProps & RouteComponentProps<{}>;

class CreateOrganizationFinished extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('content')}>
          <div className={b('title')}>
            {t('CREATE-ORGANIZATION-FINISHED:STATIC:TITLE')}
          </div>
          <div className={b('subtitle')}>
            {t('CREATE-ORGANIZATION-FINISHED:STATIC:SUBTITLE')}
          </div>
          <div className={b('actions')}>
            <Button color="blue" onClick={this.handleCreateOpportunity}>
              {t('CREATE-ORGANIZATION-FINISHED:BUTTON:CREATE-OPPORTUNITY')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleCreateOpportunity() {
    this.props.history.push(routes.dashboard.organization['create-opportunity'].getPath());
  }
}

const i18nConnected = i18nConnect(CreateOrganizationFinished);
export default withRouter(i18nConnected);
