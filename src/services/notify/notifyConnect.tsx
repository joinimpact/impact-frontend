import React from 'react';
import { instance } from './NotifyManager';
import { INotifyProps } from './namespace';

function notifyConnect<TProps>(
	WrappedComponent: React.ComponentType<TProps & INotifyProps>,
): React.ComponentClass<TProps> {
	class NotifyConnect extends React.Component<TProps, {}> {
		public displayName = `(NotifyConnect) ${WrappedComponent.displayName}`;

		public render() {
			const { notifyError, notifyWarn, notifyInfo, notifyMessage } = instance;
			return (
				<WrappedComponent
					{...this.props}
					notifyError={notifyError}
					notifyWarn={notifyWarn}
					notifyInfo={notifyInfo}
					notifyMessage={notifyMessage}
				/>
			);
		}
	}

	return NotifyConnect;
}

export { notifyConnect };
