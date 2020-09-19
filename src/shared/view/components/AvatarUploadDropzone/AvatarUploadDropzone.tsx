import * as React from 'react';
import block from 'bem-cn';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { ITranslateProps, i18nConnect } from 'services/i18n';
import { bind } from 'decko';

import './AvatarUploadDropzone.scss';

export interface IImageFile extends File {
	preview?: string;
}

interface IProps {
	onAvatarImageDrop(file: IImageFile): void;
}

interface IState {
	isDropzoneActive: boolean;
}

const b = block('avatar-upload-dropzone');

class AvatarUploadDropzone extends React.PureComponent<IProps & ITranslateProps, IState> {
	public state: IState = {
		isDropzoneActive: false,
	};

	public render() {
		return (
			<div className={b()}>
				<Dropzone
					accept="image/*"
					onDrop={this.handleDrop}
					onDragEnter={this.handleDragEnter}
					onDragLeave={this.handleDragLeave}
				>
					{this.renderContent}
				</Dropzone>
			</div>
		);
	}

	@bind
	private renderContent(state: DropzoneState) {
		const { getRootProps, getInputProps } = state;
		const { children } = this.props;

		return (
			<div className={b('content')} {...getRootProps()}>
				<input {...getInputProps()} />
				{children}
			</div>
		);
	}

	@bind
	private handleDragEnter() {
		this.setState(() => ({ isDropzoneActive: true }));
	}

	@bind
	private handleDragLeave() {
		this.setState(() => ({ isDropzoneActive: false }));
	}

	@bind
	private handleDrop(files: IImageFile[]) {
		this.setState(() => ({ isDropzoneActive: false }));
		this.props.onAvatarImageDrop(files[0]);
	}
}

export default i18nConnect(AvatarUploadDropzone);
