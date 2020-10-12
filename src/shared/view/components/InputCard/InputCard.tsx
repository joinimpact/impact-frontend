import React from 'react';
import block from 'bem-cn';

import './InputCard.scss';

interface IOwnProps {
	title: string;
	required?: boolean;
	description?: string;
	inputs: React.ReactElement;
	footer?: React.ReactElement;
}

const b = block('input-card');

const InputCard: React.FC<IOwnProps> = ({ title, required = false, description, inputs, footer }: IOwnProps) => {
	const renderFooter = () => {
		if (!footer) return null;
		return <div className={b('footer')}>{footer}</div>;
	};

	return (
		<div className={b()}>
			<div className={b('content-wrapper')}>
				<div className={b('details-wrapper')}>
					<div className={b('title-wrapper')}>
						<h3 className={b('title')}>{title}</h3>
						{required ? <span className={b('asterisk')}>*</span> : null}
					</div>
					{description ? (
						<div className={b('description-wrapper')}>
							<p className={b('description')}>{description}</p>
						</div>
					) : null}
				</div>
				<div className={b('inputs-wrapper')}>{inputs}</div>
			</div>
			{renderFooter()}
		</div>
	);
};

export default InputCard;
