/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { decodeLoaded, decodeError } from 'containers/App/actions';
import pd from 'pdvindecoder/lib';

import request from 'utils/request';
import {
  makeSelectUsername,
  makeSelectVin,
} from 'containers/PartsDetectHome/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const decoded = yield call(pd, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getVinDecoded() {
  // Select username from store
  const vin = yield select(makeSelectVin());

  try {
    // Call our request helper (see 'utils/request')
    const decoded = yield call(request, vin);
    yield put(decodeLoaded(repos, vin));
  } catch (err) {
    yield put(decodeError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
