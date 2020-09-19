import { IConversationResponse } from 'shared/types/responses/chat';
import { IOpportunityResponse } from 'shared/types/responses/npo';

export function makePartialFilledArray<T>(chunk: T[], offset: number, prevArray: T[], totalSize: number): T[] {
	let out: T[] = prevArray;
	if (!prevArray || prevArray.length === 0) {
		out = new Array<T>(totalSize);
	} else if (prevArray.length !== totalSize) {
		out = new Array<T>(totalSize);
		for (let i = 0; i < prevArray.length; i++) {
			out[i] = prevArray[i];
		}
	}

	for (let i = 0; i < chunk.length; i++) {
		out[offset + i] = chunk[i];
	}

	return out;
}

export function calcPageNumberByReverseIndex(index: number, total: number, pageSize: number) {
	const normalOffset = total - index;
	return Math.floor(normalOffset / pageSize);
}

export function findConversationOpportunity(
	opportunities: IOpportunityResponse[],
	conversationResponse: IConversationResponse,
): IOpportunityResponse | undefined {
	const membershipRequests = conversationResponse.membershipRequests;
	if (membershipRequests && membershipRequests.length) {
		const membershipRequest = membershipRequests[0]; // Only for first membership
		return opportunities.find((opportunity) => opportunity.id === membershipRequest.opportunityId);
	}

	/* return opportunities.find(opportunity => {
    // const membershipRequest = membershipRequests.find(membership => membership.opportunityId === opportunity.id);
    const membershipRequest = membershipRequests[0]; // We searching only for first (top) request!
    return Boolean(membershipRequest);
  });*/
}
