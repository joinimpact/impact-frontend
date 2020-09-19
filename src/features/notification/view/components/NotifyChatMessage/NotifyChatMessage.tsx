import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
// import { NBSP } from 'shared/types/constants';
import {
	IConversationMessageResponseItem,
	IRequestHoursMessage,
	IStandardMessage,
	IVolunteerRequestAcceptance,
	IVolunteerRequestProfileMessage,
} from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { UserAvatar } from 'shared/view/components';
import { Image } from 'shared/view/elements';

import './NotifyChatMessage.scss';

interface IOwnProps {
	message: IConversationMessageResponseItem;
	conversation: IConversationResponseItem | null;
}

const MAX_BODY_SIZE = 60;

const b = block('notify-chat-message');

type TProps = IOwnProps & ITranslateProps;

class NotifyChatMessage extends React.PureComponent<TProps> {
	public render() {
		const { conversation } = this.props;
		return (
			<div className={b()}>
				{conversation && <div className={b('left')}>{this.renderConversationAvatar(conversation)}</div>}
				<div className={b('content')}>
					{conversation && <div className={b('content-head')}>{conversation.name}</div>}
					<div className={b('content-body')}>{this.renderContent()}</div>
				</div>
			</div>
		);
	}

	@bind
	private renderContent(): React.ReactNode {
		const { message } = this.props;

		switch (message.type) {
			case 'MESSAGE_VOLUNTEER_REQUEST_ACCEPTANCE':
				return this.renderRequestAcceptance(message.body as IVolunteerRequestAcceptance);
			case 'MESSAGE_STANDARD':
				return this.renderStandardMessage(message.body as IStandardMessage);
			case 'MESSAGE_HOURS_ACCEPTED':
				return this.renderHoursAccepted(message.body as IRequestHoursMessage);
			case 'MESSAGE_HOURS_DECLINED':
				return this.renderHoursDeclined(message.body as IRequestHoursMessage);
			case 'MESSAGE_HOURS_REQUESTED':
				return this.renderHoursRequested(message.body as IRequestHoursMessage);
			case 'MESSAGE_VOLUNTEER_REQUEST_PROFILE':
				return this.renderVolunteerRequestProfile(message.body as IVolunteerRequestProfileMessage);
		}

		return null;
	}

	@bind
	private renderHoursAccepted(body: IRequestHoursMessage) {
		const { translate: t, conversation } = this.props;
		return this.wrappedText(
			t('NOTIFY-SERVICE:EVENT:MESSAGE_HOURS_ACCEPTED', {
				userName: conversation ? conversation.name : '',
			}),
		);
	}

	@bind
	private renderHoursDeclined(body: IRequestHoursMessage) {
		const { translate: t, conversation } = this.props;
		return this.wrappedText(
			t('NOTIFY-SERVICE:EVENT:MESSAGE_HOURS_DECLINED', {
				userName: conversation ? conversation.name : '',
			}),
		);
	}

	@bind
	private renderHoursRequested(body: IRequestHoursMessage) {
		const { translate: t, conversation } = this.props;
		return this.wrappedText(
			t('NOTIFY-SERVICE:EVENT:MESSAGE_HOURS_REQUESTED', {
				userName: conversation ? conversation.name : '',
			}),
		);
	}

	@bind
	private renderVolunteerRequestProfile(body: IVolunteerRequestProfileMessage) {
		const { translate: t } = this.props;
		return this.wrappedText(
			t('NOTIFY-SERVICE:EVENT:MESSAGE_VOLUNTEER_REQUEST_PROFILE', {
				name: `${body.firstName} ${body.lastName}`,
				message: body.message,
			}),
		);
	}

	@bind
	private renderRequestAcceptance(body: IVolunteerRequestAcceptance) {
		const { translate: t } = this.props;
		return this.wrappedText(
			t('NOTIFY-SERVICE:EVENT:VOLUNTEER_REQUEST_ACCEPTANCE', {
				userName: body.volunteer.firstName,
				opportunityTitle: body.opportunityTitle,
			}),
		);
	}

	@bind
	private renderStandardMessage(body: IStandardMessage) {
		return this.wrappedText(body.text);
	}

	private wrappedText(value: string) {
		const after = value.length > MAX_BODY_SIZE ? '...' : '';
		return `${value.substr(0, MAX_BODY_SIZE)}${after}`;
	}

	@bind
	private renderConversationAvatar(conversation: IConversationResponseItem) {
		if (conversation.profilePicture) {
			return (
				<div className={b('avatar')}>
					<Image src={conversation.profilePicture} />
				</div>
			);
		}

		if (conversation.name) {
			return (
				<div className={b('avatar')}>
					<UserAvatar firstName={conversation.name} />
				</div>
			);
		}

		return null;
	}
}

export default i18nConnect<IOwnProps>(NotifyChatMessage);
