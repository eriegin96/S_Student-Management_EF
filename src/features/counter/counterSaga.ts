import { call, delay, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';

// export function* log(action: PayloadAction) {
// 	console.log('Log', action);
// }

function* handleIncrementSaga(action: PayloadAction<number>) {
	console.log('Waiting 1s');
	// Wait 1s
	yield delay(1000);

	console.log('Waiting done, dispatch action');

	// Dispatch action success
	yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
	console.log('counter saga');


	// yield takeEvery('*', log);

	// yield takeEvery('counter/increment', log);

	// tương tự ở trên nhưng trả về cái type của action
	// yield takeEvery(increment().type, log);

	yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
	// yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
