import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { ChatDaySeparator, ChatMessage, ChatMessageLoading } from 'shared/view/components';
import { CellMeasurer, CellMeasurerCache, Index, IndexRange, List } from 'react-virtualized';
import { ListRowProps } from 'react-virtualized/dist/es/List';
import { CHAT_FRAME_SIZE } from 'shared/types/constants';

import './ChatComponent.scss';

interface IOwnProps {
  userId: string;
  messages: IConversationMessageResponseItem[];
  currentConversation: IConversationResponseItem;
  avatarUrl: string | null;
  totalMessagesCount: number;
  onLoadMoreRows(params: IndexRange): Promise<any>;
}

interface IState {
  requestedFrames: boolean[];
}

const b = block('chat-component');

type TProps = IOwnProps;

class ChatComponent extends React.PureComponent<TProps, IState> {
  public state: IState = {
    requestedFrames: [],
  };

  private cache = new CellMeasurerCache({ defaultHeight: 10, minHeight: 52, fixedWidth: true });
  private list: List | null = null;
  private registerChild: ((registeredChild: any) => void) | null = null;

  public componentDidUpdate(prevProps: TProps) {
    // const { messages } = this.props;
    /*for (let i = 0; i < prevProps.messages.length; i++) {
      console.log(i, prevProps.messages[i], messages[i]);
      if (!prevProps.messages[i] && !!messages[i]) {
        console.log(`[recomputeRowHeights] [${i}]`);
        this.list!.recomputeRowHeights(i);
      }
    }*/
    // this.scrollToBottom();
    if (this.props.totalMessagesCount !== prevProps.totalMessagesCount) {
      this.recalculateHeights().then(this.scrollToBottom);
    } else {
      this.recalculateHeights();
    }
  }

  public componentDidMount() {
    this.recalculateHeights().then(this.scrollToBottom);
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
  private renderContent() {
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.props.totalMessagesCount}
        minimumBatchSize={CHAT_FRAME_SIZE}
      >
        {({ onRowsRendered, registerChild }) => {
          this.registerChild = registerChild;

          return (
            <AutoSizer>
              {({ width, height }) => {

                // setTimeout(this.recalculateHeights, 0);

                return (
                  <List
                    // deferredMeasurementCache={this.cache}
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
  private loadMoreRows(params: IndexRange) {
    return new Promise((resolve, reject) => {
      const { requestedFrames } = this.state;
      const startPage = Math.floor(params.startIndex / CHAT_FRAME_SIZE);
      const stopPage = Math.floor(params.stopIndex / CHAT_FRAME_SIZE);
      for (let i = startPage; i <= stopPage; i++) {
        requestedFrames[i] = true;
      }
      this.setState({
        requestedFrames: [...requestedFrames], // Create new array to make render been catch this action
      }, () => {
        this.props.onLoadMoreRows(params).then(resolve);
      });
      // resolve();
    });
  }

  @bind
  private setListRef(list: List) {
    this.list = list;
    this.registerChild!(list);
  }

  @bind
  private recalculateHeights() {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (this.list) {
          this.list.recomputeRowHeights();
        }
        resolve();
      }, 10);
    });
  }

  @bind
  private scrollToBottom() {
    // const { totalMessagesCount } = this.props;
    // const bottomIndex = totalMessagesCount;
    // console.error('bottomIndex: ', bottomIndex);
    if (this.list) {
      this.list.scrollToRow(this.props.totalMessagesCount);
    }
  }

  @bind
  private renderRow({ index, isScrolling, key, parent, style }: ListRowProps) {
    const { messages, userId, currentConversation, avatarUrl } = this.props;
    const message = messages[index];
    const prevMessage = messages[index - 1];

    // console.log(`  ----------- renderRow [${index}]`);

    if (false) {
      this.renderMessages();
    }

    if (!message) {
      return (
        <div className={b('message-container')} style={style} key={key}>
          <ChatMessageLoading/>
        </div>
      )
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
            avatarUrl={avatarUrl}
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
    const { messages, userId, currentConversation, avatarUrl } = this.props;
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
          avatarUrl={avatarUrl}
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
    const { requestedFrames } = this.state;
    const pageNumber = Math.floor(this.props.totalMessagesCount / CHAT_FRAME_SIZE);
    if (!this.props.messages[index]) {
      return !!requestedFrames[pageNumber]; // We will fetch messages only if we wasn't requested them before
    }
    return true;
  }
}

export default ChatComponent;
