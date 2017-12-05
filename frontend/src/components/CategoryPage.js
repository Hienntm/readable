import React from 'react'
//import {Link} from 'react-router-dom'

import logo from '../logo.svg';

const CategoryPage = (props) => {
	return (
		<div className="categoryPage">
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
			<ul className="postList">
				<li>Post Title</li>
				<li>Post Title</li>
				<li>Post Title</li>
				<li>Post Title</li>
			</ul>
			<button className="addPost">
				Add Post
			</button>		
		</div>
	)
}

export default CategoryPage