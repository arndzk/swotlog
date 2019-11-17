import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootSaga from '../sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default initialStore => {
	const composeEnhancers =
		(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store = createStore(
		reducers,
		initialStore,
		composeEnhancers(applyMiddleware(sagaMiddleware))
	);
	
	sagaMiddleware.run(rootSaga)

	return store;
};