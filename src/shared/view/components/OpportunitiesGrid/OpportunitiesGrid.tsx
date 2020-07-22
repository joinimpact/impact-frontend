import React from 'react';
import block from 'bem-cn';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { OpportunityPreviewPlate } from '..';

import './OpportunitiesGrid.scss';

const b = block('opportunities-grid');

interface IOwnProps {
  opportunities: IOpportunityResponse[];
  updateOpportunityId?: string | null;
  isUpdating?: boolean;
  viewOnClick?: boolean;
  onViewOpportunity(opportunity: IOpportunityResponse): void;
  onOpenApplications?(opportunity: IOpportunityResponse): void;
  onCloseApplications?(opportunity: IOpportunityResponse): void;
}

type TProps = IOwnProps;

class OpportunitiesGrid extends React.PureComponent<TProps> {
  public render() {
    const { opportunities, isUpdating, updateOpportunityId, viewOnClick } = this.props;
    return (
      <div className={b()}>
        {opportunities
          .map(
            (opportunity: IOpportunityResponse, index: number) =>
              <OpportunityPreviewPlate
                key={`opportunity-${index}`}
                viewOnClick={viewOnClick}
                opportunity={opportunity}
                updating={isUpdating && opportunity.id === updateOpportunityId}
                onCloseApplications={this.props.onCloseApplications}
                onOpenApplications={this.props.onOpenApplications}
                onViewOpportunity={this.props.onViewOpportunity}
              />
          )
        }
      </div>
    );
  }
}

export default OpportunitiesGrid;
