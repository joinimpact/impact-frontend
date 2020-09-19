import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import {
	IConversationMessageResponseItem,
	IRequestHoursMessage,
	IStandardMessage,
	IVolunteerRequestAcceptance,
	IVolunteerRequestProfileMessage,
} from 'shared/types/responses/chat';
import { Image } from 'shared/view/elements';
import {
	ChatVolunteerRequestAcceptance,
	StandardMessage,
	UserAvatar,
	VolunteerRequestProfileMessage,
} from 'shared/view/components';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { NBSP } from 'shared/types/constants';
import ChatHoursRequestedMessage from 'shared/view/components/ChatHoursRequestedMessage/ChatHoursRequestedMessage';
import { IConversationMember } from 'shared/types/models/chat';

import './ChatMessage.scss';

export type TMessageRenderFunc = (message: IConversationMessageResponseItem) => React.ReactNode;

interface IOwnProps {
	isMine: boolean;
	message: IConversationMessageResponseItem;
	currentConversation: IConversationResponseItem;
	messageOwner: IConversationMember;
	showAvatar?: boolean;
	messageRender?(
		message: IConversationMessageResponseItem,
		messageOwner: IConversationMember,
		originalRender: TMessageRenderFunc,
	): React.ReactNode;
}

const b = block('chat-message');

type TProps = IOwnProps;

class ChatMessage extends React.PureComponent<TProps> {
	public render() {
		const { isMine, message, messageRender } = this.props;
		return (
			<div className={b({ 'is-mine': isMine })}>
				{!isMine && this.renderAvatar()}
				<div className={b('content')}>
					{messageRender ? messageRender(message, this.props.messageOwner, this.renderMessage) : this.renderMessage()}
				</div>
				{isMine && this.renderAvatar()}
			</div>
		);
	}

	@bind
	private renderMessage() {
		const { message } = this.props;

		switch (message.type) {
			case 'MESSAGE_VOLUNTEER_REQUEST_PROFILE':
				return <VolunteerRequestProfileMessage message={message.body as IVolunteerRequestProfileMessage} />;
			case 'MESSAGE_STANDARD':
				return <StandardMessage message={message.body as IStandardMessage} />;
			case 'MESSAGE_HOURS_ACCEPTED':
			case 'MESSAGE_HOURS_DECLINED':
			case 'MESSAGE_HOURS_REQUESTED':
				return (
					<ChatHoursRequestedMessage
						message={message.body as IRequestHoursMessage}
						messageOwner={this.props.messageOwner}
						currentConversation={this.props.currentConversation}
					/>
				);
			case 'MESSAGE_VOLUNTEER_REQUEST_ACCEPTANCE':
				return <ChatVolunteerRequestAcceptance message={message.body as IVolunteerRequestAcceptance} />;
			/* case 'MESSAGE_HOURS_ACCEPTED':
        console.log(message);
        return message.type;*/
			default:
				return message.type;
		}

		// return null;
	}

	@bind
	private renderAvatar() {
		const { showAvatar, messageOwner, message } = this.props;

		if (!showAvatar) {
			return <div className={b('avatar')}>{NBSP}</div>;
		}

		if (message.sender) {
			return (
				<div className={b('avatar')}>
					{Boolean(message.sender.profilePicture) ? (
						<Image src={message.sender.profilePicture} />
					) : (
						<UserAvatar firstName={message.sender.firstName} lastName={message.sender.lastName} />
					)}
				</div>
			);
		}

		return (
			<div className={b('avatar')}>
				{messageOwner.avatarUrl ? <Image src={messageOwner.avatarUrl} /> : <UserAvatar firstName={messageOwner.name} />}
			</div>
		);
	}
}

export default ChatMessage;
