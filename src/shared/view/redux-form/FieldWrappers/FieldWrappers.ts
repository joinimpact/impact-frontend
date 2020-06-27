import {
  IInputBaseFieldProps, IMarkdownEditorFieldProps,
} from 'shared/view/redux-form/index';
import { Field } from 'redux-form';
import { BaseFieldProps } from 'redux-form/lib/Field';
import { ISelectFieldProps } from 'shared/view/redux-form/SelectField/SelectField';

export const InputBaseFieldWrapper = Field as new () => Field<BaseFieldProps & IInputBaseFieldProps>;
export const MarkdownEditorFieldWrapper = Field as new () => Field<BaseFieldProps & IMarkdownEditorFieldProps>;
export const SelectFieldWrapper = Field as new () => Field<BaseFieldProps & ISelectFieldProps<string>>;
