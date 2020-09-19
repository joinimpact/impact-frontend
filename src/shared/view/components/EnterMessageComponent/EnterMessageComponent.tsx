import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { MarkdownEditor } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';

import './EnterMessageComponent.scss';

interface IOwnProps {
	currentConversation: IConversationResponseItem | null;
	onSend(value: string | null): void;
}

interface IState {
	value: string | null;
	canSend: boolean;
}

const b = block('enter-message-component');

type TProps = IOwnProps & ITranslateProps;

class EnterMessageComponent extends React.PureComponent<TProps, IState> {
	public state: IState = {
		value: null,
		canSend: false,
	};

	public render() {
		const { value } = this.state;
		const { translate: t, currentConversation } = this.props;

		return (
			<div className={b()}>
				<div className={b('left')}>
					{currentConversation && (
						<MarkdownEditor
							noToolbar
							changeOnEnter
							placeholder={t('ENTER-MESSAGE-COMPONENT:PLACEHOLDER:TYPE-MESSAGE', {
								name: currentConversation ? currentConversation.name : '',
							})}
							onEnter={this.handleEnterMessage}
							onChange={this.handleChangeMessage}
							value={value}
							minHeight={'0'}
						/>
					)}
				</div>
				<div className={b('right', { visible: this.state.canSend })}>
					<div className={b('send-btn')} tabIndex={2} onClick={this.handleSendMessage}>
						<i className="zi zi-send" />
					</div>
				</div>
			</div>
		);
	}

	@bind
	private handleEnterMessage(value: string | null) {
		this.setState({ value }, () => {
			this.props.onSend(value);
		});
	}

	@bind
	private handleSendMessage() {
		this.props.onSend(this.state.value);
	}

	@bind
	private handleChangeMessage(value: string | null) {
		if (this.state.canSend && !value) {
			this.setState({ canSend: false });
		} else if (!this.state.canSend && value! > '') {
			this.setState({ canSend: true });
		}
	}
}

export default i18nConnect<IOwnProps>(EnterMessageComponent);
