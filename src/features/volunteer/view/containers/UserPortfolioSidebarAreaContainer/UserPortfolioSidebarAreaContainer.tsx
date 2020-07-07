import React from 'react';
import block from 'bem-cn';

import { UserPortfolioSidebarArea } from '../../components';
import { IUser } from 'shared/types/models/user';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';
import { connect } from 'react-redux';

interface IStateProps {
  currentUser: IUser | null;
}

const b = block('user-portfolio-sidebar-area-container');

type TProps = IStateProps;

class UserPortfolioSidebarAreaContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
    };
  }

  public render() {
    const { currentUser } = this.props;
    return (
      <div className={b()}>
        {currentUser && (
          <UserPortfolioSidebarArea
            user={currentUser!}
          />
        )}
      </div>
    );
  }
}

const withRedux = connect<IStateProps>(
  UserPortfolioSidebarAreaContainer.mapStateToProps,
)(UserPortfolioSidebarAreaContainer);
export default withRedux;
