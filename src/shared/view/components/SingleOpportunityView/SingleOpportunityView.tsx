import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IOpportunityResponse, IOpportunityTagItem } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image } from 'shared/view/elements';
import ReactMarkdown from 'react-markdown';

import './SingleOpportunityView.scss';

interface IOwnProps {
	opportunity: IOpportunityResponse;
	onApply?(): void;
	onShareOpportunity?(): void;
}

const b = block('single-opportunity-view');

type TProps = IOwnProps & ITranslateProps;

class SingleOpportunityView extends React.PureComponent<TProps> {
	public render() {
		return (
			<div className={b()}>
				<div className={b('content')}>
					{this.renderImage()}
					{this.renderTags()}
					{this.renderTitle()}
					{this.renderDescription()}
					{this.renderRequirements()}
				</div>
			</div>
		);
	}

	@bind
	private renderImage() {
		const { translate: t, opportunity, onApply } = this.props;

		if (!opportunity.profilePicture) {
			return null;
		}

		return (
			<div className={b('image-row')}>
				<Image
					className={b('image-row-image', { 'without-apply': !Boolean(onApply) })}
					src={opportunity.profilePicture}
				/>
				{onApply && (
					<div className={b('apply-form')}>
						<div className={b('apply-form-share-button')}>
							<div className={b('apply-form-share-btn')} onClick={this.handleShareOpportunityLink}>
								<i className="zi zi-share" />
							</div>
						</div>
						<Button color="blue" onClick={this.handleApplyForOpportunity}>
							{t('SINGLE-OPPORTUNITY-VIEW:BUTTON:APPLY-FOR-OPPORTUNITY')}
						</Button>
					</div>
				)}
			</div>
		);
	}

	@bind
	private renderTags() {
		const { opportunity } = this.props;
		if (!opportunity.tags || opportunity.tags.length <= 0) {
			return null;
		}

		return (
			<div className={b('tags-row')}>
				{opportunity.tags.map((tag: IOpportunityTagItem, index: number) => {
					return (
						<div className={b('tags-row-item')} key={`tag-${index}`}>
							{tag.name}
						</div>
					);
				})}
			</div>
		);
	}

	@bind
	private renderTitle() {
		const { opportunity } = this.props;

		if (!opportunity.title) {
			return null;
		}

		return <div className={b('title')}>{opportunity.title}</div>;
	}

	@bind
	private renderDescription() {
		const { translate: t, opportunity } = this.props;

		return (
			<div className={b('description')}>
				<div className={b('description-title')}>{t('SINGLE-OPPORTUNITY-VIEW:TITLE:DESCRIPTION')}</div>
				<div className={b('description-value')}>
					<ReactMarkdown source={opportunity.description} />
				</div>
			</div>
		);
	}

	@bind
	private renderRequirements() {
		const { translate: t, opportunity } = this.props;
		const { ageLimit } = opportunity.requirements;

		if (!opportunity.requirements) {
			return null;
		}

		const rows = [];
		if (ageLimit.active) {
			if (ageLimit.from) {
				rows.push(
					<div className={b('requirements-row')} key={'age-from'}>
						{t('SINGLE-OPPORTUNITY-VIEW:REQUIREMENTS:MIN-AGE-LIMIT', {
							years: ageLimit.from,
						})}
					</div>,
				);
			}

			if (ageLimit.to) {
				rows.push(
					<div className={b('requirements-row')} key={'age-to'}>
						{t('SINGLE-OPPORTUNITY-VIEW:REQUIREMENTS:MAX-AGE-LIMIT', {
							years: ageLimit.to,
						})}
					</div>,
				);
			}

			if (ageLimit.from) {
				rows.push(
					<div className={b('requirements-row')} key={'min-age-restriction'}>
						{t('SINGLE-OPPORTUNITY-VIEW:REQUIREMENTS:PARENTS-RESTRICTION-WARN')}
					</div>,
				);
			}
		}

		return (
			<div className={b('requirements')}>
				<div className={b('requirements-title')}>{t('SINGLE-OPPORTUNITY-VIEW:TITLE:REQUIREMENTS')}</div>
				<div className={b('requirements-content')}>{rows}</div>
			</div>
		);
	}

	@bind
	private handleShareOpportunityLink(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		this.props.onShareOpportunity && this.props.onShareOpportunity();
	}

	@bind
	private handleApplyForOpportunity(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		this.props.onApply!();
	}
}

export default i18nConnect<IOwnProps>(SingleOpportunityView);
