import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Modal } from 'services/modal';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';

import './DeleteAccountModal.scss';

interface IOwnProps {
	communication: ICommunication;
	onDelete(): void;
	onClose(): void;
}

const b = block('delete-account-modal');

type TProps = IOwnProps & ITranslateProps;

class DeleteAccountModal extends React.PureComponent<TProps> {
	public render() {
		const { translate: t } = this.props;
		return (
			<Modal
				isOpen
				icon="information-outline"
				title={t('DELETE-ACCOUNT-MODAL:STATIC:TITLE')}
				actions={this.renderActions()}
				onClose={this.props.onClose}
			>
				<div className={b()}>
					<div className={b('warn')}>{t('DELETE-ACCOUNT-MODAL:STATIC:BODY')}</div>
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
					<Button color="blue" isShowPreloader={this.props.communication.isRequesting} onClick={this.props.onDelete}>
						{t('DELETE-ACCOUNT-MODAL:ACTIONS:CONFIRM')}
					</Button>
					<Button color="grey" onClick={this.props.onClose}>
						{t('SHARED:BUTTONS:CANCEL')}
					</Button>
				</div>
			</>
		);
	}
}

export default i18nConnect<IOwnProps>(DeleteAccountModal);
