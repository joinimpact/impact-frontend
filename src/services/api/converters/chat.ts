import moment from 'moment';
import {
  IConversationMessageResponseItem,
  IConversationMessagesResponse,
  IConversationMessagesResponseExtended,
} from 'shared/types/responses/chat';

export function convertChatHistoryResponseToExtended(response: IConversationMessagesResponse, page: number, limit: number): IConversationMessagesResponseExtended {
  const messages: IConversationMessageResponseItem[] = response.messages.sort((left, right) => {
    return moment(left.timestamp).diff(right.timestamp);
  });
  let offset = response.totalResults - (page * limit + limit);
  if (offset < 0) {
    offset = 0;
  }

  return {
    ...response,
    page,
    messages,
    offset,
    perPage: limit,
  };
}
