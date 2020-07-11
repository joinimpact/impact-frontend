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
  private isDeleted: boolean = false;

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

  public componentWillUnmount() {
    this.isDeleted = true;
  }

  public render() {
    const { src, className, warn } = this.props;
    const { isError, isLoaded } = this.state;

    if (isError) {
      return (
        <div className={b.mix(className)}>
          <div className={b('error')}>
            <i className="zi zi-block"/>
            {warn && (
              <div className={b('error-text')}>{warn}</div>
            )}
          </div>
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div className={b.mix(className)}>
          <Preloader isShow position={'relative'}/>
        </div>
      );
    }

    return (
      <img src={src} className={b.mix(className)}/>
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
    if (!this.isDeleted) {
      this.setState({
        isError: true,
        isLoaded: true,
      });
    }
  }

  @bind
  private handleLoad() {
    if (!this.isDeleted) {
      this.setState({
        isLoaded: true,
        isError: false,
      });
    }
  }
}

export default ImageElement;
