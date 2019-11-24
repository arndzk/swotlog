import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducers from './reducers';


export default initialStore => {
	const sagaMiddleware = createSagaMiddleware();
	const composeEnhancers =
		(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store = createStore(
		reducers,
		initialStore,
		composeEnhancers(applyMiddleware(sagaMiddleware))
	);
	
	store.sagaTask = sagaMiddleware.run(rootSaga)

	return store;
};