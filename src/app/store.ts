import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootSaga from './rootSaga';
import counterReducer from 'features/counter/counterSlice';
import authReducer from 'features/auth/authSlice';
import { history } from '../utils';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/students/studentSlice';
import cityReducer from 'features/city/citySlice';

const rootReducer = combineReducers({
	router: connectRouter(history),
	counter: counterReducer,
	auth: authReducer,
	dashboard: dashboardReducer,
	student: studentReducer,
	city: cityReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
