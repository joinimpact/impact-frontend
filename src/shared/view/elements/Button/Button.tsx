import * as React from 'react';
import { block } from 'bem-cn';
import { Link, LinkProps } from 'react-router-dom';
import getDisplayName from 'react-display-name';

import { Preloader } from 'shared/view/elements';

// import Icon from '../Icon/Icon';
import './Button.scss';

const b = block('button');

// export type IconKind = void;
export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type ButtonColor = 'transparent' | 'blue' | 'grey' | 'light-red' | 'light-black';

export interface IProps<T> {
	className?: string;
	children?: React.ReactNode;
	// iconKind?: IconKind;
	size?: ButtonSize;
	color?: ButtonColor;
	isShowPreloader?: boolean;
	/**
	 * Makes the button have the same width as the height
	 */
	roundedBorder?: boolean;
	forwardedRef?: React.Ref<T>;
	isActive?: boolean;
	isFlat?: boolean;
}

export interface IWrappedComponentProps {
	className?: string;
	children?: React.ReactNode;
}

/* const iconSrc: {[kind in IconKind]: string } = {
};*/

const preloaderSize: { [kind in ButtonSize]: number } = {
	large: 1,
	medium: 0.85,
	small: 0.7,
	xsmall: 0.55,
};

/**
 * Turns a given React component to a styled button component
 *
 * - `T` is the wrapped component type when it is rendered (for ref)
 * - `P` is the wrapped component props type
 */
export function styleButton<T, P extends IWrappedComponentProps>(
	WrappedComponent: React.ComponentType<P> | string,
	isPure = false,
	displayName = `StyleButton(${getDisplayName(WrappedComponent)})`,
) {
	/* tslint:disable:function-name */
	function Button({
		size = 'medium',
		color = 'transparent',
		isShowPreloader,
		// iconKind,
		roundedBorder = false,
		className = '',
		forwardedRef,
		isActive = false,
		isFlat = false,
		children,
		...restProps
	}: IProps<T>) {
		return (
			<WrappedComponent
				className={b({
					size,
					color,
					// dropdown: iconKind === 'dropdown' || iconKind === 'dropdown-open',
					active: isActive,
					rounded: roundedBorder,
					flat: isFlat,
				}).mix(className)}
				ref={forwardedRef}
				{...(restProps as P)}
			>
				{/* {iconKind && <ButtonIcon kind={iconKind} />}*/}
				{isShowPreloader ? (
					<Preloader
						className={b('preloader', { visible: isShowPreloader || false })}
						size={preloaderSize[size]}
						type="button"
						position="relative"
						isShow
					/>
				) : (
					children
				)}
			</WrappedComponent>
		);
	}

	const ButtonComponent: React.ComponentType<P & IProps<T>> = isPure ? React.memo(Button) : Button;
	ButtonComponent.displayName = displayName;
	return ButtonComponent;
}

/* tslint:disable:function-name */
/* function ButtonIcon({ kind }: { kind: IconKind }) {
  return <Icon className={b('icon', { kind })} src={iconSrc[kind]} />;
}*/

/**
 * Styled <button> component
 */
export default styleButton<HTMLButtonElement, JSX.IntrinsicElements['button']>('button', true, 'Button');

export type IButtonProps = JSX.IntrinsicElements['button'] & IProps<HTMLButtonElement>;

/**
 * <a> component styled as a button
 */
export const LinkButton = styleButton<HTMLAnchorElement, JSX.IntrinsicElements['a']>('a', true);

/**
 * React-router Link component styled as a Button
 */
export const ReactRouterButton = styleButton<Link, LinkProps>(Link, true);
