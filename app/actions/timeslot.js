import {ON_ADD_DETAIL, FETCH_DETAIL_BY_ID} from '../constants';

/**
 * This method use for add slot details on redux store
 * @param {*} detail Field details
 * @param {*} slotId selected slot id
 */
export function onAddDetail(detail, slotId) {
  return {
    type: ON_ADD_DETAIL,
    detail,
    slotId,
  };
}

/**
 * This method use for fetch selected slot details from redux store and add in new selected slot property
 * @param {*} slotId Selected slot id
 */
export function fetchDetailById(slotId) {
  return {
    type: FETCH_DETAIL_BY_ID,
    slotId,
  };
}
