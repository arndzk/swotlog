import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
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
	
	store.stopSagaIfNecessary = async () => { 
		if (store.sagaTask) {
			store.dispatch(END);
			await store.sagaTask.toPromise();
		}
	}

	store.sagaTask = sagaMiddleware.run(rootSaga)

	return store;
};