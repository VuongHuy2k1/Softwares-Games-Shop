import { take, fork, call, put } from 'redux-saga/effects';

import { getCart, getCartSuccess } from '../reducers/cartSlice';
import * as cartServices from 'src/services/cartServices';
import * as authServices from 'src/services/authServices';

function* handleGetCartData() {
  const isLoggedIn = authServices.isLoggedIn();
  if (!isLoggedIn) {
    return;
  }
  const result = yield call(cartServices.getCart);
  yield put(getCartSuccess(result));
}

export default function* cartSaga() {
  while (true) {
    yield take(getCart().type);
    yield fork(handleGetCartData);
  }
}
