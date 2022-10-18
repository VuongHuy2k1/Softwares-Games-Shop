import { getUserData, getUserDataSuccess } from '../reducers/userSlice';
import { take, fork, call, put } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import * as userServices from 'src/services/userServices';
function* handleGetUserData() {
  const userId = Cookies.get('user-id');
  if (userId === undefined) {
    return;
  }
  const result = yield call(userServices.getUserData, userId);
  yield put(getUserDataSuccess(result));
}

export default function* userSaga() {
  while (true) {
    yield take(getUserData().type);
    yield fork(handleGetUserData);
  }
}
