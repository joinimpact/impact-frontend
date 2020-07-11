import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image } from 'shared/view/elements';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

import './OrganizationPortfolioArea.scss';

interface IOwnProps {
  organization: IOrganizationsResponseItem;
}

const b = block('organization-portfolio-area');

type TProps = IOwnProps & ITranslateProps;

class OrganizationPortfolioArea extends React.PureComponent<TProps> {
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
          <Button color="grey">
            {t('ORGANIZATION-PORTFOLIO-AREA:BUTTON:EDIT-PROFILE')}
          </Button>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(OrganizationPortfolioArea);
