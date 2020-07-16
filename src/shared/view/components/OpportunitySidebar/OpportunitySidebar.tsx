import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button } from 'shared/view/elements';
import { StickyContainer, Sticky, StickyChildArgs } from 'react-sticky';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { Sidebar } from 'shared/view/components';
import { ICommunication } from 'shared/types/redux';
import { ISideBarRoute } from 'shared/types/app';

import './OpportunitySidebar.scss';

interface IOwnProps {
  submitDisabled?: boolean;
  updateOpportunityCommunication: ICommunication;
  currentOpportunity: IOpportunityResponse | null;
  selectedRoute: string | null;
  onGoToViewAllOpportunities(): void;
  onSelectRoute(route: ISideBarRoute): void;
}

const b = block('opportunity-sidebar');

type TProps = IOwnProps & ITranslateProps;

class OpportunitySidebar extends React.PureComponent<TProps> {
  private sideBarItems: ISideBarRoute[] = [
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:TITLE',
      hashRoute: '#title-card',
    },
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:BANNER-IMAGE',
      hashRoute: '#banner-image',
    },
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:TAGS',
      hashRoute: '#tags-card',
    },
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:DESCRIPTION',
      hashRoute: '#description-card',
    },
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:REQUIREMENTS',
      hashRoute: '#requirements-card',
    },
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:LIMITS',
      hashRoute: '#limits-card',
    },
    {
      title: 'OPPORTUNITY-SIDEBAR:MENU-ITEM:PUBLISHING-SETTINGS-OR-DELETE',
      hashRoute: '#publish-settings-card',
    },
  ];

  public componentDidMount() {
    this.props.onSelectRoute(this.sideBarItems[0]);
  }

  public render() {
    const { translate: t, currentOpportunity, updateOpportunityCommunication } = this.props;
    return (
      <div className={b()}>
        <StickyContainer>
          <Sticky>
            {(props: StickyChildArgs) => {
              return (
                <div
                  className={b('bar')}
                  style={{top: `${props.distanceFromTop < 0 ? -props.distanceFromTop : 0}px`}}
                >
                  <div className={b('link-back')} onClick={this.props.onGoToViewAllOpportunities}>
                    <i className="zi zi-cheveron-left"/>
                    {t('OPPORTUNITY-SIDEBAR:LINK:VIEW-ALL-OPPORTUNITIES')}
                  </div>
                  {(currentOpportunity && currentOpportunity.title) && (
                    <div className={b('opportunity-name')}>
                      {currentOpportunity.title}
                    </div>
                  )}
                  <div className={b('menu-caption')}>
                    {t('OPPORTUNITY-SIDEBAR:STATIC:LEFT-SIDE-CAPTION').toUpperCase()}
                  </div>
                  <Sidebar
                    routes={this.sideBarItems}
                    selectedRoute={this.props.selectedRoute}
                    onSelectRoute={this.props.onSelectRoute}
                  />
                  <div className={b('actions')}>
                    <Button
                      type="submit"
                      color="blue"
                      isShowPreloader={updateOpportunityCommunication.isRequesting}
                      disabled={this.props.submitDisabled}
                    >
                      {t('OPPORTUNITY-SIDEBAR:ACTIONS:SAVE-ALL-CHANGES')}
                    </Button>
                  </div>
                  <div className={b('hint')}>
                    {t('OPPORTUNITY-SIDEBAR:HINT:UNSAVED-CHANGES')}
                  </div>
                </div>
              );

            }}
          </Sticky>
        </StickyContainer>
      </div>
    );
  }
}


export default i18nConnect<IOwnProps>(OpportunitySidebar);
