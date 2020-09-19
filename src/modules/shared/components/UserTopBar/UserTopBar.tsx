import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Logo } from 'shared/view/elements';

import './UserTopBar.scss';

const b = block('user-top-bar');

type TProps = ITranslateProps;

class UserTopBar extends React.PureComponent<TProps> {
	public render() {
		return (
			<div className={b()}>
				<Logo />
			</div>
		);
	}
}

export default i18nConnect<{}>(UserTopBar);
