import React from 'react';
import block from 'bem-cn';
import { IMarkdownEditorProps } from 'shared/view/components/MarkdownEditor/MarkdownEditor';
import { WrappedFieldProps } from 'redux-form';
import { MarkdownEditor } from 'shared/view/components';
import { Error } from 'shared/view/elements';

import './MarkdownEditorField.scss';

interface IOwnProps extends IMarkdownEditorProps {
  validateOnChange?: boolean;
}

const b = block('markdown-editor-field');

type TProps = IOwnProps;

class MarkdownEditorField extends React.PureComponent<TProps & WrappedFieldProps> {
  public render() {
    const {
      input,
      meta: { error, submitFailed, touched },
      validateOnChange,
      ...restTextInputProps
    } = this.props;

    const hasError = touched && (validateOnChange || submitFailed) && Boolean(error);
    return (
      <div className={b()}>
        <MarkdownEditor {...input} {...restTextInputProps} error={hasError} name={name}/>
        {hasError && (
          <Error>{error}</Error>
        )}
      </div>
    );
  }
}

export { IOwnProps as IMarkdownEditorFieldProps };
export default MarkdownEditorField;
