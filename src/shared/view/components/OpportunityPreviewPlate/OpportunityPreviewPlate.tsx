import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Button, Image } from 'shared/view/elements';
import { IOpportunityResponse, IOpportunityTagItem } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { NBSP } from 'shared/types/constants';

import './OpportunityPreviewPlate.scss';

const b = block('opportunity-preview-plate');

interface IOwnProps {
	opportunity: IOpportunityResponse;
	updating?: boolean;
	viewOnClick?: boolean;
	onViewOpportunity(opportunity: IOpportunityResponse): void;
	onOpenApplications?(opportunity: IOpportunityResponse): void;
	onCloseApplications?(opportunity: IOpportunityResponse): void;
}

type TOpportunityState = 'accepting' | 'closed';

type TProps = IOwnProps & ITranslateProps;

class OpportunityPreviewPlate extends React.PureComponent<TProps> {
	public render() {
		const { opportunity, translate: t, viewOnClick } = this.props;
		const picUrl = opportunity.profilePicture;
		// || 'https://cdn.joinimpact.org/opportunity-picture-1281690192863825920-1594413736.png';

		return (
			<div className={b({ clickable: viewOnClick })} onClick={this.handleClick}>
				{picUrl && (
					<div className={b('image')}>
						<Image src={picUrl} />
					</div>
				)}
				{this.renderTags()}
				<div className={b('title')}>{opportunity.title}</div>
				{viewOnClick ? (
					<>
						{opportunity.location && <div className={b('location')}>{opportunity.location.city.longName}</div>}
						{this.renderOrganizationBlock()}
					</>
				) : (
					<>
						<div className={b('cap-limit')}>
							{t('OPPORTUNITY-PREVIEW-PLATE:CAP-LIMIT:ACCEPTED', {
								accepted: opportunity.stats ? opportunity.stats.volunteersEnrolled : '0',
								limit: opportunity.limits ? opportunity.limits.volunteersCap.cap : '0',
							})}
						</div>
						<div className={b('status')}>{this.renderStatus()}</div>
						<div className={b('actions')}>{this.renderActions()}</div>
					</>
				)}
			</div>
		);
	}

	@bind
	private renderOrganizationBlock() {
		const { name, profilePicture } = this.props.opportunity.organization;
		return (
			<div className={b('organization')}>
				{profilePicture ? (
					<div className={b('organization-image')}>
						<Image src={profilePicture} />
					</div>
				) : (
					<div className={b('organization-empty-image')}>{NBSP}</div>
				)}
				<div className={b('organization-title')}>{name}</div>
			</div>
		);
	}

	@bind
	private renderActions() {
		const { translate: t, opportunity, onOpenApplications, onCloseApplications } = this.props;
		const buttons: JSX.Element[] = [
			<Button color="blue" onClick={this.props.onViewOpportunity.bind(this, opportunity)} key={'btn-view'}>
				{t('OPPORTUNITY-PREVIEW-PLATE:BUTTONS:VIEW')}
			</Button>,
		];

		if (onOpenApplications && onCloseApplications) {
			if (opportunity.public) {
				buttons.push(
					<Button
						color="grey"
						onClick={onCloseApplications.bind(this, opportunity)}
						isShowPreloader={this.props.updating}
						key={'btn-publish'}
					>
						{t('OPPORTUNITY-PREVIEW-PLATE:BUTTONS:CLOSE-APPLICATIONS')}
					</Button>,
				);
			} else {
				buttons.push(
					<Button
						color="grey"
						onClick={onOpenApplications.bind(this, opportunity)}
						isShowPreloader={this.props.updating}
						key={'btn-unpublish'}
					>
						{t('OPPORTUNITY-PREVIEW-PLATE:BUTTONS:OPEN-APPLICATIONS')}
					</Button>,
				);
			}
		}

		return buttons;
	}

	@bind
	private renderStatus() {
		const { opportunity } = this.props;

		const status: TOpportunityState = opportunity.public ? 'accepting' : 'closed';
		const statusTest = this.statusText;

		return (
			<div className={b('status-row')}>
				<div className={b('status-icon', { [status]: true })} />
				<div className={b('status-label')}>{statusTest}</div>
			</div>
		);
	}

	@bind
	private renderTags() {
		const { opportunity } = this.props;

		if (!opportunity.tags || !opportunity.tags.length) {
			return null;
		}

		return (
			<div className={b('tags')}>
				{opportunity.tags.map((tag: IOpportunityTagItem, index: number) => {
					return (
						<div className={b('tags-value')} key={`value-${index}`}>
							{tag.name}
						</div>
					);
				})}
			</div>
		);
	}

	private get statusText() {
		const { translate: t } = this.props;
		if (this.props.opportunity.public) {
			return t('OPPORTUNITY-PREVIEW-PLATE:STATUS:ACCEPTING');
		}

		return t('OPPORTUNITY-PREVIEW-PLATE:STATUS:CLOSED');
	}

	@bind
	private handleClick() {
		this.props.viewOnClick && this.props.onViewOpportunity(this.props.opportunity);
	}
}

export default i18nConnect<IOwnProps>(OpportunityPreviewPlate);
