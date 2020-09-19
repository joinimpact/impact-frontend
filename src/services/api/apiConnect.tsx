import React from 'react';
import Api from 'services/api/Api';

export interface IApiProps {
	api: Api;
}

function apiConnect<TProps>(WrappedComponent: React.ComponentType<TProps & IApiProps>): React.ComponentClass<TProps> {
	const instance = Api.instance;

	class ApiConnect extends React.Component<TProps, {}> {
		public displayName = `(ApiConnect) ${WrappedComponent.displayName}`;

		public render() {
			return <WrappedComponent api={instance} {...this.props} />;
		}
	}

	return ApiConnect;
}

export { apiConnect };
