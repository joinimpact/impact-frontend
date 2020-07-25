import {
  IInputBaseFieldProps, IMarkdownEditorFieldProps,
} from 'shared/view/redux-form/index';
import { Field } from 'redux-form';
import { BaseFieldProps } from 'redux-form/lib/Field';
import { ISelectFieldProps } from 'shared/view/redux-form/SelectField/SelectField';
import { ICheckboxFieldProps } from 'shared/view/redux-form/CheckboxField/CheckboxField';
import { IToggleFieldProps } from 'shared/view/redux-form/ToggleField/ToggleField';
import { ICommitmentFieldProps } from 'shared/view/redux-form/CommitmentField/CommitmentField';

export const InputBaseFieldWrapper = Field as new () => Field<BaseFieldProps & IInputBaseFieldProps>;
export const MarkdownEditorFieldWrapper = Field as new () => Field<BaseFieldProps & IMarkdownEditorFieldProps>;
export const SelectFieldWrapper = Field as new () => Field<BaseFieldProps & ISelectFieldProps<string>>;
export const CheckboxFieldWrapper = Field as new () => Field<BaseFieldProps & ICheckboxFieldProps>;
export const ToggleFieldWrapper = Field as new () => Field<BaseFieldProps & IToggleFieldProps>;
export const CommitmentFieldWrapper = Field as new () => Field<BaseFieldProps & ICommitmentFieldProps>;
