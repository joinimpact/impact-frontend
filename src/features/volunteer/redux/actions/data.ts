import * as NS from '../../namespace';

export function setUploadLogoProgress(progress: number | null): NS.ISetUploadLogoProgress {
	return { payload: progress, type: 'VOLUNTEER:SET_UPLOAD_LOGO_PROGRESS' };
}

export function requestApplyOpportunity(opportunityId: string): NS.IRequestApplyOpportunity {
	return { payload: opportunityId, type: 'VOLUNTEER:REQUEST_APPLY_OPPORTUNITY' };
}

export function resetRequestApplyOpportunity(): NS.IResetRequestApplyOpportunity {
	return { type: 'VOLUNTEER:RESET_REQUEST_APPLY_OPPORTUNITY' };
}

export function showShareOpportunityModal(): NS.IShowShareOpportunityModal {
	return { type: 'VOLUNTEER:SHOW_OPPORTUNITY_MODAL' };
}

export function closeShareOpportunityModal(): NS.ICloseShareOpportunityModal {
	return { type: 'VOLUNTEER:CLOSE_SHARE_OPPORTUNITY_MODAL' };
}

export function resetMyResponseToEvent(): NS.IResetMyResponseToEvent {
	return { type: 'VOLUNTEER:RESET_MY_RESPONSE_TO_EVENT' };
}

export function chatSubscribe(): NS.IChatSubscribe {
	return { type: 'VOLUNTEER:SUBSCRIBE' };
}

export function chatUnsubscribe(): NS.IChatUnsubscribe {
	return { type: 'VOLUNTEER:UNSUBSCRIBE' };
}

export function requestHoursRequest(props: NS.IRequestHoursProps): NS.IRequestHoursRequest {
	return { payload: props, type: 'VOLUNTEER:REQUEST_HOURS_REQUEST' };
}

export function resetRequestHours(): NS.IResetHoursRequest {
	return { type: 'VOLUNTEER:RESET_HOURS_REQUEST' };
}

export function requestDeleteAccount(): NS.IRequestDeleteAccount {
	return { type: 'VOLUNTEER:REQUEST_DELETE_ACCOUNT' };
}

export function resetDeleteAccountRequest(): NS.IResetDeleteAccountRequest {
	return { type: 'VOLUNTEER:RESET_DELETE_ACCOUNT_REQUEST' };
}
