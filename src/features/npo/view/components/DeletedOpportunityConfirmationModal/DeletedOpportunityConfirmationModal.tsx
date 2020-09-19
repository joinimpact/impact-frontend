import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { bind } from 'decko';
import { Button } from 'shared/view/elements';

import './DeleteOpportunityConfirmationModal.scss';

interface IOwnProps {
	onClose(): void;
}

const b = block('delete-opportunity-confirmation-modal');

type TProps = IOwnProps & ITranslateProps;

class DeletedOpportunityConfirmationModal extends React.PureComponent<TProps> {
	public render() {
		const { translate: t } = this.props;
		return (
			<Modal
				isOpen
				// title={t('DELETED-OPPORTUNITY-CONFIRMATION-MODAL:STATIC:TITLE')}
				onClose={this.props.onClose}
				actions={this.renderActions()}
			>
				<div className={b()}>{t('DELETED-OPPORTUNITY-CONFIRMATION-MODAL:STATIC:BODY')}</div>
			</Modal>
		);
	}

	@bind
	private renderActions() {
		const { translate: t } = this.props;
		return (
			<div className={b('actions')}>
				<Button color="grey" onClick={this.props.onClose}>
					{t('SHARED:BUTTONS:OK')}
				</Button>
			</div>
		);
	}
}

export default i18nConnect<IOwnProps>(DeletedOpportunityConfirmationModal);
