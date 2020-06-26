import {
  IInputBaseFieldProps, IMarkdownEditorFieldProps,
} from 'shared/view/redux-form/index';
import { Field } from 'redux-form';
import { BaseFieldProps } from 'redux-form/lib/Field';

export const InputBaseFieldWrapper = Field as new () => Field<BaseFieldProps & IInputBaseFieldProps>;
export const MarkdownEditorFieldWrapper = Field as new () => Field<BaseFieldProps & IMarkdownEditorFieldProps>;
