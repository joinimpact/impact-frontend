import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS':
      return {
        ...state,
        uploadLogoProgress: action.payload,
      };
  }
  return state;
}

export default dataReducer;
