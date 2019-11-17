import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

export default preloadedState => {
	const composeEnhancers =
		(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store = createStore(
		reducers,
		preloadedState,
		composeEnhancers() 
	);


	return store;
};