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
import { ScrollParams } from 'react-virtualized/dist/es/Grid';
import { throttle } from 'shared/helpers/handlers';
import { IConversationMember } from 'shared/types/models/chat';
import { TMessageRenderFunc } from 'shared/view/components/ChatMessage/ChatMessage';
import Timer = NodeJS.Timer;

import './ChatComponent.scss';

interface IOwnProps {
  messages: IConversationMessageResponseItem[];
  currentConversation: IConversationResponseItem;
  me: IConversationMember;
  interlocutor: IConversationMember;
  totalMessagesCount: number;
  onLoadMoreRows(params: IndexRange): Promise<any>;
  messageRender?(
    message: IConversationMessageResponseItem,
    messageOwner: IConversationMember,
    originalRender: TMessageRenderFunc,
  ): React.ReactNode;
}

interface IState {
  requestedFrames: boolean[];
  isScrolling: boolean;
}

const b = block('chat-component');

type TProps = IOwnProps;

class ChatComponent extends React.PureComponent<TProps, IState> {
  public state: IState = {
    requestedFrames: [],
    isScrolling: false,
  };

  private cache = new CellMeasurerCache({
    defaultHeight: 60,
    // minHeight: 54,
    fixedWidth: true,
  });
  private list: List | null = null;
  private registerChild: ((registeredChild: any) => void) | null = null;
  private scrollTimeout: Timer | null = null;

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
    if (prevProps.currentConversation && this.props.currentConversation.id !== prevProps.currentConversation.id) {
      this.cache.clearAll();
      this.list!.forceUpdateGrid();
    }

    if (this.props.totalMessagesCount !== prevProps.totalMessagesCount) {
      this.recalculateHeights().then(this.scrollToBottom);
    } else {
      this.recalculateHeights();
    }
  }

  public componentDidMount() {
    this.recalculateHeights().then(this.scrollToBottom);
  }

  public componentWillUnmount() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  public render() {
    /*this.props.messages.map((mes, index) => {
      console.log(index, mes.timestamp);
    });*/

    return (
      <div className={b()}>
        <div className={b('content')}>
          <div className={b('scrolling', { visible: this.state.isScrolling })}>
            <div className={b('scrolling-content')}>Scrolling...</div>
          </div>
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
                    onScroll={throttle(this.handleScroll, 300)}
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
  private handleScroll(params: ScrollParams) {
    this.setState({ isScrolling: true }, () => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
      }

      this.scrollTimeout = setTimeout(() => {
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = null;
          this.setState({ isScrolling: false });
        }
      }, 500);
    });
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
      this.setState(
        {
          requestedFrames: [...requestedFrames], // Create new array to make render been catch this action
        },
        () => {
          this.props.onLoadMoreRows(params).then(resolve);
        },
      );
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
    if (this.list) {
      this.list.scrollToRow(this.props.totalMessagesCount);
    }
  }

  @bind
  private renderRow({ index, isScrolling, key, parent, style }: ListRowProps) {
    const { messages, currentConversation, me, interlocutor } = this.props;
    const dayFormat = 'YYYY-MM-DD';
    const message = messages[index];
    const prevMessage = messages[index - 1];
    const prevDate: moment.Moment | null = prevMessage ? moment(prevMessage.timestamp) : null;

    if (!message) {
      return (
        <div className={b('message-container')} style={style} key={key}>
          <ChatMessageLoading />
        </div>
      );
    }

    const currentDate: moment.Moment = moment(message.timestamp);
    const isDateChanged = !prevDate || prevDate.format(dayFormat) !== currentDate.format(dayFormat);
    const isMine = me.id === message.senderId;

    // console.log(`[renderRow] isMine: ${isMine}`, index, `me: ${me.id} senderId: ${message.senderId}`, (message.body as any).text);

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
          {isDateChanged && <ChatDaySeparator day={currentDate} />}
          <ChatMessage
            isMine={isMine}
            currentConversation={currentConversation}
            message={message}
            messageOwner={isMine ? me : interlocutor}
            showAvatar={isDateChanged || !prevMessage || prevMessage!.senderId !== message.senderId}
            messageRender={this.props.messageRender}
          />
        </div>
      </CellMeasurer>
    );
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
