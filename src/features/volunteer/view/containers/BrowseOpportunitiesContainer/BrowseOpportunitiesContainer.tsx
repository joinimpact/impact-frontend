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
import { ErrorScreen, SearchInput } from 'shared/view/components';
import { BrowseOpportunitiesFilter } from '../../components';

import './BrowseOpportunitiesContainer.scss';
import { Button, Preloader } from 'shared/view/elements';

interface IStateProps {
  browseOpportunitiesCommunication: ICommunication;
}

interface IActionProps {
  browseOpportunities: typeof actions.browseOpportunities;
}

const b = block('browse-opportunities-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class BrowseOpportunitiesContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      browseOpportunitiesCommunication: selectors.selectCommunication(state, 'browseOpportunities'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      browseOpportunities: actions.browseOpportunities,
    }, dispatch);
  }

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
          <BrowseOpportunitiesFilter/>
        </div>
        <div className={b('content')}>
          <div className={b('content-top')}>
            <div className={b('content-top-title')}>
              {t('BROWSE-OPPORTUNITIES-CONTAINER:STATIC:IN-YOUR-AREA')}
            </div>
            <div className={b('content-top-actions')}>
              <Button color="grey">
                {t('BROWSE-OPPORTUNITIES-CONTAINER:ACTION:VIEW-MORE')}
              </Button>
            </div>
          </div>
          <Preloader isShow={browseOpportunitiesCommunication.isRequesting} position="relative" size={14}>
            {browseOpportunitiesCommunication.error && (
              <ErrorScreen
                title={t('BROWSE-OPPORTUNITIES-CONTAINER:ERROR:LOAD-FAILED')}
                message={browseOpportunitiesCommunication.error}
              />
            )}
          </Preloader>
        </div>
      </div>
    );
  }

  @bind
  private handleSearchOpportunities(value: string) {
    console.log('[handleSearchOpportunities]', value);
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  BrowseOpportunitiesContainer.mapStateToProps,
  BrowseOpportunitiesContainer.mapDispatch,
)(BrowseOpportunitiesContainer);
export default i18nConnect<{}>(withRedux);
