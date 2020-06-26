import React from 'react';
import block from 'bem-cn';
import MarkdownInput from '@opuscapita/react-markdown';

import './MarkdownEditor.scss';

interface IOwnProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const b = block('markdown-editor');

type TProps = IOwnProps;

class MarkdownEditor extends React.PureComponent<TProps> {
  public render() {
    const { readOnly, autoFocus, error, placeholder, onChange, onClick, onBlur, onKeyDown } = this.props;
    return (
      <div className={b({ error: !!error })}>
        <MarkdownInput
          placeholder={placeholder}
          autoFocus={autoFocus}
          readOnly={readOnly}
          hideToolbar={false}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
}

export { IOwnProps as IMarkdownEditorProps };
export default MarkdownEditor;
