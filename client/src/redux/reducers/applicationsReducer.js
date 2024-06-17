import * as types from '../actions/actionTypes';

const initialState = {
  companyName : '',
  dateApplied : '',
  status: '',
  role: '',
  notes: '',
};

const applicationsReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.ADD_CARD:

      newCard = {
        companyName: action.payload.companyName,
        dateApplied: action.payload.dateApplied,
        status: action.payload.status,
        role: action.payload.role,
        notes: action.payload.notes,
      };

      // push the new market onto a copy of the market list

      // return updated state
      return Object.assign({}, state, {
        companyName: action.payload.companyName,
        dateApplied: action.payload.dateApplied,
        status: action.payload.status,
        role: action.payload.role,
        notes: action.payload.notes,
      });
    case types.ADD_CARD:
      break;
    case types.DELETE_CARD:
      break;
    default: {
      return state;
    }
  }
};

export default applicationsReducer;