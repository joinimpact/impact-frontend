import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ErrorScreen, OpportunitiesGrid, SearchInput } from 'shared/view/components';
import { BrowseOpportunitiesFilter } from '../../components';
import { Button, Preloader } from 'shared/view/elements';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import * as NS from 'features/volunteer/namespace';

import './BrowseOpportunitiesContainer.scss';

interface IOwnProps {
  onViewOpportunity(opportunity: IOpportunityResponse): void;
}

interface IStateProps {
  browseOpportunitiesCommunication: ICommunication;
  inUserAreaOpportunities: IOpportunityResponse[];
  inUserInterestsOpportunities: NS.TUserInterestsOpportunities;
  filteredOpportunities: IOpportunityResponse[];
}

interface IActionProps {
  browseOpportunities: typeof actions.browseOpportunities;
  browseOpportunitiesWithFilter: typeof actions.browseOpportunitiesWithFilter;
}

interface IState {
  currentFilter: NS.IBrowseOpportunitiesForm | null;
}

const b = block('browse-opportunities-container');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class BrowseOpportunitiesContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      browseOpportunitiesCommunication: selectors.selectCommunication(state, 'browseOpportunities'),
      inUserAreaOpportunities: selectors.selectInUserAreaOpportunities(state),
      inUserInterestsOpportunities: selectors.selectInUserInterestsOpportunities(state),
      filteredOpportunities: selectors.selectFilteredOpportunities(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      browseOpportunities: actions.browseOpportunities,
      browseOpportunitiesWithFilter: actions.browseOpportunitiesWithFilter,
    }, dispatch);
  }

  public state: IState = {
    currentFilter: null,
  };

  public componentDidMount() {
    this.props.browseOpportunities();
  }

  public render() {
    const { translate: t, browseOpportunitiesCommunication } = this.props;

    return (
      <div className={b()}>
        <div className={b('title')}>
          {t('BROWSE-OPPORTUNITIES-CONTAINER:STATIC:TITLE')}
        </div>
        <div className={b('filters')}>
          <SearchInput
            withSearchIcon
            onSearchRequested={this.handleSearchOpportunities}
          />
          <BrowseOpportunitiesFilter
            onFilter={this.handleFilterChanged}
          />
        </div>
        {browseOpportunitiesCommunication.error && (
          <ErrorScreen
            title={t('BROWSE-OPPORTUNITIES-CONTAINER:ERROR:LOAD-FAILED')}
            message={browseOpportunitiesCommunication.error}
          />
        )}
        <Preloader isShow={browseOpportunitiesCommunication.isRequesting} position="relative" size={14}>
          <div className={b('content')}>
            {this.renderInUserAreaOpportunities()}
            {Object.keys(this.props.inUserInterestsOpportunities).map(tag => {

              return this.renderInUserInterestsTagOpportunities(tag, this.props.inUserInterestsOpportunities[tag]);
            })}
          </div>
        </Preloader>
      </div>
    );
  }

  @bind
  private renderInUserAreaOpportunities() {
    const { translate: t } = this.props;
    return (
      <div className={b('content-item')}>
        <div className={b('content-item-top')}>
          <div className={b('content-item-top-title')}>
            {t('BROWSE-OPPORTUNITIES-CONTAINER:STATIC:IN-YOUR-AREA')}
          </div>
          <div className={b('content-item-top-actions')}>
            <Button color="grey">
              {t('BROWSE-OPPORTUNITIES-CONTAINER:ACTION:VIEW-MORE')}
            </Button>
          </div>
        </div>
        {this.props.inUserAreaOpportunities && (
          <OpportunitiesGrid
            viewOnClick
            opportunities={this.props.inUserAreaOpportunities}
            onViewOpportunity={this.handleViewOpportunity}
          />
        )}
      </div>
    );
  }

  @bind
  private renderInUserInterestsTagOpportunities(tag: string, opportunities: IOpportunityResponse[]) {
    const { translate: t } = this.props;
    return (
      <div className={b('content-item')}>
        <div className={b('content-item-top')}>
          <div className={b('content-item-top-title')}>
            {t('BROWSE-OPPORTUNITIES-CONTAINER:STATIC:YOUR-INTERESTS', {
              interest: tag,
            })}
          </div>
          <div className={b('content-item-top-actions')}>
            <Button color="grey">
              {t('BROWSE-OPPORTUNITIES-CONTAINER:ACTION:VIEW-MORE')}
            </Button>
          </div>
        </div>
        <OpportunitiesGrid
          viewOnClick
          opportunities={opportunities}
          onViewOpportunity={this.handleViewOpportunity}
        />
      </div>
    );
  }

  @bind
  private handleSearchOpportunities(value: string) {
    console.log('[handleSearchOpportunities]', value);
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.onViewOpportunity(opportunity);
  }

  @bind
  private handleFilterChanged(values: NS.IBrowseOpportunitiesForm) {
    console.log('[handleFilterChanged]', values);
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  BrowseOpportunitiesContainer.mapStateToProps,
  BrowseOpportunitiesContainer.mapDispatch,
)(BrowseOpportunitiesContainer);
export default i18nConnect<IOwnProps>(withRedux);
