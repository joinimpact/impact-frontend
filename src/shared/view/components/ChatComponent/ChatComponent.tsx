import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IUser } from 'shared/types/models/user';
import { ChatDaySeparator, ChatMessage } from 'shared/view/components';
import { CellMeasurer, CellMeasurerCache, Index, IndexRange, List } from 'react-virtualized';
import { ListRowProps } from 'react-virtualized/dist/es/List';

import './ChatComponent.scss';

interface IOwnProps {
  userId: string;
  messages: IConversationMessageResponseItem[];
  currentConversation: IConversationResponseItem;
  currentUser: IUser;
  totalMessagesCount: number;
  onLoadMoreRows(params: IndexRange): Promise<any>;
}

const b = block('chat-component');

type TProps = IOwnProps;

class ChatComponent extends React.PureComponent<TProps> {
  private cache = new CellMeasurerCache({ defaultHeight: 20, fixedWidth: true });
  private list: List | null = null;
  private registerChild: ((registeredChild: any) => void) | null = null;

  public componentDidUpdate(prevProps: TProps) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.recalculateHeights();
      this.scrollToBottom();
    }
  }

  public componentDidMount() {
    this.scrollToBottom();
  }

  public render() {

    /*this.props.messages.map((mes, index) => {
      console.log(index, mes.timestamp);
    });*/

    return (
      <div className={b()}>
        <div className={b('content')}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  @bind
  private scrollToBottom() {
    const { messages } = this.props;
    const bottomIndex = messages.length ? messages.length - 1 : 0;
    setTimeout(() => {
      if (this.list) {
        this.list.scrollToRow(bottomIndex);
      }
    }, 1);
  }

  @bind
  private renderContent() {
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.props.onLoadMoreRows}
        rowCount={this.props.totalMessagesCount}
      >
        {({ onRowsRendered, registerChild }) => {
          this.registerChild = registerChild;

          return (
            <AutoSizer>
              {({ width, height }) => {

                // setTimeout(this.recalculateHeights, 0);

                return (
                  <List
                    deferredMeasurementCache={this.cache}
                    onRowsRendered={onRowsRendered}
                    height={height}
                    width={width}
                    tabIndex={null}
                    ref={this.setListRef}
                    rowHeight={this.cache.rowHeight}
                    rowCount={this.props.totalMessagesCount}
                    rowRenderer={this.renderRow}
                  />
                  /*<div className={b('content')} style={{ width: width, height: height }}>
                    {this.renderMessages()}
                  </div>*/
                );
              }}
            </AutoSizer>

          );
        }}
      </InfiniteLoader>
    );
  }

  @bind
  private setListRef(list: List) {
    this.list = list;
    this.registerChild!(list);
  }

  @bind
  private recalculateHeights() {
    if (this.list) {
      // console.log('RECALCULATE ROW HEIGHTS');
      this.list.recomputeRowHeights();
    }
  }

  @bind
  private renderRow({ index, isScrolling, key, parent, style }: ListRowProps) {
    const { messages, userId, currentConversation, currentUser } = this.props;
    const message = messages[index];
    const prevMessage = messages[index - 1];

    if (false) {
      this.renderMessages();
    }

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        // height={this.mostRecentHeight}
      >
        <div className={b('message-container')} style={style}>
          <ChatMessage
            // key={`message-${index}`}
            isMine={userId === message.senderId}
            currentConversation={currentConversation}
            message={message}
            currentUser={currentUser}
            showAvatar={!prevMessage || prevMessage!.senderId !== message.senderId}
            // showAvatar={!prevMessage || prevMessage!.senderId !== message.senderId}
            // showAvatar={!nextMessage || message.senderId !== nextMessage.senderId}
          />
        </div>
      </CellMeasurer>
    );
  }

  @bind
  private renderMessages() {
    const { messages, userId, currentConversation, currentUser } = this.props;
    const res = [];
    const dayFormat = 'YYYY=MM-DD';
    let prevDate: moment.Moment | null = null;
    let prevMessage: IConversationMessageResponseItem | null = null;

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      // const nextMessage = messages[i - 1];
      const messageDate = moment(message.timestamp);
      if (!prevDate) {
        prevDate = messageDate.clone();
      }

      if (prevDate.format(dayFormat) !== messageDate.format(dayFormat)) {
        const dayStr = messageDate.format(dayFormat);
        res.push(
          <ChatDaySeparator
            key={`day-sep-${dayStr}`}
            day={messageDate}
          />
        );

        prevDate = messageDate.clone();
      }

      res.push(
        <ChatMessage
          key={`message-${i}`}
          isMine={userId === message.senderId}
          currentConversation={currentConversation}
          message={message}
          currentUser={currentUser}
          showAvatar={!prevMessage || prevMessage!.senderId !== message.senderId}
          // showAvatar={!nextMessage || message.senderId !== nextMessage.senderId}
        />
      );

      prevMessage = message;
    }

    return res;
  }

  @bind
  private isRowLoaded({ index }: Index) {
    // console.log('[isRowLoaded]', index, this.props.messages.length - 1);
    return index > this.props.messages.length - 1;
  }
}

export default ChatComponent;
