import React from 'react'
//import {Link} from 'react-router-dom'

import logo from '../logo.svg';

const HomePage = (props) => {
	return (
		<div className="homePage">
			<header className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h1 className="App-title">Readable</h1>
			</header>
			<nav className="">
			  <a href="#">Category 1</a>
			  <a href="#">Category 2</a>
			  <a href="#">Category 3</a>
			  <a href="#">Category 4</a>
			</nav>
			<h2>Recommendation</h2>
			<div>
				<select value='voteScore'>
					<option value='voteScore'></option>
					<option value='timeStamp'></option>
				</select>
			</div>
			<button className="addPost">
				Add Post
			</button>
		</div>
	)
}

export default HomePage