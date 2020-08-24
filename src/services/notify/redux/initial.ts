import { IReduxState } from '../namespace';
// import { messagesMock } from 'shared/defaults/mocks';

const initialState: IReduxState = {
  data: {
    stack: [
      // ...messagesMock, // TODO: REMOVE BEFORE RELEASE
    ],
  },
};

export default initialState;
