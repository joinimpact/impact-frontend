import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';
import { bind } from 'decko';

import './DeleteOpportunityModal.scss';

interface IOwnProps {
  communication: ICommunication;
  onClose(): void;
  onDelete(): void;
}

const b = block('delete-opportunity-modal');

type TProps = IOwnProps & ITranslateProps;

class DeleteOpportunityModal extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <Modal
        isOpen
        title={t('DELETE-OPPORTUNITY-MODAL:STATIC:TITLE')}
        actions={this.renderActions()}
        onClose={this.props.onClose}
      >
        <div className={b()}>
          <div className={b('warn')}>
            {t('DELETE-OPPORTUNITY-MODAL:STATIC:WARN')}
          </div>
        </div>
      </Modal>
    );
  }

  @bind
  private renderActions() {
    const { translate: t, communication } = this.props;
    return (
      <>
        {communication.error && (
          <div className={b('error')}>
            <Error>{communication.error}</Error>
          </div>
        )}
        <div className={b('actions')}>
          <Button
            color="light-red"
            isShowPreloader={this.props.communication.isRequesting}
            onClick={this.props.onDelete}
          >
            {t('DELETE-OPPORTUNITY-MODAL:BUTTON:OK')}
          </Button>
          <Button
            color="grey"
            onClick={this.props.onClose}
          >
            {t('DELETE-OPPORTUNITY-MODAL:BUTTON:CANCEL')}
          </Button>
        </div>
      </>
    );
  }
}

export default i18nConnect<IOwnProps>(DeleteOpportunityModal);
