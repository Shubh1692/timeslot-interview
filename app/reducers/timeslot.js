import {ON_ADD_DETAIL, FETCH_DETAIL_BY_ID} from '../constants';

export default function user(
  state = {
    fieldSlot: {},
    selectedSlot: null,
  },
  action,
) {
  const {fieldSlot} = state;
  switch (action.type) {
    // Reducer switch for add update slot details
    case ON_ADD_DETAIL:
      fieldSlot[action.slotId] = action.detail;
      return {
        ...state,
        fieldSlot,
        selectedSlot: null,
      };
    // Reducer switch for set selected slot detail in store variable
    case FETCH_DETAIL_BY_ID:
      return {
        ...state,
        selectedSlot: fieldSlot[action.slotId]
          ? {...fieldSlot[action.slotId]}
          : null,
      };
    default:
      return state;
  }
}
