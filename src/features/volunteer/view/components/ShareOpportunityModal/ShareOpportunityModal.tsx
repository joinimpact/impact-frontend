import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import CopyToClipboard from 'react-copy-to-clipboard';
import { InputBase } from 'shared/view/elements';

import './ShareOpportunityModal.scss';

interface IOwnProps {
  onClose(): void;
}

const b = block('share-opportunity-modal');

type TProps = IOwnProps & ITranslateProps;

class ShareOpportunityModal extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <Modal
        isOpen
        title={t('SHARE-OPPORTUNITY-MODAL:STATIC:TITLE')}
        onClose={this.props.onClose}
      >
        <div className={b()}>
          <div className={b('subtitle')}>
            {t('SHARE-OPPORTUNITY-MODAL:STATIC:SUBTITLE')}
          </div>
          <div className={b('field')}>
            <InputBase value={this.link}/>
            <CopyToClipboard text={this.link} onCopy={this.props.onClose}>
              <div className={b('btn')}>
                <i className="zi zi-link"/>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
    );
  }

  private get link() {
    return location.href;
  }
}

export default i18nConnect<IOwnProps>(ShareOpportunityModal);
