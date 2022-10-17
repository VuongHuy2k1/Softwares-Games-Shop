import { take, fork, call, put } from 'redux-saga/effects';

import { getWishlist, getWishlistSuccess } from '../reducers/wishlistSlice';
import * as wishlistServices from 'src/services/wishlistServices';
import * as authServices from 'src/services/authServices';

function* handleGetWishlistData() {
  const isLoggedIn = authServices.isLoggedIn();
  if (!isLoggedIn) {
    return;
  }

  const result = yield call(wishlistServices.getWishlist);
  yield put(getWishlistSuccess(result));
}

export default function* wishlistSaga() {
  while (true) {
    yield take(getWishlist().type);
    yield fork(handleGetWishlistData);
  }
}
