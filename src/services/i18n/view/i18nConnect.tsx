import React from 'react';
import { bind } from 'decko';
import { instance } from '../I18n';
import { ITranslateProps } from '../namespace';

function i18nConnect<TProps>(
	WrappedComponent: React.ComponentType<TProps & ITranslateProps>,
): React.ComponentClass<TProps> {
	class I18nConnector extends React.Component<TProps, {}> {
		public displayName = `(I18nConnect) ${WrappedComponent.displayName}`;

		public componentDidMount() {
			instance.subscribe(this.onLocaleChange);
		}

		public componentWillUnmount() {
			instance.unsubscribe(this.onLocaleChange);
		}

		@bind
		public onLocaleChange() {
			this.forceUpdate();
		}

		public render() {
			const { locale, translate, translateArray, isLoaded, View } = instance;
			if (!isLoaded) {
				return null;
			}
			return (
				<WrappedComponent
					locale={locale}
					translate={translate}
					translateArray={translateArray}
					Translate={View}
					{...this.props}
				/>
			);
		}
	}

	return I18nConnector;
}

export { i18nConnect };
