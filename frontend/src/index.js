import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

//import App from './components/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'

import {Switch,Route} from 'react-router-dom'
import Header from './components/Header'
import PostsList from './components/PostsList'
import DetailedPost from './components/DetailedPost'
import PostCreateEdit from './components/PostCreateEdit'
import NoMatch from './components/NoMatch'
import './App.css'

//const logger = store => next => action => {
//	console.group(action.type)
//	console.info('dispatching', action)
//	let result = next(action)
//	console.log('next state', store.getState())
//	console.groupEnd(action.type)
//	return result
//}

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	rootReducer,
	composeEnhancers(
    	applyMiddleware(promise, thunk),
	)
)

ReactDOM.render(
	<Provider store={store}>		
		<BrowserRouter>
		  <div className="App">
			<Header />
			<Switch>
			
				<Route path="/posts/create-edit" component={PostCreateEdit}/>
				<Route path="/posts/:id/edit" component={PostCreateEdit}/>
				<Route path="/:category/:id" component={DetailedPost}/>
				<Route path="/:category" component={PostsList}/>
				<Route exact path="/" component={PostsList}/>
				<Route render={()=>(
					<NoMatch />
				)} />
			
			</Switch>
		  </div>
		</BrowserRouter>
	</Provider>, document.getElementById('root')
)

registerServiceWorker()