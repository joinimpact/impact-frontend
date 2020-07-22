import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import './MarkdownEditor.scss';

interface IOwnProps {
  error?: boolean;
  value: string | null;
  placeholder?: string;
  noToolbar?: boolean;
  minHeight?: string;
  onChange(value: string | null): void;
  onBlur(value: string | null): void;
}

const b = block('markdown-editor');

type TProps = IOwnProps;

class MarkdownEditor extends React.PureComponent<TProps> {
  private simpleMde: React.RefObject<SimpleMDE> = React.createRef();
  public render() {
    const { value, error, noToolbar, minHeight } = this.props;
    return (
      <div className={b({ error: !!error })}>
        <SimpleMDE
          ref={this.simpleMde}
          options={{
            minHeight,
            toolbar: noToolbar ? false : undefined,
          }}
          value={value as string}
          events={{
            change: this.handleChange,
            blur: this.handleBlur,
          }}
        />
      </div>
    );
  }

  @bind
  private handleChange(instance: any, changeObj: object) {
    this.props.onChange(this.value);
  }

  @bind
  private handleBlur() {
    this.props.onBlur(this.value);
  }

  private get value(): string | null {
    return this.simpleMde.current!.simpleMde!.value();
  }
}

export { IOwnProps as IMarkdownEditorProps };
export default MarkdownEditor;
