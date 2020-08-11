import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import * as CodeMirror from 'codemirror';

import './MarkdownEditor.scss';

interface IOwnProps {
  error?: boolean;
  value: string | null;
  placeholder?: string;
  noToolbar?: boolean;
  noStatus?: boolean;
  minHeight?: string;
  changeOnEnter?: boolean;
  onEnter?(value: string | null): void;
  onChange?(value: string | null): void;
  onBlur?(value: string | null): void;
}

const b = block('markdown-editor');

type TProps = IOwnProps;

class MarkdownEditor extends React.PureComponent<TProps> {
  private simpleMde: React.RefObject<SimpleMDE> = React.createRef();
  public render() {
    const { value, error, noToolbar, noStatus, changeOnEnter, minHeight } = this.props;
    return (
      <div className={b({ error: !!error })}>
        <SimpleMDE
          ref={this.simpleMde}
          options={{
            minHeight,
            toolbar: noToolbar ? false : undefined,
            status: noStatus ? false : undefined,
            inputStyle: 'contenteditable',
          }}
          value={value as string}
          events={{
            keydown: changeOnEnter ? this.handleKeyDown as any : undefined,
            change: this.handleChange,
            blur: this.handleBlur,
          }}
        />
      </div>
    );
  }

  @bind
  private handleChange(instance: any, changeObj: object) {
    const { onChange } = this.props;
    onChange && onChange(this.value);
  }

  @bind
  private handleKeyDown(instance: CodeMirror.Doc, event: any) {
    const { onEnter } = this.props;
    if (event.code === 'Enter') {
      const value = instance.getValue();
      const cursor = instance.getCursor();

      if (!event.ctrlKey) {

        instance.setValue(''); // Clear value

        onEnter && onEnter(value); // Call send action for current value

        event.stopPropagation();
        event.preventDefault();
        return;
      }

      // Add new line to current position
      let cpos = 0;
      for (let n = 0; n < cursor.line; n++) {
        const line = instance.getLine(n) + 1;
        cpos += line.length;
      }
      const slicePoint = cpos + cursor.ch;
      const newValue = `${value.substr(0, slicePoint)}${String.fromCharCode(10)}${value.substr(slicePoint)}`;
      console.log('newValue: ', newValue);
      instance.setValue(newValue);
      instance.setCursor({ ...cursor, line: cursor.line + 1, ch: 0 });
    }
  }

  @bind
  private handleBlur() {
    this.props.onBlur && this.props.onBlur(this.value);
  }

  private get value(): string | null {
    return this.simpleMde.current!.simpleMde!.value();
  }
}

export { IOwnProps as IMarkdownEditorProps };
export default MarkdownEditor;
