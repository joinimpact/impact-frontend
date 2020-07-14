import React, { CSSProperties, HTMLAttributes } from 'react';
import block from 'bem-cn';
import Scrollbars from 'react-custom-scrollbars';
import { bind } from 'decko';
import { getScrollbarWidth } from 'shared/helpers/ui';

import './CustomScrollbar.scss';

interface IOwnProps {
  scrolledToBottom?: boolean;
}

const b = block('scroll');

class CustomScrollbar extends React.Component<IOwnProps> {
  private scrollElement: React.RefObject<Scrollbars> = React.createRef();
  private scrollWidth: number = getScrollbarWidth();

  public componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.props.scrolledToBottom && this.scrollToBottom();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    const { scrolledToBottom, ...restProps } = this.props;
    return (
      <Scrollbars
        className={b()}
        renderView={this.renderView}
        renderTrackVertical={this.renderVerticalTracker}
        renderThumbVertical={this.renderVerticalThumb}
        renderTrackHorizontal={this.renderHorizontalTrack}
        renderThumbHorizontal={this.renderHorizontalThumb}
        ref={this.scrollElement}
        style={{position: 'absolute'}}
        hideTracksWhenNotNeeded
        autoHide
        {...restProps}
      >
        {this.props.children}
      </Scrollbars>
    );
  }

  public scrollToTop = () => this.scrollElement.current!.scrollToTop();
  public scrollToBottom = () => this.scrollElement.current!.scrollToBottom();
  public scrollToLeft = () => this.scrollElement.current!.scrollToLeft();
  public scrollToRight = () => this.scrollElement.current!.scrollToRight();
  public scrollTop = (top: number) => this.scrollElement.current!.scrollTop(top);
  public scrollLeft = (left: number) => this.scrollElement.current!.scrollLeft(left);

  @bind
  private renderView(props: HTMLAttributes<HTMLDivElement>) {
    const newProps = {
      ...props,
      style: {
        ...props.style,
        marginBottom: -(this.scrollWidth + 2),
        marginRight: -(this.scrollWidth + 2),
        paddingBottom: 2,
        paddingRight: 2,
      } as CSSProperties,
    };
    return <div className={b('view').toString()} {...newProps} />;
  }

/*  @bind
  private handleViewWheel(e: WheelEvent<HTMLDivElement>) {
    this.scrollElement.scrollTop(this.scrollElement.getScrollTop() + e.deltaY);
    this.scrollElement.scrollLeft(this.scrollElement.getScrollLeft() + e.deltaX);
    const values = this.scrollElement.getValues();
    if (values.scrollHeight > values.clientHeight) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  } */

  @bind
  private renderVerticalTracker(props: HTMLAttributes<HTMLDivElement>) {
    const newProps = {
      ...props,
      style: {
        ...props.style,
        width: undefined,
      } as CSSProperties,
    };
    return <div className={b('track-vertical').toString()} {...newProps} />;
  }

  @bind
  private renderVerticalThumb(props: HTMLAttributes<HTMLDivElement>) {
    return <div className={b('thumb-vertical').toString()} {...props} />;
  }

  @bind
  private renderHorizontalTrack(props: HTMLAttributes<HTMLDivElement>) {
    const newProps = {
      ...props,
      style: {
        ...props.style,
        height: undefined,
      } as CSSProperties,
    };
    return <div className={b('track-horizontal').toString()} {...newProps} />;
  }

  @bind
  private renderHorizontalThumb(props: HTMLAttributes<HTMLDivElement>) {
    return <div className={b('thumb-horizontal').toString()} {...props} />;
  }

  @bind
  private handleResize(e: UIEvent) {
    this.scrollWidth = getScrollbarWidth();
    this.forceUpdate();
  }
}

export type CustomScrollbarType = CustomScrollbar;

export default CustomScrollbar;
