import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IOpportunitiesResponseHash } from 'shared/types/models/opportunity';

export function converOpportunitiesArrayToOpportunitiesHash(
	opportunities: IOpportunityResponse[],
): IOpportunitiesResponseHash {
	return opportunities.reduce((acc: IOpportunitiesResponseHash, opportunity: IOpportunityResponse) => {
		acc[opportunity.id] = opportunity;
		return acc;
	}, {} as IOpportunitiesResponseHash);
}
