import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'
import HomePage from './HomePage'
import CategoryPage from './CategoryPage'
import PostPage from './PostPage'
import NoMatch from './NoMatch'
import '../App.css'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
			<Route exact path="/" render={()=>(		
			    <HomePage />
			 )} />

			<Route path="/category" render={()=>(
				<CategoryPage/>
			 )} />

       		<Route path="/post" render={()=>(
				<PostPage />
			)} />

       		<Route path="/create-edit" render={()=>(
				<CreateEditPage />
			)} />
      		      		             		       
       		<Route render={()=>(
				<NoMatch />
			)} />        	
        </Switch>
      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, comments }) {
	
}

function mapDispatchToProps (dispatch) {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
