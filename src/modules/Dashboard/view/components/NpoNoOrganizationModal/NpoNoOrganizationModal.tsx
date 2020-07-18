import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button } from 'shared/view/elements';

import './NpoNoOrganizationModal.scss';

interface IOwnProps {
  onClose(): void;
  onCreateNewOrganization(): void;
}

const b = block('no-organization-modal');

type TProps = IOwnProps & ITranslateProps;

class NpoNoOrganizationModal extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <Modal
        isOpen
        disablePadding
        onClose={this.props.onClose}
        title={t('NPO-NO-ORGANIZATION-MODAL:STATIC:TITLE')}
      >
        <div className={b()}>
          <div className={b('message')}>
            {t('NPO-NO-ORGANIZATION-MODAL:STATIC:BODY')}
          </div>
          <div className={b('actions')}>
            <Button color="grey" onClick={this.props.onClose}>
              {t('NPO-NO-ORGANIZATION-MODAL:ACTION:BACK')}
            </Button>
            <Button color="blue" onClick={this.props.onCreateNewOrganization}>
              {t('NPO-NO-ORGANIZATION-MODAL:ACTION:CREATE')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default i18nConnect<IOwnProps>(NpoNoOrganizationModal);
