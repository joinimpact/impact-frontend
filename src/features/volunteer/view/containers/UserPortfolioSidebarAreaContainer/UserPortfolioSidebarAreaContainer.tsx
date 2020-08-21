import React from 'react';
import block from 'bem-cn';

import { UserPortfolioSidebarArea } from '../../components';
import { IUser } from 'shared/types/models/user';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';
import { connect } from 'react-redux';

interface IOwnProps {
  onEditUserProfile(): void;
}

interface IStateProps {
  currentUser: IUser | null;
}

const b = block('user-portfolio-sidebar-area-container');

type TProps = IOwnProps & IStateProps;

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
            onEditProfile={this.props.onEditUserProfile}
          />
        )}
      </div>
    );
  }
}

const withRedux = connect<IStateProps, void, IOwnProps>(
  UserPortfolioSidebarAreaContainer.mapStateToProps,
)(UserPortfolioSidebarAreaContainer);
export default withRedux;
