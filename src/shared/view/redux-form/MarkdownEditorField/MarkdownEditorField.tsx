import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IMarkdownEditorProps } from 'shared/view/components/MarkdownEditor/MarkdownEditor';
import { WrappedFieldProps } from 'redux-form';
import { MarkdownEditor } from 'shared/view/components';
import { Error } from 'shared/view/elements';

import './MarkdownEditorField.scss';

interface IOwnProps extends Pick<IMarkdownEditorProps, 'placeholder'> {
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
        <MarkdownEditor
          {...input}
          {...restTextInputProps}
          error={hasError}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {hasError && (
          <Error>{error}</Error>
        )}
      </div>
    );
  }

  @bind
  private handleChange(value: string | null) {
    this.props.input.onChange(value);
  }

  @bind
  private handleBlur(value: string | null) {
    this.props.input.onBlur(value);
  }
}

export { IOwnProps as IMarkdownEditorFieldProps };
export default MarkdownEditorField;
