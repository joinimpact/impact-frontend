interface Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(): any;
}

declare let __DISABLE_SSR__: boolean;
declare let __SERVER__: boolean;
declare let __CLIENT__: boolean;

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.scss';
declare module '*.png';

declare module 'postcss-pxtorem';
declare module 'postcss-reporter';
declare module 'postcss-scss';
declare module 'stylelint';
declare module 'doiuse';
declare module 'query-string';
declare module 'svg-inline-react';
declare module 'react-facebook-login/dist/facebook-login-render-props';
declare module '@opuscapita/react-markdown';
