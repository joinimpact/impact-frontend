import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import Preloader from 'shared/view/elements/Preloader/Preloader';

import './Image.scss';

interface IOwnProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  warn?: string;
}

interface IState {
  isLoaded: boolean;
  isError: boolean;
}

type IProps = IOwnProps;

const b = block('image-element');

class ImageElement extends React.Component<IProps, IState> {
  public state: IState = {
    isLoaded: false,
    isError: false,
  };

  public componentDidMount() {
    this.renderImg(this.props.src);
  }

  public componentDidUpdate({ src: prevSrc }: IProps) {
    const { src } = this.props;
    if (src !== prevSrc) {
      // Reset state if src changed.
      this.setState({
        isLoaded: false,
        isError: false,
      }, () => this.renderImg(src));
    }
  }

  public render() {
    const { src, className, warn } = this.props;
    const { isError, isLoaded } = this.state;

    if (isError) {
      return (
        <div className={b('error')}>
          <i className="zi zi-block"/>
          {warn && (
            <div className={b('error-text')}>{warn}</div>
          )}
        </div>
      );
    }

    return (
      <>
        <Preloader isShow={!isLoaded} position={'relative'}>
          <img src={src} className={b.mix(className).toString()}/>
        </Preloader>
      </>
    );
  }

  @bind
  private renderImg(src: string) {
    const img = new Image();
    img.onload = this.handleLoad;
    img.onerror = this.handleError;
    img.src = src;
  }

  @bind
  private handleError() {
    this.setState({
      isError: true,
      isLoaded: true,
    });
  }

  @bind
  private handleLoad() {
    this.setState({
      isLoaded: true,
      isError: false,
    });
  }
}

export default ImageElement;
