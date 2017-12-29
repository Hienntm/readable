import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'
import Header from './Header'
import PostsList from './PostsList'
import DetailedPost from './DetailedPost'
import PostCreateEdit from './PostCreateEdit'
import NoMatch from './NoMatch'
import '../App.css'

class App extends Component {
  
  render() {
	
    return (
      <div className="App">
      	<Header />
        <Switch>
			
		<Route exact path="/" component={PostsList}/>
		<Route path="/posts/create-edit" component={PostCreateEdit}/>
		<Route path="/posts/:id/edit" component={PostCreateEdit}/>
		<Route path="/:category/:id" component={DetailedPost}/>
		<Route path="/:category" component={PostsList}/>
       		
        </Switch>
      </div>
    );
  }
}

export default App
